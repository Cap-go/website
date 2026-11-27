import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'live-paywall-update-rejected-in-11-minutes-monthly-price-first-and-faded-plan-label',
  batchId: 'batch-34',
  sortOrder: 153,
  title: "A live app's update was rejected in 11 minutes for the monthly price shown first and a plan label that looked disabled",
  guidelineLabel: 'Guidelines 3.1.2(c) and 2.1(b)',
  tags: ['3-1-2', '2-1'],
  platform: 'iOS',
  body: 'A developer with a successful live subscription app had never had an update rejected. Then one was rejected after 11 minutes in review, on an iPad, for two small paywall details. Under 3.1.2(c), the yearly plan showed the monthly equivalent before the yearly price actually billed. Under 2.1(b), the unselected yearly label was so faded that it looked like a disabled button.',
  resolution:
    'The developer fixed both details and resubmitted, which meant another wait for review. They admitted their own pre-submission checker had flagged the issue and they had chosen to ignore it.',
  lesson:
    'A paywall that passed many reviews can still be rejected on the next one. Make the billed amount the clearest price on screen, keep unselected options readable, and test the paywall on an iPad, since that is where this reviewer looked.',
}