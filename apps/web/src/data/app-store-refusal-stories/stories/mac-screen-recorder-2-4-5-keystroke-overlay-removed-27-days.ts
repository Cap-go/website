import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'mac-screen-recorder-2-4-5-keystroke-overlay-removed-27-days',
  batchId: 'batch-22',
  sortOrder: 118,
  title:
    'A Mac screen recorder was rejected under 2.4.5 for showing keystrokes on screen, and shipped 27 days later without the feature',
  guidelineLabel: 'Guideline 2.4.5 Mac App Store Requirements',
  tags: ['2-4-5'],
  platform: 'macOS',
  body: 'An indie developer submitted a screen recording app to the Mac App Store. A week later it came back rejected under guideline 2.4.5. One of its features displayed the keys the user was pressing on top of the recording, and App Review said apps distributed through the Mac App Store are not allowed to read keyboard input that way.',
  resolution:
    'The developer did not dispute the decision. They removed the keystroke display, resubmitted eleven days after the rejection, and the app was approved about nine days later, 27 days after the first submission. The store build now does less than the version the developer runs on their own Mac.',
  lesson:
    'Features that watch the keyboard, the screen or other apps are where the Mac App Store rules bite hardest. If a feature depends on reading input outside your own app, check it against 2.4.5 before you build your launch around it, and decide early whether it belongs in a version you distribute outside the store instead.',
}
