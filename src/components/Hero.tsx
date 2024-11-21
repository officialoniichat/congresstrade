import React from 'react';
import { TrendingUp, ArrowRight, Users, Shield, Award, BarChart3 } from 'lucide-react';

interface HeroProps {
  onConsultation: () => void;
}

export default function Hero({ onConsultation }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white pt-20 md:pt-28 pb-16 md:pb-36 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] opacity-10 mix-blend-overlay"></div>
      
      <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center bg-white/10 rounded-full px-3 sm:px-6 py-1.5 sm:py-2 mb-4 sm:mb-8 text-xs sm:text-base">
            <Shield className="h-3.5 sm:h-5 w-3.5 sm:w-5 text-gold-500 mr-1.5" />
            <span className="text-gold-500 font-medium">BaFin Regulierung entsprechend</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent drop-shadow-lg">
              Investieren wie die Insider
            </span>
          </h1>
          <p className="text-lg sm:text-2xl md:text-3xl text-white/90 mb-6 sm:mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Profitieren Sie von den Anlagestrategien der erfolgreichsten Kongressmitglieder
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
            <button 
              onClick={onConsultation}
              className="w-full sm:w-auto flex items-center justify-center bg-gold-500 text-navy-900 px-4 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 group"
            >
              Kostenlose Beratung
              <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-8">
              <div className="flex items-center text-white/90 text-sm sm:text-xl">
                <Users className="h-5 sm:h-8 w-5 sm:w-8 text-gold-500 mr-2" />
                <span className="font-medium">5.000+ aktive Nutzer</span>
              </div>
              <div className="hidden sm:flex items-center text-white/90 text-sm sm:text-xl">
                <BarChart3 className="h-5 sm:h-8 w-5 sm:w-8 text-gold-500 mr-2" />
                <span className="font-medium">73.4% Trefferquote</span>
              </div>
            </div>
          </div>

          <div className="mt-12 sm:mt-24 grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
            <div className="bg-white/5 backdrop-blur-lg p-4 sm:p-8 rounded-2xl border border-white/10 hover:border-gold-500/50 transition-colors">
              <Award className="h-8 sm:h-12 w-8 sm:w-12 text-gold-500 mx-auto mb-2 sm:mb-4" />
              <div className="text-2xl sm:text-5xl font-bold text-gold-500 mb-1 sm:mb-3">102%</div>
              <div className="text-sm sm:text-xl text-white/90">Rendite der letzten 24 Monate</div>
            </div>
            <div className="bg-white/5 backdrop-blur-lg p-4 sm:p-8 rounded-2xl border border-white/10 hover:border-gold-500/50 transition-colors">
              <Shield className="h-8 sm:h-12 w-8 sm:w-12 text-gold-500 mx-auto mb-2 sm:mb-4" />
              <div className="text-2xl sm:text-5xl font-bold text-gold-500 mb-1 sm:mb-3">73.4%</div>
              <div className="text-sm sm:text-xl text-white/90">Trefferquote pro Trade</div>
            </div>
            <div className="bg-white/5 backdrop-blur-lg p-4 sm:p-8 rounded-2xl border border-white/10 hover:border-gold-500/50 transition-colors col-span-2 lg:col-span-1">
              <TrendingUp className="h-8 sm:h-12 w-8 sm:w-12 text-gold-500 mx-auto mb-2 sm:mb-4" />
              <div className="text-2xl sm:text-5xl font-bold text-gold-500 mb-1 sm:mb-3">5 Min</div>
              <div className="text-sm sm:text-xl text-white/90">Setup</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}