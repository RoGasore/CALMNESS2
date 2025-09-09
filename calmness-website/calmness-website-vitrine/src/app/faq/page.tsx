'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '../../styles/animations/faq-animations.css';
import '../../styles/pages/faq-luxury.css';

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState<string>('');

  const faqData = [
    {
      question: "Qu'est-ce que Calmness FI ?",
      answer: "Calmness FI est une plateforme de trading éducative qui se concentre sur l'enseignement de la discipline, de la sagesse et de la sérénité dans le trading. Nous formons des traders maîtres de leur art en cultivant le calme face aux fluctuations du marché."
    },
    {
      question: "Comment commencer avec Calmness FI ?",
      answer: "Pour commencer, vous pouvez vous inscrire sur notre plateforme, suivez nos formations gratuites, et rejoignez notre communauté de traders. Nous offrons des ressources éducatives complètes pour tous les niveaux."
    },
    {
      question: "Vos services sont-ils adaptés aux débutants ?",
      answer: "Absolument ! Nos formations sont conçues pour tous les niveaux, des débutants complets aux traders expérimentés. Nous commençons par les bases et progressons vers des concepts plus avancés."
    },
    {
      question: "Y a-t-il un support client ?",
      answer: "Oui, notre équipe est disponible pour vous accompagner dans votre parcours de trading. Nous offrons un support personnalisé avec des sessions individuelles avec nos experts, des révisions de portefeuille, et un coaching personnalisé."
    },
    {
      question: "Quels types de formations proposez-vous ?",
      answer: "Nous proposons des formations complètes incluant l'analyse technique, la gestion du risque, la psychologie du trading, et notre méthode unique de maîtrise émotionnelle. Toutes nos formations incluent des sessions pratiques et un suivi personnalisé."
    },
    {
      question: "Proposez-vous des signaux de trading ?",
      answer: "Oui, nous fournissons des signaux de trading de haute qualité basés sur notre analyse technique approfondie. Nos signaux incluent des niveaux d'entrée, de sortie, et de stop-loss avec des explications détaillées."
    },
    {
      question: "Comment gérez-vous le risque ?",
      answer: "La gestion du risque est au cœur de notre méthode. Nous enseignons des techniques de position sizing, de diversification, et de protection du capital. Chaque trade est analysé avec un ratio risque/récompense optimal."
    },
    {
      question: "Y a-t-il une garantie de satisfaction ?",
      answer: "Nous offrons une garantie de satisfaction de 30 jours sur tous nos services. Si vous n'êtes pas satisfait, nous vous remboursons intégralement."
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? [] // Fermer l'item actuel
        : [index] // Ouvrir seulement cet item (fermer les autres)
    );
  };

  // Filtrer les FAQ selon le terme de recherche
  const filteredFAQ = faqData.filter(item => {
    if (!searchTerm) return true;
    return item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
           item.answer.toLowerCase().includes(searchTerm.toLowerCase());
  });

  useEffect(() => {
    // Initialize AOS animations
    const initAOS = () => {
      if (typeof window !== 'undefined') {
        import('aos').then((AOS) => {
          AOS.default.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
          });
        });
      }
    };

    initAOS();

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
    const elements = document.querySelectorAll('.faq-item, .cta-card');
    Array.from(elements).forEach((el, index) => {
      el.id = `faq-element-${index}`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="faq-page">
      <Header />
      
      {/* Hero Section */}
      <section className="faq-hero">
        <div className="container">
          <div data-aos="fade-up">
          <h1 className="faq-title">
            Questions <span className="highlight">Fréquentes</span>
          </h1>
          <p className="faq-subtitle">
              Trouvez les réponses à toutes vos questions sur Calmness FI et nos services de trading.
          </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-content">
        <div className="container">
          <div className="text-center" data-aos="fade-up">
            <h3 className="faq-section-title">Questions Courantes</h3>
            <p className="faq-section-subtitle">Parcourez nos questions les plus fréquemment posées ci-dessous.</p>
          </div>

          {/* Barre de recherche */}
          <div className="search-container">
            <div className="search-box">
              <i className="ri-search-line search-icon"></i>
              <input 
                type="text" 
                placeholder="Rechercher dans les FAQ..." 
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  className="clear-search"
                  onClick={() => setSearchTerm('')}
                >
                  <i className="ri-close-line"></i>
                </button>
              )}
            </div>
          </div>

          <div className="faq-list">
            {filteredFAQ.length > 0 ? (
              filteredFAQ.map((item, index) => {
                // Utiliser l'index de l'item filtré
                const isOpen = openItems.includes(index);
                    
                    return (
                      <div 
                    key={`${item.question}-${index}`} 
                    className="faq-item"
                      >
                        <button 
                      className="faq-question" 
                      onClick={() => toggleItem(index)}
                        >
                          <span className="question-text">{item.question}</span>
                      <i 
                        className={`question-icon ${isOpen ? 'ri-subtract-line' : 'ri-add-line'}`}
                      ></i>
                        </button>
                    <div className={`faq-answer ${isOpen ? 'active-answer' : ''}`}>
                      <p className="answer-text">{item.answer}</p>
                        </div>
                      </div>
                    );
              })
            ) : (
              <div className="no-results">
                <p>Aucune question trouvée pour "{searchTerm}"</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="faq-cta" data-aos="fade-up">
        <div className="container">
          <div className="cta-card">
            <div className="cta-content">
              <h3 className="cta-title">Vous avez encore des questions ?</h3>
              <p className="cta-subtitle">Notre équipe de support est disponible pour vous aider avec toutes vos questions sur le trading.</p>
              <div className="cta-buttons">
                <a href="/contact" className="cta-button primary">
                  <i className="ri-mail-line"></i>
                  Nous contacter
                </a>
                <a href="/support" className="cta-button secondary">
                  <i className="ri-customer-service-2-line"></i>
                  Support en direct
                </a>
              </div>
            </div>
            <div className="cta-visual">
              <div className="support-icon">
                <i className="ri-lifebuoy-line"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
