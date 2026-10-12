import { expect, test } from 'bun:test'
import { handleReadmeBanner } from '../src/worker/readme-banner.ts'

// The detail line renders at 50px from x=134 and is clipped at x=1504, which fits about 58 characters.
const DETAIL_SAFE_LENGTH = 58

const variants = {
  live: 'campaign=live-update',
  build: 'campaign=build',
  pluginLive: 'campaign=live-update&package=@capgo/capacitor-admob',
  pluginBuild: 'campaign=build&package=@capgo/capacitor-admob',
}

async function renderBanner(query) {
  const response = await handleReadmeBanner(new Request(`https://capgo.app/readme-banner.svg?${query}`))
  const svg = await response.text()
  const [, title] = svg.match(/<title id="title">([^<]*)<\/title>/) ?? []
  const texts = [...svg.matchAll(/<text [^>]*>([^<]*)/g)].map((match) => match[1])
  return { svg, title, detail: texts[1] }
}

for (const [name, query] of Object.entries(variants)) {
  test(`README banner ${name} detail mentions AI and fits the copy area`, async () => {
    const { detail } = await renderBanner(query)
    expect(detail).toContain('AI skills + MCP')
    expect(detail).not.toContain('...')
    expect(detail.length).toBeLessThanOrEqual(DETAIL_SAFE_LENGTH)
  })
}

test('README banner live update title no longer says Instant updates', async () => {
  const { title, svg } = await renderBanner(variants.live)
  expect(title).toBe('Capacitor live updates with AI')
  expect(svg).not.toContain('Instant updates')
})
