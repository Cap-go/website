import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'first-ios-app-2-1-request-visible-purchases-report-block',
  batchId: 'batch-14',
  sortOrder: 95,
  title: 'First iOS app got a 2.1 information request, and the fix was making everything findable',
  guidelineLabel: 'Guideline 2.1 Information Needed',
  tags: ['2-1'],
  platform: 'iOS',
  body:
    'A solo developer whose Android version was already live on Google Play submitted their first iOS app. It had three in app purchases and user generated content. App Review did not reject it outright but sent a guideline 2.1 information request. The developer reread guideline 2.1, which requires every in app purchase to be visible and working for the reviewer, and also checked the rules for user generated content (1.2) and account deletion (5.1.1(v)). The next day they resubmitted a new build with a visible report and block option on every piece of user content, community rules users accept before posting, sign out and switch account, and a screen recording showing where the purchases, safety tools and account controls are.',
  resolution:
    'New build submitted the day after the request. Outcome not known at time of posting.',
  lesson:
    'Treat review like a usability test with a stranger on a short clock. Every purchase, report and block option, and account control should be findable in seconds, and a recording in the review notes should point to each one. Being live on Google Play says nothing about passing App Review.',
}
