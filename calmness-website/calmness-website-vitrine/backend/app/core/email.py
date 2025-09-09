import os
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from fastapi import BackgroundTasks
from typing import List, Optional

# Email configuration
conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv("MAIL_USERNAME", "your-email@gmail.com"),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD", "your-app-password"),
    MAIL_FROM=os.getenv("MAIL_FROM", "noreply@calmnessfi.com"),
    MAIL_PORT=587,
    MAIL_SERVER=os.getenv("MAIL_SERVER", "smtp.gmail.com"),
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)

fastmail = FastMail(conf)

async def send_email_verification(email: str, verification_token: str, username: str):
    """Send email verification"""
    verification_url = f"{os.getenv('FRONTEND_URL', 'http://localhost:3000')}/verify-email?token={verification_token}"
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Vérification de votre compte Calmness FI</title>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
            .content {{ background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }}
            .button {{ display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }}
            .footer {{ text-align: center; margin-top: 30px; color: #666; font-size: 14px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🎯 Calmness FI</h1>
                <h2>Vérification de votre compte</h2>
            </div>
            <div class="content">
                <p>Bonjour <strong>{username}</strong>,</p>
                <p>Merci de vous être inscrit sur Calmness FI ! Pour activer votre compte, veuillez cliquer sur le bouton ci-dessous :</p>
                <p style="text-align: center;">
                    <a href="{verification_url}" class="button">Vérifier mon compte</a>
                </p>
                <p>Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre navigateur :</p>
                <p style="word-break: break-all; background: #eee; padding: 10px; border-radius: 5px;">{verification_url}</p>
                <p>Ce lien est valide pendant 24 heures.</p>
                <p>Si vous n'avez pas créé de compte sur Calmness FI, vous pouvez ignorer cet email.</p>
            </div>
            <div class="footer">
                <p>© 2024 Calmness FI. Tous droits réservés.</p>
                <p>Cet email a été envoyé automatiquement, merci de ne pas y répondre.</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    message = MessageSchema(
        subject="Vérification de votre compte Calmness FI",
        recipients=[email],
        body=html_content,
        subtype="html"
    )
    
    await fastmail.send_message(message)

async def send_password_reset(email: str, reset_token: str, username: str):
    """Send password reset email"""
    reset_url = f"{os.getenv('FRONTEND_URL', 'http://localhost:3000')}/reset-password?token={reset_token}"
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Réinitialisation de votre mot de passe</title>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
            .content {{ background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }}
            .button {{ display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }}
            .footer {{ text-align: center; margin-top: 30px; color: #666; font-size: 14px; }}
            .warning {{ background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🔐 Calmness FI</h1>
                <h2>Réinitialisation de mot de passe</h2>
            </div>
            <div class="content">
                <p>Bonjour <strong>{username}</strong>,</p>
                <p>Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe :</p>
                <p style="text-align: center;">
                    <a href="{reset_url}" class="button">Réinitialiser mon mot de passe</a>
                </p>
                <p>Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre navigateur :</p>
                <p style="word-break: break-all; background: #eee; padding: 10px; border-radius: 5px;">{reset_url}</p>
                <div class="warning">
                    <strong>⚠️ Important :</strong> Ce lien est valide pendant 1 heure seulement. Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.
                </div>
            </div>
            <div class="footer">
                <p>© 2024 Calmness FI. Tous droits réservés.</p>
                <p>Cet email a été envoyé automatiquement, merci de ne pas y répondre.</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    message = MessageSchema(
        subject="Réinitialisation de votre mot de passe - Calmness FI",
        recipients=[email],
        body=html_content,
        subtype="html"
    )
    
    await fastmail.send_message(message)

async def send_2fa_sms_code(phone_number: str, code: str):
    """Send 2FA SMS code"""
    from twilio.rest import Client
    
    account_sid = os.getenv("TWILIO_ACCOUNT_SID")
    auth_token = os.getenv("TWILIO_AUTH_TOKEN")
    from_number = os.getenv("TWILIO_PHONE_NUMBER")
    
    if not all([account_sid, auth_token, from_number]):
        raise Exception("Twilio configuration missing")
    
    client = Client(account_sid, auth_token)
    
    message = client.messages.create(
        body=f"Votre code de vérification Calmness FI : {code}. Ce code expire dans 10 minutes.",
        from_=from_number,
        to=phone_number
    )
    
    return message.sid

async def send_welcome_email(email: str, username: str):
    """Send welcome email after successful registration"""
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Bienvenue sur Calmness FI</title>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
            .content {{ background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }}
            .button {{ display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }}
            .footer {{ text-align: center; margin-top: 30px; color: #666; font-size: 14px; }}
            .feature {{ background: white; padding: 20px; margin: 15px 0; border-radius: 5px; border-left: 4px solid #667eea; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🎉 Bienvenue sur Calmness FI !</h1>
                <p>Votre compte a été créé avec succès</p>
            </div>
            <div class="content">
                <p>Bonjour <strong>{username}</strong>,</p>
                <p>Félicitations ! Votre compte Calmness FI est maintenant actif. Vous pouvez commencer votre parcours vers la maîtrise du trading.</p>
                
                <div class="feature">
                    <h3>🚀 Commencez votre formation</h3>
                    <p>Découvrez nos formations complètes pour maîtriser l'art du trading avec sérénité.</p>
                </div>
                
                <div class="feature">
                    <h3>👥 Rejoignez la communauté</h3>
                    <p>Connectez-vous avec d'autres traders passionnés et partagez vos expériences.</p>
                </div>
                
                <div class="feature">
                    <h3>📊 Accédez aux signaux</h3>
                    <p>Recevez des signaux de trading en temps réel avec nos analyses quotidiennes.</p>
                </div>
                
                <p style="text-align: center;">
                    <a href="{os.getenv('FRONTEND_URL', 'http://localhost:3000')}/dashboard" class="button">Accéder à mon dashboard</a>
                </p>
                
                <p>Si vous avez des questions, n'hésitez pas à nous contacter. Notre équipe est là pour vous accompagner.</p>
            </div>
            <div class="footer">
                <p>© 2024 Calmness FI. Tous droits réservés.</p>
                <p>Cet email a été envoyé automatiquement, merci de ne pas y répondre.</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    message = MessageSchema(
        subject="Bienvenue sur Calmness FI ! 🎉",
        recipients=[email],
        body=html_content,
        subtype="html"
    )
    
    await fastmail.send_message(message)

