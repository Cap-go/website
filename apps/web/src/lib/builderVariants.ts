// Xcode / macOS combinations iOS builds can be pinned to (`capgo build request --xcode-version`),
// read from the builder's GET /variants/public and cached by the website worker for a day.
export const BUILDER_VARIANTS_PATH = '/builder-variants.json'
export const BUILDER_VARIANTS_CACHE_TTL_SECONDS = 24 * 60 * 60

export type BuilderVariant = {
  id: string
  xcode_version: string
  macos_version: string | null
  backend: 'mac' | 'linux'
  default: boolean
}

export type BuilderVariants = {
  default_xcode_major: string | null
  variants: BuilderVariant[]
}

// Same version shape the CLI accepts for --xcode-version.
const MACHINE_VERSION_RE = /^\d{1,3}(?:\.\d{1,3}){0,2}$/

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function normalizeVariant(value: unknown): BuilderVariant | null {
  if (!isRecord(value) || typeof value.id !== 'string' || !value.id) return null
  if (typeof value.xcodeVersion !== 'string' || !MACHINE_VERSION_RE.test(value.xcodeVersion)) return null
  if (value.backend !== 'mac' && value.backend !== 'linux') return null
  const macos = typeof value.macosVersion === 'string' && MACHINE_VERSION_RE.test(value.macosVersion) ? value.macosVersion : null
  return { id: value.id, xcode_version: value.xcodeVersion, macos_version: macos, backend: value.backend, default: value.default === true }
}

/** Builder GET /variants/public body -> the public snake_case shape, or null when it is not one. */
export function normalizeBuilderVariants(value: unknown): BuilderVariants | null {
  if (!isRecord(value) || !Array.isArray(value.variants)) return null
  const major = typeof value.defaultXcodeMajor === 'string' && /^\d{1,3}$/.test(value.defaultXcodeMajor) ? value.defaultXcodeMajor : null
  const variants = value.variants.map(normalizeVariant).filter((item): item is BuilderVariant => item !== null)
  return { default_xcode_major: major, variants }
}

/** Distinct Xcode versions, in the builder's order (newest first). */
export function availableXcodeVersions(variants: BuilderVariant[]): string[] {
  return [...new Set(variants.map((variant) => variant.xcode_version))]
}
