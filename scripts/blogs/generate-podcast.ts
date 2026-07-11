import { globSync } from 'glob'
import matter from 'gray-matter'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { isAbsolute, relative, resolve, sep } from 'node:path'

const PROJECT_ROOT = process.cwd()
const BLOG_DIRECTORY = resolve(PROJECT_ROOT, 'apps/web/src/content/blog/en')
const MANIFEST_PATH = resolve(PROJECT_ROOT, 'apps/web/src/data/podcastEpisodes.json')
const DEFAULT_API_BASE_URL = 'https://api.autocontentapi.com'
const DEFAULT_SITE_URL = 'https://capgo.app'
const DEFAULT_LIMIT = 1
const COMPLETED_STATUS = 100
const DEFAULT_POLL_INTERVAL_MS = 10_000
const DEFAULT_POLL_TIMEOUT_MS = 20 * 60 * 1000

type Environment = Record<string, string | undefined>

export interface BlogPost {
  content: string
  createdAt: string
  description?: string
  filePath: string
  slug: string
  sourceArticleUrl: string
  title: string
}

export interface PodcastEpisode {
  audioMimeType?: string
  description: string
  durationSeconds?: number
  episodeGuid?: string
  fileSize?: number
  generatedAt: string
  providerAudioUrl?: string
  providerEpisodeId: string | number
  requestId?: string
  slug: string
  sourceArticleUrl: string
  title: string
}

export interface PodcastManifest {
  episodes: PodcastEpisode[]
  version: 1
}

export interface PodcastConfiguration {
  apiBaseUrl: string
  apiKey: string
  podcastShowId: string
  pollIntervalMs: number
  pollTimeoutMs: number
  siteUrl: string
  voice1: number
  voice2: number
}

export interface PodcastGenerationOptions {
  backfill: boolean
  changedFilesPath?: string
  dryRun: boolean
  limit: number
  slug?: string
}

export interface DailyUsage {
  allowedDailyPodcasts?: number
  usedDailyPodcasts?: number
}

export interface PodcastStatus {
  audio_duration?: number
  audio_url?: string
  error_code?: number
  error_message?: string
  file_size?: number
  status?: number | string
}

export interface CreatePodcastInput {
  callbackData: string
  content: string
  instructions: string
  voice1: number
  voice2: number
}

export interface AttachEpisodeInput {
  description: string
  requestId: string
  title: string
}

export interface AutoContentClient {
  attachEpisode(input: AttachEpisodeInput): Promise<{ episodeId: string | number }>
  createPodcast(input: CreatePodcastInput): Promise<{ requestId: string }>
  getUsage(): Promise<DailyUsage>
  getStatus(requestId: string): Promise<PodcastStatus>
  listShowEpisodes(): Promise<unknown>
}

export interface PublishCandidatesResult {
  deferredCount: number
  manifest: PodcastManifest
  manifestChanged: boolean
  publishedCount: number
  reconciledCount: number
}

const sleep = (milliseconds: number) => new Promise<void>((resolveSleep) => setTimeout(resolveSleep, milliseconds))

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function asString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined
}

function asNumber(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) return parsed
  }
  return undefined
}

function parsePositiveInteger(value: string | undefined, name: string, fallback?: number): number {
  if (!value && fallback !== undefined) return fallback
  const parsed = Number.parseInt(value ?? '', 10)
  if (!Number.isInteger(parsed) || parsed < 1) throw new Error(`${name} must be a positive integer.`)
  return parsed
}

function normalizeSiteUrl(siteUrl: string): string {
  return new URL(siteUrl).toString()
}

function sourceArticleUrl(siteUrl: string, slug: string): string {
  return new URL(`blog/${encodeURIComponent(slug)}/`, normalizeSiteUrl(siteUrl)).toString()
}

