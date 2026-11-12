import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'game-purchase-failed-offline-vague-error-rejected-after-release-date',
  batchId: 'batch-21',
  sortOrder: 116,
  title: 'A game was rejected three days after its announced release date because a purchase failed while the reviewer was offline',
  guidelineLabel: 'In app purchase failure (guideline not stated)',
  tags: ['metadata', 'endless-review'],
  platform: 'iOS',
  body: 'An independent developer had already announced a release date for their game. The build sat in review for a little over a week and only moved after they asked for an expedited review. It was finally rejected three days after the announced date. Judging by the screenshot attached to the rejection, the reviewer had no internet connection when they tried to make an in app purchase. The app did show an error saying the purchase failed, but the message was vague.',
  resolution:
    'The developer appealed and still had no answer about a month later. In the meantime they redesigned the interface, rewrote the error messages to explain more clearly what went wrong, and planned to resubmit the improved version.',
  lesson:
    'Reviewers can hit bad networks too. Try every purchase with no connection and with a failing store request, and make sure the app shows a clear message and a way to retry. Avoid announcing a launch date before the build is approved.',
}
