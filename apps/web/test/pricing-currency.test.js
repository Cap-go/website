import { expect, test } from 'bun:test'
import { commonCurrencies, formatPrice, tierDiscountPercent } from '../src/lib/currency.ts'
import { currencyForCountry, priceTierForCountry } from '../src/lib/regionalPricing.ts'
import { handleCurrency } from '../src/worker/currency.ts'

const set = (usd, eur, jpy) => ({ usd, eur, ...(jpy === undefined ? {} : { jpy }) })

test('offers only currencies Stripe sells every plan in, monthly and yearly', () => {
  const snapshot = {
    plans: {
      solo: { month: set(14, 12, 2100), year: set(146, 125, 22000) },
      maker: { month: set(39, 34), year: set(396, 340, 60000) },
    },
  }
  expect(commonCurrencies(snapshot)).toEqual(['eur', 'usd'])
  expect(commonCurrencies({ plans: {} })).toEqual(['usd'])
  // Never offer a set without USD, the server-rendered fallback.
  expect(commonCurrencies({ plans: { solo: { month: { eur: 12 }, year: { eur: 125 } } } })).toEqual(['usd'])
})

test('maps countries to the currency and regional tier Capgo checkout uses', () => {
  expect(currencyForCountry('fr')).toBe('eur')
  expect(currencyForCountry('GL')).toBe('dkk')
  expect(currencyForCountry(null)).toBeNull()
  expect(priceTierForCountry('US')).toBe('p100')
  expect(priceTierForCountry('DE')).toBe('p85')
  expect(priceTierForCountry('FR')).toBe('p70')
  expect(priceTierForCountry('ES')).toBe('p60')
  expect(priceTierForCountry('IN')).toBe('p50')
  expect(priceTierForCountry(undefined)).toBe('p100')
  expect(tierDiscountPercent('p85')).toBe(15)
})

test('formats Stripe currency codes', () => {
  expect(formatPrice(11, 'eur', 'whole', 'en-US')).toBe('€11')
  expect(formatPrice(1900, 'jpy', 'whole', 'en-US')).toBe('¥1,900')
})

test('currency endpoint returns the visitor country, currency and tier without caching it publicly', async () => {
  const response = handleCurrency(new Request('https://capgo.app/currency.json', { headers: { 'CF-IPCountry': 'es' } }))
  expect(await response.json()).toEqual({ country: 'ES', currency: 'eur', tier: 'p60' })
  expect(response.headers.get('Cache-Control')).toBe('private, max-age=3600')

  const unknown = handleCurrency(new Request('https://capgo.app/currency.json', { headers: { 'CF-IPCountry': 'T1' } }))
  expect(await unknown.json()).toEqual({ country: null, currency: null, tier: 'p100' })
})
