import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Eye, Plus } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import AdminHeader from './common/AdminHeader';

interface Article {
  id: number;
  title: string;
  author: string;
  status: string;
  created_at: string;
  views: number;
}

export default function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchApi } = useApi();

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const data = await fetchApi('/articles');
      setArticles(data);
    } catch (err) {
      setError('Fehler beim Laden der Artikel');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Möchten Sie diesen Artikel wirklich löschen?')) {
      return;
    }

    try {
      await fetchApi(`/articles/${id}`, { method: 'DELETE' });
      setArticles(articles.filter(article => article.id !== id));
    } catch (err) {
      console.error('Error deleting article:', err);
      alert('Fehler beim Löschen des Artikels');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy-900"></div>
      </div>
    );
  }

  return (
    <div>
      <AdminHeader
        title="Artikel verwalten"
        actions={
          <Link
            to="/admin/articles/new"
            className="flex items-center bg-navy-900 text-white px-4 py-2 rounded-lg hover:bg-navy-800 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Neuer Artikel
          </Link>
        }
      />
      
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6 text-center">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Titel
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Autor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Datum
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aufrufe
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aktionen
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {articles.map((article) => (
              <tr key={article.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-navy-900">{article.title}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{article.author}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    article.status === 'published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {article.status === 'published' ? 'Veröffentlicht' : 'Entwurf'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {new Date(article.created_at).toLocaleDateString('de-DE')}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{article.views}</div>
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <Link
                    to={`/artikel/${article.id}`}
                    className="text-gray-400 hover:text-navy-900 inline-block transition-colors"
                    title="Vorschau"
                  >
                    <Eye className="h-5 w-5" />
                  </Link>
                  <Link
                    to={`/admin/articles/${article.id}`}
                    className="text-gray-400 hover:text-navy-900 inline-block transition-colors"
                    title="Bearbeiten"
                  >
                    <Edit className="h-5 w-5" />
                  </Link>
                  <button 
                    onClick={() => handleDelete(article.id)}
                    className="text-gray-400 hover:text-red-600 inline-block transition-colors"
                    title="Löschen"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}