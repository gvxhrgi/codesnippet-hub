export function resolveLanguage(lang, monaco) {
  if (!lang) return 'plaintext';
  if (!monaco || !monaco.languages) return lang.toLowerCase().trim();

  const query = lang.trim().toLowerCase();
  const allLanguages = monaco.languages.getLanguages();

  for (const item of allLanguages) {
    if (item.id.toLowerCase() === query) {
      return item.id;
    }
    if (item.aliases && item.aliases.some((a) => a.toLowerCase() === query)) {
      return item.id;
    }
    if (
      item.extensions &&
      item.extensions.some(
        (ext) => ext.toLowerCase() === query || ext.toLowerCase() === '.' + query
      )
    ) {
      return item.id;
    }
  }

  return query;
}

export function getLanguagesList(monaco) {
  if (!monaco || !monaco.languages) return [];
  return monaco.languages.getLanguages().map((l) => ({
    id: l.id,
    name: (l.aliases && l.aliases[0]) || l.id
  }));
}