function isInsideDirectory(directory: string, candidate: string): boolean {
  const pathRelative = relative(directory, candidate)
  return pathRelative !== '' && !pathRelative.startsWith(`..${sep}`) && pathRelative !== '..' && !isAbsolute(pathRelative)
}

function parseDate(value: unknown): string {
  const date = value instanceof Date ? value : new Date(typeof value === 'string' ? value : 0)
  return Number.isNaN(date.getTime()) ? new Date(0).toISOString() : date.toISOString()
}

function parseOptionalDate(value: unknown): string | undefined {
  if (typeof value !== 'string' || !value.trim()) return undefined

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString()
}

export function buildPodcastEpisodeGuid(slug: string, providerEpisodeId: string | number): string {
  return 'capgo-blog-podcast:' + slug + ':' + providerEpisodeId
}

function readBlogPost(filePath: string, siteUrl: string): BlogPost | undefined {
  const parsed = matter(readFileSync(filePath, 'utf8'))
  const frontmatter = parsed.data as Record<string, unknown>
  const slug = asString(frontmatter.slug)
  const title = asString(frontmatter.title)
  const locale = asString(frontmatter.locale)

  if (frontmatter.published === false || (locale !== undefined && locale !== 'en')) return undefined
  if (!slug || !title || !parsed.content.trim()) return undefined

  return {
    content: parsed.content.trim(),
    createdAt: parseDate(frontmatter.created_at),
    description: asString(frontmatter.description),
    filePath,
    slug,
    sourceArticleUrl: sourceArticleUrl(siteUrl, slug),
    title,
  }
}

function sortPosts(posts: BlogPost[]): BlogPost[] {
  return posts.toSorted((left, right) => left.createdAt.localeCompare(right.createdAt) || left.slug.localeCompare(right.slug))
}

function allBlogFiles(): string[] {
  return globSync('**/*.md', { absolute: true, cwd: BLOG_DIRECTORY, nodir: true })
}

function changedBlogFiles(changedFilesPath: string): string[] {
  const rawPaths = readFileSync(changedFilesPath, 'utf8')
    .split(/\r?\n/)
    .map((value) => value.trim())
    .filter(Boolean)

  return rawPaths.flatMap((rawPath) => {
    const filePath = resolve(PROJECT_ROOT, rawPath)
    if (!filePath.endsWith('.md') || !isInsideDirectory(BLOG_DIRECTORY, filePath) || !existsSync(filePath)) return []
    return [filePath]
  })
}

export function readPodcastManifest(manifestPath = MANIFEST_PATH): PodcastManifest {
  if (!existsSync(manifestPath)) return { episodes: [], version: 1 }

  const parsed = JSON.parse(readFileSync(manifestPath, 'utf8')) as Partial<PodcastManifest>
  if (parsed.version !== 1 || !Array.isArray(parsed.episodes)) throw new Error(`Invalid podcast manifest: ${manifestPath}`)

  return {
    episodes: parsed.episodes.filter((episode): episode is PodcastEpisode => isRecord(episode) && typeof episode.slug === 'string'),
    version: 1,
  }
}

export function writePodcastManifest(manifest: PodcastManifest, manifestPath = MANIFEST_PATH): void {
  const sortedManifest: PodcastManifest = {
    episodes: manifest.episodes.toSorted((left, right) => left.slug.localeCompare(right.slug)),
    version: 1,
  }
  writeFileSync(manifestPath, `${JSON.stringify(sortedManifest, null, 2)}\n`, 'utf8')
}

export function getEligibleBlogPosts(options: PodcastGenerationOptions, manifest: PodcastManifest, siteUrl = DEFAULT_SITE_URL): BlogPost[] {
  if (!options.backfill && !options.changedFilesPath && !options.slug) {
    throw new Error('Pass --backfill, --changed-files <path>, or --slug <slug>.')
  }

  const files = options.changedFilesPath ? changedBlogFiles(options.changedFilesPath) : allBlogFiles()
  const posts = sortPosts(
    files.flatMap((filePath) => {
      const post = readBlogPost(filePath, siteUrl)
      return post ? [post] : []
    }),
  )
  const scopedPosts = options.slug ? posts.filter((post) => post.slug === options.slug) : posts
  const publishedSlugs = new Set(manifest.episodes.map((episode) => episode.slug))

  return scopedPosts.filter((post) => !publishedSlugs.has(post.slug)).slice(0, options.limit)
}

