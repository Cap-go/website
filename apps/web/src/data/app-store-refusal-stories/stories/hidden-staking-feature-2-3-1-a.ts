import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'hidden-staking-feature-2-3-1-a',
  batchId: 'batch-6',
  sortOrder: 61,
  title: 'Real money stakes rejected as hidden under 2.3.1(a)',
  guidelineLabel: 'Guideline 2.3.1(a)',
  tags: ['2-3-1', 'metadata'],
  platform: 'iOS',
  body:
    'A developer built a habit and discipline tracker where users could put money at stake and lose it if they missed their goals. In mid-October 2026, App Review rejected it under guideline 2.3.1(a), saying the app contained hidden features, specifically monetary staking and stake forfeiture that were not described in the metadata. The letter also carried an Extended Review notice warning that repeated submissions with such issues lead to longer review times and that accounts that keep breaking the rules can be removed from the Apple Developer Program. The app went through five rejections in total; another cited a crash during review on iPad. The developer, who had built with AI coding tools, summarized takeaways: read the guidelines, match metadata to the app, never hide features or data collection, review generated code, and test on different devices.',
  resolution: 'Not stated beyond reworking the app after five rejections. Approval was not reported.',
  lesson:
    'Any feature that moves real money, including stakes or forfeits, must be clear in the description and App Review notes. Test on iPad even if you target iPhone, because reviewers do.',
}
