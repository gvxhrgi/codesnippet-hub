import { Plus, Search } from 'lucide-react';
import heroImage from '../assets/hero.webp';
import './Hero.css';

export default function Hero({ onOpenAddModal }) {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Get Your Code Snippets - <span className="highlight">Fast And Easy</span>
          </h1>
          <p className="hero-description">
            Browse, manage, and copy developer snippets instantly for your everyday projects.
          </p>
          <div className="hero-actions">
            <a href="#snippets-grid" className="btn btn-primary">
              <Search size={18} style={{ marginRight: '8px' }} />
              Browse Catalog
            </a>
            <button
              type="button"
              onClick={onOpenAddModal}
              className="btn btn-secondary"
            >
              <Plus size={18} style={{ marginRight: '8px' }} />
              Add Your Snippet
            </button>
          </div>
        </div>

        <div className="hero-visuals">
          <div className="image-wrapper">
            <img src={heroImage} alt="CodeSnippet Hub Visual" className="hero-img" />
          </div>
        </div>
      </div>
    </section>
  );
}
