import React, { useState } from 'react';
import { TrendingUp, ArrowRight, Shield, Users, BarChart3, DollarSign } from 'lucide-react';
import ConsultationForm from '../components/ConsultationForm';

export default function FacebookAdPage() {
  const [showConsultation, setShowConsultation] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-navy-900 p-1.5 rounded-lg">
              <TrendingUp className="h-6 w-6 text-gold-500" />
            </div>
            <span className="ml-2 text-xl font-bold text-navy-900">CongressTrade</span>
          </div>
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
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-green-500/10 rounded-full px-3 py-1.5 mb-6">
              <Shield className="h-4 w-4 text-green-500 mr-1.5" />
              <span className="text-green-500 font-medium">Exklusive Enthüllung</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-navy-900 mb-6 leading-tight">
              Enthüllt: Die geheime Anlagestrategie der US-Politiker
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-8">
              Wie Nancy Pelosi in nur 67 Tagen aus $5 Millionen über $15 Millionen machte - und warum deutsche Anleger jetzt aufhorchen
            </p>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-8 mb-12">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-gold-500 mr-2" />
              <span className="text-gray-600">5.000+ aktive Nutzer</span>
            </div>
            <div className="flex items-center">
              <BarChart3 className="h-5 w-5 text-gold-500 mr-2" />
              <span className="text-gray-600">73.4% Erfolgsquote</span>
            </div>
          </div>

          {/* Main Image */}
          <img
            src="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            alt="US Capitol Building"
            className="w-full rounded-2xl mb-8"
          />

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-xl font-semibold text-navy-900 leading-relaxed">
              Was wäre, wenn Sie die gleichen Aktien kaufen könnten wie die erfolgreichsten Händler im US-Kongress? 
              Genau zum richtigen Zeitpunkt, bevor wichtige Gesetze verabschiedet werden?
            </p>

            <div className="bg-navy-50 p-6 rounded-xl my-8">
              <h3 className="text-xl font-bold text-navy-900 mb-4">Faktencheck:</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <DollarSign className="h-6 w-6 text-gold-500 flex-shrink-0 mt-1" />
                  <span>NVIDIA: +312% in nur 67 Tagen (Juni-August 2021)</span>
                </li>
                <li className="flex items-start gap-3">
                  <DollarSign className="h-6 w-6 text-gold-500 flex-shrink-0 mt-1" />
                  <span>Microsoft: +203% in 94 Tagen (März-Juni 2020)</span>
                </li>
              </ul>
            </div>

            <p>
              Dies sind keine erfundenen Zahlen. Es sind die verifizierten Renditen von Nancy Pelosis 
              Aktiengeschäften, dokumentiert in offiziellen Kongressunterlagen.
            </p>

            <div className="bg-navy-900 text-white p-6 rounded-xl my-8">
              <h3 className="text-xl font-bold mb-4">BRANDNEU: Die Pelosi-Strategie für deutsche Anleger</h3>
              <p className="text-lg mb-6">
                Durch modernste KI-Technologie können nun auch Sie von diesem Insider-Wissen profitieren. 
                Völlig legal und transparent.
              </p>
              <button
                onClick={() => setShowConsultation(true)}
                className="w-full flex items-center justify-center bg-gold-500 text-navy-900 px-6 py-4 rounded-lg text-lg font-bold hover:bg-gold-600 transition-colors group"
              >
                Jetzt kostenloses Strategiegespräch sichern
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-sm text-center mt-4 text-gray-300">
                * Nur noch 7 von 50 Plätzen für diesen Monat verfügbar
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Michael B."
                  className="w-16 h-16 rounded-full mb-4"
                />
                <p className="text-gray-700 mb-4">
                  "Nach nur 3 Monaten mit CongressTrade liegt mein Depot 27.4% im Plus. 
                  Die Signale sind glasklar und einfach umzusetzen."
                </p>
                <p className="font-bold text-navy-900">Michael B.</p>
                <p className="text-gray-500">Lehrer aus München</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Sandra K."
                  className="w-16 h-16 rounded-full mb-4"
                />
                <p className="text-gray-700 mb-4">
                  "Endlich eine Strategie, die wirklich funktioniert. +31.8% in 4 Monaten 
                  sprechen für sich."
                </p>
                <p className="font-bold text-navy-900">Sandra K.</p>
                <p className="text-gray-500">Bürokauffrau aus Hamburg</p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={() => setShowConsultation(true)}
                className="inline-flex items-center bg-navy-900 text-white px-8 py-4 rounded-xl text-xl font-bold hover:bg-navy-800 transition-colors group"
              >
                Kostenloses Strategiegespräch vereinbaren
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-sm text-gray-500 mt-4">
                * Limitierte Verfügbarkeit: Nur 7 von 50 Plätzen für diesen Monat verfügbar
              </p>
            </div>
          </div>
        </article>
      </main>

      {showConsultation && <ConsultationForm onClose={() => setShowConsultation(false)} />}
    </div>
  );
}