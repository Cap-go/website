import {
  BASE_CURRENCY,
  CURRENCY_ENDPOINT,
  CURRENCY_STORAGE_KEY,
  formatPrice,
  isSupportedCurrency,
  type CurrencyCode,
  type CurrencyPayload,
  type PriceFormat,
} from '@/lib/currency'

// Converts every `[data-price-amount]` element on the page to the visitor's currency.
// Markup keeps the USD amount so the server-rendered HTML (and crawlers) stay in USD:
//   <span data-price-amount="14" data-price-from="USD" data-price-format="whole" data-price-suffix="+">$14+</span>
// Scripts that change a price at runtime update data-price-amount and call renderPrices().

export const CURRENCY_CHANGE_EVENT = 'capgo:currency-change'

type CurrencyState = {
  currency: CurrencyCode
  detected: CurrencyCode
  rates: Partial<Record<CurrencyCode, number>>
  date: string | null
  ready: boolean
}

const state: CurrencyState = { currency: BASE_CURRENCY, detected: BASE_CURRENCY, rates: { [BASE_CURRENCY]: 1 }, date: null, ready: false }
let loading: Promise<void> | null = null

function storedCurrency(): CurrencyCode | null {
  try {
    const value = localStorage.getItem(CURRENCY_STORAGE_KEY)
    return isSupportedCurrency(value) ? value : null
  } catch {
    return null
  }
}

function pageLocale() {
  return document.documentElement.lang || 'en-US'
}

export function getCurrencyState(): Readonly<CurrencyState> {
  return state
}

export function hasManualCurrency() {
  return storedCurrency() !== null
}

/** Converts an amount between currencies; falls back to the original amount when a rate is missing. */
export function convert(amount: number, from: string = BASE_CURRENCY, to: CurrencyCode = state.currency): number {
  if (from === to) return amount
  const fromRate = state.rates[from as CurrencyCode]
  const toRate = state.rates[to]
  if (!fromRate || !toRate) return amount
  return (amount / fromRate) * toRate
}

/** Formats an amount priced in `from` (USD by default) in the active display currency. */
export function formatMoney(amount: number, format: PriceFormat = 'whole', from: string = BASE_CURRENCY): string {
  const canConvert = from === state.currency || (state.rates[from as CurrencyCode] && state.rates[state.currency])
  const currency = canConvert ? state.currency : from
  return formatPrice(canConvert ? convert(amount, from) : amount, currency, format, pageLocale())
}

export function renderPrices(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-price-amount]').forEach((element) => {
    const amount = Number(element.dataset.priceAmount)
    if (!Number.isFinite(amount)) return
    const format = (element.dataset.priceFormat as PriceFormat | undefined) ?? 'whole'
    element.textContent = `${formatMoney(amount, format, element.dataset.priceFrom || BASE_CURRENCY)}${element.dataset.priceSuffix ?? ''}`
  })
  const converted = state.currency !== BASE_CURRENCY
  document.querySelectorAll<HTMLElement>('[data-currency-note]').forEach((note) => (note.hidden = !converted))
  document.querySelectorAll<HTMLElement>('[data-currency-code]').forEach((element) => (element.textContent = state.currency))
}

function applyCurrency(currency: CurrencyCode) {
  state.currency = state.rates[currency] ? currency : BASE_CURRENCY
  renderPrices()
  document.dispatchEvent(new CustomEvent(CURRENCY_CHANGE_EVENT, { detail: { currency: state.currency } }))
}

/** Sets a manual currency, or clears the override (back to location-based) when `null`. */
export function setCurrency(currency: CurrencyCode | null) {
  try {
    if (currency) localStorage.setItem(CURRENCY_STORAGE_KEY, currency)
    else localStorage.removeItem(CURRENCY_STORAGE_KEY)
  } catch {
    // Storage can be blocked; the choice still applies to this page view.
  }
  applyCurrency(currency ?? state.detected)
}

export function onCurrencyChange(listener: (currency: CurrencyCode) => void) {
  document.addEventListener(CURRENCY_CHANGE_EVENT, (event) => listener((event as CustomEvent<{ currency: CurrencyCode }>).detail.currency))
}

export function initCurrency(): Promise<void> {
  loading ??= (async () => {
    try {
      const response = await fetch(CURRENCY_ENDPOINT, { headers: { Accept: 'application/json' } })
      if (!response.ok) throw new Error(`Currency request failed: ${response.status}`)
      const payload = (await response.json()) as CurrencyPayload
      state.rates = { ...payload.rates, [BASE_CURRENCY]: 1 }
      state.date = payload.date
      state.detected = isSupportedCurrency(payload.currency) && state.rates[payload.currency] ? payload.currency : BASE_CURRENCY
    } catch (error) {
      // Without rates everything stays in USD, which is what the server rendered.
      console.warn('Currency conversion unavailable', error)
    }
    state.ready = true
    applyCurrency(storedCurrency() ?? state.detected)
  })()
  return loading
}

// Inline (non-module) scripts cannot import renderPrices, so they signal price changes with this event.
export const PRICES_UPDATED_EVENT = 'capgo:prices-updated'
document.addEventListener(PRICES_UPDATED_EVENT, () => renderPrices())
