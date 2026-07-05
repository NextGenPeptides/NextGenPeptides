

export const PACKAGING_WEIGHT_G = 80;

export const MONDIAL_RELAY_TIERS = [
  { maxWeight: 500,   price: 4.20 },
  { maxWeight: 1000,  price: 5.20 },
  { maxWeight: 2000,  price: 6.90 },
  { maxWeight: 5000,  price: 9.90 },
  { maxWeight: 10000, price: 13.90 },
  { maxWeight: 30000, price: 19.90 }
];

export function cartWeightGrams(cart, products){
  const itemsWeight = cart.reduce((sum, line) => {
    const p = products.find(x => x.id === line.id);
    const w = p?.weightGrams || 0;
    return sum + w * line.qty;
  }, 0);
  return itemsWeight + PACKAGING_WEIGHT_G;
}

export function shippingPriceFor(weightGrams){
  const tier = MONDIAL_RELAY_TIERS.find(t => weightGrams <= t.maxWeight);
  return tier ? tier.price : MONDIAL_RELAY_TIERS[MONDIAL_RELAY_TIERS.length - 1].price;
}
