#!/usr/bin/env python3
"""
Script pour initialiser la base de données avec des données par défaut
"""

import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

def get_db_connection():
    try:
        conn = psycopg2.connect(
            host=os.getenv("DB_HOST", "localhost"),
            database=os.getenv("DB_NAME", "calmness_db"),
            user=os.getenv("DB_USER", "postgres"),
            password=os.getenv("DB_PASSWORD", "password"),
            port=os.getenv("DB_PORT", "5432")
        )
        return conn
    except Exception as e:
        print(f"Database connection error: {e}")
        return None

def init_default_data():
    conn = get_db_connection()
    if not conn:
        print("❌ Impossible de se connecter à la base de données")
        return False
    
    try:
        cursor = conn.cursor()
        
        # Données par défaut pour la page d'accueil
        home_data = [
            ("accueil", "hero_title", "Analyse • Signal • Exécution"),
            ("accueil", "hero_subtitle", "Des marchés plus lisibles, des décisions plus simples."),
            ("accueil", "hero_button", "Découvrir nos services"),
            ("accueil", "about_title", "À Propos"),
            ("accueil", "about_text_1", "Chez Calmness, nous sommes bien plus qu'une simple plateforme de trading. Nous sommes une école de pensée dédiée à la discipline, la sagesse et la sérénité. Dans un monde financier où la précipitation et l'émotion mènent trop souvent à l'échec, nous croyons fermement que le véritable succès ne repose pas sur la chance ou la rapidité, mais sur la maîtrise de soi."),
            ("accueil", "about_text_2", "Notre mission est de transformer la manière de trader en cultivant le calme face aux fluctuations du marché. Nous nous engageons à former des traders qui agissent avec précision et confiance, en alliant la discipline et la rigueur à une vision stratégique à long terme. Chez Calmness, nous construisons un capital de sagesse autant qu'un capital financier."),
            ("accueil", "about_text_3", "Rejoignez notre communauté de passionnés unis par une valeur commune : le calme est la clé de la maîtrise, et la maîtrise est la voie de la liberté. Nous sommes la famille de traders qui prouve que la patience, la stratégie et la sérénité sont les véritables leviers du succès durable."),
            ("accueil", "about_link", "En savoir plus"),
            ("accueil", "services_title", "Nos Services"),
            ("accueil", "contact_title", "Contactez-nous"),
            ("accueil", "contact_email", "contact@calmnesstrading.com"),
            ("accueil", "contact_phone", "+33 1 23 45 67 89"),
            ("accueil", "contact_address", "Paris, France"),
            ("accueil", "faq_title", "Questions Fréquentes"),
            ("accueil", "community_title", "Rejoignez notre Communauté"),
            ("accueil", "community_text", "Connectez-vous avec d'autres traders, partagez vos expériences et progressez ensemble vers le succès."),
            ("accueil", "community_login", "Se connecter"),
            ("accueil", "community_register", "S'inscrire")
        ]
        
        # Données par défaut pour la page à propos
        about_data = [
            ("a-propos", "hero_title", "À Propos de Calmness"),
            ("a-propos", "hero_subtitle", "L'école de pensée dédiée à la discipline, la sagesse et la sérénité"),
            ("a-propos", "intro_text", "Chez Calmness, nous sommes bien plus qu'une simple plateforme de trading. Nous sommes une école de pensée dédiée à la discipline, la sagesse et la sérénité."),
            ("a-propos", "context_text_1", "Dans un monde financier où la précipitation et l'émotion mènent trop souvent à l'échec, nous croyons fermement que le véritable succès ne repose pas sur la chance ou la rapidité, mais sur la maîtrise de soi."),
            ("a-propos", "context_text_2", "Notre mission est de transformer la manière de trader en cultivant le calme face aux fluctuations du marché et en développant une approche méthodique et réfléchie de l'investissement."),
            ("a-propos", "mission_title", "Notre Mission : Former des Traders Maîtres de Leur Art"),
            ("a-propos", "mission_intro", "Nous nous engageons à former des traders qui agissent avec précision et confiance. Notre méthode unique vous enseigne à :"),
            ("a-propos", "mission_objective_1", "— Transformer vos émotions en une force intérieure et une clarté d'esprit"),
            ("a-propos", "mission_objective_2", "— Allier la discipline et la rigueur à une vision stratégique à long terme"),
            ("a-propos", "mission_objective_3", "— Construire un capital de sagesse autant qu'un capital financier"),
            ("a-propos", "family_title", "Rejoignez notre Famille de Traders"),
            ("a-propos", "family_text_1", "Être membre de Calmness, c'est rejoindre une communauté de passionnés unis par une valeur commune : le calme est la clé de la maîtrise, et la maîtrise est la voie de la liberté."),
            ("a-propos", "family_text_2", "Nous sommes la famille de traders qui prouve que la patience, la stratégie et la sérénité sont les véritables leviers du succès durable."),
            ("a-propos", "family_text_3", "Ensemble, nous construisons un environnement d'apprentissage mutuel où chaque membre contribue à l'épanouissement et au succès de la communauté tout entière."),
            ("a-propos", "values_title", "Nos Valeurs"),
            ("a-propos", "value_stability", "Stabilité"),
            ("a-propos", "value_stability_desc", "Rester calme face aux tempêtes du marché"),
            ("a-propos", "value_learning", "Apprentissage"),
            ("a-propos", "value_learning_desc", "Construire une expertise durable"),
            ("a-propos", "value_community", "Communauté"),
            ("a-propos", "value_community_desc", "Grandir ensemble vers le succès"),
            ("a-propos", "value_protection", "Protection"),
            ("a-propos", "value_protection_desc", "Préserver votre capital et votre paix"),
            ("a-propos", "cta_title", "Prêt à rejoindre la Famille Calmness ?"),
            ("a-propos", "cta_text", "Commencez votre transformation dès aujourd'hui et découvrez comment le calme peut devenir votre plus grand atout dans le trading."),
            ("a-propos", "cta_button_1", "Découvrir nos Formations"),
            ("a-propos", "cta_button_2", "Nous Contacter")
        ]
        
        # Données par défaut pour la page contact
        contact_data = [
            ("contact", "hero_title", "Contactez-nous"),
            ("contact", "hero_subtitle", "Nous sommes là pour vous accompagner dans votre parcours de trading"),
            ("contact", "address", "Adresse à définir"),
            ("contact", "phone", "Téléphone à définir"),
            ("contact", "email", "contact@calmnesstrading.com"),
            ("contact", "schedule", "Horaires à définir"),
            ("contact", "form_title", "Envoyez-nous un message")
        ]
        
        # Insérer les données
        for page, section, content in home_data + about_data + contact_data:
            cursor.execute(
                "INSERT INTO pages_content (page, section, content) VALUES (%s, %s, %s) ON CONFLICT (page, section) DO UPDATE SET content = EXCLUDED.content",
                (page, section, content)
            )
        
        # Services par défaut
        services_data = [
            ("Formations au Trading", "Apprenez les bases du trading avec nos formations complètes. De l'analyse technique à la gestion du risque, maîtrisez tous les aspects du trading professionnel.", "fa-solid fa-chart-line", "/services/formations", 1),
            ("Liaison des Comptes", "Connectez votre compte de trading à notre plateforme pour un suivi automatique de vos performances et des rapports détaillés.", "fa-solid fa-link", "/services/liaison-comptes", 2),
            ("Signaux & Analyses", "Recevez des signaux de trading en temps réel avec nos analyses quotidiennes des marchés financiers.", "fa-solid fa-chart-bar", "/services/signaux", 3),
            ("Communauté", "Rejoignez notre communauté de traders passionnés, partagez vos expériences et progressez ensemble vers le succès.", "fa-solid fa-users", "/services/communaute", 4)
        ]
        
        for title, description, icon, link, order in services_data:
            cursor.execute(
                "INSERT INTO services (title, description, icon, link, \"order\") VALUES (%s, %s, %s, %s, %s) ON CONFLICT DO NOTHING",
                (title, description, icon, link, order)
            )
        
        # FAQ par défaut
        faq_data = [
            ("Qu'est-ce que Calmness FI ?", "Calmness FI est une plateforme de trading éducative qui se concentre sur l'enseignement de la discipline, de la sagesse et de la sérénité dans le trading. Nous formons des traders maîtres de leur art en cultivant le calme face aux fluctuations du marché.", 1),
            ("Comment commencer avec Calmness FI ?", "Pour commencer, vous pouvez vous inscrire sur notre plateforme, suivez nos formations gratuites, et rejoignez notre communauté de traders. Nous offrons des ressources éducatives complètes pour tous les niveaux.", 2),
            ("Vos services sont-ils adaptés aux débutants ?", "Absolument ! Nos formations sont conçues pour tous les niveaux, des débutants complets aux traders expérimentés. Nous commençons par les bases et progressons vers des concepts plus avancés.", 3),
            ("Y a-t-il un support client ?", "Oui, notre équipe est disponible pour vous accompagner dans votre parcours de trading. Nous offrons un support personnalisé avec des sessions individuelles avec nos experts, des révisions de portefeuille, et un coaching personnalisé.", 4),
            ("Quels types de formations proposez-vous ?", "Nous proposons des formations complètes incluant l'analyse technique, la gestion du risque, la psychologie du trading, et notre méthode unique de maîtrise émotionnelle. Toutes nos formations incluent des sessions pratiques et un suivi personnalisé.", 5),
            ("Proposez-vous des signaux de trading ?", "Oui, nous fournissons des signaux de trading de haute qualité basés sur notre analyse technique approfondie. Nos signaux incluent des niveaux d'entrée, de sortie, et de stop-loss avec des explications détaillées.", 6),
            ("Comment gérez-vous le risque ?", "La gestion du risque est au cœur de notre méthode. Nous enseignons des techniques de position sizing, de diversification, et de protection du capital. Chaque trade est analysé avec un ratio risque/récompense optimal.", 7),
            ("Y a-t-il une garantie de satisfaction ?", "Nous offrons une garantie de satisfaction de 30 jours sur tous nos services. Si vous n'êtes pas satisfait, nous vous remboursons intégralement.", 8)
        ]
        
        for question, answer, order in faq_data:
            cursor.execute(
                "INSERT INTO faq (question, answer, \"order\") VALUES (%s, %s, %s) ON CONFLICT DO NOTHING",
                (question, answer, order)
            )
        
        conn.commit()
        cursor.close()
        conn.close()
        
        print("✅ Données par défaut initialisées avec succès !")
        return True
        
    except Exception as e:
        print(f"❌ Erreur lors de l'initialisation des données : {e}")
        return False

if __name__ == "__main__":
    print("🚀 Initialisation des données par défaut...")
    init_default_data()
