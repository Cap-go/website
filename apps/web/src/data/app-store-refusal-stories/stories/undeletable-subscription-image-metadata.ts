import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'undeletable-subscription-image-metadata',
  batchId: 'batch-1',
  sortOrder: 30,
  title: 'Rejected three times over an image the console would not delete',
  guidelineLabel: 'Metadata and in app purchase setup',
  tags: ['metadata'],
  platform: 'iOS',
  body:
    'A developer added a promotional image to a subscription in App Store Connect and accidentally ended up with the same image added twice. After that, the image could not be deleted or replaced, and every attempt failed with a generic error asking them to try again later. The app was rejected three times over that subscription setup. Each time, the developer replied with a screen recording of the delete attempt and the error, and each time it felt like the reviewer ignored it. The developer believed the root cause was a bug in App Store Connect itself.',
  resolution: 'Still stuck at the time of posting, with no fix from Apple.',
  lesson:
    'When App Store Connect itself blocks the fix, a reply in the rejection thread may not reach anyone who can solve it. Upload subscription images carefully and only once, and if the console breaks, contact Apple developer support separately about the bug while you reply to App Review.',
}
