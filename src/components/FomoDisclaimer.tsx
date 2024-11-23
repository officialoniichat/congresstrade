import React from 'react';
import { AlertTriangle, TrendingDown, Users } from 'lucide-react';

interface FomoDisclaimerProps {
  className?: string;
}

export default function FomoDisclaimer({ className = '' }: FomoDisclaimerProps) {
  const [activeUsers, setActiveUsers] = React.useState(25);

  React.useEffect(() => {
    const updateActiveUsers = () => {
      // Random number between 23-27 to create urgency but stay realistic
      const newCount = Math.floor(Math.random() * (27 - 23 + 1)) + 23;
      setActiveUsers(newCount);
    };

    const interval = setInterval(updateActiveUsers, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`bg-amber-50 border border-amber-200 rounded-xl p-4 ${className}`}>
      <div className="flex items-center gap-2 text-amber-600 mb-2">
        <AlertTriangle className="h-5 w-5" />
        <span className="font-semibold">Wichtiger Hinweis zur Verfügbarkeit</span>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-amber-700">
            Aktuell sind noch <span className="font-bold">7 von 50</span> Plätze für diesen Monat verfügbar.
          </p>
          <div className="flex items-center text-amber-600">
            <Users className="h-4 w-4 mr-2" />
            <span>{activeUsers} Interessenten aktiv</span>
          </div>
        </div>
        <div className="flex items-start gap-3 bg-amber-100/50 p-4 rounded-lg">
          <TrendingDown className="h-5 w-5 text-amber-600 flex-shrink-0 mt-1" />
          <div className="text-amber-700">
            <p className="font-semibold mb-2">Warum ist die Anzahl der Plätze begrenzt?</p>
            <p className="text-sm">
              Um die außergewöhnlich hohen Renditen für alle Teilnehmer zu sichern, müssen wir die Anzahl der Anleger strikt begrenzen. Der Grund ist einfach: Je mehr Anleger gleichzeitig die gleichen Aktien kaufen, desto stärker steigt der Preis - was die Rendite für alle verringert. Ähnlich wie bei einem exklusiven Investment-Club gewährleisten wir durch die Begrenzung optimale Handelsbedingungen für jeden einzelnen Teilnehmer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}