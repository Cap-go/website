import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'paywall-one-month-free-mismatched-annual-charge',
  batchId: 'batch-17',
  sortOrder: 103,
  title: 'Rejected because the paywall said 1 month free while Apple showed the annual charge',
  guidelineLabel: 'In app purchase metadata mismatch (guideline number not stated)',
  tags: ['metadata'],
  platform: 'iOS',
  body: 'A developer moved from weeks on TestFlight toward a public App Store launch and had one build rejected over the paywall. The paywall said 1 month free, but Apple purchase screen showed the annual charge starting that same day. The reviewer also could not find the weekly plan. The developer fixed the paywall copy and plan visibility, submitted another build, and waited through review again.',
  resolution: 'Fixed the paywall so the free trial wording matched the purchase sheet and the weekly plan was reachable. The app later went live on the App Store.',
  lesson:
    'What your paywall promises must match what Apple purchase sheet shows, including trial length and when billing starts. Put every plan the reviewer needs to test where they can reach it in a couple of taps, and check that path on a fresh install before you submit.',
}
