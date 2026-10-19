import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'simulated-gambling-staking',
  batchId: 'batch-1',
  sortOrder: 22,
  title: 'An in game staking feature on an individual account',
  guidelineLabel: 'Simulated gambling (guideline number not stated)',
  tags: ['simulated-gambling'],
  platform: 'iOS',
  body: 'A game was rejected for including simulated gambling: players could stake in game items against each other, a mechanic common in classic online role playing games. Because the developer published under an individual account rather than a company, they decided to remove the feature for now.',
  resolution: 'Removing the feature and resubmitting.',
  lesson:
    'Gambling style mechanics get extra scrutiny even without real money, and some of what Apple allows depends on your account type and documentation. Check the gambling rules before building staking, loot or wager features, and plan your developer account type around them.',
}
