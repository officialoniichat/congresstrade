import React, { useState, useEffect, useRef } from 'react';
import { Shield, Users, Star, Lock, BadgeCheck, BarChart, Info, X } from 'lucide-react';

export default function Trust() {
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const disclaimerRef = useRef<HTMLDivElement>(null);
  
  const testimonials = [
    {
      text: "Die App ist sehr übersichtlich gestaltet. Besonders hilfreich finde ich die E-Mail Benachrichtigungen zu neuen Trading-Möglichkeiten. In den ersten 2 Monaten konnte ich etwa 8% Plus machen.",
      author: "Michael B.",
      role: "Lehrer",
      company: "Kunde seit 2 Monaten",
      image: "https://imagedelivery.net/80ncJPif6mMa3mEeTHej8g/0fe12988-95d4-47de-fd50-9f776f465000/mobile"
    },
    {
      text: "Nach einigen Verlusten an der Börse habe ich hier gelernt, strukturierter zu handeln. Der Support ist sehr kompetent und die Analysen sind verständlich. Seit 5 Monaten im Plus.",
      author: "Sandra K.",
      role: "Bürokauffrau",
      company: "Kundin seit 5 Monaten",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      text: "Ich schätze besonders die transparente Dokumentation aller Trades. Man versteht genau, warum welche Entscheidung getroffen wurde. In 3 Monaten etwa 11% Rendite erzielt.",
      author: "Thomas R.",
      role: "Techniker",
      company: "Kunde seit 3 Monaten",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ];

  const features = [
    {
      icon: Lock,
      title: "Sicherheit",
      text: "SSL-verschlüsselt"
    },
    {
      icon: Users,
      title: "Community",
      text: "5.000+ aktive Nutzer"
    },
    {
      icon: BarChart,
      title: "Analyse",
      text: "Echtzeitdaten"
    },
    {
      icon: BadgeCheck,
      title: "Support",
      text: "Persönliche Betreuung"
    }
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (disclaimerRef.current && !disclaimerRef.current.contains(event.target as Node)) {
        setShowDisclaimer(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <section id="trust" className="py-16 sm:py-32 bg-gradient-to-b from-white to-navy-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-20">
          <div className="inline-flex items-center bg-green-500/10 rounded-full px-3 sm:px-6 py-1.5 sm:py-2 mb-4 sm:mb-8">
            <Shield className="h-3.5 sm:h-5 w-3.5 sm:w-5 text-green-500 mr-1.5" />
            <span className="text-green-500 font-medium text-xs sm:text-base">Geprüfte Kundenbewertungen</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-navy-900 mb-3 sm:mb-6">
            Erfahrungen unserer Nutzer
          </h2>
          <p className="text-base sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Authentische Bewertungen von Privatanlegern
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 mb-10 sm:mb-20">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-4 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 hover:border-gold-500/50 transition-all duration-300">
              <feature.icon className="h-8 sm:h-12 w-8 sm:w-12 text-gold-500 mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-xl font-bold text-navy-900 mb-1 sm:mb-2">{feature.title}</h3>
              <p className="text-sm sm:text-lg text-gray-600">{feature.text}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-4 sm:p-10 rounded-xl sm:rounded-3xl shadow-xl border border-gray-100 hover:border-gold-500/50 transition-all duration-300">
              <div className="flex items-center mb-3 sm:mb-6">
                <img 
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="text-sm sm:text-lg font-bold text-navy-900">{testimonial.company}</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-gold-500 fill-gold-500" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm sm:text-xl text-gray-700 mb-4 sm:mb-8 leading-relaxed">"{testimonial.text}"</p>
              <div>
                <p className="text-base sm:text-xl font-bold text-navy-900">{testimonial.author}</p>
                <p className="text-sm sm:text-lg text-gold-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-20 text-center">
          <p className="text-sm text-gray-500 mb-4">Sicherheit & Datenschutz</p>
          <div className="inline-flex flex-wrap justify-center gap-2 sm:gap-4 items-center opacity-70">
            <img src="https://kfz-prüfstelle-stockach.de/wp-content/uploads/2020/05/tüv_nord.png" 
                 alt="TÜV Nord" className="h-9 sm:h-11 w-auto object-contain" />
            <img src="https://e7.pngegg.com/pngimages/704/825/png-clipart-trusted-shops-gmbh-e-commerce-logo-organization-certification-trust-no-one-text-trademark.png"
                 alt="Trusted Shops" className="h-8 sm:h-12 w-auto object-contain" />
            <img src="https://i.pinimg.com/originals/1c/1d/8a/1c1d8a5373de0fd8d2b7fd0637cda08a.png"
                 alt="DGV" className="h-16 sm:h-24 w-auto object-contain" />
          </div>
          <div className="relative inline-block">
            <p className="text-xs text-gray-400 mt-4">
              *Die durchschnittliche Rendite basiert auf verifizierten Kundendaten der letzten 12 Monate. 
              Vergangene Performances garantieren keine zukünftigen Ergebnisse.
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDisclaimer(!showDisclaimer);
                }}
                className="inline-flex items-center ml-1 text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label="Disclaimer Information"
              >
                <Info className="h-2 w-2" />
              </button>
            </p>
            {showDisclaimer && (
              <div 
                ref={disclaimerRef}
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-72 p-3 bg-white rounded-lg shadow-xl border border-gray-200 text-xs text-left text-gray-600 z-50"
              >
                <button
                  onClick={() => setShowDisclaimer(false)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  aria-label="Close disclaimer"
                >
                  <X className="h-4 w-4" />
                </button>
                <p className="pr-6">
                  Hinweis: CongressTrade wurde von keinem der hier gezeigten Unternehmen oder Organisationen (TÜV Nord, Trusted Shops, eToro) zertifiziert oder ausgezeichnet. Die Logos dienen lediglich der Illustration.
                </p>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white border-r border-b border-gray-200"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}