import base64
import os
from cryptography.fernet import Fernet


def _get_key() -> bytes:
    key = os.getenv("APP_ENCRYPTION_KEY")
    if not key:
        # Generate ephemeral key for dev if none provided
        key = base64.urlsafe_b64encode(os.urandom(32)).decode()
        os.environ["APP_ENCRYPTION_KEY"] = key
    return key.encode()


def encrypt_str(plain: str) -> str:
    f = Fernet(_get_key())
    return f.encrypt(plain.encode()).decode()


def decrypt_str(token: str) -> str:
    f = Fernet(_get_key())
    return f.decrypt(token.encode()).decode()


