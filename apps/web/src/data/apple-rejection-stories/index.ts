import type { AppleRejectionStory, AppleRejectionStoryTag } from './types'
import { appleRejectionStoryTagLabels } from './types'

const storyModules = import.meta.glob<{ story: AppleRejectionStory }>('./stories/*.ts', { eager: true })

export const appleRejectionStories: AppleRejectionStory[] = Object.values(storyModules)
  .map((module) => module.story)
  .sort((left, right) => left.sortOrder - right.sortOrder)

export const appleRejectionStoryBatches = [
  {
    id: 'batch-1',
    label: 'Batch 1',
    publishedOn: '2026-10-17',
    storyCount: appleRejectionStories.filter((story) => story.batchId === 'batch-1').length,
  },
]

export const appleRejectionStoryTags: AppleRejectionStoryTag[] = [
  '1-4-2',
  '4-3',
  '4-2-6',
  '3-1-2',
  '5-1-1',
  '5-1-2',
  '2-1',
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
]

export type { AppleRejectionStory, AppleRejectionStoryTag } from './types'
export { appleRejectionStoryTagLabels }

export const appleRejectionStoriesContentPath = 'apps/web/src/data/apple-rejection-stories/stories'

export { appleRejectionStoryMedia, getAppleRejectionStoryMedia } from './storyMedia'
export type { AppleRejectionStoryMedia } from './storyMedia'
