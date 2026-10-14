export type AppleRejectionStoryTag = '4-3' | '2-1' | 'metadata' | 'endless-review' | 'account-termination' | 'login-requirement' | 'objectionable-content'

export const appleRejectionStoryTagLabels: Record<AppleRejectionStoryTag, string> = {
  '4-3': 'Guideline 4.3',
  '2-1': 'Guideline 2.1',
  metadata: 'Metadata and IAP',
  'endless-review': 'Endless review',
  'account-termination': 'Account termination',
  'login-requirement': 'Login requirement',
  'objectionable-content': 'Objectionable content',
}

export interface AppleRejectionStory {
  id: string
  batchId: string
  sortOrder: number
  title: string
  guidelineLabel: string
  tags: AppleRejectionStoryTag[]
  platform: 'iOS'
  body: string
  resolution: string
  lesson: string
}