export function buildEpisodeDescription(post: BlogPost): string {
  const summary = post.description || `A two-host conversation about ${post.title}.`
  return `${summary}\n\nRead the full article: ${post.sourceArticleUrl}`
}

function buildPodcastInstructions(post: BlogPost): string {
  return [
    'Create a natural, useful two-host conversation in English.',
    'Base every claim on the supplied article only; do not invent facts, features, prices, or customer stories.',
    'Explain the practical implications and trade-offs rather than reading the article aloud.',
    `End with a brief invitation to read the full article at ${post.sourceArticleUrl}.`,
  ].join(' ')
}

function buildPodcastSource(post: BlogPost): string {
  return `Article title: ${post.title}\nArticle URL: ${post.sourceArticleUrl}\n\n${post.content}`
}

export function readPodcastConfiguration(environment: Environment = process.env): PodcastConfiguration {
  const required = (name: string) => {
    const value = environment[name]?.trim()
    if (!value) throw new Error(`${name} is required to generate a podcast.`)
    return value
  }

  return {
    apiBaseUrl: (environment.AUTOCONTENT_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/$/, ''),
    apiKey: required('AUTOCONTENT_API_KEY'),
    podcastShowId: required('AUTOCONTENT_PODCAST_SHOW_ID'),
    pollIntervalMs: parsePositiveInteger(environment.PODCAST_POLL_INTERVAL_MS, 'PODCAST_POLL_INTERVAL_MS', DEFAULT_POLL_INTERVAL_MS),
    pollTimeoutMs: parsePositiveInteger(environment.PODCAST_POLL_TIMEOUT_MS, 'PODCAST_POLL_TIMEOUT_MS', DEFAULT_POLL_TIMEOUT_MS),
    siteUrl: normalizeSiteUrl(environment.PODCAST_SITE_URL || DEFAULT_SITE_URL),
    voice1: parsePositiveInteger(required('AUTOCONTENT_PODCAST_VOICE_1'), 'AUTOCONTENT_PODCAST_VOICE_1'),
    voice2: parsePositiveInteger(required('AUTOCONTENT_PODCAST_VOICE_2'), 'AUTOCONTENT_PODCAST_VOICE_2'),
  }
}

export class HttpAutoContentClient implements AutoContentClient {
  readonly #configuration: PodcastConfiguration
  readonly #fetch: typeof fetch

  constructor(configuration: PodcastConfiguration, fetchImplementation: typeof fetch = fetch) {
    this.#configuration = configuration
    this.#fetch = fetchImplementation
  }

  async getUsage(): Promise<DailyUsage> {
    return this.request('GET', '/content/Usage')
  }

  async listShowEpisodes(): Promise<unknown> {
    return this.request('GET', `/podcast/shows/${encodeURIComponent(this.#configuration.podcastShowId)}/episodes`)
  }

  async createPodcast(input: CreatePodcastInput): Promise<{ requestId: string }> {
    const response = await this.request<Record<string, unknown>>('POST', '/content/CreatePodcastCustomVoices', {
      callbackData: input.callbackData,
      duration: 'default',
      language: 'English',
      resources: [{ content: input.content, type: 'text' }],
      style: 'deep dive',
      text: input.instructions,
      voice1: input.voice1,
      voice2: input.voice2,
    })
    const requestId = asString(response.request_id) || asString(response.requestId)
    if (!requestId) throw new Error('AutoContent accepted the podcast request without returning request_id.')
    return { requestId }
  }

