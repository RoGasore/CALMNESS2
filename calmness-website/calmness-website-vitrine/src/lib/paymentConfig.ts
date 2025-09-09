export interface ServiceDetails {
  name: string;
  price: number;
  currency: string;
  period: string;
  description?: string;
  features?: string[];
}

export const serviceDetails: Record<string, ServiceDetails> = {
  'formations-basique': { 
    name: 'Formation Basique', 
    price: 150, 
    currency: '$', 
    period: '',
    description: 'Formation complète pour débuter en trading',
    features: ['Bases du trading', 'Analyse technique niveau 1', 'Gestion du risque', 'Support prioritaire', 'Certificat de completion']
  },
  'formations-avancee': { 
    name: 'Formation Avancée', 
    price: 300, 
    currency: '$', 
    period: '',
    description: 'Formation avancée pour progresser rapidement',
    features: ['Analyse technique avancée', 'Analyse fondamentale', 'Stratégies de trading', 'Mentoring individuel', 'Accès aux signaux']
  },
  'formations-elite': { 
    name: 'Formation Elite', 
    price: 1500, 
    currency: '$', 
    period: '',
    description: 'Formation professionnelle complète',
    features: ['Trading algorithmique', 'Gestion de portefeuille', 'Accès VIP aux signaux', 'Coaching 1-on-1', 'Accès aux outils pro']
  },
  'signaux-premium': { 
    name: 'Signaux Premium', 
    price: 75, 
    currency: '$', 
    period: '/mois',
    description: 'Signaux de trading quotidiens pour traders actifs',
    features: ['Signaux quotidiens', 'Toutes les paires de devises', 'Notifications push', 'Analyse technique détaillée', 'Support prioritaire', 'Historique des performances']
  },
  'signaux-vip': { 
    name: 'Signaux VIP', 
    price: 150, 
    currency: '$', 
    period: '/mois',
    description: 'Signaux VIP pour professionnels',
    features: ['Tout du plan Premium', 'Signaux en temps réel', 'Alertes personnalisées', 'Accès aux algorithmes', 'Coaching individuel', 'Support 24/7']
  },
  'liaison-comptes': { 
    name: 'Liaison des Comptes', 
    price: 100, 
    currency: '$', 
    period: '',
    description: 'Service de liaison de comptes de trading',
    features: ['Connexion automatique', 'Suivi des performances', 'Rapports détaillés', 'Support technique', 'Sécurité maximale']
  }
};

export const paymentMethods = [
  {
    id: 'bank',
    name: 'Virement Bancaire',
    icon: 'ri-bank-line',
    description: 'Transfert direct depuis votre compte bancaire',
    countries: ['France', 'RDC', 'Belgique', 'Suisse'],
    type: 'bank',
    color: '#2c5aa0'
  },
  {
    id: 'crypto',
    name: 'Cryptomonnaie',
    icon: 'ri-bit-coin-line',
    description: 'Bitcoin, Ethereum et autres cryptomonnaies',
    countries: ['Global'],
    type: 'crypto',
    color: '#f7931a'
  },
  {
    id: 'mobile',
    name: 'Mobile Money',
    icon: 'ri-smartphone-line',
    description: 'Orange Money, MTN, Airtel Money',
    countries: ['RDC', 'Côte d\'Ivoire', 'Sénégal', 'Cameroun'],
    type: 'mobile',
    color: '#ff6b35'
  },
  {
    id: 'card',
    name: 'Carte Bancaire',
    icon: 'ri-bank-card-line',
    description: 'Visa, Mastercard, American Express',
    countries: ['France', 'RDC', 'Belgique', 'Suisse'],
    type: 'card',
    color: '#1a1f71'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: 'ri-paypal-line',
    description: 'Paiement sécurisé via PayPal',
    countries: ['France', 'RDC', 'Belgique'],
    type: 'card',
    color: '#0070ba'
  },
  {
    id: 'orange',
    name: 'Orange Money',
    icon: 'ri-smartphone-line',
    description: 'Paiement via Orange Money',
    countries: ['France', 'Sénégal', 'Côte d\'Ivoire'],
    type: 'mobile',
    color: '#ff6600'
  }
];
