import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'play-hotfix-behind-review-queue',
  batchId: 'batch-1',
  sortOrder: 38,
  title: 'The hotfix that waited behind a policy queue',
  guidelineLabel: 'Google Play review queue timing',
  tags: ['endless-review'],
  platform: 'Google Play',
  body:
    'An ecommerce team needed a fast mobile fix for a checkout bug, but the store release sat in review for six days at the worst possible time. Support tickets climbed while status stayed pending. They mitigated server side first, then watched binary approval arrive after the emergency had already burned through a weekend.',
  resolution: 'The native store fix arrived after the team had already mitigated the incident elsewhere.',
  lesson:
    'Store review is not an incident response channel. Keep a non store mitigation path for urgent production bugs while a binary waits in queue.',
}
