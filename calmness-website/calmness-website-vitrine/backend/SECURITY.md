# Sécurité Backend Calmness FI

Ce document décrit en détail les mesures de sécurité mises en place pour le système de paiements, d'abonnements aux signaux et d'intégrations (Telegram, Email). Il constitue la référence pour les développeurs, DevOps et auditeurs.

## Objectifs
- Authentification et autorisation robustes (JWT, scopes, rôles, 2FA optionnelle)
- Confidentialité des données sensibles (chiffrement au repos et en transit)
- Intégrité des paiements (idempotency, signatures HMAC, webhooks vérifiés)
- Résilience et anti-abus (rate limiting, bruteforce protection, audit logs)
- Conformité basique PCI-like (jamais stocker de cartes en clair)

## Architecture
- **API**: FastAPI
- **DB**: PostgreSQL
- **Emails**: SMTP via FastAPI-Mail
- **SMS/2FA**: Twilio (optionnel)
- **Telegram**: Bot API pour ajout/retrait au canal
- **Scheduler**: tâches planifiées (rappels, expirations)

## Authentification/Autorisation
- JWT signé (HS256) avec `SECRET_KEY`, rotation périodique recommandée.
- Expiration d’accès courte (30 min) + refresh tokens (à ajouter si nécessaire).
- 2FA optionnelle (TOTP/SMS). Les codes expirent rapidement et sont soumis à rate limit.
- Rôles et scopes (admin, user). Les endpoints admin sont protégés par scopes.
- Protection CSRF non nécessaire pour API pure; CORS restrictif aux domaines connus.

## Données sensibles et chiffrement
- Toute information de paiement utilisateur (`PaymentMethod.details_encrypted`) est chiffrée côté serveur (AES-GCM via Fernet/NaCl). Les clés KMS/ENV sont gérées hors repo.
- Jamais stocker de PAN/CSC en clair. Idéalement déléguer aux PSPs (Stripe/PayPal/MobileMoney API) et ne garder que des tokens.
- Variables sensibles chargées via `.env` (jamais commit), montées en secret en prod.

## Paiements et Webhooks
- `idempotency_key` requis pour `POST /api/billing/payments/init` afin d’éviter les doubles débits lors de retries.
- Signature HMAC de toutes les requêtes sortantes vers PSPs; vérification systématique des webhooks entrants:
  - En-tête `X-Signature` HMAC-SHA256 calculée sur le corps
  - Vérifier le timestamp pour éviter les replays
- États de paiement: pending → succeeded/failed/refunded. Transitions atomiques avec verrous ou transactions DB.
- Journaliser toutes les callbacks (audit logs) et alerter en cas d’incohérence.

## Abonnements, Telegram et Emails
- Plans: `signaux-weekly` (7 jours), `signaux-monthly` (30 jours)
- À la réussite du paiement: création/renouvellement d’abonnement, ajout au canal Telegram via bot, envoi d’email de confirmation.
- Deux jours avant l’expiration: envoi d’email de rappel + affichage compte à rebours sur le dashboard.
- À expiration: retrait du canal Telegram et email de fin d’abonnement.

## Anti-abus & Observabilité
- Rate limiting par IP et par user: login, init paiement, webhooks.
- Protection bruteforce: backoff exponentiel, verrouillage temporaire.
- Logs structurés (JSON) pour toutes les actions critiques: auth, paiements, webhooks, changements admin.
- Traces et métriques (Prometheus/OpenTelemetry) recommandées en prod.

## Administration & Configuration
- Endpoint admin sécurisé pour gérer: adresses de réception (crypto/bancaire), email de l’entreprise, `telegram_channel_id`, etc.
- Les valeurs sont stockées chiffrées (`AdminConfig.value_encrypted`).
- CRUD avec audit log, double confirmation pour suppressions sensibles.

## Stockage et migrations
- Tables suggérées (DDL simplifié): `payment_methods`, `payments`, `subscriptions`, `admin_config`, `audit_logs`.
- Indices sur `user_id`, `idempotency_key`, `status`, `plan_code`.
- Migrations gérées via Alembic.

## Check-list sécurité déploiement
- HTTPS obligatoire (HSTS, TLS 1.2+).
- CORS sur domaines de prod uniquement.
- `SECRET_KEY` fort, rotation planifiée.
- Sauvegardes chiffrées, rotation des logs, rétention limitée.
- Pare-feu, WAF/Cloud proxy, IP allowlist pour webhooks si possible.
- Scans SAST/DAST + dépendances (pip-audit) CI/CD.

## Réponses aux incidents
- Procédure de révocation de clés/jetons.
- Relecture des logs, gel des comptes suspects, notify admin.
- Post-mortem et correctifs.

## Roadmap sécurité
- Ajout Refresh tokens + Revocation list
- Store KMS (Hashicorp Vault/AWS KMS) pour clés de chiffrement
- Signatures sortantes vers front (nonce/opaque tokens)
- Séparation stricte des rôles et secrets par environnement
