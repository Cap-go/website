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

export function getIncludedUsage(usage: PricingUsage, plan: PricingPlan): PricingUsage {
  return {
    mau: Math.min(usage.mau, plan.mau),
    bandwidthGiB: Math.min(usage.bandwidthGiB, plan.bandwidth),
    storageGiB: Math.min(usage.storageGiB, plan.storage),
  }
}

export function planSortPrice(plan: PricingPlan, yearly: boolean) {
  return yearly ? plan.price_y : plan.price_m * 12
}

export function recommendPlan(plans: PricingPlan[], usage: PricingUsage, yearly: boolean): PricingPlan {
  const sorted = [...plans].sort((a, b) => planSortPrice(a, yearly) - planSortPrice(b, yearly))

  const fitting = sorted.filter((plan) => usage.mau <= plan.mau && usage.bandwidthGiB <= plan.bandwidth && usage.storageGiB <= plan.storage)

  if (fitting.length > 0) return fitting[0]

  return sorted[sorted.length - 1]
}

export function getPlanMonthlyPrice(plan: PricingPlan, yearly: boolean) {
  return yearly ? plan.price_y / 12 : plan.price_m
}

export function getPlanBillingPrice(plan: PricingPlan, yearly: boolean) {
  return yearly ? plan.price_y : plan.price_m
}

const gibToBytes = (gib: number) => Math.round(gib * 1024 * 1024 * 1024)

// Usage is the billable overage. Credit tiers follow total usage, so with a
// plan the overage is priced from the plan allowance upward (`included`).
export function usageToCreditPayload(usage: PricingUsage, plan?: PricingPlan | null) {
  return {
    mau: Math.round(usage.mau),
    bandwidth: gibToBytes(usage.bandwidthGiB),
    storage: gibToBytes(usage.storageGiB),
    ...(plan
      ? {
          included: {
            mau: plan.mau,
            bandwidth: gibToBytes(plan.bandwidth),
            storage: gibToBytes(plan.storage),
          },
        }
      : {}),
  }
}
