import { getRssString } from '@astrojs/rss'
import { describe, expect, test } from 'bun:test'
import {
  createPodcastRssOptions,
  createPodcastStructuredData,
  getPodcastEpisodeGuid,
  getPodcastFeedEpisodes,
  isPlayablePodcastEpisode,
  type PodcastEpisode,
} from '../../apps/web/src/lib/podcast'

const episode: PodcastEpisode = {
  audioMimeType: 'audio/mpeg',
  description: 'A practical episode about releases & rollbacks.\n\nRead the full article: https://capgo.app/blog/release-safety/',
  durationSeconds: 185,
  episodeGuid: 'capgo-blog-podcast:release-safety:42',
  fileSize: 123456,
  generatedAt: '2026-07-11T09:00:00.000Z',
  providerAudioUrl: 'https://audio.example.com/release-safety.mp3',
  providerEpisodeId: 42,
  slug: 'release-safety',
  sourceArticleUrl: 'https://capgo.app/blog/release-safety/',
  title: 'Capgo podcast: Release safety',
}

describe('podcast discovery', () => {
  test('keeps playable episodes visible while only complete enclosures reach the feed', () => {
    const audioOnly: PodcastEpisode = {
      ...episode,
      fileSize: undefined,
      slug: 'audio-only',
    }

    expect(isPlayablePodcastEpisode(audioOnly)).toBeTrue()
    expect(getPodcastFeedEpisodes([audioOnly, episode]).map((item) => item.slug)).toEqual(['release-safety'])
  })

  test('creates a stable podcast graph linked to the blog article', () => {
    const graph = createPodcastStructuredData({
      articleUrl: 'https://capgo.app/blog/release-safety/',
      episode: episode as typeof episode & { providerAudioUrl: string },
      imageUrl: 'https://capgo.app/social/release-safety.png',
      siteUrl: 'https://capgo.app/',
    })

    expect(graph.audio).toMatchObject({
      '@type': 'AudioObject',
      contentUrl: episode.providerAudioUrl,
      duration: 'PT3M5S',
      encodingFormat: 'audio/mpeg',
    })
    expect(graph.episode).toMatchObject({
      '@type': 'PodcastEpisode',
      description: 'A practical episode about releases & rollbacks.',
      isBasedOn: { '@id': 'https://capgo.app/blog/release-safety/#newsarticle' },
      partOfSeries: {
        webFeed: 'https://capgo.app/podcast.xml',
      },
      url: 'https://capgo.app/blog/release-safety/#podcast',
    })
  })

  test('generates an RSS 2.0 podcast enclosure, stable GUID, and canonical article link', async () => {
    const xml = await getRssString(createPodcastRssOptions('https://capgo.app/', [episode]))

    expect(xml).toContain('xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"')
    expect(xml).toContain('https://audio.example.com/release-safety.mp3')
    expect(xml).toContain('length="123456"')
    expect(xml).toContain('https://capgo.app/blog/release-safety/')
    expect(xml).toContain(getPodcastEpisodeGuid(episode))
    expect(xml).toContain('<itunes:duration>00:03:05</itunes:duration>')
  })
})
