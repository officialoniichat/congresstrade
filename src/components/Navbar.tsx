import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Menu, X, Phone } from 'lucide-react';
import ArticleSelection from './ArticleSelection';

interface NavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  onConsultation: () => void;
}

export default function Navbar({ isMenuOpen, setIsMenuOpen, onConsultation }: NavbarProps) {
  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-lg z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center">
            <div className="bg-navy-900 p-2 rounded-lg">
              <TrendingUp className="h-8 w-8 text-gold-500" />
            </div>
            <span className="ml-3 text-2xl font-bold text-navy-900">CongressTrade</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-lg text-navy-900 hover:text-gold-500 transition-colors font-semibold">
              Funktionsweise
            </a>
            <a href="#trust" className="text-lg text-navy-900 hover:text-gold-500 transition-colors font-semibold">
              Referenzen
            </a>
            <div className="relative group">
              <span className="text-lg text-navy-900 hover:text-gold-500 transition-colors font-semibold cursor-pointer">
                Artikel
              </span>
              <ArticleSelection />
            </div>
            <button 
              onClick={onConsultation}
              className="flex items-center bg-navy-900 text-white px-6 py-3 rounded-lg text-lg font-bold hover:bg-navy-800 transition-colors"
            >
              <Phone className="mr-2 h-5 w-5" />
              Kostenlose Beratung
            </button>
          </div>

          <button 
            className="md:hidden text-navy-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-4 pb-6 space-y-4">
            <a href="#features" className="block px-4 py-3 text-lg text-navy-900 hover:bg-gray-50 rounded-lg font-semibold">
              Funktionsweise
            </a>
            <a href="#trust" className="block px-4 py-3 text-lg text-navy-900 hover:bg-gray-50 rounded-lg font-semibold">
              Referenzen
            </a>
            <div className="relative group">
              <span className="block px-4 py-3 text-lg text-navy-900 hover:bg-gray-50 rounded-lg font-semibold">
                Artikel
              </span>
              <ArticleSelection />
            </div>
            <button 
              onClick={onConsultation}
              className="w-full flex items-center justify-center bg-navy-900 text-white px-6 py-4 rounded-lg text-lg font-bold hover:bg-navy-800 transition-colors"
            >
              <Phone className="mr-2 h-5 w-5" />
              Kostenlose Beratung
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}