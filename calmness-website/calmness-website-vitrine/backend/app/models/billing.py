from datetime import datetime, timedelta
from typing import Optional
from pydantic import BaseModel, Field


class PaymentMethod(BaseModel):
    id: Optional[int] = None
    user_id: int
    provider: str  # 'bank', 'mobile', 'card', 'crypto', 'paypal'
    label: str
    details_encrypted: str  # encrypted JSON payload (PCI-like, never plain)
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class Payment(BaseModel):
    id: Optional[int] = None
    user_id: int
    service_code: str  # e.g. 'signaux-premium', 'signaux-vip', 'formations-basique'
    amount: float
    currency: str = "USD"
    status: str = "pending"  # pending, succeeded, failed, refunded
    provider: str
    provider_txn_id: Optional[str] = None
    metadata: Optional[str] = None  # JSON string with extra context
    idempotency_key: Optional[str] = None
    hmac_signature: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class Subscription(BaseModel):
    id: Optional[int] = None
    user_id: int
    plan_code: str  # 'signaux-weekly' | 'signaux-monthly' | etc.
    status: str = "active"  # active, canceled, expired
    current_period_start: datetime = Field(default_factory=datetime.utcnow)
    current_period_end: datetime = Field(default_factory=lambda: datetime.utcnow() + timedelta(days=30))
    auto_renew: bool = True
    telegram_chat_id: Optional[str] = None
    telegram_joined_at: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class AdminConfig(BaseModel):
    id: Optional[int] = None
    key: str  # e.g. 'wallet_btc', 'wallet_eth', 'bank_iban', 'email_from', 'telegram_channel_id'
    value_encrypted: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


