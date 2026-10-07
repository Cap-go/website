/**
 * Generate downloadable Capgo brand assets under apps/web/public/brand/.
 * Usage: bun run generate:brand-assets
 */
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import sharp from '../apps/web/node_modules/sharp'
import { BRAND_BANNER_NAVY, BRAND_ICON_NAVY, capgoIconMarkOnlySvg, capgoIconSvg, capgoLockupSvg } from './lib/capgo-lockup-svg'

const ROOT = resolve(import.meta.dirname, '..')
const OUT_DIR = join(ROOT, 'apps/web/public/brand')
const PUBLIC = join(ROOT, 'apps/web/public')

type RasterTarget = {
  slug: string
  svg: string
  pngName: string
  width: number
  height?: number
}

const svgAssets: { name: string; body: string }[] = [
  {
    name: 'capgo-lockup-white-on-navy.svg',
    body: capgoLockupSvg({ background: BRAND_BANNER_NAVY, fill: '#ffffff' }),
  },
  {
    name: 'capgo-lockup-white-transparent.svg',
    body: capgoLockupSvg({ fill: '#ffffff' }),
  },
  {
    name: 'capgo-lockup-navy-on-white.svg',
    body: capgoLockupSvg({ background: '#ffffff', fill: BRAND_ICON_NAVY }),
  },
  {
    name: 'capgo-icon-navy.svg',
    body: capgoIconSvg({ background: BRAND_ICON_NAVY, markFill: '#ffffff' }),
  },
  {
    name: 'capgo-icon-white-transparent.svg',
    body: capgoIconSvg({ markFill: '#ffffff', roundedTile: false }),
  },
  {
    name: 'capgo-mark-navy.svg',
    body: capgoIconMarkOnlySvg(BRAND_ICON_NAVY),
  },
]

async function rasterizeSvg(svg: string, output: string, width: number, height?: number) {
  mkdirSync(dirname(output), { recursive: true })
  const pipeline = sharp(Buffer.from(svg)).png({ compressionLevel: 9, adaptiveFiltering: true })
  if (height) {
    await pipeline.resize(width, height, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toFile(output)
  } else {
    await pipeline.resize(width).toFile(output)
  }
}

async function optimizePng(input: string, output: string, maxWidth?: number) {
  mkdirSync(dirname(output), { recursive: true })
  let pipeline = sharp(input)
  if (maxWidth) {
    const meta = await pipeline.metadata()
    if (meta.width && meta.width > maxWidth) {
      pipeline = pipeline.resize(maxWidth)
    }
  }
  await pipeline.png({ compressionLevel: 9, adaptiveFiltering: true, palette: false }).toFile(output)
}

async function exportWebpAsPng(source: string, dest: string, maxWidth?: number) {
  if (!existsSync(source)) {
    throw new Error(`Missing source asset: ${source}`)
  }
  await optimizePng(source, dest, maxWidth)
}

async function main() {
  rmSync(OUT_DIR, { recursive: true, force: true })
  mkdirSync(OUT_DIR, { recursive: true })

  for (const asset of svgAssets) {
    writeFileSync(join(OUT_DIR, asset.name), asset.body)
  }

  const rasterTargets: RasterTarget[] = [
    {
      slug: 'lockup-white-on-navy',
      svg: svgAssets[0].body,
      pngName: 'capgo-lockup-white-on-navy.png',
      width: 2400,
    },
    {
      slug: 'lockup-white-transparent',
      svg: svgAssets[1].body,
      pngName: 'capgo-lockup-white-transparent.png',
      width: 2400,
    },
    {
      slug: 'lockup-navy-on-white',
      svg: svgAssets[2].body,
      pngName: 'capgo-lockup-navy-on-white.png',
      width: 2400,
    },
    {
      slug: 'icon-navy',
      svg: svgAssets[3].body,
      pngName: 'capgo-icon-navy.png',
      width: 1024,
    },
  ]

  for (const target of rasterTargets) {
    await rasterizeSvg(target.svg, join(OUT_DIR, target.pngName), target.width, target.height)
    console.log(`Generated ${target.pngName}`)
  }

  await optimizePng(join(PUBLIC, 'capgo_banner.png'), join(OUT_DIR, 'capgo-banner-navy.png'), 2400)
  console.log('Generated capgo-banner-navy.png')

  await exportWebpAsPng(join(PUBLIC, 'capgo_logo_header_2x.webp'), join(OUT_DIR, 'capgo-logo-header.png'), 640)
  await exportWebpAsPng(join(PUBLIC, 'capgo_logo.webp'), join(OUT_DIR, 'capgo-lockup-white-transparent-optimized.png'), 2400)

  const zipPath = join(OUT_DIR, 'capgo-brand-assets.zip')
  if (commandExists('zip')) {
    const files = readdirSync(OUT_DIR).filter((name) => name !== 'capgo-brand-assets.zip' && !name.endsWith('-source.png'))
    const result = spawnSync('zip', ['-j', zipPath, ...files.map((f) => join(OUT_DIR, f))], { cwd: OUT_DIR, stdio: 'inherit' })
    if (result.status === 0) {
      console.log(`Generated ${zipPath}`)
    }
  } else {
    console.warn('zip CLI not found; skipping capgo-brand-assets.zip')
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
