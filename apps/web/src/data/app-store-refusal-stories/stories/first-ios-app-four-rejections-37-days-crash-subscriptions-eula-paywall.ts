import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'first-ios-app-four-rejections-37-days-crash-subscriptions-eula-paywall',
  batchId: 'batch-21',
  sortOrder: 117,
  title: 'A first iOS app took 37 days and four rejections, with each review finding a new problem',
  guidelineLabel: 'Crash, subscription, EULA and paywall rejections (guideline numbers not stated)',
  tags: ['2-1', '3-1-2', 'endless-review'],
  platform: 'iOS',
  body: 'A developer submitted their first iOS app, which sells subscriptions, on October 1. Eight days later it was rejected for a crash. They resubmitted the next day, and about two weeks later it was rejected over its subscriptions. The next resubmission was rejected two days later over the EULA. The fourth rejection, on November 5, was about the links on the paywall and the previews. Every round surfaced an issue the earlier reviews had not mentioned.',
  resolution:
    'Approved on November 7, 37 days after the first submission. The developer was happy to launch but said review could be faster and more transparent for indie developers.',
  lesson:
    'A rejection does not always list every problem in the build. Before the first submission, check launch on a real device, the subscription details, a Terms of Use (EULA) link, and the paywall links together, because each extra round can cost a week or more.',
}
