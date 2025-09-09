"use client";
import React from 'react';

const Services: React.FC = () => {
	return (
		<>
			<section className="services-section" id="services" aria-label="Nos Services">
				<div className="container">
					<div className="services-wrapper">
						<h1 className="services-title">Nos Services <span></span></h1>
						<div className="services-cards">
							<div className="service-card">
								<i className="fa-solid fa-chart-line"></i>
								<h2>Formations au Trading</h2>
								<p>Apprenez les bases du trading avec nos formations complètes. De l&apos;analyse technique à la gestion du risque, maîtrisez tous les aspects du trading professionnel.</p>
								<a href="/formations" className="service-link">En savoir plus</a>
							</div>

							<div className="service-card">
								<i className="fa-solid fa-link"></i>
								<h2>Liaison des Comptes</h2>
								<p>Connectez votre compte de trading à notre plateforme pour un suivi automatique de vos performances. Nous analysons vos trades et vous fournissons des rapports détaillés pour optimiser vos stratégies.</p>
								<a href="/liaison-comptes" className="service-link">En savoir plus</a>
							</div>

							<div className="service-card">
								<i className="fa-solid fa-chart-bar"></i>
								<h2>Signaux & Analyses</h2>
								<p>Recevez des signaux de trading en temps réel avec nos analyses quotidiennes des marchés financiers. Des insights précieux pour prendre les bonnes décisions d&apos;investissement.</p>
								<a href="/signaux-analyses" className="service-link">En savoir plus</a>
							</div>

							<div className="service-card">
								<i className="fa-solid fa-shield-alt"></i>
								<h2>Gestion du Risque</h2>
								<p>Protégez votre capital avec nos stratégies de gestion du risque éprouvées. Minimisez les pertes et sécurisez vos gains.</p>
								<a href="/gestion-risque" className="service-link">En savoir plus</a>
							</div>

							<div className="service-card">
								<i className="fa-solid fa-users"></i>
								<h2>Communauté Traders</h2>
								<p>Rejoignez notre communauté active de traders. Partagez vos expériences, échangez des stratégies et progressez ensemble.</p>
								<button onClick={() => document.getElementById('community-modal')?.classList.add('show')} className="service-link">Rejoindre</button>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Modal Communauté */}
			<div id="community-modal" className="community-modal">
				<div className="community-modal-content">
					<div className="community-modal-header">
						<h2>Rejoindre notre Communauté</h2>
						<button className="community-modal-close" onClick={() => document.getElementById('community-modal')?.classList.remove('show')}>
							<i className="fa-solid fa-times"></i>
						</button>
					</div>
					<div className="community-modal-body">
						<p>Choisissez votre plateforme préférée pour rejoindre notre communauté de traders :</p>
						<div className="community-platforms">
							<a href="https://t.me/calmness_fi" target="_blank" rel="noopener noreferrer" className="community-platform telegram">
								<i className="fab fa-telegram"></i>
								<span>Telegram</span>
							</a>
							<a href="https://discord.gg/calmness-fi" target="_blank" rel="noopener noreferrer" className="community-platform discord">
								<i className="fab fa-discord"></i>
								<span>Discord</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Services;


