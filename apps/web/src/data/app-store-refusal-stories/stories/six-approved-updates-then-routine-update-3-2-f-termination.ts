import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'six-approved-updates-then-routine-update-3-2-f-termination',
  batchId: 'batch-11',
  sortOrder: 79,
  title: 'Six approved updates in a row, then a routine update and a 3.2(f) termination',
  guidelineLabel: 'Section 3.2(f) (Developer Program License Agreement)',
  tags: ['account-termination', 'endless-review'],
  platform: 'Apple Developer Program',
  body:
    'An indie developer had six updates approved in a row. The review history they shared shows the latest submission In Review and every earlier one marked Review Completed. They then submitted a routine update in mid October, and it stayed stuck in review. Instead of a review result, the whole developer account was terminated under section 3.2(f). In App Store Connect, a message dated the day of that submission was attached to multiple versions and marked as unresolved issues. The developer described their apps as native, with a clean record of approved updates, and said Apple support was investigating their appeal.',
  resolution: 'Appeal under investigation at time of posting.',
  lesson:
    'A clean approval streak is no protection against a 3.2(f) termination. Keep a dated record of every submission, review message and approval, and check the Messages section in App Store Connect after every review, so you can send the full history the moment an appeal is possible.',
}
