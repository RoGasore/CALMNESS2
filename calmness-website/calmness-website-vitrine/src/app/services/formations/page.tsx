"use client";
import React from 'react';
import Link from 'next/link';
import '../../../styles/pages/services.css';

export default function FormationsPage() {
  return (
    <div className="main">
      {/* Hero Section */}
      <section className="formations-hero">
        <div className="container">
          <div className="formations-hero-content">
            <h1 className="formations-title">Formations au Trading <span></span></h1>
            <p className="formations-subtitle">
              Maîtrisez l'art du trading avec nos formations complètes et professionnelles
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="formations-content">
        <div className="container">
          <div className="formations-grid">
            <div className="formations-text">
              <h2>Nos Formations</h2>
              <p>
                Chez Calmness FI, nous proposons des formations complètes pour vous accompagner dans votre apprentissage du trading. 
                Nos programmes sont conçus pour tous les niveaux, du débutant au trader expérimenté.
              </p>
              
              <h3>Modules de Formation</h3>
              <ul className="formations-list">
                <li><strong>Bases du Trading :</strong> Introduction aux marchés financiers et aux concepts fondamentaux</li>
                <li><strong>Analyse Technique :</strong> Apprentissage des graphiques, indicateurs et patterns</li>
                <li><strong>Gestion des Risques :</strong> Techniques pour protéger votre capital et optimiser vos gains</li>
                <li><strong>Psychologie du Trading :</strong> Maîtrise des émotions et développement de la discipline</li>
                <li><strong>Trading en Temps Réel :</strong> Mise en pratique avec des cas concrets</li>
              </ul>

              <h3>Méthode d'Apprentissage</h3>
              <p>
                Notre approche pédagogique combine théorie et pratique. Chaque formation inclut des exercices pratiques, 
                des analyses de cas réels et un suivi personnalisé pour garantir votre progression.
              </p>

              <div className="formations-cta">
                <Link href="/contact" className="formations-button">
                  Demander des informations
                </Link>
                <Link href="/inscription" className="formations-button secondary">
                  S'inscrire maintenant
                </Link>
              </div>
            </div>

            <div className="formations-image">
              <img src="/formations.jpg" alt="Formations Trading" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
