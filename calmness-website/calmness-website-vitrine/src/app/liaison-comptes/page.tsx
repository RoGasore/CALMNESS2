import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Liaison des Comptes - Calmness FI',
  description: 'Connectez votre compte de trading à notre plateforme pour un suivi automatique de vos performances. Analysez vos trades et optimisez vos stratégies.',
};

export default function LiaisonComptesPage() {
  return (
    <div className="liaison-page">
      {/* Hero Section */}
      <section className="liaison-hero">
        <div className="container">
          <h1 className="liaison-title">
            Liaison des Comptes
          </h1>
          <p className="liaison-subtitle">
            Connectez votre compte de trading pour un suivi automatique et des analyses détaillées
          </p>
        </div>
      </section>

      {/* Description Section */}
      <section className="liaison-description">
        <div className="container">
          <div className="description-content">
            <h2>Qu&apos;est-ce que la liaison des comptes ?</h2>
            <p>
              La liaison des comptes est un service qui vous permet de connecter votre compte de trading 
              (MetaTrader, cTrader, ou autres plateformes) directement à notre système d&apos;analyse. 
              Une fois connecté, nous pouvons :
            </p>
            <ul className="description-features">
              <li><i className="fa-solid fa-check"></i>Suivre automatiquement tous vos trades en temps réel</li>
              <li><i className="fa-solid fa-check"></i>Analyser vos performances et identifier vos points forts et faibles</li>
              <li><i className="fa-solid fa-check"></i>Générer des rapports détaillés sur votre stratégie de trading</li>
              <li><i className="fa-solid fa-check"></i>Vous fournir des recommandations personnalisées pour améliorer vos résultats</li>
              <li><i className="fa-solid fa-check"></i>Calculer automatiquement vos statistiques de trading (win rate, profit factor, etc.)</li>
              <li><i className="fa-solid fa-check"></i>Détecter les patterns dans vos trades pour optimiser votre approche</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="liaison-pricing">
        <div className="container">
          <h2 className="pricing-title">Tarification</h2>
          <div className="pricing-card">
            <div className="pricing-header">
              <h3>Liaison des Comptes</h3>
              <p>Service unique pour tous les montants</p>
            </div>
            <div className="pricing-details">
              <div className="pricing-item">
                <span className="pricing-label">Dépôt minimum requis :</span>
                <span className="pricing-value">150$</span>
              </div>
              <div className="pricing-item">
                <span className="pricing-label">Coût de la liaison :</span>
                <span className="pricing-value">100$</span>
              </div>
              <div className="pricing-item highlight">
                <span className="pricing-label">Prix fixe :</span>
                <span className="pricing-value">100$ (peu importe le montant déposé)</span>
              </div>
            </div>
            <div className="pricing-note">
              <p><strong>Important :</strong> Le coût de liaison est fixe à 100$ quel que soit le montant de votre dépôt. 
              Que vous déposiez 150$ ou 10,000$, le prix reste le même.</p>
            </div>
            <a href="/paiement?service=liaison-comptes" className="pricing-button">
              Procéder à la liaison
            </a>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="liaison-benefits">
        <div className="container">
          <h2 className="benefits-title">Avantages de la liaison</h2>
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon">
                <i className="fa-solid fa-chart-line"></i>
              </div>
              <h3>Analyse Automatique</h3>
              <p>Vos trades sont analysés automatiquement sans intervention manuelle de votre part.</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">
                <i className="fa-solid fa-shield-alt"></i>
              </div>
              <h3>Sécurité Totale</h3>
              <p>Vos données sont protégées par un cryptage de niveau bancaire. Nous ne pouvons pas effectuer de trades.</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">
                <i className="fa-solid fa-file-chart"></i>
              </div>
              <h3>Rapports Détaillés</h3>
              <p>Recevez des rapports complets sur vos performances avec des graphiques et statistiques.</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">
                <i className="fa-solid fa-lightbulb"></i>
              </div>
              <h3>Recommandations</h3>
              <p>Obtenez des conseils personnalisés pour améliorer votre stratégie de trading.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="liaison-cta">
        <div className="container">
          <h2 className="cta-title">
            Prêt à optimiser votre trading ?
          </h2>
          <p className="cta-subtitle">
            Connectez votre compte dès aujourd&apos;hui et découvrez les insights cachés dans vos données de trading.
          </p>
          <div className="cta-buttons">
            <a href="/paiement?service=liaison-comptes" className="cta-button cta-button-primary">
              Lier mon compte - 100$
            </a>
            <a href="/contact" className="cta-button cta-button-secondary">
              Nous contacter
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
