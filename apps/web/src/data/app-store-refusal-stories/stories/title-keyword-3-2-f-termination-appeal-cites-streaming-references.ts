import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'title-keyword-3-2-f-termination-appeal-cites-streaming-references',
  batchId: 'batch-12',
  sortOrder: 82,
  title: 'A title keyword, a 3.2(f) termination, and an appeal answer that pointed to streaming references',
  guidelineLabel: 'Section 3.2(f) (Developer Program License Agreement)',
  tags: ['account-termination', 'metadata'],
  platform: 'Apple Developer Program',
  body:
    'An indie developer had their whole developer account terminated under section 3.2(f). By their account it came with no warning and no earlier metadata rejection, and they believed the cause was a keyword mistake in an app title. They appealed. The App Review Board replied that its investigation confirmed guideline violations: one of the developer\'s apps included misleading references that led users to believe it delivered streaming services, which Apple called egregious. The letter described a pattern of manipulative or misleading behavior, kept earnings payments paused, and said that once the termination was formal the developer could petition the App Review Board for reinstatement, explaining the reasons and the improvements planned.',
  resolution: 'Appeal rejected. A reinstatement petition is possible after formal termination.',
  lesson:
    'Words in a title or keywords that hint at a service the app does not provide, like streaming, can be read as misleading rather than as a simple metadata mistake, and that can lead straight to termination with no rejection first. Check every title, subtitle and keyword against what the app actually does before you submit.',
}
