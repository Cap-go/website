import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'app-preview-framing-2-3-4-same-video-passed-a-month-earlier',
  batchId: 'batch-19',
  sortOrder: 110,
  title: 'An App Preview that passed review in October was rejected under 2.3.4 for its framing a month later',
  guidelineLabel: 'Guideline 2.3.4 Accurate Metadata (App Previews)',
  tags: ['metadata'],
  platform: 'iOS',
  body: 'A developer submitted an update to their iOS app and it was rejected under guideline 2.3.4. App Review said the App Preview video had framing around the screen capture. The same video had passed review the month before. The developer pointed out that other apps on the store, including a well known one whose preview shows a person rather than the app, use App Previews with little or no footage of the app itself.',
  resolution: 'The developer removed the App Preview video entirely and resubmitted the update. The post did not say how the new review went.',
  lesson:
    'An App Preview that passed once can still be rejected on a later update, because every submission is reviewed again. Keep previews to plain screen captures of the app without decorative framing around the capture, and if one gets flagged, removing it is the fastest way to unblock the update while you rework it.',
}
