import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'first-review-rejected-in-20-minutes-then-pulled-twice-from-in-review-22-days',
  batchId: 'batch-25',
  sortOrder: 128,
  title:
    "An AI image app's first review took 22 days, with a rejection 20 minutes in and two long In Review stretches the developer pulled",
  guidelineLabel: 'Rejected 20 minutes into the first review (guideline not stated)',
  tags: ['endless-review'],
  platform: 'iOS',
  body: 'A developer submitted an AI image app on August 28. Review started four days later and ended in a rejection about 20 minutes after it began. They resubmitted the same day. The next submission sat in In Review for four days, so the developer withdrew it and sent it again. The one after that stayed In Review for six days, and they withdrew and resubmitted once more.',
  resolution:
    'The last resubmission went into review two days later and was approved on September 19, 22 days after the first submission, with 12 of those days spent In Review.',
  lesson:
    'Withdrawing a build sends it back to the queue, so every pull can add days. Unless you need to ship a fix, leave the build in review and use the wait to reply in App Store Connect or request an expedited review instead.',
}