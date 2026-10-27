import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'studio-account-flagged-one-app-like-a-website',
  batchId: 'batch-7',
  sortOrder: 64,
  title: 'One app looked like a website, and dozens of apps disappeared',
  guidelineLabel: 'Account termination',
  tags: ['account-termination'],
  platform: 'iOS',
  body:
    'A studio that had published apps for more than a decade, over 80 of them, had its developer account flagged for termination. According to the studio, the reason was that one of its apps could be seen as similar to an existing website. There was no warning and no option to remove just that app. Every one of its apps was pulled from the App Store, including unrelated licensed apps built for clients, and updates were blocked.',
  resolution: 'Unresolved. The studio publicly disagreed with the decision.',
  lesson:
    "One developer account is one point of failure. If you build apps for clients, publish them under the client's own developer account so a dispute over one of your apps cannot take theirs down too.",
}
