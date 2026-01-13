import React from 'react';
import { Post, BlogPostCard } from './BlogPost';

interface BlogListProps {
  posts: Post[];
  onSelectPost?: (post: Post) => void;
  isLoading?: boolean;
}

export const BlogList: React.FC<BlogListProps> = ({
  posts,
  onSelectPost,
  isLoading = false,
}) => {
  if (isLoading) {
    return <div className="blog-list__loading">Loading posts...</div>;
  }

  if (posts.length === 0) {
    return (
      <div className="blog-list__empty">
        <p>No posts yet. Stay tuned!</p>
      </div>
    );
  }

  return (
    <div className="blog-list">
      {posts.map((post) => (
        <BlogPostCard
          key={post.id}
          post={post}
          onClick={onSelectPost}
        />
      ))}
    </div>
  );
};
