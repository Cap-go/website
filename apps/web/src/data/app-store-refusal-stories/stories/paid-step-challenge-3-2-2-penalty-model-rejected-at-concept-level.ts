import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'paid-step-challenge-3-2-2-penalty-model-rejected-at-concept-level',
  batchId: 'batch-20',
  sortOrder: 112,
  title: 'A paid step challenge app was rejected under 3.2.2, and a call with App Review confirmed the whole model was out',
  guidelineLabel: 'Guideline 3.2.2 Unacceptable Business Models',
  tags: ['3-2-2'],
  platform: 'iOS',
  body: 'A team that already ran a fitness app with thousands of users built a second iOS app around paid step challenges: users pay a fee to join a walking challenge, the same basic model as several fitness apps already on the store. App Review rejected it under guideline 3.2.2. The explanation was that any penalty based model is not allowed, whether users pay before the challenge starts or get charged after missing a goal. The team met with the App Review team to ask what to change, and was told the concept itself was not allowed, not one specific screen or step in the flow.',
  resolution:
    'The team decided not to appeal because they did not want to put their developer account at risk. At the time of posting the app was not on the store, and they still did not understand why apps with the same model remain live.',
  lesson:
    'Similar apps already on the store are not a precedent App Review will accept, because your build is judged against how the guideline is read today. If money changes hands based on whether a user hits a goal, check that model against 3.2.2 before building the whole product around it, for example by asking App Review directly.',
}
