import { Product } from './Product';

const ProductsGrid = ({ products, getCartItems }) => {
  return (
    <div className="products-grid">
      {products.map((product, index) => (
        <Product key={index} product={product} getCartItems={getCartItems} />
      ))}
    </div>
  );
};

export default ProductsGrid;
