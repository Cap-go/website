import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'no-login-game-rejected-2-1-a-reviewer-thought-sign-in-was-required',
  batchId: 'batch-30',
  sortOrder: 141,
  title:
    'A game with no login at all was rejected under 2.1(a), because the reviewer thought you had to sign in',
  guidelineLabel: 'Guideline 2.1(a) App Completeness: reviewer expected a sign in',
  tags: ['2-1', 'login-requirement'],
  platform: 'iOS',
  body: 'A developer submitted their first game, which has no account and no login of any kind. A build was rejected under guideline 2.1(a) because the reviewer believed the game required signing in.',
  resolution:
    'The developer added one plain line to the App Review notes saying that no login is needed and the game is playable right away. That line stays in the review notes now.',
  lesson:
    'Reviewers only have a few minutes with your app, so do not make them guess. State in the review notes whether a login is required, and if it is not, say so plainly. Then open your app as a stranger would and check that nothing on the first screens looks like a sign in wall.',
}