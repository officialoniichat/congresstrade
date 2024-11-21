import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AdminProvider } from './contexts/AdminContext';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AdminProvider>
      <App />
    </AdminProvider>
  </StrictMode>
);