  async getStatus(requestId: string): Promise<PodcastStatus> {
    return this.request('GET', `/content/Status/${encodeURIComponent(requestId)}`)
  }

  async attachEpisode(input: AttachEpisodeInput): Promise<{ episodeId: string | number }> {
    const response = await this.request<Record<string, unknown>>('POST', `/podcast/shows/${encodeURIComponent(this.#configuration.podcastShowId)}/episodes`, input)
    const episodeId = response.episodeId ?? response.episode_id
    if ((typeof episodeId !== 'string' && typeof episodeId !== 'number') || !response.success) {
      throw new Error('AutoContent did not confirm that the podcast episode was attached to the show.')
    }
    return { episodeId }
  }

  async request<T>(method: 'GET' | 'POST', path: string, body?: unknown): Promise<T> {
    const response = await this.#fetch(`${this.#configuration.apiBaseUrl}${path}`, {
      body: body === undefined ? undefined : JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.#configuration.apiKey}`,
        ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
      },
      method,
    })
    const responseText = await response.text()
    let payload: unknown = {}

    if (responseText) {
      try {
        payload = JSON.parse(responseText)
      } catch {
        payload = responseText
      }
    }

    if (!response.ok) {
      const message = isRecord(payload) ? asString(payload.message) || asString(payload.error) : undefined
      throw new Error(`AutoContent ${method} ${path} failed (${response.status})${message ? `: ${message}` : ''}`)
    }

    return payload as T
  }
}

function episodeRecords(payload: unknown): Array<Record<string, unknown>> {
  if (Array.isArray(payload)) return payload.filter(isRecord)
  if (!isRecord(payload)) return []

  for (const key of ['episodes', 'items', 'data']) {
    if (Array.isArray(payload[key])) return payload[key].filter(isRecord)
  }

  return []
}

export function findProviderEpisodeByArticle(payload: unknown, sourceArticleUrl: string): Record<string, unknown> | undefined {
  const alternateUrl = sourceArticleUrl.replace(/\/$/, '')
  return episodeRecords(payload).find((episode) =>
    [episode.description, episode.sourceArticleUrl, episode.source_article_url].some(
      (value) => typeof value === 'string' && (value.includes(sourceArticleUrl) || value.includes(alternateUrl)),
    ),
  )
}

function episodeFromProvider(post: BlogPost, providerEpisode: Record<string, unknown>): PodcastEpisode | undefined {
  const providerEpisodeId = providerEpisode.episodeId ?? providerEpisode.episode_id ?? providerEpisode.id
  if (typeof providerEpisodeId !== 'string' && typeof providerEpisodeId !== 'number') return undefined

  const providerDate =
    parseOptionalDate(providerEpisode.generatedAt) ||
    parseOptionalDate(providerEpisode.generated_at) ||
    parseOptionalDate(providerEpisode.publishedAt) ||
    parseOptionalDate(providerEpisode.published_at) ||
    parseOptionalDate(providerEpisode.createdAt) ||
    parseOptionalDate(providerEpisode.created_at)

  return {
    audioMimeType: asString(providerEpisode.audioMimeType) || asString(providerEpisode.audio_mime_type) || 'audio/mpeg',
    description: asString(providerEpisode.description) || buildEpisodeDescription(post),
    durationSeconds: asNumber(providerEpisode.audioDuration ?? providerEpisode.audio_duration),
    episodeGuid: buildPodcastEpisodeGuid(post.slug, providerEpisodeId),
    fileSize: asNumber(providerEpisode.fileSize ?? providerEpisode.file_size),
    generatedAt: providerDate || new Date().toISOString(),
    providerAudioUrl: asString(providerEpisode.audioUrl) || asString(providerEpisode.audio_url),
    providerEpisodeId,
    requestId: asString(providerEpisode.requestId) || asString(providerEpisode.request_id),
    slug: post.slug,
    sourceArticleUrl: post.sourceArticleUrl,
    title: asString(providerEpisode.title) || 'Capgo podcast: ' + post.title,
  }
}

