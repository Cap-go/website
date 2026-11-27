import { describe, expect, it } from 'bun:test'
import { creditsCost, deriveUsage, type CreditStep, type PricingPlan } from './pricingCalculator'

const steps: CreditStep[] = [{ type: 'build_time', step_min: 0, step_max: 6000, price_per_unit: 0.08, unit_factor: 60 }]
const solo: PricingPlan = { id: 'solo', name: 'Solo', mau: 2000, buildSeconds: 3600, price_m: 14, price_y: 140 }

describe('pricing calculator build time', () => {
  it('multiplies apps, platforms, builds and minutes', () => {
    expect(deriveUsage(1000, { apps: 2, platforms: 2, buildsPerMonth: 4, minutesPerBuild: 6 }).buildSeconds).toBe(96 * 60)
  })

  it('bills only build minutes above the plan', () => {
    const usage = deriveUsage(1000, { apps: 1, platforms: 2, buildsPerMonth: 4, minutesPerBuild: 10 })
    expect(creditsCost(steps, usage, solo)).toBeCloseTo(20 * 0.08)
  })
})
