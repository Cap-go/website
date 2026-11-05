import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'game-update-paywall-too-deep-title-screen-unlock',
  batchId: 'batch-16',
  sortOrder: 102,
  title: 'A game update rejected because the paywall was too deep, then through in 26 hours once unlock moved to the title screen',
  guidelineLabel: 'In app purchase too hard for the reviewer to reach (guideline number not stated)',
  tags: ['metadata'],
  platform: 'iOS',
  body:
    'An indie developer needed 33 days and two rejections to get version 1.0 of their iOS game approved. The first update, 1.0.1, was rejected as well, because the paywall sat too deep in the game for the reviewer to reach. The developer added an unlock button to the title screen and resubmitted. This time the whole process took about 26 hours, with only about 12 minutes actually in review.',
  resolution:
    'Added an unlock button on the title screen. The update went through about 26 hours after resubmitting.',
  lesson:
    'A reviewer will not play your game for twenty minutes to find what you sell. Put every purchase where it can be reached in seconds, or describe the exact path in the review notes, so the reviewer can test it without digging.',
}
