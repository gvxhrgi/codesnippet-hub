import { Search, X, Code2, Plus } from 'lucide-react';
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
  onTagClick,
  onResetFilters,
  onOpenAddModal
}) {
  const formatLangName = (lang) => {
    if (lang === 'all') return 'All';
    if (lang === 'javascript') return 'JavaScript';
    if (lang === 'typescript') return 'TypeScript';
    if (lang === 'css') return 'CSS';
    if (lang === 'html') return 'HTML';
    if (lang === 'python') return 'Python';
    if (lang === 'sql') return 'SQL';
    return lang.charAt(0).toUpperCase() + lang.slice(1);
  };

  const isFiltered = Boolean(searchQuery.trim() || selectedLanguage !== 'all');

  return (
    <section className="catalog-section" id="snippets-grid">
      <div className="catalog-header">
        <div className="catalog-heading-wrap">
          <h2 className="catalog-title">Explore Snippets</h2>
          <p className="catalog-subtitle">
            Search across filenames, code blocks, or filter by your preferred language
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
              aria-label="Search code snippets"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => onSearchChange('')}
                aria-label="Clear search query"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="filter-group" role="tablist" aria-label="Filter snippets by programming language">
            {languages.map((lang) => (
              <button
                key={lang}
                type="button"
                role="tab"
                aria-selected={selectedLanguage === lang}
                className={`filter-btn ${selectedLanguage === lang ? 'active' : ''}`}
                onClick={() => onSelectLanguage(lang)}
              >
                {formatLangName(lang)}
              </button>
            ))}
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
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon-wrap">
            <Code2 size={36} />
          </div>
          <h3 className="empty-title">No snippets found</h3>
          <p className="empty-description">
            {isFiltered
              ? `No snippet matches "${searchQuery}" in ${selectedLanguage === 'all' ? 'any language' : formatLangName(selectedLanguage)}.`
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
              Add First Snippet
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
