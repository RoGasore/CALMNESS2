'use client';

import { useState } from 'react';
import { Metadata } from 'next';

export default function ConnexionPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulation d'une connexion
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Ici vous pouvez ajouter votre logique de connexion
      console.log('Connexion avec:', { email, password });
      
      // Redirection après connexion réussie
      // router.push('/dashboard');
    } catch (err) {
      setError('Erreur de connexion. Veuillez vérifier vos identifiants.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: 'google' | 'apple') => {
    console.log(`Connexion avec ${provider}`);
    // Ici vous pouvez ajouter votre logique de connexion sociale
  };

  return (
    <div className="auth-page">
      {/* Hero Section */}
      <section className="auth-hero">
        <div className="container">
          <h1 className="auth-title">
            Connexion
          </h1>
          <p className="auth-subtitle">
            Connectez-vous à votre compte pour accéder à nos services
          </p>
        </div>
      </section>

      {/* Login Form Section */}
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
              <h2 className="auth-form-title">Bienvenue sur Calmness</h2>
              <div className="qr-icon">
                <i className="fa-solid fa-qrcode"></i>
              </div>

              {/* Form */}
              <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Votre e-mail/numéro de téléphone
                  </label>
                  <div className="input-container">
                    <input
                      type="text"
                      id="email"
                      name="email"
                      className="form-input"
                      placeholder="E-mail/N° de téléphone"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    {email && (
                      <button 
                        type="button" 
                        className="input-clear"
                        onClick={() => setEmail('')}
                      >
                        <i className="fa-solid fa-times"></i>
                      </button>
                    )}
                  </div>
                  
                  {/* Email Suggestions */}
                  {email && email.length > 3 && (
                    <div className="email-suggestions">
                      <div className="suggestion-item" onClick={() => setEmail(`${email}@gmail.com`)}>
                        {email}@gmail.com
                      </div>
                      <div className="suggestion-item" onClick={() => setEmail(`${email}@qq.com`)}>
                        {email}@qq.com
                      </div>
                      <div className="suggestion-item" onClick={() => setEmail(`${email}@hotmail.com`)}>
                        {email}@hotmail.com
                      </div>
                      <div className="suggestion-item" onClick={() => setEmail(`${email}@outlook.com`)}>
                        {email}@outlook.com
                      </div>
                      <div className="suggestion-item" onClick={() => setEmail(`${email}@icloud.com`)}>
                        {email}@icloud.com
                      </div>
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    Mot de passe
                  </label>
                  <div className="input-container">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      className="form-input"
                      placeholder="Mot de passe"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button 
                      type="button" 
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
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
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="loading-spinner"></div>
                  ) : (
                    'Suivant'
                  )}
                </button>

                {/* Links */}
                <div className="auth-links">
                  <a href="/mot-de-passe-oublie" className="auth-link">
                    Mot de passe oublié ?
                  </a>
                  <a href="/connexion-passkey" className="auth-link">
                    Utiliser la clé d'accès pour se connecter
                  </a>
                </div>

                {/* Separator */}
                <div className="form-separator">
                  <span>ou</span>
                </div>

                {/* Social Login Buttons */}
                <div className="social-buttons">
                  <button 
                    type="button" 
                    className="social-button google-button"
                    onClick={() => handleSocialLogin('google')}
                  >
                    <div className="social-icon google-icon">G</div>
                    <span>Continuer avec Google</span>
                  </button>
                  
                  <button 
                    type="button" 
                    className="social-button apple-button"
                    onClick={() => handleSocialLogin('apple')}
                  >
                    <div className="social-icon apple-icon">
                      <i className="fa-brands fa-apple"></i>
                    </div>
                    <span>Continuer avec Apple</span>
                  </button>
                </div>

                {/* Register Link */}
                <div className="register-link">
                  <span>Pas encore de compte ? </span>
                  <a href="/inscription" className="auth-link primary">
                    S'inscrire
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
