import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Formations au Trading - Calmness FI',
  description: 'Découvrez nos formations complètes au trading. De l\'analyse technique à la gestion du risque, maîtrisez tous les aspects du trading professionnel.',
};

export default function FormationsPage() {
  return (
    <div className="formations-page">
      {/* Hero Section */}
      <section className="formations-hero">
        <div className="container">
          <h1 className="formations-title">
            Formations au Trading
          </h1>
          <p className="formations-subtitle">
            Maîtrisez l&apos;art du trading avec nos formations complètes et professionnelles
          </p>
        </div>
      </section>

      {/* Formations Section */}
      <section className="formations-section">
        <div className="container">
          <div className="formations-grid">
            
            {/* Formation Gratuite */}
            <div className="formation-card formation-free">
              <div className="formation-header">
                <div className="formation-icon">
                  <i className="fa-solid fa-gift"></i>
                </div>
                <h3 className="formation-title">Gratuite</h3>
                <p className="formation-subtitle">Vidéos + Quiz</p>
              </div>
              
              <div className="formation-price">
                <span className="price-amount">0$</span>
                <span className="price-period">/gratuit</span>
              </div>
              
              <ul className="formation-features">
                <li><i className="fa-solid fa-check"></i>Vidéos éducatives</li>
                <li><i className="fa-solid fa-check"></i>Quiz à choix multiples</li>
                <li><i className="fa-solid fa-check"></i>Progression par étapes</li>
                <li><i className="fa-solid fa-check"></i>Support communautaire</li>
                <li><i className="fa-solid fa-check"></i>Accès illimité</li>
              </ul>
              
              <a href="/formations/gratuite" className="formation-button formation-button-free">
                Commencer gratuitement
              </a>
            </div>

            {/* Formation Basique */}
            <div className="formation-card formation-basic">
              <div className="formation-badge">Populaire</div>
              <div className="formation-header">
                <div className="formation-icon">
                  <i className="fa-solid fa-seedling"></i>
                </div>
                <h3 className="formation-title">Basique</h3>
                <p className="formation-subtitle">Pour débuter sérieusement</p>
              </div>
              
              <div className="formation-price">
                <span className="price-amount">150$</span>
                <span className="price-period">/formation</span>
              </div>
              
              <ul className="formation-features">
                <li><i className="fa-solid fa-check"></i>Tout de la formation gratuite</li>
                <li><i className="fa-solid fa-check"></i>Bases du trading</li>
                <li><i className="fa-solid fa-check"></i>Analyse technique niveau 1</li>
                <li><i className="fa-solid fa-check"></i>Gestion du risque</li>
                <li><i className="fa-solid fa-check"></i>Support prioritaire</li>
                <li><i className="fa-solid fa-check"></i>Certificat de completion</li>
              </ul>
              
              <a href="/paiement?service=formations-basique" className="formation-button formation-button-basic">
                Choisir Basique
              </a>
            </div>

            {/* Formation Avancée */}
            <div className="formation-card formation-advanced">
              <div className="formation-header">
                <div className="formation-icon">
                  <i className="fa-solid fa-chart-line"></i>
                </div>
                <h3 className="formation-title">Avancée</h3>
                <p className="formation-subtitle">Pour progresser rapidement</p>
              </div>
              
              <div className="formation-price">
                <span className="price-amount">300$</span>
                <span className="price-period">/formation</span>
              </div>
              
              <ul className="formation-features">
                <li><i className="fa-solid fa-check"></i>Tout des formations précédentes</li>
                <li><i className="fa-solid fa-check"></i>Analyse technique avancée</li>
                <li><i className="fa-solid fa-check"></i>Analyse fondamentale</li>
                <li><i className="fa-solid fa-check"></i>Stratégies de trading</li>
                <li><i className="fa-solid fa-check"></i>Mentoring individuel</li>
                <li><i className="fa-solid fa-check"></i>Accès aux signaux</li>
              </ul>
              
              <a href="/paiement?service=formations-avancee" className="formation-button formation-button-advanced">
                Choisir Avancée
              </a>
            </div>

            {/* Formation Elite */}
            <div className="formation-card formation-elite">
              <div className="formation-header">
                <div className="formation-icon">
                  <i className="fa-solid fa-crown"></i>
                </div>
                <h3 className="formation-title">Elite</h3>
                <p className="formation-subtitle">Pour les professionnels</p>
              </div>
              
              <div className="formation-price">
                <span className="price-amount">1500$</span>
                <span className="price-period">/formation</span>
              </div>
              
              <ul className="formation-features">
                <li><i className="fa-solid fa-check"></i>Tout des formations précédentes</li>
                <li><i className="fa-solid fa-check"></i>Trading algorithmique</li>
                <li><i className="fa-solid fa-check"></i>Gestion de portefeuille</li>
                <li><i className="fa-solid fa-check"></i>Accès VIP aux signaux</li>
                <li><i className="fa-solid fa-check"></i>Coaching 1-on-1</li>
                <li><i className="fa-solid fa-check"></i>Accès aux outils pro</li>
              </ul>
              
              <a href="/paiement?service=formations-elite" className="formation-button formation-button-elite">
                Devenir Elite
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="formations-cta">
        <div className="container">
          <h2 className="cta-title">
            Prêt à commencer votre formation ?
          </h2>
          <p className="cta-subtitle">
            Rejoignez des milliers de traders qui ont transformé leur approche du trading avec nos formations.
          </p>
          <div className="cta-buttons">
            <a href="/contact" className="cta-button cta-button-primary">
              Demander une consultation
            </a>
            <a href="/formations/gratuite" className="cta-button cta-button-secondary">
              Essai gratuit
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
