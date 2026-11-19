import { expect, test } from 'bun:test'
import { creditDisplayPrice } from '../src/lib/creditDisplayPrice.ts'
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

test('displays credit rates per 1,000 users while preserving other billing units', () => {
  expect(creditDisplayPrice({ type: 'mau', price_per_unit: 0.003, unit_factor: 1 })).toBe(3)
  expect(creditDisplayPrice({ type: 'mau', price_per_unit: 0.00025, unit_factor: 1 })).toBe(0.25)
  expect(creditDisplayPrice({ type: 'mau', price_per_unit: 3, unit_factor: 1000 })).toBe(3)
  expect(creditDisplayPrice({ type: 'bandwidth', price_per_unit: 0.06, unit_factor: 1073741824 })).toBe(0.06)
  expect(creditDisplayPrice({ type: 'storage', price_per_unit: 0.09, unit_factor: 1073741824 })).toBe(0.09)
  expect(creditDisplayPrice({ type: 'build_time', price_per_unit: 0.08, unit_factor: 60 })).toBe(0.08)
})
