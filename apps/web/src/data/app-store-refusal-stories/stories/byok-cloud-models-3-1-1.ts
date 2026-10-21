import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'byok-cloud-models-3-1-1',
  batchId: 'batch-1',
  sortOrder: 40,
  title: 'Bring your own API key treated as paying outside the App Store',
  guidelineLabel: 'Guideline 3.1.1 In-App Purchase',
  tags: ['3-1-1'],
  platform: 'iOS',
  body: 'A solo developer building an AI assistant for iPhone let users paste their own API key from a third party model aggregator so they could run large cloud models. On the fourth review round, App Review rejected the app under guideline 3.1.1, treating the bring your own key option as a way to pay for features outside the App Store. As the developer understood the rejection, a key bought elsewhere can only unlock paid capability in the app if that seller offers In-App Purchase in its own iOS app, and this provider has no iOS app. The developer did not appeal.',
  resolution:
    'They removed the bring your own key feature entirely, rebuilt the next version to run models fully on device, and planned to bring cloud models back later as in-app credits sold through In-App Purchase. The result of that resubmission was not known at the time of writing.',
  lesson:
    'If paid capability in your app is unlocked by credentials bought somewhere else, check before you build whether that seller offers In-App Purchase in its own iOS app. If not, plan your own In-App Purchase path or a mode that works without it.',
}
