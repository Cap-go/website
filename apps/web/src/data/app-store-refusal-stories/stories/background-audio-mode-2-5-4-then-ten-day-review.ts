import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'background-audio-mode-2-5-4-then-ten-day-review',
  batchId: 'batch-14',
  sortOrder: 91,
  title: 'Rejected over one leftover checkbox, the audio background mode, then ten days for the next update',
  guidelineLabel: 'Guideline 2.5.4 Software Requirements (background modes)',
  tags: ['endless-review'],
  platform: 'iOS',
  body:
    'A small team submitted an update to an app that was already live. App Review rejected it under guideline 2.5.4 for a single setting: the audio background mode was enabled in the app, and the app did not need it. The team removed the background mode and resubmitted the same day, which cost them about a day. Their next update then sat in review for roughly ten days.',
  resolution:
    'Removed the audio background mode and resubmitted the same day. The following update waited about ten days in review.',
  lesson:
    'Background modes are only allowed for their intended purpose. Before every submission, open the Background Modes capability and remove anything the app does not actually use, because a leftover checkbox is enough for a rejection, and you cannot predict how long the next review will take.',
}
