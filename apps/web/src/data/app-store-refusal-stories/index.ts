import type { AppleRejectionStory, AppleRejectionStoryTag } from './types'
import { appleRejectionStoryTagLabels } from './types'

const storyModules = import.meta.glob<{ story: AppleRejectionStory }>('./stories/*.ts', { eager: true })

export const appleRejectionStories: AppleRejectionStory[] = Object.values(storyModules)
  .map((module) => module.story)
  .sort((left, right) => left.sortOrder - right.sortOrder)

const appleRejectionStoryBatchDefinitions = [
  { id: 'batch-1', label: 'Batch 1', publishedOn: '2026-10-19' },
  { id: 'batch-2', label: 'Batch 2', publishedOn: '2026-10-22' },
  { id: 'batch-3', label: 'Batch 3', publishedOn: '2026-10-23' },
  { id: 'batch-4', label: 'Batch 4', publishedOn: '2026-10-24' },
  { id: 'batch-5', label: 'Batch 5', publishedOn: '2026-10-25' },
  { id: 'batch-6', label: 'Batch 6', publishedOn: '2026-10-26' },
  { id: 'batch-7', label: 'Batch 7', publishedOn: '2026-10-27' },
  { id: 'batch-8', label: 'Batch 8', publishedOn: '2026-10-28' },
  { id: 'batch-9', label: 'Batch 9', publishedOn: '2026-10-29' },
] as const

export const appleRejectionStoryBatches = appleRejectionStoryBatchDefinitions.map((batch) => ({
  ...batch,
  storyCount: appleRejectionStories.filter((story) => story.batchId === batch.id).length,
}))

export const appleRejectionStoryTags: AppleRejectionStoryTag[] = [
  '1-2',
  '1-4-2',
  '4-3',
  '4-2-6',
  '3-1-1',
  '3-1-2',
  '3-1-3',
  '5-1-1',
  '5-1-2',
  '5-2-3',
  '5-6-4',
  '5-6',
  '2-5-19',
  '2-1',
  '2-3-6',
  '2-3-10',
  '2-3-1',
  '2-3-2',
  '5-0',
  '2-3-7',
  '4-2',
  'metadata',
  'endless-review',
  'account-termination',
  'login-requirement',
  'login',
  'objectionable-content',
  'enrollment-account',
  'simulated-gambling',
  'fake-documents',
  'ai-data-sharing',
  'kids-category',
]

export type { AppleRejectionStory, AppleRejectionStoryTag } from './types'
export { appleRejectionStoryTagLabels }

export const appleRejectionStoriesContentPath = 'apps/web/src/data/app-store-refusal-stories/stories'

export { appleRejectionStoryMedia, getAppleRejectionStoryMedia } from './storyMedia'
export type { AppleRejectionStoryMedia } from './storyMedia'
