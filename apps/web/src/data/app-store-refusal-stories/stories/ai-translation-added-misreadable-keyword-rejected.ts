import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'ai-translation-added-misreadable-keyword-rejected',
  batchId: 'batch-12',
  sortOrder: 84,
  title: 'AI translated the app into five languages and slipped in a keyword that got it rejected',
  guidelineLabel: 'Metadata rejection (localized keyword)',
  tags: ['metadata'],
  platform: 'iOS',
  body:
    'A developer used an AI model to translate their app into five more languages. In one of those languages the translation added a keyword that could be misread, and the submission was rejected over it. A week later the developer was still waiting for an answer and, after a week of 3.2(f) termination stories from other developers, worried that even an approved fix could later be held against the account.',
  resolution: 'Waiting for an answer from Apple at time of posting.',
  lesson:
    'Have someone who reads each language check every localized keyword, title and subtitle before you submit. Machine translation is fast, but App Review judges the words in every locale as if you chose them yourself.',
}
