import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'iphone-app-reviewed-on-ipad-bottom-button-covered-content-2-1-a',
  batchId: 'batch-22',
  sortOrder: 119,
  title:
    'An iPhone app was rejected under 2.1(a) because a bottom button covered content on the iPad App Review used',
  guidelineLabel: 'Guideline 2.1(a) App Completeness',
  tags: ['2-1'],
  platform: 'iOS',
  body: 'A developer who tested only on their own iPhone noticed that their rejection messages listed an iPad Air as the review device. One rejection was filed under guideline 2.1(a): a button pinned to the bottom of the screen sat on top of content, and the only evidence was a screenshot Apple attached. iPhone apps run on iPad inside a compatibility window that is roughly 664 points tall, and the affected screen could not scroll, so the button covered part of it. The same overlap showed up on a small iPhone.',
  resolution:
    'The developer traced the cause to the fixed bottom button on a screen that could not scroll, and now runs a check for this layout problem before every submission. They did not share how long the resubmission took.',
  lesson:
    'App Review may test an iPhone app on an iPad even if you never targeted iPad, so the device in the rejection can be one you do not own. Let every screen scroll when its content can grow, and test at the smallest heights your app can be shown at, including the iPad compatibility window and the smallest supported iPhone.',
}
