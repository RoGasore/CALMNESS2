'use client';

import { useState, useEffect } from 'react';
import '../../styles/animations/about-animations.css';

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());

  useEffect(() => {
    setIsVisible(true);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set(Array.from(prev).concat(entry.target.id)));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Observer tous les éléments animables
    const elements = document.querySelectorAll('.about-text, .mission-section, .family-section, .value-card, .values-title, .values-grid, .cta-card');
    elements.forEach((el, index) => {
      el.id = `about-element-${index}`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="main">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className={`about-hero-content ${isVisible ? 'animate-in' : ''}`}>
            <h1 className="about-title">
              À Propos de <span className="highlight">Calmness</span> <span></span>
            </h1>
            <p className={`about-subtitle ${isVisible ? 'animate-in' : ''}`}>
              L'école de pensée dédiée à la discipline, la sagesse et la sérénité
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="about-intro">
        <div className="container">
          <div className={`about-text ${isVisible ? 'animate-in' : ''}`}>
            <div className="text-block">
              <p className="intro-text">
                Chez <span className="keyword">Calmness</span>, nous sommes bien plus qu'une simple plateforme de trading. 
                Nous sommes une <span className="keyword">école de pensée</span> dédiée à la 
                <span className="keyword"> discipline</span>, la <span className="keyword">sagesse</span> et la 
                <span className="keyword"> sérénité</span>.
              </p>
            </div>

            <div className="text-block">
              <p className="context-text">
                Dans un monde financier où la <span className="keyword">précipitation</span> et l'
                <span className="keyword">émotion</span> mènent trop souvent à l'échec, nous croyons fermement que le 
                véritable succès ne repose pas sur la chance ou la rapidité, mais sur la 
                <span className="keyword">maîtrise de soi</span>.
              </p>
              
              <p className="context-text">
                Notre mission est de transformer la manière de trader en cultivant le 
                <span className="keyword">calme</span> face aux fluctuations du marché et en développant une approche 
                méthodique et réfléchie de l'investissement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className={`mission-section ${visibleElements.has('about-element-0') ? 'animate-in' : ''}`}>
        <div className="container">
          <h2 className="mission-title">
            Notre <span className="highlight">Mission</span> : Former des Traders Maîtres de Leur Art
          </h2>
          <p className="mission-intro">
            Nous nous engageons à former des traders qui agissent avec précision et confiance. 
            Notre méthode unique vous enseigne à :
          </p>
          
          <div className="mission-objectives">
            <p className="objective-item">
              — Transformer vos <span className="keyword">émotions</span> en une force intérieure et une clarté d'esprit
            </p>
            <p className="objective-item">
              — Allier la <span className="keyword">discipline</span> et la rigueur à une vision stratégique à long terme
            </p>
            <p className="objective-item">
              — Construire un capital de <span className="keyword">sagesse</span> autant qu'un capital financier
            </p>
          </div>
        </div>
      </section>

      {/* Family Section */}
      <section className={`family-section ${visibleElements.has('about-element-1') ? 'animate-in' : ''}`}>
        <div className="container">
          <h2 className="family-title">
            Rejoignez notre <span className="highlight">Famille</span> de Traders
          </h2>
          <div className="family-content">
            <p className="family-text">
              Être membre de <span className="keyword">Calmness</span>, c'est rejoindre une communauté de passionnés unis par une valeur commune : 
              le <span className="keyword">calme</span> est la clé de la maîtrise, et la <span className="keyword">maîtrise</span> est la voie de la liberté.
            </p>
            
            <p className="family-text">
              Nous sommes la famille de traders qui prouve que la <span className="keyword">patience</span>, la 
              <span className="keyword">stratégie</span> et la <span className="keyword">sérénité</span> sont les véritables leviers du succès durable.
            </p>
            
            <p className="family-text">
              Ensemble, nous construisons un environnement d'apprentissage mutuel où chaque membre contribue à l'épanouissement 
              et au succès de la communauté tout entière.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2 className={`values-title ${visibleElements.has('about-element-2') ? 'animate-in' : ''}`}>Nos <span className="highlight">Valeurs</span></h2>
          <div className={`values-grid ${visibleElements.has('about-element-3') ? 'animate-in' : ''}`}>
            <div className={`value-card ${visibleElements.has('about-element-4') ? 'animate-in' : ''}`}>
              <div className="value-icon">
                <i className="fa-solid fa-mountain"></i>
              </div>
              <h3>Stabilité</h3>
              <p>Rester calme face aux tempêtes du marché</p>
            </div>
            
            <div className={`value-card ${visibleElements.has('about-element-5') ? 'animate-in' : ''}`}>
              <div className="value-icon">
                <i className="fa-solid fa-graduation-cap"></i>
              </div>
              <h3>Apprentissage</h3>
              <p>Construire une expertise durable</p>
            </div>
            
            <div className={`value-card ${visibleElements.has('about-element-6') ? 'animate-in' : ''}`}>
              <div className="value-icon">
                <i className="fa-solid fa-users"></i>
              </div>
              <h3>Communauté</h3>
              <p>Grandir ensemble vers le succès</p>
            </div>
            
            <div className={`value-card ${visibleElements.has('about-element-7') ? 'animate-in' : ''}`}>
              <div className="value-icon">
                <i className="fa-solid fa-shield-alt"></i>
              </div>
              <h3>Protection</h3>
              <p>Préserver votre capital et votre paix</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className={`cta-card ${visibleElements.has('about-element-8') ? 'animate-in' : ''}`}>
            <div className="cta-content">
              <h3>Prêt à rejoindre la <span className="highlight">Famille Calmness</span> ?</h3>
              <p>Commencez votre transformation dès aujourd'hui et découvrez comment le calme peut devenir votre plus grand atout dans le trading.</p>
              <div className="cta-buttons">
                <a href="/formations" className="cta-button primary">
                  <i className="fa-solid fa-play"></i>
                  Découvrir nos Formations
                </a>
                <a href="/contact" className="cta-button secondary">
                  <i className="fa-solid fa-envelope"></i>
                  Nous Contacter
                </a>
              </div>
            </div>
            <div className="cta-visual">
              <div className="support-icon">
                <i className="fa-solid fa-seedling"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}