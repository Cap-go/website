import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'local-ticket-scanner-4-3-4-2-6',
  batchId: 'batch-1',
  sortOrder: 28,
  title: 'An offline ticketing app called spam, again',
  guidelineLabel: 'Guidelines 4.3 Spam and 4.2.6 App Generation Services',
  tags: ['4-3', '4-2-6'],
  platform: 'iOS',
  body:
    'A developer built a small app that turns a spreadsheet into a ticketing and check-in system that runs fully offline, with no account and no subscription. It had already handled entry at a local event with several hundred attendees over the summer. Apple rejected it again with a combined 4.3 and 4.2.6 notice, saying it might duplicate apps already on the store, be an opportunistic variant of a crowded category, or come from a template or app generation service. The developer said they knew of no other app that did the same thing, and the Android version had been live for about a week.',
  resolution:
    'Still rejected at the time of posting. The developer said they were not trying to make money from the App Store anyway.',
  lesson:
    'A 4.3 reviewer sees your listing and a few minutes of the app, not your real users. If the app is genuinely different, say exactly how in the review notes and the first screenshots, mention the real world use, and state plainly that you did not use a template or app generator.',
}
