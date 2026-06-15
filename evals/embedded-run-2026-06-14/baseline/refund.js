'use strict';

function calculateRefund(order, reason) {
  const { total, daysSincePurchase, shipped } = order;

  // Rule 1: total <= 0 -> return 0
  if (total <= 0) return 0;

  // Rule 2: defective -> full refund
  if (reason === 'defective') return Number(total.toFixed(2));

  // Rule 3: outside refund window
  if (daysSincePurchase > 30) return 0;

  // Rule 4: shipped -> total minus $5 restocking fee, never below 0
  if (shipped === true) return Number(Math.max(0, total - 5).toFixed(2));

  // Rule 5: not shipped -> full refund
  return Number(total.toFixed(2));
}

module.exports = { calculateRefund };
