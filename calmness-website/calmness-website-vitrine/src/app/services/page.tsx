"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import '../../styles/pages/services.css';

export default function ServicesPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="main">
      {/* Services Section */}
      <section className="services-section" id="services" aria-label="Nos Services">
        <div className="container">
          <div className="services-wrapper">
            <h1 className="services-title">Nos Services <span></span></h1>
            
            {/* Animation Background */}
            <div className={`services-visual ${isVisible ? 'animate-in' : ''}`}>
              <div className="visual-container">
                {/* Trading Chart Animation */}
                <div className="chart-animation">
                  <div className="chart-container">
                    <div className="chart-line">
                      <div className="chart-point" style={{'--delay': '0s'}}></div>
                      <div className="chart-point" style={{'--delay': '0.5s'}}></div>
                      <div className="chart-point" style={{'--delay': '1s'}}></div>
                      <div className="chart-point" style={{'--delay': '1.5s'}}></div>
                      <div className="chart-point" style={{'--delay': '2s'}}></div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="floating-elements">
                  <div className="floating-element element-1">
                    <i className="fa-solid fa-chart-line"></i>
                  </div>
                  <div className="floating-element element-2">
                    <i className="fa-solid fa-brain"></i>
                  </div>
                  <div className="floating-element element-3">
                    <i className="fa-solid fa-balance-scale"></i>
                  </div>
                  <div className="floating-element element-4">
                    <i className="fa-solid fa-leaf"></i>
                  </div>
                </div>

                {/* Central Logo */}
                <div className="central-logo">
                  <div className="logo-diamond-large">
                    <div className="diamond-inner"></div>
                  </div>
                  <div className="logo-text-large">SERVICES</div>
                </div>
              </div>
            </div>

            <div className="services-cards">
              <div className="service-card">
                <i className="fa-solid fa-chart-line"></i>
                <h2>Formations au Trading</h2>
                <p>Apprenez les bases du trading avec nos formations complètes. De l'analyse technique à la gestion du risque, maîtrisez tous les aspects du trading professionnel.</p>
                <Link href="/services/formations" className="service-link">En savoir plus</Link>
              </div>

              <div className="service-card">
                <i className="fa-solid fa-link"></i>
                <h2>Liaison des Comptes</h2>
                <p>Connectez votre compte de trading à notre plateforme pour un suivi automatique de vos performances et des rapports détaillés.</p>
                <Link href="/services/liaison-comptes" className="service-link">En savoir plus</Link>
              </div>

              <div className="service-card">
                <i className="fa-solid fa-chart-bar"></i>
                <h2>Signaux & Analyses</h2>
                <p>Recevez des signaux de trading en temps réel avec nos analyses quotidiennes des marchés financiers.</p>
                <Link href="/services/signaux" className="service-link">En savoir plus</Link>
                    </div>
                    
              <div className="service-card">
                <i className="fa-solid fa-users"></i>
                <h2>Communauté</h2>
                <p>Rejoignez notre communauté de traders passionnés, partagez vos expériences et progressez ensemble vers le succès.</p>
                <Link href="/services/communaute" className="service-link">En savoir plus</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}