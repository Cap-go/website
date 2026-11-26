import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'buy-button-loading-forever-and-same-promo-image-on-five-subscriptions',
  batchId: 'batch-33',
  sortOrder: 151,
  title: 'Changes needed: a buy button that loaded forever and the same promo image on all five subscriptions',
  guidelineLabel: 'Guideline number not stated (app completeness and subscription metadata)',
  tags: ['2-1', 'metadata'],
  platform: 'iOS',
  body: 'An iOS app came back from App Review with Changes needed and two problems. Tapping the buy button on the paywall froze the app, and it kept loading forever, so a purchase could never finish. On top of that, all five subscriptions had the same promotional image.',
  resolution:
    'The developer fixed both issues and resubmitted for a second round. The post did not say whether it was approved.',
  lesson:
    'Test the full purchase flow in the sandbox on a clean install before every submission, not just the paywall screen. Give each subscription its own promotional image, since reviewers check that metadata too.',
}