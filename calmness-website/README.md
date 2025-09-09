# Calmness FI - Site Vitrine

Un site web vitrine moderne pour une entreprise de trading, construit avec Next.js 14 et Strapi 4.

## 🏗️ Architecture

- **Frontend**: Next.js 14 avec TypeScript et Tailwind CSS
- **Backend**: Strapi 4 (CMS Headless)
- **Base de données**: SQLite (pour la simplicité de développement)

## 📁 Structure du projet

```
calmness-website/
├── calmness-strapi/          # Application Strapi (Backend/CMS)
└── calmness-website-vitrine/ # Application Next.js (Frontend)
```

## 🚀 Installation et Lancement

### Prérequis

- Node.js 18+ installé
- npm installé

### 1. Installation des dépendances

**Pour Strapi :**
```bash
cd calmness-strapi
npm install
```

**Pour Next.js :**
```bash
cd calmness-website-vitrine
npm install
```

### 2. Lancement des serveurs

#### Démarrer Strapi (Backend)

```bash
cd calmness-strapi
npm run develop
```

Strapi sera accessible à : http://localhost:1337

**Première connexion :**
1. Ouvrez http://localhost:1337/admin
2. Créez votre compte administrateur
3. Les permissions publiques seront configurées automatiquement au démarrage

#### Démarrer Next.js (Frontend)

```bash
cd calmness-website-vitrine
npm run dev
```

Le site web sera accessible à : http://localhost:3000

## 📝 Configuration du contenu dans Strapi

### 1. Accéder à l'administration Strapi

1. Ouvrez http://localhost:1337/admin
2. Connectez-vous avec votre compte administrateur

### 2. Content-Types disponibles

Le projet inclut 4 types de contenu :

#### **Page Accueil** (Single Type)
- **Titre** : Titre principal de la page
- **Slogan** : Slogan accrocheur
- **Description** : Description de l'entreprise (texte riche)
- **Image** : Image principale (optionnelle)

#### **Page À Propos** (Single Type)
- **Titre** : Titre de la page
- **Histoire** : Histoire de l'entreprise (texte riche)
- **Mission** : Mission de l'entreprise (texte riche)
- **Valeurs** : Valeurs de l'entreprise (texte riche)

#### **Services** (Collection Type)
- **Titre** : Nom du service
- **Description** : Description du service
- **Ordre** : Ordre d'affichage (numérique)

#### **Page Contact** (Single Type)
- **Titre** : Titre de la page
- **Adresse** : Adresse de l'entreprise
- **Téléphone** : Numéro de téléphone
- **Email** : Adresse email
- **Horaires** : Horaires d'ouverture (optionnel)

### 3. Ajouter du contenu

1. Dans le menu de gauche, cliquez sur "Content Manager"
2. Sélectionnez le type de contenu que vous souhaitez modifier
3. Cliquez sur "Create new entry" ou modifiez une entrée existante
4. Remplissez les champs et cliquez sur "Save"
5. **Important** : Cliquez sur "Publish" pour rendre le contenu visible sur le site

## 🎨 Personnalisation du design

### Couleurs

Le site utilise une palette de couleurs définie dans `tailwind.config.ts` :

- **Primary** : Nuances de bleu (du bleu clair au bleu foncé)
- **Secondary** : Nuances de gris (du gris clair au gris foncé)

### Modification des couleurs

Pour changer les couleurs, modifiez le fichier :
`calmness-website-vitrine/tailwind.config.ts`

### Polices

Le site utilise la police **Inter** de Google Fonts, définie dans le layout principal.

## 📱 Pages du site

1. **Accueil** (`/`) - Page d'accueil avec hero section et présentation
2. **À Propos** (`/a-propos`) - Histoire, mission et valeurs de l'entreprise
3. **Services** (`/services`) - Liste des services offerts
4. **Contact** (`/contact`) - Formulaire de contact et coordonnées

## 🔧 Scripts disponibles

### Strapi
```bash
npm run develop  # Mode développement
npm run start    # Mode production
npm run build    # Build pour la production
```

### Next.js
```bash
npm run dev      # Mode développement
npm run build    # Build pour la production
npm run start    # Serveur de production
npm run lint     # Linting du code
```

## 🌐 Configuration de production

### Variables d'environnement

**Strapi (.env) :**
```env
HOST=0.0.0.0
PORT=1337
APP_KEYS="your-app-keys"
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret
```

**Next.js (.env.local) :**
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

### Déploiement

1. **Strapi** : Peut être déployé sur Heroku, DigitalOcean, AWS, etc.
2. **Next.js** : Peut être déployé sur Vercel, Netlify, etc.

N'oubliez pas de :
- Mettre à jour `NEXT_PUBLIC_STRAPI_URL` avec l'URL de production de Strapi
- Configurer les CORS dans Strapi pour autoriser votre domaine frontend
- Utiliser une base de données PostgreSQL ou MySQL en production

## 🆘 Support et dépannage

### Problèmes courants

1. **Erreur de connexion à l'API** : Vérifiez que Strapi est démarré et accessible
2. **Contenu non affiché** : Assurez-vous que le contenu est publié dans Strapi
3. **Erreurs de CORS** : Vérifiez la configuration des middlewares dans Strapi

### Logs

- **Strapi** : Les logs s'affichent dans le terminal où vous avez lancé `npm run develop`
- **Next.js** : Les logs s'affichent dans le terminal et dans la console du navigateur

## 📞 Contact

Pour toute question technique, consultez la documentation officielle :
- [Next.js Documentation](https://nextjs.org/docs)
- [Strapi Documentation](https://docs.strapi.io/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Développé avec ❤️ pour Calmness FI**