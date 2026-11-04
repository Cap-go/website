import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'missing-account-deletion-after-reviewer-deleted-accounts',
  batchId: 'batch-15',
  sortOrder: 99,
  title: 'Rejected for missing account deletion, after the first reviewer had deleted several accounts',
  guidelineLabel: 'Account deletion requirement (guideline 5.1.1(v))',
  tags: ['5-1-1'],
  platform: 'iOS',
  body:
    'A developer with an app built around public user generated content was rejected on its second review for missing account deletion. Their logs showed that during the first review, the reviewer had created and deleted several accounts without any problem. The developer felt the rejection had more to do with the strict category than with the feature actually being missing.',
  resolution: 'No resolution was shared at the time of posting.',
  lesson:
    'Even when a feature works, a reviewer has to find it quickly. Put the account deletion path in the review notes with the exact screens to tap, and attach a short recording. For apps with user generated content, also show reporting, blocking and moderation, because those categories get the closest look.',
}
