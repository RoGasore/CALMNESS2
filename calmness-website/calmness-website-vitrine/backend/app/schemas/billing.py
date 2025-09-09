from datetime import datetime
from typing import Optional, Literal
from pydantic import BaseModel, Field, condecimal


Provider = Literal['bank','mobile','card','crypto','paypal']


class PaymentMethodCreate(BaseModel):
    provider: Provider
    label: str
    details: dict


class PaymentMethodOut(BaseModel):
    id: int
    provider: Provider
    label: str
    is_active: bool
    created_at: datetime
    updated_at: datetime


class PaymentInit(BaseModel):
    service_code: str
    amount: condecimal(gt=0)
    currency: str = "USD"
    provider: Provider
    idempotency_key: Optional[str] = None
    metadata: Optional[dict] = None


class PaymentOut(BaseModel):
    id: int
    status: str
    provider: Provider
    amount: condecimal(gt=0)
    currency: str
    created_at: datetime


class SubscriptionCreate(BaseModel):
    plan_code: Literal['signaux-weekly','signaux-monthly']
    auto_renew: bool = True


class SubscriptionOut(BaseModel):
    id: int
    plan_code: str
    status: str
    current_period_start: datetime
    current_period_end: datetime
    auto_renew: bool


class AdminConfigCreate(BaseModel):
    key: str
    value: str


class AdminConfigOut(BaseModel):
    id: int
    key: str
    created_at: datetime
    updated_at: datetime


