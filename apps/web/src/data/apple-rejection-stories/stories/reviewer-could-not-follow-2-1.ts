import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'reviewer-could-not-follow-2-1',
  batchId: 'batch-1',
  sortOrder: 5,
  title: 'The reviewer could not follow the app',
  guidelineLabel: '2.1 App Completeness',
  tags: ['2-1'],
  platform: 'iOS',
  body: 'A first time developer was rejected twice before going live. The first rejection, under 2.1, came because the reviewer could not work out how the app was meant to be used.',
  resolution: 'Approved after adding a demo video recorded on a real device and step by step review notes.',
  lesson: 'Reviewers have minutes, not context. Tell them exactly what to tap and what they should see.',
}
