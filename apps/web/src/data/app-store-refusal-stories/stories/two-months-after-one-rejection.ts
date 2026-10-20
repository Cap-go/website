import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'two-months-after-one-rejection',
  batchId: 'batch-1',
  sortOrder: 14,
  title: 'One rejection, then two months of silence',
  guidelineLabel: 'Review queue timing',
  tags: ['endless-review'],
  platform: 'iOS',
  body: "After a single rejection, a developer's app sat in review for around two months, with each review cycle taking roughly a month. They suspected long cycles had become a way to keep new apps out.",
  resolution: 'Still stuck at the time of posting.',
  lesson:
    'After a rejection, the next cycle can be far slower than the first. Make your resubmission complete and well documented so you do not spend another month on a second round trip.',
}
