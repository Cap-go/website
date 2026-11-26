import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'home-inventory-app-sent-back-name-taken-and-looked-like-every-other-one',
  batchId: 'batch-33',
  sortOrder: 150,
  title: 'One review, two problems: the name was taken and the app looked like every other home inventory app',
  guidelineLabel: 'Guideline number not stated (name and similarity)',
  tags: ['4-3', 'metadata'],
  platform: 'iOS',
  body: 'A developer built an iPhone app that remembers what is in the fridge, closets and shelves, where one photo of an item is the whole entry and a reminder comes a few days before it expires. App Review sent the first submission back for two reasons: the app name was already taken, and the app looked like every other home inventory app. The post did not name the guideline numbers.',
  resolution: 'The developer agreed with the feedback, renamed the app, and it is now live on the App Store.',
  lesson:
    'Check that your name is free in App Store Connect before you build a brand around it. In a crowded category, a reviewer compares you with every similar app they have seen, so make your screenshots and description show what is different from the first glance.',
}