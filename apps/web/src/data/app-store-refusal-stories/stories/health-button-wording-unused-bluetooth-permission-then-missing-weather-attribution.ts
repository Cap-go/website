import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'health-button-wording-unused-bluetooth-permission-then-missing-weather-attribution',
  batchId: 'batch-26',
  sortOrder: 130,
  title:
    'An app was rejected twice, first for a Health button label and an unused Bluetooth permission, then for a missing Apple Weather logo',
  guidelineLabel: 'Button wording, unused permission and weather attribution (guideline numbers not stated)',
  tags: ['metadata'],
  platform: 'iOS',
  body: "A developer's app was rejected twice before it was approved. The first rejection flagged two things: the wording on a button that connected to Apple Health was wrong, and the app asked for Bluetooth permission even though it never used Bluetooth. After that was fixed, the second review found a weather feature that the reviewer switched on in settings, and the screens showing that weather data did not carry the Apple Weather logo.",
  resolution:
    'The developer fixed the button text, removed the unused permission, added the Apple Weather attribution where the weather data appears, and the third submission was approved.',
  lesson:
    'Reviewers read every button label and every permission request, and they turn on optional features buried in settings. Remove any permission the app does not use, and if you show data from an Apple service, add its attribution everywhere that data appears, not only on the main screen.',
}