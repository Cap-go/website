import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'paywall-fix-then-3-2-f-termination-within-a-week',
  batchId: 'batch-8',
  sortOrder: 66,
  title: 'One paywall fix, then a 3.2(f) termination notice a week later',
  guidelineLabel: 'Section 3.2(f) (Developer Program License Agreement)',
  tags: ['account-termination'],
  platform: 'iOS',
  body:
    "An indie developer's app had been rejected once, over how the yearly and weekly prices were shown on its paywall. The paywall had come from a template that an AI coding assistant copied in. They fixed it in code, submitted a new build, and waited about a week. Instead of a review result, they woke up to a pending termination notice under section 3.2(f). Their whole developer membership was flagged, every app they had built over several years was removed from the App Store, and payouts were frozen. The developer said they had not changed anything in the app after submitting, had logs to back that up, and publicly asked whether anyone had ever gotten an account back.",
  resolution: 'Unresolved at time of posting.',
  lesson:
    'Treat a paywall or pricing rejection as a warning, not a formality. Check any template or generated paywall code for how prices and trial terms are shown before the first submission, and keep build and change logs so you can document exactly what you submitted if your account is ever questioned.',
}
