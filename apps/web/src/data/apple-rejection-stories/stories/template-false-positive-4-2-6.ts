import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'template-false-positive-4-2-6',
  batchId: 'batch-1',
  sortOrder: 17,
  title: 'Flagged for a template that was never used',
  guidelineLabel: '4.2.6 Template',
  tags: ['4-2-6'],
  platform: 'iOS',
  body: 'A team was rejected under guideline 4.2.6, which covers apps created from a commercialized template or app generation service, even though they used no template or generation service at all.',
  resolution: 'Not stated.',
  lesson:
    '4.2.6 can be a false positive. Reply in the Resolution Center stating plainly that the app is custom built and who built it, and offer to show the source or development history.',
}
