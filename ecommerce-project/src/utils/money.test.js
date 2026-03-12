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

  it('checks if it formats for 0', () => {
    expect(formatMoney(0)).toBe('$0.00');
  });

  it('test for negative numbers', () => {
    expect(formatMoney(-100)).toBe('$-1.00');
  });
});
