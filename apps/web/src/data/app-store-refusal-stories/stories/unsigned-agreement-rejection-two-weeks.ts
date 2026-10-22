import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'unsigned-agreement-rejection-two-weeks',
  batchId: 'batch-2',
  sortOrder: 46,
  title: 'A week in the queue, rejected over an unsigned agreement, then another week',
  guidelineLabel: 'Agreement not accepted (no guideline cited)',
  tags: ['enrollment-account'],
  platform: 'iOS',
  body:
    'An app waited about a week for review and was then rejected for nothing inside the app. The account had not yet accepted a newly published agreement in App Store Connect. The developer accepted it and resubmitted, and the submission went back into the queue for roughly another week. Developer support only replied that everything was on track.',
  resolution: 'Still waiting for review at the time of writing.',
  lesson:
    'Before every submission, check App Store Connect for agreements waiting to be accepted. A missing click can cost a full trip through the review queue.',
}
