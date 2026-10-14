import storyMediaManifest from './storyMediaManifest.json'

/**
 * Redacted source screenshots (WebP) keyed by story id.
 * Null entries in the manifest use SVG fallback illustrations on cards.
 * WebP files live under apps/web/public/apple-rejection-stories/screenshots/
 */
export type AppleRejectionStoryMedia = {
  /** Path under site root, e.g. /apple-rejection-stories/screenshots/story-id.webp */
  src: string
  alt: string
  width: number
  height: number
}

type StoryMediaManifest = Record<string, AppleRejectionStoryMedia | null>

function buildStoryMediaMap(manifest: StoryMediaManifest): Partial<Record<string, AppleRejectionStoryMedia>> {
  const entries: [string, AppleRejectionStoryMedia][] = []
  for (const [storyId, media] of Object.entries(manifest)) {
    if (media !== null) {
      entries.push([storyId, media])
    }
  }
  return Object.fromEntries(entries)
}

export const appleRejectionStoryMedia = buildStoryMediaMap(storyMediaManifest as StoryMediaManifest)

export function getAppleRejectionStoryMedia(storyId: string): AppleRejectionStoryMedia | undefined {
  return appleRejectionStoryMedia[storyId]
}
