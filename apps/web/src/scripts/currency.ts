import planPricesData from '@/data/capgo-plan-prices.json'
import {
  BASE_CURRENCY,
  commonCurrencies,
  CURRENCY_ENDPOINT,
  CURRENCY_STORAGE_KEY,
  formatPrice,
  FULL_PRICE_TIER,
  isPriceTier,
  type CurrencyPayload,
  type PlanPricesSnapshot,
  type PriceFormat,
  type PriceTier,
} from '@/lib/currency'

// Shows every `[data-price-amount]` element in the visitor's currency. Markup keeps the USD amount so the
// server-rendered HTML (and crawlers) stay in USD:
//   <span data-price-amount="14" data-price-plan="prod_x" data-price-interval="month">$14</span>
// Plan prices (data-price-plan + data-price-interval: month | year | year-monthly) are the exact Stripe
// amounts for the currency and the visitor's regional tier; data-price-full shows the undiscounted price.
// Other amounts (usage, credits) and data-price-extra are converted at the rate Stripe sells the plans at.
// Scripts that change a price at runtime update the data attributes and call renderPrices().

export const CURRENCY_CHANGE_EVENT = 'capgo:currency-change'

const snapshot = planPricesData as PlanPricesSnapshot
export const AVAILABLE_CURRENCIES = commonCurrencies(snapshot)

type CurrencyState = {
  currency: string
  detected: string
  tier: PriceTier
  ready: boolean
}

const state: CurrencyState = { currency: BASE_CURRENCY, detected: BASE_CURRENCY, tier: FULL_PRICE_TIER, ready: false }
let loading: Promise<void> | null = null

function isAvailable(currency: unknown): currency is string {
  return typeof currency === 'string' && AVAILABLE_CURRENCIES.includes(currency)
}

function storedCurrency(): string | null {
  try {
    const value = localStorage.getItem(CURRENCY_STORAGE_KEY)
    return isAvailable(value) ? value : null
  } catch {
    return null
  }
}

// The manual choice for this page view; kept in memory too so it survives blocked storage.
let manualCurrency: string | null = storedCurrency()

function pageLocale() {
  return document.documentElement.lang || 'en-US'
}

export function getCurrencyState(): Readonly<CurrencyState> {
  return state
}

export function hasManualCurrency() {
  return manualCurrency !== null
}

// Local units per USD: the ratio of the full Stripe plan prices, the same rate Checkout sells at.
function usdRatio(currency: string): number | null {
  if (currency === BASE_CURRENCY) return 1
  let local = 0
  let usd = 0
  for (const plan of Object.values(snapshot.plans)) {
    for (const amounts of [plan.month, plan.year]) {
      if (amounts[currency] === undefined || !amounts[BASE_CURRENCY]) continue
      local += amounts[currency]
      usd += amounts[BASE_CURRENCY]
    }
  }
  return usd ? local / usd : null
}

/** Stripe price of a plan in the display currency, at the visitor's regional tier unless `full`. */
export function planAmount(planId: string, interval: 'month' | 'year', full = false): number | null {
  const plan = snapshot.plans[planId]
  const prices = (!full && plan?.tiers?.[state.tier]) || plan
  return prices?.[interval][state.currency] ?? null
}

/** True when the visitor's regional tier makes this plan cheaper than its full price. */
export function hasRegionalDiscount(planId: string): boolean {
  return state.tier !== FULL_PRICE_TIER && !!snapshot.plans[planId]?.tiers?.[state.tier]
}

/** Formats a USD amount (usage, credits) in the display currency. */
export function formatMoney(amountUsd: number, format: PriceFormat = 'whole'): string {
  const ratio = usdRatio(state.currency)
  return ratio === null ? formatPrice(amountUsd, BASE_CURRENCY, format, pageLocale()) : formatPrice(amountUsd * ratio, state.currency, format, pageLocale())
}

function planPriceText(element: HTMLElement, format: PriceFormat): string | null {
  const planId = element.dataset.pricePlan
  if (!planId) return null
  const interval = element.dataset.priceInterval ?? 'month'
  const amount = planAmount(planId, interval === 'month' ? 'month' : 'year', element.dataset.priceFull !== undefined)
  const ratio = usdRatio(state.currency)
  if (amount === null || ratio === null) return null
  const extra = Number(element.dataset.priceExtra ?? 0) * ratio
  return formatPrice((interval === 'year-monthly' ? Math.round(amount / 12) : amount) + extra, state.currency, format, pageLocale())
}

export function renderPrices(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-price-amount]').forEach((element) => {
    const amount = Number(element.dataset.priceAmount)
    if (!Number.isFinite(amount)) return
    const format = (element.dataset.priceFormat as PriceFormat | undefined) ?? 'whole'
    element.textContent = `${planPriceText(element, format) ?? formatMoney(amount, format)}${element.dataset.priceSuffix ?? ''}`
  })
  document.querySelectorAll<HTMLElement>('[data-regional-discount]').forEach((discount) => {
    discount.hidden = !hasRegionalDiscount(discount.dataset.regionalDiscount ?? '')
    discount.querySelectorAll<HTMLElement>('[data-regional-discount-tier]').forEach((badge) => (badge.hidden = badge.dataset.regionalDiscountTier !== state.tier))
  })
  document.querySelectorAll<HTMLElement>('[data-currency-note]').forEach((note) => (note.hidden = state.currency === BASE_CURRENCY))
  document.querySelectorAll<HTMLElement>('[data-currency-code]').forEach((element) => (element.textContent = state.currency.toUpperCase()))
}

function applyCurrency(currency: string) {
  state.currency = isAvailable(currency) ? currency : BASE_CURRENCY
  renderPrices()
  document.dispatchEvent(new CustomEvent(CURRENCY_CHANGE_EVENT, { detail: { currency: state.currency } }))
}

/** Sets a manual currency, or clears the override (back to location-based) when `null`. */
export function setCurrency(currency: string | null) {
  manualCurrency = isAvailable(currency) ? currency : null
  try {
    if (manualCurrency) localStorage.setItem(CURRENCY_STORAGE_KEY, manualCurrency)
    else localStorage.removeItem(CURRENCY_STORAGE_KEY)
  } catch {
    // Storage can be blocked; the choice still applies to this page view.
  }
  applyCurrency(manualCurrency ?? state.detected)
}

export function onCurrencyChange(listener: (currency: string) => void) {
  document.addEventListener(CURRENCY_CHANGE_EVENT, (event) => listener((event as CustomEvent<{ currency: string }>).detail.currency))
}

export function initCurrency(): Promise<void> {
  loading ??= (async () => {
    try {
      const response = await fetch(CURRENCY_ENDPOINT, { headers: { Accept: 'application/json' } })
      if (!response.ok) throw new Error(`Currency request failed: ${response.status}`)
      const payload = (await response.json()) as CurrencyPayload
      state.detected = isAvailable(payload.currency) ? payload.currency : BASE_CURRENCY
      state.tier = isPriceTier(payload.tier) ? payload.tier : FULL_PRICE_TIER
    } catch (error) {
      // Without the visitor's location the page keeps the full USD prices it was rendered with.
      console.warn('Local pricing unavailable', error)
    }
    state.ready = true
    applyCurrency(manualCurrency ?? state.detected)
  })()
  return loading
}

// Inline (non-module) scripts cannot import renderPrices, so they signal price changes with this event.
export const PRICES_UPDATED_EVENT = 'capgo:prices-updated'
document.addEventListener(PRICES_UPDATED_EVENT, () => renderPrices())
