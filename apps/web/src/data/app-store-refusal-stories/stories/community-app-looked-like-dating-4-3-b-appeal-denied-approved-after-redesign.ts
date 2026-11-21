import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'community-app-looked-like-dating-4-3-b-appeal-denied-approved-after-redesign',
  batchId: 'batch-28',
  sortOrder: 136,
  title:
    'A community app was rejected under 4.3(b) because it looked like a dating app, the appeal was denied, and a redesign got it approved',
  guidelineLabel: 'Guideline 4.3(b) Design Spam: saturated category',
  tags: ['4-3'],
  platform: 'iOS',
  body: 'A solo developer built a community app to help people from one diaspora meet locally and chat. The first version was rejected under guideline 4.3(b) as too close to other apps, and an appeal was denied. Looking back, the developer saw that the build looked and behaved like a dating app: it had a matching tab, dating style profile fields and a flame icon, and that is how App Review read it.',
  resolution:
    'The developer removed the matching tab, replaced the dating fields with interests, and put small local groups and meetups at the center of the app. That version was approved in September.',
  lesson:
    'Under 4.3(b), App Review judges what your app looks like, not what you meant it to be. If your screens borrow the patterns of a crowded category such as dating, expect to be filed there, and change the core experience rather than the wording before you resubmit.',
}