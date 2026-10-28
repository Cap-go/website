import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'ipad-login-failed-during-backend-outage',
  batchId: 'batch-8',
  sortOrder: 68,
  title: 'Third rejection because login failed on iPad during a backend outage',
  guidelineLabel: 'Login on iPad (guideline number not stated)',
  tags: ['login'],
  platform: 'iOS',
  body:
    'A small team building a fitness app had its iOS app rejected for the third time because the reviewer could not log in on an iPad. The cause was not in the app code: their hosted backend provider was having authentication problems at the moment the reviewer tried, so sign in simply failed. The team had supplied a demo account with an email and password, but by their account the reviewer did not try again later. They did not own an iPad or a Mac to test on. Once the backend was healthy they resubmitted. Apple had told them the app would stay in expedited review even if rejected again, yet three business days later it was still waiting for review.',
  resolution: 'Resubmitted, still waiting for review at time of posting.',
  lesson:
    'Reviewers often test on iPad and usually try your login once. Watch your backend and auth provider status while a build is in review, test the demo account on an iPad-sized screen before submitting, and say in the review notes who to contact if sign in fails.',
}
