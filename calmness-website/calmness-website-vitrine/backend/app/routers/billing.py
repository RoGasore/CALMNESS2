from fastapi import APIRouter, Depends, HTTPException, Request, status
from typing import List
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.core.crypto import encrypt_str, decrypt_str
from app.models.orm import PaymentMethodORM, PaymentORM, SubscriptionORM, AdminConfigORM, AuditLogORM
from app.core.limiter import rate_limit
from ..schemas.billing import (
    PaymentMethodCreate, PaymentMethodOut,
    PaymentInit, PaymentOut,
    SubscriptionCreate, SubscriptionOut,
    AdminConfigCreate, AdminConfigOut
)

router = APIRouter(prefix="/api/billing", tags=["billing"])


# Remarque: pour ce prototype, on mock l'auth et on passe user_id=1.
# En production, récupérer le user via un Depends(auth) et le JWT.


@router.post("/methods", response_model=PaymentMethodOut, status_code=status.HTTP_201_CREATED)
async def create_payment_method(
    payload: PaymentMethodCreate,
    db: AsyncSession = Depends(get_db),
    user_id: int = 1
):
    # Limiter simple: 5 créations/minute par utilisateur
    rate_limit(f"pm_create:{user_id}", max_calls=5, window_seconds=60)
    """Créer une méthode de paiement pour l'utilisateur (détails chiffrés)."""
    details_enc = encrypt_str(str(payload.details))
    obj = PaymentMethodORM(
        user_id=user_id,
        provider=payload.provider,
        label=payload.label,
        details_encrypted=details_enc,
        is_active=True,
    )
    db.add(obj)
    await db.commit()
    await db.refresh(obj)
    return PaymentMethodOut(
        id=obj.id,
        provider=obj.provider,
        label=obj.label,
        is_active=obj.is_active,
        created_at=obj.created_at,
        updated_at=obj.updated_at,
    )


@router.get("/methods", response_model=List[PaymentMethodOut])
async def list_payment_methods(
    db: AsyncSession = Depends(get_db),
    user_id: int = 1
):
    rate_limit(f"pm_list:{user_id}", max_calls=20, window_seconds=60)
    """Lister les méthodes de paiement actives de l'utilisateur (sans divulguer les détails chiffrés)."""
    res = await db.execute(select(PaymentMethodORM).where(
        PaymentMethodORM.user_id == user_id,
        PaymentMethodORM.is_active == True
    ))
    rows = res.scalars().all()
    return [PaymentMethodOut(
        id=r.id, provider=r.provider, label=r.label, is_active=r.is_active,
        created_at=r.created_at, updated_at=r.updated_at
    ) for r in rows]


@router.delete("/methods/{method_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_payment_method(
    method_id: int,
    db: AsyncSession = Depends(get_db),
    user_id: int = 1
):
    rate_limit(f"pm_delete:{user_id}", max_calls=10, window_seconds=60)
    """Désactiver une méthode de paiement (soft delete)."""
    res = await db.execute(select(PaymentMethodORM).where(
        PaymentMethodORM.id == method_id,
        PaymentMethodORM.user_id == user_id
    ))
    obj = res.scalar_one_or_none()
    if not obj:
        raise HTTPException(status_code=404, detail="Méthode introuvable")
    obj.is_active = False
    await db.commit()
    return


@router.post("/payments/init", response_model=PaymentOut, status_code=status.HTTP_201_CREATED)
async def init_payment(
    payload: PaymentInit,
    request: Request,
    db: AsyncSession = Depends(get_db),
    user_id: int = 1
):
    rate_limit(f"pay_init:{user_id}", max_calls=10, window_seconds=60)
    """Initialiser un paiement de manière idempotente (création en statut pending).
    - Utiliser `idempotency_key` pour éviter les doublons en cas de retry.
    - Journaliser l'action en audit log.
    """
    # Vérification idempotency (clé unique côté DB)
    pay = PaymentORM(
        user_id=user_id,
        service_code=payload.service_code,
        amount=float(payload.amount),
        currency=payload.currency,
        status="pending",
        provider=payload.provider,
        idempotency_key=payload.idempotency_key,
        metadata=str(payload.metadata) if payload.metadata else None,
    )
    db.add(pay)
    try:
        await db.commit()
    except IntegrityError:
        # Un paiement avec la même idempotency_key existe déjà
        await db.rollback()
        res = await db.execute(select(PaymentORM).where(
            PaymentORM.idempotency_key == payload.idempotency_key
        ))
        existing = res.scalar_one_or_none()
        if not existing:
            raise HTTPException(status_code=409, detail="Conflit idempotency")
        return PaymentOut(
            id=existing.id, status=existing.status, provider=existing.provider,
            amount=existing.amount, currency=existing.currency,
            created_at=existing.created_at
        )

    await db.refresh(pay)
    # Audit log (création pending)
    db.add(AuditLogORM(user_id=user_id, action="payment_init", detail=f"payment_id={pay.id}"))
    await db.commit()
    return PaymentOut(
        id=pay.id, status=pay.status, provider=pay.provider,
        amount=pay.amount, currency=pay.currency, created_at=pay.created_at
    )


@router.post("/subscriptions", response_model=SubscriptionOut, status_code=status.HTTP_201_CREATED)
async def create_subscription(
    payload: SubscriptionCreate,
    db: AsyncSession = Depends(get_db),
    user_id: int = 1
):
    rate_limit(f"sub_create:{user_id}", max_calls=10, window_seconds=60)
    """Créer un abonnement (hebdo/mensuel). Telegram/Email seront gérés après confirmation paiement."""
    from datetime import datetime, timedelta
    now = datetime.utcnow()
    end = now + (timedelta(days=7) if payload.plan_code == 'signaux-weekly' else timedelta(days=30))
    sub = SubscriptionORM(
        user_id=user_id,
        plan_code=payload.plan_code,
        status="active",
        current_period_start=now,
        current_period_end=end,
        auto_renew=payload.auto_renew,
    )
    db.add(sub)
    await db.commit()
    await db.refresh(sub)
    return SubscriptionOut(
        id=sub.id, plan_code=sub.plan_code, status=sub.status,
        current_period_start=sub.current_period_start,
        current_period_end=sub.current_period_end,
        auto_renew=sub.auto_renew,
    )


@router.post("/admin/config", response_model=AdminConfigOut, status_code=status.HTTP_201_CREATED)
async def create_admin_config(payload: AdminConfigCreate, db: AsyncSession = Depends(get_db)):
    """Créer une configuration administrateur (valeur chiffrée)."""
    obj = AdminConfigORM(
        key=payload.key,
        value_encrypted=encrypt_str(payload.value),
    )
    db.add(obj)
    try:
        await db.commit()
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=409, detail="Clé déjà existante")
    await db.refresh(obj)
    return AdminConfigOut(id=obj.id, key=obj.key, created_at=obj.created_at, updated_at=obj.updated_at)


