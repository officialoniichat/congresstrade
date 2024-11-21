import React from 'react';
import { LineChart, ArrowRight } from 'lucide-react';
import FomoDisclaimer from '../FomoDisclaimer';

interface CallToActionProps {
  onConsultation: () => void;
}

export default function CallToAction({ onConsultation }: CallToActionProps) {
  return (
    <div className="bg-navy-900 text-white p-6 sm:p-8 rounded-2xl my-8">
      <h3 className="text-xl font-bold mb-4">Exklusiv: Die Pelosi-Strategie jetzt auch für Privatanleger</h3>
      <p className="mb-6">
        Durch modernste Technologie und KI-gestützte Analyse können nun auch Privatanleger von diesem Insider-Wissen profitieren. Die CongressTrade-Plattform macht es möglich.
      </p>
      
      <div className="bg-white/10 rounded-xl p-6 mb-8">
        <FomoDisclaimer />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onConsultation}
          className="flex items-center justify-center bg-gold-500 text-navy-900 px-6 py-3 rounded-xl text-lg font-bold hover:bg-gold-600 transition-colors group"
        >
          Jetzt mehr erfahren
          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
        <div className="flex items-center text-gold-500">
          <LineChart className="h-6 w-6 mr-2" />
          <span>Bereits 5.000+ aktive Nutzer</span>
        </div>
      </div>
    </div>
  );
}