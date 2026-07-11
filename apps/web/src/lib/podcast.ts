import type { RSSOptions } from '@astrojs/rss'
import manifestJson from '../data/podcastEpisodes.json'

export const podcastFeedPath = '/podcast.xml'
export const podcastName = 'Capgo Podcast'
export const podcastDescription = 'Practical conversations for teams building and shipping Capacitor applications.'
export const podcastLanguage = 'en'
export const podcastCategory = 'Technology'
export const podcastAuthor = 'Capgo'
export const podcastEmail = 'support@capgo.app'
export const podcastCoverPath = '/capgo-podcast.png'

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

export interface PlayablePodcastEpisode extends PodcastEpisode {
  providerAudioUrl: string
}

export interface FeedPodcastEpisode extends PlayablePodcastEpisode {
  fileSize: number
}

export interface PodcastManifest {
  episodes: PodcastEpisode[]
  version: 1
}

export interface PodcastStructuredData {
  audio: Record<string, unknown>
  audioId: string
  episode: Record<string, unknown>
}

const podcastManifest = manifestJson as unknown as PodcastManifest

function hasHttpsUrl(value: unknown): value is string {
  if (typeof value !== 'string' || !value.trim()) return false

  try {
    return new URL(value).protocol === 'https:'
  } catch {
    return false
  }
}

function hasPositiveNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0
}

function hasPositiveInteger(value: unknown): value is number {
  return hasPositiveNumber(value) && Number.isInteger(value)
}

function hasValidDate(value: unknown): value is string {
  return typeof value === 'string' && !Number.isNaN(new Date(value).getTime())
}

function normalizedSiteUrl(siteUrl: string): string {
  return new URL(siteUrl).toString()
}

function escapeXml(value: string): string {
  const escapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;',
  }
  return value.replace(/[&<>"']/g, (character) => escapes[character] || character)
}

export function getPodcastEpisodes(): PodcastEpisode[] {
  return Array.isArray(podcastManifest.episodes) ? podcastManifest.episodes : []
}

export function isPlayablePodcastEpisode(episode: PodcastEpisode): episode is PlayablePodcastEpisode {
  return hasHttpsUrl(episode.providerAudioUrl) && hasValidDate(episode.generatedAt)
}

export function isPodcastFeedEpisode(episode: PodcastEpisode): episode is FeedPodcastEpisode {
  return isPlayablePodcastEpisode(episode) && hasPositiveInteger(episode.fileSize) && hasHttpsUrl(episode.sourceArticleUrl)
}

export function getPodcastEpisodeForSlug(slug: string, episodes: readonly PodcastEpisode[] = getPodcastEpisodes()): PlayablePodcastEpisode | undefined {
  return episodes.find((episode): episode is PlayablePodcastEpisode => episode.slug === slug && isPlayablePodcastEpisode(episode))
}

export function getPodcastFeedEpisodes(episodes: readonly PodcastEpisode[] = getPodcastEpisodes()): FeedPodcastEpisode[] {
  return episodes
    .filter(isPodcastFeedEpisode)
    .toSorted((left, right) => new Date(right.generatedAt).getTime() - new Date(left.generatedAt).getTime() || left.slug.localeCompare(right.slug))
}

export function getPodcastFeedUrl(siteUrl: string): string {
  return new URL(podcastFeedPath, normalizedSiteUrl(siteUrl)).toString()
}

export function getPodcastCoverUrl(siteUrl: string): string {
  return new URL(podcastCoverPath, normalizedSiteUrl(siteUrl)).toString()
}

export function getPodcastAudioMimeType(episode: PodcastEpisode): string {
  return episode.audioMimeType || 'audio/mpeg'
}

export function getPodcastEpisodeGuid(episode: PodcastEpisode): string {
  return episode.episodeGuid || 'capgo-blog-podcast:' + episode.slug + ':' + String(episode.providerEpisodeId)
}

export function getPodcastEpisodeSummary(episode: PodcastEpisode): string {
  const sourceLink = 'Read the full article: ' + episode.sourceArticleUrl
  const suffix = '\n\n' + sourceLink
  const summary = episode.description.endsWith(suffix) ? episode.description.slice(0, -suffix.length).trim() : episode.description.trim()

  return summary || episode.title
}

export function formatPodcastDuration(seconds: number | undefined): string | undefined {
  if (!hasPositiveNumber(seconds)) return undefined

  const totalSeconds = Math.round(seconds)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const remainingSeconds = totalSeconds % 60

  return [hours, minutes, remainingSeconds].map((part) => String(part).padStart(2, '0')).join(':')
}

export function formatPodcastDurationLabel(seconds: number | undefined): string | undefined {
  if (!hasPositiveNumber(seconds)) return undefined

  const totalSeconds = Math.round(seconds)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)

  if (hours) return hours + ' hr ' + minutes + ' min'
  if (minutes) return minutes + ' min'
  return totalSeconds + ' sec'
}

