import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'launch-week-permission-button-and-screenshot-prices',
  batchId: 'batch-3',
  sortOrder: 49,
  title: 'Launch week: custom Allow screen and prices in screenshots',
  guidelineLabel: 'Permission prompt + screenshot metadata (rules commonly cited as 5.1.1 and 2.3.7)',
  tags: ['5-1-1', '2-3-7'],
  platform: 'iOS',
  body: 'During launch week the app was rejected twice. The first time it showed its own screen with an Allow button immediately before the system permission prompt, which Apple does not accept. After fixing that, the second rejection was because App Store screenshots showed prices. Both fixes were small, but each resubmission cost about a day in the review queue.',
  resolution: 'The developer fixed both issues and now keeps both rules written down in the project so it does not happen again.',
  lesson:
    'A pre-permission screen can explain why you need access, but leave the only Allow choice to the system prompt. Keep prices out of screenshots, and run a short checklist before every submission.',
}
