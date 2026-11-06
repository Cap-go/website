import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'resubmit-perf-fixes-removed-gate-crash-on-start',
  batchId: 'batch-17',
  sortOrder: 104,
  title: 'A resubmit with bonus performance fixes crashed on start and cost a full day',
  guidelineLabel: 'Guideline 2.1 App Completeness (crash on launch)',
  tags: ['2-1'],
  platform: 'iOS',
  body: 'After a first App Store rejection that was only a request for more information, the developer decided to bundle performance fixes into the same resubmission. They were so confident that they also removed a hardware gate meant for gaming tier devices. App Review rejected the build again because it crashed on start, with no crash log, only an automated message. The developer assumed a memory kill, put the gate back, and spent the day shrinking assets, deferring loads, and freeing resources without losing performance.',
  resolution:
    'Restored the hardware gate, cut the memory footprint, and prepared a third submission for the next day. The final outcome after round three was not shared in the post.',
  lesson:
    'Do not pile unrelated fixes into a resubmission meant to answer a review question. Ship the smallest change that answers the rejection, keep stability gates in place for the lowest device you claim to support, and cold start on that device before you upload again.',
}
