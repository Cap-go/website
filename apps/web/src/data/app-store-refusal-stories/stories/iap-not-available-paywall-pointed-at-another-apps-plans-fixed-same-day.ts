import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'iap-not-available-paywall-pointed-at-another-apps-plans-fixed-same-day',
  batchId: 'batch-24',
  sortOrder: 124,
  title:
    "An update was rejected because its paywall loaded the plans of the team's other app, and it was approved the same evening",
  guidelineLabel: 'Guideline 2.1(b) App Completeness, in-app purchase not available',
  tags: ['2-1', 'metadata'],
  platform: 'iOS',
  body: 'A small team submitted an update to their iPhone app. App Review rejected it under guideline 2.1(b) because the reviewer could not find the in-app purchase and reported it as not available. The cause was a single configuration value. The paywall was set to load the subscription plan list that belonged to another app from the same team, so in this app it had nothing to show or sell.',
  resolution:
    "They pointed the paywall at the app's own plan list and resubmitted about seven hours after the rejection. The update was approved roughly an hour and a half later, about eight and a half hours after the rejection.",
  lesson:
    "When one team runs several apps on the same subscription setup, plan and product IDs are easy to cross. Before you submit, open the paywall in a fresh sandbox install of the exact build and check that it loads this app's own products, because a reviewer who sees an empty paywall will reject the app as incomplete.",
}