import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'celebrity-story-game-screenshots-then-subtitle-flagged-objectionable',
  batchId: 'batch-14',
  sortOrder: 93,
  title: 'Screenshots flagged as objectionable, then the subtitle, for a game with nothing adult in it',
  guidelineLabel: 'Objectionable content rejection (screenshots, then subtitle)',
  tags: ['objectionable-content', 'metadata'],
  platform: 'iOS',
  body:
    'A small studio makes simple story games for iOS, with no adult themes, gambling or crypto. One game, where the player is a celebrity trying to make it in Hollywood, was rejected for objectionable content in its screenshots. The screenshots only showed fully dressed characters from the game. The studio replaced every screenshot and resubmitted. The next rejection was for objectionable content in the subtitle, which simply described the game as celebrity life and drama games. Each review took weeks.',
  resolution:
    'The app was first submitted in September and was still not approved at the end of October.',
  lesson:
    'When App Review flags metadata as objectionable without saying why, ask in App Store Connect which exact element is the problem and why before you redo everything. Review screenshots, subtitle and keywords together before resubmitting, because fixing one can expose the next.',
}
