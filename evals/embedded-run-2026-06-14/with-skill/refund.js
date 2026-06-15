function calculateRefund(order, reason) {
  const { total, daysSincePurchase, shipped } = order;

  if (total <= 0) return 0;
  if (reason === 'defective') return round(total);
  if (daysSincePurchase > 30) return 0;
  if (shipped) return round(Math.max(0, total - 5));
  return round(total);
}

function round(n) {
  return Math.round(n * 100) / 100;
}

module.exports = { calculateRefund };
