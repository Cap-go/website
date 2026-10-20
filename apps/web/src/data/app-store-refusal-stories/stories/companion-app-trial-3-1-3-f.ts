import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'companion-app-trial-3-1-3-f',
  batchId: 'batch-1',
  sortOrder: 39,
  title: 'A companion app rejected because its trial ends',
  guidelineLabel: 'Guidelines 3.1.1 In-App Purchase and 3.1.3(f) Free Stand-alone Apps',
  tags: ['3-1-1', '3-1-3'],
  platform: 'iOS',
  body:
    'A developer shipped a free iOS companion app for their paid web based email service. The app sold nothing inside it. They pointed App Review to the 3.1.3(f) exception for free stand-alone companion apps, but the app was rejected four times. They appealed, and the App Review Board upheld the rejection. Its reasoning was that the service offered a 14 day free trial, so for an iOS user the app stopped being useful after 14 days and was not a real stand-alone experience. Apple offered two ways out: give the app enough free content and features to stand on its own, or let App Store customers buy the service with In-App Purchase. The developer pointed out that a well known email app seemed to do the same thing with a 14 day limit.',
  resolution:
    'Still unresolved at the time of posting. The appeal was lost, and the developer was weighing a minimal free tier against adding In-App Purchase.',
  lesson:
    'The 3.1.3(f) companion exception is read narrowly. If your web service has a time limited trial, Apple may treat the app as a paywall in disguise once the trial ends. Before you submit, decide what someone can still do in the app for free after the trial, or plan for In-App Purchase. Pointing to other apps that seem to do the same rarely wins an appeal.',
}
