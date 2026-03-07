import { it, expect, describe, vi, beforeEach } from 'vitest';
// import { formatMoney } from './money';s
import { render, screen } from '@testing-library/react';
import { Product } from './Product';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

vi.mock('axios');

describe('Product component', () => {
  let product;

  let getCartItems;

  beforeEach(() => {
    product = {
      id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      image: 'images/products/intermediate-composite-basketball.jpg',
      name: 'Intermediate Size Basketball',
      rating: {
        stars: 4,
        count: 127,
      },
      priceCents: 2095,
      keywords: ['sports', 'basketballs'],
    };

    getCartItems = vi.fn();
  });

  it('displays product details correctly', () => {
    render(<Product product={product} getCartItems={getCartItems} />);

    expect(
      screen.getByText('Intermediate Size Basketball'),
    ).toBeInTheDocument();
    expect(screen.getByText('$20.95')).toBeInTheDocument();

    expect(screen.getByTestId('product-image')).toHaveAttribute(
      'src',
      'images/products/intermediate-composite-basketball.jpg',
    );

    expect(screen.getByTestId('product-rating-stars-image')).toHaveAttribute(
      'src',
      'images/ratings/rating-40.png',
    );

    expect(screen.getByText('127')).toBeInTheDocument();
  });

  it('Adds a product to the cart', async () => {
    render(<Product product={product} getCartItems={getCartItems} />);

    const user = userEvent.setup();
    const addToCartButton = screen.getByTestId('add-to-cart-button');
    await user.click(addToCartButton);

    expect(axios.post).toHaveBeenCalledWith('/api/cart-items', {
      productId: product.id,
      quantity: 1,
    });
    expect(getCartItems).toHaveBeenCalled();
  });
});
