import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'iphone-like-device-frames-in-screenshots-5-2-5',
  batchId: 'batch-14',
  sortOrder: 94,
  title: 'Rejected under 5.2.5 because the screenshots used a device that looked like an iPhone',
  guidelineLabel: 'Guideline 5.2.5 Legal, Intellectual Property',
  tags: ['5-0', 'metadata'],
  platform: 'iOS',
  body:
    'A developer was rejected under guideline 5.2.5. App Review said the metadata contained imagery similar to an iPhone in the screenshots, which could confuse users with Apple products. The devices shown were not Apple devices, only Apple like ones, and the developer was surprised because another of their apps had already been approved with the same kind of device imagery.',
  resolution:
    'Final outcome not shared at time of posting. Another developer replying noted that App Review can also object to device frames that do not match the platform or renders that look different from real iPhones.',
  lesson:
    'Approval of one app does not set a precedent for the next. Device mockups that look almost like an iPhone can be treated as confusingly similar to Apple products. Use plain screenshots, or only device frames Apple provides for marketing, and make sure they match the platform.',
}
