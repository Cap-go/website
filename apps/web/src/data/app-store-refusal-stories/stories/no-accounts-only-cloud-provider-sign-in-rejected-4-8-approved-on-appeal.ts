import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'no-accounts-only-cloud-provider-sign-in-rejected-4-8-approved-on-appeal',
  batchId: 'batch-32',
  sortOrder: 146,
  title: 'An app with no accounts of its own was told to add Sign in with Apple under 4.8, and won on appeal',
  guidelineLabel: 'Guideline 4.8 Login Services',
  tags: ['login-requirement', 'endless-review'],
  platform: 'iOS',
  body: 'A developer built an iOS on-call companion for a cloud hosting provider, with push alerts when a server or app breaks, Lock Screen Live Activities, and quick fixes confirmed with Face ID. The app has no accounts of its own. Users sign in with their hosting provider account, because that is where their servers are. App Review rejected it under 4.8, saying it must offer Sign in with Apple. In total the app spent over a month in App Review.',
  resolution:
    'Instead of adding a login nobody needed, the developer appealed, pointing to the exception in 4.8 that covers exactly this case. The appeal worked and the app was approved.',
  lesson:
    'Read the full text of the guideline you were rejected under before you change your app. Guideline 4.8 lists exceptions, including apps that are a client for a specific third-party service. If one fits, say so in the review notes, and appeal with that exact clause rather than adding a login your users do not need.',
}