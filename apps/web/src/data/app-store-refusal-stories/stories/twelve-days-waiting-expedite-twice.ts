import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'twelve-days-waiting-expedite-twice',
  batchId: 'batch-2',
  sortOrder: 48,
  title: 'Twelve days in Waiting for Review after two expedite requests',
  guidelineLabel: 'Review delay (no guideline cited)',
  tags: ['endless-review'],
  platform: 'iOS',
  body:
    'A developer who already had apps approved on the store submitted version 1.0 of a new app together with a subscription group of five subscriptions. Twelve days later it was still in Waiting for Review, against the usual expectation of under 48 hours. They requested an expedited review twice, contacted support without getting an answer, and tried to book an App Review appointment, which was declined.',
  resolution: 'Still waiting at the time of writing.',
  lesson:
    'Do not plan a launch date on the 48 hour average. Leave weeks of buffer for a first version with subscriptions, and treat expedite requests and appointments as possible, not promised.',
}
