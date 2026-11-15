import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'weekly-subscription-price-review-paused-for-confirmation',
  batchId: 'batch-23',
  sortOrder: 123,
  title: 'A review was paused by an automated message asking the developer to confirm a $9.99 weekly subscription price',
  guidelineLabel: 'App Review Guideline Issue, price verification',
  tags: ['metadata'],
  platform: 'iOS',
  body: "A developer's submission stopped with an automated App Review message. The review could not continue until they confirmed that one in-app purchase, a weekly subscription priced at $9.99, had the price they intended. The same paywall also offered cheaper plans, and it was the first time the developer had seen a review paused over pricing.",
  resolution:
    'The developer replied in App Store Connect to confirm the price was intentional and was waiting for the review to resume at the time of writing.',
  lesson:
    'Apple can stop a review to double check a price that looks high or out of line with the rest of a paywall. It is not a rejection yet, so answer quickly in App Store Connect, say the price is intended, and briefly explain how that plan relates to the cheaper options so the reviewer has nothing left to ask.',
}