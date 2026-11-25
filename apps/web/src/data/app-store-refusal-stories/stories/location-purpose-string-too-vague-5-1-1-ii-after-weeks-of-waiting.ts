import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'location-purpose-string-too-vague-5-1-1-ii-after-weeks-of-waiting',
  batchId: 'batch-32',
  sortOrder: 147,
  title: 'Weeks of waiting, then rejected again over one vague location permission sentence',
  guidelineLabel: 'Guideline 5.1.1(ii) Legal, Privacy, Data Collection and Storage',
  tags: ['5-1-1'],
  platform: 'iOS',
  body: 'A developer whose app had already been rejected before waited weeks for the next review, only to be rejected again under 5.1.1(ii). The problem was a single line. The location purpose string only asked the user to allow the app to access their location. Apple said purpose strings must clearly and completely describe how the app uses the data, and in most cases give an example, and asked for the location text to be rewritten with a specific example of how the location would be used.',
  resolution:
    'Not resolved at the time of writing. The developer had to rewrite the location permission text and resubmit.',
  lesson:
    'Write every purpose string as a sentence a user can check: what the app does with the data, plus one concrete example, such as showing nearby places on a map. Review all of them before each submission, because a one line string can cost you another full trip through the queue.',
}