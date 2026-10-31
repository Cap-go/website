import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'demo-account-deleted-five-minutes-then-recording-found-sales-copy',
  batchId: 'batch-11',
  sortOrder: 80,
  title: 'The demo account deleted five minutes after submission, then a recording request that saved a second rejection',
  guidelineLabel: 'App Review information request (demo account and screen recording)',
  tags: ['login'],
  platform: 'iOS',
  body:
    'An agency submitted a client app with a demo account for App Review. Five minutes after submission, App Review had deleted that demo account. Apple then asked for a screen recording of the app. While making the recording, the team found sales copy inside the app that they had missed and that would have gotten the app rejected again.',
  resolution: 'Final outcome not shared at time of posting.',
  lesson:
    'A reviewer may delete the demo account you provide, for example while checking that account deletion works, so have a way to recreate it or provide more than one. Record your own review walkthrough before submitting: watching the app the way a reviewer does is a cheap way to catch copy that would trigger the next rejection.',
}