export function toIso8601Duration(seconds: number | undefined): string | undefined {
  if (!hasPositiveNumber(seconds)) return undefined

  const totalSeconds = Math.round(seconds)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const remainingSeconds = totalSeconds % 60
  const parts = []

  if (hours) parts.push(hours + 'H')
  if (minutes) parts.push(minutes + 'M')
  if (remainingSeconds || parts.length === 0) parts.push(remainingSeconds + 'S')

  return 'PT' + parts.join('')
}
export function createPodcastStructuredData(input: { articleUrl: string; episode: PlayablePodcastEpisode; imageUrl?: string; siteUrl: string }): PodcastStructuredData {
  const audioId = input.articleUrl + '#podcast-audio'
  const episodeId = input.articleUrl + '#podcast-episode'
  const feedUrl = getPodcastFeedUrl(input.siteUrl)
  const duration = toIso8601Duration(input.episode.durationSeconds)
  const contentSize = hasPositiveInteger(input.episode.fileSize) ? String(input.episode.fileSize) + ' B' : undefined

  const audio: Record<string, unknown> = {
    '@type': 'AudioObject',
    '@id': audioId,
    associatedArticle: { '@id': input.episode.sourceArticleUrl + '#newsarticle' },
    contentUrl: input.episode.providerAudioUrl,
    encodingFormat: getPodcastAudioMimeType(input.episode),
    uploadDate: input.episode.generatedAt,
  }

  if (duration) audio.duration = duration
  if (contentSize) audio.contentSize = contentSize

  const episode: Record<string, unknown> = {
    '@type': 'PodcastEpisode',
    '@id': episodeId,
    associatedMedia: { '@id': audioId },
    datePublished: input.episode.generatedAt,
    description: getPodcastEpisodeSummary(input.episode),
    inLanguage: podcastLanguage,
    isBasedOn: { '@id': input.episode.sourceArticleUrl + '#newsarticle' },
    name: input.episode.title,
    partOfSeries: {
      '@type': 'PodcastSeries',
      '@id': feedUrl + '#podcast-series',
      name: podcastName,
      url: feedUrl,
      webFeed: feedUrl,
    },
    url: input.articleUrl + '#podcast',
  }

  if (input.imageUrl) episode.image = input.imageUrl

  return { audio, audioId, episode }
}

export function createPodcastRssOptions(siteUrl: string, episodes: readonly PodcastEpisode[] = getPodcastEpisodes()): RSSOptions {
  const feedUrl = getPodcastFeedUrl(siteUrl)
  const coverUrl = getPodcastCoverUrl(siteUrl)
  const feedEpisodes = getPodcastFeedEpisodes(episodes)
  const channelData = [
    '<atom:link href="' + escapeXml(feedUrl) + '" rel="self" type="application/rss+xml" />',
    '<language>' + podcastLanguage + '</language>',
    '<image><url>' + escapeXml(coverUrl) + '</url><title>' + podcastName + '</title><link>' + escapeXml(normalizedSiteUrl(siteUrl)) + '</link></image>',
    '<itunes:author>' + podcastAuthor + '</itunes:author>',
    '<itunes:summary>' + escapeXml(podcastDescription) + '</itunes:summary>',
    '<itunes:explicit>false</itunes:explicit>',
    '<itunes:owner><itunes:name>' + podcastAuthor + '</itunes:name><itunes:email>' + podcastEmail + '</itunes:email></itunes:owner>',
    '<itunes:category text="' + podcastCategory + '" />',
    '<itunes:image href="' + escapeXml(coverUrl) + '" />',
  ].join('')

  return {
    customData: channelData,
    description: podcastDescription,
    items: feedEpisodes.map((episode) => {
      const duration = formatPodcastDuration(episode.durationSeconds)
      const itemData = [
        '<guid isPermaLink="false">' + escapeXml(getPodcastEpisodeGuid(episode)) + '</guid>',
        '<itunes:episodeType>full</itunes:episodeType>',
        '<itunes:explicit>false</itunes:explicit>',
        '<itunes:image href="' + escapeXml(coverUrl) + '" />',
      ]
      if (duration) itemData.push('<itunes:duration>' + duration + '</itunes:duration>')

      return {
        categories: [podcastCategory],
        customData: itemData.join(''),
        description: episode.description,
        enclosure: {
          length: episode.fileSize,
          type: getPodcastAudioMimeType(episode),
          url: episode.providerAudioUrl,
        },
        link: episode.sourceArticleUrl,
        pubDate: new Date(episode.generatedAt),
        title: episode.title,
      }
    }),
    site: normalizedSiteUrl(siteUrl),
    title: podcastName,
    trailingSlash: true,
    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
      itunes: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
    },
  }
}
