import React, { useState } from 'react';
import { Tag, Plus, X } from 'lucide-react';
import { ContactTag } from '../../../types/contact';

interface ContactTagsProps {
  contactId: number;
  tags: ContactTag[];
  onAddTag: (contactId: number, tag: string) => Promise<void>;
  onDeleteTag: (contactId: number, tagId: number) => Promise<void>;
}

export default function ContactTags({
  contactId,
  tags,
  onAddTag,
  onDeleteTag
}: ContactTagsProps) {
  const [showInput, setShowInput] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTag.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onAddTag(contactId, newTag.trim());
      setNewTag('');
      setShowInput(false);
    } catch (error) {
      console.error('Error adding tag:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag.id}
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 group hover:bg-gray-200 transition-colors"
        >
          <Tag className="h-3 w-3 mr-1" />
          {tag.text}
          <button
            onClick={() => onDeleteTag(contactId, tag.id)}
            className="ml-1 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}

      {showInput ? (
        <form onSubmit={handleSubmit} className="inline-flex items-center">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="w-24 px-2 py-0.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
            placeholder="Neuer Tag"
            autoFocus
          />
          <button
            type="submit"
            disabled={isSubmitting || !newTag.trim()}
            className="ml-1 text-gray-400 hover:text-navy-900 disabled:opacity-50"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setShowInput(false)}
            className="ml-1 text-gray-400 hover:text-red-600"
          >
            <X className="h-4 w-4" />
          </button>
        </form>
      ) : (
        <button
          onClick={() => setShowInput(true)}
          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
        >
          <Plus className="h-3 w-3 mr-1" />
          Tag hinzufügen
        </button>
      )}
    </div>
  );
}