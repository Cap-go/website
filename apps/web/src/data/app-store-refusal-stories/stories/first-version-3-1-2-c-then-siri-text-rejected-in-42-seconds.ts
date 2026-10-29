import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'first-version-3-1-2-c-then-siri-text-rejected-in-42-seconds',
  batchId: 'batch-9',
  sortOrder: 73,
  title: 'Nine days waiting, a 3.1.2(c) paywall rejection, then a binary rejected in 42 seconds over Siri text',
  guidelineLabel: 'Guideline 3.1.2(c), then Apple trademark in Siri text (guideline number not stated)',
  tags: ['3-1-2', 'endless-review'],
  platform: 'iOS',
  body:
    'A developer on a new account submitted the first version of a writing habit app and waited about nine days before it moved to In Review. Fifty minutes later it was rejected under guideline 3.1.2(c): on the yearly plan, the calculated monthly price was shown in larger text than the yearly price actually billed. They fixed the paywall font sizes and uploaded a new build. That build was rejected automatically in 42 seconds, because the help text of a Siri shortcut mentioned an Apple app by its brand name, and text in Siri intents cannot use the word Apple. They reworded it to refer to the notes app generically and uploaded the build again.',
  resolution: 'Resubmitted, result unknown at time of posting.',
  lesson:
    'Before the first submission, make the billed amount the most prominent price on every plan and search all user facing strings, including Siri, Shortcuts and widget text, for Apple trademarks. Automated checks catch these in seconds, but each round still costs you a place in the queue.',
}
