"use client";
import React, { useEffect } from 'react';
import '../styles/pages/home.css';

const HomeSection: React.FC = () => {
	// Effet d'apparition simple au montage
	useEffect(() => {
		const timers: number[] = [];
		const addReveal = (selector: string, delayMs: number) => {
			const t = window.setTimeout(() => {
				document.querySelectorAll(selector).forEach((el) => el.classList.add('revealed'));
			}, delayMs);
			timers.push(t);
		};
		addReveal('.home__title', 400);
		addReveal('.home__description', 800);
		addReveal('.home__button', 1000);
		addReveal('.home__footer', 1200);
		addReveal('.home__data div', 1400);
		return () => timers.forEach((t) => window.clearTimeout(t));
	}, []);

	return (
		<section className="home container" id="accueil">
			<div className="home__shape-small"></div>
			<div className="home__shape-big-1"></div>
			<div className="home__shape-big-2"></div>
			<img src="/img__home.png" alt="Illustration d'accueil" className="home__shape-bg" />

			<div className="home__container">
				<div className="home__info home__images">
					<h1 className="home__title">
						<span className="home__line home__line--1">Analyse</span><br />
						<span className="home__line home__line--2">Analyse • Signal</span><br />
						<span className="home__line home__line--3">Analyse • Signal • Exécution</span>
					</h1>
					<p className="home__description">
						Des marchés plus lisibles, des décisions plus simples.
					</p>
					<a href="#services" className="home__button">Découvrir nos services</a>
				</div>
			</div>
		</section>
	);
};

export default HomeSection;


