import React, { useMemo } from 'react';
import { Post } from './BlogPost';

interface ArchiveProps {
  posts: Post[];
  onSelectPost?: (post: Post) => void;
  onNavigate?: (page: string) => void;
}

interface PostsByYear {
  [year: string]: Post[];
}

export const Archive: React.FC<ArchiveProps> = ({
  posts,
  onSelectPost,
  onNavigate,
}) => {
  const postsByYear = useMemo(() => {
    const grouped: PostsByYear = {};

    posts.forEach((post) => {
      const year = new Date(post.date).getFullYear().toString();
      if (!grouped[year]) {
        grouped[year] = [];
      }
      grouped[year].push(post);
    });

    // Sort years in descending order
    Object.keys(grouped).forEach((year) => {
      grouped[year].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    });

    return grouped;
  }, [posts]);

  const sortedYears = Object.keys(postsByYear).sort().reverse();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <article className="archive-page">
      <button className="archive-page__back" onClick={() => onNavigate?.('home')}>
        ← Back
      </button>
      <header className="archive-page__header">
        <h1 className="archive-page__title">Archive</h1>
        <p className="archive-page__subtitle">
          {posts.length} post{posts.length !== 1 ? 's' : ''} in total
        </p>
      </header>

      <div className="archive-page__content">
        {sortedYears.length === 0 ? (
          <div className="archive-page__empty">
            <p>No posts archived yet.</p>
          </div>
        ) : (
          sortedYears.map((year) => (
            <section key={year} className="archive-page__year-section">
              <h2 className="archive-page__year-title">{year}</h2>
              <ul className="archive-page__posts-list">
                {postsByYear[year].map((post) => (
                  <li
                    key={post.id}
                    className="archive-page__post-item"
                    onClick={() => onSelectPost?.(post)}
                  >
                    <div className="archive-page__post-date">
                      {formatDate(post.date)}
                    </div>
                    <div className="archive-page__post-info">
                      <h3 className="archive-page__post-title">{post.title}</h3>
                      <p className="archive-page__post-meta">
                        {post.readTime} min read
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </div>
    </article>
  );
};
