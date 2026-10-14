import type { AppleRejectionStory, AppleRejectionStoryTag } from './types'

/** Visual variant within a tag family (stack depth, accent position, etc.). */
export function getStoryIllustrationVariant(story: AppleRejectionStory, allStories: AppleRejectionStory[]): number {
  const primaryTag = story.tags[0]
  const siblings = allStories.filter((entry) => entry.tags[0] === primaryTag)
  const index = siblings.findIndex((entry) => entry.id === story.id)
  return index >= 0 ? index : 0
}

export function getStoryPrimaryIllustrationTag(story: AppleRejectionStory): AppleRejectionStoryTag {
  return story.tags[0]
}

export function storyIllustrationAlt(story: AppleRejectionStory): string {
  return `Abstract illustration for an App Store rejection about ${story.guidelineLabel}`
}

export const illustrationAssetPath = (tag: AppleRejectionStoryTag, variant: number) =>
  `/apple-rejection-stories/illustrations/${tag}-${variant}.svg`
