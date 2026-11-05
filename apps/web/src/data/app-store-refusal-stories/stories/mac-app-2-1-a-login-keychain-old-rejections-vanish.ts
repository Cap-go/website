import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'mac-app-2-1-a-login-keychain-old-rejections-vanish',
  batchId: 'batch-16',
  sortOrder: 100,
  title: 'A Mac app rejected under 2.1(a) for reading the login keychain, and the old rejection notes vanished',
  guidelineLabel: 'Guideline 2.1(a) App Completeness',
  tags: ['2-1'],
  platform: 'macOS',
  body:
    'A developer submitted a Mac app and App Review rejected it under guideline 2.1(a) because the app read from the login keychain. The fix took a single update. What caught the developer off guard was App Store Connect itself: it only shows the last ten submissions, so older rejection messages quietly disappear from the history.',
  resolution:
    'Fixed in one update. The developer now copies every rejection message into the commit that fixes it.',
  lesson:
    'Do not rely on App Store Connect as your record of past rejections, because older submissions drop out of view. Save the full rejection text next to the fix, in the commit, the ticket or your release notes, so you still have the exact wording if the same issue comes back.',
}
