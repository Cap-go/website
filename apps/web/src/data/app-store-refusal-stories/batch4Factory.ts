import type { AppleRejectionStory } from './types'

type Batch4StoryFields = Omit<AppleRejectionStory, 'id' | 'batchId' | 'sortOrder'>

export function batch4Story(id: string, sortOrder: number, fields: Batch4StoryFields): AppleRejectionStory {
  return { id, batchId: 'batch-4', sortOrder, ...fields }
}
