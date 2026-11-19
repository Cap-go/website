import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'four-apps-4-3-in-one-month-merged-into-one-app-approved',
  batchId: 'batch-26',
  sortOrder: 132,
  title: 'Four apps were rejected under 4.3 spam in one month, and merging one of them into an existing app as a feature got it approved',
  guidelineLabel: 'Guideline 4.3 Design: Spam',
  tags: ['4-3'],
  platform: 'iOS',
  body: 'A developer who builds one app per idea had four apps rejected under guideline 4.3 spam within a single month. One of them was a small selfie app that kept getting turned down as a standalone product.',
  resolution:
    'Instead of resubmitting it again, the developer folded the selfie app into one of their existing apps as a feature. That update was approved.',
  lesson:
    'Under 4.3, several thin apps from one account can read as spam even when each idea is different. If an idea is small, ship it as a feature inside a stronger app rather than as its own listing.',
}