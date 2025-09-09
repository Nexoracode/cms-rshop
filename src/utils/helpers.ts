export function formatDiscountedPrice(
  price: number,
  discount_percent?: number,
  discount_amount?: number
) {
  if (!price) return null;

  let discounted = price;

  if (discount_amount && discount_amount > 0) {
    discounted = Math.max(0, price - discount_amount);
  } else if (discount_percent && discount_percent > 0) {
    discounted = Math.max(0, price * (1 - discount_percent / 100));
  }
  
  return discounted !== price
    ? `قیمت با تخفیف: ${Math.round(discounted).toLocaleString()} تومان`
    : null;
}
