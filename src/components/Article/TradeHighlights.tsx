import React from 'react';
import { DollarSign } from 'lucide-react';

export default function TradeHighlights() {
  const trades = [
    {
      company: "NVIDIA",
      year: "2021",
      return: "+312%",
      description: "Rendite durch perfektes Timing vor dem CHIPS Act"
    },
    {
      company: "Microsoft",
      year: "2020",
      return: "+203%",
      description: "Gewinn vor Bekanntgabe des Pentagon-Vertrags"
    },
    {
      company: "Tesla",
      year: "2020",
      return: "+187%",
      description: "durch Kauf vor grüner Energieinitiative"
    }
  ];

  return (
    <div className="bg-navy-50 p-6 sm:p-8 rounded-2xl my-8">
      <h3 className="text-xl font-bold text-navy-900 mb-4">Pelosis Trading-Erfolge im Überblick:</h3>
      <ul className="space-y-4">
        {trades.map((trade, index) => (
          <li key={index} className="flex items-start gap-3">
            <DollarSign className="h-6 w-6 text-gold-500 flex-shrink-0 mt-1" />
            <span>{trade.company} ({trade.year}): {trade.return} {trade.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}