const Footer = () => {
  return (
    <footer className="footer-main">
      <div className="footer-row">
        <div className="footer-col">
          <img src="/logo.png" alt="Calmness FI Logo" className="footer-logo" />
          <p className="footer-description">
            Calmness FI est votre partenaire de confiance pour l&apos;éducation financière et le trading en République Démocratique du Congo. 
            Nous offrons des formations professionnelles, un accompagnement personnalisé et des outils de trading avancés pour vous aider à réussir sur les marchés financiers.
          </p>
        </div>
        <div className="footer-col">
          <h3>Bureau <div className="footer-underline"><span></span></div></h3>
          <p>Calmness FI</p>
          <p>Avenue de la Paix, Quartier Himbi</p>
          <p>Goma, Nord-Kivu, RDC</p>
          <p className="footer-email">contact@calmnessfi.cd</p>
          <h4>+243 999 123 456</h4>
        </div>
        <div className="footer-col">
          <h3>Liens <div className="footer-underline"><span></span></div></h3>
          <ul>
            <li><a href="/" className="footer-link">Accueil</a></li>
            <li><a href="/a-propos" className="footer-link">À propos</a></li>
            <li><a href="/services" className="footer-link">Services</a></li>
            <li><a href="/contact" className="footer-link">Contact</a></li>
            <li><a href="#communaute" className="footer-link">Communauté</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>Newsletter <div className="footer-underline"><span></span></div></h3>
          <form className="footer-form">
            <i className="ri-mail-line"></i>
            <input type="email" placeholder="Votre adresse email" required className="footer-input"/> 
            <button type="submit" className="footer-submit"><i className="ri-send-plane-line"></i></button>
          </form>
          <div className="footer-social-icons">
            <i className="ri-facebook-fill"></i>
            <i className="ri-twitter-fill"></i>
            <i className="ri-whatsapp-fill"></i>
            <i className="ri-linkedin-fill"></i>
            <i className="ri-telegram-fill"></i>
          </div>
        </div>
      </div>
      <hr className="footer-hr" />
      <p className="footer-copyright">
        © {new Date().getFullYear()} Calmness FI. Tous droits réservés. | Goma, RDC
      </p>
    </footer>
  );
};

export default Footer;
