'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { calculateRefund } = require('../src/refund.js');

// Rule 1: total <= 0 returns 0
test('returns 0 when total is 0', () => {
  assert.equal(calculateRefund({ total: 0, daysSincePurchase: 5, shipped: false }, 'changed_mind'), 0);
});

test('returns 0 when total is negative', () => {
  assert.equal(calculateRefund({ total: -10, daysSincePurchase: 5, shipped: false }, 'changed_mind'), 0);
});

// Rule 2: defective overrides everything
test('defective returns full total even when shipped and > 30 days', () => {
  assert.equal(calculateRefund({ total: 100, daysSincePurchase: 60, shipped: true }, 'defective'), 100);
});

test('defective returns full total when not shipped', () => {
  assert.equal(calculateRefund({ total: 50, daysSincePurchase: 5, shipped: false }, 'defective'), 50);
});

test('defective with total <= 0 returns 0 (rule 1 has priority)', () => {
  assert.equal(calculateRefund({ total: 0, daysSincePurchase: 5, shipped: true }, 'defective'), 0);
});

// Rule 3: outside refund window
test('returns 0 when daysSincePurchase > 30 and not defective', () => {
  assert.equal(calculateRefund({ total: 100, daysSincePurchase: 31, shipped: false }, 'changed_mind'), 0);
});

test('returns 0 when daysSincePurchase > 30 and shipped', () => {
  assert.equal(calculateRefund({ total: 100, daysSincePurchase: 45, shipped: true }, 'changed_mind'), 0);
});

// Rule 4: shipped within window
test('shipped within window returns total minus $5 restocking fee', () => {
  assert.equal(calculateRefund({ total: 30, daysSincePurchase: 10, shipped: true }, 'changed_mind'), 25);
});

test('shipped with total < $5 returns 0, never below 0', () => {
  assert.equal(calculateRefund({ total: 3, daysSincePurchase: 5, shipped: true }, 'changed_mind'), 0);
});

test('shipped with total exactly $5 returns 0', () => {
  assert.equal(calculateRefund({ total: 5, daysSincePurchase: 5, shipped: true }, 'changed_mind'), 0);
});

// Rule 5: not shipped, within window
test('not shipped within window returns full total', () => {
  assert.equal(calculateRefund({ total: 50, daysSincePurchase: 30, shipped: false }, 'changed_mind'), 50);
});

// Rounding to 2 decimal places
test('rounds to 2 decimal places - not shipped', () => {
  assert.equal(calculateRefund({ total: 10.456, daysSincePurchase: 5, shipped: false }, 'changed_mind'), 10.46);
});

test('defective rounds to 2 decimal places', () => {
  assert.equal(calculateRefund({ total: 99.999, daysSincePurchase: 5, shipped: false }, 'defective'), 100);
});

test('shipped restocking fee result rounds to 2 decimal places', () => {
  assert.equal(calculateRefund({ total: 15.456, daysSincePurchase: 5, shipped: true }, 'changed_mind'), 10.46);
});
