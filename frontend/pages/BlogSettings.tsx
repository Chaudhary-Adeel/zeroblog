import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const BlogSettings: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  const { currentTenant, logout } = useAuth();
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');
  const [published, setPublished] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call API to create post
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setTitle('');
      setExcerpt('');
      setContent('');
    }, 2000);
  };

  const handleLogout = () => {
    logout();
    onNavigate?.('login');
  };

  if (!currentTenant) {
    return (
      <div className="blog-settings">
        <div className="blog-settings__error">
          <p>No tenant selected. Please select a blog.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-settings">
      <header className="blog-settings__header">
        <div className="blog-settings__header-content">
          <h1 className="blog-settings__title">Dashboard</h1>
          <p className="blog-settings__subtitle">{currentTenant.name}</p>
        </div>
        <button className="blog-settings__logout" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main className="blog-settings__main">
        <div className="blog-settings__container">
          <section className="blog-settings__section">
            <h2 className="blog-settings__section-title">Create New Post</h2>

            <form className="blog-settings__form" onSubmit={handleSubmit}>
              {success && (
                <div className="blog-settings__success">
                  Post saved successfully!
                </div>
              )}

              <div className="blog-settings__form-group">
                <label className="blog-settings__label">Title</label>
                <input
                  type="text"
                  className="blog-settings__input"
                  placeholder="Post title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="blog-settings__form-group">
                <label className="blog-settings__label">Excerpt</label>
                <input
                  type="text"
                  className="blog-settings__input"
                  placeholder="Brief summary..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                />
              </div>

              <div className="blog-settings__form-group">
                <label className="blog-settings__label">Content</label>
                <textarea
                  className="blog-settings__textarea"
                  placeholder="Write your post here..."
                  rows={10}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>

              <div className="blog-settings__form-row">
                <div className="blog-settings__form-group">
                  <label className="blog-settings__label">Category</label>
                  <select
                    className="blog-settings__select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="general">General</option>
                    <option value="tech">Tech</option>
                    <option value="lifestyle">Lifestyle</option>
                    <option value="business">Business</option>
                  </select>
                </div>

                <div className="blog-settings__form-group">
                  <label className="blog-settings__checkbox-label">
                    <input
                      type="checkbox"
                      className="blog-settings__checkbox"
                      checked={published}
                      onChange={(e) => setPublished(e.target.checked)}
                    />
                    Publish immediately
                  </label>
                </div>
              </div>

              <button type="submit" className="blog-settings__button">
                Save Post
              </button>
            </form>
          </section>

          <aside className="blog-settings__sidebar">
            <div className="blog-settings__widget">
              <h3 className="blog-settings__widget-title">Blog Info</h3>
              <div className="blog-settings__widget-content">
                <p><strong>Blog Name:</strong> {currentTenant.name}</p>
                <p><strong>Slug:</strong> {currentTenant.slug}</p>
                {currentTenant.description && (
                  <p><strong>Description:</strong> {currentTenant.description}</p>
                )}
              </div>
            </div>

            <div className="blog-settings__widget">
              <h3 className="blog-settings__widget-title">Quick Stats</h3>
              <div className="blog-settings__widget-content">
                <p>Posts: <strong>0</strong></p>
                <p>Views: <strong>0</strong></p>
                <p>Comments: <strong>0</strong></p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};
