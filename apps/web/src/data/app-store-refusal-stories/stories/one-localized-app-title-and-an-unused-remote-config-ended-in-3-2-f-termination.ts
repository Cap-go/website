import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'one-localized-app-title-and-an-unused-remote-config-ended-in-3-2-f-termination',
  batchId: 'batch-31',
  sortOrder: 143,
  title:
    'A different app title in one localization and an old unused config ended in a 3.2(f) termination',
  guidelineLabel: 'Section 3.2(f) (Developer Program License Agreement), after questions about metadata',
  tags: ['account-termination', 'metadata'],
  platform: 'iOS',
  body: "A developer received a notice that their Apple developer account would be terminated. About two weeks in, Apple gave them 48 hours to explain two things: why the app's name on the store page in one localization was different from its name elsewhere, and what a suspicious remote configuration the app was fetching was for. The developer answered that the localized title was there for App Store search optimization, and that the configuration was an old leftover the latest build no longer used. Apple then went silent for several days.",
  resolution:
    'About 19 days after the first notice, Apple made a final decision and confirmed the termination. The developer accepted it, saying the different localized title was their mistake and that Apple saw it as misleading to users.',
  lesson:
    'Treat every localization as the same app. Keep the app name consistent across storefronts and put search terms in keywords, not in a title that differs by locale. Remove old configuration endpoints that a shipping build no longer uses, so you never have to explain something your current app does not do.',
}