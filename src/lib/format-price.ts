export function formatPrice(price: number) {
  return Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}
