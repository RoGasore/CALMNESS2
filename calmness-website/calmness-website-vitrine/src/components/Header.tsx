"use client";
import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import '../styles/components/header.css';

const Header: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	const toggleMenu = useCallback(() => {
		setIsOpen((prev) => !prev);
	}, []);

	const closeMenu = useCallback(() => {
		setIsOpen(false);
	}, []);

	useEffect(() => {
		const onScroll = () => {
			const headerEl = document.getElementById('header');
			if (!headerEl) return;
			if (window.scrollY >= 50) headerEl.classList.add('header-bg');
			else headerEl.classList.remove('header-bg');
		};
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	const isActive = useCallback((href: string) => {
		if (href === '/') return pathname === '/';
		return pathname.startsWith(href);
	}, [pathname]);

	return (
		<header id="header" className={isOpen ? 'open' : ''}>
			<Link href="/" className="nav__logo" onClick={closeMenu}>
				<img src="/logo.png" alt="logo" />
				<span>CALMNESS FI</span>
			</Link>
			<ul className={`navlist${isOpen ? ' open' : ''}`}>
				<li className="nav__mobile-topbar">
					<ThemeToggle />
					<button className="nav__close" aria-label="Fermer" onClick={closeMenu}>
						<i className="ri-close-large-fill"></i>
					</button>
				</li>
				<li><Link href="/" onClick={closeMenu} className={isActive('/') ? 'active-link' : ''}>Accueil</Link></li>
				<li><Link href="/a-propos" onClick={closeMenu} className={isActive('/a-propos') ? 'active-link' : ''}>À propos</Link></li>
				<li><Link href="/services" onClick={closeMenu} className={isActive('/services') ? 'active-link' : ''}>Services</Link></li>
				<li><Link href="/communaute" onClick={closeMenu} className={isActive('/communaute') ? 'active-link' : ''}> Communauté</Link></li>
				<li><Link href="/faq" onClick={closeMenu} className={isActive('/faq') ? 'active-link' : ''}>FAQ</Link></li>
				<li><Link href="/contact" onClick={closeMenu} className={isActive('/contact') ? 'active-link' : ''}>Contacts</Link></li>
				{/* Boutons d'authentification en fin de menu mobile */}
				<li className="nav__auth-mobile">
					<div className="nav__auth-mobile-container">
						<Link href="/connexion" onClick={closeMenu} className="nav__auth-link">Connexion</Link>
						<Link href="/inscription" onClick={closeMenu} className="nav__auth-button">S'inscrire</Link>
					</div>
				</li>
			</ul>

			<div className="right-content">
				<ThemeToggle />
				<div className="nav__auth-desktop">
					<Link href="/connexion" className="nav__auth-link">
						Connexion
					</Link>
					<Link href="/inscription" className="nav__auth-button">
						S'inscrire
					</Link>
				</div>
				{!isOpen && (
					<button id='menu-icon' aria-label='Ouvrir le menu' onClick={toggleMenu}>
						<i className="ri-menu-4-fill"></i>
					</button>
				)}
			</div>
		</header>
	);
};

export default Header;