"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import HomeSection from '@/components/HomeSection';
import '../styles/pages/about.css';
import '../styles/pages/faq-contact.css';

export default function Page() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);
	}, []);

	return (
		<div className="main">
			<HomeSection />
			
			{/* About Section */}
			<section className="about-section" id="a-propos" aria-label="À propos">
				<div className="container">
					<div className="about-wrapper">
						<h1 className="about-title">À Propos <span></span></h1>
						<div className="about-content">
							<div className="about-image">
								<img src="/about.png" alt="À propos de Calmness FI" />
							</div>
							<div className="about-text">
								<p>
									Chez Calmness, nous sommes bien plus qu'une simple plateforme de trading. Nous sommes une école de pensée dédiée à la discipline, la sagesse et la sérénité. Dans un monde financier où la précipitation et l'émotion mènent trop souvent à l'échec, nous croyons fermement que le véritable succès ne repose pas sur la chance ou la rapidité, mais sur la maîtrise de soi.
								</p>
								<p>
									Notre mission est de transformer la manière de trader en cultivant le calme face aux fluctuations du marché. Nous nous engageons à former des traders qui agissent avec précision et confiance, en alliant la discipline et la rigueur à une vision stratégique à long terme. Chez Calmness, nous construisons un capital de sagesse autant qu'un capital financier.
								</p>
								<p>
									Rejoignez notre communauté de passionnés unis par une valeur commune : le calme est la clé de la maîtrise, et la maîtrise est la voie de la liberté. Nous sommes la famille de traders qui prouve que la patience, la stratégie et la sérénité sont les véritables leviers du succès durable.
								</p>
								<Link href="/a-propos" className="about-link">En savoir plus</Link>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Services Section */}
			<section className="services-section" id="services" aria-label="Nos Services">
				<div className="container">
					<div className="services-wrapper">
						<h1 className="services-title">Nos Services <span></span></h1>
						<div className="services-cards">
							<div className="service-card">
								<i className="fa-solid fa-chart-line"></i>
								<h2>Formations au Trading</h2>
								<p>Apprenez les bases du trading avec nos formations complètes. De l'analyse technique à la gestion du risque, maîtrisez tous les aspects du trading professionnel.</p>
								<Link href="/services" className="service-link">En savoir plus</Link>
							</div>

							<div className="service-card">
								<i className="fa-solid fa-link"></i>
								<h2>Liaison des Comptes</h2>
								<p>Connectez votre compte de trading à notre plateforme pour un suivi automatique de vos performances et des rapports détaillés.</p>
								<Link href="/liaison-comptes" className="service-link">En savoir plus</Link>
							</div>

							<div className="service-card">
								<i className="fa-solid fa-chart-bar"></i>
								<h2>Signaux & Analyses</h2>
								<p>Recevez des signaux de trading en temps réel avec nos analyses quotidiennes des marchés financiers.</p>
								<Link href="/signaux" className="service-link">En savoir plus</Link>
							</div>

							<div className="service-card">
								<i className="fa-solid fa-users"></i>
								<h2>Communauté</h2>
								<p>Rejoignez notre communauté de traders passionnés, partagez vos expériences et progressez ensemble vers le succès.</p>
								<Link href="/communaute" className="service-link">En savoir plus</Link>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Contact Section */}
			<section className="contact-section" id="contact" aria-label="Contact">
				<div className="container">
					<div className="contact-wrapper">
						<h1 className="contact-title">Contactez-nous <span></span></h1>
						
						{/* Animation Background */}
						<div className={`contact-visual ${isVisible ? 'animate-in' : ''}`}>
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
										<i className="fa-solid fa-envelope"></i>
									</div>
									<div className="floating-element element-2">
										<i className="fa-solid fa-phone"></i>
									</div>
									<div className="floating-element element-3">
										<i className="fa-solid fa-map-marker-alt"></i>
									</div>
									<div className="floating-element element-4">
										<i className="fa-solid fa-comments"></i>
									</div>
								</div>

								{/* Central Logo */}
								<div className="central-logo">
									<div className="logo-diamond-large">
										<div className="diamond-inner"></div>
									</div>
									<div className="logo-text-large">CONTACT</div>
								</div>
							</div>
						</div>

						<div className="contact-content">
							<div className="contact-grid">
								<div className="contact-info">
									<h2>Informations de Contact</h2>
									<div className="contact-info-item">
										<i className="fa-solid fa-envelope"></i>
										<div>
											<h3>Email</h3>
											<p>contact@calmnesstrading.com</p>
										</div>
									</div>
									<div className="contact-info-item">
										<i className="fa-solid fa-phone"></i>
										<div>
											<h3>Téléphone</h3>
											<p>+33 1 23 45 67 89</p>
										</div>
									</div>
									<div className="contact-info-item">
										<i className="fa-solid fa-map-marker-alt"></i>
										<div>
											<h3>Adresse</h3>
											<p>Paris, France</p>
										</div>
									</div>
								</div>

								<div className="contact-form">
									<h2>Envoyez-nous un message</h2>
									<form className="contact-form-container">
										<div className="form-row">
											<div className="form-group">
												<input type="text" name="nom" id="nom" required/>
												<label htmlFor="nom">Nom</label>
											</div>
											<div className="form-group">
												<input type="text" name="prenom" id="prenom" required/>
												<label htmlFor="prenom">Prénom</label>
											</div>
										</div>

										<div className="form-row">
											<div className="form-group">
												<input type="email" name="email" id="email" required/>
												<label htmlFor="email">Email</label>
											</div>
											<div className="form-group">
												<input type="tel" name="telephone" id="telephone"/>
												<label htmlFor="telephone">Téléphone</label>
											</div>
										</div>

										<div className="form-group">
											<input type="text" name="sujet" id="sujet" required/>
											<label htmlFor="sujet">Sujet</label>
										</div>

										<div className="form-group">
											<textarea name="message" id="message" rows={5} required></textarea>
											<label htmlFor="message">Message</label>
										</div>

										<button type="submit" className="contact-submit">Envoyer le message</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section className="faq-section" id="faq" aria-label="FAQ">
				<div className="container">
					<div className="faq-wrapper">
						<h1 className="faq-title">Questions Fréquentes <span></span></h1>
						

						<div className="faq-content">
							<div className="faq-grid">
								<div className="faq-item">
									<h3>Qu'est-ce que Calmness FI ?</h3>
									<p>Calmness FI est une plateforme de trading éducative qui se concentre sur l'enseignement de la discipline, de la sagesse et de la sérénité dans le trading.</p>
								</div>
								<div className="faq-item">
									<h3>Comment commencer ?</h3>
									<p>Inscrivez-vous sur notre plateforme, suivez nos formations gratuites, et rejoignez notre communauté de traders.</p>
								</div>
								<div className="faq-item">
									<h3>Vos services sont-ils adaptés aux débutants ?</h3>
									<p>Absolument ! Nos formations sont conçues pour tous les niveaux, des débutants complets aux traders expérimentés.</p>
								</div>
								<div className="faq-item">
									<h3>Y a-t-il un support client ?</h3>
									<p>Oui, notre équipe est disponible pour vous accompagner dans votre parcours de trading.</p>
								</div>
							</div>
							<div className="faq-cta">
								<Link href="/faq" className="faq-button">Voir toutes les FAQ</Link>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Community Section */}
			<section className="container" id="communaute" aria-label="Communauté">
				<div className="home__content">
					<h2 className="home__title">
						<span>Rejoignez notre Communauté</span>
					</h2>
					<p className="home__description">
						Connectez-vous avec d'autres traders, partagez vos expériences et progressez ensemble vers le succès.
					</p>
					<div className="home__buttons">
						<Link href="/connexion" className="home__button">
							Se connecter
						</Link>
						<Link href="/inscription" className="home__button secondary">
							S'inscrire
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}