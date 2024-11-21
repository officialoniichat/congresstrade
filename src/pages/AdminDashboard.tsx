import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { TrendingUp, FileText, LogOut, Settings, Users, MessageSquare } from 'lucide-react';
import { useAdmin } from '../hooks/useAdmin'; // Updated import path
import ArticleList from '../components/admin/ArticleList';
import ArticleEditor from '../components/admin/ArticleEditor';
import ContactSubmissions from '../components/admin/ContactSubmissions';
import SettingsPage from '../components/admin/settings/SettingsPage';

export default function AdminDashboard() {
  const { logout } = useAdmin();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-navy-900 text-white w-64 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-64'}`}>
        <div className="p-6">
          <div className="flex items-center mb-8">
            <div className="bg-white p-2 rounded-lg">
              <TrendingUp className="h-6 w-6 text-navy-900" />
            </div>
            <span className="ml-3 text-xl font-bold">Admin Portal</span>
          </div>

          <nav className="space-y-2">
            <Link
              to="/admin"
              className="flex items-center px-4 py-3 text-gray-300 hover:bg-navy-800 rounded-lg transition-colors"
            >
              <FileText className="h-5 w-5 mr-3" />
              Artikel
            </Link>
            <Link
              to="/admin/contacts"
              className="flex items-center px-4 py-3 text-gray-300 hover:bg-navy-800 rounded-lg transition-colors"
            >
              <MessageSquare className="h-5 w-5 mr-3" />
              Kontaktanfragen
            </Link>
            <Link
              to="/admin/users"
              className="flex items-center px-4 py-3 text-gray-300 hover:bg-navy-800 rounded-lg transition-colors"
            >
              <Users className="h-5 w-5 mr-3" />
              Benutzer
            </Link>
            <Link
              to="/admin/settings"
              className="flex items-center px-4 py-3 text-gray-300 hover:bg-navy-800 rounded-lg transition-colors"
            >
              <Settings className="h-5 w-5 mr-3" />
              Einstellungen
            </Link>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="absolute bottom-0 w-full p-4 flex items-center text-gray-300 hover:bg-navy-800 transition-colors"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Abmelden
        </button>
      </div>

      {/* Main Content */}
      <div className={`transition-margin duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<ArticleList />} />
            <Route path="/articles/new" element={<ArticleEditor />} />
            <Route path="/articles/:id" element={<ArticleEditor />} />
            <Route path="/contacts" element={<ContactSubmissions />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}