import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'already-approved-app-icon-rejected-for-exposed-character',
  batchId: 'batch-18',
  sortOrder: 107,
  title: 'An app icon that was already approved got rejected for showing too much skin',
  guidelineLabel: 'App icon flagged as objectionable (guideline number not stated)',
  tags: ['objectionable-content', 'metadata'],
  platform: 'iOS',
  body: 'An AI app used an illustrated character as its app icon, wearing a crop top that showed some chest and midriff. That same icon had passed App Review before. On a later submission, Apple rejected it because the chest and belly were too exposed. The developer redrew the character in a full top that covered both and resubmitted.',
  resolution: 'Redrew the icon so the top covered the chest and midriff. The post did not say how long the new review took.',
  lesson:
    'An earlier approval does not lock in your icon or screenshots, because each submission can be judged again. If a character in your art shows skin, assume a stricter reviewer may flag it, and keep a more covered variant ready so the fix is a swap, not a redesign.',
}
