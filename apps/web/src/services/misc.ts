export const shortNumber = (number: number) => {
  if (number >= 1000000000) return `${(number / 1000000000).toFixed(1)}B`
  if (number >= 1000000) return `${(number / 1000000).toFixed(1)}M`
  if (number >= 1000) return `${(number / 1000).toFixed(1)}K`
  return `${number}`
}

export const renameCat = (text: string) => text.replaceAll('_', ' ')

export const updateCalc = (plan: any) => plan.mau * 20

const spaceSeparatedNumberFormatter = new Intl.NumberFormat('en-US')

export const numberWithSpaces = (x: number) => spaceSeparatedNumberFormatter.format(x).replaceAll(',', ' ')

export const toTb = (value: number) => (value / 1000).toFixed(2).toLocaleString()

export const roundNumber = (number: number) => Math.round(number * 100) / 100

/**
 * Store-share percentage from the store_top API, or null when the value is missing or implausible
 * (the API has returned 100.00 for every framework), so pages hide the sentence instead of printing a wrong share.
 */
export function plausibleStoreShare(value: unknown): string | null {
  const share = typeof value === 'number' ? value : Number.parseFloat(String(value))
  return Number.isFinite(share) && share > 0 && share < 90 ? share.toFixed(2) : null
}
