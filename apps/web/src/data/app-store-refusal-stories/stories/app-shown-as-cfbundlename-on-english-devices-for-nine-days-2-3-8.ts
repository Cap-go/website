import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'app-shown-as-cfbundlename-on-english-devices-for-nine-days-2-3-8',
  batchId: 'batch-35',
  sortOrder: 157,
  title: 'An app showed up as CFBundleName on English phones for nine days and earned a 2.3.8 rejection',
  guidelineLabel: 'Guideline 2.3.8',
  tags: ['metadata'],
  platform: 'iOS',
  body: 'A team\'s first App Review passed in three days on the first try. Their only rejection since then came under Guideline 2.3.8. On English language phones, the app\'s name showed as the literal placeholder CFBundleName instead of the real name, and it had been that way for nine days.',
  resolution:
    'The team fixed it in a single build. They said review was never their bottleneck, getting people to find the app was.',
  lesson:
    'Check the installed app name in every language you ship, not only your development language. A missing or broken localized display name can leave a raw key on the home screen, and that can get the app rejected under 2.3.8.',
}