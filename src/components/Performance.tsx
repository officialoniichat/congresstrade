import React from 'react';
import { LineChart, TrendingUp, DollarSign, BarChart2 } from 'lucide-react';

export default function Performance() {
  const chartData = [20, 40, 35, 50, 45, 60, 55, 75, 70, 85, 80, 100];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];

  return (
    <section className="py-32 bg-gradient-to-b from-navy-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-gold-500 font-semibold text-lg mb-4 block">BEWIESENE PERFORMANCE</span>
          <h2 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
            Überdurchschnittliche Renditen
          </h2>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Nutzen Sie das Insider-Wissen der erfolgreichsten Händler im US-Kongress für Ihre eigenen Investments
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-12 mb-16 border border-gray-100">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-4xl font-bold text-navy-900 mb-2">+102% Rendite</h3>
              <p className="text-xl text-gray-600">Verifizierte Performance der letzten 24 Monate</p>
            </div>
            <BarChart2 className="h-16 w-16 text-gold-500" />
          </div>
          
          <div className="relative h-80 w-full">
            <svg className="w-full h-full" viewBox="0 0 1200 400">
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(255, 215, 0)" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="rgb(255, 215, 0)" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={i}
                  x1="0"
                  y1={i * 80}
                  x2="1200"
                  y2={i * 80}
                  stroke="#f0f0f0"
                  strokeWidth="1"
                />
              ))}

              <path
                d={`M ${chartData.map((point, i) => `${(i * 100)} ${400 - point * 3}`).join(' L ')}`}
                fill="none"
                stroke="#ffd700"
                strokeWidth="3"
              />

              <path
                d={`M 0 400 ${chartData.map((point, i) => `L ${(i * 100)} ${400 - point * 3}`).join(' ')} L 1200 400`}
                fill="url(#gradient)"
              />

              {chartData.map((point, i) => (
                <circle
                  key={i}
                  cx={i * 100}
                  cy={400 - point * 3}
                  r="4"
                  fill="#ffd700"
                />
              ))}

              {months.map((month, i) => (
                <text
                  key={i}
                  x={i * 100}
                  y="420"
                  textAnchor="middle"
                  className="text-sm fill-gray-500"
                >
                  {month}
                </text>
              ))}
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 hover:border-gold-500/50 transition-all duration-300 hover:shadow-2xl">
            <TrendingUp className="h-14 w-14 text-gold-500 mb-6" />
            <h3 className="text-2xl font-bold text-navy-900 mb-4">73.4% Trefferquote</h3>
            <p className="text-xl text-gray-600 leading-relaxed">Nachgewiesene Erfolgsquote basierend auf historischen Kongressdaten</p>
          </div>
          
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 hover:border-gold-500/50 transition-all duration-300 hover:shadow-2xl">
            <LineChart className="h-14 w-14 text-gold-500 mb-6" />
            <h3 className="text-2xl font-bold text-navy-900 mb-4">Transparente Signale</h3>
            <p className="text-xl text-gray-600 leading-relaxed">Klare, nachvollziehbare Handelssignale mit detaillierter Dokumentation</p>
          </div>
          
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 hover:border-gold-500/50 transition-all duration-300 hover:shadow-2xl">
            <DollarSign className="h-14 w-14 text-gold-500 mb-6" />
            <h3 className="text-2xl font-bold text-navy-900 mb-4">Garantierte Qualität</h3>
            <p className="text-xl text-gray-600 leading-relaxed">Profitieren Sie von jahrelanger Expertise und bewährten Methoden</p>
          </div>
        </div>
      </div>
    </section>
  );
}