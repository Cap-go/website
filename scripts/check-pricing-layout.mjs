#!/usr/bin/env bun
import assert from 'node:assert/strict'
import { chromium } from 'playwright'
import plans from '../apps/web/src/data/capgo-plans.json'
import { startStaticServer } from './lib/static-preview.mjs'

const server = await startStaticServer('apps/web/dist', 0)
const baseUrl = `http://127.0.0.1:${server.address().port}`
const browser = await chromium.launch()
const widths = [390, 640, 768, 1024, 1280, 1440, 1920]
const scenarios = [
  { name: 'USD', currency: 'usd' },
  { name: 'EUR', currency: 'eur' },
  { name: 'regional EUR', currency: 'eur', discounted: true },
  { name: 'unavailable prices', currency: 'usd', unavailable: true },
]

function priceCatalog(scenario) {
  const regularPrices = {}
  const prices = Object.fromEntries(
    plans.map((plan) => {
      const amounts = Object.fromEntries(
        ['month', 'year'].map((interval) => {
          const amount = plan[interval === 'month' ? 'price_m' : 'price_y'] * 100
          return [interval, { usd: amount, eur: Math.round(amount * 0.89) }]
        }),
      )
      if (scenario.discounted && plan.name === 'Solo') {
        regularPrices[plan.stripe_id] = structuredClone(amounts)
        for (const interval of ['month', 'year']) amounts[interval].eur = Math.round(amounts[interval].eur * 0.6)
      }
      return [plan.stripe_id, amounts]
    }),
  )
  return {
    complete: true,
    currencies: ['usd', 'eur'],
    currency: scenario.currency,
    prices,
    regularPrices,
    discount: scenario.discounted ? { percent: 40, country: 'PT', currencies: ['eur'] } : null,
  }
}

try {
  for (const scenario of scenarios) {
    const context = await browser.newContext()
    await context.route('**/*', (route) => {
      if (route.request().url().includes('/private/plan_prices/public')) {
        return route.fulfill({ status: scenario.unavailable ? 503 : 200, json: priceCatalog(scenario) })
      }
      return route.request().url().startsWith(baseUrl) ? route.continue() : route.abort()
    })
    const page = await context.newPage()
    await page.goto(`${baseUrl}/pricing/`, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    assert.equal(await page.locator('[data-plan="Solo"] [data-regional-discount]').isVisible(), !!scenario.discounted)
    assert.ok((await page.locator('[data-plan="Solo"] [data-price]').innerText()).includes(scenario.currency === 'eur' ? '€' : '$'))

    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 })
      for (const interval of ['yearly', 'monthly']) {
        await page.locator(`label[for="${interval}"]`).click()
        const label = `${scenario.name}, ${width}px, ${interval}`
        const cards = await page.locator('#plans [data-plan]').evaluateAll((elements) =>
          elements.map((element) => {
            const card = element.getBoundingClientRect()
            const button = element.querySelector('a[href*="register"]').getBoundingClientRect()
            return {
              name: element.dataset.plan,
              row: Math.round(card.top),
              buttonTop: button.top,
              buttonBottom: button.bottom,
              overflows: element.scrollWidth > element.clientWidth,
            }
          }),
        )
        assert.equal(cards.length, 5, label)
        for (const card of cards) {
          const peer = cards.find((candidate) => candidate.row === card.row)
          assert.ok(Math.abs(card.buttonTop - peer.buttonTop) <= 1, `${label}: ${card.name} CTA is not aligned with ${peer.name}`)
          assert.ok(Math.abs(card.buttonBottom - peer.buttonBottom) <= 1, `${label}: ${card.name} CTA height differs from ${peer.name}`)
          assert.ok(!card.overflows, `${label}: ${card.name} overflows its card`)
        }

        const teamButton = page.locator('[data-plan="Enterprise"] a[aria-label="Talk to our team"]')
        await teamButton.scrollIntoViewIfNeeded()
        const avatars = teamButton.locator('img')
        assert.equal(await avatars.count(), 3, `${label}: missing team avatars`)
        for (const avatar of await avatars.all()) {
          assert.ok(await avatar.isVisible(), `${label}: hidden team avatar`)
          await avatar.evaluate((image) => image.decode())
        }
        assert.ok(
          await teamButton.evaluate((button) => {
            const bounds = button.getBoundingClientRect()
            return [...button.querySelectorAll('img')].every((image) => {
              const avatar = image.getBoundingClientRect()
              return image.naturalWidth > 0 && avatar.left >= bounds.left && avatar.right <= bounds.right && avatar.top >= bounds.top && avatar.bottom <= bounds.bottom
            })
          }),
          `${label}: team avatars are broken or outside the button`,
        )
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${label}: horizontal page overflow`)
        console.log(`PASS ${label}`)
      }
    }
    await context.close()
  }
} finally {
  await browser.close()
  await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())))
}
