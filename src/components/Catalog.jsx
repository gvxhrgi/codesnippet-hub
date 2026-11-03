import { useState } from 'react';
import { Search, X, Code2, Plus, Star } from 'lucide-react';
import SnippetCard from './SnippetCard';
import './Catalog.css';

export default function Catalog({
  snippets,
  totalSnippets,
  searchQuery,
  onSearchChange,
  selectedLanguage,
  onSelectLanguage,
  languages,
  showFavoritesOnly,
  onToggleFavoritesOnly,
  favoritesCount,
  onTagClick,
  onResetFilters,
  onOpenAddModal,
  onToggleFavorite,
  onEdit,
  onDelete
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  function formatName(lang) {
    if (lang === 'all') return 'All';
    return lang.charAt(0).toUpperCase() + lang.slice(1);
  }

  const isFiltered = Boolean(searchQuery.trim() || selectedLanguage !== 'all' || showFavoritesOnly);

  const limit = 5;
  const hasMore = languages.length > limit;
  const isSelectedHidden = !isExpanded && languages.indexOf(selectedLanguage) >= limit;
  const expanded = isExpanded || isSelectedHidden;
  const visibleLanguages = expanded ? languages : languages.slice(0, limit);

  return (
    <section className="catalog-section" id="snippets-grid">
      <div className="catalog-header">
        <div className="catalog-heading-wrap">
          <h2 className="catalog-title">Explore Snippets</h2>
          <p className="catalog-subtitle">
            Search filenames, code blocks, or filter by language and favorites
          </p>
        </div>
        <div className="catalog-counter-badge">
          Showing <strong>{snippets.length}</strong> of {totalSnippets} snippets
        </div>
      </div>

      <div className="controls-section">
        <div className="controls-container">
          <div className="search-box">
            <Search className="search-icon" size={18} aria-hidden="true" />
            <input
              type="text"
              id="catalogSearch"
              placeholder="Search filenames, tags, or code..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => onSearchChange('')}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="filter-group">
            <button
              type="button"
              className={`filter-btn favorite-toggle-btn ${showFavoritesOnly ? 'active' : ''}`}
              onClick={onToggleFavoritesOnly}
            >
              <Star
                size={14}
                fill={showFavoritesOnly ? '#fbbf24' : 'none'}
                stroke={showFavoritesOnly ? '#fbbf24' : 'currentColor'}
              />
              <span>Favorites ({favoritesCount})</span>
            </button>

            {visibleLanguages.map((lang) => (
              <button
                key={lang}
                type="button"
                className={`filter-btn ${selectedLanguage === lang ? 'active' : ''}`}
                onClick={() => onSelectLanguage(lang)}
              >
                {formatName(lang)}
              </button>
            ))}

            {hasMore && (
              <button
                type="button"
                className="filter-btn more-btn"
                onClick={() => setIsExpanded(!expanded)}
              >
                {expanded ? 'Show less' : `+${languages.length - limit} more`}
              </button>
            )}
          </div>
        </div>
      </div>

      {snippets.length > 0 ? (
        <div className="snippets-grid">
          {snippets.map((snippet) => (
            <SnippetCard
              key={snippet.id}
              snippet={snippet}
              onTagClick={onTagClick}
              onToggleFavorite={onToggleFavorite}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon-wrap">
            {showFavoritesOnly ? <Star size={36} color="#fbbf24" /> : <Code2 size={36} />}
          </div>
          <h3 className="empty-title">
            {showFavoritesOnly ? 'No favorite snippets found' : 'No snippets found'}
          </h3>
          <p className="empty-description">
            {showFavoritesOnly
              ? "You haven't added any snippets to your favorites yet. Click the star icon on any snippet card to save it here!"
              : isFiltered
              ? `No snippet matches "${searchQuery}".`
              : 'There are no snippets in your library yet.'}
          </p>
          <div className="empty-actions">
            {isFiltered && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onResetFilters}
              >
                Clear Filters
              </button>
            )}
            <button
              type="button"
              className="btn btn-primary"
              onClick={onOpenAddModal}
            >
              <Plus size={18} style={{ marginRight: '6px' }} />
              Add Snippet
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
