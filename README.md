# CodeSnippet Hub

CodeSnippet Hub არის რესპონსიული ბრაუზერზე დაფუძნებული ბიბლიოთეკა სადაც მომხმარებელს შეუძლია შეინახოს, გააზიაროს, მოძებნოს, ფავორიტებში დაამატოს კოდი.

**Repository:** [github.com/gvxhrgi/codesnippet-hub](https://github.com/gvxhrgi/codesnippet-hub)
**Google Slides:** [Link](https://docs.google.com/presentation/d/1L0SMdSlLzon-DDjLruLSUrXK_jV8Iq6FYiA2sz3Q86A/edit?slide=id.p1#slide=id.p1)

## Features

- შექმენით და დაარედაქტირეთ ჩანაწერები მოქნილი ინტერფეისით და Syntax Highlight-ით.
- მოძებნეთ ჩანაწერები სათაურის, კოდის, აღწერილობის და ტეგების მიხედვით.
- გაფილტრეთ ენების და ფავორიტების მიხედვით.
- დაამატეთ ჩანაწერები ფავორიტებში, შემდეგ ერთი დაჭერით დააკოპირეთ ის.
- დამადასტურებელი Modal წაშლის წინ.
- შეინახე ჩანაწერები ბიბლიოთეკაში `localStorage` დახმარებით.
- რესპონსიული ვებგვერდი Desktop, Tablet და Mobile ეკრანებისთვის.
- Monaco Editor ოპტიმიზაციის გამო ირთვება მხოლოდ მაშინ როდესაც ამატებთ ან არედაქტირებთ ჩანაწერს

## Getting Started

### Requirements

- Node.js
- npm

### Install and run

```bash
npm ci
npm run dev
```

### Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run lint` | Run ESLint |
| `npm run build` | Create the optimized production build in `dist/` |
| `npm run preview` | Preview the production build locally |

## Pages

| Path | Description |
| --- | --- |
| `/` | Snippet catalog and search |
| `/about` | Project overview |
| `/how-it-works` | Feature guide |
| `/privacy` | Browser storage and privacy details |
| `/contact` | Link to the GitHub repository |

ვებ-გვერდი ასევე აღიქვამს საზიებოში არასწორად ჩაწერილ გვერდის მისამართს და აბრუნებს Page Not Found გვერდს.

## How It Works

```mermaid
flowchart TD
  A[Open app] --> B[Load React app and BrowserRouter]
  B --> C[Read code_snippets from localStorage]
  C --> D{Saved value is a non-empty array?}
  D -->|Yes| E[Use saved snippets]
  D -->|No or invalid JSON| F[Use initial snippets]
  E --> G[App state]
  F --> G
  G --> H[Render shared header and primary navigation]
  G --> I{Current URL route}
  I -->|/| J[Home: Hero and catalog]
  I -->|Info route| K[About, guide, privacy, or contact page]
  I -->|Unknown route| L[Not-found page]
  J --> M[Search and language or favorite filters]
  M --> N[Match title, code, description, tags, language, and favorite status]
  N --> O[Render matching snippet cards]
  O --> P[Copy code to clipboard]
  O --> Q[Toggle favorite]
  O --> R[Select a tag]
  R --> S[Search tag, reset other filters, and scroll to catalog]
  S --> M
  O --> T[Edit snippet]
  H -->|New Snippet| U[Open Add form]
  T --> V[Open Edit form with current values]
  U --> W[Lazy-load form and Monaco Editor]
  V --> W
  W -->|Cancel, close, or Escape| G
  W --> X{Required fields valid?}
  X -->|No| Y[Show validation errors]
  Y --> W
  X -->|Valid: add| Z[Create snippet]
  X -->|Valid: edit| AA[Update snippet and preserve favorite status]
  Z --> AB[Update snippets state]
  AA --> AB
  O -->|Delete| AC[Open delete confirmation]
  AC --> AD{Confirm deletion?}
  AD -->|Yes| AE[Remove snippet]
  AD -->|No| O
  Q --> AB
  AE --> AB
  AB --> AF[Save snippets to localStorage]
  AF --> G
  H --> AG[Footer navigation]
  AG -->|Information page link| I
  H --> AH[Open GitHub repository]
```

## Project Structure

```text
src/
  components/   Page, catalog, card, navigation, and modal components
  data/         Initial example snippets
  utils/        Monaco language mapping
  App.jsx       App routes, state, filtering, and persistence
  main.jsx      React entry point and router setup
public/         Static assets served directly
```
