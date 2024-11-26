import React from 'react';
import TradeHighlights from './TradeHighlights';
import CallToAction from './CallToAction';

interface ArticleContentProps {
  onConsultation: () => void;
}

export default function ArticleContent({ onConsultation }: ArticleContentProps) {
  return (
    <div className="space-y-6 text-gray-700">
      <p className="text-xl font-semibold text-navy-900">
        Eine exklusive SPIEGEL-Analyse zeigt: Nancy Pelosis Aktiengeschäfte erzielten eine durchschnittliche Rendite von 69,3% - deutlich über dem Marktdurchschnitt von 7,8%.
      </p>

      <p>
        Es war ein gewöhnlicher Handelstag im Juni 2021, als Paul Pelosi, Ehemann der damaligen Speakerin des Repräsentantenhauses, Kaufoptionen auf NVIDIA-Aktien im Wert von bis zu 5 Millionen Dollar erwarb. Nur wenige Wochen später verabschiedete der Kongress ein Gesetz zur Förderung der Halbleiterindustrie. Der Aktienkurs explodierte, die Pelosis verzeichneten einen Gewinn von über 300%.
      </p>

      <TradeHighlights />

      <p>
        "Das ist kein Zufall", erklärt Börsenexperte Dr. Michael Schmidt. "Die Trades der Kongressmitglieder erfolgen oft kurz vor wichtigen Gesetzesänderungen oder Regierungsaufträgen. Das ist Wissen, das dem normalen Anleger nicht zur Verfügung steht."
      </p>

      <p>
        Eine Analyse von über 3.500 Trades von Kongressmitgliedern durch die Columbia University ergab: Politiker erzielen im Durchschnitt eine 25,4% höhere Rendite als der Markt.
      </p>

      <CallToAction onConsultation={onConsultation} />

      <p>
        Die Debatte um Insiderhandel im Kongress ist nicht neu. Ein Gesetz von 2012 sollte mehr Transparenz schaffen. Doch die Realität zeigt: Die überragenden Renditen der Politiker gehen weiter - und werden sogar noch besser.
      </p>

      <p>
        "Was wir hier sehen, ist ein systematischer Informationsvorsprung", sagt Finanzexperte Thomas Müller. "Die Frage ist nicht, ob diese Informationen einen Handelsvorteil bieten, sondern wie groß er ist."
      </p>

      <div className="border-l-4 border-gold-500 pl-6 my-8">
        <p className="text-xl font-semibold text-navy-900">
          "Wenn Sie die gleichen Trades wie Nancy Pelosi machen könnten - würden Sie es nicht tun? Die Daten sprechen für sich."
        </p>
        <p className="text-gray-500 mt-2">- Dr. Michael Schmidt, Börsenexperte</p>
      </div>

      <p>
        Die Zahlen sind beeindruckend: Während der durchschnittliche S&P 500 ETF-Anleger in den letzten 5 Jahren eine Rendite von 45% erzielte, kamen die Top-Performer im Kongress auf über 250%.
      </p>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <button
          onClick={onConsultation}
          className="w-full flex items-center justify-center bg-navy-900 text-white px-8 py-4 rounded-xl text-xl font-bold hover:bg-navy-800 transition-colors group"
        >
          Erfahren Sie mehr über die Pelosi-Strategie
          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}