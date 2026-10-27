// Display currencies for the pricing page. Plan prices are the exact amounts of the Capgo Stripe prices
// (currency_options), snapshotted nightly by scripts/fetch-build-data.ts into data/capgo-plan-prices.json.
// Nothing is converted with exchange rates: a currency is offered only when Stripe sells every plan in it.

export const BASE_CURRENCY = 'usd'
export const CURRENCY_ENDPOINT = '/currency.json'
export const CURRENCY_STORAGE_KEY = 'capgo_currency'

// Regional (purchasing power) price tiers, as in Cap-go/capgo country_price_tier.ts. Most expensive first.
export const PRICE_TIERS = ['p100', 'p85', 'p70', 'p60', 'p50'] as const
export type PriceTier = (typeof PRICE_TIERS)[number]
export const FULL_PRICE_TIER: PriceTier = 'p100'

// Major-unit amounts keyed by lowercase ISO 4217 code.
export type PriceAmounts = Record<string, number>
export type PlanPriceSet = { month: PriceAmounts; year: PriceAmounts }
// `tiers` holds the regional discount prices (plans.regional_price_ids); plans without them sell the full price everywhere.
export type PlanPrices = PlanPriceSet & { tiers?: Partial<Record<PriceTier, PlanPriceSet>> }
// Keyed by plan product id (plans.stripe_id).
export type PlanPricesSnapshot = { plans: Record<string, PlanPrices> }

export type CurrencyPayload = {
  country: string | null
  // Local currency of the country; the page only uses it when Stripe sells every plan in it.
  currency: string | null
  tier: PriceTier
}

export function isPriceTier(value: unknown): value is PriceTier {
  return typeof value === 'string' && (PRICE_TIERS as readonly string[]).includes(value)
}

// p85 -> 15 (% off the full price).
export function tierDiscountPercent(tier: PriceTier): number {
  return 100 - Number(tier.slice(1))
}

// Currencies every plan is sold in, monthly and yearly. Falls back to USD when the snapshot is empty.
export function commonCurrencies(snapshot: PlanPricesSnapshot): string[] {
  const sets = Object.values(snapshot.plans).flatMap((plan) => [plan.month, plan.year])
  if (!sets.length) return [BASE_CURRENCY]
  const currencies = Object.keys(sets[0]).filter((currency) => sets.every((amounts) => currency in amounts))
  return currencies.includes(BASE_CURRENCY) ? currencies.sort((a, b) => a.localeCompare(b)) : [BASE_CURRENCY]
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
