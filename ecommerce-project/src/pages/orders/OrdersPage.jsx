import { Header } from '../../components/Header';
import './OrdersPage.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { OrdersGrid } from './OrdersGrid';

const OrdersPage = ({ cart }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrdersData = async () => {
      const response = await axios.get('/api/orders?expand=products');
      setOrders(response.data);
    };
    fetchOrdersData();
  }, []);

  return (
    <>
      <link
        rel="icon"
        type="image/svg+xml"
        href="./images/favicons/orders-favicon.png"
      />
      <title>Orders</title>
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <OrdersGrid orders={orders} />
      </div>
    </>
  );
};

export default OrdersPage;
