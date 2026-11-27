import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'missing-terms-of-use-link-in-description-and-weekly-price-confirmation-fixed-in-four-minutes',
  batchId: 'batch-34',
  sortOrder: 154,
  title:
    'Rejected for a missing Terms of Use link in the description and a weekly price Apple wanted confirmed, fixed in four minutes',
  guidelineLabel: 'Guideline 3.0.0 as cited (Terms of Use link) and 3.1.2 (price confirmation)',
  tags: ['3-1-2', 'metadata'],
  platform: 'iOS',
  body: 'A developer submitted an app with auto renewing subscriptions late at night. A little over a day later it was rejected for exactly two things. The App Description had no functional Terms of Use link, which Apple cited as Guideline 3.0.0. Under 3.1.2, Apple also asked the developer to confirm that a weekly plan at 9.99 per week was really the intended price. The screen recording Apple had asked for in a previous round was not mentioned at all.',
  resolution:
    'The developer added the standard Apple Terms of Use link to the App Description, checked the weekly price and its 3 day free intro offer in App Store Connect, and sent Apple the confirmation four minutes later. There was no resubmit button to press, it was greyed out, and Apple said the review would continue on their side once the confirmation arrived.',
  lesson:
    'For auto renewing subscriptions, put a working Terms of Use link in the App Description before you submit, not only inside the app. Expect a high weekly price to trigger a confirmation request, and answer it quickly in App Store Connect.',
}