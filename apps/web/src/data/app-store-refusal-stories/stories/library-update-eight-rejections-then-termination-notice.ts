import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'library-update-eight-rejections-then-termination-notice',
  batchId: 'batch-9',
  sortOrder: 70,
  title: 'One new library, eight rejections, a renamed app, then a termination notice',
  guidelineLabel: 'Section 3.2(f) (Developer Program License Agreement), after repeated metadata rejections',
  tags: ['account-termination', 'metadata'],
  platform: 'iOS',
  body:
    'An indie developer had an iOS app that was almost three years old, had earned six figures in revenue and had shipped many updates with a low refund rate. Over six months ago they submitted a small update whose only change was one new library. App Review rejected it more than eight times, each time over metadata: keywords that had been live for more than a year, a subtitle in one localization, then the screenshots, then the same points again, and finally the app name itself, which was where most of their search traffic came from. They asked for a call with App Review, and the reviewer told them the name was the last remaining issue. They renamed the whole app and resubmitted. Three days later a generic rejection came back with the subtitle and screenshot issues again. They decided they did not need the update and dropped it. Months later, a pending termination notice arrived in that same old review thread. It said the account had repeatedly violated the guidelines in an attempt to evade the review process and that the issues from earlier messages remained unresolved. The app was removed from the store and the whole account was flagged for removal.',
  resolution: 'Appeal filed with the App Review Board, pending at time of posting.',
  lesson:
    'An abandoned submission can still count against your account. If a review loop keeps going, get every remaining issue confirmed in writing in the review thread rather than only on a call, and if you decide to drop an update, reply in the thread to say so and remove the build from review instead of leaving the rejection unresolved.',
}
