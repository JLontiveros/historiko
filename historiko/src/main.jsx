import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ToastContainer } from 'react-toastify';

document.addEventListener('wheel', (event) => {
  if (event.ctrlKey) {
    event.preventDefault();
  }
}, { passive: false });

document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && (event.key === '+' || event.key === '-' || event.key === '0')) {
    event.preventDefault();
  }
});


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer />
  </StrictMode>
);
