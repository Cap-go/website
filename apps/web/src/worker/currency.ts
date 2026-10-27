import type { CurrencyPayload } from '../lib/currency'
import { currencyForCountry, priceTierForCountry } from '../lib/regionalPricing'

export { CURRENCY_ENDPOINT as CURRENCY_PATH } from '../lib/currency'

function requestCountry(request: Request): string | null {
  const cf = (request as Request & { cf?: { country?: string } }).cf
  const country = (cf?.country || request.headers.get('CF-IPCountry'))?.toUpperCase()
  // XX = unknown, T1 = Tor.
  return country && /^[A-Z]{2}$/.test(country) && country !== 'XX' && country !== 'T1' ? country : null
}

// The visitor's local currency and regional price tier. Amounts come from the Stripe snapshot on the page.
export function handleCurrency(request: Request): Response {
  const country = requestCountry(request)
  const payload: CurrencyPayload = { country, currency: currencyForCountry(country), tier: priceTierForCountry(country) }
  return new Response(request.method === 'HEAD' ? null : JSON.stringify(payload), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      // Country-specific, so never share it through an intermediary cache.
      'Cache-Control': 'private, max-age=3600',
      Vary: 'CF-IPCountry',
    },
  })
}
