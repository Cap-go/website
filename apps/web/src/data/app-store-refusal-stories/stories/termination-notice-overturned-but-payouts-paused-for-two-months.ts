import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'termination-notice-overturned-but-payouts-paused-for-two-months',
  batchId: 'batch-28',
  sortOrder: 138,
  title: 'A termination notice was overturned, but paused payments still meant two months without a payout',
  guidelineLabel: 'Account termination notice, later overturned',
  tags: ['account-termination'],
  platform: 'Apple Developer Program',
  body: 'A developer whose apps were earning thousands in revenue every day received an account termination notice from Apple. Apple later overturned the decision and agreed that no rule had been broken. While the account was under termination, payments were paused.',
  resolution:
    "The account was kept, but the next payout arrived a month late. That meant about two months with no money reaching the developer's bank account while expenses still had to be paid.",
  lesson:
    'Even a termination that is reversed can freeze your cash flow for weeks. Keep enough runway to cover at least one missed payout, and treat any termination notice as urgent even when you are sure you broke no rule.',
}