import React from 'react';

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: number;
  slug: string;
}

interface BlogPostProps {
  post: Post;
  onClick?: (post: Post) => void;
}

export const BlogPostCard: React.FC<BlogPostProps> = ({ post, onClick }) => {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article 
      className="blog-post-card"
      onClick={() => onClick?.(post)}
    >
      <div className="blog-post-card__header">
        <h2 className="blog-post-card__title">{post.title}</h2>
        <div className="blog-post-card__meta">
          <span className="blog-post-card__date">{formattedDate}</span>
          <span className="blog-post-card__separator">•</span>
          <span className="blog-post-card__read-time">{post.readTime} min read</span>
        </div>
      </div>
      <p className="blog-post-card__excerpt">{post.excerpt}</p>
      <div className="blog-post-card__footer">
        <span className="blog-post-card__author">By {post.author}</span>
        <span className="blog-post-card__link">Read More →</span>
      </div>
    </article>
  );
};

interface BlogPostDetailProps {
  post: Post;
  onBack?: () => void;
}

export const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ post, onBack }) => {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="blog-post-detail">
      <button className="blog-post-detail__back" onClick={onBack}>← Back</button>
      <header className="blog-post-detail__header">
        <h1 className="blog-post-detail__title">{post.title}</h1>
        <div className="blog-post-detail__meta">
          <span className="blog-post-detail__author">By {post.author}</span>
          <span className="blog-post-detail__separator">•</span>
          <span className="blog-post-detail__date">{formattedDate}</span>
          <span className="blog-post-detail__separator">•</span>
          <span className="blog-post-detail__read-time">{post.readTime} min read</span>
        </div>
      </header>
      <div className="blog-post-detail__content">
        {post.content}
      </div>
    </article>
  );
};
