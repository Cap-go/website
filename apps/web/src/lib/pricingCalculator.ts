export type PricingPlan = {
  id: string
  name: string
  mau: number
  bandwidth: number
  storage: number
  price_m: number
  price_y: number
}

export type PricingUsage = {
  mau: number
  bandwidthGiB: number
  storageGiB: number
}

export type CreditStep = {
  step_min: number
  step_max: number
  price_per_unit: number
  type: string
  unit_factor: number
}

export type CostEstimate = {
  plan: PricingPlan | null
  planMonthly: number
  creditsMonthly: number
  totalMonthly: number
}

export function deriveUsage(mau: number, updatesByMonth: number, updateSizeMb: number): PricingUsage {
  const updates = mau * updatesByMonth

  return {
    mau,
    bandwidthGiB: (updates * updateSizeMb) / 1024,
    storageGiB: updateSizeMb / 1024,
  }
}

export function getOverageUsage(usage: PricingUsage, plan: PricingPlan): PricingUsage {
  return {
    mau: Math.max(0, usage.mau - plan.mau),
    bandwidthGiB: Math.max(0, usage.bandwidthGiB - plan.bandwidth),
    storageGiB: Math.max(0, usage.storageGiB - plan.storage),
  }
}

export function getPlanMonthlyPrice(plan: PricingPlan, yearly: boolean) {
  return yearly ? plan.price_y / 12 : plan.price_m
}

export function getPlanBillingPrice(plan: PricingPlan, yearly: boolean) {
  return yearly ? plan.price_y : plan.price_m
}

const gibToBytes = (gib: number) => Math.round(gib * 1024 * 1024 * 1024)

// Mirrors priceCreditTiers in the Capgo backend (utils/credits.ts): tiers follow
// total usage, so `value` is priced on the slice [included, included + value).
// Usage past every tier is billed at the highest tier.
export function priceCreditTiers(steps: CreditStep[], value: number, included = 0) {
  if (!Number.isFinite(value) || value <= 0) return 0

  const sorted = [...steps].sort((a, b) => a.step_min - b.step_min)
  const start = Math.max(Number.isFinite(included) ? included : 0, 0)
  const end = start + value
  let covered = 0
  let cost = 0
  const unitCost = (step: CreditStep, raw: number) => Math.ceil(raw / Math.max(step.unit_factor || 1, 1)) * step.price_per_unit

  for (const step of sorted) {
    const slice = Math.min(end, step.step_max) - Math.max(start, step.step_min)
    if (slice <= 0) continue
    cost += unitCost(step, slice)
    covered += slice
  }

  const highest = sorted.at(-1)
  if (covered < value && highest) cost += unitCost(highest, value - covered)
  return cost
}

// Monthly credits for the usage above the plan (or all usage without a plan).
export function creditsCost(steps: CreditStep[], usage: PricingUsage, plan: PricingPlan | null) {
  const billable = plan ? getOverageUsage(usage, plan) : usage
  const ofType = (type: string) => steps.filter((step) => step.type === type)
  return (
    priceCreditTiers(ofType('mau'), billable.mau, plan?.mau ?? 0) +
    priceCreditTiers(ofType('bandwidth'), gibToBytes(billable.bandwidthGiB), gibToBytes(plan?.bandwidth ?? 0)) +
    priceCreditTiers(ofType('storage'), gibToBytes(billable.storageGiB), gibToBytes(plan?.storage ?? 0))
  )
}

export function estimateCost(steps: CreditStep[], usage: PricingUsage, plan: PricingPlan | null, yearly: boolean): CostEstimate {
  const planMonthly = plan ? getPlanMonthlyPrice(plan, yearly) : 0
  const creditsMonthly = creditsCost(steps, usage, plan)
  return { plan, planMonthly, creditsMonthly, totalMonthly: planMonthly + creditsMonthly }
}

// Cheapest plan once overage credits are counted, so a smaller plan plus a few
// credits wins over jumping to the next tier.
export function recommendPlan(plans: PricingPlan[], steps: CreditStep[], usage: PricingUsage, yearly: boolean): PricingPlan {
  const sorted = [...plans].sort((a, b) => getPlanMonthlyPrice(a, yearly) - getPlanMonthlyPrice(b, yearly))
  // Without credit tiers overage looks free: fall back to the smallest plan that fits.
  if (!steps.length) {
    return sorted.find((plan) => usage.mau <= plan.mau && usage.bandwidthGiB <= plan.bandwidth && usage.storageGiB <= plan.storage) ?? sorted[sorted.length - 1]
  }
  let best = sorted[0]
  let bestTotal = Number.POSITIVE_INFINITY
  for (const plan of sorted) {
    const { totalMonthly } = estimateCost(steps, usage, plan, yearly)
    if (totalMonthly < bestTotal - 0.005) {
      best = plan
      bestTotal = totalMonthly
    }
  }
  return best
}
