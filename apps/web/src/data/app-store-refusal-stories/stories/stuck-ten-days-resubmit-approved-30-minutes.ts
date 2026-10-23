import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'stuck-ten-days-resubmit-approved-30-minutes',
  batchId: 'batch-3',
  sortOrder: 50,
  title: 'Ten days stuck in review, then approved half an hour after resubmit',
  guidelineLabel: 'Review delay (no guideline cited)',
  tags: ['endless-review'],
  platform: 'iOS',
  body: 'The app sat in review for more than ten days without moving. The developer resubmitted it.',
  resolution: 'It was approved about 30 minutes after resubmitting.',
  lesson:
    'A stalled review is not always a verdict on your app. When it is stuck well past the usual time, resubmitting or requesting an expedited review can be worth a try, but neither is guaranteed.',
}
