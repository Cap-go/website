import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'calendar-client-iphone-2-3-7-5-2-5-4-8-after-mac',
  batchId: 'batch-9',
  sortOrder: 72,
  title: 'Approved on Mac, then rejected on iPhone under 2.3.7, 5.2.5 and 4.8 in the same app',
  guidelineLabel: 'Guidelines 2.3.7, 5.2.5 and 4.8',
  tags: ['2-3-7', 'metadata', 'login-requirement'],
  platform: 'iOS',
  body:
    'A developer building a calendar client for a major third party calendar service shipped the Mac version first. The Mac version had already needed a formal appeal just to say in its listing that it works with that calendar service, and they had already explained to App Review why it did not need Sign in with Apple. When they added the iPhone version, under the same bundle and the same App ID as the Mac app, it was rejected on three guidelines at once: 2.3.7 for prices shown in an in-app event, 5.2.5 for a line saying the app was for iPhone, iPad and Mac, and 4.8 for not offering Sign in with Apple next to the calendar service\'s own login. Guideline 4.8 has an exception for apps that are clients for a specific third party service, which is what this app is, but the explanation given for the Mac version did not carry over. Each platform target was reviewed from zero.',
  resolution: 'Not stated at time of posting.',
  lesson:
    'A new platform is a new review, even inside the same App ID. Copy every explanation and exception you already won into the review notes for each platform, and check in-app events and descriptions for prices and Apple device names before submitting.',
}
