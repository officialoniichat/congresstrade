import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AdminProvider } from './contexts/AdminContext';
import { initializeMetaPixel } from './config/metaPixel';
import App from './App';
import './index.css';

// Initialize Meta Pixel
initializeMetaPixel();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AdminProvider>
      <App />
    </AdminProvider>
  </StrictMode>
);