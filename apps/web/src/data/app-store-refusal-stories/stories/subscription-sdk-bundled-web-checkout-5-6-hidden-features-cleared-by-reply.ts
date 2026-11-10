import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'subscription-sdk-bundled-web-checkout-5-6-hidden-features-cleared-by-reply',
  batchId: 'batch-19',
  sortOrder: 109,
  title: 'Rejected under 5.6 for hidden features that turned out to be checkout code bundled in a subscription SDK',
  guidelineLabel: 'Guidelines 5.6 Developer Code of Conduct and 2.5.19 Hidden Features',
  tags: ['5-6', '2-5-19'],
  platform: 'iOS',
  body: 'A solo developer had an iOS goal tracking app rejected seven times on the way to launch. One earlier rejection had been about real money stakes. The last one came under the Developer Code of Conduct: App Review said the app had hidden or misleading functionality and asked for all hidden features to be removed, without saying which one. The app had no remote feature flags, no downloaded code and no special behavior for reviewers. Instead of guessing, the developer scanned their own release binary and found web checkout code from a payment provider that they had never written. It came bundled inside their subscription SDK for that SDK web platform, and the iOS app never used it. Given the earlier money stakes rejection, the developer suspected it looked like a hidden payment path.',
  resolution:
    'Without changing any code, the developer replied to App Review with plain facts: what the app does and does not do, that it has no real money stakes, where the checkout code came from, that the unused SDK web code and an unused photo library permission would be removed in the next build, and a request to name the flagged screen. About nine hours later App Review said it would continue the review, and the app went live.',
  lesson:
    'Know everything your binary ships, including code your SDKs bring in for other platforms, because App Review judges what is in the build, not what you call. After a 5.6 rejection, do not guess and resubmit. Reply calmly with specifics and ask which screen or behavior was flagged.',
}
