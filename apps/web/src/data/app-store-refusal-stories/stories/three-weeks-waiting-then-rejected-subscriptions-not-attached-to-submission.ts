import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'three-weeks-waiting-then-rejected-subscriptions-not-attached-to-submission',
  batchId: 'batch-30',
  sortOrder: 142,
  title:
    'After three weeks waiting for review, an app was rejected because its subscriptions were not attached to the submission',
  guidelineLabel: 'Guideline not stated: subscriptions missing from the submission',
  tags: ['endless-review', 'metadata'],
  platform: 'iOS',
  body: "A developer waited about three weeks for their app to come out of review. When the answer finally came, it was a rejection, and the cause was on their side: they had forgotten to attach the app's subscriptions to the submission in App Store Connect.",
  resolution:
    'Not resolved at the time of writing. The developer planned a third submission with the subscriptions attached.',
  lesson:
    'When review queues are long, a missed checkbox costs weeks, not hours. Before you press submit, open the version page and confirm every new in-app purchase and subscription is selected for review alongside the build.',
}