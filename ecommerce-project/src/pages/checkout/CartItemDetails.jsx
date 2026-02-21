import axios from 'axios';
import { formatMoney } from '../../utils/money';
import { useState } from 'react';

export const CartItemDetails = ({ cartItem, getCartItems }) => {
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const handleDeleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await getCartItems();
  };

  const handleUpdateQuantity = async () => {
    if (isUpdatingQuantity) {
      await axios.put(`api/cart-items/${cartItem.productId}`, {
        quantity: Number(quantity),
      });
      await getCartItems();
      setIsUpdatingQuantity(false);
    } else {
      setIsUpdatingQuantity(true);
    }
  };

  const handleQuantityKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleUpdateQuantity();
    } else if (event.key === 'Escape') {
      setIsUpdatingQuantity(false);
    }
  };

  return (
    <>
      <img className="product-image" src={cartItem.product.image} />
      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:
            {isUpdatingQuantity ? (
              <input
                type="text"
                value={quantity}
                onChange={(event) => {
                  setQuantity(Number(event.target.value));
                }}
                onKeyDown={handleQuantityKeyDown}
                className="product-quantity-input"
              />
            ) : (
              <span className="quantity-label">{cartItem.quantity}</span>
            )}
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={handleUpdateQuantity}
          >
            Update
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={handleDeleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
};
