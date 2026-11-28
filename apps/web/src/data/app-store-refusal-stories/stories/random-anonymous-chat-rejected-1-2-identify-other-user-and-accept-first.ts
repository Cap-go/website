import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'random-anonymous-chat-rejected-1-2-identify-other-user-and-accept-first',
  batchId: 'batch-35',
  sortOrder: 155,
  title: 'A random anonymous chat app was rejected under 1.2, and even the word stranger in the metadata was flagged',
  guidelineLabel: 'Guideline 1.2',
  tags: ['1-2', 'metadata'],
  platform: 'iOS',
  body: 'A developer built an app that connects people for random, anonymous chats. App Review rejected it under Guideline 1.2, stating that random and anonymous chat is not appropriate. Apple also flagged the words anonymous and stranger in the app\'s metadata.',
  resolution:
    'According to the developer, passing requires two changes. Before a chat starts, the app must show identifying information about the other user, and users must be able to accept, decline or skip a match first. Whether the reworked app was approved was not shared.',
  lesson:
    'Under 1.2, any app that pairs strangers is treated as user generated content with real safety risk. Plan for profiles, consent before connecting, blocking and reporting from the start, and keep words like anonymous and stranger out of your listing.',
}