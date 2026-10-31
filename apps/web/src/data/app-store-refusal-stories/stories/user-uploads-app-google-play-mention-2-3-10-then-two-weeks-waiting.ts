import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'user-uploads-app-google-play-mention-2-3-10-then-two-weeks-waiting',
  batchId: 'batch-11',
  sortOrder: 77,
  title: 'Ten days to a first review, a Google Play mention, then two more weeks waiting',
  guidelineLabel: 'Guideline 2.3.10 Accurate Metadata',
  tags: ['2-3-10', 'metadata', 'endless-review'],
  platform: 'iOS',
  body:
    'A developer with a brand new developer account submitted a brand new app in early October. It is an app where users can publicly upload their own images, which the developer expected to draw extra content moderation scrutiny. The first review came ten days later, on an iPad, and ended in a rejection under guideline 2.3.10 Accurate Metadata: the app or its metadata mentioned a third party platform, and the next step was to remove the Google Play references. The developer traced the mention to the text describing an in app purchase. After the fix the app went back into the queue, and two weeks later it was still waiting for review, 24 days after the first submission and still not live.',
  resolution: 'Still waiting for review at time of posting, 24 days after the first submission.',
  lesson:
    'Search every text field you submit, in app purchase descriptions included, for the names of other stores and platforms before the first submission. On a new account each round trip can cost a week or more in the queue, so a one word mention can delay a launch by weeks.',
}
