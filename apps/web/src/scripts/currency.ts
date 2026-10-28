import {
  BASE_CURRENCY,
  CURRENCY_STORAGE_KEY,
  formatPrice,
  stripeAmountToMajorUnits,
  type PlanPriceAmounts,
  type PlanPricesResponse,
  type PriceFormat,
} from '@/lib/currency'

// Shows every `[data-price-amount]` element in the visitor's currency. Markup keeps the USD amount so the
// server-rendered HTML (and crawlers) stay in USD:
//   <span data-price-amount="14" data-price-plan="prod_x" data-price-interval="month">$14</span>
// Prices come from the Capgo backend (`[data-plan-prices-url]`, GET /private/plan_prices/public): plan prices
// (data-price-plan + data-price-interval: month | year | year-monthly) are the exact Stripe amounts sold to
// the visitor's country, including the regional discount; data-price-full shows the undiscounted price.
// Other amounts (usage, credits) and data-price-extra are converted at the rate Stripe sells the plans at.
// Scripts that change a price at runtime update the data attributes and call renderPrices().

export const CURRENCY_CHANGE_EVENT = 'capgo:currency-change'

type CurrencyState = {
  currency: string
  detected: string
  // Currencies Stripe sells every plan in for this visitor; USD until the backend answers.
  currencies: string[]
  ready: boolean
}

const state: CurrencyState = { currency: BASE_CURRENCY, detected: BASE_CURRENCY, currencies: [BASE_CURRENCY], ready: false }
let catalog: PlanPricesResponse | null = null
let loading: Promise<void> | null = null

function isAvailable(currency: unknown): currency is string {
  return typeof currency === 'string' && state.currencies.includes(currency)
}

function storedCurrency(): string | null {
  try {
    return localStorage.getItem(CURRENCY_STORAGE_KEY)
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

// Full Stripe prices of every plan (the discounted plans' regular prices replace their regional ones).
function fullPrices(): PlanPriceAmounts {
  return catalog ? { ...catalog.prices, ...catalog.regularPrices } : {}
}

// Local units per USD: the ratio of the full Stripe plan prices, the same rate Checkout sells at.
function usdRatio(currency: string): number | null {
  if (currency === BASE_CURRENCY) return 1
  let local = 0
  let usd = 0
  for (const plan of Object.values(fullPrices())) {
    for (const amounts of [plan.month, plan.year]) {
      if (amounts[currency] === undefined || !amounts[BASE_CURRENCY]) continue
      local += stripeAmountToMajorUnits(amounts[currency], currency)
      usd += stripeAmountToMajorUnits(amounts[BASE_CURRENCY], BASE_CURRENCY)
    }
  }
  return usd ? local / usd : null
}

// A regional price is only sold in the region's currencies; any other currency pays the full price.
function discountApplies(): boolean {
  return !!catalog?.discount?.currencies.includes(state.currency)
}

/** True when the visitor's regional discount makes this plan cheaper in the display currency. */
export function hasRegionalDiscount(planId: string): boolean {
  return discountApplies() && !!catalog?.regularPrices[planId]
}

/** Stripe price of a plan in the display currency (major units), discounted unless `full`. */
export function planAmount(planId: string, interval: 'month' | 'year', full = false): number | null {
  if (!catalog) return null
  const prices = (full || !discountApplies()) && catalog.regularPrices[planId] ? catalog.regularPrices : catalog.prices
  const amount = prices[planId]?.[interval][state.currency]
  return amount === undefined ? null : stripeAmountToMajorUnits(amount, state.currency)
}

/** Converts a USD amount (usage, credits) to the display currency, at the rate Stripe sells the plans at. */
export function usdToDisplay(amountUsd: number): number {
  return amountUsd * (usdRatio(state.currency) ?? 1)
}

/** Formats an amount already in the display currency. */
export function formatDisplay(amount: number, format: PriceFormat = 'whole'): string {
  return formatPrice(amount, usdRatio(state.currency) === null ? BASE_CURRENCY : state.currency, format, pageLocale())
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
    const tier = `p${100 - (catalog?.discount?.percent ?? 0)}`
    discount.querySelectorAll<HTMLElement>('[data-regional-discount-tier]').forEach((badge) => (badge.hidden = badge.dataset.regionalDiscountTier !== tier))
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
      const url = document.querySelector<HTMLElement>('[data-plan-prices-url]')?.dataset.planPricesUrl
      if (!url) throw new Error('No plan prices URL on the page')
      const response = await fetch(url, { headers: { Accept: 'application/json' } })
      if (!response.ok) throw new Error(`Plan prices request failed: ${response.status}`)
      const data = (await response.json()) as PlanPricesResponse
      // A partial catalog could show a plan in a currency it is not sold in: keep the USD page.
      if (!data.complete || !data.currencies?.includes(BASE_CURRENCY)) throw new Error('Plan prices are incomplete')
      catalog = data
      state.currencies = data.currencies
      state.detected = isAvailable(data.currency) ? data.currency : BASE_CURRENCY
    } catch (error) {
      // Without the backend prices the page keeps the full USD prices it was rendered with.
      console.warn('Local pricing unavailable', error)
    }
    state.ready = true
    if (!isAvailable(manualCurrency)) manualCurrency = null
    applyCurrency(manualCurrency ?? state.detected)
  })()
  return loading
}

// Inline (non-module) scripts cannot import renderPrices, so they signal price changes with this event.
export const PRICES_UPDATED_EVENT = 'capgo:prices-updated'
document.addEventListener(PRICES_UPDATED_EVENT, () => renderPrices())
