import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'portfolio-flagged-4-3',
  batchId: 'batch-1',
  sortOrder: 1,
  title: 'A whole portfolio flagged at once',
  guidelineLabel: '4.3(a) Spam',
  tags: ['4-3'],
  platform: 'iOS',
  body: 'A developer with several apps built from the same starter project received the identical 4.3 notice on every one of them: the apps shared a similar binary, metadata or concept with only minor differences. They decided to work through the apps one at a time.',
  resolution: 'Still in progress at the time of posting.',
  lesson: '4.3(a) also covers overlap between your own apps. If several apps grew from one template, each needs a genuinely distinct core, not just a new icon and name.',
}
