import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'fourteen-day-review-rejected-then-two-more-weeks-waiting',
  batchId: 'batch-15',
  sortOrder: 98,
  title: 'More than fourteen days in review ended in a rejection, and the resubmission waited two more weeks',
  guidelineLabel: 'Endless review',
  tags: ['endless-review'],
  platform: 'iOS',
  body:
    'A developer said their previous review took more than fourteen days and ended in a rejection. They resubmitted on October 21, and almost two weeks later the submission was still in Waiting for Review, while Apple says most reviews take 24 to 48 hours.',
  resolution: 'Still waiting for review at the time of posting.',
  lesson:
    'Average review times do not describe the worst case, and a rejection sends you back to the end of a slow queue. Plan launches with weeks of margin, and make the first submission as complete as possible so a rejection does not double the wait.',
}
