import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'web-wrapper-first-version-4-3-a-rebuilt-native',
  batchId: 'batch-14',
  sortOrder: 92,
  title: 'A web app in a wrapper got 4.3(a) spam, so the developer rebuilt it as a native app',
  guidelineLabel: 'Guideline 4.3(a) Spam',
  tags: ['4-3'],
  platform: 'iOS',
  body:
    'A developer submitted the first version of their app as a web app inside a native wrapper. App Review rejected it under guideline 4.3(a), the spam rule. The developer admitted Apple had a point. They rebuilt the app as a real native app, moved its backend to a relay server they run themselves, and published the source code.',
  resolution:
    'Rebuilt as a native app with a self hosted relay server. The outcome of the rebuilt version was not shared in the post.',
  lesson:
    'A thin wrapper around a website is easy for App Review to read as spam. If you ship to the App Store, give the app real native value from the first submission instead of hoping a wrapped site gets through.',
}
