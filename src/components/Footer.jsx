import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-brand-block">
          <Link to="/" className="footer-brand">CodeSnippet Hub</Link>
          <p>Keep useful code close at hand.</p>
        </div>

        <nav className="footer-navigation" aria-label="Footer navigation">
          <Link to="/about">About</Link>
          <Link to="/how-it-works">How it works</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <p className="footer-copyright">Personal snippet library</p>
      </div>
    </footer>
  );
}