import { Code2, Plus } from 'lucide-react';
import githubLogo from '../assets/github.svg';
import './Navbar.css';

export default function Navbar({ onOpenAddModal }) {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <a href="#" className="navbar-brand">
          <div className="logo-icon-wrapper">
            <Code2 size={24} />
          </div>
          <span className="brand-title">
            CodeSnippet <span className="brand-accent">Hub</span>
          </span>
        </a>

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
      </div>
    </header>
  );
}
