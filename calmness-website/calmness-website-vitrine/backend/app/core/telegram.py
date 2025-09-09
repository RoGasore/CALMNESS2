


import os
import httpx


TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")
TELEGRAM_CHANNEL_ID = os.getenv("TELEGRAM_CHANNEL_ID", "")


async def add_user_to_channel(invite_link: str | None = None) -> str:
    """Génère/retourne un lien d'invitation au canal.
    Remarque: L'ajout direct par username requiert des permissions; on utilise un lien.
    """
    # Ici on suppose que l'admin a créé un lien d'invitation statique ou via Bot API (si éligible)
    if invite_link:
        return invite_link
    return os.getenv("TELEGRAM_INVITE_LINK", "")


async def remove_user_from_channel(user_telegram_id: str) -> bool:
    """Tentative de bannir/retirer un utilisateur du canal (si permissions)."""
    if not (TELEGRAM_BOT_TOKEN and TELEGRAM_CHANNEL_ID and user_telegram_id):
        return False
    api = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/banChatMember"
    async with httpx.AsyncClient(timeout=10) as client:
        try:
            r = await client.post(api, data={
                "chat_id": TELEGRAM_CHANNEL_ID,
                "user_id": user_telegram_id,
                "revoke_messages": True
            })
            return r.status_code == 200 and r.json().get("ok", False)
        except Exception:
            return False


