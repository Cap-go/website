import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'enrollment-refused-no-reason',
  batchId: 'batch-1',
  sortOrder: 19,
  title: 'Two months, then a refusal with no reason',
  guidelineLabel: 'Enrollment (not an App Review guideline)',
  tags: ['enrollment-account'],
  platform: 'Apple Developer Program',
  body: 'A developer spent over two months trying to enroll, with multiple support calls and emails, identity verification, device details and even video evidence. Apple then rejected the enrollment without giving a specific reason.',
  resolution: 'None at the time of posting.',
  lesson: 'Enrollment can take far longer than building the app. Start enrollment early, before your launch plan depends on it, and keep a record of every support exchange.',
}
