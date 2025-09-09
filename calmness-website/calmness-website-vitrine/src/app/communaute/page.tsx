'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '../../styles/pages/communaute-luxury.css';

export default function CommunautePage() {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    role: '',
    rating: 5,
    text: ''
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

    // Intersection Observer for custom animations
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
    const elements = document.querySelectorAll('.testimonial-card, .feature-card, .cta-content');
    Array.from(elements).forEach((el, index) => {
      el.id = `communaute-element-${index}`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.name && newReview.text) {
      // Ici vous pouvez ajouter la logique pour sauvegarder l'avis
      console.log('Nouvel avis:', newReview);
      alert('Merci pour votre avis ! Il sera publié après modération.');
      setNewReview({ name: '', role: '', rating: 5, text: '' });
      setShowAddReview(false);
    }
  };

  const testimonials = [
    {
      name: "Alexandre Dubois",
      role: "Trader depuis 2021",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Calmness FI a transformé ma façon de trader. La communauté est incroyablement bienveillante et les formations m'ont appris à garder mon calme face aux fluctuations du marché. Mes résultats se sont considérablement améliorés."
    },
    {
      name: "Sophie Martin",
      role: "Membre depuis 2020",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "L'approche de Calmness FI est unique. Au lieu de se concentrer uniquement sur la technique, ils enseignent la maîtrise émotionnelle. C'est exactement ce qui me manquait. La communauté est un vrai soutien au quotidien."
    },
    {
      name: "Thomas Leroy",
      role: "Nouveau membre",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Je suis impressionné par la qualité des échanges dans la communauté. Les traders expérimentés partagent volontiers leurs connaissances et les débutants comme moi peuvent poser toutes leurs questions sans jugement."
    },
    {
      name: "Marie Dubois",
      role: "Trader professionnel",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "La méthode Calmness FI m'a aidée à passer du trading amateur au professionnel. La discipline et la sérénité enseignées ici sont des atouts inestimables. Je recommande vivement cette communauté."
    },
    {
      name: "Julien Moreau",
      role: "Membre depuis 2019",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Ce qui me plaît le plus chez Calmness FI, c'est l'approche holistique du trading. On n'apprend pas seulement à analyser les graphiques, mais aussi à se connaître et à gérer ses émotions. C'est révolutionnaire."
    },
    {
      name: "Camille Rousseau",
      role: "Trader indépendant",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "La communauté Calmness FI est devenue ma famille de trading. Les webinaires, les analyses partagées et l'entraide constante m'ont permis d'atteindre mes objectifs financiers tout en gardant ma sérénité."
    }
  ];

  const features = [
    {
      icon: "ri-verified-badge-line",
      title: "Avis Vérifiés",
      description: "Tous les témoignages proviennent de traders réels et sont vérifiés pour garantir leur authenticité et leur pertinence."
    },
    {
      icon: "ri-message-3-line",
      title: "Discussions Enrichissantes",
      description: "Échangez avec d'autres traders, partagez vos analyses et obtenez des réponses à vos questions dans un environnement bienveillant."
    },
    {
      icon: "ri-trophy-line",
      title: "Programme de Fidélité",
      description: "Gagnez des badges et des récompenses pour votre participation active et votre progression dans la communauté."
    },
    {
      icon: "ri-team-line",
      title: "Mentorat Personnalisé",
      description: "Bénéficiez de l'accompagnement de traders expérimentés pour accélérer votre apprentissage et votre progression."
    },
    {
      icon: "ri-calendar-event-line",
      title: "Événements Exclusifs",
      description: "Participez à des webinaires, formations et rencontres en ligne réservés aux membres de la communauté."
    },
    {
      icon: "ri-shield-check-line",
      title: "Support Mutuel",
      description: "Recevez de l'aide et de l'encouragement dans les moments difficiles grâce à la solidarité de la communauté."
    }
  ];

  const socialChannels = [
    { name: "WhatsApp", icon: "ri-whatsapp-line", color: "#25D366", url: "#" },
    { name: "Telegram", icon: "ri-telegram-line", color: "#0088cc", url: "#" },
    { name: "LinkedIn", icon: "ri-linkedin-line", color: "#0077b5", url: "#" },
    { name: "Instagram", icon: "ri-instagram-line", color: "#E4405F", url: "#" },
    { name: "X (Twitter)", icon: "ri-twitter-x-line", color: "#000000", url: "#" },
    { name: "Facebook", icon: "ri-facebook-line", color: "#1877F2", url: "#" }
  ];

  return (
    <div className="communaute-page">
      <Header />
      
      {/* Hero Section */}
      <section className="communaute-hero">
        <div className="container">
          <div className="communaute-hero-content" data-aos="fade-up">
            <h1 className="communaute-title">
              Rejoignez notre <span className="highlight">Communauté</span>
            </h1>
            <p className="communaute-subtitle">
              Connectez-vous avec des traders passionnés, partagez vos expériences et progressez ensemble vers le succès avec discipline et sérénité.
            </p>
            <div className="communaute-hero-buttons">
              <a href="#testimonials" className="hero-button primary">
                <i className="ri-star-line"></i>
                Voir les témoignages
              </a>
              <a href="/inscription" className="hero-button secondary">
                <i className="ri-user-add-line"></i>
                Rejoindre maintenant
              </a>
            </div>
            
            {/* Social Channels */}
            <div className="social-channels" data-aos="fade-up" data-aos-delay="400">
              <p className="social-channels-title">Rejoignez-nous sur nos canaux :</p>
              <div className="social-channels-grid">
                {socialChannels.map((channel, index) => (
                  <a 
                    key={index}
                    href={channel.url}
                    className="social-channel"
                    style={{ '--channel-color': channel.color } as React.CSSProperties}
                    title={channel.name}
                  >
                    <i className={channel.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section" id="testimonials">
        <div className="container">
          <div className="testimonials-header" data-aos="fade-up">
            <h2 className="testimonials-title">Ce que disent nos membres</h2>
            <p className="testimonials-subtitle">
              Découvrez les témoignages authentiques de traders qui ont transformé leur approche grâce à Calmness FI.
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="testimonial-card"
                data-aos="fade-up"
                data-aos-delay={200 + (index * 100)}
              >
                <div className="testimonial-header">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="testimonial-avatar"
                  />
                  <div className="testimonial-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <i 
                      key={i} 
                      className={`ri-star-fill star ${i < testimonial.rating ? '' : 'empty'}`}
                    ></i>
                  ))}
                </div>
                <p className="testimonial-text">
                  <span className="quote-start">"</span>
                  {testimonial.text}
                  <span className="quote-end">"</span>
                </p>
              </div>
            ))}
          </div>

          <div className="view-all-button" data-aos="fade-up">
            <button 
              className="view-all-btn add-review-btn"
              onClick={() => setShowAddReview(!showAddReview)}
            >
              <i className="ri-add-line"></i>
              Ajouter un avis
            </button>
            <a href="/contact" className="view-all-btn">
              Voir tous les témoignages
              <i className="ri-arrow-right-line"></i>
            </a>
          </div>

          {/* Formulaire d'ajout d'avis */}
          {showAddReview && (
            <div className="add-review-form" data-aos="fade-up">
              <div className="form-container">
                <h3>Partagez votre expérience</h3>
                <form onSubmit={handleAddReview}>
                  <div className="form-group">
                    <label htmlFor="name">Nom *</label>
                    <input
                      type="text"
                      id="name"
                      value={newReview.name}
                      onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                      required
                      placeholder="Votre nom"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="role">Rôle</label>
                    <input
                      type="text"
                      id="role"
                      value={newReview.role}
                      onChange={(e) => setNewReview({...newReview, role: e.target.value})}
                      placeholder="Ex: Trader depuis 2022"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Note *</label>
                    <div className="rating-input">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className={`star-btn ${star <= newReview.rating ? 'active' : ''}`}
                          onClick={() => setNewReview({...newReview, rating: star})}
                        >
                          <i className="ri-star-fill"></i>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="text">Votre témoignage *</label>
                    <textarea
                      id="text"
                      value={newReview.text}
                      onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                      required
                      rows={4}
                      placeholder="Partagez votre expérience avec Calmness FI..."
                    />
                  </div>
                  
                  <div className="form-actions">
                    <button type="button" onClick={() => setShowAddReview(false)}>
                      Annuler
                    </button>
                    <button type="submit">
                      Publier l'avis
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-header" data-aos="fade-up">
            <h2 className="features-title">Pourquoi rejoindre notre communauté ?</h2>
            <p className="features-subtitle">
              Découvrez les avantages de faire partie de la communauté Calmness FI et transformez votre approche du trading.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-card"
                data-aos="fade-up"
                data-aos-delay={200 + (index * 100)}
              >
                <div className="feature-icon">
                  <i className={feature.icon}></i>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" data-aos="fade-up">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">
              Prêt à transformer votre trading ?
            </h2>
            <p className="cta-subtitle">
              Rejoignez notre communauté de traders sereins et commencez votre parcours vers la maîtrise émotionnelle dès aujourd'hui.
            </p>
            <div className="cta-buttons">
              <a href="/inscription" className="cta-button primary">
                <i className="ri-user-add-line"></i>
                S'inscrire maintenant
              </a>
              <a href="/formations" className="cta-button secondary">
                <i className="ri-book-open-line"></i>
                Découvrir nos formations
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
