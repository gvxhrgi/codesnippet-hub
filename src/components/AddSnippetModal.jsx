import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Editor, { useMonaco } from '@monaco-editor/react';
import { resolveLanguage, getLanguagesList } from '../utils/monacoLanguages';
import './AddSnippetModal.css';

export default function AddSnippetModal({ isOpen, onClose, onSaveSnippet, editingSnippet }) {
  const monaco = useMonaco();
  const [title, setTitle] = useState(editingSnippet?.title || '');
  const [language, setLanguage] = useState(editingSnippet?.language || 'javascript');
  const [description, setDescription] = useState(editingSnippet?.description || '');
  const [code, setCode] = useState(editingSnippet?.code || '');
  const [tagsInput, setTagsInput] = useState(
    editingSnippet?.tags ? editingSnippet.tags.join(', ') : ''
  );
  const [errors, setErrors] = useState({});

  const isEditing = Boolean(editingSnippet);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function validate() {
    const errs = {};

    if (!title.trim()) {
      errs.title = 'Title is required';
    } else if (title.trim().length < 3) {
      errs.title = 'Title must be at least 3 characters';
    }

    if (!language.trim()) {
      errs.language = 'Language is required';
    }

    if (!code.trim()) {
      errs.code = 'Code cannot be empty';
    }

    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    let tags = [language.toLowerCase().trim()];
    if (tagsInput.trim()) {
      tags = tagsInput.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean);
    }

    const snippet = {
      id: isEditing ? editingSnippet.id : Date.now().toString(),
      title: title.trim(),
      language: language.toLowerCase().trim(),
      description: description.trim(),
      code: code,
      tags: tags,
      isFavorite: isEditing ? Boolean(editingSnippet.isFavorite) : false
    };

    onSaveSnippet(snippet);
    onClose();
  }

  const monacoLanguage = resolveLanguage(language, monaco);
  const availableLanguages = getLanguagesList(monaco);

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEditing ? 'Edit Code Snippet' : 'Add New Code Snippet'}</h2>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form" noValidate>
          <div className="form-group">
            <label htmlFor="snippet-title">Snippet Title / Filename</label>
            <input
              id="snippet-title"
              type="text"
              className={errors.title ? 'input-error' : ''}
              placeholder="e.g., LocalStorage Hook, center.css, script.py"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors({ ...errors, title: '' });
              }}
              autoFocus
            />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="snippet-lang">Language / Extension</label>
              <input
                id="snippet-lang"
                type="text"
                list="monaco-languages-list"
                className={errors.language ? 'input-error' : ''}
                placeholder="e.g., js, py, css, rust, dockerfile"
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                  if (errors.language) setErrors({ ...errors, language: '' });
                }}
              />
              <datalist id="monaco-languages-list">
                {availableLanguages.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.name}
                  </option>
                ))}
              </datalist>
              {errors.language && <span className="error-text">{errors.language}</span>}
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
            <label htmlFor="snippet-desc">Description (optional)</label>
            <textarea
              id="snippet-desc"
              placeholder="Brief explanation of what this snippet does..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="2"
            />
          </div>

          <div className="form-group">
            <div className="code-label-row">
              <label>Code Block (Monaco Editor)</label>
              <span className="editor-lang-badge">
                Mode: <strong>{monacoLanguage}</strong>
              </span>
            </div>
            <div className={`monaco-editor-wrapper ${errors.code ? 'input-error' : ''}`}>
              <Editor
                height="220px"
                language={monacoLanguage}
                value={code}
                onChange={(value) => {
                  setCode(value || '');
                  if (errors.code) setErrors({ ...errors, code: '' });
                }}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  fontSize: 13,
                  fontFamily: "'Fira Code', 'Courier New', monospace",
                  automaticLayout: true,
                  tabSize: 2,
                  wordWrap: 'on',
                  padding: { top: 8, bottom: 8 }
                }}
                loading={
                  <div className="monaco-loading-placeholder">
                    Loading Editor...
                  </div>
                }
              />
            </div>
            {errors.code && <span className="error-text">{errors.code}</span>}
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {isEditing ? 'Save Changes' : 'Save Snippet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
