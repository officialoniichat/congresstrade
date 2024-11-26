import React, { useState } from 'react';
import { TrendingUp, ArrowRight, Shield, DollarSign, Users, LineChart, Clock, Star } from 'lucide-react';
import ConsultationForm from '../components/ConsultationForm';
import FomoDisclaimer from '../components/FomoDisclaimer';

export default function ArticlePage() {
  const [showConsultation, setShowConsultation] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <a href="/" className="flex items-center">
            <div className="bg-navy-900 p-1.5 rounded-lg">
              <TrendingUp className="h-6 w-6 text-gold-500" />
            </div>
            <span className="ml-2 text-xl font-bold text-navy-900">CongressTrade</span>
          </a>
          <button
            onClick={() => setShowConsultation(true)}
            className="bg-navy-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-navy-800 transition-colors flex items-center"
          >
            Jetzt beraten lassen
            <ArrowRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        <article className="max-w-3xl mx-auto px-4 py-12">
          {/* Article Header */}
          <header className="mb-12">
            {/* Publisher Info */}
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-6">
              <div className="flex items-center">
                <div className="bg-navy-900 p-1 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-gold-500" />
                </div>
                <span className="ml-1.5 font-semibold">CongressTrade</span>
              </div>
              <span>•</span>
              <span>Exklusive Analyse</span>
              <span>•</span>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>12 Min. Lesezeit</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl font-bold text-navy-900 mb-6 leading-tight">
              Enthüllt: Wie Nancy Pelosi mit Insider-Trades in 24 Monaten ein Vermögen von $12.8 Millionen aufbaute
            </h1>

            {/* Author Info */}
            <div className="flex items-center gap-4 mb-8">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Thomas Weber"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold text-navy-900">Von Thomas Weber</p>
                <p className="text-sm text-gray-500">Finanzanalyst & Investigativ-Journalist</p>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-gold-500 fill-gold-500" />
                  ))}
                  <span className="text-sm text-gray-500 ml-2">138 Analysen</span>
                </div>
              </div>
            </div>

            <FomoDisclaimer className="mb-8" />
          </header>

          {/* Hero Image */}
          <figure className="mb-12">
            <img
              src="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
              alt="US Capitol Building"
              className="w-full rounded-2xl shadow-lg"
            />
            <figcaption className="text-sm text-gray-500 mt-3 text-center italic">
              Das US-Capitol: Hier werden die Entscheidungen getroffen, die Milliarden bewegen
            </figcaption>
          </figure>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {/* Lead Paragraph */}
            <p className="text-xl sm:text-2xl font-semibold text-navy-900 leading-relaxed mb-8">
              Eine exklusive CongressTrade-Analyse deckt auf: Nancy Pelosis Aktiengeschäfte erzielten eine 
              durchschnittliche Rendite von 69,3% - mehr als achtmal höher als der Marktdurchschnitt von 8,5%.
            </p>

            <h2 className="text-3xl font-bold text-navy-900 mb-6">Der NVIDIA-Coup: Wie Pelosi $5.2 Millionen in 67 Tagen verdiente</h2>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              Am 17. Juni 2021 erwarb Paul Pelosi, Ehemann der damaligen Speakerin des Repräsentantenhauses, 
              Kaufoptionen auf NVIDIA-Aktien im Wert von $5 Millionen. Was die Öffentlichkeit zu diesem Zeitpunkt 
              nicht wusste: Der Kongress stand kurz vor der Verabschiedung des CHIPS Act - einem Gesetzespaket, 
              das die amerikanische Halbleiterindustrie mit $52 Milliarden fördern würde.
            </p>

            {/* Trade Analysis Box */}
            <div className="bg-navy-50 p-8 rounded-2xl my-12">
              <h3 className="text-2xl font-bold text-navy-900 mb-6">Die Pelosi-Strategie im Detail:</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-start gap-3">
                    <DollarSign className="h-8 w-8 text-gold-500 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-lg mb-3">NVIDIA (Juni 2021)</h4>
                      <div className="space-y-2 text-gray-700">
                        <p>Einstieg: <span className="font-semibold">$146.24</span></p>
                        <p>Ausstieg: <span className="font-semibold">$453.12</span></p>
                        <p className="text-green-600 font-bold">+312% in 67 Tagen</p>
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
                        <p>Einstieg: <span className="font-semibold">$132.69</span></p>
                        <p>Ausstieg: <span className="font-semibold">$402.18</span></p>
                        <p className="text-green-600 font-bold">+203% in 94 Tagen</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">
              "Diese Performance ist kein Zufall", erklärt Börsenexperte Dr. Michael Schmidt. "Die zeitliche 
              Abstimmung der Trades mit wichtigen Gesetzesänderungen oder Regierungsaufträgen ist bemerkenswert 
              präzise. Das ist ein Informationsvorsprung, den normale Anleger nicht haben."
            </p>

            {/* CTA Box */}
            <div className="bg-navy-900 text-white p-8 rounded-2xl my-12">
              <h3 className="text-2xl font-bold mb-6">EXKLUSIV: Die Pelosi-Strategie für Privatanleger</h3>
              <p className="text-lg mb-8 text-gray-200">
                Durch modernste KI-Technologie und Echtzeitanalyse können nun auch Privatanleger von diesem 
                Insider-Wissen profitieren. Die CongressTrade-Plattform macht's möglich.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <button
                  onClick={() => setShowConsultation(true)}
                  className="flex items-center justify-center bg-gold-500 text-navy-900 px-8 py-4 rounded-xl text-lg font-bold hover:bg-gold-600 transition-colors group"
                >
                  Einen der 7 verfügbaren Plätze sichern
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center text-gold-500">
                  <Users className="h-6 w-6 mr-2" />
                  <span>5.000+ aktive Nutzer</span>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-navy-900 mb-6">Die Wissenschaft bestätigt den Vorsprung</h2>

            <p className="text-gray-700 leading-relaxed">
              Eine aktuelle Studie der Columbia University analysierte über 3.500 Trades von Kongressmitgliedern. 
              Das Ergebnis: Politiker erzielen im Durchschnitt eine 25,4% höhere Rendite als der Markt.
            </p>

            {/* Expert Quote */}
            <blockquote className="border-l-4 border-gold-500 pl-8 my-12">
              <p className="text-2xl font-semibold text-navy-900 leading-relaxed">
                "Die Daten sind eindeutig: Wer die Trades der Kongressmitglieder nachbildet, hat einen 
                signifikanten Vorteil gegenüber klassischen Anlagestrategien."
              </p>
              <footer className="text-gray-500 mt-4">
                <strong>Prof. Dr. James Miller</strong>
                <br />Columbia University
              </footer>
            </blockquote>

            {/* Results Box */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 my-12">
              <h3 className="text-2xl font-bold text-green-800 mb-6">Verifizierte Ergebnisse unserer Nutzer:</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center gap-4">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="Michael B."
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <p className="font-bold text-lg">Michael B.</p>
                      <p className="text-gray-600">Lehrer</p>
                      <p className="text-green-600 font-bold text-lg mt-1">+27.4% in 3 Monaten</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center gap-4">
                    <img
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="Sandra K."
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <p className="font-bold text-lg">Sandra K.</p>
                      <p className="text-gray-600">Bürokauffrau</p>
                      <p className="text-green-600 font-bold text-lg mt-1">+31.8% in 4 Monaten</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-navy-900 mb-6">So funktioniert die CongressTrade-Strategie</h2>

            <p className="text-gray-700 leading-relaxed mb-8">
              Die Plattform analysiert in Echtzeit sämtliche Handelsmeldungen von Kongressmitgliedern und 
              identifiziert die vielversprechendsten Opportunities. Dabei werden verschiedene Faktoren berücksichtigt:
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <Shield className="h-8 w-8 text-gold-500 mb-4" />
                <h4 className="font-bold text-lg mb-2">Historische Performance</h4>
                <p className="text-gray-600">Analyse der Erfolgsquote einzelner Kongressmitglieder</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <LineChart className="h-8 w-8 text-gold-500 mb-4" />
                <h4 className="font-bold text-lg mb-2">Markt-Timing</h4>
                <p className="text-gray-600">Optimaler Zeitpunkt für Ein- und Ausstieg</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <DollarSign className="h-8 w-8 text-gold-500 mb-4" />
                <h4 className="font-bold text-lg mb-2">Strategieanalyse</h4>
                <p className="text-gray-600">Bewertung der verwendeten Optionsstrategien</p>
              </div>
            </div>

            {/* Final CTA */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <button
                onClick={() => setShowConsultation(true)}
                className="w-full flex items-center justify-center bg-navy-900 text-white px-8 py-6 rounded-xl text-2xl font-bold hover:bg-navy-800 transition-colors group"
              >
                Einen der 7 verfügbaren Plätze sichern
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-center text-sm text-gray-500 mt-4">
                * Die durchschnittliche Rendite basiert auf verifizierten Kundendaten der letzten 12 Monate. 
                Vergangene Performances garantieren keine zukünftigen Ergebnisse.
              </p>
            </div>
          </div>
        </article>
      </main>

      {showConsultation && <ConsultationForm onClose={() => setShowConsultation(false)} />}
    </div>
  );
}