import React from 'react';
import { Check } from 'lucide-react';

export default function Pricing() {
  const plans = [
    {
      name: 'Basic',
      price: '29',
      features: [
        'Basis Trade-Signale',
        'Email Benachrichtigungen',
        'Marktanalysen',
        'Community Zugang'
      ]
    },
    {
      name: 'Premium',
      price: '99',
      features: [
        'Alle Basic Features',
        'Prioritäts-Signale',
        'Automatisches Trading',
        'Premium Support',
        'Erweiterte Analysen'
      ]
    },
    {
      name: 'VIP',
      price: '299',
      features: [
        'Alle Premium Features',
        'Exklusive Insider-Signale',
        '24/7 Concierge Service',
        'Persönlicher Berater',
        'Custom Strategien',
        'Unbegrenzte Trades'
      ]
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-navy-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Wählen Sie Ihren Erfolgsplan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Flexible Pläne für jeden Anspruch
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div key={plan.name} className="bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-navy-900 mb-4">{plan.name}</h3>
                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-bold text-navy-900">${plan.price}</span>
                  <span className="text-gray-500 ml-2">/Monat</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-5 w-5 text-gold-500 mr-2" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-navy-900 text-white py-3 rounded-lg font-semibold hover:bg-navy-800 transition-colors">
                  Jetzt testen
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}