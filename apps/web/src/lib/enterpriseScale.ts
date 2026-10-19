import { priceCreditTiers, type CreditStep } from '@/lib/pricingCalculator'

// Mirrors src/services/enterpriseScale.ts in the Capgo console: Enterprise
// scales past its included MAU with credits bought every month on the same
// subscription, priced on the public MAU credit tiers.
export const ENTERPRISE_MAU_STOPS = [1_000_000, 2_000_000, 3_000_000, 5_000_000, 7_500_000, 10_000_000, 15_000_000, 25_000_000, 50_000_000, 100_000_000] as const

export type { CreditStep }

// The extra MAU is priced on the slice [included, target) of the MAU ladder.
export function priceMauSlice(steps: CreditStep[], included: number, target: number) {
  return priceCreditTiers(
    steps.filter((step) => step.type === 'mau'),
    target - included,
    included,
  )
}

// Credits are bought in whole dollars, rounded up so the MAU picked is always covered.
export function enterpriseMonthlyCredits(steps: CreditStep[], includedMau: number, targetMau: number) {
  return Math.ceil(priceMauSlice(steps, includedMau, targetMau))
}

// "3M" reads like a plan name; locale compact notation can render "3 Mio".
export function formatMau(value: number) {
  if (value >= 1_000_000) return `${new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(value / 1_000_000)}M`
  return new Intl.NumberFormat('en-US').format(value)
}

export function formatUsd(value: number) {
  return `$${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Math.round(value))}`
}
