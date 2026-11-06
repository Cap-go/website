import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'several-games-4-3-a-batch-then-appeals-overturned',
  batchId: 'batch-17',
  sortOrder: 105,
  title: 'Several small games submitted together all hit 4.3(a), then two appeals were overturned',
  guidelineLabel: 'Guideline 4.3(a) Design Spam',
  tags: ['4-3'],
  platform: 'iOS',
  body: 'A developer submitted several small games to the App Store around the same time. Every one of them was rejected under guideline 4.3(a) for spam. After that wave, they changed process and now submit only one game at a time. Two of those rejections were later overturned after an appeal to the App Review Board.',
  resolution: 'Switched to one submission at a time. Two of the 4.3(a) rejections were overturned on App Review Board appeal.',
  lesson:
    'Bunching similar apps into the same review window invites a spam finding across the set. Submit one at a time, and if a 4.3(a) rejection looks wrong, appeal to the App Review Board with a clear case for how each app is distinct.',
}
