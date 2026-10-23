/**
 * Generate og:video MP4s for the landing and product pages under apps/web/public/social/videos/.
 * Each video opens on the page's social card (bun run generate:social-images), crossfades into real product footage
 * framed on a blurred copy of the card, and ends back on the card so autoplaying previews loop cleanly.
 * Footage is either a console loop from public/landing-demos/videos, a console capture panned like a scroll, the
 * animated mobile app demo, or the live page itself captured with Playwright.
 * Pages pick these files up through apps/web/src/config/ogVideos.ts.
 * Usage: bun run generate:social-videos [slug ...]
 * Set SOCIAL_VIDEO_BASE_URL (default https://capgo.app) to capture pages from a local preview instead.
 */
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'
import { chromium } from 'playwright'
import { ogVideoHeight, ogVideos, ogVideoWidth } from '../apps/web/src/config/ogVideos'

const fps = 30
const fade = 0.5
const cardHold = 2.2
const outroHold = 1.2
const publicDir = resolve('apps/web/public')
const baseUrl = (process.env.SOCIAL_VIDEO_BASE_URL || 'https://capgo.app').replace(/\/$/, '')

type Segment =
  /** Console loop under public/, trimmed to `start`/`duration` seconds. */
  | { kind: 'video'; file: string; start?: number; duration?: number }
  /** Still image under public/, panned top to bottom like a scroll. `pan` caps the travel in output pixels. */
  | { kind: 'still'; file: string; duration: number; pan?: number }
  /** Live page captured with Playwright, then panned like a still. */
  | { kind: 'page'; path: string; duration: number; pan?: number }
  /** Animated WebP under public/ (portrait phone recording). */
  | { kind: 'animation'; file: string; duration: number }

type SocialVideo = {
  slug: string
  /** Social card under public/, also used as the page og:image. */
  card: string
  segments: Segment[]
}

const videos: SocialVideo[] = [
  {
    slug: 'home',
    card: 'capgo_social.png',
    segments: [
      { kind: 'video', file: 'landing-demos/videos/rollout-pause.mp4', duration: 4.5 },
      { kind: 'video', file: 'landing-demos/videos/native-diff.mp4', duration: 4 },
      { kind: 'video', file: 'landing-demos/videos/observe-tour.mp4', duration: 4.5 },
    ],
  },
  { slug: 'live-update', card: 'social/capgo-live-update.png', segments: [{ kind: 'video', file: 'landing-demos/videos/rollout-pause.mp4' }] },
  { slug: 'observe', card: 'social/capgo-observe.png', segments: [{ kind: 'video', file: 'landing-demos/videos/observe-tour.mp4' }] },
  {
    slug: 'native-build',
    card: 'social/capgo-native-build.png',
    segments: [
      { kind: 'still', file: 'landing-demos/console/builds.webp', duration: 4.5 },
      { kind: 'page', path: '/native-build/', duration: 5 },
    ],
  },
  {
    slug: 'notifications',
    card: 'social/capgo-notifications.png',
    segments: [
      { kind: 'still', file: 'landing-demos/console/notifications.webp', duration: 5 },
      { kind: 'page', path: '/notifications/', duration: 5 },
    ],
  },
  {
    slug: 'cli',
    card: 'social/capgo-cli.png',
    segments: [
      { kind: 'page', path: '/capgo-cli/', duration: 5 },
      { kind: 'video', file: 'landing-demos/videos/native-diff.mp4' },
    ],
  },
  {
    slug: 'app-mobile',
    card: 'social/capgo-app-mobile.png',
    segments: [{ kind: 'animation', file: 'capgo-mobile-preview-demo.webp', duration: 9 }],
  },
  { slug: 'plugins', card: 'social/capgo-plugins.png', segments: [{ kind: 'page', path: '/plugins/', duration: 7, pan: 900 }] },
  {
    slug: 'ionic-plugins',
    card: 'social/capgo-ionic-plugins.png',
    segments: [{ kind: 'page', path: '/ionic-enterprise-plugins/', duration: 7, pan: 900 }],
  },
  { slug: 'skills', card: 'social/capgo-skills.png', segments: [{ kind: 'page', path: '/skills/', duration: 7, pan: 900 }] },
  { slug: 'agents', card: 'social/capgo-agents.png', segments: [{ kind: 'page', path: '/agents/', duration: 7, pan: 900 }] },
]

// Image tools are resolved from fixed system directories instead of $PATH, so a writable
// PATH entry cannot substitute the binary these scripts execute.
const toolDirs = ['/opt/homebrew/bin', '/usr/local/bin', '/usr/bin', '/bin']

