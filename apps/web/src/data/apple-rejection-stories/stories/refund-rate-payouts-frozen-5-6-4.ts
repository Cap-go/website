import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'refund-rate-payouts-frozen-5-6-4',
  batchId: 'batch-1',
  sortOrder: 29,
  title: 'Payouts frozen over a rising refund rate',
  guidelineLabel: 'Guideline 5.6.4 App Quality',
  tags: ['5-6-4'],
  platform: 'Apple Developer Program',
  body:
    'A developer running a fast growing subscription app woke up to a warning from Apple saying their developer account broke the Developer Code of Conduct under guideline 5.6.4, App Quality. The notice pointed to excessive refund requests and customer complaints, warned that the account could be terminated, and said all earnings payments were paused and app transfers were disabled. The refund rate had roughly doubled over the previous two months. When the developer dug into the data, most refund requests were labeled as unintended purchases, which they believed came mainly from people forgetting to cancel a 3 day free trial that rolled into an annual plan. The warning landed while a large redesign of the app was already in testing.',
  resolution:
    'Still open at the time of posting. The developer added more reminders during the trial, made the upcoming charge more obvious, added a way to manage and cancel the subscription inside the app, finished the redesign with more testing, and paused all paid creator marketing while waiting.',
  lesson:
    'Apple looks at refund rates and complaints, not just your binary. A free trial that quietly converts into a yearly charge can turn into an unintended purchase problem at scale. Remind people before the trial ends, show the real price clearly, make cancelling easy, and treat a rising refund rate as an account risk long before Apple does.',
}
