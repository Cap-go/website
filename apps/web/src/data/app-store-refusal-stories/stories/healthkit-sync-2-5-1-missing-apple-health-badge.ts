import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'healthkit-sync-2-5-1-missing-apple-health-badge',
  batchId: 'batch-13',
  sortOrder: 86,
  title: 'Six days waiting, then 2.5.1 because the Health sync had no Apple Health badge',
  guidelineLabel: 'Guideline 2.5.1 Software Requirements (HealthKit)',
  tags: ['endless-review'],
  platform: 'iOS',
  body:
    'An indie developer submitted a major update that added Apple Health sync for the first time. It sat in Waiting for Review for six days. Only then did they notice a new developer agreement waiting to be signed in their account. They signed it, and the update went into review that same afternoon, though they could not say whether the two were connected. The update was then rejected under guideline 2.5.1 because the Health feature was not clearly identified in the app interface. The developer had not known about the Apple Health badge.',
  resolution:
    'Added the Works with Apple Health badge next to the sync toggle, a review note, and a screen recording made on a real device. Approved on the next submission.',
  lesson:
    'If your app reads or writes Health data, show it clearly in the interface with the Apple Health badge from the very first submission. And when a review sits still for days, check App Store Connect for an unsigned agreement before anything else.',
}