function tool(command: string) {
  const found = toolDirs.map((dir) => resolve(dir, command)).find((candidate) => existsSync(candidate))
  if (!found) throw new Error(`Unable to find ${command}. Install ffmpeg and ImageMagick.`)
  return found
}

function run(command: string, args: string[]) {
  const result = spawnSync(tool(command), args, { encoding: 'utf8' })
  if (result.status !== 0) throw new Error(`${command} failed: ${result.stderr || result.stdout}`)
  return result.stdout
}

function ffmpeg(args: string[]) {
  run('ffmpeg', ['-v', 'error', '-y', ...args])
}

function mediaDuration(file: string) {
  return Number.parseFloat(run('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file]))
}

const encodeArgs = ['-r', String(fps), '-pix_fmt', 'yuv420p', '-c:v', 'libx264', '-crf', '18', '-preset', 'fast', '-an']

/** Product window: a 16:10 frame for console footage, or a 9:16 phone frame for the mobile recording. */
function windowFor(segment: Segment) {
  const h = 600
  const w = segment.kind === 'animation' ? 338 : 960
  return { w, h, x: Math.round((ogVideoWidth - w) / 2), y: Math.round((ogVideoHeight - h) / 2), radius: segment.kind === 'animation' ? 40 : 18 }
}

type Window = ReturnType<typeof windowFor>

/** Blurred card behind a soft drop shadow, plus the rounded mask applied to the footage. */
function renderStage(card: string, frame: Window, dir: string) {
  const stage = resolve(dir, `stage-${frame.w}.png`)
  const mask = resolve(dir, `mask-${frame.w}.png`)
  const shadow = `roundrectangle ${frame.x + 8},${frame.y + 16} ${frame.x + frame.w - 8},${frame.y + frame.h + 16} ${frame.radius},${frame.radius}`
  run('magick', [
    card,
    '-resize',
    `${ogVideoWidth}x${ogVideoHeight}!`,
    '-blur',
    '0x24',
    '-fill',
    'white',
    '-colorize',
    '30%',
    '(',
    '-size',
    `${ogVideoWidth}x${ogVideoHeight}`,
    'xc:none',
    '-fill',
    'rgba(15,23,42,0.35)',
    '-draw',
    shadow,
    '-blur',
    '0x18',
    ')',
    '-composite',
    stage,
  ])
  run('magick', ['-size', `${frame.w}x${frame.h}`, 'xc:black', '-fill', 'white', '-draw', `roundrectangle 0,0 ${frame.w - 1},${frame.h - 1} ${frame.radius},${frame.radius}`, mask])
  return { stage, mask }
}

/** Scale a tall image to cover the window at 2x, then ease the crop downward so the pan reads as a scroll. */
function panFilter(frame: Window, duration: number, pan = 700) {
  const w2 = frame.w * 2
  const h2 = frame.h * 2
  const travel = `min(ih-${h2},${pan * 2})`
  const progress = `clip((t-0.5)/${Math.max(duration - 1.2, 0.1)},0,1)`
  return `scale=${w2}:${h2}:force_original_aspect_ratio=increase,crop=${w2}:${h2}:(iw-${w2})/2:'${travel}*(0.5-0.5*cos(PI*${progress}))',scale=${frame.w}:${frame.h}`
}

async function capturePage(path: string, out: string) {
  const browser = await chromium.launch({ headless: true })
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 2, reducedMotion: 'reduce' })
    await page.goto(`${baseUrl}${path}`, { waitUntil: 'networkidle' })
    // Lazy images below the fold load once scrolled into view.
    await page.evaluate(async () => {
      for (let y = 0; y < 2400; y += 400) {
        window.scrollTo(0, y)
        await new Promise((done) => setTimeout(done, 150))
      }
      window.scrollTo(0, 0)
    })
    await page.waitForTimeout(500)
    await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1280, height: 2400 }, fullPage: true })
  } finally {
    await browser.close()
  }
}

