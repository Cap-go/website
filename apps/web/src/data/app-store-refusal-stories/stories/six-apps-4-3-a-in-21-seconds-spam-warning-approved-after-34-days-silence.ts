import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'six-apps-4-3-a-in-21-seconds-spam-warning-approved-after-34-days-silence',
  batchId: 'batch-25',
  sortOrder: 127,
  title:
    'Six apps were rejected under 4.3(a) within 21 seconds with an account removal warning, and one was approved after a call and 34 days of silence',
  guidelineLabel: 'Guideline 4.3(a) Design: Spam, with a Developer Program removal warning',
  tags: ['4-3'],
  platform: 'iOS',
  body: 'A developer with four live apps on their account submitted six new apps and watched all six get rejected within 21 seconds. Every notice had the same 4.3(a) Design: Spam text plus a warning that accounts like this can be removed from the Apple Developer Program. The developer got a call with App Review, who said the number of submissions had tripped the spam system. The advice was to delete apps, starting with the weakest ones, and to submit nothing new. An appeal was possible, but with no guarantees.',
  resolution:
    'The developer deleted five of the rejected apps and one live app, filed an appeal, and answered the nine questions in the notice for one remaining app without sending a new build. After 34 days of silence, App Review replied that it would continue the review, and the app was approved.',
  lesson:
    'Submission volume alone can look like spam. When a 4.3(a) notice arrives with an account warning, stop submitting, remove weak or overlapping apps, and answer the questions in the notice instead of sending a tweaked build. Expect weeks, not days, before anyone replies.',
}