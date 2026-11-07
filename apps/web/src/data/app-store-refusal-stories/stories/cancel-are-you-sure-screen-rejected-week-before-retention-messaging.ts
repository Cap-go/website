import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'cancel-are-you-sure-screen-rejected-week-before-retention-messaging',
  batchId: 'batch-18',
  sortOrder: 108,
  title: 'Rejected for an extra are you sure step at cancel, a week before Apple launched retention messaging',
  guidelineLabel: 'Subscription cancellation flow (guideline number not stated)',
  tags: ['metadata'],
  platform: 'iOS',
  body: 'A subscription app showed its own are you sure screen when users went to cancel. App Review rejected the app for it. Less than a week later, App Store Connect announced retention messaging, which lets developers show subscribers a message, with an optional image or a retention offer, when they try to cancel their subscription.',
  resolution: 'The post did not say how the rejection was fixed. The new App Store Connect feature now gives an Apple approved way to show a message at cancel time.',
  lesson:
    'Do not put your own friction in front of subscription cancellation. Let users reach the cancel flow directly, and if you want one last chance to keep them, use Apple retention messaging and offers instead of a custom screen.',
}
