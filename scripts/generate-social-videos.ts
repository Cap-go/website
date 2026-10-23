/**
 * Render the og:video motion pieces for the landing and product pages into apps/web/public/social/videos/.
 * Scenes live in scripts/social-videos/scenes.ts (storyboards) and stage.css (shared look). Each scene is loaded in
 * headless Chromium, every CSS animation is paused and moved to the frame time, and the frames are encoded to a
 * muted H.264 MP4 that autoplays in X, LinkedIn, Slack, and iMessage previews.
 * Pages pick these files up through apps/web/src/config/ogVideos.ts.
 * Usage: bun run generate:social-videos [slug ...]
 */
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { chromium } from 'playwright'
import { ogVideoHeight, ogVideos, ogVideoWidth } from '../apps/web/src/config/ogVideos'
import { scenes, type Scene } from './social-videos/scenes'

const fps = 30
const sceneDir = resolve('scripts/social-videos')
const publicDir = resolve('apps/web/public')

// Resolves typed text, counters, and clocks for time `t`, after seeking every CSS animation to it.
const seekScript = `
const ease = (p) => 1 - Math.pow(1 - p, 3)
const progress = (t, el) => ease(Math.min(1, Math.max(0, (t - Number(el.dataset.at)) / Number(el.dataset.dur))))
for (const el of document.querySelectorAll('[data-type]')) el.dataset.text = el.textContent
window.__seek = (t) => {
  for (const animation of document.getAnimations()) {
    animation.pause()
    animation.currentTime = t * 1000
  }
  for (const el of document.querySelectorAll('[data-type]')) {
    const at = Number(el.dataset.at)
    const cps = Number(el.dataset.cps)
    const text = el.dataset.text
    el.textContent = text.slice(0, Math.max(0, Math.min(text.length, Math.floor((t - at) * cps))))
    el.classList.toggle('caret', t >= at - 0.3 && t < at + text.length / cps + 0.4)
  }
  for (const el of document.querySelectorAll('[data-count]')) {
    const value = Math.round(Number(el.dataset.count) * progress(t, el)).toLocaleString('en-US')
    el.textContent = el.dataset.prefix + value + el.dataset.suffix
  }
  for (const el of document.querySelectorAll('[data-clock]')) {
    const seconds = Math.round(Number(el.dataset.to) * progress(t, el))
    el.textContent = Math.floor(seconds / 60) + ':' + String(seconds % 60).padStart(2, '0')
  }
}`

function pageHtml(scene: Scene) {
  return `<!doctype html>
<html><head><meta charset="utf-8"><base href="${pathToFileURL(sceneDir).href}/">
<link rel="stylesheet" href="stage.css">
<style>:root { --accent: ${scene.accent}; --accent-2: ${scene.accent2}; }</style>
</head><body><div class="stage"><div class="glow one"></div><div class="glow two"></div><div class="grid"></div>${scene.html}</div>
<script>${seekScript}</script></body></html>`
}

// Media tools are resolved from fixed system directories instead of $PATH, so a writable
// PATH entry cannot substitute the binary these scripts execute.
const toolDirs = ['/opt/homebrew/bin', '/usr/local/bin', '/usr/bin', '/bin']

function run(command: string, args: string[]) {
  const binary = toolDirs.map((dir) => resolve(dir, command)).find((candidate) => existsSync(candidate))
  if (!binary) throw new Error(`Unable to find ${command}. Install ffmpeg.`)
  const result = spawnSync(binary, args, { encoding: 'utf8' })
  if (result.status !== 0) throw new Error(`${command} failed: ${result.stderr || result.stdout}`)
  return result.stdout
}

async function renderScene(browser: Awaited<ReturnType<typeof chromium.launch>>, scene: Scene, output: string) {
  const dir = mkdtempSync(resolve(tmpdir(), `capgo-og-video-${scene.slug}-`))
  try {
    const htmlPath = resolve(dir, 'scene.html')
    writeFileSync(htmlPath, pageHtml(scene))
    const page = await browser.newPage({ viewport: { width: ogVideoWidth, height: ogVideoHeight } })
    await page.goto(pathToFileURL(htmlPath).href)
    await page.evaluate(() => document.fonts.ready)
    const frames = Math.round(scene.duration * fps)
    for (let frame = 0; frame < frames; frame++) {
      await page.evaluate((t) => (window as unknown as { __seek: (t: number) => void }).__seek(t), frame / fps)
      await page.screenshot({ path: resolve(dir, `${String(frame).padStart(5, '0')}.png`) })
    }
    await page.close()

    run('ffmpeg', [
      '-v',
      'error',
      '-y',
      '-framerate',
      String(fps),
      '-i',
      resolve(dir, '%05d.png'),
      '-c:v',
      'libx264',
      '-profile:v',
      'high',
      '-crf',
      '23',
      '-preset',
      'slow',
      '-pix_fmt',
      'yuv420p',
      '-movflags',
      '+faststart',
      '-an',
      output,
    ])
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

const requested = new Set(process.argv.slice(2))
const knownSlugs = new Set(scenes.map((scene) => scene.slug))
const unknownSlugs = [...requested].filter((slug) => !knownSlugs.has(slug))
if (unknownSlugs.length > 0) throw new Error(`Unknown video slug: ${unknownSlugs.join(', ')}. Known slugs: ${[...knownSlugs].join(', ')}`)
const outputs = new Map(Object.values(ogVideos).map((entry) => [entry.slug, entry.url]))

const browser = await chromium.launch({ headless: true })
try {
  for (const scene of scenes) {
    if (requested.size > 0 && !requested.has(scene.slug)) continue
    const url = outputs.get(scene.slug)
    if (!url) throw new Error(`No page in apps/web/src/config/ogVideos.ts uses ${scene.slug}`)
    const output = resolve(publicDir, url.replace(/^\//, ''))
    mkdirSync(resolve(output, '..'), { recursive: true })
    await renderScene(browser, scene, output)
    console.log(`Generated ${output} (${scene.duration}s)`)
  }
} finally {
  await browser.close()
}
