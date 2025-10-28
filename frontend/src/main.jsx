import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // This assumes App.jsx is in src/

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Root element not found. Ensure index.html contains <div id="root"></div>');
}

export default App;