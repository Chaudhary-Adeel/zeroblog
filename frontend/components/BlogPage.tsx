import React, { useState } from 'react';
import { BlogHeader } from './BlogHeader';
import { BlogList } from './BlogList';
import { BlogPostDetail, Post } from './BlogPost';
import { About } from '../pages/About';
import { Archive } from '../pages/Archive';

// Sample posts (replace with API calls)
const SAMPLE_POSTS: Post[] = [
  {
    id: '1',
    title: 'Getting Started with React and Go',
    excerpt: 'Learn how to build a modern full-stack application using React and Go with Fiber framework.',
    content: `React and Go are a powerful combination for building modern web applications. 
    React provides a declarative UI framework, while Go offers high performance on the backend.
    
    In this post, we'll explore how to set up a project using Fiber as the web framework and React for the frontend.
    
    Key benefits:
    - Fast compilation and execution with Go
    - Excellent performance characteristics
    - Easy state management with React hooks
    - Type safety with TypeScript`,
    author: 'Adeel',
    date: '2026-01-13',
    readTime: 5,
    slug: 'react-go-setup',
  },
  {
    id: '2',
    title: 'Understanding Component Architecture',
    excerpt: 'Deep dive into building scalable component-based architectures in React.',
    content: `Component architecture is the foundation of any scalable React application.
    
    When designing components, consider:
    - Single Responsibility Principle
    - Props composition
    - Component reusability
    - Separation of concerns
    
    This approach makes your codebase maintainable and testable.`,
    author: 'Adeel',
    date: '2026-01-12',
    readTime: 7,
    slug: 'component-architecture',
  },
  {
    id: '3',
    title: 'Building Scalable APIs with Go',
    excerpt: 'Best practices for designing RESTful APIs that scale with your growing user base.',
    content: `Building scalable APIs requires careful planning and good architecture decisions.
    
    Consider these principles:
    - Use middleware for cross-cutting concerns
    - Implement proper error handling
    - Design for statelessness
    - Use database indexes wisely
    - Cache strategically
    
    Go's standard library and frameworks like Fiber make it easy to implement these patterns.`,
    author: 'Adeel',
    date: '2026-01-11',
    readTime: 8,
    slug: 'scalable-apis',
  },
];

export const BlogPage: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'archive'>('home');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [posts] = useState<Post[]>(SAMPLE_POSTS);

  const handleSelectPost = (post: Post) => {
    setSelectedPost(post);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as 'home' | 'about' | 'archive');
    setSelectedPost(null);
  };

  const handleBackToList = () => {
    setSelectedPost(null);
  };

  const renderContent = () => {
    if (selectedPost) {
      return (
        <BlogPostDetail
          post={selectedPost}
          onBack={handleBackToList}
        />
      );
    }

    switch (currentPage) {
      case 'about':
        return <About onNavigate={handleNavigate} />;
      case 'archive':
        return (
          <Archive
            posts={posts}
            onSelectPost={handleSelectPost}
            onNavigate={handleNavigate}
          />
        );
      case 'home':
      default:
        return (
          <BlogList
            posts={posts}
            onSelectPost={handleSelectPost}
          />
        );
    }
  };

  return (
    <div className="blog-page">
      <BlogHeader title="ZeroBlog" onNavigate={handleNavigate} />
      <main className="blog-page__main">
        {renderContent()}
      </main>
      <footer className="blog-footer">
        <p>&copy; 2026 ZeroBlog. Built with React and Go.</p>
      </footer>
    </div>
  );
};
