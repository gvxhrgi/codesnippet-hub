import { useState } from 'react';
import { Copy, Check, Star, Pencil, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import CodeHighlight from './CodeHighlight';
import './SnippetCard.css';

export default function SnippetCard({
  snippet,
  onTagClick,
  onToggleFavorite,
  onEdit,
  onDelete
}) {
  const [copied, setCopied] = useState(false);
  const [isTagsExpanded, setIsTagsExpanded] = useState(false);
  const [isCodeExpanded, setIsCodeExpanded] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function getBadgeClass(lang) {
    const l = (lang || '').toLowerCase();
    if (l === 'js' || l === 'javascript') return 'badge-js';
    if (l === 'ts' || l === 'typescript') return 'badge-ts';
    if (l === 'css' || l === 'scss') return 'badge-css';
    if (l === 'html') return 'badge-html';
    if (l === 'python' || l === 'py') return 'badge-python';
    return 'badge-default';
  }

  const tags = snippet.tags || [];
  const limit = 3;
  const hasMore = tags.length > limit;
  const visibleTags = isTagsExpanded ? tags : tags.slice(0, limit);

  const linesCount = (snippet.code || '').split('\n').length;
  const isLongCode = linesCount > 8;

  return (
    <article className="snippet-card">
      <div className="snippet-window-bar">
        <div className="window-dots" aria-hidden="true">
          <span className="dot close"></span>
          <span className="dot minimize"></span>
          <span className="dot expand"></span>
        </div>

        <span className="snippet-filename" title={snippet.title}>
          {snippet.title}
        </span>

        <div className="window-right-actions">
          <button
            type="button"
            className={`star-toggle-btn ${snippet.isFavorite ? 'favorited' : ''}`}
            onClick={() => onToggleFavorite && onToggleFavorite(snippet.id)}
            title="Toggle favorite"
          >
            <Star
              size={15}
              fill={snippet.isFavorite ? '#fbbf24' : 'none'}
              stroke={snippet.isFavorite ? '#fbbf24' : '#9ca3af'}
            />
          </button>

          <span className={`lang-badge ${getBadgeClass(snippet.language)}`}>
            {snippet.language.toUpperCase()}
          </span>
        </div>
      </div>

      {snippet.description && (
        <div className="snippet-description">
          <p>{snippet.description}</p>
        </div>
      )}

      <div className={`snippet-body ${isLongCode && !isCodeExpanded ? 'collapsed' : ''}`}>
        <CodeHighlight
          key={`${snippet.language}:${snippet.code}`}
          code={snippet.code}
          language={snippet.language}
        />
        {isLongCode && !isCodeExpanded && <div className="snippet-fade-overlay" />}
      </div>

      {isLongCode && (
        <button
          type="button"
          className="code-expand-btn"
          onClick={() => setIsCodeExpanded(!isCodeExpanded)}
        >
          {isCodeExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          <span>{isCodeExpanded ? 'Show less code' : `Show more (${linesCount} lines)`}</span>
        </button>
      )}

      <div className="snippet-footer">
        <div className="meta-left">
          {visibleTags.map((tag, index) => (
            <button
              key={index}
              type="button"
              className="tag-chip"
              onClick={() => onTagClick && onTagClick(tag)}
            >
              #{tag}
            </button>
          ))}
          {hasMore && (
            <button
              type="button"
              className="tag-chip tag-more-chip"
              onClick={() => setIsTagsExpanded(!isTagsExpanded)}
            >
              {isTagsExpanded ? 'less' : `+${tags.length - limit}`}
            </button>
          )}
        </div>

        <div className="meta-right">
          <button
            type="button"
            className="action-icon-btn edit-btn"
            onClick={() => onEdit && onEdit(snippet)}
            title="Edit snippet"
          >
            <Pencil size={14} />
          </button>

          <button
            type="button"
            className="action-icon-btn delete-btn"
            onClick={() => onDelete && onDelete(snippet)}
            title="Delete snippet"
          >
            <Trash2 size={14} />
          </button>

          <button
            type="button"
            className={`action-copy-btn ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
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
      </div>
    </article>
  );
}
