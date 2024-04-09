export const ITEMS_PER_PAGE = 10;
export function discountedPrice(item) {
  if (!item || !item.product) {
    return 0; // or whatever default value you want to return
  }
  return Math.round(
    item.product.price * (1 - item.product.discountPercentage / 100),
    2
  );
}
