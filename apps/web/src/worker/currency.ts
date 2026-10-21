import { BASE_CURRENCY, CURRENCY_ENDPOINT, currencyForCountry, isSupportedCurrency, SUPPORTED_CURRENCIES, type CurrencyPayload, type CurrencyRates } from '../lib/currency'
import { cachedJsonResponse } from './cached-json'
import type { BackgroundContext } from './types'

export const CURRENCY_PATH = CURRENCY_ENDPOINT

// ECB reference rates publish once per working day.
const RATES_CACHE_PATH = '/currency-rates.json'
const RATES_CACHE_TTL_SECONDS = 6 * 60 * 60
const RATES_SOURCE_URL = `https://api.frankfurter.dev/v1/latest?base=${BASE_CURRENCY}&symbols=${SUPPORTED_CURRENCIES.filter((code) => code !== BASE_CURRENCY).join(',')}`

type RatesSnapshot = { date: string | null; rates: CurrencyRates }

async function loadRates(): Promise<RatesSnapshot> {
  const response = await fetch(RATES_SOURCE_URL, { headers: { Accept: 'application/json' } })
  if (!response.ok) throw new Error(`Exchange rates request failed: ${response.status}`)
  const data = (await response.json()) as { date?: string; rates?: Record<string, number> }
  const rates: CurrencyRates = { [BASE_CURRENCY]: 1 }
  for (const [code, rate] of Object.entries(data.rates ?? {})) {
    if (isSupportedCurrency(code) && Number.isFinite(rate) && rate > 0) rates[code] = rate
  }
  if (Object.keys(rates).length < 2) throw new Error('Exchange rates response had no usable rates')
  return { date: data.date ?? null, rates }
}

function requestCountry(request: Request): string | null {
  const cf = (request as Request & { cf?: { country?: string } }).cf
  const country = cf?.country || request.headers.get('CF-IPCountry')
  // XX = unknown, T1 = Tor.
  return country && /^[A-Z]{2}$/i.test(country) && country !== 'XX' && country !== 'T1' ? country.toUpperCase() : null
}

export async function handleCurrency(request: Request, ctx?: BackgroundContext): Promise<Response> {
  const country = requestCountry(request)
  const ratesResponse = await cachedJsonResponse(request, RATES_CACHE_PATH, RATES_CACHE_TTL_SECONDS, loadRates, 'Exchange rates are temporarily unavailable', ctx)
  const snapshot: RatesSnapshot = ratesResponse.ok ? await ratesResponse.json() : { date: null, rates: { [BASE_CURRENCY]: 1 } }
  const detected = currencyForCountry(country)
  const payload: CurrencyPayload = {
    country,
    // Never suggest a currency we cannot convert to.
    currency: snapshot.rates[detected] ? detected : BASE_CURRENCY,
    rates: snapshot.rates,
    date: snapshot.date,
  }
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
