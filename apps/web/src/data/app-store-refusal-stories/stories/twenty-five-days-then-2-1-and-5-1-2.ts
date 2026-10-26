import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'twenty-five-days-then-2-1-and-5-1-2',
  batchId: 'batch-6',
  sortOrder: 60,
  title: 'Twenty-five days in review, then 2.1 and 5.1.2 at once',
  guidelineLabel: 'Guidelines 2.1 and 5.1.2',
  tags: ['2-1', '5-1-2', 'endless-review'],
  platform: 'iOS',
  body:
    'An indie developer submitted the first version, 1.0, of an iOS app. After about seventeen days, the build was still in review. After roughly twenty-five days total, App Review rejected it under guideline 2.1 App Completeness and guideline 5.1.2 Data Use and Sharing in the same decision. App Store Connect then blocked every other item in the submission until the rejected version was fixed. The developer said the cited problems were easy to fix; the painful part was expecting another two to three weeks for the resubmission.',
  resolution: 'They fixed both issues and resubmitted. The outcome of the next review was not reported.',
  lesson:
    'When queues run this long, every rejection can cost weeks. Before you submit, run a full completeness pass with no broken flows, a working demo account, and nothing placeholder, and make sure privacy answers and any SDK data sharing match what the app actually does.',
}
