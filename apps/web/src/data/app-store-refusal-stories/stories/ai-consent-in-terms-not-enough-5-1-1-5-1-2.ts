import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'ai-consent-in-terms-not-enough-5-1-1-5-1-2',
  batchId: 'batch-8',
  sortOrder: 69,
  title: 'AI consent buried in the terms was not enough for 5.1.1(i) and 5.1.2(i)',
  guidelineLabel: 'Guidelines 5.1.1(i) and 5.1.2(i)',
  tags: ['5-1-1', '5-1-2', 'ai-data-sharing'],
  platform: 'iOS',
  body:
    "A developer's journal app was rejected on iOS under guidelines 5.1.1(i) and 5.1.2(i), both about sharing user data with AI services. Consent for that processing was already covered in the app's terms, but App Review did not accept that. The developer moved consent to an explicit screen inside the app, shown first, before any model reads a single entry. They then mapped every code path where entries reach a model and gated each one on that consent, so no request is even built without a yes. Background jobs now skip accounts that have not agreed and wait instead of failing, and a release check fails if the app calls an AI host that the consent screen does not name.",
  resolution: "Fixed and resubmitted. Apple's verdict was still unknown at time of posting.",
  lesson:
    'A line in your terms is not consent for AI data sharing. Ask inside the app before the first request, name the provider and the data, and make sure every code path that sends user content checks that answer.',
}
