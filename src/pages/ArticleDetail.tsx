import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TrendingUp, ArrowLeft } from 'lucide-react';
import ConsultationForm from '../components/ConsultationForm';
import { articles } from '../data/articles';
import { tracking } from '../services/tracking';

export default function ArticleDetail() {
  const { slug } = useParams();
  const [showConsultation, setShowConsultation] = useState(false);

  const article = articles.find(article => article.slug === slug);
  const ArticleComponent = article?.component;

  useEffect(() => {
    if (article) {
      tracking.trackArticleView({
        title: article.title,
        slug: article.slug
      });
    }
  }, [article]);

  if (!ArticleComponent) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-navy-900 mb-4">Artikel nicht gefunden</h1>
          <Link to="/" className="text-gold-500 hover:text-gold-600 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative">
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link 
              to="/"
              className="flex items-center gap-2 text-navy-900 hover:text-gold-500 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Zurück zur Startseite</span>
            </Link>
          </div>
          <Link to="/" className="flex items-center">
            <div className="bg-navy-900 p-1.5 rounded-lg">
              <TrendingUp className="h-6 w-6 text-gold-500" />
            </div>
            <span className="ml-2 text-xl font-bold text-navy-900">CongressTrade</span>
          </Link>
        </div>
      </header>

      <main className="pt-20">
        <ArticleComponent onConsultation={() => setShowConsultation(true)} />
      </main>

      {showConsultation && <ConsultationForm onClose={() => setShowConsultation(false)} />}
    </div>
  );
}