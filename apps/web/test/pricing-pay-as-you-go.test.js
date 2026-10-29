import { expect, test } from 'bun:test'
import credits from '../src/data/capgo-credits.json'
import { creditsCost } from '../src/lib/pricingCalculator.ts'

test('a small live-update app can run for a year on $5 without a subscription', () => {
  const monthlyCost = creditsCost(credits, { mau: 50, bandwidthGiB: 1, storageGiB: 1 }, null)

  expect(monthlyCost).toBeGreaterThan(0)
  expect(monthlyCost * 12).toBeLessThanOrEqual(5)
})

test('the annual $5 example does not cover higher usage', () => {
  const monthlyCost = creditsCost(credits, { mau: 500, bandwidthGiB: 25, storageGiB: 1 }, null)

  expect(monthlyCost * 12).toBeGreaterThan(5)
})
