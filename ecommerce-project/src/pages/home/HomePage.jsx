import axios from 'axios';
import { Header } from '../../components/Header';
import './HomePage.css';
import { useState, useEffect } from 'react';
import ProductsGrid from './ProductsGrid';

const HomePage = ({ cart, getCartItems }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchHomeData = async () => {
      const response = await axios.get('api/products');
      setProducts(response.data);
    };
    fetchHomeData();
  }, []);
  return (
    <>
      <link
        rel="icon"
        type="image/svg+xml"
        href="/images/favicons/home-favicon.png"
      />

      <Header cart={cart} />
      <div className="home-page">
        <ProductsGrid products={products} getCartItems={getCartItems} />
      </div>
    </>
  );
};

export default HomePage;
