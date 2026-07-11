import { describe, expect, test } from 'bun:test'
import {
  buildEpisodeDescription,
  findProviderEpisodeByArticle,
  HttpAutoContentClient,
  publishCandidates,
  type AutoContentClient,
  type BlogPost,
  type PodcastConfiguration,
  type PodcastManifest,
} from './generate-podcast'

const post: BlogPost = {
  content: 'Capgo lets teams publish live updates for Capacitor applications.',
  createdAt: '2026-07-11T00:00:00.000Z',
  description: 'How Capgo makes live updates safer.',
  filePath: '/tmp/capgo-live-updates.md',
  slug: 'capgo-live-updates',
  sourceArticleUrl: 'https://capgo.app/blog/capgo-live-updates/',
  title: 'Capgo Live Updates',
}

const configuration: PodcastConfiguration = {
  apiBaseUrl: 'https://api.autocontentapi.com',
  apiKey: 'test-key',
  podcastShowId: 'show-1',
  pollIntervalMs: 1,
  pollTimeoutMs: 1,
  siteUrl: 'https://capgo.app/',
  voice1: 12,
  voice2: 34,
}

describe('blog podcast generation', () => {
  test('always includes the canonical source article in the provider description', () => {
    expect(buildEpisodeDescription(post)).toBe('How Capgo makes live updates safer.\n\nRead the full article: https://capgo.app/blog/capgo-live-updates/')
  })

  test('recognizes an already attached provider episode by its source article', () => {
    const episode = findProviderEpisodeByArticle([{ description: 'Read the full article: https://capgo.app/blog/capgo-live-updates/', episodeId: 42 }], post.sourceArticleUrl)

    expect(episode?.episodeId).toBe(42)
  })

  test('sends numeric voice IDs and article text to the documented AutoContent endpoint', async () => {
    const requests: Array<{ body?: string; url: string }> = []
    const client = new HttpAutoContentClient(configuration, async (input, init) => {
      requests.push({ body: init?.body?.toString(), url: input.toString() })
      return new Response(JSON.stringify({ request_id: 'request-1', status: 0 }), { status: 200 })
    })

    await expect(
      client.createPodcast({
        callbackData: 'blog:capgo-live-updates',
        content: post.content,
        instructions: 'Use only this article.',
        voice1: 12,
        voice2: 34,
      }),
    ).resolves.toEqual({ requestId: 'request-1' })

    expect(requests[0].url).toBe('https://api.autocontentapi.com/content/CreatePodcastCustomVoices')
    expect(JSON.parse(requests[0].body || '{}')).toMatchObject({
      callbackData: 'blog:capgo-live-updates',
      resources: [{ content: post.content, type: 'text' }],
      voice1: 12,
      voice2: 34,
    })
  })

  test('creates, waits for, and attaches exactly one episode when capacity remains', async () => {
    const calls: string[] = []
    const client: AutoContentClient = {
      attachEpisode: async ({ description, requestId, title }) => {
        calls.push(`attach:${requestId}`)
        expect(description).toContain(post.sourceArticleUrl)
        expect(title).toBe('Capgo podcast: Capgo Live Updates')
        return { episodeId: 42 }
      },
      createPodcast: async ({ callbackData, content, instructions, voice1, voice2 }) => {
        calls.push('create')
        expect(callbackData).toBe('blog:capgo-live-updates')
        expect(content).toContain(post.content)
        expect(instructions).toContain(post.sourceArticleUrl)
        expect([voice1, voice2]).toEqual([12, 34])
        return { requestId: 'request-1' }
      },
      getStatus: async () => {
        calls.push('status')
        return { audio_duration: 90, audio_url: 'https://audio.example/episode.mp3', file_size: 1024, status: 100 }
      },
      getUsage: async () => ({ allowedDailyPodcasts: 2, usedDailyPodcasts: 1 }),
      listShowEpisodes: async () => [],
    }
    const manifest: PodcastManifest = { episodes: [], version: 1 }

    const result = await publishCandidates([post], manifest, configuration, client)

    expect(calls).toEqual(['create', 'status', 'attach:request-1'])
    expect(result.publishedCount).toBe(1)
    expect(result.deferredCount).toBe(0)
    expect(result.manifest.episodes).toHaveLength(1)
    expect(result.manifest.episodes[0]).toMatchObject({
      audioMimeType: 'audio/mpeg',
      episodeGuid: 'capgo-blog-podcast:capgo-live-updates:42',
      providerEpisodeId: 42,
      requestId: 'request-1',
      slug: 'capgo-live-updates',
      sourceArticleUrl: post.sourceArticleUrl,
    })
  })

  test('defers a candidate without creating audio when the daily allowance is exhausted', async () => {
    const client: AutoContentClient = {
      attachEpisode: async () => ({ episodeId: 42 }),
      createPodcast: async () => {
        throw new Error('should not create a podcast')
      },
      getStatus: async () => ({ status: 0 }),
      getUsage: async () => ({ allowedDailyPodcasts: 1, usedDailyPodcasts: 1 }),
      listShowEpisodes: async () => [],
    }

    const result = await publishCandidates([post], { episodes: [], version: 1 }, configuration, client)

    expect(result.publishedCount).toBe(0)
    expect(result.deferredCount).toBe(1)
    expect(result.manifestChanged).toBeFalse()
  })
})
