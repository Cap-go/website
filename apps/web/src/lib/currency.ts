// Display currencies for the pricing page. Capgo bills in USD; other currencies are converted
// estimates using daily ECB reference rates (served by the worker at CURRENCY_ENDPOINT).

export const BASE_CURRENCY = 'USD'
export const CURRENCY_ENDPOINT = '/currency.json'
export const CURRENCY_STORAGE_KEY = 'capgo_currency'

// Every code here must exist in the ECB reference rate set used by the worker.
export const SUPPORTED_CURRENCIES = [
  'USD',
  'EUR',
  'GBP',
  'CAD',
  'AUD',
  'NZD',
  'CHF',
  'JPY',
  'CNY',
  'HKD',
  'SGD',
  'KRW',
  'INR',
  'IDR',
  'MYR',
  'PHP',
  'THB',
  'BRL',
  'MXN',
  'SEK',
  'NOK',
  'DKK',
  'ISK',
  'PLN',
  'CZK',
  'HUF',
  'RON',
  'TRY',
  'ILS',
  'ZAR',
] as const

export type CurrencyCode = (typeof SUPPORTED_CURRENCIES)[number]

const EURO_COUNTRIES = [
  'AD', 'AT', 'BE', 'CY', 'DE', 'EE', 'ES', 'FI', 'FR', 'GR', 'HR', 'IE', 'IT', 'LT', 'LU', 'LV', 'MC', 'ME', 'MT', 'NL', 'PT', 'SI', 'SK', 'SM', 'VA', 'XK',
  'GF', 'GP', 'MQ', 'RE', 'YT', 'PM', 'BL', 'MF', 'AX',
]

const COUNTRY_CURRENCY: Record<string, CurrencyCode> = {
  ...Object.fromEntries(EURO_COUNTRIES.map((country) => [country, 'EUR'])),
  GB: 'GBP',
  GG: 'GBP',
  JE: 'GBP',
  IM: 'GBP',
  CA: 'CAD',
  AU: 'AUD',
  NZ: 'NZD',
  CH: 'CHF',
  LI: 'CHF',
  JP: 'JPY',
  CN: 'CNY',
  HK: 'HKD',
  SG: 'SGD',
  KR: 'KRW',
  IN: 'INR',
  ID: 'IDR',
  MY: 'MYR',
  PH: 'PHP',
  TH: 'THB',
  BR: 'BRL',
  MX: 'MXN',
  SE: 'SEK',
  NO: 'NOK',
  DK: 'DKK',
  FO: 'DKK',
  GL: 'DKK',
  IS: 'ISK',
  PL: 'PLN',
  CZ: 'CZK',
  HU: 'HUF',
  RO: 'RON',
  TR: 'TRY',
  IL: 'ILS',
  ZA: 'ZAR',
}

export function isSupportedCurrency(code: unknown): code is CurrencyCode {
  return typeof code === 'string' && (SUPPORTED_CURRENCIES as readonly string[]).includes(code)
}

export function currencyForCountry(country: string | null | undefined): CurrencyCode {
  return (country && COUNTRY_CURRENCY[country.toUpperCase()]) || BASE_CURRENCY
}

export type CurrencyRates = Partial<Record<CurrencyCode, number>>

export type CurrencyPayload = {
  country: string | null
  currency: CurrencyCode
  rates: CurrencyRates
  date: string | null
}

export type PriceFormat = 'whole' | 'cents' | 'unit'

// `whole` for plan prices, `cents` for totals that may be small, `unit` for per-MAU/GiB credit rates.
export function formatPrice(amount: number, currency: string, format: PriceFormat = 'whole', locale = 'en-US'): string {
  const options: Intl.NumberFormatOptions = { style: 'currency', currency, currencyDisplay: 'narrowSymbol' }
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
    return `${currency} ${amount}`
  }
}

export function currencyName(code: string, locale = 'en-US'): string {
  try {
    return new Intl.DisplayNames([locale], { type: 'currency' }).of(code) ?? code
  } catch {
    return code
  }
}
