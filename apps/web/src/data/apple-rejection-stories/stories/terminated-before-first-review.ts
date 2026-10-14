import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'terminated-before-first-review',
  batchId: 'batch-1',
  sortOrder: 9,
  title: 'Closed before the first review',
  guidelineLabel: 'Account termination',
  tags: ['account-termination'],
  platform: 'iOS',
  body: 'A developer with ten years of experience had their developer account terminated, with a fraud accusation that did not say what they had done, while a language learning game was still waiting for its very first review. Their existing apps disappeared and customers started asking why.',
  resolution: 'None reported.',
  lesson: 'An account termination removes every app at once. Keep your own channel to users (email, website) so you can reach them if the store disappears.',
}
