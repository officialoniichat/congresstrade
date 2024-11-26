import React from 'react';
import { ArrowRight, DollarSign, Users, Shield, LineChart, Zap } from 'lucide-react';
import { ArticleHeader } from './HeaderPerdue';

interface ArticleProps {
  onConsultation: () => void;
}

export const PerdueArticle: React.FC<ArticleProps> = ({ onConsultation }) => {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <ArticleHeader 
        title="David Perdue: Der Trading-Senator mit über 2.600 Trades in sechs Jahren"
        author="Marcus Schmidt"
        image="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      />

      <figure className="mb-12">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          alt="Modern office buildings"
          className="w-full rounded-2xl shadow-lg"
        />
        <figcaption className="text-sm text-gray-500 mt-3 text-center italic">
          Wall Street: Wo Politik und Finanzmärkte aufeinandertreffen
        </figcaption>
      </figure>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl sm:text-2xl font-semibold text-navy-900 leading-relaxed mb-8">
         Haben Sie gewusst, dass einige US-Senatoren während ihrer Amtszeit durch gezielte Aktiengeschäfte erhebliche Gewinne erzielt haben? Ein bemerkenswertes Beispiel ist der republikanische Senator David Perdue aus Georgia.
        </p>

        <p className="mb-6 text-gray-700">
Eine Analyse der New York Times enthüllte das Ausmaß seines Handels und wirft neue ethische Fragen auf.

Seit seinem Amtsantritt im Jahr 2014 hat Perdue fast ein Drittel aller gemeldeten Aktiengeschäfte im Senat getätigt. In sechs Jahren führte er rund 2.600 Transaktionen mit Aktien, Anleihen und Fonds durch. Das entspricht dem kombinierten Handelsvolumen der nächsten fünf aktivsten Senatoren. Obwohl es keine Beweise dafür gibt, dass Perdue auf der Grundlage nicht öffentlicher Informationen gehandelt hat, stellt sich die Frage nach der Ethik, wenn ein Senator in Bereichen handelt, über die er gesetzlich entscheidet.

Zum Beispiel handelte er fast 30 Mal mit Aktien eines Cybersicherheitsunternehmens, während er im Senatsausschuss für Cybersicherheit tätig war. Dieses Unternehmen erhielt einen Vertrag über 30 Millionen Dollar in seinem Heimatstaat Georgia. Zudem kaufte und verkaufte er Aktien von Unternehmen wie JPMorgan Chase und Bank of America, während er Mitglied des Unterausschusses für Banken, Wohnungswesen und städtische Angelegenheiten war.
        </p>

        {/* Trade Analysis Box */}
        <div className="bg-navy-50 p-8 rounded-2xl my-12">
          <h3 className="text-2xl font-bold text-navy-900 mb-6">Perdues bemerkenswerte Trades:</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-start gap-3">
                <DollarSign className="h-8 w-8 text-gold-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-lg mb-3">Cybersicherheits-Trades</h4>
                  <div className="space-y-2 text-gray-700">
                    <p>Anzahl der Trades: <span className="font-semibold">30+</span></p>
                    <p>Timing: <span className="font-semibold">Während Senatsausschuss-Mitgliedschaft</span></p>
                    <p>Besonderheit: <span className="font-semibold">$30M Vertrag in Georgia</span></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-start gap-3">
                <DollarSign className="h-8 w-8 text-gold-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-lg mb-3">Banken-Investments</h4>
                  <div className="space-y-2 text-gray-700">
                    <p>Fokus: <span className="font-semibold">JPMorgan & Bank of America</span></p>
                    <p>Position: <span className="font-semibold">Mitglied Bankenausschuss</span></p>
                    <p>Strategie: <span className="font-semibold">Gezielte Branchenauswahl</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mb-6 text-gray-700">
Perdue wurde zusammen mit einigen anderen Gesetzgebern beschuldigt, Informationen aus Senatssitzungen für ihre finanziellen Entscheidungen genutzt zu haben. Ein besonders auffälliger Fall betrifft den Kauf von Aktien eines Herstellers medizinischer Geräte am selben Tag, an dem Senatoren eine vertrauliche Unterrichtung über das Coronavirus erhielten. Perdue bestreitet jedoch, an dieser Sitzung teilgenommen zu haben. Im Februar, kurz bevor Pfizer seine Absicht bekannt gab, einen COVID-19-Impfstoff zu entwickeln, erwarb er Aktien des Pharmariesen im Wert von 245.000 Dollar. Gleichzeitig verkaufte er Aktien von Caesar Entertainment im Wert von bis zu 165.000 Dollar, kurz bevor der Shutdown und der wirtschaftliche Einbruch eintraten.</p>
        <p className="mb-6 text-gray-700">
          The Daily Beast, berichtete dass Perdue im Jahr 2017 Aktien eines Zahlungsabwicklungsunternehmens erwarb, nur zwei Wochen nachdem er Regulierungen für Prepaid-Debitkarten gelockert hatte. Im November enthüllte derselbe Bericht, dass Perdue begann, Aktien eines Unternehmens zu kaufen, das U-Boot-Teile herstellt – genau zu dem Zeitpunkt, als er den Vorsitz eines Unterausschusses übernahm, der die Ausgaben der Marine überwacht. Nachdem er im Januar 2019 diesen Vorsitz übernommen hatte, verkaufte er die Aktien mit einem Gewinn von mehreren Zehntausend Dollar, nachdem er an einem Gesetz gearbeitet hatte, das die Marine verpflichtete, spezialisierte Produkte von diesem Unternehmen zu erwerben.
        </p>
                <p className="mb-6 text-gray-700">
       Der Handel von Aktien durch Politiker und ihre Familienmitglieder ist seit langem Gegenstand von Diskussionen. Kritiker argumentieren, dass der Zugang zu nicht öffentlichen Informationen zu unfairen Vorteilen führen kann. Im Jahr 2012 wurde daher der STOCK Act (Stop Trading on Congressional Knowledge Act) verabschiedet, um Insiderhandel durch Kongressmitglieder zu verhindern. Dennoch nutzen viele weiterhin öffentlich zugängliche Informationen für ihre Investmententscheidungen. Warum sollten nicht auch Sie davon profitieren?
        </p>
                <h2 className="text-3xl font-bold text-navy-900 mb-6">Die Macht der Informationen</h2>

        <p className="mb-6 text-gray-700">
          In der Finanzwelt ist Wissen der Schlüssel zum Erfolg. Politiker haben oft Zugang zu Informationen, die noch nicht breit verfügbar sind. Indem Sie ihre Handelsaktivitäten beobachten, können Sie frühzeitig auf potenzielle Marktbewegungen reagieren. Hierbei kommt <strong>Congress Trade</strong> ins Spiel:
        </p>

        {/* Mid-Article CTA */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 p-8 rounded-2xl my-12">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="h-8 w-8 text-blue-600" />
            <h3 className="text-2xl font-bold text-blue-900">Ihre Vorteile mit CongressTrade</h3>
          </div>
          <p className="text-lg text-blue-800 mb-6">
            Stellen Sie sich vor, Sie könnten die Handelsaktivitäten von Politikern in Echtzeit verfolgen und daraus wertvolle Investmentstrategien ableiten. Mit CongressTrade erhalten Sie genau diese Möglichkeit.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-blue-700">
                <Shield className="h-5 w-5" />
                <span>Exklusive Einblicke in Handelsmuster</span>
              </div>
              <div className="flex items-center gap-2 text-blue-700">
                <LineChart className="h-5 w-5" />
                <span>Datengetriebene Strategien</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-blue-700">
                <Users className="h-5 w-5" />
                <span>Regularien entsprechend</span>
              </div>
              <div className="flex items-center gap-2 text-blue-700">
                <DollarSign className="h-5 w-5" />
                <span>Wettbewerbsvorteil durch Analyse</span>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <button
              onClick={onConsultation}
              className="flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-blue-700 transition-colors group shadow-lg"
            >
              Jetzt Beratungsgespräch vereinbaren
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

                <h2 className="text-3xl font-bold text-navy-900 mb-6">Die CongressTrade-Strategie: Nutzen Sie Insider-Wissen Regularien entsprechend</h2>

        <p className="mb-6 text-gray-700">
         Stellen Sie sich vor, Sie könnten die Handelsaktivitäten von Politikern verfolgen und daraus wertvolle Erkenntnisse für Ihre eigenen Investments gewinnen. Mit der CongressTrade-Plattform bieten wir Ihnen genau diese Möglichkeit. Durch modernste Datenanalyse und Marktbeobachtung identifizieren wir Trends, bevor sie allgemein bekannt werden.

Mit CongressTrade sind Sie den Märkten immer einen Schritt voraus. Entdecken Sie Potenziale, die anderen verborgen bleiben, und maximieren Sie Ihre Rendite durch fundierte Entscheidungen.
        </p>

        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <Shield className="h-8 w-8 text-gold-500 mb-4" />
            <h4 className="font-bold text-lg mb-2">Transparenz</h4>
            <p className="text-gray-600">Alle Trades werden öffentlich dokumentiert</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <LineChart className="h-8 w-8 text-gold-500 mb-4" />
            <h4 className="font-bold text-lg mb-2">Analyse</h4>
            <p className="text-gray-600">Professionelle Auswertung aller Daten</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <DollarSign className="h-8 w-8 text-gold-500 mb-4" />
            <h4 className="font-bold text-lg mb-2">Rendite</h4>
            <p className="text-gray-600">Optimierte Investmentstrategien</p>
          </div>
        </div>

                        <h2 className="text-3xl font-bold text-navy-900 mb-6">Regulatorische Aspekte und Ethik</h2>

        <p className="mb-6 text-gray-700">
Es ist uns wichtig, dass alle Investitionen im Einklang mit geltenden Gesetzen und ethischen Standards stehen. Wir verwenden ausschließlich öffentlich zugängliche Informationen und fördern transparente Investmentpraktiken. Ihr Erfolg basiert auf fundierten Analysen und nicht auf Insiderwissen.

Denken Sie daran: Jede Investition birgt Risiken. Mit der richtigen Strategie und Unterstützung können Sie diese jedoch effektiv managen und Ihr Portfolio nachhaltig stärken.
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

        
                        <h2 className="text-3xl font-bold text-navy-900 mb-6">Werden Sie jetzt Teil von CongressTrade</h2>
        <p className="mb-6 text-gray-700">
Diese Erfolgsgeschichten könnten auch Ihre sein. Mit der richtigen Unterstützung ist mehr finanzieller Erfolg möglich, als Sie vielleicht denken. Nutzen Sie die Chance, von Erkenntnissen zu profitieren, die sonst nur wenigen vorbehalten sind. Werden Sie jetzt Kunde bei CongressTrade und sichern Sie sich Ihren Vorsprung am Markt.
        </p>
        
        {/* Final CTA */}
        <div className="bg-navy-900 text-white p-8 rounded-2xl my-12">
          <h3 className="text-2xl font-bold mb-6">Starten Sie jetzt mit CongressTrade</h3>
          <p className="text-lg mb-8 text-gray-200">
            Verpassen Sie nicht die Gelegenheit, von exklusiven Einblicken in den Aktienmarkt zu profitieren. Beginnen Sie noch heute Ihre Reise zu finanzieller Exzellenz.
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
              <span>5.000+ zufriedene Nutzer</span>
            </div>
          </div>
        </div>

      
      </div>
    </article>
  );
};