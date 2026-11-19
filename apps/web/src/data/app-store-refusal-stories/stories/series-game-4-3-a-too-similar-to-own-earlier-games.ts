import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'series-game-4-3-a-too-similar-to-own-earlier-games',
  batchId: 'batch-20',
  sortOrder: 114,
  title: "A new game in an indie series was rejected under 4.3(a) as too similar to the developer's own earlier games",
  guidelineLabel: 'Guideline 4.3(a) Spam',
  tags: ['4-3'],
  platform: 'iOS',
  body: "An independent developer was preparing the iOS release of a new game in their own series, while also translating it into more languages. App Review rejected the iOS version as spam under guideline 4.3(a), saying it was too similar to the developer's previous games. The developer had significantly reworked the core battle system, but admitted that parts carried over from the series, such as the basic interface, icons and logo, still looked much like the earlier titles. App Review only sent the standard rejection message, and a week after asking for more details the developer had no reply.",
  resolution:
    'Unresolved at the time of posting. The developer was explaining to App Review what makes the new game different from the earlier titles, and said they could not tell when or whether the iOS version would ship.',
  lesson:
    'Under 4.3(a), your own back catalog counts as the comparison, so a sequel that reuses the interface, icons and branding of earlier games can read as a duplicate even when the gameplay changed. Make the new parts obvious in the build and screenshots, and list them for the reviewer in the notes before you submit.',
}
