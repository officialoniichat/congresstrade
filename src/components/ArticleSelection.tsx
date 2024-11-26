import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: "Die Pelosi-Methode: Wie die ehemalige...",
    subtitle: "Eine Exklusive Analyse der Handelsstrategie",
    slug: "pelosi-methode"
  },
  {
    id: 2,
    title: "Dan Crenshaws 400% Rendite mit Energy-Trades",
    subtitle: "Wie der Republikaner den Energieboom vorhersah",
    slug: "crenshaw-energy-trades"
  },
  {
    id: 3,
    title: "Josh Gottheimer: 245% mit Tech-Aktien",
    subtitle: "Perfektes Timing vor dem CHIPS Act",
    slug: "gottheimer-tech-strategie"
  },
  {
    id: 4,
    title: "David Perdue: 2.600 Trades in sechs Jahren",
    subtitle: "Strategien des aktivsten Händlers im Senat",
    slug: "perdue-trading-strategie"
  }
];

export default function ArticleSelection() {
  const navigate = useNavigate();

  return (
    <div className="absolute left-0 md:left-1/2 top-full md:-translate-x-1/2 w-full md:w-96 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 pt-2 z-50">
      <div className="mx-4 md:mx-0 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
        {articles.map((article) => (
          <button
            key={article.id}
            onClick={() => navigate(`/${article.slug}`)}
            className="block w-full p-4 hover:bg-navy-50 transition-colors text-left"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <h3 className="font-semibold text-navy-900 line-clamp-1">{article.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-1">{article.subtitle}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}