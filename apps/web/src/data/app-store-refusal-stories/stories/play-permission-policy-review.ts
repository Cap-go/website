import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'play-permission-policy-review',
  batchId: 'batch-1',
  sortOrder: 37,
  title: 'The permission policy time sink',
  guidelineLabel: 'Google Play permissions and policy review',
  tags: ['metadata', 'endless-review'],
  platform: 'Google Play',
  body:
    'A field operations Android app triggered a broad policy review after a narrow permission used on one screen. The team documented the feature, added reviewer instructions, recorded a demo path, and still had to remove the permission from the main release to unblock customers after thirteen days.',
  resolution: 'Approved after removing the permission, recording a new demo, and rewriting the store declaration.',
  lesson:
    'Scope sensitive permissions to the smallest surface you can ship first. A single permission can expand into a full policy review on Google Play.',
}
