// Xcode versions iOS builds can be pinned to (`capgo build request --xcode-version`), read from the
// builder's GET /variants/public and cached by the website worker for a day.
export const BUILDER_VARIANTS_PATH = '/builder-variants.json'
export const BUILDER_VARIANTS_CACHE_TTL_SECONDS = 24 * 60 * 60

export type BuilderVariants = {
  default_xcode_major: string | null
  /** Distinct Xcode versions, newest first. */
  xcode_versions: string[]
}

// Same version shape the CLI accepts for --xcode-version.
const MACHINE_VERSION_RE = /^\d{1,3}(?:\.\d{1,3}){0,2}$/

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function toVariants(major: unknown, versions: unknown): BuilderVariants | null {
  if (!Array.isArray(versions)) return null
  const xcode_versions = [...new Set(versions.filter((version): version is string => typeof version === 'string' && MACHINE_VERSION_RE.test(version)))]
  return { default_xcode_major: typeof major === 'string' && /^\d{1,3}$/.test(major) ? major : null, xcode_versions }
}

/** Builder GET /variants/public body -> the public snake_case shape, or null when it is not one. */
export function normalizeBuilderVariants(value: unknown): BuilderVariants | null {
  return isRecord(value) ? toVariants(value.defaultXcodeMajor, value.xcodeVersions) : null
}

/** Reads the website's own /builder-variants.json (already snake_case) on the page. */
export function readBuilderVariants(value: unknown): BuilderVariants | null {
  return isRecord(value) ? toVariants(value.default_xcode_major, value.xcode_versions) : null
}
