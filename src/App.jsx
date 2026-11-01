import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import AddSnippetModal from './components/AddSnippetModal'
import { initialSnippets } from './data/initialSnippets';


function App() {
  const [snippets, setSnippets] = useState(() => {
    const saved = localStorage.getItem('code_snippets');
    return saved ? JSON.parse(saved) : initialSnippets;
  });

  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('code_snippets', JSON.stringify(snippets));
  }, [snippets]);

  const handleAddSnippet = (newSnippet) => {
    setSnippets([newSnippet, ...snippets]);
  };

  const languages = ['all', ...new Set(snippets.map(s => s.language.toLowerCase()))];

  const filteredSnippets = snippets.filter(snippet => {
    const matchesLang = selectedLanguage === 'all' || snippet.language.toLowerCase() === selectedLanguage;
    const matchesSearch = snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesLang && matchesSearch;
  });


  return (
    <div className="app">
      <Hero onOpenAddModal={() => setIsModalOpen(true)} />

      <AddSnippetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddSnippet={handleAddSnippet}
      />
    </div>
  )
}

export default App
