import React from 'react';
import ArticleHeader from './ArticleHeader';
import ArticleContent from './ArticleContent';

interface ArticleProps {
  onConsultation: () => void;
}

export default function Article({ onConsultation }: ArticleProps) {
  return (
    <section id="article" className="py-16 sm:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none">
          <ArticleHeader />
          <img
            src="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            alt="US Capitol"
            className="w-full rounded-2xl mb-8"
          />
          <ArticleContent onConsultation={onConsultation} />
        </div>
      </div>
    </section>
  );
}