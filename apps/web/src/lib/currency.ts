// Display currencies for the pricing page. Prices come from the Capgo backend
// (GET /private/plan_prices/public): the exact Stripe amounts Checkout sells to the visitor's country,
// including the Solo regional (PPP) discount. Nothing is converted with exchange rates.

export const BASE_CURRENCY = 'usd'
export const CURRENCY_STORAGE_KEY = 'capgo_currency'
export const PLAN_PRICES_PATH = '/private/plan_prices/public'

// Regional price tiers, as in Cap-go/capgo country_price_tier.ts. The backend reports the discount percent.
export const DISCOUNT_TIERS = ['p85', 'p70', 'p60', 'p50'] as const

// Stripe smallest-unit amounts keyed by lowercase ISO 4217 code.
export type PriceAmounts = Record<string, number>
// Keyed by plan product id (plans.stripe_id).
export type PlanPriceAmounts = Record<string, { month: PriceAmounts; year: PriceAmounts }>

export type PlanPricesResponse = {
  // False when some Stripe prices failed to load.
  complete: boolean
  // Currencies every plan is sold in for this visitor.
  currencies: string[]
  // The visitor's local currency when Stripe sells it, otherwise USD; null when nothing is sold.
  currency: string | null
  // Prices at the visitor's regional tier.
  prices: PlanPriceAmounts
  // Regional discount on the plans listed in regularPrices, only sold in `currencies`.
  discount: { percent: number; country: string | null; currencies: string[] } | null
  // Full prices of the discounted plans (strike-through, and the price in other currencies).
  regularPrices: PlanPriceAmounts
}

// p85 -> 15 (% off the full price).
export function tierDiscountPercent(tier: (typeof DISCOUNT_TIERS)[number]): number {
  return 100 - Number(tier.slice(1))
}

// Same special cases as Cap-go/capgo supabase/functions/shared/stripe-amount.ts (ISK and UGX stay
// two-decimal in the Stripe API). https://docs.stripe.com/currencies#special-cases
const ZERO_DECIMAL_CURRENCIES = new Set(['bif', 'clp', 'djf', 'gnf', 'jpy', 'kmf', 'krw', 'mga', 'pyg', 'rwf', 'vnd', 'vuv', 'xaf', 'xof', 'xpf'])
const THREE_DECIMAL_CURRENCIES = new Set(['bhd', 'jod', 'kwd', 'omr', 'tnd'])

export function stripeAmountToMajorUnits(amount: number, currency: string): number {
  const code = currency.toLowerCase()
  if (ZERO_DECIMAL_CURRENCIES.has(code)) return amount
  if (THREE_DECIMAL_CURRENCIES.has(code)) return amount / 1000
  return amount / 100
}

export type PriceFormat = 'whole' | 'cents' | 'unit'

// `whole` for plan prices, `cents` for totals that may be small, `unit` for per-MAU/GiB credit rates.
export function formatPrice(amount: number, currency: string, format: PriceFormat = 'whole', locale = 'en-US'): string {
  const code = currency.toUpperCase()
  const options: Intl.NumberFormatOptions = { style: 'currency', currency: code, currencyDisplay: 'narrowSymbol' }
  if (format === 'unit' && amount > 0 && amount < 1) {
    options.maximumSignificantDigits = 3
  } else if (format === 'whole' || (format === 'cents' && (amount >= 10 || Number.isInteger(amount)))) {
    options.minimumFractionDigits = 0
    options.maximumFractionDigits = 0
  } else {
    options.minimumFractionDigits = 0
    options.maximumFractionDigits = format === 'unit' ? 4 : 2
    if (format === 'cents') options.minimumFractionDigits = 2
  }
  try {
    return new Intl.NumberFormat(locale, options).format(format === 'whole' ? Math.round(amount) : amount)
  } catch {
    return `${code} ${amount}`
  }
}

export function currencyName(code: string, locale = 'en-US'): string {
  try {
    return new Intl.DisplayNames([locale], { type: 'currency' }).of(code.toUpperCase()) ?? code.toUpperCase()
  } catch {
    return code.toUpperCase()
  }
}
