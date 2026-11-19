import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'no-ads-answer-in-age-rating-questionnaire-while-showing-banner-ads',
  batchId: 'batch-25',
  sortOrder: 129,
  title: 'An app was rejected because its age rating answers said it had no ads while it was showing banner ads',
  guidelineLabel: 'Age rating questionnaire mismatch (guideline number not stated)',
  tags: ['metadata'],
  platform: 'iOS',
  body: "A developer's app was rejected over one wrong answer in the age rating questionnaire in App Store Connect. The questionnaire said the app contained no ads, but the build showed banner ads, and the reviewer flagged the mismatch.",
  resolution:
    'The developer corrected the answer and had the app back in review within 45 minutes. The second review went through smoothly and the app went live. A few weeks later the developer removed the ads entirely.',
  lesson:
    'The age rating questionnaire is reviewed against the build, it is not a formality. Check it again whenever a release changes how the app makes money, such as adding or removing ads, so the answers match what the reviewer sees.',
}