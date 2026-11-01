import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'movie-picker-posters-4-1-a-after-fifteen-days',
  batchId: 'batch-12',
  sortOrder: 83,
  title: '15 days in review, then 4.1(a) Copycats for movie posters from a public API',
  guidelineLabel: 'Guideline 4.1(a) Copycats',
  tags: ['endless-review', '5-2-3'],
  platform: 'iOS',
  body:
    'A developer built an iOS app that helps people pick a movie. It shows titles and posters pulled from a public movie database API, credited inside the app, and its watch button opens the official streaming app rather than streaming anything itself. After 15 days in review, Apple rejected it under guideline 4.1(a) Copycats, treating the posters as third party content and asking for proof of the rights to use them, or for their removal. The same app with the same posters had been approved on Android and on a TV device app store.',
  resolution:
    'Unresolved at time of posting. The developer was asking other developers whether the API terms had been accepted as proof or whether the posters had to go.',
  lesson:
    'Credit inside the app and approval on other stores do not count as rights for App Review. If your app shows posters, artwork or logos from an API, have written proof that you may display them ready before you submit, or plan a version without them.',
}
