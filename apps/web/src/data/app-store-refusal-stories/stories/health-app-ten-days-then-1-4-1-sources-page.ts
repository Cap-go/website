import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'health-app-ten-days-then-1-4-1-sources-page',
  batchId: 'batch-16',
  sortOrder: 101,
  title: 'Ten days in review for a health app, then a 1.4.1 rejection fixed with a sources page in one afternoon',
  guidelineLabel: 'Guideline 1.4.1 Physical Harm (health and medical)',
  tags: ['endless-review'],
  platform: 'iOS',
  body:
    'An indie developer building a health app waited more than ten days in App Store review. The verdict was a rejection under guideline 1.4.1, which covers health and medical apps. The fix was small: the developer added a sources page citing where the health information in the app comes from, and it took a single afternoon to build.',
  resolution:
    'Added a sources page with citations, which took one afternoon. Whether the resubmission was approved was not shared in the post.',
  lesson:
    'Health apps are held to a higher bar, and a long wait can end with a request you could have met before submitting. If your app shows health or medical information, add clear citations for it in the app before the first submission. One developer replying noted that a visible reminder to check with a doctor is another common ask.',
}
