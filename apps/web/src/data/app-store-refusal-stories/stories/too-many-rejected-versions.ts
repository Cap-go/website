import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'too-many-rejected-versions',
  batchId: 'batch-1',
  sortOrder: 10,
  title: 'Too many rejected versions',
  guidelineLabel: 'Account termination warning',
  tags: ['account-termination'],
  platform: 'iOS',
  body: 'A prolific indie developer received a notice that their account would be terminated in ten days. Apple indicated the number of rejected versions was part of the reason. After public attention and an appeal, the account was not terminated.',
  resolution: 'Account kept after appeal.',
  lesson: 'Rejections add up. Avoid same day resubmits with one word changes and near identical clones of your own apps.',
}
