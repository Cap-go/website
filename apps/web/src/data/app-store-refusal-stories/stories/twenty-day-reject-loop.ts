import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'twenty-day-reject-loop',
  batchId: 'batch-1',
  sortOrder: 8,
  title: '20 days in the reject, fix, wait loop',
  guidelineLabel: 'Review queue timing',
  tags: ['endless-review'],
  platform: 'iOS',
  body: 'Over 20 days, a developer went through rejection, fix, Waiting for Review, rejection, fix, and was still waiting at the time of posting.',
  resolution: 'Pending.',
  lesson: 'Every round trip can cost days. Batch every fix from a rejection note into a single build.',
}
