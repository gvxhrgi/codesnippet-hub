import { Link } from 'react-router-dom';
import './InfoPage.css';

const pages = {
  about: {
    eyebrow: 'About the project',
    title: 'A home for reusable code',
    intro:
      'CodeSnippet Hub is a small library for collecting useful code, finding it again, and reusing it in future work.',
    sections: [
      {
        title: 'What you can do',
        body: 'Create snippets with a title, language, description, code, and tags. Search across those details, filter by language or favorites, edit entries, and copy code when you need it.'
      },
      {
        title: 'How it is built',
        body: 'The interface uses React and JavaScript, responsive CSS Grid and Flexbox layouts, Monaco Editor for code entry, and browser localStorage for persistence.'
      }
    ]
  },
  'how-it-works': {
    eyebrow: 'Guide',
    title: 'Find it. Save it. Reuse it.',
    intro:
      'The catalog keeps the common snippet tasks in one place, without an account or a server-side library.',
    sections: [
      {
        title: 'Add or edit',
        body: 'Use New Snippet to enter a title, language, and code. Title, language, and code are required; description and tags help organize the library. Existing snippets can be edited from their cards.'
      },
      {
        title: 'Search and filter',
        body: 'Search matches snippet titles, code, descriptions, and tags. Language filters and the favorites toggle can be used alongside search. Selecting a tag starts a search for that tag.'
      },
      {
        title: 'Copy and keep',
        body: 'Use the copy action on a card to copy its code. Changes to snippets and favorites are saved in this browser so they remain available after reopening the app.'
      }
    ]
  },
  privacy: {
    eyebrow: 'Privacy',
    title: 'Your snippets stay in this browser',
    intro:
      'This project has no account system or application backend. Snippet content is stored in localStorage in the browser where you use the app.',
    sections: [
      {
        title: 'What is stored',
        body: 'The app stores snippet titles, languages, descriptions, code, tags, and favorite status under the code_snippets browser storage key.'
      },
      {
        title: 'What that means',
        body: 'The app does not sync your snippets between browsers or devices. Clearing this site’s browser storage removes the saved library. Do not enter secrets or credentials into snippets.'
      },
      {
        title: 'Editor resources',
        body: 'The Monaco editor may load its editor resources over the network. The app itself does not send saved snippets to a project server.'
      }
    ]
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Get in touch through GitHub',
    intro:
      'For project questions, feedback, or issue reports, use the CodeSnippet Hub GitHub repository.',
    sections: [
      {
        title: 'Project repository',
        body: 'Browse the source code and submit project feedback through the repository.'
      }
    ],
    link: 'https://github.com/gvxhrgi/codesnippet-hub'
  },
  'not-found': {
    eyebrow: '404',
    title: 'This page is not here',
    intro: 'The address may be incorrect, or the page may have moved.',
    sections: []
  }
};

export default function InfoPage({ page }) {
  const content = pages[page] || pages['not-found'];

  return (
    <article className="info-page">
      <header className="info-page-header">
        <p className="info-page-eyebrow">{content.eyebrow}</p>
        <h1>{content.title}</h1>
        <p className="info-page-intro">{content.intro}</p>
      </header>

      {content.sections.length > 0 && (
        <div className="info-page-sections">
          {content.sections.map((section) => (
            <section className="info-page-section" key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </section>
          ))}
        </div>
      )}

      {content.link && (
        <a className="info-page-link" href={content.link} target="_blank" rel="noreferrer">
          Open the GitHub repository
        </a>
      )}

      {page === 'not-found' && (
        <Link className="info-page-link" to="/">
          Return to the snippet catalog
        </Link>
      )}
    </article>
  );
}