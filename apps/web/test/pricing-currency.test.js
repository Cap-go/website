import { expect, test } from 'bun:test'
import { formatPrice, stripeAmountToMajorUnits, tierDiscountPercent } from '../src/lib/currency.ts'

test('converts Stripe smallest units like Capgo checkout', () => {
  expect(stripeAmountToMajorUnits(1400, 'usd')).toBe(14)
  expect(stripeAmountToMajorUnits(2100, 'JPY')).toBe(2100)
  expect(stripeAmountToMajorUnits(5000, 'kwd')).toBe(5)
  // Stripe keeps ISK two-decimal in the API.
  expect(stripeAmountToMajorUnits(140000, 'isk')).toBe(1400)
})

test('formats Stripe currency codes', () => {
  expect(formatPrice(11, 'eur', 'whole', 'en-US')).toBe('€11')
  expect(formatPrice(1900, 'jpy', 'whole', 'en-US')).toBe('¥1,900')
  expect(tierDiscountPercent('p60')).toBe(40)
})

test.each([
  [4.45, 'eur', '€4.45'],
  [22.35, 'eur', '€22.35'],
  [5, 'usd', '$5'],
  [750.4, 'jpy', '¥750'],
  [1.234, 'kwd', 'KWD\u00a01.234'],
])('preserves currency precision for prepaid balances: %s %s', (amount, currency, expected) => {
  expect(formatPrice(amount, currency, 'currency', 'en-US')).toBe(expected)
})
