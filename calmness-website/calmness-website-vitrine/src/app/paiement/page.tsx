"use client";
import { useState, useEffect } from 'react';
import { Metadata } from 'next';
import '../../styles/pages/paiement.css';
import '../../styles/pages/paiement.css';

export default function PaiementPage() {
  const [selectedPayment, setSelectedPayment] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [service, setService] = useState('');

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté (à implémenter plus tard)
    const userLoggedIn = localStorage.getItem('userToken');
    setIsLoggedIn(!!userLoggedIn);

    // Récupérer le service depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    setService(urlParams.get('service') || '');
  }, []);

  const paymentMethods = [
    {
      id: 'paypal',
      name: 'PayPal',
      icon: 'fab fa-paypal',
      description: 'Paiement sécurisé via PayPal',
      color: '#0070ba'
    },
    {
      id: 'visa',
      name: 'Visa/Mastercard',
      icon: 'fab fa-cc-visa',
      description: 'Carte bancaire Visa ou Mastercard',
      color: '#1a1f71'
    },
    {
      id: 'bank',
      name: 'Virement Bancaire',
      icon: 'fa-solid fa-university',
      description: 'Transfert bancaire direct',
      color: '#2c5aa0'
    },
    {
      id: 'mobile',
      name: 'Mobile Money',
      icon: 'fa-solid fa-mobile-alt',
      description: 'Mobile Money (Orange Money, MTN, Airtel, etc.)',
      color: '#ff6b35'
    }
  ];

  const handlePaymentSelection = (paymentId: string) => {
    if (!isLoggedIn) {
      alert('Vous devez vous connecter avant de procéder au paiement.');
      return;
    }
    setSelectedPayment(paymentId);
  };

  const handleLoginRedirect = () => {
    // Rediriger vers la page de connexion (à implémenter)
    window.location.href = '/connexion';
  };

  // Appel backend: initialiser un paiement côté serveur (idempotent)
  const initPaiementBackend = async (serviceCode: string, provider: string, amount: number) => {
    try {
      // Clé idempotente simple (à affiner côté prod)
      const idempotencyKey = `${serviceCode}-${provider}-${Date.now()}`;
      const res = await fetch('/api/billing/payments/init', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_code: serviceCode,
          amount,
          currency: 'USD',
          provider,
          idempotency_key: idempotencyKey,
          metadata: { ua: navigator.userAgent },
        }),
      });
      if (!res.ok) throw new Error('Erreur lors de l\'initialisation du paiement');
      const data = await res.json();
      return data;
    } catch (e) {
      alert('Impossible d\'initialiser le paiement. Merci de réessayer.');
      return null;
    }
  };

  // Appel backend: créer un abonnement (hebdomadaire/mensuel) après paiement OK
  const createSubscriptionBackend = async (planCode: string, autoRenew = true) => {
    try {
      const res = await fetch('/api/billing/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan_code: planCode, auto_renew: autoRenew }),
      });
      if (!res.ok) throw new Error('Erreur lors de la création de l\'abonnement');
      const data = await res.json();
      return data;
    } catch (e) {
      alert('Impossible de créer l\'abonnement.');
      return null;
    }
  };

  // Bouton d\'action principal pour déclencher le paiement côté backend
  const handlePayer = async () => {
    if (!selectedPayment) return;
    // Déterminer un service cible: si l\'URL contient ?service=...
    const serviceCode = service || 'signaux-premium';
    // Montant démo (à lier depuis la page source idéale)
    const montantParDefaut = 75;
    const init = await initPaiementBackend(serviceCode, selectedPayment, montantParDefaut);
    if (!init) return;
    // Ici, on simule le succès immédiat (dans un vrai flux, on irait sur PSP ou écouterait un webhook)
    if (serviceCode.startsWith('signaux')) {
      const planCode = serviceCode.includes('vip') ? 'signaux-monthly' : 'signaux-monthly';
      await createSubscriptionBackend(planCode, true);
      alert('Paiement initialisé. Votre abonnement est en cours d\'activation.');
    } else {
      alert('Paiement initialisé.');
    }
  };

  return (
    <div className="paiement-page">
      {/* Hero Section */}
      <section className="paiement-hero">
        <div className="container">
          <h1 className="paiement-title">
            Paiement Sécurisé
          </h1>
          <p className="paiement-subtitle">
            Choisissez votre moyen de paiement préféré pour finaliser votre commande
          </p>
        </div>
      </section>

      {/* Login Check */}
      {!isLoggedIn && (
        <section className="login-required">
          <div className="container">
            <div className="login-card">
              <div className="login-icon">
                <i className="fa-solid fa-lock"></i>
              </div>
              <h2>Connexion Requise</h2>
              <p>Vous devez vous connecter à votre compte pour procéder au paiement.</p>
              <button onClick={handleLoginRedirect} className="login-button">
                Se connecter
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Payment Methods */}
      {isLoggedIn && (
        <section className="payment-methods">
          <div className="container">
            <h2 className="methods-title">Moyens de Paiement Acceptés</h2>
            <div className="payment-grid">
              {paymentMethods.map((method) => (
                <div 
                  key={method.id}
                  className={`payment-card ${selectedPayment === method.id ? 'selected' : ''}`}
                  onClick={() => handlePaymentSelection(method.id)}
                >
                  <div className="payment-icon" style={{ color: method.color }}>
                    <i className={method.icon}></i>
                  </div>
                  <h3>{method.name}</h3>
                  <p>{method.description}</p>
                  {selectedPayment === method.id && (
                    <div className="selected-indicator">
                      <i className="fa-solid fa-check"></i>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Payment Form */}
      {isLoggedIn && selectedPayment && (
        <section className="payment-form-section">
          <div className="container">
            <div className="payment-form-card">
              <h2>Informations de Paiement</h2>
              
              {selectedPayment === 'paypal' && (
                <div className="payment-form paypal-form">
                  <p>Vous allez être redirigé vers PayPal pour finaliser votre paiement.</p>
                  <div className="form-group">
                    <label>Email PayPal :</label>
                    <input type="email" placeholder="votre@email.com" required />
                  </div>
                  <button className="pay-button paypal-button">
                    <i className="fab fa-paypal"></i>
                    Payer avec PayPal
                  </button>
                </div>
              )}

              {selectedPayment === 'visa' && (
                <div className="payment-form card-form">
                  <div className="form-group">
                    <label>Numéro de carte :</label>
                    <input type="text" placeholder="1234 5678 9012 3456" required />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Date d&apos;expiration :</label>
                      <input type="text" placeholder="MM/AA" required />
                    </div>
                    <div className="form-group">
                      <label>CVV :</label>
                      <input type="text" placeholder="123" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Nom sur la carte :</label>
                    <input type="text" placeholder="Jean Dupont" required />
                  </div>
                  <button className="pay-button card-button">
                    <i className="fa-solid fa-credit-card"></i>
                    Payer avec ma carte
                  </button>
                </div>
              )}

              {selectedPayment === 'bank' && (
                <div className="payment-form bank-form">
                  <p>Effectuez un virement bancaire vers notre compte :</p>
                  <div className="bank-details">
                    <div className="bank-item">
                      <span className="bank-label">Banque :</span>
                      <span className="bank-value">Banque Populaire</span>
                    </div>
                    <div className="bank-item">
                      <span className="bank-label">IBAN :</span>
                      <span className="bank-value">FR76 1234 5678 9012 3456 7890 123</span>
                    </div>
                    <div className="bank-item">
                      <span className="bank-label">BIC :</span>
                      <span className="bank-value">CCBPFRPPXXX</span>
                    </div>
                    <div className="bank-item">
                      <span className="bank-label">Référence :</span>
                      <span className="bank-value">CALM-{Date.now()}</span>
                    </div>
                  </div>
                  <p className="bank-note">
                    <strong>Important :</strong> Indiquez la référence dans le libellé de votre virement. 
                    Votre commande sera validée sous 24-48h après réception du virement.
                  </p>
                </div>
              )}

              {selectedPayment === 'mobile' && (
                <div className="payment-form mobile-form">
                  <div className="form-group">
                    <label>Opérateur :</label>
                    <select required>
                      <option value="">Sélectionnez votre opérateur</option>
                      <option value="orange">Orange Money</option>
                      <option value="mtn">MTN Mobile Money</option>
                      <option value="airtel">Airtel Money</option>
                      <option value="moov">Moov Money</option>
                      <option value="wave">Wave</option>
                      <option value="free">Free Money</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Numéro de téléphone :</label>
                    <input type="tel" placeholder="+225 07 12 34 56 78" required />
                  </div>
                  <div className="form-group">
                    <label>Code de confirmation :</label>
                    <input type="text" placeholder="Code reçu par SMS" required />
                  </div>
                  <button className="pay-button mobile-button">
                    <i className="fa-solid fa-mobile-alt"></i>
                    Payer avec Mobile Money
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Security Notice */}
      <section className="security-notice">
        <div className="container">
          <div className="security-card">
            <div className="security-icon">
              <i className="fa-solid fa-shield-alt"></i>
            </div>
            <h3>Paiement 100% Sécurisé</h3>
            <p>
              Tous vos paiements sont protégés par un cryptage SSL de niveau bancaire. 
              Vos informations personnelles et financières sont traitées de manière sécurisée.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
