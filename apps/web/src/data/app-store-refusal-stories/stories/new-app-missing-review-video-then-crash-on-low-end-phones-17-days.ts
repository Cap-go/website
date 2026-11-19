import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'new-app-missing-review-video-then-crash-on-low-end-phones-17-days',
  batchId: 'batch-24',
  sortOrder: 125,
  title:
    'A new iPhone app took 17 and a half days and two rejections, first for a missing review video, then for crashing on lower end phones',
  guidelineLabel: 'Missing review video, then a crash on lower end devices (guideline number not stated)',
  tags: ['endless-review'],
  platform: 'iOS',
  body: 'In the same few weeks, a developer had a new Mac app and a visionOS update approved in about two days each. Their new iOS app went very differently. After eight days of waiting it was rejected because the review notes did not include a video of the app. For the next build the developer had also widened the list of supported devices. About two and a half days later it was rejected again, this time because the app crashed on lower end phones that the wider device list now included. The developer described both rejections as automatic.',
  resolution: 'The next submission was approved after about seven more days, roughly 17 and a half days after the first one.',
  lesson:
    'Two avoidable rounds cost more than two weeks here. Attach a short screen recording of the main flow to the review notes from the very first submission, and never widen device support in the same build as a review fix unless you have tested on the oldest and smallest devices you just added.',
}