function dailyCapacity(usage: DailyUsage, requestedLimit: number): number {
  const allowed = asNumber(usage.allowedDailyPodcasts)
  const used = asNumber(usage.usedDailyPodcasts)
  if (allowed === undefined || used === undefined) return requestedLimit
  return Math.max(0, Math.min(requestedLimit, allowed - used))
}

async function waitForPodcastCompletion(
  client: Pick<AutoContentClient, 'getStatus'>,
  requestId: string,
  pollIntervalMs: number,
  pollTimeoutMs: number,
  sleepImplementation: (milliseconds: number) => Promise<void>,
): Promise<PodcastStatus> {
  const attempts = Math.ceil(pollTimeoutMs / pollIntervalMs) + 1

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const status = await client.getStatus(requestId)
    const errorCode = asNumber(status.error_code)
    const state = status.status

    if (errorCode && errorCode !== 0) throw new Error(status.error_message || `AutoContent failed request ${requestId} with error code ${errorCode}.`)
    if (typeof state === 'string' && /failed|error/i.test(state)) throw new Error(status.error_message || `AutoContent failed request ${requestId}.`)
    if (state === COMPLETED_STATUS) {
      if (!status.audio_url) throw new Error(`AutoContent completed request ${requestId} without audio_url.`)
      return status
    }

    if (attempt < attempts - 1) await sleepImplementation(pollIntervalMs)
  }

  throw new Error(`Timed out waiting for AutoContent request ${requestId}. It will be retried by the next scheduled run.`)
}

export async function publishCandidates(
  candidates: BlogPost[],
  manifest: PodcastManifest,
  configuration: PodcastConfiguration,
  client: AutoContentClient,
  sleepImplementation: (milliseconds: number) => Promise<void> = sleep,
): Promise<PublishCandidatesResult> {
  if (candidates.length === 0) {
    return { deferredCount: 0, manifest, manifestChanged: false, publishedCount: 0, reconciledCount: 0 }
  }

  const providerEpisodes = await client.listShowEpisodes()
  const reconciledEpisodes: PodcastEpisode[] = []
  const missingCandidates: BlogPost[] = []

  for (const candidate of candidates) {
    const providerEpisode = findProviderEpisodeByArticle(providerEpisodes, candidate.sourceArticleUrl)
    const recoveredEpisode = providerEpisode && episodeFromProvider(candidate, providerEpisode)
    if (recoveredEpisode) reconciledEpisodes.push(recoveredEpisode)
    else missingCandidates.push(candidate)
  }

  const capacity = dailyCapacity(await client.getUsage(), missingCandidates.length)
  const candidatesToPublish = missingCandidates.slice(0, capacity)
  const publishedEpisodes: PodcastEpisode[] = []

  for (const candidate of candidatesToPublish) {
    const description = buildEpisodeDescription(candidate)
    const { requestId } = await client.createPodcast({
      callbackData: `blog:${candidate.slug}`,
      content: buildPodcastSource(candidate),
      instructions: buildPodcastInstructions(candidate),
      voice1: configuration.voice1,
      voice2: configuration.voice2,
    })
    const completed = await waitForPodcastCompletion(client, requestId, configuration.pollIntervalMs, configuration.pollTimeoutMs, sleepImplementation)
    const { episodeId } = await client.attachEpisode({
      description,
      requestId,
      title: `Capgo podcast: ${candidate.title}`,
    })

    publishedEpisodes.push({
      audioMimeType: 'audio/mpeg',
      description,
      durationSeconds: asNumber(completed.audio_duration),
      episodeGuid: buildPodcastEpisodeGuid(candidate.slug, episodeId),
      fileSize: asNumber(completed.file_size),
      generatedAt: new Date().toISOString(),
      providerAudioUrl: completed.audio_url,
      providerEpisodeId: episodeId,
      requestId,
      slug: candidate.slug,
      sourceArticleUrl: candidate.sourceArticleUrl,
      title: 'Capgo podcast: ' + candidate.title,
    })
  }

  const episodes = [...manifest.episodes, ...reconciledEpisodes, ...publishedEpisodes]
  return {
    deferredCount: missingCandidates.length - candidatesToPublish.length,
    manifest: { episodes, version: 1 },
    manifestChanged: reconciledEpisodes.length > 0 || publishedEpisodes.length > 0,
    publishedCount: publishedEpisodes.length,
    reconciledCount: reconciledEpisodes.length,
  }
}

