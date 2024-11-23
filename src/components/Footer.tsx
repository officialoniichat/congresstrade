import React, { useState, useRef, useEffect } from 'react';
import { TrendingUp, Info, X } from 'lucide-react';

export default function Footer() {
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const disclaimerRef = useRef<HTMLDivElement>(null);

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
    <footer className="bg-navy-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-8 md:mb-0">
            <TrendingUp className="h-8 w-8 text-gold-500" />
            <span className="ml-2 text-2xl font-bold">CongressTrade</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-lg text-gray-400">© 2024 CongressTrade. Alle Rechte vorbehalten.</p>
            <div className="relative inline-block">
              <p className="text-sm text-gray-500 mt-2">
                Investieren birgt Risiken. Vergangene Erfolge garantieren keine zukünftigen Ergebnisse.
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDisclaimer(!showDisclaimer);
                  }}
                  className="inline-flex items-center ml-1 text-gray-500 hover:text-gray-400 focus:outline-none"
                  aria-label="Educational Disclaimer"
                >
                  <Info className="h-2 w-2" />
                </button>
              </p>
              {showDisclaimer && (
                <div 
                  ref={disclaimerRef}
                  className="absolute bottom-full right-0 mb-2 w-72 p-3 bg-white rounded-lg shadow-xl border border-gray-200 text-xs text-left text-gray-600 z-50"
                >
                  <button
                    onClick={() => setShowDisclaimer(false)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    aria-label="Close disclaimer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <p className="pr-6">
                    Wichtiger Hinweis: Alle auf dieser Website angebotenen Services und damit verbundenen Personen sind nicht als Finanzberater tätig. Die bereitgestellten Informationen dienen ausschließlich Bildungszwecken und stellen keine Finanzberatung dar.
                  </p>
                  <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white border-r border-b border-gray-200"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}