export const initialSnippets = [
  {
    id: '1',
    title: 'hero-section.css',
    language: 'css',
    description: 'Quickly layout a two-column responsive grid.',
    code: `.hero-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 2rem;\n}`,
    tags: ['layout', 'grid', 'css']
  },
  {
    id: '2',
    title: 'fetch-api.js',
    language: 'javascript',
    description: 'Clean error-handled fetch request template.',
    code: `async function getData(url) {\n  const res = await fetch(url);\n  return await res.json();\n}`,
    tags: ['javascript', 'api', 'async']
  }
];