import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'free-seven-day-trial-as-zero-price-non-renewing-purchase-rejected-3-1-1-product-id-lost',
  batchId: 'batch-29',
  sortOrder: 140,
  title:
    'A free 7 day trial set up as a $0 non-renewing purchase was rejected under 3.1.1, and the product ID was lost for good',
  guidelineLabel: 'Guideline 3.1.1 In-App Purchase: non-renewing purchase cannot be free',
  tags: ['3-1-1'],
  platform: 'iOS',
  body: 'A developer wanted to give users a free 7 day trial and set it up in App Store Connect as a non-renewing subscription priced at $0. App Review rejected it under guideline 3.1.1, because that product type cannot be free. On top of the rejection, the product ID they had created could never be used again.',
  resolution:
    'The developer recreated the trial as a non-consumable in-app purchase priced at $0, which gives users the same thing in a product type that may be free. The outcome of the resubmission was not stated.',
  lesson:
    'Pick the in-app purchase type carefully before you create it, because product IDs cannot be reused once spent. If you want a free unlock or trial, check which product types are allowed at $0, or use an introductory offer on a real subscription.',
}