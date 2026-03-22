import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { StoreProvider } from './stores/StoreContext';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import AdvancedProductsPage from './pages/AdvancedProductsPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import CartBubble from './components/CartBubble';
import Navbar from './components/Navbar';
import { AnimatePresence } from 'framer-motion';
import './index.css';

// Wrapper component to provide location to AnimatePresence
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/advanced-products" replace />} />
        <Route path="/product/:id/details" element={<ProductDetail />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/order/:id" element={<OrderDetailsPage />} />
        <Route path="/advanced-products" element={<AdvancedProductsPage />} />
        <Route path="*" element={<Navigate to="/advanced-products" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

class App extends React.Component {
  render() {
    return (
      <StoreProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <div className="app-container">
            <Navbar />
            
            <AnimatedRoutes />

            <CartBubble />
          </div>
        </Router>
      </StoreProvider>
    );
  }
}

export default App;
