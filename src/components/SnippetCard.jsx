import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import './SnippetCard.css';

export default function SnippetCard({ snippet, onTagClick }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy snippet:', err);
    }
  };

  const getLanguageBadgeClass = (lang) => {
    const normalized = (lang || '').toLowerCase().trim();
    if (['javascript', 'js'].includes(normalized)) return 'badge-js';
    if (['typescript', 'ts'].includes(normalized)) return 'badge-ts';
    if (['css', 'scss', 'sass'].includes(normalized)) return 'badge-css';
    if (['html', 'xml'].includes(normalized)) return 'badge-html';
    if (['python', 'py'].includes(normalized)) return 'badge-python';
    return 'badge-default';
  };

  return (
    <article
      className="snippet-card"
      data-language={snippet.language}
      data-tags={snippet.tags?.join(' ') || ''}
    >
      <div className="snippet-window-bar">
        <div className="window-dots" aria-hidden="true">
          <span className="dot close"></span>
          <span className="dot minimize"></span>
          <span className="dot expand"></span>
        </div>
        <span className="snippet-filename" title={snippet.title}>
          {snippet.title}
        </span>
        <span className={`lang-badge ${getLanguageBadgeClass(snippet.language)}`}>
          {snippet.language.toUpperCase()}
        </span>
      </div>

      {snippet.description && (
        <div className="snippet-description">
          <p>{snippet.description}</p>
        </div>
      )}

      <div className="snippet-body">
        <pre>
          <code>{snippet.code}</code>
        </pre>
      </div>

      <div className="snippet-footer">
        <div className="meta-left">
          {snippet.tags?.map((tag, index) => (
            <button
              key={index}
              type="button"
              className="tag-chip"
              onClick={() => onTagClick && onTagClick(tag)}
              title={`Filter by tag #${tag}`}
            >
              #{tag}
            </button>
          ))}
        </div>
        <button
          type="button"
          className={`action-copy-btn ${copied ? 'copied' : ''}`}
          onClick={handleCopy}
          aria-label={copied ? 'Copied to clipboard' : 'Copy code to clipboard'}
        >
          {copied ? (
            <>
              <Check size={14} className="copy-icon" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} className="copy-icon" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}
