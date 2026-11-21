import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'tracking-prompt-only-before-first-ad-ads-off-for-review-reviewer-could-not-find-it',
  batchId: 'batch-28',
  sortOrder: 137,
  title:
    'The reviewer could not find the tracking permission prompt, because it only appeared before the first ad and ads were off for review',
  guidelineLabel: 'App Tracking Transparency prompt not found (guideline number not stated)',
  tags: ['5-1-2'],
  platform: 'iOS',
  body: "A developer's app was rejected because the reviewer could not find the App Tracking Transparency permission prompt. The app only asked for tracking permission right before the first ad was shown, and the developer had turned ads off for the review build, so the prompt never appeared during review.",
  resolution:
    'The developer moved the prompt to right after onboarding, no longer tied to any ad, in the order ad consent form, then tracking permission, then the ads SDK. The outcome of the resubmission was not stated.',
  lesson:
    'If your app declares tracking, the reviewer has to be able to see the prompt. Do not hide it behind a feature you switch off for review, and show it at a predictable point such as the end of onboarding.',
}