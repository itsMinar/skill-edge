export type Currency = 'USD' | 'BDT' | 'INR' | 'GBP' | 'AUD' | 'CAD';

export function formatAmountForStripe(amount: number, currency: Currency) {
  const numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  });

  const parts = numberFormat.formatToParts(amount);

  let zeroDecimalCurrency = true;

  for (const part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false;
    }
  }

  return zeroDecimalCurrency ? amount : Math.round(amount * 100);
}
