import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'mac-version-of-live-iphone-app-4-3-a-spam',
  batchId: 'batch-15',
  sortOrder: 97,
  title: 'The iPhone app was already live, then its Mac version was rejected as spam',
  guidelineLabel: 'Guideline 4.3(a) Design, Spam',
  tags: ['4-3'],
  platform: 'macOS',
  body:
    'A developer had an iPhone app already live on the App Store and built a native desktop version of the same app for the Mac. App Review rejected the Mac app under guideline 4.3(a). The message said the app shared a similar binary, metadata or concept with apps submitted by other developers, with only minor differences, and suggested submitting a unique app with distinct content and functionality. The developer asked the community what had worked for others facing 4.3.',
  resolution: 'No resolution was shared at the time of posting.',
  lesson:
    'Each platform gets its own review, and an approved iPhone app does not carry over to the Mac. A 4.3(a) message compares your app with apps from other developers, so when you reply, explain concretely what your app does that similar apps do not, and point to the features that only exist in yours.',
}
