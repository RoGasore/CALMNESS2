import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ThemeProvider from '@/components/ThemeProvider'

export const metadata: Metadata = {
	title: 'Calmness FI - Expertise en Trading Financier',
	description: 'Calmness FI, votre partenaire de confiance pour vos investissements et stratégies de trading. Expertise professionnelle et approche sereine des marchés financiers.',
	keywords: 'trading, finance, investissement, marchés financiers, expertise, conseil',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="fr">
			<head>
				<link rel="icon" href="/logo.png" />
				<link href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" rel="stylesheet" />
			</head>
			<body>
				<ThemeProvider>
					<Header />
					<main className="main">
						{children}
					</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	)
}