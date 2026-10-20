import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'att-rejection-startup-risk-5-1-2',
  batchId: 'batch-1',
  sortOrder: 20,
  title: 'An App Tracking Transparency rejection that threatened a startup',
  guidelineLabel: '5.1.2 Data use and sharing',
  tags: ['5-1-2'],
  platform: 'iOS',
  body: "After a few months of fast shipping and strong user feedback, a startup's app was rejected in late autumn over App Tracking Transparency, the iOS privacy rule that requires user permission before tracking across apps and websites. The founder later described it as a rejection that put the whole company at risk.",
  resolution: 'Not stated in the post.',
  lesson:
    "Audit every SDK in your app for tracking before you submit. If anything links user data with other companies' data, you need the tracking permission prompt and matching privacy labels, even if the tracking comes from a third party library.",
}
