import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'outfit-comparison-winner-1-2',
  batchId: 'batch-1',
  sortOrder: 41,
  title: 'An outfit comparison rejected for crowning a winner',
  guidelineLabel: 'Guideline 1.2',
  tags: ['1-2'],
  platform: 'iOS',
  body: 'A solo developer shipped an AI app that compares two outfits. After a comparison, the app announced that one look won. App Review rejected it under guideline 1.2, reading the result as ranking people rather than clothes. The developer agreed with the concern.',
  resolution:
    'They removed all winner wording, the winner badge, and any bigger score or highlight color on either option, so both looks now get equal visual weight, each gets its own feedback, and the user decides. Whether the fixed build was approved was not shared.',
  lesson:
    'Apple judges how a screen feels, not only what it does. If your app scores anything tied to how people look, present feedback without a ranking and assume the harshest reading.',
}
