import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'ipad-reviewer-could-not-find-subscriptions-2-1-b-paywall-only-after-onboarding',
  batchId: 'batch-33',
  sortOrder: 149,
  title: 'The reviewer could not find the subscriptions on an iPad, because the paywall only showed up after onboarding',
  guidelineLabel: 'Guideline 2.1(b) App Completeness',
  tags: ['2-1', '3-1-1'],
  platform: 'iOS',
  body: 'A developer submitted version 1.1 of a seasonal grocery app. App Review paused it under 2.1(b): the reviewer, testing on an iPad, could not find the in-app subscriptions. The developer admitted it was a fair call. The paywall only opened at the end of onboarding, and not at all if the user skipped the welcome screens, or behind a locked tab. There was no way to reach it from settings.',
  resolution:
    'The developer replied to App Review with step by step directions: finish the welcome screens without skipping, or open one of two main tabs and tap the premium card there, which opens the paywall with both plans. The post did not say whether the update was approved after that.',
  lesson:
    'Give the reviewer a direct path to every purchase. Put the exact taps in the review notes, and add a permanent entry point such as a row in settings, so someone who skips onboarding can still find your subscriptions.',
}