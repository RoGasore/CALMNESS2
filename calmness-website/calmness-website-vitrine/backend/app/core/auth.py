import os
import secrets
import pyotp
import qrcode
import io
import base64
from datetime import datetime, timedelta
from typing import Optional, Dict, Any
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.auth import User, UserSession, TwoFactorCode
from app.schemas.auth import UserResponse

# Configuration
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS = 30

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT Security
security = HTTPBearer()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """Hash a password"""
    return pwd_context.hash(password)

def create_access_token(data: Dict[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    """Create a JWT access token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire, "type": "access"})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def create_refresh_token(data: Dict[str, Any]) -> str:
    """Create a JWT refresh token"""
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire, "type": "refresh"})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str, token_type: str = "access") -> Dict[str, Any]:
    """Verify and decode a JWT token"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("type") != token_type:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token type"
            )
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials"
        )

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    """Get the current authenticated user"""
    token = credentials.credentials
    payload = verify_token(token, "access")
    
    user_id = payload.get("sub")
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials"
        )
    
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User account is disabled"
        )
    
    return user

def get_current_active_user(current_user: User = Depends(get_current_user)) -> User:
    """Get the current active user"""
    if not current_user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user"
        )
    return current_user

# 2FA Functions
def generate_2fa_secret() -> str:
    """Generate a new 2FA secret"""
    return pyotp.random_base32()

def generate_2fa_qr_code(secret: str, email: str) -> str:
    """Generate QR code for 2FA setup"""
    totp_uri = pyotp.totp.TOTP(secret).provisioning_uri(
        name=email,
        issuer_name="Calmness FI"
    )
    
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(totp_uri)
    qr.make(fit=True)
    
    img = qr.make_image(fill_color="black", back_color="white")
    
    # Convert to base64
    buffer = io.BytesIO()
    img.save(buffer, format='PNG')
    img_str = base64.b64encode(buffer.getvalue()).decode()
    
    return f"data:image/png;base64,{img_str}"

def verify_2fa_code(secret: str, code: str) -> bool:
    """Verify a 2FA code"""
    totp = pyotp.TOTP(secret)
    return totp.verify(code, valid_window=1)

def generate_backup_codes() -> list:
    """Generate backup codes for 2FA"""
    return [secrets.token_hex(4).upper() for _ in range(10)]

# SMS Functions
def generate_sms_code() -> str:
    """Generate a 6-digit SMS code"""
    return f"{secrets.randbelow(900000) + 100000:06d}"

def create_2fa_code(db: Session, user_id: int, code: str, code_type: str, phone_number: str = None) -> TwoFactorCode:
    """Create a 2FA code in the database"""
    expires_at = datetime.utcnow() + timedelta(minutes=10)
    
    # Deactivate old codes
    db.query(TwoFactorCode).filter(
        TwoFactorCode.user_id == user_id,
        TwoFactorCode.code_type == code_type,
        TwoFactorCode.is_used == False
    ).update({"is_used": True})
    
    # Create new code
    two_factor_code = TwoFactorCode(
        user_id=user_id,
        code=code,
        code_type=code_type,
        phone_number=phone_number,
        expires_at=expires_at
    )
    
    db.add(two_factor_code)
    db.commit()
    db.refresh(two_factor_code)
    
    return two_factor_code

def verify_2fa_code_db(db: Session, user_id: int, code: str, code_type: str) -> bool:
    """Verify a 2FA code from the database"""
    two_factor_code = db.query(TwoFactorCode).filter(
        TwoFactorCode.user_id == user_id,
        TwoFactorCode.code == code,
        TwoFactorCode.code_type == code_type,
        TwoFactorCode.is_used == False,
        TwoFactorCode.expires_at > datetime.utcnow()
    ).first()
    
    if two_factor_code:
        two_factor_code.is_used = True
        db.commit()
        return True
    
    return False

# Session Management
def create_user_session(db: Session, user_id: int, device_info: str = None, ip_address: str = None) -> str:
    """Create a new user session"""
    session_token = secrets.token_urlsafe(32)
    expires_at = datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    
    user_session = UserSession(
        user_id=user_id,
        session_token=session_token,
        device_info=device_info,
        ip_address=ip_address,
        expires_at=expires_at
    )
    
    db.add(user_session)
    db.commit()
    db.refresh(user_session)
    
    return session_token

def verify_session_token(db: Session, session_token: str) -> Optional[User]:
    """Verify a session token and return the user"""
    session = db.query(UserSession).filter(
        UserSession.session_token == session_token,
        UserSession.is_active == True,
        UserSession.expires_at > datetime.utcnow()
    ).first()
    
    if session:
        return session.user
    return None

def revoke_user_sessions(db: Session, user_id: int) -> None:
    """Revoke all sessions for a user"""
    db.query(UserSession).filter(
        UserSession.user_id == user_id,
        UserSession.is_active == True
    ).update({"is_active": False})
    db.commit()

# Email verification
def generate_email_verification_token() -> str:
    """Generate an email verification token"""
    return secrets.token_urlsafe(32)

def create_email_verification_token(user_id: int) -> str:
    """Create an email verification token"""
    data = {"user_id": user_id, "type": "email_verification"}
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

def verify_email_verification_token(token: str) -> Optional[int]:
    """Verify an email verification token"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("type") != "email_verification":
            return None
        return payload.get("user_id")
    except JWTError:
        return None

