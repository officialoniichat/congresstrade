import React from 'react';
import { Shield, BarChart3, Zap } from 'lucide-react';

export default function Features() {
  return (
    <section id="features" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-gold-500 font-semibold text-lg mb-4 block">EINFACHER PROZESS</span>
          <h2 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
            In drei Schritten zum Erfolg
          </h2>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Starten Sie noch heute mit Ihrer erfolgreichen Anlagestrategie
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="text-center group">
            <div className="bg-navy-50 w-32 h-32 rounded-3xl flex items-center justify-center mx-auto mb-8 transform group-hover:scale-110 transition-transform duration-300">
              <Shield className="h-16 w-16 text-navy-900" />
            </div>
            <h3 className="text-2xl font-bold text-navy-900 mb-4">1. Persönliche Beratung</h3>
            <p className="text-xl text-gray-600 leading-relaxed">
              Erhalten Sie eine persönliche Beratung von einem unserer Experten
            </p>
          </div>

          <div className="text-center group">
            <div className="bg-navy-50 w-32 h-32 rounded-3xl flex items-center justify-center mx-auto mb-8 transform group-hover:scale-110 transition-transform duration-300">
              <BarChart3 className="h-16 w-16 text-navy-900" />
            </div>
            <h3 className="text-2xl font-bold text-navy-900 mb-4">2. Strategie aktivieren</h3>
            <p className="text-xl text-gray-600 leading-relaxed">
              Automatische Umsetzung der erfolgreichsten Handelssignale
            </p>
          </div>

          <div className="text-center group">
            <div className="bg-navy-50 w-32 h-32 rounded-3xl flex items-center justify-center mx-auto mb-8 transform group-hover:scale-110 transition-transform duration-300">
              <Zap className="h-16 w-16 text-navy-900" />
            </div>
            <h3 className="text-2xl font-bold text-navy-900 mb-4">3. Rendite genießen</h3>
            <p className="text-xl text-gray-600 leading-relaxed">
              Profitieren Sie von kontinuierlichen Wertsteigerungen
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}