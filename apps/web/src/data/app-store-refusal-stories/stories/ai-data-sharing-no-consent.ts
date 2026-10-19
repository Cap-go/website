import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'ai-data-sharing-no-consent',
  batchId: 'batch-1',
  sortOrder: 24,
  title: 'No consent screen for third party AI data sharing',
  guidelineLabel: 'AI data sharing (guideline number not stated)',
  tags: ['ai-data-sharing'],
  platform: 'iOS',
  body: "A team got their first rejection for sharing user data with a third party AI provider. Apple required explicit permission from users plus clear disclosure of what data is sent and to which AI provider. The team's worry was building a consent screen that passes review without hurting conversion.",
  resolution: 'In progress.',
  lesson:
    'If your app sends user content to an outside AI service, ask for consent before the first request and name the provider and the data involved. Build that screen before submission, not after the rejection.',
}
