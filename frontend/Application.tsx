import React from 'react';
import { createRoot } from 'react-dom/client';
import { BlogPage } from './components/BlogPage';
import './style.scss';

function Application() {
  return <BlogPage />;
}

const container = document.getElementById('application');
if (container) {
  const root = createRoot(container);
  root.render(<Application />);
} else {
  console.error('Root element "#application" not found');
}
