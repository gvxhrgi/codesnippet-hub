import { Code2, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import githubLogo from '../assets/github.svg';
import './Navbar.css';

export default function Navbar({ onOpenAddModal }) {
  return (
    <header className="navbar">
      <nav className="navbar-container" aria-label="Primary navigation">
        <Link to="/" className="navbar-brand" aria-label="CodeSnippet Hub home">
          <div className="logo-icon-wrapper">
            <Code2 size={24} />
          </div>
          <span className="brand-title">
            CodeSnippet <span className="brand-accent">Hub</span>
          </span>
        </Link>

        <div className="navbar-actions">
          <a
            href="https://github.com/gvxhrgi/codesnippet-hub"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link-github"
            aria-label="GitHub Repository"
          >
            <img
              src={githubLogo}
              alt=""
              width="18"
              height="18"
              style={{ filter: 'brightness(0) invert(1)', opacity: 0.85 }}
            />
            <span className="github-text">GitHub</span>
          </a>

          <button
            type="button"
            onClick={onOpenAddModal}
            className="navbar-add-btn"
          >
            <Plus size={18} />
            <span>New Snippet</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
