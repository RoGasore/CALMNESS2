import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inscription - Calmness FI',
  description: 'Créez votre compte Calmness FI pour accéder à nos services de trading et d\'analyse financière.',
};

export default function InscriptionPage() {
  return (
    <div className="auth-page">
      {/* Hero Section */}
      <section className="auth-hero">
        <div className="container">
          <h1 className="auth-title">
            Inscription
          </h1>
          <p className="auth-subtitle">
            Créez votre compte pour accéder à nos services premium
          </p>
        </div>
      </section>

      {/* Registration Form Section */}
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

              {/* Form */}
              <form className="auth-form">
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
                      placeholder="E-mail/N° de téléphone (sans l'indicatif du pa"
                      defaultValue="rayanyuioolmk@qq.com"
                    />
                    <button type="button" className="input-clear">
                      <i className="fa-solid fa-times"></i>
                    </button>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="form-checkbox">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    className="checkbox-input"
                    defaultChecked
                  />
                  <label htmlFor="terms" className="checkbox-label">
                    En créant un compte, j'accepte les{' '}
                    <a href="#" className="link-underline">Conditions d'utilisation</a>{' '}
                    et la{' '}
                    <a href="#" className="link-underline">Politique de confidentialité</a>{' '}
                    de Calmness.
                  </label>
                </div>

                {/* Submit Button */}
                <button type="submit" className="auth-submit-button">
                  ....
                </button>

                {/* Separator */}
                <div className="form-separator">
                  <span>ou</span>
                </div>

                {/* Social Login Buttons */}
                <div className="social-buttons">
                  <button type="button" className="social-button google-button">
                    <div className="social-icon google-icon">G</div>
                    <span>Continuer avec Google</span>
                  </button>
                  
                  <button type="button" className="social-button apple-button">
                    <div className="social-icon apple-icon">
                      <i className="fa-brands fa-apple"></i>
                    </div>
                    <span>Continuer avec Apple</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
