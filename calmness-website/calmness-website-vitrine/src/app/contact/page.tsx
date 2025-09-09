import { getPageContact } from '@/lib/strapi';

export const metadata = {
  title: 'Contact - Calmness FI',
  description: 'Contactez Calmness FI pour vos questions et demandes de consultation. Notre équipe est à votre disposition.',
};

export default async function ContactPage() {
  const pageData = await getPageContact();

  const defaultData = {
    titre: 'Contactez-nous',
    adresse: 'Adresse à définir',
    telephone: 'Téléphone à définir',
    email: 'contact@calmnesstrading.com',
    horaires: 'Horaires à définir'
  };

  const contactInfo = pageData ? pageData.attributes : defaultData;
  const { titre, adresse, telephone, email, horaires } = contactInfo;

  return ( 
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <h1 className="contact-title">
            {titre}
          </h1>
          <p className="contact-subtitle">
            Nous sommes là pour vous accompagner dans votre parcours de trading
          </p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="contact-info-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info-card">
              <div className="contact-icon">
                <i className="fa-solid fa-map-marker-alt"></i>
              </div>
              <h3>Adresse</h3>
              <p>{adresse}</p>
            </div>
            
            <div className="contact-info-card">
              <div className="contact-icon">
                <i className="fa-solid fa-phone"></i>
              </div>
              <h3>Téléphone</h3>
              <p>{telephone}</p>
            </div>
            
            <div className="contact-info-card">
              <div className="contact-icon">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <h3>Email</h3>
              <p>{email}</p>
            </div>
            
            <div className="contact-info-card">
              <div className="contact-icon">
                <i className="fa-solid fa-clock"></i>
              </div>
              <h3>Horaires</h3>
              <p>{horaires}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="container">
          <div className="contact-form-container">
            <h2 className="form-title">Envoyez-nous un message</h2>
            <form className="contact-form">
              <div className="row100">
                <div className="col">
                  <div className="inputBox">
                    <input type="text" name="nom" id="nom" required/>
                    <span className="text">Nom</span>
                    <span className="line"></span>
                  </div>
                </div>

                <div className="col">
                  <div className="inputBox">
                    <input type="text" name="prenom" id="prenom" required/>
                    <span className="text">Prénom</span>
                    <span className="line"></span>
                  </div>
                </div>
              </div>

              <div className="row100">
                <div className="col">
                  <div className="inputBox">
                    <input type="email" name="email" id="email" required/>
                    <span className="text">Email</span>
                    <span className="line"></span>
                  </div>
                </div>

                <div className="col">
                  <div className="inputBox">
                    <input type="tel" name="mobile" id="mobile" required/>
                    <span className="text">Mobile</span>
                    <span className="line"></span>
                  </div>
                </div>
              </div>

              <div className="row100">
                <div className="col">
                  <div className="inputBox textarea">
                    <textarea name="message" id="message" required></textarea>
                    <span className="text">Entrer votre message ici...</span>
                    <span className="line"></span>
                  </div>
                </div>
              </div>

              <div className="row100">
                <div className="col">
                  <input type="submit" value="Envoyer le message" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}