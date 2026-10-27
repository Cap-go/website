import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'new-features-then-4-3-a-extended-review-warning',
  batchId: 'batch-7',
  sortOrder: 62,
  title: 'New features, new screenshots, and a 4.3(a) in three minutes with a warning',
  guidelineLabel: 'Guideline 4.3(a)',
  tags: ['4-3'],
  platform: 'iOS',
  body:
    'A developer who had spent about two months building an app from scratch had already been rejected under 4.3 spam. For the next round they added new features, replaced every screenshot, optimized the app for more device sizes, and resubmitted with review notes and a premium test account. Three minutes after the app entered review it was rejected again under Guideline 4.3(a). This time the message ended with an extended review notice: repeated submissions with these issues would lead to longer review times, and accounts that keep submitting such apps face removal from the Apple Developer Program. Afraid that another resubmission could cost the whole account, the developer was deciding whether to drop the app or ask App Review for a call.',
  resolution: 'Unresolved at time of posting.',
  lesson:
    'Once the extended review notice appears, a quick resubmit is the riskiest move. Ask for an App Review call first and resubmit only once you know what they consider too similar.',
}
