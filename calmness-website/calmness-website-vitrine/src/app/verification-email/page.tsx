'use client';

import { useState, useEffect } from 'react';

export default function VerificationEmailPage() {
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes en secondes
  const [canResend, setCanResend] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulation de vérification
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (verificationCode === '876578') {
        setError('Code de vérification incorrect. Veuillez vérifier vos e-mails ou renvoyer le code et réessayer.(001412-d38882c2)');
      } else {
        // Redirection après vérification réussie
        console.log('Code vérifié avec succès');
        // router.push('/dashboard');
      }
    } catch (err) {
      setError('Erreur lors de la vérification. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    try {
      // Simulation d'envoi de code
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTimeLeft(30 * 60);
      setCanResend(false);
      setError('');
    } catch (err) {
      setError('Erreur lors de l\'envoi du code. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Hero Section */}
      <section className="auth-hero">
        <div className="container">
          <h1 className="auth-title">
            Vérification Email
          </h1>
          <p className="auth-subtitle">
            Vérifiez votre adresse email pour activer votre compte
          </p>
        </div>
      </section>

      {/* Verification Form Section */}
      <section className="auth-form-section">
        <div className="container">
          <div className="auth-form-container">
            <div className="auth-form-card">
              {/* Logo */}
              <div className="auth-logo">
                <div className="calmness-logo">
                  <div className="logo-diamond"></div>
                  <span className="logo-text">CALMNESS</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="auth-form-title">Vérifiez votre e-mail</h2>

              {/* Instructions */}
              <div className="verification-instructions">
                <p>
                  Un code à six chiffres a été envoyé à <strong>rayanyuioolmk@qq.com</strong>. 
                  Veuillez le saisir dans les <strong>{formatTime(timeLeft)}</strong> prochaines minutes.
                </p>
              </div>

              {/* Form */}
              <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="verificationCode" className="form-label">
                    Code de vérification
                  </label>
                  <div className="input-container">
                    <input
                      type="text"
                      id="verificationCode"
                      name="verificationCode"
                      className="form-input verification-input"
                      placeholder="Entrez le code à 6 chiffres"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      maxLength={6}
                      required
                    />
                    <div className="code-sent-info">
                      <span>Code envoyé</span>
                      <i className="fa-solid fa-info-circle"></i>
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="error-message">
                    <i className="fa-solid fa-exclamation-triangle"></i>
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className={`auth-submit-button ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading || verificationCode.length !== 6}
                >
                  {isLoading ? (
                    <div className="loading-spinner"></div>
                  ) : (
                    'Suivant'
                  )}
                </button>

                {/* Resend Code Link */}
                <div className="resend-section">
                  <a 
                    href="#" 
                    className={`auth-link ${canResend ? 'active' : 'disabled'}`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (canResend) {
                        handleResendCode();
                      }
                    }}
                  >
                    {canResend ? 'Renvoyer le code' : `Vous n'avez pas reçu de code?`}
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Help Modal */}
      <div className="help-widget">
        <i className="fa-solid fa-headphones"></i>
      </div>
    </div>
  );
}
