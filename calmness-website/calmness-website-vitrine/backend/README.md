# Calmness FI Backend

Backend Python avec FastAPI et PostgreSQL pour la gestion du contenu du site Calmness FI.

## 🚀 Démarrage rapide

### Option 1: Avec Docker (Recommandé)

1. **Démarrer PostgreSQL avec Docker Compose :**
   ```bash
   docker-compose up -d
   ```

2. **Installer les dépendances Python :**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configurer l'environnement :**
   ```bash
   cp env.example .env
   # Modifiez .env si nécessaire (les valeurs par défaut fonctionnent avec Docker)
   ```

4. **Démarrer le backend :**
   ```bash
   python start.py
   ```

### Option 2: PostgreSQL local

1. **Installer PostgreSQL** sur votre système
2. **Créer la base de données :**
   ```sql
   CREATE DATABASE calmness_db;
   ```

3. **Configurer l'environnement :**
   ```bash
   cp env.example .env
   # Modifiez .env avec vos paramètres PostgreSQL
   ```

4. **Installer et démarrer :**
   ```bash
   pip install -r requirements.txt
   python start.py
   ```

## 📱 Accès aux interfaces

- **Interface d'administration :** http://localhost:8000/admin/
- **API REST :** http://localhost:8000/api/
- **Documentation API :** http://localhost:8000/docs
- **Adminer (gestion BDD) :** http://localhost:8080 (si Docker)

## 🗄️ Structure de la base de données

### Tables principales

- **`pages_content`** : Contenu des pages (accueil, à propos, contact)
- **`services`** : Services proposés
- **`faq`** : Questions fréquemment posées

### Structure du contenu des pages

Le contenu est organisé par page et section :

```json
{
  "page": "accueil",
  "section": "hero_title",
  "content": "Analyse • Signal • Exécution"
}
```

## 🔧 API Endpoints

### Pages
- `GET /api/pages/{page}` - Récupérer le contenu d'une page
- `POST /api/pages/{page}` - Mettre à jour le contenu d'une page

### Services
- `GET /api/services` - Lister tous les services
- `POST /api/services` - Créer un service
- `PUT /api/services/{id}` - Modifier un service
- `DELETE /api/services/{id}` - Supprimer un service

### FAQ
- `GET /api/faq` - Lister toutes les FAQ
- `POST /api/faq` - Créer une FAQ
- `PUT /api/faq/{id}` - Modifier une FAQ
- `DELETE /api/faq/{id}` - Supprimer une FAQ

## 🎨 Interface d'administration

L'interface d'administration permet de :

- **Dashboard** : Vue d'ensemble des statistiques
- **Page d'accueil** : Modifier le contenu de la page d'accueil
- **À propos** : Gérer le contenu de la page à propos
- **Services** : Ajouter, modifier, supprimer des services
- **Contact** : Modifier les informations de contact
- **FAQ** : Gérer les questions fréquemment posées

## 🔄 Intégration avec le frontend

Le frontend Next.js peut récupérer le contenu via les endpoints API :

```javascript
// Exemple de récupération du contenu de la page d'accueil
const response = await fetch('http://localhost:8000/api/pages/accueil');
const data = await response.json();
```

## 🛠️ Développement

### Structure du projet

```
backend/
├── app/
│   └── main.py              # Application FastAPI principale
├── admin/
│   ├── index.html           # Interface d'administration
│   ├── style.css            # Styles CSS
│   └── script.js            # JavaScript
├── requirements.txt         # Dépendances Python
├── init_data.py            # Script d'initialisation des données
├── start.py                # Script de démarrage
├── docker-compose.yml      # Configuration Docker
└── README.md               # Ce fichier
```

### Ajouter de nouveaux champs

1. Modifier la structure de la base de données dans `main.py`
2. Mettre à jour l'interface d'administration dans `admin/`
3. Ajouter les nouveaux champs dans `init_data.py`

## 🐛 Dépannage

### Erreur de connexion à la base de données
- Vérifiez que PostgreSQL est démarré
- Vérifiez les paramètres dans `.env`
- Testez la connexion : `psql -h localhost -U postgres -d calmness_db`

### Port déjà utilisé
- Changez le port dans `start.py` ou arrêtez le processus qui utilise le port 8000

### Dépendances manquantes
- Réinstallez : `pip install -r requirements.txt`

## 📝 Notes

- Le backend utilise PostgreSQL pour la persistance des données
- L'interface d'administration est responsive et fonctionne sur mobile
- Les données sont automatiquement initialisées au premier démarrage
- Le serveur redémarre automatiquement lors des modifications (mode développement)
