import { expect, test } from 'bun:test'
import credits from '../src/data/capgo-credits.json'
import plansData from '../src/data/capgo-plans.json'
import { creditsCost, deriveUsage, estimateCost, recommendOption, usageRowState } from '../src/lib/pricingCalculator.ts'

const plans = plansData
  .filter((plan) => plan.name !== 'Free')
  .map((plan) => ({
    id: plan.id,
    name: plan.name,
    mau: plan.mau || 0,
    bandwidth: plan.bandwidth || 0,
    storage: plan.storage || 0,
    price_m: plan.price_m || 0,
    price_y: plan.price_y || 0,
  }))
const steps = credits.filter((step) => ['mau', 'bandwidth', 'storage'].includes(step.type))

test('100 MAU, 4 updates, 4 MB picks pay as you go with the credits estimate', () => {
  const usage = deriveUsage(100, 4, 4)
  expect(recommendOption(plans, steps, usage, false)).toBeNull()
  const estimate = estimateCost(steps, usage, null, false)
  expect(estimate.planMonthly).toBe(0)
  expect(estimate.totalMonthly).toBe(creditsCost(steps, usage, null))
  expect(estimate.totalMonthly).toBeGreaterThan(0)
})

test('499 MAU still picks pay as you go', () => {
  expect(recommendOption(plans, steps, deriveUsage(499, 4, 4), false)).toBeNull()
  expect(recommendOption(plans, steps, deriveUsage(499, 4, 4), true)).toBeNull()
})

test('500 MAU keeps the normal plan pick (Solo)', () => {
  expect(recommendOption(plans, steps, deriveUsage(500, 4, 4), false)?.name).toBe('Solo')
})

test('pay as you go usage rows are never over a plan quota', () => {
  const usage = deriveUsage(100, 4, 4)
  for (const used of [usage.mau, usage.bandwidthGiB, usage.storageGiB]) {
    expect(usageRowState(used, 0, false).over).toBe(0)
  }
})

test('plan usage rows still report overage', () => {
  expect(usageRowState(1500, 1000, true)).toEqual({ over: 500, fill: 100 })
  expect(usageRowState(500, 1000, true)).toEqual({ over: 0, fill: 50 })
})

test('paid plans do not charge storage or bandwidth beyond the former quotas', () => {
  const solo = plans.find((plan) => plan.name === 'Solo')
  const usage = { mau: solo.mau, bandwidthGiB: solo.bandwidth * 100, storageGiB: solo.storage * 100 }
  const estimate = estimateCost(steps, usage, solo, false)

  expect(estimate.creditsMonthly).toBe(0)
  expect(estimate.totalMonthly).toBe(solo.price_m)
  expect(recommendOption(plans, steps, usage, false)?.id).toBe(solo.id)
  expect(recommendOption(plans, [], usage, false)?.id).toBe(solo.id)
})

test('paid plans still charge extra MAU independently of fair-use metrics', () => {
  const solo = plans.find((plan) => plan.name === 'Solo')
  const usage = { mau: solo.mau + 100, bandwidthGiB: 0, storageGiB: 0 }
  const mauOnly = creditsCost(steps, usage, solo)

  expect(mauOnly).toBeGreaterThan(0)
  expect(creditsCost(steps, { ...usage, bandwidthGiB: 1_000_000, storageGiB: 100_000 }, solo)).toBe(mauOnly)
})

test('credit-only accounts still pay for storage and bandwidth', () => {
  const mauOnly = creditsCost(steps, { mau: 100, bandwidthGiB: 0, storageGiB: 0 }, null)
  const allUsage = creditsCost(steps, { mau: 100, bandwidthGiB: 100, storageGiB: 10 }, null)

  expect(allUsage).toBeGreaterThan(mauOnly)
})

test('light MAU with heavy bandwidth recommends the cheaper fair-use plan', () => {
  const usage = deriveUsage(499, 60, 100)
  const plan = recommendOption(plans, steps, usage, false)

  expect(plan?.name).toBe('Solo')
  expect(estimateCost(steps, usage, plan, false).totalMonthly).toBeLessThan(creditsCost(steps, usage, null))
})
