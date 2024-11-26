import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, ArrowRight } from 'lucide-react';
import FomoDisclaimer from './FomoDisclaimer';

interface ArticleProps {
  onConsultation: () => void;
}

export default function Article({ onConsultation }: ArticleProps) {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate('/pelosi-methode');
  };

  return (
    // Rest of the component remains the same
    // Just updated the navigation path above
  );
}