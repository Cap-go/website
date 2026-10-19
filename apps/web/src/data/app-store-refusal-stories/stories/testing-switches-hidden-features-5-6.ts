import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'testing-switches-hidden-features-5-6',
  batchId: 'batch-1',
  sortOrder: 32,
  title: 'Rejected as fraud for leftover testing switches',
  guidelineLabel: 'Guidelines 5.6 Developer Code of Conduct and 2.5.19 Hidden Features',
  tags: ['5-6', '2-5-19'],
  platform: 'iOS',
  body:
    'In September 2026 a developer had an iOS app rejected under guideline 5.6 Developer Code of Conduct. Apple said it had found a pattern of behavior it associates with fraud, specifically features that looked like they had been deliberately hidden during review. The developer traced it to three testing switches they had left in the release build: a mode for taking store screenshots, a switch that simulated a slow entitlement check, and a switch that unlocked mock purchases. None of them could be reached by normal users of the App Store version. In Apple\'s October 16 App Review Guidelines update, hidden, dormant, or undocumented features became their own guideline, 2.5.19, and Apple says breaking it can put the whole developer account at risk.',
  resolution:
    'The developer now inspects the strings inside every release archive before uploading. Whether that specific build was later approved was not stated.',
  lesson:
    'Keep test-only code out of release builds at compile time, for example with DEBUG flags, rather than behind a runtime check. Check what actually ships in the archived binary, and list any switch that stays in the App Review notes.',
}
