import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'metadata-loop-launch-week',
  batchId: 'batch-1',
  sortOrder: 35,
  title: 'The metadata loop that ate launch week',
  guidelineLabel: 'Metadata and store listing copy',
  tags: ['metadata', 'endless-review'],
  platform: 'iOS',
  body:
    'A consumer productivity team shipped a clean build, then spent more than nine days cycling through metadata objections. Each resubmission answered the previous note, but the next reply focused on another phrase, screenshot, or explanation. No code changed while launch, press, and paid acquisition plans waited on review copy.',
  resolution: 'Approved after rewriting screenshots, subtitles, and review notes without a binary change.',
  lesson:
    'Lock listing copy, screenshots, and review notes in one pass before you attach a launch date. Metadata rejections can stack even when the binary never moves.',
}
