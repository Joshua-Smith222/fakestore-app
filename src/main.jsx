import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { CartContext } from './contexts/CartContext';
import { CartProvider } from './contexts/CartProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider> {/* ✅ wrap App with CartProvider */}
      <App />
    </CartProvider>
  </StrictMode>
);
