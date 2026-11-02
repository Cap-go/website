import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'copied-terms-and-privacy-links-pointed-to-old-app',
  batchId: 'batch-13',
  sortOrder: 89,
  title: 'Code reused from another app, and the Terms and Privacy links still pointed to the old one',
  guidelineLabel: 'Metadata rejection (Terms and Privacy links)',
  tags: ['metadata'],
  platform: 'iOS',
  body:
    'A developer built a new app partly by reusing pieces from one of their earlier apps. The Terms of Use and Privacy Policy links inside it still pointed to the old app, and App Review rejected the submission for that. The developer said the rejection message spelled out exactly what needed changing.',
  resolution:
    'Fixed the links and resubmitted. The developer said an expedited review usually came back in about a day, but should be used sparingly.',
  lesson:
    'Before you submit an app built from an older project, check every link, bundle name, and legal page it carries over. Read the rejection message closely, because it often says exactly what to fix.',
}
