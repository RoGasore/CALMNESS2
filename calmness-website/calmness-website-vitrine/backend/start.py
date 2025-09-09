#!/usr/bin/env python3
"""
Script de démarrage pour le backend Calmness FI
"""

import subprocess
import sys
import os
import time
from pathlib import Path

def check_dependencies():
    """Vérifier que toutes les dépendances sont installées"""
    try:
        import fastapi
        import uvicorn
        import psycopg2
        print("✅ Toutes les dépendances sont installées")
        return True
    except ImportError as e:
        print(f"❌ Dépendance manquante: {e}")
        print("Veuillez installer les dépendances avec: pip install -r requirements.txt")
        return False

def check_env_file():
    """Vérifier que le fichier .env existe"""
    env_file = Path(".env")
    if not env_file.exists():
        print("❌ Fichier .env manquant")
        print("Copiez env.example vers .env et configurez vos paramètres de base de données")
        return False
    print("✅ Fichier .env trouvé")
    return True

def check_database_connection():
    """Vérifier la connexion à la base de données"""
    try:
        from dotenv import load_dotenv
        load_dotenv()
        
        import psycopg2
        
        conn = psycopg2.connect(
            host=os.getenv("DB_HOST", "localhost"),
            database=os.getenv("DB_NAME", "calmness_db"),
            user=os.getenv("DB_USER", "postgres"),
            password=os.getenv("DB_PASSWORD", "password"),
            port=os.getenv("DB_PORT", "5432")
        )
        conn.close()
        print("✅ Connexion à la base de données réussie")
        return True
    except Exception as e:
        print(f"❌ Erreur de connexion à la base de données: {e}")
        print("Vérifiez vos paramètres de base de données dans le fichier .env")
        return False

def init_database():
    """Initialiser la base de données avec les données par défaut"""
    try:
        print("🚀 Initialisation de la base de données...")
        result = subprocess.run([sys.executable, "init_data.py"], capture_output=True, text=True)
        if result.returncode == 0:
            print("✅ Base de données initialisée avec succès")
            return True
        else:
            print(f"❌ Erreur lors de l'initialisation: {result.stderr}")
            return False
    except Exception as e:
        print(f"❌ Erreur lors de l'initialisation: {e}")
        return False

def start_server():
    """Démarrer le serveur FastAPI"""
    try:
        print("🚀 Démarrage du serveur FastAPI...")
        print("📱 Interface d'administration: http://localhost:8000/admin/")
        print("🔗 API: http://localhost:8000/api/")
        print("📚 Documentation: http://localhost:8000/docs")
        print("\nAppuyez sur Ctrl+C pour arrêter le serveur\n")
        
        subprocess.run([
            sys.executable, "-m", "uvicorn", 
            "app.main:app", 
            "--host", "0.0.0.0", 
            "--port", "8000", 
            "--reload"
        ])
    except KeyboardInterrupt:
        print("\n👋 Serveur arrêté")
    except Exception as e:
        print(f"❌ Erreur lors du démarrage du serveur: {e}")

def main():
    """Fonction principale"""
    print("🎯 Calmness FI Backend - Script de démarrage")
    print("=" * 50)
    
    # Vérifications préliminaires
    if not check_dependencies():
        sys.exit(1)
    
    if not check_env_file():
        sys.exit(1)
    
    if not check_database_connection():
        print("\n💡 Conseils pour résoudre le problème de base de données:")
        print("1. Assurez-vous que PostgreSQL est installé et démarré")
        print("2. Créez une base de données nommée 'calmness_db'")
        print("3. Vérifiez les paramètres dans le fichier .env")
        print("4. Ou utilisez Docker: docker run --name postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=calmness_db -p 5432:5432 -d postgres")
        sys.exit(1)
    
    # Initialiser la base de données
    init_database()
    
    # Démarrer le serveur
    start_server()

if __name__ == "__main__":
    main()
