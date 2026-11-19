import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'mac-update-45-days-in-review-then-3-2-f-notice',
  batchId: 'batch-19',
  sortOrder: 111,
  title: 'A macOS update that fixed an icon issue sat in review for about 45 days, then a 3.2(f) notice arrived',
  guidelineLabel: 'Section 3.2(f) (Developer Program License Agreement)',
  tags: ['account-termination', 'endless-review'],
  platform: 'macOS',
  body: 'An independent developer had a macOS app that App Review had flagged over branding concerns. On September 15, 2026, they submitted an update that addressed the feedback, including a fully redesigned app icon. The update then stayed In Review for about 45 days with no decision, and the developer sent two expedited review requests through the official channels. On October 30, 2026, while that corrected update was still waiting, a Pending Developer Account Termination Notice arrived under section 3.2(f).',
  resolution: 'Appeal pending at time of posting. The developer filed a formal appeal and contacted Developer Support separately, and had not received a substantive response.',
  lesson:
    'A fix waiting in the queue does not pause enforcement on older submissions. Keep a dated record of every rejection, every change you made in response and every expedite request, so an appeal can show exactly what you corrected and when.',
}
