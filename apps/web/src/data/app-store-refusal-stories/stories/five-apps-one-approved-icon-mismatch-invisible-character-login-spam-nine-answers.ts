import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'five-apps-one-approved-icon-mismatch-invisible-character-login-spam-nine-answers',
  batchId: 'batch-26',
  sortOrder: 131,
  title:
    'One developer shipped five apps and only one passed everywhere, the others were stopped by an icon mismatch, an invisible character and a spam guideline',
  guidelineLabel: 'Icon mismatch, reviewer login crash and a spam guideline (guideline numbers not stated)',
  tags: ['metadata', 'login', '4-3'],
  platform: 'iOS',
  body: 'A solo developer submitted five apps around the same time. One was rejected twice because the icon shown inside the app did not match the icon on the store listing, a single image file. Another was rejected because one invisible bullet character had ended up inside a sign in token, which crashed the login when the reviewer tried it. A third was rejected by Apple under a spam guideline, and responding took nine written answers.',
  resolution:
    "Only one of the five apps made it through review on every store. The developer's own conclusion was that none of the rejections were about the product itself, each one came down to a small detail that the reviewer, as the first real user, was the first to hit.",
  lesson:
    'Before submitting, check the boring details yourself: the in app icon matches the listing icon, the demo login works when typed fresh on a clean device, and the review notes explain what makes each app distinct. Small mismatches cost a full review cycle each.',
}