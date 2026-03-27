import axios from 'axios';
import { Header } from '../../components/Header';
import './HomePage.css';
import { useState, useEffect } from 'react';
import ProductsGrid from './ProductsGrid';
import { useSearchParams } from 'react-router';

const HomePage = ({ cart, getCartItems }) => {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');

  useEffect(() => {
    const fetchHomeData = async () => {
      const urlPath = search
        ? `api/products/?search=${search}`
        : `api/products/`;
      const response = await axios.get(urlPath);
      setProducts(response.data);
    };
    fetchHomeData();
  }, [search]);
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
