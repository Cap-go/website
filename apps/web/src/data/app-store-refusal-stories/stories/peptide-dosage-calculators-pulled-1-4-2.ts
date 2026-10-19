import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'peptide-dosage-calculators-pulled-1-4-2',
  batchId: 'batch-1',
  sortOrder: 27,
  title: 'Live dosage calculator apps pulled in a rule crackdown',
  guidelineLabel: 'Guideline 1.4.2 Physical Harm',
  tags: ['1-4-2'],
  platform: 'iOS',
  body:
    'A developer woke up to find two of their apps flagged under guideline 1.4.2, even though neither had anything in review. Both were already live: a standalone peptide dosage calculator and a tracker with the same calculator built in, which together had become their first real revenue success. Other developers in the same niche reported the same notice at the same time. It said apps that calculate medication doses, including peptide dosage and reconstitution, must be published by the drug maker or a recognized institution such as a hospital, insurer, pharmacy or university.',
  resolution: 'None. The developer said they understood the safety concern and treated it as the end of those apps.',
  lesson:
    'Approval is not permanent. Apple can re-evaluate a live app when it tightens a rule. If your app calculates doses or gives health guidance that could hurt someone, read guideline 1.4 before you build, and plan to publish through a qualified institution or leave the calculation out.',
}