async function renderSegment(video: SocialVideo, segment: Segment, index: number, dir: string) {
  const frame = windowFor(segment)
  const { stage, mask } = renderStage(resolve(publicDir, video.card), frame, dir)
  const out = resolve(dir, `segment-${index}.mp4`)
  let input: string[]
  let footage: string
  let duration: number

  if (segment.kind === 'video') {
    const file = resolve(publicDir, segment.file)
    const start = segment.start ?? 0
    duration = segment.duration ?? mediaDuration(file) - start
    input = ['-ss', String(start), '-t', String(duration), '-i', file]
    footage = `fps=${fps},scale=${frame.w}:${frame.h}:force_original_aspect_ratio=increase,crop=${frame.w}:${frame.h}`
  } else if (segment.kind === 'animation') {
    // ffmpeg cannot decode animated WebP, so ImageMagick expands it into full frames first.
    const frames = resolve(dir, `frames-${index}`)
    mkdirSync(frames)
    run('magick', [resolve(publicDir, segment.file), '-coalesce', resolve(frames, '%04d.png')])
    const sourceFps = readdirSync(frames).length / mediaDurationOfAnimation(resolve(publicDir, segment.file))
    duration = segment.duration
    input = ['-framerate', sourceFps.toFixed(3), '-t', String(duration), '-i', resolve(frames, '%04d.png')]
    footage = `fps=${fps},scale=${frame.w}:${frame.h}:force_original_aspect_ratio=increase,crop=${frame.w}:${frame.h}`
  } else {
    let file: string
    if (segment.kind === 'page') {
      file = resolve(dir, `page-${index}.png`)
      await capturePage(segment.path, file)
    } else {
      file = resolve(publicDir, segment.file)
    }
    duration = segment.duration
    input = ['-loop', '1', '-framerate', String(fps), '-t', String(duration), '-i', file]
    footage = panFilter(frame, duration, segment.pan)
  }

  ffmpeg([
    '-loop',
    '1',
    '-framerate',
    String(fps),
    '-t',
    String(duration),
    '-i',
    stage,
    ...input,
    '-loop',
    '1',
    '-framerate',
    String(fps),
    '-t',
    String(duration),
    '-i',
    mask,
    '-filter_complex',
    `[1:v]${footage},format=rgba[v];[2:v]format=gray[m];[v][m]alphamerge[w];[0:v][w]overlay=${frame.x}:${frame.y}`,
    '-t',
    String(duration),
    ...encodeArgs,
    out,
  ])
  return { file: out, duration }
}

function mediaDurationOfAnimation(file: string) {
  const delays = run('magick', ['identify', '-format', '%T\n', file]).trim().split('\n')
  return delays.reduce((sum, delay) => sum + Number.parseInt(delay, 10), 0) / 100
}

function renderCard(video: SocialVideo, duration: number, out: string) {
  ffmpeg([
    '-loop',
    '1',
    '-framerate',
    String(fps),
    '-t',
    String(duration),
    '-i',
    resolve(publicDir, video.card),
    '-vf',
    `scale=${ogVideoWidth}:${ogVideoHeight}:flags=lanczos`,
    ...encodeArgs,
    out,
  ])
  return { file: out, duration }
}

async function renderVideo(video: SocialVideo, output: string) {
  const dir = mkdtempSync(resolve(tmpdir(), `capgo-og-video-${video.slug}-`))
  try {
    const clips = [renderCard(video, cardHold, resolve(dir, 'intro.mp4'))]
    for (const [index, segment] of video.segments.entries()) clips.push(await renderSegment(video, segment, index, dir))
    clips.push(renderCard(video, outroHold, resolve(dir, 'outro.mp4')))

    const inputs = clips.flatMap((clip) => ['-i', clip.file])
    const chain: string[] = []
    let previous = '[0:v]'
    let offset = 0
    for (let index = 1; index < clips.length; index++) {
      offset += clips[index - 1].duration - fade
      const label = index === clips.length - 1 ? '[out]' : `[x${index}]`
      chain.push(`${previous}[${index}:v]xfade=transition=fade:duration=${fade}:offset=${offset.toFixed(3)}${label}`)
      previous = label
    }

    ffmpeg([
      ...inputs,
      '-filter_complex',
      chain.join(';'),
      '-map',
      '[out]',
      '-r',
      String(fps),
      '-pix_fmt',
      'yuv420p',
      '-c:v',
      'libx264',
      '-profile:v',
      'high',
      '-crf',
      '27',
      '-preset',
      'slow',
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
const knownSlugs = new Set(videos.map((video) => video.slug))
const unknownSlugs = [...requested].filter((slug) => !knownSlugs.has(slug))
if (unknownSlugs.length > 0) throw new Error(`Unknown video slug: ${unknownSlugs.join(', ')}. Known slugs: ${[...knownSlugs].join(', ')}`)
const outputs = new Map(Object.values(ogVideos).map((entry) => [entry.slug, entry.url]))

for (const video of videos) {
  if (requested.size > 0 && !requested.has(video.slug)) continue
  const url = outputs.get(video.slug)
  if (!url) throw new Error(`No page in apps/web/src/config/ogVideos.ts uses ${video.slug}`)
  const output = resolve(publicDir, url.replace(/^\//, ''))
  mkdirSync(resolve(output, '..'), { recursive: true })
  await renderVideo(video, output)
  console.log(`Generated ${output} (${mediaDuration(output).toFixed(1)}s)`)
}
