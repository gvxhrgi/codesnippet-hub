export const initialSnippets = [
  {
    id: '1',
    title: 'hero-section.css',
    language: 'css',
    description: 'Quickly layout a two-column responsive grid with gap.',
    code: `.hero-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 2rem;\n  align-items: center;\n}`,
    tags: ['layout', 'grid', 'css', 'responsive']
  },
  {
    id: '2',
    title: 'fetch-api.js',
    language: 'javascript',
    description: 'Clean error-handled fetch request template with JSON parsing.',
    code: `async function getData(url) {\n  try {\n    const res = await fetch(url);\n    if (!res.ok) throw new Error(\`HTTP error! status: \${res.status}\`);\n    return await res.json();\n  } catch (err) {\n    console.error('Fetch failed:', err);\n    throw err;\n  }\n}`,
    tags: ['javascript', 'api', 'async', 'fetch']
  },
  {
    id: '3',
    title: 'use-debounce.ts',
    language: 'typescript',
    description: 'Debounce value hook in React for search inputs and rapid events.',
    code: `import { useState, useEffect } from 'react';\n\nexport function useDebounce<T>(value: T, delay: number = 300): T {\n  const [debouncedValue, setDebouncedValue] = useState<T>(value);\n\n  useEffect(() => {\n    const timer = setTimeout(() => setDebouncedValue(value), delay);\n    return () => clearTimeout(timer);\n  }, [value, delay]);\n\n  return debouncedValue;\n}`,
    tags: ['react', 'hooks', 'typescript', 'performance']
  },
  {
    id: '4',
    title: 'center-absolute.css',
    language: 'css',
    description: 'Perfect absolute centering using modern translate property.',
    code: `.center-absolute {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  translate: -50% -50%;\n}`,
    tags: ['css', 'layout', 'centering']
  },
  {
    id: '5',
    title: 'read-json-file.py',
    language: 'python',
    description: 'Safely read and parse a JSON file with automatic context closure.',
    code: `import json\nfrom pathlib import Path\n\ndef load_json(filepath: str) -> dict:\n    path = Path(filepath)\n    if not path.is_file():\n        raise FileNotFoundError(f"File not found: {filepath}")\n    with open(path, 'r', encoding='utf-8') as f:\n        return json.load(f)`,
    tags: ['python', 'json', 'io', 'files']
  }
];