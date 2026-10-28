import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'cloud-gaming-client-3-1-1-purchases-in-stream',
  batchId: 'batch-8',
  sortOrder: 67,
  title: 'A free cloud gaming client rejected under 3.1.1 for purchases inside streamed games',
  guidelineLabel: 'Guideline 3.1.1 In-App Purchase',
  tags: ['3-1-1'],
  platform: 'macOS',
  body:
    "A developer built a free remote play app for a major console maker's cloud gaming service and submitted it to the App Store. The Mac version was rejected under guideline 3.1.1. App Review said some streamed games could lead users to buy digital content outside the App Store. As the developer understood it, the gaming service does not let players complete a payment during a streaming session: some games show purchase options, but the payment cannot go through while streaming. They pointed out that several similar streaming apps were already on the store and filed an appeal.",
  resolution: 'Appeal pending at time of posting.',
  lesson:
    'For streaming and client apps, App Review judges what users can see inside the streamed content, not only your own code. Explain in the review notes exactly how purchases behave inside the stream, with screenshots, before the first submission instead of saving it for the appeal.',
}
