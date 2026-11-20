import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'two-unanswered-appeals-dsa-complaint-china-ai-rejection-false-ready-for-distribution-email',
  batchId: 'batch-27',
  sortOrder: 133,
  title:
    'Two appeals went unanswered until a Digital Services Act complaint, then a China AI rejection and a Ready for Distribution email that was not true',
  guidelineLabel: 'Endless review, unanswered appeals and an AI rule for China (guideline numbers not stated)',
  tags: ['endless-review'],
  platform: 'iOS',
  body: 'A long time independent developer submitted a macOS app and an iOS app together. After almost two weeks of waiting, both were rejected for reasons the developer considered wrong. A detailed message to App Review got no answer, and neither did a formal appeal or a second appeal. Only after a complaint to the relevant German authority under the EU Digital Services Act did Apple respond. The appeals were then accepted, with a few small changes requested. The macOS app was approved after more than another week. The iOS submission had sat untouched the whole time, so the developer cancelled it and uploaded a new build with the same changes. Two more weeks passed, then it was rejected for a new reason: its AI feature did not meet rules in China, although Apple said it would be fine elsewhere. The whole app was rejected instead of only China being excluded.',
  resolution:
    'The developer removed China from the countries list and resubmitted. A week later Apple Support emailed that the app was Ready for Distribution, but three days after that email App Store Connect still showed the iOS version as Waiting for Review. Still unresolved at time of posting.',
  lesson:
    'If your app uses AI features, decide on China availability before you submit, because a China only rule can block the whole release. When App Review stops answering, keep a written record of every contact, and do not trust a status email until App Store Connect shows the same status.',
}