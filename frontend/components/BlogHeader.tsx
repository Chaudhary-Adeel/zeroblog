import React from 'react';

interface BlogHeaderProps {
  title?: string;
  onNavigate?: (page: string) => void;
}

export const BlogHeader: React.FC<BlogHeaderProps> = ({ 
  title = 'ZeroBlog',
  onNavigate,
}) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, page: string) => {
    e.preventDefault();
    onNavigate?.(page);
  };

  return (
    <header className="blog-header">
      <div className="blog-header__container">
        <div className="blog-header__content">
          <h1 className="blog-header__title">{title}</h1>
          <p className="blog-header__subtitle">Minimal. Clean. Thoughts.</p>
        </div>
        <nav className="blog-header__nav">
          <ul className="blog-header__nav-list">
            <li><a href="/" className="blog-header__nav-link" onClick={(e) => handleNavClick(e, 'home')}>Home</a></li>
            <li><a href="/about" className="blog-header__nav-link" onClick={(e) => handleNavClick(e, 'about')}>About</a></li>
            <li><a href="/archive" className="blog-header__nav-link" onClick={(e) => handleNavClick(e, 'archive')}>Archive</a></li>
            <li><a href="/settings" className="blog-header__nav-link" onClick={(e) => handleNavClick(e, 'settings')}>Settings</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
