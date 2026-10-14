import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'subscription-price-prominence-3-1-2',
  batchId: 'batch-1',
  sortOrder: 18,
  title: 'The monthly price was bigger than the billed price',
  guidelineLabel: '3.1.2 Subscriptions',
  tags: ['3-1-2'],
  platform: 'iOS',
  body: "A developer's paywall was rejected because it showed the calculated monthly price of a longer subscription more prominently than the amount actually billed. The same paywall had passed earlier reviews without comment. They agreed with the rule but were frustrated it was flagged only now, and redesigned the paywall to lead with the billed amount.",
  resolution: 'Resubmitted with the new design.',
  lesson:
    'A paywall that passed before can still be rejected later. Always make the billed amount and period the most prominent price; show any per month breakdown smaller and secondary.',
}
