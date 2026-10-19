import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'sign-up-required-not-big-app',
  batchId: 'batch-1',
  sortOrder: 11,
  title: 'Sign up required: you are not that big app',
  guidelineLabel: 'Login requirement (guideline number not stated)',
  tags: ['login-requirement'],
  platform: 'iOS',
  body: "A developer's social app was rejected because it required people to create an account before reaching the home feed. When the developer explained that every user needs a handle for the app to work at all, and pointed to a major photo sharing network that does the same, the reviewer replied, in effect, that their app was not that network.",
  resolution: 'Not stated.',
  lesson:
    'What big apps get away with is not a precedent you can cite. If you require sign up, explain in review notes why the core feature cannot work without an account, and consider letting reviewers or guests see some content first.',
}
