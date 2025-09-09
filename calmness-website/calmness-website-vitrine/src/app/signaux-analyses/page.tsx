import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Signaux & Analyses - Calmness FI',
  description: 'Recevez des signaux de trading en temps réel avec nos analyses quotidiennes des marchés financiers. Des insights précieux pour prendre les bonnes décisions d\'investissement.',
};

export default function SignauxAnalysesPage() {
  return (
    <div className="signaux-page">
      {/* Hero Section */}
      <section className="signaux-hero">
        <div className="container">
          <h1 className="signaux-title">
            Signaux & Analyses
          </h1>
          <p className="signaux-subtitle">
            Recevez des signaux de trading en temps réel avec nos analyses quotidiennes des marchés financiers
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="signaux-section">
        <div className="container">
          <div className="signaux-grid">
            
            {/* Offre Semaine */}
            <div className="signaux-card signaux-weekly">
              <div className="signaux-header">
                <div className="signaux-icon">
                  <i className="fa-solid fa-clock"></i>
                </div>
                <h3 className="signaux-title">Essai 1 Semaine</h3>
                <p className="signaux-subtitle">Testez nos signaux</p>
              </div>
              
              <div className="signaux-price">
                <span className="price-amount">10$</span>
                <span className="price-period">/semaine</span>
              </div>
              
              <ul className="signaux-features">
                <li><i className="fa-solid fa-check"></i>Signaux en temps réel</li>
                <li><i className="fa-solid fa-check"></i>Analyses quotidiennes</li>
                <li><i className="fa-solid fa-check"></i>Support par email</li>
                <li><i className="fa-solid fa-check"></i>Accès mobile</li>
                <li><i className="fa-solid fa-check"></i>Historique des signaux</li>
              </ul>
              
              <a href="/signaux-analyses/semaine" className="signaux-button signaux-button-weekly">
                Essayer 1 semaine
              </a>
            </div>

            {/* Offre Mensuelle */}
            <div className="signaux-card signaux-monthly">
              <div className="signaux-badge">Recommandé</div>
              <div className="signaux-header">
                <div className="signaux-icon">
                  <i className="fa-solid fa-calendar-alt"></i>
                </div>
                <h3 className="signaux-title">Abonnement Mensuel</h3>
                <p className="signaux-subtitle">Le plus populaire</p>
              </div>
              
              <div className="signaux-price">
                <span className="price-amount">35$</span>
                <span className="price-period">/mois</span>
              </div>
              
              <ul className="signaux-features">
                <li><i className="fa-solid fa-check"></i>Tout de l&apos;essai 1 semaine</li>
                <li><i className="fa-solid fa-check"></i>Analyses approfondies</li>
                <li><i className="fa-solid fa-check"></i>Support prioritaire</li>
                <li><i className="fa-solid fa-check"></i>Alertes push</li>
                <li><i className="fa-solid fa-check"></i>Webinaires exclusifs</li>
                <li><i className="fa-solid fa-check"></i>Accès communauté VIP</li>
              </ul>
              
              <a href="/signaux-analyses/mois" className="signaux-button signaux-button-monthly">
                S&apos;abonner
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="signaux-features-section">
        <div className="container">
          <h2 className="features-title">Pourquoi choisir nos signaux ?</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <i className="fa-solid fa-chart-line"></i>
              </div>
              <h3>Analyses Expertes</h3>
              <p>Nos experts analysent les marchés 24h/24 pour vous fournir les meilleures opportunités de trading.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <i className="fa-solid fa-bolt"></i>
              </div>
              <h3>Signaux en Temps Réel</h3>
              <p>Recevez instantanément les signaux d&apos;entrée et de sortie directement sur votre appareil.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <i className="fa-solid fa-shield-alt"></i>
              </div>
              <h3>Gestion du Risque</h3>
              <p>Chaque signal inclut des niveaux de stop-loss et take-profit pour protéger votre capital.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <i className="fa-solid fa-users"></i>
              </div>
              <h3>Communauté Active</h3>
              <p>Rejoignez une communauté de traders expérimentés qui partagent leurs stratégies et expériences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="signaux-cta">
        <div className="container">
          <h2 className="cta-title">
            Prêt à améliorer votre trading ?
          </h2>
          <p className="cta-subtitle">
            Commencez dès aujourd&apos;hui avec nos signaux professionnels et transformez votre approche du trading.
          </p>
          <div className="cta-buttons">
            <a href="/signaux-analyses/semaine" className="cta-button cta-button-primary">
              Essayer 1 semaine - 10$
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
