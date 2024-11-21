import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Image, AlertCircle } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import AdminHeader from './common/AdminHeader';
import RichTextEditor from './common/RichTextEditor';
import ImageUploadField from './common/ImageUploadField';

interface ArticleData {
  title: string;
  subtitle: string;
  author: string;
  content: string;
  image_url: string;
  status: 'draft' | 'published';
}

export default function ArticleEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchApi } = useApi();
  const isEditing = id !== undefined;

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  const [formData, setFormData] = useState<ArticleData>({
    title: '',
    subtitle: '',
    author: '',
    content: '',
    image_url: '',
    status: 'draft'
  });

  useEffect(() => {
    if (isEditing) {
      loadArticle();
    }
  }, [id]);

  const loadArticle = async () => {
    setIsLoading(true);
    try {
      const data = await fetchApi(`/articles/${id}`);
      setFormData(data);
    } catch (err) {
      setError('Fehler beim Laden des Artikels');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof ArticleData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      if (isEditing) {
        await fetchApi(`/articles/${id}`, {
          method: 'PUT',
          body: JSON.stringify(formData)
        });
      } else {
        await fetchApi('/articles', {
          method: 'POST',
          body: JSON.stringify(formData)
        });
      }
      setIsDirty(false);
      navigate('/admin');
    } catch (err) {
      setError('Fehler beim Speichern des Artikels');
      console.error(err);
    } finally {
      setIsSaving(false);
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
        title={isEditing ? 'Artikel bearbeiten' : 'Neuer Artikel'}
        backButton
        onBack={() => {
          if (isDirty && !window.confirm('Änderungen verwerfen?')) {
            return;
          }
          navigate('/admin');
        }}
        actions={
          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className="flex items-center bg-navy-900 text-white px-4 py-2 rounded-lg hover:bg-navy-800 transition-colors disabled:opacity-50"
          >
            {isSaving ? (
              <span className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
            ) : (
              <>
                <Save className="h-5 w-5 mr-2" />
                Speichern
              </>
            )}
          </button>
        }
      />

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6 flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titel
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Untertitel
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                value={formData.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Autor
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                value={formData.author}
                onChange={(e) => handleChange('author', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value as 'draft' | 'published')}
              >
                <option value="draft">Entwurf</option>
                <option value="published">Veröffentlicht</option>
              </select>
            </div>
          </div>

          <ImageUploadField
            value={formData.image_url}
            onChange={(value) => handleChange('image_url', value)}
          />

          <RichTextEditor
            value={formData.content}
            onChange={(value) => handleChange('content', value)}
          />
        </form>
      </div>
    </div>
  );
}