import { expect, test } from 'bun:test'
import plans from '../src/data/capgo-plans.json'
import { observeEventsForPlan } from '../src/lib/observePlanAllowance.ts'

const expected = {
  Solo: 500_000,
  Maker: 3_000_000,
  Team: 20_000_000,
  Enterprise: 600_000_000,
}

test('each plan snapshot publishes its observe allowance', () => {
  for (const [name, events] of Object.entries(expected)) {
    const plan = plans.find(row => row.name === name)
    expect(plan?.observe_events).toBe(events)
    expect(observeEventsForPlan(plan)).toBe(events)
  }
})

test('a plans response without the column still shows the published allowance', () => {
  expect(observeEventsForPlan({ name: 'Team' })).toBe(20_000_000)
})
