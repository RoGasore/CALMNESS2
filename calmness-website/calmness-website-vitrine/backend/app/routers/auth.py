from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks, Request
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.auth import User, OAuthAccount, SocialLink, UserService
from app.schemas.auth import (
    UserCreate, UserResponse, LoginRequest, TokenResponse, 
    OAuthLoginRequest, TwoFactorSetupResponse, TwoFactorVerifyRequest,
    TwoFactorSMSRequest, TwoFactorSMSVerifyRequest, PasswordResetRequest,
    PasswordResetConfirm, ChangePasswordRequest, SocialLinkCreate,
    SocialLinkUpdate, SocialLinkResponse, UserDashboard
)
from app.core.auth import (
    verify_password, get_password_hash, create_access_token, create_refresh_token,
    verify_token, get_current_active_user, generate_2fa_secret, generate_2fa_qr_code,
    verify_2fa_code, generate_backup_codes, generate_sms_code, create_2fa_code,
    verify_2fa_code_db, create_user_session, verify_session_token, revoke_user_sessions,
    create_email_verification_token, verify_email_verification_token
)
from app.core.oauth import get_oauth_provider
from app.core.email import send_email_verification, send_password_reset, send_2fa_sms_code, send_welcome_email
from datetime import datetime, timedelta
import os

router = APIRouter(prefix="/auth", tags=["Authentication"])

# User Registration
@router.post("/register", response_model=UserResponse)
async def register_user(user_data: UserCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    """Register a new user"""
    # Check if user already exists
    existing_user = db.query(User).filter(
        (User.email == user_data.email) | (User.username == user_data.username)
    ).first()
    
    if existing_user:
        if existing_user.email == user_data.email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already taken"
            )
    
    # Create new user
    hashed_password = get_password_hash(user_data.password)
    user = User(
        email=user_data.email,
        username=user_data.username,
        hashed_password=hashed_password,
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        phone=user_data.phone
    )
    
    db.add(user)
    db.commit()
    db.refresh(user)
    
    # Send verification email
    verification_token = create_email_verification_token(user.id)
    background_tasks.add_task(
        send_email_verification,
        user.email,
        verification_token,
        user.username
    )
    
    return user

# Email Verification
@router.post("/verify-email")
async def verify_email(token: str, db: Session = Depends(get_db)):
    """Verify user email"""
    user_id = verify_email_verification_token(token)
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired verification token"
        )
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    user.is_verified = True
    db.commit()
    
    return {"message": "Email verified successfully"}

# User Login
@router.post("/login", response_model=TokenResponse)
async def login_user(login_data: LoginRequest, request: Request, db: Session = Depends(get_db)):
    """Login user with email and password"""
    user = db.query(User).filter(User.email == login_data.email).first()
    
    if not user or not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Account is disabled"
        )
    
    if not user.is_verified:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Please verify your email before logging in"
        )
    
    # Update last login
    user.last_login = datetime.utcnow()
    db.commit()
    
    # Create session
    device_info = request.headers.get("User-Agent", "Unknown")
    ip_address = request.client.host
    session_token = create_user_session(db, user.id, device_info, ip_address)
    
    # Create tokens
    access_token = create_access_token({"sub": str(user.id)})
    refresh_token = create_refresh_token({"sub": str(user.id), "session": session_token})
    
    return TokenResponse(
        access_token=access_token,
        expires_in=30 * 60,  # 30 minutes
        user=user
    )

# OAuth Login
@router.post("/oauth/login", response_model=TokenResponse)
async def oauth_login(oauth_data: OAuthLoginRequest, request: Request, db: Session = Depends(get_db)):
    """Login with OAuth provider"""
    provider = get_oauth_provider(oauth_data.provider)
    
    # Get access token
    token_data = await provider.get_access_token(oauth_data.code)
    access_token = token_data.get("access_token")
    
    if not access_token:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to get access token"
        )
    
    # Get user info
    user_info = await provider.get_user_info(access_token)
    
    # Check if OAuth account exists
    oauth_account = db.query(OAuthAccount).filter(
        OAuthAccount.provider == oauth_data.provider,
        OAuthAccount.provider_user_id == user_info["id"]
    ).first()
    
    if oauth_account:
        user = oauth_account.user
    else:
        # Check if user exists with same email
        user = db.query(User).filter(User.email == user_info["email"]).first()
        
        if not user:
            # Create new user
            username = user_info.get("login", user_info.get("name", "").replace(" ", "").lower())
            # Ensure username is unique
            counter = 1
            original_username = username
            while db.query(User).filter(User.username == username).first():
                username = f"{original_username}{counter}"
                counter += 1
            
            user = User(
                email=user_info["email"],
                username=username,
                first_name=user_info.get("first_name", user_info.get("name", "").split()[0] if user_info.get("name") else ""),
                last_name=user_info.get("last_name", " ".join(user_info.get("name", "").split()[1:]) if user_info.get("name") and len(user_info.get("name", "").split()) > 1 else ""),
                is_verified=True  # OAuth users are pre-verified
            )
            db.add(user)
            db.commit()
            db.refresh(user)
        
        # Create OAuth account
        oauth_account = OAuthAccount(
            user_id=user.id,
            provider=oauth_data.provider,
            provider_user_id=user_info["id"],
            provider_email=user_info["email"],
            access_token=access_token,
            refresh_token=token_data.get("refresh_token"),
            expires_at=datetime.utcnow() + timedelta(seconds=token_data.get("expires_in", 3600))
        )
        db.add(oauth_account)
        db.commit()
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Account is disabled"
        )
    
    # Update last login
    user.last_login = datetime.utcnow()
    db.commit()
    
    # Create session
    device_info = request.headers.get("User-Agent", "Unknown")
    ip_address = request.client.host
    session_token = create_user_session(db, user.id, device_info, ip_address)
    
    # Create tokens
    access_token = create_access_token({"sub": str(user.id)})
    refresh_token = create_refresh_token({"sub": str(user.id), "session": session_token})
    
    return TokenResponse(
        access_token=access_token,
        expires_in=30 * 60,
        user=user
    )

