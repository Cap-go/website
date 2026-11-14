import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'ipad-paywall-infinite-loading-three-rounds-37-days',
  batchId: 'batch-23',
  sortOrder: 122,
  title: 'A first app needed three review rounds and 37 days of waiting because its paywall kept loading forever on iPad',
  guidelineLabel: 'Bug rejection on iPad (guideline number not stated)',
  tags: ['endless-review'],
  platform: 'iOS',
  body: 'A solo developer waited nine days for the first review of their app. It came back rejected because the paywall got stuck loading forever on an iPad, a device the developer did not own and had not tested on. They fixed it and resubmitted within two days. During the second wait they asked for an expedited review and opened a support ticket, and heard nothing back. After 14 days the second review rejected the app again for the same endless loading on the iPad paywall, which the developer could not reproduce in the simulator.',
  resolution:
    'The developer rebuilt the purchase logic from scratch and resubmitted. The third review also took 14 days, and the app was approved after 37 days of total waiting across three rounds.',
  lesson:
    'App Review tests on iPad, so a purchase flow that has only ever run on your own iPhone is a risk. When each review round takes about two weeks, every missed bug costs another two weeks. Test the paywall on a real iPad with a sandbox account and a slow connection before you submit, and give the loading state a timeout with a clear error instead of a spinner that never ends.',
}