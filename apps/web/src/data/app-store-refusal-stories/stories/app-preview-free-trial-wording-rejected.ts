import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'app-preview-free-trial-wording-rejected',
  batchId: 'batch-12',
  sortOrder: 85,
  title: 'An app preview said free trial available, and the update was rejected',
  guidelineLabel: 'App preview metadata (price reference)',
  tags: ['metadata'],
  platform: 'iOS',
  body:
    'An indie developer submitted an update whose app preview video included the words free trial available. Apple rejected the update, treating any mention of free in the preview as a price reference. The developer re-cut the video and resubmitted.',
  resolution: 'Video re-cut and resubmitted. Final outcome not shared at time of posting.',
  lesson:
    'Keep prices and the word free out of app previews, even when the trial is real. Show the trial terms inside the app on the paywall instead.',
}
