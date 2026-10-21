import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'kids-story-app-terms-link-and-data-questions',
  batchId: 'batch-1',
  sortOrder: 42,
  title: 'A kids story app still waiting after a month of rejections',
  guidelineLabel: 'Kids category, Guideline 3.1.2, and privacy questions',
  tags: ['kids-category', '3-1-2', 'endless-review'],
  platform: 'iOS',
  body:
    'A solo developer built a story app for children aged 4 to 10, where kids listen to stories and can pause to ask questions. It had already been live on Android for weeks. They submitted to the App Store on 19 September 2026. After several rounds of rejection and resubmission it was still not approved about a month later. In the latest round Apple asked for two things: because the app sells weekly, monthly, and yearly subscriptions, the App Store page needed a working link to the Terms of Use; and because the app is in the Kids category, review could not continue until the developer answered four questions about third party analytics, third party ads, whether any data is shared with third parties and where it is stored, and whether any other user or device data is collected and for what.',
  resolution: 'The developer fixed both issues and resubmitted. Outcome still pending at the time of posting.',
  lesson:
    'For kids, health, money, or education apps, find out early what local privacy law and the stores will ask, for example parental consent before collecting a child\'s data, and have the Terms of Use link and a written data answer ready before the first submission.',
}
