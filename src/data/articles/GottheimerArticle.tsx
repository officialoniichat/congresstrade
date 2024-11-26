import React from 'react';
import { ArrowRight, DollarSign, Users, Shield, LineChart, Zap } from 'lucide-react';
import { ArticleHeader } from './HeaderCrenshaw';

interface ArticleProps {
  onConsultation: () => void;
}

export const GottheimerArticle: React.FC<ArticleProps> = ({ onConsultation }) => {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <ArticleHeader 
        title="Die Tech-Strategie von Josh Gottheimer: Wie Sie vom Halbleiter-Boom profitieren können"
        author="Sarah Miller"
        image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      />

      <figure className="mb-12">
        <img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          alt="Semiconductor manufacturing"
          className="w-full rounded-2xl shadow-lg"
        />
        <figcaption className="text-sm text-gray-500 mt-3 text-center italic">
          Halbleiterproduktion: Ein Sektor mit immensem Wachstumspotenzial
        </figcaption>
      </figure>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl sm:text-2xl font-semibold text-navy-900 leading-relaxed mb-8">
          Wussten Sie, dass der Halbleitersektor einer der am schnellsten wachsenden Märkte weltweit ist? Josh Gottheimer, ein erfahrener Kongressabgeordneter, hat das erkannt und setzt erfolgreich auf diesen Trend. Erfahren Sie, wie auch Sie von diesem Boom profitieren können.
        </p>

        <p className="mb-6 text-gray-700">
          Als Mitglied des Kongresses hat Gottheimer eine aktive Rolle bei der Förderung der Halbleiterindustrie gespielt. Mit seiner Unterstützung des CHIPS and Science Act hat er den Weg für massive Investitionen in die heimische Chip-Produktion geebnet. Doch was bedeutet das für Sie als Anleger?
        </p>

        <p className="mb-6 text-gray-700">
          Die Halbleiterindustrie ist das Herzstück moderner Technologie – von Smartphones über Autos bis hin zu medizinischen Geräten. Die steigende Nachfrage nach leistungsstarken Chips und die staatliche Förderung schaffen ideale Bedingungen für Investoren.
        </p>


{/* Mid-Article CTA */}
<div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 p-8 rounded-2xl my-12">
  <div className="flex items-center gap-3 mb-4">
    <Zap className="h-8 w-8 text-blue-600" />
    <h3 className="text-2xl font-bold text-blue-900">Exklusive Beratung</h3>
  </div>
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
    <div className="flex-1">
      <p className="text-lg text-blue-800 mb-4">
        Sichern Sie sich jetzt Ihren persönlichen Strategietermin und erhalten Sie:
      </p>
      <ul className="space-y-3">
        <li className="flex items-center gap-2 text-blue-700">
          <div className="h-2 w-2 bg-blue-500 rounded-full" />
          Individuelle Marktanalyse
        </li>
        <li className="flex items-center gap-2 text-blue-700">
          <div className="h-2 w-2 bg-blue-500 rounded-full" />
          Maßgeschneiderte Investitionsempfehlungen
        </li>
        <li className="flex items-center gap-2 text-blue-700">
          <div className="h-2 w-2 bg-blue-500 rounded-full" />
          Exklusiver Zugang zu Marktprognosen
        </li>
      </ul>
    </div>
    <div className="flex flex-col gap-4">
      <button
        onClick={onConsultation}
        className="flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-blue-700 transition-colors group shadow-lg"
      >
        Jetzt Termin sichern
        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
      </button>
      <div className="flex items-center justify-center text-blue-600 gap-2">
        <Users className="h-5 w-5" />
        <span className="text-sm font-medium">Limitierte Plätze verfügbar</span>
      </div>
    </div>
  </div>
</div>

        <h2 className="text-3xl font-bold text-navy-900 mb-6">Ihre Chance im Halbleitersektor</h2>

        <p className="mb-6 text-gray-700">
          Stellen Sie sich vor, Sie könnten frühzeitig in Unternehmen investieren, die vom Halbleiter-Boom profitieren. Mit der richtigen Strategie ist das möglich. Unternehmen wie AMD und Intel stehen an vorderster Front dieser Entwicklung und bieten enormes Wachstumspotenzial.
        </p>

        {/* Trade Analysis Box */}
        <div className="bg-navy-50 p-8 rounded-2xl my-12">
          <h3 className="text-2xl font-bold text-navy-900 mb-6">Vielversprechende Investitionsmöglichkeiten:</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-start gap-3">
                <DollarSign className="h-8 w-8 text-gold-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-lg mb-3">AMD</h4>
                  <div className="space-y-2 text-gray-700">
                    <p>Marktposition: <span className="font-semibold">Führend in Hochleistungsprozessoren</span></p>
                    <p>Wachstumspotenzial: <span className="font-semibold">Hohe Nachfrage in Gaming und KI</span></p>
                    <p>Strategie: <span className="font-semibold">Expansion in neue Märkte</span></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-start gap-3">
                <DollarSign className="h-8 w-8 text-gold-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-lg mb-3">Intel</h4>
                  <div className="space-y-2 text-gray-700">
                    <p>Marktposition: <span className="font-semibold">Globaler Chip-Hersteller</span></p>
                    <p>Wachstumspotenzial: <span className="font-semibold">Investitionen in neue Technologien</span></p>
                    <p>Strategie: <span className="font-semibold">Stärkung der Produktion in den USA</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-6 text-gray-700 leading-relaxed">
            Diese Unternehmen sind nur Beispiele für das enorme Potenzial des Halbleitersektors. Mit der richtigen Unterstützung können Sie diese Chancen für sich nutzen.
          </p>
        </div>

        {/* Success Stories */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 my-12">
          <h3 className="text-2xl font-bold text-green-800 mb-6">Erfolgsgeschichten unserer Kunden:</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Andreas K."
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <p className="font-bold text-lg">Andreas K.</p>
                  <p className="text-gray-600">Softwareentwickler aus Berlin</p>
                  <p className="text-green-600 font-bold text-lg mt-1">+45,2% Rendite in 4 Monaten</p>
                  <p className="text-gray-600 mt-2">
                    "Dank der Beratung von CongressTrade habe ich frühzeitig in den Halbleitersektor investiert und beeindruckende Gewinne erzielt."
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Julia R."
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <p className="font-bold text-lg">Julia R.</p>
                  <p className="text-gray-600">Projektmanagerin aus München</p>
                  <p className="text-green-600 font-bold text-lg mt-1">+39,6% Rendite in 3 Monaten</p>
                  <p className="text-gray-600 mt-2">
                    "Die individuellen Empfehlungen haben meine Investmentstrategie nachhaltig verbessert."
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-6 text-gray-700 leading-relaxed">
            Diese Erfolge könnten auch Ihre sein. Mit der richtigen Unterstützung sind Ihren finanziellen Zielen keine Grenzen gesetzt.
          </p>
        </div>

        <h2 className="text-3xl font-bold text-navy-900 mb-6">Unsere Expertise: Ihr Vorteil</h2>

        <p className="mb-6 text-gray-700">
          Bei CongressTrade kombinieren wir fundierte Marktanalysen mit individuellem Beratungsservice. Unsere Experten beobachten die Entwicklungen im Technologiesektor genau und identifizieren frühzeitig Chancen für unsere Kunden.
        </p>

        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <Shield className="h-8 w-8 text-gold-500 mb-4" />
            <h4 className="font-bold text-lg mb-2">Individuelle Beratung</h4>
            <p className="text-gray-600">
              Wir entwickeln gemeinsam mit Ihnen eine Strategie, die zu Ihren Zielen passt.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <LineChart className="h-8 w-8 text-gold-500 mb-4" />
            <h4 className="font-bold text-lg mb-2">Aktuelle Marktanalysen</h4>
            <p className="text-gray-600">
              Bleiben Sie informiert über die neuesten Trends und Entwicklungen.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <DollarSign className="h-8 w-8 text-gold-500 mb-4" />
            <h4 className="font-bold text-lg mb-2">Maximierung Ihrer Rendite</h4>
            <p className="text-gray-600">
              Wir helfen Ihnen, das Beste aus Ihren Investitionen herauszuholen.
            </p>
          </div>
        </div>

        <p className="mb-6 text-gray-700">
          Nutzen Sie unser Wissen und unsere Erfahrung, um Ihre finanziellen Ziele zu erreichen. Wir begleiten Sie auf Ihrem Weg zum Erfolg.
        </p>

        {/* Final CTA */}
        <div className="bg-navy-900 text-white p-8 rounded-2xl my-12">
          <h3 className="text-2xl font-bold mb-6">Starten Sie jetzt Ihre Erfolgsgeschichte</h3>
          <p className="text-lg mb-8 text-gray-200">
            Lassen Sie sich von unseren Experten beraten und entdecken Sie Ihre Möglichkeiten im Halbleitersektor. Vereinbaren Sie jetzt ein unverbindliches Beratungsgespräch.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <button
              onClick={onConsultation}
              className="flex items-center justify-center bg-gold-500 text-navy-900 px-8 py-4 rounded-xl text-lg font-bold hover:bg-gold-600 transition-colors group"
            >
              Jetzt Beratungsgespräch vereinbaren
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center text-gold-500">
              <Users className="h-6 w-6 mr-2" />
              <span>Über 5.000 zufriedene Kunden</span>
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            * Begrenzte Plätze verfügbar. Sichern Sie sich jetzt Ihren Termin.
          </p>
        </div>
      </div>
    </article>
  );
};
