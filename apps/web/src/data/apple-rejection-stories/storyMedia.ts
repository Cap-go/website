/**
 * Redacted source screenshots (WebP) keyed by story id.
 * Populate entries when assets land; cards fall back to SVG illustrations until then.
 */
export type AppleRejectionStoryMedia = {
  /** Path under site root, e.g. /apple-rejection-stories/screenshots/story-id.webp */
  src: string
  alt: string
  width: number
  height: number
}

export const appleRejectionStoryMedia: Partial<Record<string, AppleRejectionStoryMedia>> = {}

export function getAppleRejectionStoryMedia(storyId: string): AppleRejectionStoryMedia | undefined {
  return appleRejectionStoryMedia[storyId]
}
