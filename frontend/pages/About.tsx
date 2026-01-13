import React from 'react';

interface AboutProps {
  onNavigate?: (page: string) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <article className="about-page">
      <button className="about-page__back" onClick={() => onNavigate?.('home')}>← Back</button>
      <header className="about-page__header">
        <h1 className="about-page__title">About ZeroBlog</h1>
      </header>
      <div className="about-page__content">
        <section className="about-page__section">
          <h2 className="about-page__heading">What is ZeroBlog?</h2>
          <p>
            ZeroBlog is a minimal, elegant blogging platform built with modern web technologies.
            We believe in simplicity, clean design, and fast performance.
          </p>
          <p>
            This project demonstrates how to build a scalable, multi-tenant blog system with
            role-based access control (RBAC), combining the power of Go's Fiber framework on
            the backend with React for a responsive frontend.
          </p>
        </section>

        <section className="about-page__section">
          <h2 className="about-page__heading">Technology Stack</h2>
          <ul className="about-page__list">
            <li><strong>Backend:</strong> Go with Fiber web framework</li>
            <li><strong>Frontend:</strong> React with TypeScript</li>
            <li><strong>Build Tool:</strong> esbuild for fast bundling</li>
            <li><strong>Styling:</strong> SCSS with a minimalist black and white theme</li>
            <li><strong>Architecture:</strong> Component-based, modular design</li>
          </ul>
        </section>

        <section className="about-page__section">
          <h2 className="about-page__heading">Features</h2>
          <ul className="about-page__list">
            <li>Clean, minimal user interface</li>
            <li>Fast server-side rendering with Go</li>
            <li>Responsive design for all devices</li>
            <li>Multi-tenant support (coming soon)</li>
            <li>Role-based access control (coming soon)</li>
            <li>Full-text search (planned)</li>
          </ul>
        </section>

        <section className="about-page__section">
          <h2 className="about-page__heading">Author</h2>
          <p>
            Built by <strong>Adeel</strong> as a demonstration of full-stack web development
            with Go and React. This project showcases best practices in architecture, performance,
            and user experience.
          </p>
        </section>

        <section className="about-page__section">
          <h2 className="about-page__heading">Get Started</h2>
          <p>
            To run ZeroBlog locally, clone the repository and follow the setup instructions in the README.
            The development environment supports hot-reloading for both backend and frontend, making it
            easy to iterate quickly.
          </p>
        </section>
      </div>
    </article>
  );
};
