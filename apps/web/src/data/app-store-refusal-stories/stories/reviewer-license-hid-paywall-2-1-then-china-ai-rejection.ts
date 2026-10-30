import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'reviewer-license-hid-paywall-2-1-then-china-ai-rejection',
  batchId: 'batch-10',
  sortOrder: 76,
  title: 'A free license for the reviewer hid the paywall, then six days in the queue and a China AI rejection',
  guidelineLabel: 'Guideline 2.1 App Completeness, then Guideline 5 Legal (China availability)',
  tags: ['2-1', '5-0', 'endless-review'],
  platform: 'iOS',
  body:
    'A developer submitted their first iOS app, a personal finance tool for keeping track of recurring payments, and it was rejected under guideline 2.1 App Completeness. The cause was a favor that backfired: they had given the reviewer email a paid license, so the reviewer skipped the paywall and never saw the purchase flow. The developer wrote a step by step PDF guide with screenshots for the reviewer and resubmitted, this time sending the iOS and Mac versions together. The new submission waited six days before moving to In Review, and was then rejected again, this time over a mention of ChatGPT while the app was available in mainland China.',
  resolution: 'Still rejected at time of posting, while a newer build was offered to testers through TestFlight.',
  lesson:
    'Let App Review see exactly what a new user sees, paywall included. Give the reviewer a working demo or sandbox account and clear notes rather than a free license that hides the purchase flow. If the app or its listing names an AI provider such as ChatGPT, check whether mainland China is in your availability before submitting, since each new round can cost days in the queue.',
}
