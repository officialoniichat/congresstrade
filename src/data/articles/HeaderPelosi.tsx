import React from 'react';
import { TrendingUp, Star } from 'lucide-react';

interface ArticleHeaderProps {
  title: string;
  author: string;
  image: string;
}

export const ArticleHeader = ({ title, author, image }: ArticleHeaderProps) => (
  <header className="mb-12">
    <div className="flex items-center gap-3 text-sm text-gray-500 mb-6">
      <div className="flex items-center">
        <div className="bg-navy-900 p-1 rounded-lg">
          <TrendingUp className="h-4 w-4 text-gold-500" />
        </div>
        <span className="ml-1.5 font-semibold">CongressTrade</span>
      </div>
      <span>•</span>
      <span>Exklusive Analyse</span>
      <span>•</span>
      <span>12 Min. Lesezeit</span>
    </div>

    <h1 className="text-3xl sm:text-5xl font-bold text-navy-900 mb-6 leading-tight">
      {title}
    </h1>

    <div className="flex items-center gap-4 mb-8">
      <img
        src={image}
        alt={author}
        className="w-12 h-12 rounded-full"
      />
      <div>
        <p className="font-semibold text-navy-900">Von {author}</p>
        <p className="text-sm text-gray-500">Finanzanalyst & Investigativ-Journalist</p>
        <div className="flex items-center mt-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 text-gold-500 fill-gold-500" />
          ))}
          <span className="text-sm text-gray-500 ml-2">138 Analysen</span>
        </div>
      </div>
    </div>
  </header>
);