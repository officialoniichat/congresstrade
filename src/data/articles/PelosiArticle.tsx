import React from 'react';
import { TrendingUp, ArrowRight, Shield, DollarSign, Users, LineChart, Clock, Star, Zap } from 'lucide-react';
import { ArticleHeader } from './HeaderPelosi';

interface ArticleProps {
  onConsultation: () => void;
}

export const PelosiArticle: React.FC<ArticleProps> = ({ onConsultation }) => {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <ArticleHeader 
        title="Enthüllt: Wie Nancy Pelosi mit erfolgreichen Trades in 24 Monaten Millionen verdiente"
        author="Thomas Weber"
        image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      />

      <figure className="mb-12">
        <img
          src="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          alt="US Capitol Building"
          className="w-full rounded-2xl shadow-lg"
        />
        <figcaption className="text-sm text-gray-500 mt-3 text-center italic">
          Das US-Capitol: Hier werden Entscheidungen getroffen, die die Märkte beeinflussen
        </figcaption>
      </figure>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl sm:text-2xl font-semibold text-navy-900 leading-relaxed mb-8">
          Wussten Sie, dass Nancy Pelosi, die ehemalige Sprecherin des US-Repräsentantenhauses, in nur 24 Monaten Millionen durch geschickte Investitionen verdient hat? Stellen Sie sich vor, auch Sie könnten von solchen Strategien profitieren und Ihr Vermögen nachhaltig steigern.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          Ihre Investmententscheidungen haben bei vielen Anlegern Aufmerksamkeit erregt. Während die durchschnittliche Rendite des S&P 500 bei etwa 8,5% liegt, erzielte Pelosis Portfolio Berichten zufolge deutlich höhere Gewinne. Doch was wäre, wenn auch Sie Zugang zu ähnlichen Strategien hätten und Ihr Portfolio optimieren könnten?
        </p>

        <h2 className="text-3xl font-bold text-navy-900 mb-6">Der NVIDIA-Deal: Ein strategischer Schachzug</h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          Im Juni 2021 wurde bekannt, dass Paul Pelosi, Ehemann von Nancy Pelosi, Aktienoptionen von NVIDIA im Wert von mehreren Millionen Dollar erworben hatte. NVIDIA, ein führender Hersteller von Grafikprozessoren und Chips, stand zu dieser Zeit im Fokus vieler Investoren aufgrund der steigenden Nachfrage nach Halbleitern.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          Kurz darauf wurde der CHIPS and Science Act im Kongress diskutiert, ein Gesetz, das Milliarden in die US-Halbleiterindustrie investieren sollte. Die Verabschiedung dieses Gesetzes hatte erhebliche positive Auswirkungen auf Unternehmen wie NVIDIA. Zufall oder kalkulierte Strategie?
        </p>

        {/* Trade Analysis Box */}
        <div className="bg-navy-50 p-8 rounded-2xl my-12">
          <h3 className="text-2xl font-bold text-navy-900 mb-6">Pelosis Investitionen im Detail:</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-start gap-3">
                <DollarSign className="h-8 w-8 text-gold-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-lg mb-3">NVIDIA (Juni 2021)</h4>
                  <div className="space-y-2 text-gray-700">
                    <p>Investitionszeitpunkt: <span className="font-semibold">17. Juni 2021</span></p>
                    <p>Art der Investition: <span className="font-semibold">Kauf von Aktienoptionen</span></p>
                    <p>Wert der Investition: <span className="font-semibold">Ungefähr $5 Millionen</span></p>
                    <p>Strategie: <span className="font-semibold">Langfristige Positionierung im Technologiesektor</span></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-start gap-3">
                <DollarSign className="h-8 w-8 text-gold-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-lg mb-3">Microsoft (März 2020)</h4>
                  <div className="space-y-2 text-gray-700">
                    <p>Investitionszeitpunkt: <span className="font-semibold">19. März 2020</span></p>
                    <p>Art der Investition: <span className="font-semibold">Kauf von Aktien</span></p>
                    <p>Wert der Investition: <span className="font-semibold">Ungefähr $1 Million</span></p>
                    <p>Strategie: <span className="font-semibold">Einstieg während des Marktabschwungs</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed mt-6">
            Diese gezielten Investments führten zu erheblichen Gewinnen. Stellen Sie sich vor, Sie hätten diese Informationen rechtzeitig gehabt – welche Auswirkungen hätte das auf Ihr Portfolio?
          </p>
        </div>

        <p className="text-gray-700 leading-relaxed mb-6">
          Die Investition in Microsoft erfolgte zu einem Zeitpunkt, als die Aktienmärkte aufgrund der COVID-19-Pandemie eingebrochen waren, was sich als hervorragender Einstiegspunkt erwies. Solche Chancen ergeben sich nicht oft, aber wenn sie kommen, sind sie meist von kurzer Dauer.
        </p>

        {/* Expert Quote */}
        <blockquote className="border-l-4 border-gold-500 pl-8 my-12">
          <p className="text-2xl font-semibold text-navy-900 leading-relaxed">
            "Pelosis Investmententscheidungen zeigen ein tiefes Verständnis für Markttrends und die Fähigkeit, Chancen frühzeitig zu erkennen. Genau dieses Wissen kann den Unterschied zwischen durchschnittlichen und außergewöhnlichen Renditen ausmachen."
          </p>
          <footer className="text-gray-500 mt-4">
            <strong>Dr. Markus Schmidt</strong>
            <br />Finanzanalyst und Autor
          </footer>
        </blockquote>

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

        <h2 className="text-3xl font-bold text-navy-900 mb-6">Die Debatte um Politiker und Aktienhandel</h2>

        <p className="text-gray-700 leading-relaxed mb-6">
          Der Handel von Aktien durch Politiker und ihre Familienmitglieder ist seit langem Gegenstand von Diskussionen. Kritiker argumentieren, dass der Zugang zu nicht öffentlichen Informationen zu unfairen Vorteilen führen kann. Doch unabhängig von dieser Debatte bleibt eine Tatsache bestehen: Wer die richtigen Informationen zur richtigen Zeit hat, kann erhebliche Vorteile am Markt erzielen.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          Im Jahr 2012 wurde der STOCK Act (Stop Trading on Congressional Knowledge Act) verabschiedet, um Insiderhandel durch Mitglieder des Kongresses zu verhindern. Trotz dieser Maßnahmen nutzen viele weiterhin öffentlich zugängliche Informationen, um fundierte Investmententscheidungen zu treffen. Warum sollten nicht auch Sie davon profitieren?
        </p>

        {/* Results Box */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 my-12">
          <h3 className="text-2xl font-bold text-green-800 mb-6">Erfolge unserer Nutzer mit ähnlichen Strategien:</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Michael B."
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <p className="font-bold text-lg">Michael B.</p>
                  <p className="text-gray-600">Lehrer aus Hamburg</p>
                  <p className="text-green-600 font-bold text-lg mt-1">+27,4% in 3 Monaten</p>
                  <p className="text-gray-600 mt-2">
                    "Dank der Einblicke von CongressTrade habe ich meine Investmentstrategie optimiert und beeindruckende Ergebnisse erzielt."
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Sandra K."
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <p className="font-bold text-lg">Sandra K.</p>
                  <p className="text-gray-600">Bürokauffrau aus Frankfurt</p>
                  <p className="text-green-600 font-bold text-lg mt-1">+31,8% in 4 Monaten</p>
                  <p className="text-gray-600 mt-2">
                    "Die Strategien von CongressTrade haben mir geholfen, Marktchancen frühzeitig zu erkennen und zu nutzen."
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed mt-6">
            Diese Erfolgsgeschichten könnten auch Ihre sein. Mit der richtigen Unterstützung ist mehr finanzieller Erfolg möglich, als Sie vielleicht denken.
          </p>
        </div>

        <h2 className="text-3xl font-bold text-navy-900 mb-6">Die CongressTrade-Strategie: Chancen erkennen und nutzen</h2>

        <p className="text-gray-700 leading-relaxed mb-6">
          Die CongressTrade-Plattform bietet Ihnen die einzigartige Möglichkeit, die Handelsaktivitäten von Politikern zu verfolgen und daraus wertvolle Erkenntnisse für Ihre eigenen Investments zu gewinnen. Durch modernste Datenanalyse und Marktbeobachtung identifizieren wir Trends, bevor sie öffentlich bekannt werden.
        </p>

        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <Shield className="h-8 w-8 text-gold-500 mb-4" />
            <h4 className="font-bold text-lg mb-2">Exklusive Einblicke</h4>
            <p className="text-gray-600">Verstehen Sie, wohin die Marktführer investieren</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <LineChart className="h-8 w-8 text-gold-500 mb-4" />
            <h4 className="font-bold text-lg mb-2">Fundierte Analysen</h4>
            <p className="text-gray-600">Erhalten Sie professionelle Bewertungen zu potenziellen Marktbewegungen</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <Clock className="h-8 w-8 text-gold-500 mb-4" />
            <h4 className="font-bold text-lg mb-2">Rechtzeitige Informationen</h4>
            <p className="text-gray-600">Nutzen Sie den entscheidenden Vorteil des richtigen Timings</p>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-6">
          Mit CongressTrade sind Sie den Märkten immer einen Schritt voraus. Entdecken Sie Potenziale, die anderen verborgen bleiben, und maximieren Sie Ihre Rendite.
        </p>

        {/* Regulatory Section */}
        <h2 className="text-3xl font-bold text-navy-900 mb-6">Regulatorische Aspekte und Ethik</h2>

        <p className="text-gray-700 leading-relaxed mb-6">
          Es ist uns wichtig, dass alle Investitionen im Einklang mit geltenden Gesetzen und ethischen Standards stehen. Wir nutzen ausschließlich öffentlich zugängliche Informationen und fördern transparente Investmentpraktiken. Ihr Erfolg basiert auf fundierten Entscheidungen und nicht auf Insiderwissen.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          Denken Sie daran: Jede Investition birgt Risiken. Mit der richtigen Strategie und Unterstützung können Sie diese jedoch effektiv managen und Ihr Portfolio nachhaltig stärken.
        </p>

        {/* Final CTA */}
        <div className="bg-navy-900 text-white p-8 rounded-2xl my-12">
          <h3 className="text-2xl font-bold mb-6">Machen Sie den ersten Schritt zu höheren Renditen</h3>
          <p className="text-lg mb-8 text-gray-200">
            Nutzen Sie die Chance, von exklusiven Einblicken und professioneller Beratung zu profitieren. Vereinbaren Sie jetzt ein unverbindliches Gespräch mit unseren Experten und entdecken Sie, wie auch Sie Ihr Investmentpotenzial voll ausschöpfen können.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <button
              onClick={onConsultation}
              className="flex items-center justify-center bg-gold-500 text-navy-900 px-8 py-4 rounded-xl text-lg font-bold hover:bg-gold-600 transition-colors group"
            >
              Jetzt kostenloses Beratungsgespräch sichern
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center text-gold-500">
              <Users className="h-6 w-6 mr-2" />
              <span>Über 5.000 zufriedene Nutzer</span>
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            * Begrenzte Plätze verfügbar. Handeln Sie jetzt, um Ihren Platz zu sichern.
          </p>
        </div>
      </div>
    </article>
  );
};
