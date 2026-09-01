import { expect, test } from 'bun:test'

// Blog TOC scroll used querySelector(`#${headingId}-link`). IDs that start with a digit
// are invalid CSS selectors and throw DOMException (see PostHog error tracking).
// Fix: use document.getElementById(`${headingId}-link`) instead.

const POSTHOG_INVALID_SELECTORS = [
  '#1-continuous-integrationcontinuous-deployment-cicd-link',
  '#2021-android-guide-firebase-crashlytics---custom-crash--link',
]

test('posthog-reported blog toc selectors start with a digit after #', () => {
  for (const selector of POSTHOG_INVALID_SELECTORS) {
    expect(selector.startsWith('#')).toBe(true)
    expect(/^\#[0-9]/.test(selector)).toBe(true)
  }
})

test('toc link element ids match heading slug plus -link suffix', () => {
  const headingId = '1-continuous-integrationcontinuous-deployment-cicd'
  expect(`${headingId}-link`).toBe('1-continuous-integrationcontinuous-deployment-cicd-link')
})
