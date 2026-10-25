import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'age-rating-2-3-6-nothing-to-change',
  batchId: 'batch-4',
  sortOrder: 52,
  title: 'Age rating rejection when Connect already matched',
  guidelineLabel: 'Guideline 2.3.6',
  tags: ['2-3-6'],
  platform: 'iOS',
  body:
    'An app was rejected over its age rating. The developer opened the age rating questionnaire in App Store Connect and found every answer already matched what the rejection message asked for.',
  resolution:
    'They changed nothing in Connect, replied to the reviewer that the settings already matched, and resubmitted. The app was approved a few hours later.',
  lesson:
    'A 2.3.6 note can be wrong about your current settings. Check App Store Connect before changing anything, and if it already matches, say so clearly in your reply instead of guessing at a fix.',
}
