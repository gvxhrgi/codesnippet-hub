import { lazy, Suspense, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Footer from './components/Footer';
import InfoPage from './components/InfoPage';
import { Route, Routes } from 'react-router-dom';
import { initialSnippets } from './data/initialSnippets';

const AddSnippetModal = lazy(() => import('./components/AddSnippetModal'));

function App() {
  const [snippets, setSnippets] = useState(() => {
    const saved = localStorage.getItem('code_snippets');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch {
        return initialSnippets;
      }
    }
    return initialSnippets;
  });

  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null);
  const [deletingSnippet, setDeletingSnippet] = useState(null);

  useEffect(() => {
    localStorage.setItem('code_snippets', JSON.stringify(snippets));
  }, [snippets]);

  function handleOpenAddModal() {
    setEditingSnippet(null);
    setIsModalOpen(true);
  }

  function handleOpenEditModal(snippet) {
    setEditingSnippet(snippet);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setEditingSnippet(null);
  }

  function handleSaveSnippet(snippet) {
    if (editingSnippet) {
      setSnippets(snippets.map((s) => (s.id === snippet.id ? snippet : s)));
    } else {
      setSnippets([snippet, ...snippets]);
    }
  }

  function handleToggleFavorite(snippetId) {
    setSnippets(
      snippets.map((s) =>
        s.id === snippetId ? { ...s, isFavorite: !s.isFavorite } : s
      )
    );
  }

  function handleConfirmDelete(snippetId) {
    setSnippets(snippets.filter((s) => s.id !== snippetId));
    setDeletingSnippet(null);
  }

  function handleTagClick(tag) {
    setSearchQuery(tag);
    setSelectedLanguage('all');
    setShowFavoritesOnly(false);
    const element = document.getElementById('snippets-grid');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function handleResetFilters() {
    setSelectedLanguage('all');
    setSearchQuery('');
    setShowFavoritesOnly(false);
  }

  const favoritesCount = snippets.filter((s) => s.isFavorite).length;
  const languages = ['all', ...new Set(snippets.map((s) => s.language.toLowerCase()))];

  const query = searchQuery.trim().toLowerCase();
  const filteredSnippets = snippets.filter((snippet) => {
    if (showFavoritesOnly && !snippet.isFavorite) {
      return false;
    }

    const matchesLang =
      selectedLanguage === 'all' || snippet.language.toLowerCase() === selectedLanguage;
    if (!matchesLang) return false;

    if (!query) return true;

    const matchesTitle = snippet.title && snippet.title.toLowerCase().includes(query);
    const matchesCode = snippet.code && snippet.code.toLowerCase().includes(query);
    const matchesDesc = snippet.description && snippet.description.toLowerCase().includes(query);
    const matchesTags = snippet.tags && snippet.tags.some((t) => t.toLowerCase().includes(query));

    return Boolean(matchesTitle || matchesCode || matchesDesc || matchesTags);
  });

  return (
    <div className="app">
      <Navbar onOpenAddModal={handleOpenAddModal} />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero onOpenAddModal={handleOpenAddModal} />
                <Catalog
                  snippets={filteredSnippets}
                  totalSnippets={snippets.length}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedLanguage={selectedLanguage}
                  onSelectLanguage={setSelectedLanguage}
                  languages={languages}
                  showFavoritesOnly={showFavoritesOnly}
                  onToggleFavoritesOnly={() => setShowFavoritesOnly(!showFavoritesOnly)}
                  favoritesCount={favoritesCount}
                  onTagClick={handleTagClick}
                  onResetFilters={handleResetFilters}
                  onOpenAddModal={handleOpenAddModal}
                  onToggleFavorite={handleToggleFavorite}
                  onEdit={handleOpenEditModal}
                  onDelete={(snippet) => setDeletingSnippet(snippet)}
                />
              </>
            }
          />
          <Route path="/about" element={<InfoPage page="about" />} />
          <Route path="/how-it-works" element={<InfoPage page="how-it-works" />} />
          <Route path="/privacy" element={<InfoPage page="privacy" />} />
          <Route path="/contact" element={<InfoPage page="contact" />} />
          <Route path="*" element={<InfoPage page="not-found" />} />
        </Routes>
      </main>

      <Footer />

      {isModalOpen && (
        <Suspense fallback={null}>
          <AddSnippetModal
            key={editingSnippet ? editingSnippet.id : 'new'}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSaveSnippet={handleSaveSnippet}
            editingSnippet={editingSnippet}
          />
        </Suspense>
      )}

      <DeleteConfirmModal
        isOpen={Boolean(deletingSnippet)}
        snippet={deletingSnippet}
        onClose={() => setDeletingSnippet(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default App;
