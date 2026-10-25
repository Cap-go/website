import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'terms-link-description-then-ten-days-silence-3-1-2',
  batchId: 'batch-5',
  sortOrder: 58,
  title: 'Terms link in the app but missing from the description',
  guidelineLabel: 'Guideline 3.1.2',
  tags: ['3-1-2'],
  platform: 'iOS',
  body: "A subscription app's first version was rejected two days after submission because the Terms of Use link was not in the App Store description. It was already present inside the app on the paywall and in settings, just not in that metadata field.",
  resolution: 'The fix took five minutes, but after resubmitting the build sat in Waiting for Review for more than ten days with no response. None reported yet.',
  lesson:
    'For auto renewable subscriptions, put Terms of Use (EULA) and Privacy Policy links in the App Store metadata as well as in the app before the first submission, because a quick fix can still cost a long second wait.',
}
