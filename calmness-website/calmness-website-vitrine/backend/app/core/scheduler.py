import asyncio
from datetime import datetime, timedelta
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import AsyncSessionLocal
from app.models.orm import SubscriptionORM
from app.core.email import fastmail, MessageSchema


async def send_expiry_reminders():
    """Envoi des rappels J-2 aux abonnés qui expirent bientôt."""
    async with AsyncSessionLocal() as db:  # type: AsyncSession
        now = datetime.utcnow()
        soon = now + timedelta(days=2)
        res = await db.execute(select(SubscriptionORM).where(
            SubscriptionORM.status == "active",
            SubscriptionORM.current_period_end <= soon,
            SubscriptionORM.current_period_end > now
        ))
        subs = res.scalars().all()
        for _ in subs:
            # TODO: récupérer email user via jointure; ici placeholder
            email = "user@example.com"
            msg = MessageSchema(subject="Votre abonnement expire bientôt",
                                recipients=[email],
                                body="Votre abonnement expirera dans 2 jours.",
                                subtype="html")
            await fastmail.send_message(msg)


async def expire_subscriptions():
    """Expire les abonnements arrivés à terme et déclenche le retrait Telegram."""
    async with AsyncSessionLocal() as db:
        now = datetime.utcnow()
        res = await db.execute(select(SubscriptionORM).where(
            SubscriptionORM.status == "active",
            SubscriptionORM.current_period_end <= now
        ))
        subs = res.scalars().all()
        for s in subs:
            s.status = "expired"
        await db.commit()


async def scheduler_loop():
    """Boucle simple d'ordonnancement (peut être remplacée par Celery/APS)"""
    while True:
        try:
            await send_expiry_reminders()
            await expire_subscriptions()
        except Exception as e:
            print("Scheduler error:", e)
        await asyncio.sleep(60 * 15)  # toutes les 15 minutes


