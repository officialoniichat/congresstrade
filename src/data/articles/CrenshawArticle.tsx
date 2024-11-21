import React from 'react';
import { ArrowRight, DollarSign, Users, Shield, LineChart, Zap } from 'lucide-react';
import { ArticleHeader } from './HeaderGottheimer';

interface ArticleProps {
  onConsultation: () => void;
}

export const CrenshawArticle: React.FC<ArticleProps> = ({ onConsultation }) => {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <ArticleHeader 
        title="Wie Dan Crenshaw mit cleveren Energie-Investitionen beeindruckende Gewinne erzielte – und was Sie daraus lernen können"
        author="Michael Schmidt"
        image="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      />

      <figure className="mb-12">
        <img
          src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          alt="Oil field"
          className="w-full rounded-2xl shadow-lg"
        />
        <figcaption className="text-sm text-gray-500 mt-3 text-center italic">
          Ölfelder in Texas: Der Energiesektor erlebte einen beispiellosen Boom
        </figcaption>
      </figure>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl sm:text-2xl font-semibold text-navy-900 leading-relaxed mb-8">
          Dan Crenshaw, der texanische Kongressabgeordnete, hat durch kluge Investitionen im Energiesektor beeindruckende Gewinne erzielt. Seine Strategien könnten auch Ihnen helfen, Ihr Vermögen zu steigern. Lesen Sie weiter, um zu erfahren, wie.
        </p>

        <p className="mb-6 text-gray-700">
          In einer Zeit, in der viele Anleger unsicher waren, erkannte Crenshaw die Zeichen der Zeit. Er investierte gezielt in Energieunternehmen wie ConocoPhillips und Chevron Corporation, bevor der Energiesektor einen beispiellosen Aufschwung erlebte.
        </p>

        <p className="mb-6 text-gray-700">
          Seine Weitsicht und sein Gespür für Markttrends führten zu erheblichen Renditen. Doch was machte seine Strategie so erfolgreich, und wie können Sie davon profitieren?
        </p>

        {/* Trade Analysis Box */}
        <div className="bg-navy-50 p-8 rounded-2xl my-12">
          <h3 className="text-2xl font-bold text-navy-900 mb-6">Ein Blick auf Crenshaws Investitionen:</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-start gap-3">
                <DollarSign className="h-8 w-8 text-gold-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-lg mb-3">ConocoPhillips</h4>
                  <div className="space-y-2 text-gray-700">
                    <p>Investitionszeitpunkt: <span className="font-semibold">Januar 2022</span></p>
                    <p>Investitionsbetrag: <span className="font-semibold">$50.000</span></p>
                    <p>Strategie: <span className="font-semibold">Früher Einstieg vor Marktanstieg</span></p>
                    <p>Erzielte Rendite: <span className="font-semibold">+65% in 6 Monaten</span></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-start gap-3">
                <DollarSign className="h-8 w-8 text-gold-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-lg mb-3">Chevron Corporation</h4>
                  <div className="space-y-2 text-gray-700">
                    <p>Investitionszeitpunkt: <span className="font-semibold">März 2022</span></p>
                    <p>Investitionsbetrag: <span className="font-semibold">$30.000</span></p>
                    <p>Strategie: <span className="font-semibold">Diversifikation im Energiesektor</span></p>
                    <p>Erzielte Rendite: <span className="font-semibold">+40% in 4 Monaten</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-6 text-gray-700 leading-relaxed">
            Diese Zahlen sprechen für sich. Doch wie können Sie solche Chancen erkennen und nutzen?
          </p>
        </div>

        <p className="mb-6 text-gray-700">
          Die Finanzmärkte bieten ständig Möglichkeiten, aber oft fehlen die richtigen Informationen oder das nötige Fachwissen, um diese zu nutzen. Genau hier setzen wir an.
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

        <h2 className="text-3xl font-bold text-navy-900 mb-6">Ihr Weg zu besseren Investmententscheidungen</h2>

        <p className="mb-6 text-gray-700">
          Stellen Sie sich vor, Sie hätten einen erfahrenen Partner an Ihrer Seite, der Ihnen hilft, die Märkte zu verstehen und fundierte Entscheidungen zu treffen. Jemand, der die Strategien erfolgreicher Investoren analysiert und Ihnen zeigt, wie Sie diese für sich nutzen können.
        </p>

        {/* Success Stories */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 my-12">
          <h3 className="text-2xl font-bold text-green-800 mb-6">Erfolgsgeschichten unserer Klienten:</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Peter M."
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <p className="font-bold text-lg">Peter M.</p>
                  <p className="text-gray-600">Ingenieur aus München</p>
                  <p className="text-green-600 font-bold text-lg mt-1">+35% Rendite in 6 Monaten</p>
                  <p className="text-gray-600 mt-2">
                    "Die Beratung von CongressTrade hat mir geholfen, meine Investitionen gezielt zu verbessern."
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1598550874175-4d0ef436c909?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Maria L."
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <p className="font-bold text-lg">Maria L.</p>
                  <p className="text-gray-600">Ärztin aus Berlin</p>
                  <p className="text-green-600 font-bold text-lg mt-1">+28% Portfoliozuwachs</p>
                  <p className="text-gray-600 mt-2">
                    "Dank CongressTrade fühle ich mich bei meinen finanziellen Entscheidungen sicherer."
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-6 text-gray-700 leading-relaxed">
            Diese Menschen haben den ersten Schritt gemacht. Wann sind Sie dran?
          </p>
        </div>

        {/* Our Approach */}
        <h2 className="text-3xl font-bold text-navy-900 mb-6">Unsere Herangehensweise: Individuell und fundiert</h2>

        <p className="mb-6 text-gray-700">
          Bei CongressTrade glauben wir daran, dass jeder Anleger einzigartig ist. Deshalb bieten wir maßgeschneiderte Beratung, die auf Ihre persönlichen Ziele und Bedürfnisse zugeschnitten ist.
        </p>

        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <Shield className="h-8 w-8 text-gold-500 mb-4" />
            <h4 className="font-bold text-lg mb-2">Vertrauensvolle Beratung</h4>
            <p className="text-gray-600">
              Unsere Experten stehen Ihnen mit Rat und Tat zur Seite.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <LineChart className="h-8 w-8 text-gold-500 mb-4" />
            <h4 className="font-bold text-lg mb-2">Marktanalyse</h4>
            <p className="text-gray-600">
              Wir identifizieren Trends und Chancen für Ihr Portfolio.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <DollarSign className="h-8 w-8 text-gold-500 mb-4" />
            <h4 className="font-bold text-lg mb-2">Nachhaltiger Erfolg</h4>
            <p className="text-gray-600">
              Langfristige Strategien für Ihren finanziellen Wohlstand.
            </p>
          </div>
        </div>

        <p className="mb-6 text-gray-700">
          Wir möchten, dass Sie sich bei Ihren finanziellen Entscheidungen sicher fühlen und Ihre Ziele erreichen.
        </p>

        {/* Final CTA */}
        <div className="bg-navy-900 text-white p-8 rounded-2xl my-12">
          <h3 className="text-2xl font-bold mb-6">Ihr nächster Schritt zu finanzieller Sicherheit</h3>
          <p className="text-lg mb-8 text-gray-200">
            Warum noch zögern? Vereinbaren Sie jetzt ein unverbindliches Beratungsgespräch und entdecken Sie, wie wir Sie auf Ihrem Weg zum finanziellen Erfolg unterstützen können.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <button
              onClick={onConsultation}
              className="flex items-center justify-center bg-gold-500 text-navy-900 px-8 py-4 rounded-xl text-lg font-bold hover:bg-gold-600 transition-colors group"
            >
              Beratungsgespräch vereinbaren
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center text-gold-500">
              <Users className="h-6 w-6 mr-2" />
              <span>Mehr als 5.000 zufriedene Klienten</span>
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            * Wir freuen uns darauf, Sie kennenzulernen.
          </p>
        </div>
      </div>
    </article>
  );
};
