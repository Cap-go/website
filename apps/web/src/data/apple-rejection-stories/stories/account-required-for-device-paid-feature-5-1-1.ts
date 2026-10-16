import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'account-required-for-device-paid-feature-5-1-1',
  batchId: 'batch-1',
  sortOrder: 26,
  title: 'Account required for a paid feature that runs on device',
  guidelineLabel: 'Guideline 5.1.1(v)',
  tags: ['5-1-1', 'login-requirement'],
  platform: 'iOS',
  body: 'A developer coming from web apps was rejected under guideline 5.1.1(v). On the web they always tied purchases to an account. On iOS Apple owns the purchase, so buyers can pay without signing up. Their paid tier unlocked on device filters that ran only on the phone, but both unlocking that tier and Restore purchases still forced account creation first.',
  resolution: 'Rebuilding so a purchase made without an account still finds its owner after optional sign up. In progress at the time of posting.',
  lesson:
    'If a paid feature runs on the device and does not need a server identity, let people buy and restore it without an account. Keep sign up only for features that truly need one, such as cloud backup.',
}
