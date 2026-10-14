import { expect, test } from 'bun:test'
import { buildPricingFaqLdJsonQuestions, buildPricingFaqSections } from '../src/lib/pricingFaqContent.ts'

const testUrls = {
  docsMauUrl: 'https://capgo.app/docs/faq/#what-counts-as-a-mau-for-capgo',
  docsNativeBuildsUrl: 'https://capgo.app/docs/live-updates/testing-native-builds-without-live-updates/',
  docsBundlesUrl: 'https://capgo.app/docs/webapp/bundles/',
  docsAvailabilityUrl: 'https://capgo.app/docs/capgo-availability/',
}

test('pricing FAQ JSON-LD questions match the visible FAQ item count', () => {
  const sections = buildPricingFaqSections('en', testUrls)
  const visibleCount = sections.reduce((total, section) => total + section.items.length, 0)
  const ldJsonQuestions = buildPricingFaqLdJsonQuestions('en', testUrls)

  expect(ldJsonQuestions).toHaveLength(visibleCount)
  expect(ldJsonQuestions.every((entry) => entry.question.length > 0 && entry.answer.length > 0)).toBe(true)
})

test('pricing FAQ plan change and refund answers match localized copy', () => {
  const questions = buildPricingFaqLdJsonQuestions('en', testUrls)
  const planChange = questions.find((entry) => entry.question === 'Can I change my plan at any time?')
  const refunds = questions.find((entry) => entry.question === 'Do you offer refunds?')

  expect(planChange?.answer).toContain('Upgrades take effect immediately')
  expect(planChange?.answer).toContain('downgrades are applied at the end of your current billing cycle')
  expect(refunds?.answer).toContain('paid subscription fees are non-refundable')
})
