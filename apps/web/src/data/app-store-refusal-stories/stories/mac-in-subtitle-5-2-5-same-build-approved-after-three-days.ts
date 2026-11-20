import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'mac-in-subtitle-5-2-5-same-build-approved-after-three-days',
  batchId: 'batch-27',
  sortOrder: 134,
  title: 'A menu bar app was rejected under 5.2.5 for the word Mac in its subtitle, and the same build was approved three days later',
  guidelineLabel: 'Guideline 5.2.5 Apple trademarks in metadata',
  tags: ['metadata'],
  platform: 'macOS',
  body: "A developer's small menu bar utility for Mac was rejected on its second submission under guideline 5.2.5. The only problem was the word Mac in the app subtitle.",
  resolution:
    'The developer replaced the subtitle with a description of what the app does, without the word Mac, and resubmitted the same build with no code change. It was approved after three days.',
  lesson:
    'Apple product names such as Mac, iPhone or iPad in your name or subtitle can trigger 5.2.5 even when the app only runs on that device. Describe what the app does instead, and remember a metadata only fix still costs another wait in the queue.',
}