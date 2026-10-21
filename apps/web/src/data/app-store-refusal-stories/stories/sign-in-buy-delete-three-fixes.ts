import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'sign-in-buy-delete-three-fixes',
  batchId: 'batch-1',
  sortOrder: 43,
  title: 'Version 1.0 rejected for sign in, purchase, and delete flows',
  guidelineLabel: 'Guidelines 5.1.1(v) and 3.1.2',
  tags: ['5-1-1', '3-1-2'],
  platform: 'iOS',
  body:
    'A developer\'s version 1.0 was rejected for three issues at once, none about the app idea itself. After Sign in with Apple the app still asked the user for a name that Sign in with Apple had already provided. Account deletion had to be startable inside the app. The subscription and support screen had to show the price, renewal terms, and a Terms link. The developer\'s own takeaway was that all three were about signing in, buying, and deleting.',
  resolution: 'Not stated.',
  lesson:
    'Before a first submission, walk the sign in, purchase, and delete account flows like a reviewer. Those three flows cause many first rejections.',
}
