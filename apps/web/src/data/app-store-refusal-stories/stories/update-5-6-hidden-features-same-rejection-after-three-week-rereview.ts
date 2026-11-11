import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'update-5-6-hidden-features-same-rejection-after-three-week-rereview',
  batchId: 'batch-20',
  sortOrder: 113,
  title: 'An update rejected under 5.6 for hidden features got the exact same rejection after a second review that took almost three weeks',
  guidelineLabel: 'Guideline 5.6 Developer Code of Conduct',
  tags: ['5-6'],
  platform: 'iOS',
  body: 'A developer submitted an update to their iOS app and it was rejected under the Developer Code of Conduct. The notice said App Review had seen a pattern of unusual behavior commonly associated with fraudulent activity, specifically features that appeared to have been intentionally hidden during review. The developer said nothing in the app was hidden and it used no tricks or misleading behavior. They uploaded the app again with an explanation of exactly what it does, then waited almost three weeks for the second review. It came back with the exact same rejection, still without naming any feature or screen.',
  resolution: 'Unresolved at the time of posting. The developer said they would file an appeal.',
  lesson:
    'A generic 5.6 notice that names no feature rarely clears with the same build plus an explanation. Ask App Review in the thread which screen or behavior was flagged, check what every SDK in your binary ships, and use the formal appeal when replies go nowhere.',
}
