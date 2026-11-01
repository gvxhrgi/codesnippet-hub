import React from 'react';
import './SnippetCard.css';

export default function SnippetCard({ snippet }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
  };

  return (
    <article 
      className="snippet-card" 
      data-language={snippet.language} 
      data-tags={snippet.tags.join(' ')}
    >
      <div className="snippet-window-bar">
        <div className="window-dots">
          <span className="dot close"></span>
          <span className="dot minimize"></span>
          <span className="dot expand"></span>
        </div>
        <span className="snippet-filename">{snippet.title}</span>
        <span className={`lang-badge badge-${snippet.language}`}>
          {snippet.language.toUpperCase()}
        </span>
      </div>

      <div className="snippet-body">
        <pre>
          <code>{snippet.code}</code>
        </pre>
      </div>

      <div className="snippet-footer">
        <div className="meta-left">
          {snippet.tags.map((tag, index) => (
            <span key={index} className="tag-chip">#{tag}</span>
          ))}
        </div>
        <button className="action-copy-btn" onClick={handleCopy}>
          Copy
        </button>
      </div>
    </article>
  );
}