import React from 'react';
import { createRoot } from 'react-dom/client';

function Application() {
  return (
    <div>Hello React from go</div>
  )
}

const container = document.getElementById('application');
if (container) {
  const root = createRoot(container);
  root.render(<Application />);
} else {
  console.error('Root element "#application" not found');
}
