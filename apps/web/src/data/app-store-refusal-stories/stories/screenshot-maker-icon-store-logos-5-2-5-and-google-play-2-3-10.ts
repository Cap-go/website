import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'screenshot-maker-icon-store-logos-5-2-5-and-google-play-2-3-10',
  batchId: 'batch-21',
  sortOrder: 115,
  title: 'An app for making store screenshots was rejected because its own icon showed the App Store logo',
  guidelineLabel: 'Guidelines 5.2.5 and 2.3.10',
  tags: ['5-0', '2-3-10'],
  platform: 'iOS',
  body: 'A developer built an app that helps people create screenshots for both the App Store and Google Play. Its first iOS build was rejected under two guidelines. Under 5.2.5, the app icon showed the App Store logo next to the Google Play logo, and the subtitle in the listing started with the words App Store. Under 2.3.10, Google Play appeared in the iOS build itself, in the binary, the icon and the screenshots. The developer had looked at that icon every day for weeks without seeing a problem.',
  resolution:
    'The developer redrew the icon, rewrote the subtitle, and added one switch that hides Google Play everywhere in the iOS version, from onboarding and export to settings and error messages, while leaving saved projects untouched and keeping both stores on Android. They explained the change in one line in the review notes. The second build had been waiting for review for at least three days at the time of posting.',
  lesson:
    'Apple reviews the icon and subtitle as strictly as the screens. Even when your app is about app stores, keep Apple marks out of the icon and listing, and make sure no other store name appears anywhere in the iOS build, screenshots included.',
}
