import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'family-controls-checkbox-five-rejections',
  batchId: 'batch-1',
  sortOrder: 25,
  title: 'Five rejections for one unchecked box',
  guidelineLabel: 'Family Controls entitlement (guideline number not clearly stated)',
  tags: ['metadata'],
  platform: 'iOS',
  body: 'A developer shipping a screen time style app was rejected five times. Vague review notes led them to believe the design itself was the problem. The real cause was a single unchecked Family Controls setting in their developer setup. Once they checked it, the app passed.',
  resolution: 'Approved after enabling the Family Controls setting and resubmitting.',
  lesson:
    'When rejection notes stay vague, audit entitlements and certificates before redesigning the product. Screen Time and Family Controls apps need the matching capability enabled in the developer portal, not only in Xcode.',
}
