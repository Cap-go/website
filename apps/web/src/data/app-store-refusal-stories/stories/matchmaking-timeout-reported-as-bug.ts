import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'matchmaking-timeout-reported-as-bug',
  batchId: 'batch-13',
  sortOrder: 88,
  title: 'A 100 second matchmaking timeout was reported as a bug, then six days waiting for a reply',
  guidelineLabel: 'Bug rejection (guideline not stated)',
  tags: ['endless-review'],
  platform: 'iOS',
  body:
    'A developer submitted a multiplayer game. The reviewer rejected it for a bug, but what they hit was not a crash: the game stops searching after waiting 100 seconds to match the player with an opponent, and the reviewer saw that timeout as broken behavior. The developer replied to the reviewer explaining how matchmaking works and also removed the timeout from the game. Six days later they were still waiting for a single answer.',
  resolution: 'Explained in a reply and removed the timeout. Still waiting for an answer at time of posting.',
  lesson:
    'A reviewer often plays alone and at an odd hour, so an empty matchmaking queue is likely. Give the review team a way to reach a real game, such as a bot opponent or a demo mode, and explain it in the review notes before you submit.',
}
