import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'seven-template-apps-4-3-same-minute',
  batchId: 'batch-3',
  sortOrder: 51,
  title: 'Seven template apps rejected for 4.3 in the same minute',
  guidelineLabel: '4.3(a) Spam',
  tags: ['4-3'],
  platform: 'iOS',
  body: 'A small team sent seven apps built on the same template to review in the same week. All seven got the identical 4.3(a) spam rejection in the same minute, including two apps that had never been rejected before. The team concluded Apple judged the batch rather than each app.',
  resolution: 'The team now submits one app at a time.',
  lesson:
    'Apps that share a codebase can read as a spam pattern when they land together. Space out submissions and make each app clearly distinct in features, design and metadata.',
}
