import { it, expect, describe } from 'vitest';
import { formatMoney } from './money';

describe('formatMoney', () => {
  it('formats 1999 to $19.99', () => {
    expect(formatMoney(1999)).toBe('$19.99');
  });

  it('display 2 decimal points', () => {
    expect(formatMoney(1990)).toBe('$19.90');
    expect(formatMoney(100)).toBe('$1.00');
  });
});
