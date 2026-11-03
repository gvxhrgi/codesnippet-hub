# Code Snippet Hub

A React app for collecting, searching, filtering, favoriting, editing, and copying code snippets. Snippets are saved in browser `localStorage` and restored the next time the app opens.

## How It Works

```mermaid
flowchart TD
	A[Open app] --> B{Saved snippets in localStorage?}
	B -->|Yes| C[Load saved snippets]
	B -->|No or invalid| D[Load example snippets]
	C --> E[App state]
	D --> E
	E --> F[Filter by search, language, or favorites]
	F --> G[Catalog displays matching snippets]
	G --> H[Snippet cards]
	H --> I[Copy code]
	H --> J[Toggle favorite]
	H --> K[Click tag to search]
	H --> L[Edit snippet]
	H --> M[Request deletion]
	E --> N[Add snippet]
	N --> O[Validate details and code in editor]
	O -->|Valid| P[Add or update snippet]
	M --> Q{Confirm deletion?}
	Q -->|Yes| R[Remove snippet]
	Q -->|No| E
	J --> S[Update app state]
	K --> F
	L --> O
	P --> T[Save updated list to localStorage]
	R --> T
	S --> T
	T --> E
```

The app starts with saved browser data when available, otherwise it uses the examples in `src/data/initialSnippets.js`. Add and edit share a validated form with a Monaco code editor. Any change to the snippet list is written back to `localStorage`.

## Run Locally

```bash
npm install
npm run dev
```

To create a production build, run `npm run build`.
