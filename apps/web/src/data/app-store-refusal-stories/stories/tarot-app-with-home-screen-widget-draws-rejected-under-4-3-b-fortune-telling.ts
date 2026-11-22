import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'tarot-app-with-home-screen-widget-draws-rejected-under-4-3-b-fortune-telling',
  batchId: 'batch-29',
  sortOrder: 139,
  title:
    'A tarot app with a new home screen widget mechanic was rejected under 4.3(b), because fortune telling is a saturated category',
  guidelineLabel: 'Guideline 4.3(b) Design Spam: saturated category',
  tags: ['4-3'],
  platform: 'iOS',
  body: 'A developer built a tarot app with what they saw as a new mechanic: you draw cards straight from a home screen widget, without opening the app. They did not know that guideline 4.3(b) lists fortune telling among the saturated categories, next to dating, flashlights, sound effects, wallpapers and simple timers, where Apple says it will not accept new submissions unless they offer a meaningfully different or improved experience. The app was rejected anyway, new mechanic or not.',
  resolution:
    'Not resolved at the time of writing. The developer said they would keep trying, but had little hope it would pass.',
  lesson:
    'Check the 4.3(b) category list before you build, not after you submit. A clever feature does not move your app out of a saturated category, so if your idea lives in one of them, plan for a hard review or a different core.',
}