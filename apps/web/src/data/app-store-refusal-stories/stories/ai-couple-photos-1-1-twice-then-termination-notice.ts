import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'ai-couple-photos-1-1-twice-then-termination-notice',
  batchId: 'batch-9',
  sortOrder: 71,
  title: 'Two 1.1 rejections, one question about which image, then a termination notice',
  guidelineLabel: 'Guideline 1.1 Safety: Objectionable Content, then Section 3.2(f)',
  tags: ['objectionable-content', 'account-termination'],
  platform: 'iOS',
  body:
    "A developer's iOS app that generates AI couple photos was rejected under guideline 1.1 for objectionable content. The rejection did not say which image was the problem. They toned down the sample images, with no touching or leaning in, and resubmitted once about five days later. Four days after that it was rejected again for the same reason. Instead of sending another build, they wrote to Apple asking which image was the issue. About ten days passed with no answer, then the app was removed from the store and the developer received a pending termination notice. As they understood it, Apple treated the repeated fix and resubmit cycle as an attempt to get around review. Payouts were paused and every app on the account was at risk, with 30 days to appeal. Reading forum threads from developers with the same notice, they found that most appeals sat for weeks without an answer, and the one reinstatement they found came after a second appeal that named the actual cause and disclosed everything else.",
  resolution: 'Preparing an appeal at time of posting.',
  lesson:
    'Two rejections under the same guideline can now be enough to put an account at risk. When a content rejection is vague, ask App Review to point to the exact screen or asset before resubmitting, keep a record of every change, and treat the second rejection as a signal to pause rather than to try again.',
}
