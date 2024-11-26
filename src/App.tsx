import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Performance from './components/Performance';
import Trust from './components/Trust';
import Footer from './components/Footer';
import ConsultationForm from './components/ConsultationForm';
import ArticleDetail from './pages/ArticleDetail';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { AdminProvider } from './contexts/AdminContext';
import { useAdmin } from './hooks/useAdmin';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAdmin();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy-900"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

function MainLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showConsultation, setShowConsultation] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onConsultation={() => setShowConsultation(true)}
      />
      <main className="pt-16">
        <Hero onConsultation={() => setShowConsultation(true)} />
        <Performance />
        <Features />
        <Trust />
      </main>
      <Footer />
      {showConsultation && <ConsultationForm onClose={() => setShowConsultation(false)} />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AdminProvider>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/:slug" element={<ArticleDetail />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AdminProvider>
    </Router>
  );
}