function parseArguments(args: string[]): PodcastGenerationOptions {
  const options: PodcastGenerationOptions = { backfill: false, dryRun: false, limit: DEFAULT_LIMIT }

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index]
    const value = argument.includes('=') ? argument.slice(argument.indexOf('=') + 1) : args[index + 1]

    if (argument === '--backfill') options.backfill = true
    else if (argument === '--dry-run') options.dryRun = true
    else if (argument === '--slug' || argument.startsWith('--slug=')) {
      if (!value) throw new Error('--slug requires a value.')
      options.slug = value
      if (argument === '--slug') index += 1
    } else if (argument === '--changed-files' || argument.startsWith('--changed-files=')) {
      if (!value) throw new Error('--changed-files requires a value.')
      options.changedFilesPath = resolve(PROJECT_ROOT, value)
      if (argument === '--changed-files') index += 1
    } else if (argument === '--limit' || argument.startsWith('--limit=')) {
      options.limit = parsePositiveInteger(value, '--limit')
      if (argument === '--limit') index += 1
    } else if (argument === '--help' || argument === '-h') {
      console.log('Usage: bun run blogs:generate_podcast -- --backfill|--changed-files <path>|--slug <slug> [--limit <count>] [--dry-run]')
      process.exit(0)
    } else throw new Error(`Unknown argument: ${argument}`)
  }

  return options
}

function writeGithubOutputs(result: Pick<PublishCandidatesResult, 'manifestChanged' | 'publishedCount'>): void {
  if (!process.env.GITHUB_OUTPUT) return
  writeFileSync(process.env.GITHUB_OUTPUT, `generated_count=${result.publishedCount}\nmanifest_changed=${result.manifestChanged}\n`, { encoding: 'utf8', flag: 'a' })
}

export async function runPodcastGeneration(options: PodcastGenerationOptions, environment: Environment = process.env): Promise<PublishCandidatesResult> {
  const siteUrl = environment.PODCAST_SITE_URL || DEFAULT_SITE_URL
  const manifest = readPodcastManifest()
  const candidates = getEligibleBlogPosts(options, manifest, siteUrl)

  if (options.dryRun) {
    console.log(candidates.map((candidate) => candidate.slug).join('\n'))
    return { deferredCount: 0, manifest, manifestChanged: false, publishedCount: 0, reconciledCount: 0 }
  }

  if (candidates.length === 0) {
    const result = { deferredCount: 0, manifest, manifestChanged: false, publishedCount: 0, reconciledCount: 0 }
    writeGithubOutputs(result)
    console.log('No eligible blog posts need a podcast episode.')
    return result
  }

  const configuration = readPodcastConfiguration(environment)
  const result = await publishCandidates(candidates, manifest, configuration, new HttpAutoContentClient(configuration))
  if (result.manifestChanged) writePodcastManifest(result.manifest)
  writeGithubOutputs(result)

  console.log('Published ' + result.publishedCount + ' podcast episode(s); reconciled ' + result.reconciledCount + '; deferred ' + result.deferredCount + '.')
  console.log('Website RSS feed: ' + new URL('podcast.xml', configuration.siteUrl).toString())
  return result
}

if (import.meta.main) {
  runPodcastGeneration(parseArguments(process.argv.slice(2))).catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
  })
}
