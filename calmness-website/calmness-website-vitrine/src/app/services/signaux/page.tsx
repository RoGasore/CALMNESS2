"use client";
import React from 'react';
import Link from 'next/link';
import '../../../styles/pages/services.css';

export default function SignauxPage() {
  return (
    <div className="main">
      {/* Hero Section */}
      <section className="signaux-hero">
        <div className="container">
          <div className="signaux-hero-content">
            <h1 className="signaux-title">Signaux & Analyses <span></span></h1>
            <p className="signaux-subtitle">
              Recevez des signaux de trading en temps réel avec nos analyses professionnelles des marchés
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="signaux-content">
        <div className="container">
          <div className="signaux-grid">
            <div className="signaux-text">
              <h2>Analyses Professionnelles du Marché</h2>
              <p>
                Nos experts analysent quotidiennement les marchés financiers pour vous fournir des signaux 
                de qualité et des analyses approfondies. Bénéficiez de l'expertise de traders professionnels.
              </p>
              
              <h3>Types de Signaux</h3>
              <ul className="signaux-list">
                <li><strong>Signaux d'Entrée :</strong> Points d'achat et de vente optimaux sur les principales paires</li>
                <li><strong>Signaux de Sortie :</strong> Indications pour clôturer vos positions au bon moment</li>
                <li><strong>Analyses Techniques :</strong> Études approfondies des graphiques et indicateurs</li>
                <li><strong>Analyses Fondamentales :</strong> Impact des actualités économiques sur les marchés</li>
                <li><strong>Gestion des Risques :</strong> Conseils pour protéger votre capital</li>
              </ul>

              <h3>Fonctionnalités Avancées</h3>
              <p>
                Chaque signal inclut un niveau de confiance, un ratio risque/récompense, et des conseils 
                de gestion de position. Nos analyses sont accompagnées d'explications détaillées pour 
                vous aider à comprendre la logique derrière chaque recommandation.
              </p>

              <div className="signaux-cta">
                <Link href="/signaux" className="signaux-button">
                  Voir les signaux
                </Link>
                <Link href="/inscription" className="signaux-button secondary">
                  S'abonner
                </Link>
              </div>
            </div>

            <div className="signaux-image">
              <img src="/signaux.jpg" alt="Signaux Trading" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
