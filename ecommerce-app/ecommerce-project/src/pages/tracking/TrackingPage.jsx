import { Link, useParams } from 'react-router';
import { Header } from '../../components/Header';
import './TrackingPage.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

const TrackingPage = ({ cart }) => {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const getTrackingData = async () => {
      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`,
      );
      setOrder(response.data);
    };

    getTrackingData();
  }, [orderId]);

  if (!order) return null;

  const orderProduct = order.products.find(
    (product) => product.productId === productId,
  );

  const totalDeliveryTimeMs =
    orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
  let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;

  if (deliveryPercent > 100) {
    deliveryPercent = 100;
  }

  const isPreparing = deliveryPercent < 33;
  const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
  const isDelivered = deliveryPercent === 100;

  return (
    <>
      <title>Tracking</title>
      <link
        rel="icon"
        type="image/svg+xml"
        href="/images/favicons/tracking-favicon.png"
      />

      <Header cart={cart} />

      <div className="header">
        <div className="left-section">
          <Link to="/" className="header-link">
            <img className="logo" src="images/logo-white.png" />
            <img className="mobile-logo" src="images/mobile-logo-white.png" />
          </Link>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" placeholder="Search" />

          <button className="search-button">
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </div>

        <div className="right-section">
          <Link className="orders-link header-link" to="orders.html">
            <span className="orders-text">Orders</span>
          </Link>

          <Link className="cart-link header-link" to="checkout.html">
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">3</div>
            <div className="cart-text">Cart</div>
          </Link>
        </div>
      </div>

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>
          <div className="delivery-date">
            {deliveryPercent >= 100 ? 'Delivered on ' : 'Arriving on '}
            {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
          </div>

          <div className="product-info">{orderProduct.product.name}</div>

          <div className="product-info">Quantity: {orderProduct.quantity}</div>

          <img className="product-image" src={orderProduct.product.image} />

          <div className="progress-labels-container">
            <div
              className={`${isPreparing && 'current-status'} progress-label`}
            >
              Preparing
            </div>
            <div className={`${isShipped && 'current-status'} progress-label`}>
              Shipped
            </div>
            <div
              className={`${isDelivered && 'current-status'} progress-label`}
            >
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${deliveryPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackingPage;