# OAuth Authorization URLs
@router.get("/oauth/{provider}/url")
async def get_oauth_url(provider: str):
    """Get OAuth authorization URL"""
    oauth_provider = get_oauth_provider(provider)
    auth_url = oauth_provider.get_authorization_url()
    return {"authorization_url": auth_url}

# 2FA Setup
@router.post("/2fa/setup", response_model=TwoFactorSetupResponse)
async def setup_2fa(current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    """Setup 2FA for user"""
    if current_user.two_factor_enabled:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="2FA is already enabled"
        )
    
    secret = generate_2fa_secret()
    qr_code_url = generate_2fa_qr_code(secret, current_user.email)
    backup_codes = generate_backup_codes()
    
    # Store secret in user record
    current_user.two_factor_secret = secret
    db.commit()
    
    return TwoFactorSetupResponse(
        qr_code_url=qr_code_url,
        secret_key=secret,
        backup_codes=backup_codes
    )

# 2FA Verify and Enable
@router.post("/2fa/verify")
async def verify_2fa_setup(
    verification_data: TwoFactorVerifyRequest,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Verify 2FA setup and enable it"""
    if not current_user.two_factor_secret:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="2FA not set up"
        )
    
    if not verify_2fa_code(current_user.two_factor_secret, verification_data.code):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid 2FA code"
        )
    
    current_user.two_factor_enabled = True
    db.commit()
    
    return {"message": "2FA enabled successfully"}

# 2FA SMS Setup
@router.post("/2fa/sms/send")
async def send_2fa_sms(
    sms_data: TwoFactorSMSRequest,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Send 2FA SMS code"""
    code = generate_sms_code()
    create_2fa_code(db, current_user.id, code, "sms", sms_data.phone_number)
    
    try:
        await send_2fa_sms_code(sms_data.phone_number, code)
        return {"message": "SMS code sent successfully"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to send SMS"
        )

# 2FA SMS Verify
@router.post("/2fa/sms/verify")
async def verify_2fa_sms(
    verification_data: TwoFactorSMSVerifyRequest,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Verify 2FA SMS code"""
    if verify_2fa_code_db(db, current_user.id, verification_data.code, "sms"):
        return {"message": "SMS code verified successfully"}
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired SMS code"
        )

# Password Reset
@router.post("/password-reset")
async def request_password_reset(
    reset_data: PasswordResetRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """Request password reset"""
    user = db.query(User).filter(User.email == reset_data.email).first()
    
    if not user:
        # Don't reveal if email exists
        return {"message": "If the email exists, a reset link has been sent"}
    
    # Generate reset token
    reset_token = create_email_verification_token(user.id)
    
    # Send reset email
    background_tasks.add_task(
        send_password_reset,
        user.email,
        reset_token,
        user.username
    )
    
    return {"message": "If the email exists, a reset link has been sent"}

# Password Reset Confirm
@router.post("/password-reset/confirm")
async def confirm_password_reset(
    reset_data: PasswordResetConfirm,
    db: Session = Depends(get_db)
):
    """Confirm password reset"""
    user_id = verify_email_verification_token(reset_data.token)
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token"
        )
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Update password
    user.hashed_password = get_password_hash(reset_data.new_password)
    db.commit()
    
    # Revoke all sessions
    revoke_user_sessions(db, user.id)
    
    return {"message": "Password reset successfully"}

# Change Password
@router.post("/change-password")
async def change_password(
    password_data: ChangePasswordRequest,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Change user password"""
    if not verify_password(password_data.current_password, current_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current password is incorrect"
        )
    
    current_user.hashed_password = get_password_hash(password_data.new_password)
    db.commit()
    
    # Revoke all sessions except current one
    # (In a real implementation, you'd track the current session)
    
    return {"message": "Password changed successfully"}

# Logout
@router.post("/logout")
async def logout_user(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Logout user"""
    revoke_user_sessions(db, current_user.id)
    return {"message": "Logged out successfully"}

# Get Current User
@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user: User = Depends(get_current_active_user)):
    """Get current user information"""
    return current_user

# User Dashboard
@router.get("/dashboard", response_model=UserDashboard)
async def get_user_dashboard(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get user dashboard data"""
    # Get user services
    user_services = db.query(UserService).filter(UserService.user_id == current_user.id).all()
    
    # Get social links
    social_links = db.query(SocialLink).filter(SocialLink.is_active == True).order_by(SocialLink.order).all()
    
    # Calculate stats
    stats = {
        "total_services": len(user_services),
        "active_services": len([s for s in user_services if s.status == "active"]),
        "total_spent": sum(s.amount or 0 for s in user_services if s.payment_status == "paid"),
        "member_since": current_user.created_at.strftime("%B %Y")
    }
    
    return UserDashboard(
        user=current_user,
        services=user_services,
        social_links=social_links,
        stats=stats
    )

