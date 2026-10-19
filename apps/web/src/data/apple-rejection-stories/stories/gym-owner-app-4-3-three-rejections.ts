import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'gym-owner-app-4-3-three-rejections',
  batchId: 'batch-1',
  sortOrder: 31,
  title: 'Three rejections for an app built to run one gym',
  guidelineLabel: 'Guideline 4.3 Spam',
  tags: ['4-3'],
  platform: 'iOS',
  body:
    'A developer built an iOS app to run their own gym, roughly one hundred seventy six commits of work. Apple rejected it on September 29, rejected it again on October 7, and on October 13 rejected it under guideline 4.3 Spam. The same day they answered all nine questions App Review sent them. Six days later, on October 19, they had heard nothing back. Their App Store Connect apps list showed several other apps on the same account also sitting in a rejected state at the same time, on both iOS and macOS.',
  resolution:
    'Still open at the time of posting, with no reply from App Review after the answers were sent.',
  lesson:
    'Effort and commit count are not what 4.3 measures. If an app is really built for one business, Apple private distribution options such as unlisted or custom app distribution may fit better than a public listing. For a public listing, make what is different from existing apps obvious in the first screens, screenshots, and review notes.',
}
