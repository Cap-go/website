import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'export-compliance-after-approval',
  batchId: 'batch-1',
  sortOrder: 36,
  title: 'Approved, then blocked by one more compliance question',
  guidelineLabel: 'Export compliance (App Store Connect)',
  tags: ['metadata'],
  platform: 'iOS',
  body:
    'A B2B dashboard companion build reached approval, but release stayed blocked when a compliance prompt reappeared after the team thought export questions were already answered. The release owner stopped rollout, gathered legal wording, updated the App Store Connect response, and waited through another review pass while customers saw the announcement before the app was available.',
  resolution: 'Released after answering export compliance again and waiting for the next review pass.',
  lesson:
    'Treat export compliance as a release gate, not a one time checkbox. Confirm App Store Connect shows a releasable state before you announce a ship date.',
}
