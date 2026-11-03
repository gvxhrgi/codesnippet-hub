import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import './AddSnippetModal.css';

export default function AddSnippetModal({ isOpen, onClose, onAddSnippet }) {
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !code.trim()) return;

    const tags = tagsInput
      ? tagsInput.split(',').map((tag) => tag.trim().toLowerCase()).filter(Boolean)
      : [language.toLowerCase()];

    const newSnippet = {
      id: Date.now().toString(),
      title: title.trim(),
      language: language.toLowerCase().trim(),
      description: description.trim(),
      code: code,
      tags: tags
    };

    onAddSnippet(newSnippet);

    // Reset form & close
    setTitle('');
    setLanguage('javascript');
    setDescription('');
    setCode('');
    setTagsInput('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Code Snippet</h2>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="snippet-title">Snippet Title / Filename</label>
            <input
              id="snippet-title"
              type="text"
              placeholder="e.g., LocalStorage Hook, center.css"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="snippet-lang">Language</label>
              <input
                id="snippet-lang"
                type="text"
                placeholder="e.g., javascript, css, python"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="snippet-tags">Tags (comma separated)</label>
              <input
                id="snippet-tags"
                type="text"
                placeholder="e.g., hooks, storage, react"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="snippet-desc">Description</label>
            <textarea
              id="snippet-desc"
              placeholder="Brief explanation of what this snippet does..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="2"
            />
          </div>

          <div className="form-group">
            <label htmlFor="snippet-code">Code Block</label>
            <textarea
              id="snippet-code"
              className="code-textarea"
              placeholder="Paste your code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows="7"
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Save Snippet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
