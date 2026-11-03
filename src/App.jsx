import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import AddSnippetModal from './components/AddSnippetModal';
import { initialSnippets } from './data/initialSnippets';

function App() {
  const [snippets, setSnippets] = useState(() => {
    try {
      const saved = localStorage.getItem('code_snippets');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse saved snippets:', e);
    }
    return initialSnippets;
  });

  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('code_snippets', JSON.stringify(snippets));
    } catch (e) {
      console.error('Failed to save snippets to localStorage:', e);
    }
  }, [snippets]);

  const handleAddSnippet = (newSnippet) => {
    setSnippets((prev) => [newSnippet, ...prev]);
  };

  const handleTagClick = (tag) => {
    setSearchQuery(tag);
    setSelectedLanguage('all');
    const catalogElement = document.getElementById('snippets-grid');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetFilters = () => {
    setSelectedLanguage('all');
    setSearchQuery('');
  };

  const languages = ['all', ...new Set(snippets.map((s) => s.language.toLowerCase()))];

  const query = searchQuery.trim().toLowerCase();
  const filteredSnippets = snippets.filter((snippet) => {
    const matchesLang =
      selectedLanguage === 'all' || snippet.language.toLowerCase() === selectedLanguage;
    
    if (!matchesLang) return false;
    if (!query) return true;

    const matchesTitle = snippet.title?.toLowerCase().includes(query);
    const matchesCode = snippet.code?.toLowerCase().includes(query);
    const matchesDesc = snippet.description?.toLowerCase().includes(query);
    const matchesTags = snippet.tags?.some((t) => t.toLowerCase().includes(query));

    return Boolean(matchesTitle || matchesCode || matchesDesc || matchesTags);
  });

  return (
    <div className="app">
      <Navbar onOpenAddModal={() => setIsModalOpen(true)} />
      <Hero onOpenAddModal={() => setIsModalOpen(true)} />

      <Catalog
        snippets={filteredSnippets}
        totalSnippets={snippets.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
        languages={languages}
        onTagClick={handleTagClick}
        onResetFilters={handleResetFilters}
        onOpenAddModal={() => setIsModalOpen(true)}
      />

      <AddSnippetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddSnippet={handleAddSnippet}
      />
    </div>
  );
}

export default App;
