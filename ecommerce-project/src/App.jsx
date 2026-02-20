import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import HomePage from './pages/home/HomePage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import OrdersPage from './pages/orders/OrdersPage';
import './App.css';
import TrackingPage from './pages/tracking/TrackingPage';
import NotFoundPage from './pages/NotFoundPage';
import axios from 'axios';

window.axios = axios;

function App() {
  const [cart, setCart] = useState([]);

  const getCartItems = async () => {
    const response = await axios.get('api/cart-items?expand=product');
    setCart(response.data);
  };

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <Routes>
      <Route
        index
        element={<HomePage cart={cart} getCartItems={getCartItems} />}
      />
      <Route
        path="checkout"
        element={<CheckoutPage cart={cart} getCartItems={getCartItems} />}
      />
      <Route
        path="orders"
        element={<OrdersPage cart={cart} getCartItems={getCartItems} />}
      />
      <Route
        path="tracking/:orderId/:productId"
        element={<TrackingPage cart={cart} />}
      />
      <Route path="*" element={<NotFoundPage cart={cart} />} />
    </Routes>
  );
}

export default App;
