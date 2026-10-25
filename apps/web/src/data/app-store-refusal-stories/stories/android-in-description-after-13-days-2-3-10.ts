import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'android-in-description-after-13-days-2-3-10',
  batchId: 'batch-5',
  sortOrder: 56,
  title: 'Thirteen days in queue, rejected in seven minutes over Android',
  guidelineLabel: 'Guideline 2.3.10',
  tags: ['2-3-10'],
  platform: 'iOS',
  body: 'A developer waited thirteen days in the review queue, checking App Store Connect and email every day and filing two support requests. When review finally started, the app was rejected about seven minutes later because the App Store description said the product worked in any browser on iPhone or Android.',
  resolution: 'They removed the mention of the other platform, a one line edit, and resubmitted. Outcome not yet reported.',
  lesson:
    'Apple rejects metadata that names other mobile platforms. Scan your description, screenshots, and promo text for competitor platform names before submitting, because a tiny wording issue can cost a full queue wait.',
}
