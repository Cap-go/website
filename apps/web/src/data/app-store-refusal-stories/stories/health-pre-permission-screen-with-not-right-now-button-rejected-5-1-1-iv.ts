import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'health-pre-permission-screen-with-not-right-now-button-rejected-5-1-1-iv',
  batchId: 'batch-32',
  sortOrder: 148,
  title: 'Rejected for being too polite: a Not right now button before the Health permission prompt',
  guidelineLabel: 'Guideline 5.1.1(iv) Legal, Privacy, Data Collection and Storage',
  tags: ['5-1-1'],
  platform: 'iOS',
  body: 'Before asking for Apple Health access, an iOS app showed its own screen with two buttons, Connect and Not right now. App Review flagged it under 5.1.1(iv). A custom screen before a permission request may explain why the app needs access, but it cannot offer its own way to decline. Its only button has to lead to the system prompt, where the user can say no.',
  resolution:
    'The developer took away that the decline choice belongs in Apple\'s permission dialog, not in the app\'s own screen. The post did not say when a fixed build was approved.',
  lesson:
    'Keep a pre-permission screen to an explanation and a single Continue button that opens the system prompt. Do not add Skip, Later or Not right now buttons, and do not block the app if the user declines in the system dialog.',
}