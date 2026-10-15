import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'metadata-iap-checkboxes',
  batchId: 'batch-1',
  sortOrder: 6,
  title: 'Two rejections for known checkboxes',
  guidelineLabel: 'Metadata and in app purchase setup',
  tags: ['metadata'],
  platform: 'iOS',
  body: 'An indie developer was rejected twice for things they already knew. First, the build went in without its in app purchases attached and the description did not link the terms of use. Weeks later, a screenshot described the app as free.',
  resolution: 'Fixed and resubmitted each time.',
  lesson: 'Keep a pre submission checklist for metadata, subscriptions and legal links. Most metadata rejections are avoidable.',
}
