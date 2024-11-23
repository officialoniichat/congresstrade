import React, { useState } from 'react';
import { Tag, Plus, X } from 'lucide-react';

interface TagListProps {
  contactId: number;
  tags: Array<{ id: number; text: string }>;
  onAddTag: (contactId: number, tag: string) => void;
  onDeleteTag: (contactId: number, tagId: number) => void;
}

export default function TagList({
  contactId,
  tags,
  onAddTag,
  onDeleteTag
}: TagListProps) {
  const [newTag, setNewTag] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTag.trim()) {
      try {
        await onAddTag(contactId, newTag.trim());
        setNewTag('');
        setIsAdding(false);
        setError(null);
      } catch (err) {
        setError('Fehler beim Hinzufügen des Tags');
      }
    }
  };

  const handleDelete = async (tagId: number) => {
    try {
      await onDeleteTag(contactId, tagId);
      setError(null);
    } catch (err) {
      setError('Fehler beim Löschen des Tags');
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag.id}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 group"
          >
            <Tag className="h-3 w-3 mr-1" />
            {tag.text}
            <button
              onClick={() => handleDelete(tag.id)}
              className="ml-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        
        {isAdding ? (
          <form onSubmit={handleSubmit} className="inline-flex items-center">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="w-24 px-2 py-0.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-gold-500 focus:border-gold-500"
              placeholder="Neuer Tag"
              autoFocus
              onBlur={() => {
                if (!newTag.trim()) {
                  setIsAdding(false);
                }
              }}
            />
          </form>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
          >
            <Plus className="h-3 w-3 mr-1" />
            Tag
          </button>
        )}
      </div>
      
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}