export type AppleRejectionStoryTag =
  | '4-3'
  | '4-2-6'
  | '3-1-2'
  | '5-1-2'
  | '2-1'
  | 'metadata'
  | 'endless-review'
  | 'account-termination'
  | 'login-requirement'
  | 'login'
  | 'objectionable-content'
  | 'enrollment-account'
  | 'simulated-gambling'
  | 'fake-documents'
  | 'ai-data-sharing'

export const appleRejectionStoryTagLabels: Record<AppleRejectionStoryTag, string> = {
  '4-3': 'Guideline 4.3',
  '4-2-6': 'Guideline 4.2.6',
  '3-1-2': 'Guideline 3.1.2',
  '5-1-2': 'Guideline 5.1.2',
  '2-1': 'Guideline 2.1',
  metadata: 'Metadata and IAP',
  'endless-review': 'Endless review',
  'account-termination': 'Account termination',
  'login-requirement': 'Login requirement',
  login: 'Login',
  'objectionable-content': 'Objectionable content',
  'enrollment-account': 'Enrollment and account',
  'simulated-gambling': 'Simulated gambling',
  'fake-documents': 'Fake documents',
  'ai-data-sharing': 'AI data sharing',
}

export type AppleRejectionStoryPlatform = 'iOS' | 'Apple Developer Program'

export interface AppleRejectionStory {
  id: string
  batchId: string
  sortOrder: number
  title: string
  guidelineLabel: string
  tags: AppleRejectionStoryTag[]
  platform: AppleRejectionStoryPlatform
  body: string
  resolution: string
  lesson: string
}
