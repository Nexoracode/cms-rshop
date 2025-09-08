export function formatDiscountedPrice(
  price: number,
  discount_percent?: number,
  discount_amount?: number
) {
  if (!price) return null;

  let discounted: number | null = null;

  if (discount_percent && discount_percent > 0) {
    discounted = price * (1 - discount_percent / 100);
  } else if (discount_amount && discount_amount > 0) {
    discounted = price - discount_amount;
  }

  return discounted !== null
    ? `قیمت با تخفیف: ${discounted.toLocaleString()} تومان`
    : null;
}
