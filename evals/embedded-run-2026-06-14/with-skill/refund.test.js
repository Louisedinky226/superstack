const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { calculateRefund } = require('../src/refund');

describe('calculateRefund', () => {
  // Rule 1: total <= 0
  it('returns 0 when total is 0', () => {
    assert.equal(calculateRefund({ total: 0, daysSincePurchase: 5, shipped: false }, 'change_of_mind'), 0);
  });

  it('returns 0 when total is negative', () => {
    assert.equal(calculateRefund({ total: -10, daysSincePurchase: 0, shipped: false }, 'defective'), 0);
  });

  // Rule 2: defective -> full refund (overrides everything)
  it('returns full total for defective reason regardless of age', () => {
    assert.equal(calculateRefund({ total: 100, daysSincePurchase: 60, shipped: true }, 'defective'), 100);
  });

  // Rule 3: outside 30-day window
  it('returns 0 when daysSincePurchase > 30 and not defective', () => {
    assert.equal(calculateRefund({ total: 50, daysSincePurchase: 31, shipped: false }, 'change_of_mind'), 0);
  });

  // Rule 4: shipped within window -> total minus $5 restocking fee
  it('deducts $5 restocking fee when shipped within 30 days', () => {
    assert.equal(calculateRefund({ total: 20, daysSincePurchase: 10, shipped: true }, 'change_of_mind'), 15);
  });

  it('restocking fee never drops refund below 0', () => {
    assert.equal(calculateRefund({ total: 3, daysSincePurchase: 5, shipped: true }, 'change_of_mind'), 0);
  });

  // Rule 5: not shipped within window -> full refund
  it('returns full total when not shipped within 30 days', () => {
    assert.equal(calculateRefund({ total: 75, daysSincePurchase: 15, shipped: false }, 'change_of_mind'), 75);
  });

  // Rounding to 2 decimal places
  it('rounds result to 2 decimal places', () => {
    assert.equal(calculateRefund({ total: 10.005, daysSincePurchase: 5, shipped: true }, 'change_of_mind'), 5.01);
  });
});
