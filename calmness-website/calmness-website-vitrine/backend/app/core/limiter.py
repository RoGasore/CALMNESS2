from time import time
from typing import Dict, Tuple
from fastapi import HTTPException, status


# Limiteur basique en mémoire (à remplacer par Redis en production)
_BUCKETS: Dict[str, Tuple[int, float]] = {}


def rate_limit(key: str, max_calls: int = 10, window_seconds: int = 60) -> None:
    """Limitation de débit très simple (clé = user/ip/action).
    - max_calls: nombre d'appels autorisés dans la fenêtre
    - window_seconds: taille de la fenêtre en secondes
    """
    now = time()
    calls, start = _BUCKETS.get(key, (0, now))
    # Réinitialiser la fenêtre si expirée
    if now - start > window_seconds:
        calls, start = 0, now
    calls += 1
    _BUCKETS[key] = (calls, start)
    if calls > max_calls:
        raise HTTPException(status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                            detail="Trop de requêtes, veuillez réessayer plus tard.")





