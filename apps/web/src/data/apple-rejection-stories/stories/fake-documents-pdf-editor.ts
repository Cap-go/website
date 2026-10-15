import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'fake-documents-pdf-editor',
  batchId: 'batch-1',
  sortOrder: 23,
  title: 'A PDF editor blamed for what users might do',
  guidelineLabel: 'Fake documents (guideline number not stated)',
  tags: ['fake-documents'],
  platform: 'iOS',
  body: 'A PDF editor app was rejected because Apple said it let users create fake IDs and fake documents. The developer argued that by the same logic any banking or messaging app could be rejected for what bad actors might do with it.',
  resolution: 'Not stated.',
  lesson:
    'General purpose tools can be judged by their worst possible use. Avoid templates or marketing that look like official IDs or certificates, and explain in review notes what the app is for and what it does not support.',
}
