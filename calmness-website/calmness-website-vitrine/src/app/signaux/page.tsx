import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Signaux de Trading - Calmness FI',
  description: 'Recevez des signaux de trading en temps réel. Nos algorithmes analysent les marchés 24h/24 pour vous fournir les meilleures opportunités.',
};

export default function SignauxPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
            Signaux de Trading
          </h1>
          <p className="text-xl text-secondary-600 mb-8">
            Recevez des signaux de trading en temps réel analysés par nos algorithmes avancés
          </p>
          <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
        </div>
      </section>

      {/* Signaux Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Plan Gratuit */}
            <div className="bg-white rounded-xl shadow-lg border border-secondary-100 p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fa-solid fa-gift text-gray-600 text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-secondary-900 mb-2">Gratuit</h3>
                <p className="text-secondary-600">Pour débuter</p>
              </div>
              
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-secondary-900">0$</span>
                <span className="text-secondary-600">/mois</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-green-600 mr-3"></i>
                  <span>3 signaux par semaine</span>
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-green-600 mr-3"></i>
                  <span>Paires majeures uniquement</span>
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-green-600 mr-3"></i>
                  <span>Notifications par email</span>
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-green-600 mr-3"></i>
                  <span>Support communautaire</span>
                </li>
              </ul>
              
              <button className="w-full bg-gray-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                Commencer gratuitement
              </button>
            </div>

            {/* Plan Premium */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-primary-600 p-8 hover:shadow-xl transition-shadow duration-300 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Recommandé
                </span>
              </div>
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fa-solid fa-star text-primary-600 text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-secondary-900 mb-2">Premium</h3>
                <p className="text-secondary-600">Pour les traders actifs</p>
              </div>
              
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-secondary-900">75$</span>
                <span className="text-secondary-600">/mois</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-green-600 mr-3"></i>
                  <span>Signaux quotidiens</span>
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-green-600 mr-3"></i>
                  <span>Toutes les paires de devises</span>
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-green-600 mr-3"></i>
                  <span>Notifications push</span>
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-green-600 mr-3"></i>
                  <span>Analyse technique détaillée</span>
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-green-600 mr-3"></i>
                  <span>Support prioritaire</span>
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-green-600 mr-3"></i>
                  <span>Historique des performances</span>
                </li>
              </ul>
              
              <a href="/paiement?service=signaux-premium" className="w-full bg-primary-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors duration-200 inline-block text-center">
                Choisir Premium
              </a>
            </div>

            {/* Plan VIP */}
            <div className="bg-white rounded-xl shadow-lg border border-secondary-100 p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fa-solid fa-crown text-purple-600 text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-secondary-900 mb-2">VIP</h3>
                <p className="text-secondary-600">Pour les professionnels</p>
              </div>
              
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-secondary-900">150$</span>
                <span className="text-secondary-600">/mois</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-green-600 mr-3"></i>
                  <span>Tout du plan Premium</span>
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-green-600 mr-3"></i>
                  <span>Signaux en temps réel</span>
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-green-600 mr-3"></i>
                  <span>Alertes personnalisées</span>
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-green-600 mr-3"></i>
                  <span>Accès aux algorithmes</span>
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-green-600 mr-3"></i>
                  <span>Coaching individuel</span>
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-green-600 mr-3"></i>
                  <span>Support 24/7</span>
                </li>
              </ul>
              
              <a href="/paiement?service=signaux-vip" className="w-full bg-purple-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors duration-200 inline-block text-center">
                Devenir VIP
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Nos Performances
            </h2>
            <p className="text-xl text-secondary-600">
              Des résultats concrets qui parlent d&apos;eux-mêmes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">87%</div>
              <p className="text-secondary-600">Taux de réussite</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">+245%</div>
              <p className="text-secondary-600">Gain moyen annuel</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">2.3%</div>
              <p className="text-secondary-600">Risque maximum</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Prêt à recevoir vos premiers signaux ?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Commencez gratuitement et découvrez la puissance de nos signaux de trading.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-primary-600 bg-white hover:bg-primary-50 transition-colors duration-200"
            >
              Demander une démo
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-lg text-white bg-transparent hover:bg-white hover:text-primary-600 transition-colors duration-200"
            >
              Essai gratuit 7 jours
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
