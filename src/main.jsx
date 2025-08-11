import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(
   
      <App />
  
  );
} else {
  console.error('Root element not found');
}
