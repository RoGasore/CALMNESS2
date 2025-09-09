"use client";
import React from 'react';
import Link from 'next/link';
import '../../../styles/pages/services.css';

export default function LiaisonComptesPage() {
  return (
    <div className="main">
      {/* Hero Section */}
      <section className="liaison-hero">
        <div className="container">
          <div className="liaison-hero-content">
            <h1 className="liaison-title">Liaison des Comptes <span></span></h1>
            <p className="liaison-subtitle">
              Connectez votre compte de trading pour un suivi automatique et des analyses détaillées
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="liaison-content">
        <div className="container">
          <div className="liaison-grid">
            <div className="liaison-text">
              <h2>Suivi Automatique de Vos Performances</h2>
              <p>
                La liaison de votre compte de trading à notre plateforme vous permet de bénéficier d'un suivi 
                automatique et détaillé de toutes vos opérations. Plus besoin de saisir manuellement vos trades !
              </p>
              
              <h3>Fonctionnalités</h3>
              <ul className="liaison-list">
                <li><strong>Import Automatique :</strong> Synchronisation en temps réel de vos positions et trades</li>
                <li><strong>Rapports Détaillés :</strong> Analyses complètes de vos performances et statistiques</li>
                <li><strong>Alertes Personnalisées :</strong> Notifications sur vos positions et opportunités</li>
                <li><strong>Historique Complet :</strong> Conservation de toutes vos données de trading</li>
                <li><strong>Sécurité Maximale :</strong> Chiffrement et protection de vos informations</li>
              </ul>

              <h3>Brokers Supportés</h3>
              <p>
                Notre plateforme est compatible avec les principaux brokers du marché. 
                Nous supportons MetaTrader 4, MetaTrader 5, et de nombreuses autres plateformes.
              </p>

              <div className="liaison-cta">
                <Link href="/liaison-comptes" className="liaison-button">
                  Connecter mon compte
                </Link>
                <Link href="/contact" className="liaison-button secondary">
                  Plus d'informations
                </Link>
              </div>
            </div>

            <div className="liaison-image">
              <img src="/liaison-comptes.jpg" alt="Liaison Comptes" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
