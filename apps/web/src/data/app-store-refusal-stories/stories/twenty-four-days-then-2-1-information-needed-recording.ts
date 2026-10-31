import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'twenty-four-days-then-2-1-information-needed-recording',
  batchId: 'batch-11',
  sortOrder: 78,
  title: '24 days in the queue, then a 2.1 rejection asking for a full screen recording',
  guidelineLabel: 'Guideline 2.1 App Completeness (Information Needed)',
  tags: ['2-1', 'endless-review'],
  platform: 'iOS',
  body:
    'A developer submitted version 1.0.0 of a new iOS app together with a subscription group and two subscriptions, yearly and monthly. After 24 days of waiting, Apple looked at it and rejected it under guideline 2.1 App Completeness, which the developer said left them confused. Because the app version was rejected, the subscriptions submitted with it could not be approved either and stayed at Ready for Review. The message behind the rejection was a 2.1 Information Needed request, the first time the developer had received one. It asked for a screen recording on a physical device running the latest operating system, starting from launch and showing the typical user flow, including registration, login and account deletion, any user generated content with its reporting and blocking tools, and access to paid content. It also asked for a description of the purpose and target audience, setup instructions with login credentials, a list of the outside services the app relies on, AI services included, any regional differences, and documentation for regulated industries or protected third party material. The answers also had to be added to the review notes in App Store Connect for future submissions.',
  resolution: 'The developer went back to preparing the recording and answers at time of posting. Outcome not known.',
  lesson:
    'An Information Needed request after weeks in the queue costs another full round trip. Record that walkthrough on a real device and write those answers into the review notes before you submit a new app, especially one with subscriptions, accounts or user content, since a rejected version also holds back everything submitted with it.',
}
