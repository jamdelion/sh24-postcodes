import { isValidPostcode } from './../utils';

describe('isValidPostcode', () => {
  it('returns false for empty or undefined input', () => {
    expect(isValidPostcode('')).toBe(false);
    expect(isValidPostcode(undefined)).toBe(false);
  });

  it('returns true for valid UK postcodes', () => {
    expect(isValidPostcode('SE1 7QD')).toBe(true);
    expect(isValidPostcode('se17qd')).toBe(true);
    expect(isValidPostcode('SW1A 1AA')).toBe(true);
    expect(isValidPostcode('n1 1Aa')).toBe(true);
  });

  it('returns false for invalid postcodes', () => {
    expect(isValidPostcode('123')).toBe(false);
    expect(isValidPostcode('ABC123')).toBe(false);
    expect(isValidPostcode('SE17QDX')).toBe(false);
    expect(isValidPostcode('bicycle')).toBe(false);
    expect(isValidPostcode('123456')).toBe(false);
  });
});
