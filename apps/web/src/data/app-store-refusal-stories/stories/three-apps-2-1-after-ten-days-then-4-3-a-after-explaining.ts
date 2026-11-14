import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'three-apps-2-1-after-ten-days-then-4-3-a-after-explaining',
  batchId: 'batch-23',
  sortOrder: 121,
  title:
    'Three apps waited ten days for a 2.1 rejection, then all three were rejected under 4.3(a) a week after the developer explained them',
  guidelineLabel: 'Guideline 2.1, then Guideline 4.3(a) Design: Spam',
  tags: ['4-3', '2-1'],
  platform: 'iOS',
  body: 'A developer submitted three new apps at the same time. All three sat for about ten days with no movement, then came back rejected under guideline 2.1. The developer answered the questions and explained each app. After roughly another week of silence, all three were rejected again, this time under 4.3(a) Design: Spam, with the standard notice saying the apps shared a similar binary, metadata or concept with other apps and had only minor differences.',
  resolution:
    'The developer had lost almost a month across the three submissions and had not shared a next step when they posted about it.',
  lesson:
    'Answering a 2.1 information request does not mean an app is past the bigger question. When several apps from one account land together, the next round can turn into 4.3, so submit them one at a time and make what is different about each app obvious in the build, the screenshots and the review notes before the first review, not after it.',
}