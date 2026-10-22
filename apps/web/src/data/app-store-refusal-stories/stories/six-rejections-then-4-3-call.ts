import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'six-rejections-then-4-3-call',
  batchId: 'batch-2',
  sortOrder: 45,
  title: 'Six rejections, then a 4.3 spam label and a two week wait for a call',
  guidelineLabel: 'Guideline 4.3 (Spam)',
  tags: ['4-3'],
  platform: 'iOS',
  body:
    'A solo developer spent months on a first app, a conversation starter for social settings. It was rejected six times, the last time under Guideline 4.3 for spam, even though the developer felt it offered more than the similar apps already on the store. They asked App Review for a one on one call. A week went by with no reply, and the call finally happened about two weeks after the 4.3 rejection. The developer left the call with the impression that 4.3 is now being used to flag apps that look like low effort, AI generated clones, which they said their app was not.',
  resolution: 'The developer filed an appeal. It was still pending at the time of writing.',
  lesson:
    'In a crowded category, the reviewer judges what the screenshots, description and first session show. Make the difference from existing apps obvious there, and request the App Review call early, because getting one can take a week or more.',
}
