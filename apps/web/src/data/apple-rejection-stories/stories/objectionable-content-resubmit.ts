import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'objectionable-content-resubmit',
  batchId: 'batch-1',
  sortOrder: 15,
  title: 'Rejected for resubmitting without a fix',
  guidelineLabel: 'Objectionable content',
  tags: ['objectionable-content'],
  platform: 'iOS',
  body: 'An AI photo editing app was rejected because it had been resubmitted several times without fixing the issue Apple flagged, which was objectionable content.',
  resolution: 'Rejected.',
  lesson:
    'Resubmitting the same build hoping for a different reviewer can count against you. Fix the flagged issue, or ask for clarification through the Resolution Center, before you resubmit. For generative AI features, add filters for content Apple considers objectionable.',
}
