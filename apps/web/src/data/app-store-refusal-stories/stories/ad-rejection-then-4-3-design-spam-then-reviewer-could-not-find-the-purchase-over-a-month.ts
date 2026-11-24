import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'ad-rejection-then-4-3-design-spam-then-reviewer-could-not-find-the-purchase-over-a-month',
  batchId: 'batch-31',
  sortOrder: 145,
  title:
    'An ad, then 4.3 design spam, then a reviewer who could not find the in-app purchase: over a month and counting',
  guidelineLabel: 'Guideline 4.3 Design: Spam, among several rejections',
  tags: ['endless-review', '4-3'],
  platform: 'iOS',
  body: 'A developer submitted an iOS app in late October. Two days later it was rejected because of an ad the reviewer saw in the app. They fixed it and resubmitted the same day. About three weeks later the app was rejected again, this time under 4.3 as design spam, a decision the developer believed was automated. They wrote to Apple, and two days later Apple agreed to continue the review, only to reject the app the same day because the reviewer could not find the in-app purchase. The developer resubmitted with a video showing the purchase.',
  resolution:
    'Not resolved at the time of writing. A week after sending the video the app was still waiting for review, while the Android version had been approved by Google Play within a day of submission.',
  lesson:
    'Every rejection sends you back into the queue, so fix everything you can see before you resubmit. Make the in-app purchase easy to reach and put the exact path to it, or a short video, in the review notes from the first submission. If a 4.3 rejection looks wrong, reply in App Store Connect and explain what makes your app different.',
}