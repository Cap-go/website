import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'stuck-three-weeks-waiting-for-review-unaccepted-agreements',
  batchId: 'batch-22',
  sortOrder: 120,
  title: 'An app sat in Waiting for Review for more than three weeks until the developer accepted updated agreements',
  guidelineLabel: 'App Store Connect agreements',
  tags: ['endless-review'],
  platform: 'Apple Developer Program',
  body: 'An indie developer submitted an app and watched it sit in Waiting for Review for more than three weeks with no movement and no explanation. The cause was on their side of App Store Connect: Apple had published updated Developer Program agreements and terms, and they had not accepted them yet. The developer said nothing notified or warned them that the pending agreements were holding up the review.',
  resolution: 'Once the developer accepted the new agreements in App Store Connect, the submission started moving again.',
  lesson:
    'When a submission stalls far beyond normal review times, check the agreements section of App Store Connect before assuming you are just stuck in a slow queue. Pending agreements are easy to miss, and nothing on the submission itself may point to them.',
}
