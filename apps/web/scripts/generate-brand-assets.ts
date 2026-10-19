/**
 * Generates downloadable brand SVG lockups from vector paths in src/config.
 * Run: bun run apps/web/scripts/generate-brand-assets.ts
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { CAPGO_MARK_PATH } from '../src/config/capgoMark'
import {
  CAPGO_LOCKUP_MARK_TRANSFORM,
  CAPGO_LOCKUP_TEXT_X,
  CAPGO_LOCKUP_VIEWBOX,
  CAPGO_LOCKUP_VIEWBOX_ATTR,
  CAPGO_WORDTYPE_PATH,
  CAPGO_WORDTYPE_TRANSFORM,
} from '../src/config/capgoWordtype'

const OUT_DIR = join(import.meta.dir, '../public/brand')

const BANNER_NAVY = '#002444'
const ICON_NAVY = '#001827'

function lockupGroup(fill: string): string {
  return `<g fill="${fill}">
  <path fill-rule="evenodd" transform="${CAPGO_LOCKUP_MARK_TRANSFORM}" d="${CAPGO_MARK_PATH}"/>
  <path transform="translate(${CAPGO_LOCKUP_TEXT_X} 0) ${CAPGO_WORDTYPE_TRANSFORM}" d="${CAPGO_WORDTYPE_PATH}"/>
</g>`
}

function svgDoc(body: string, width?: number, height?: number): string {
  const dims = width && height ? ` width="${width}" height="${height}"` : ''
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${CAPGO_LOCKUP_VIEWBOX_ATTR}"${dims} role="img" aria-label="Capgo">
${body}
</svg>`
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })

  const whiteTransparent = svgDoc(lockupGroup('#ffffff'))
  await writeFile(join(OUT_DIR, 'capgo-lockup-white-transparent.svg'), whiteTransparent, 'utf8')

  const darkOnLight = svgDoc(lockupGroup(ICON_NAVY))
  await writeFile(join(OUT_DIR, 'capgo-lockup-dark.svg'), darkOnLight, 'utf8')

  const navyBanner = svgDoc(
    `<rect x="${CAPGO_LOCKUP_VIEWBOX.x}" y="${CAPGO_LOCKUP_VIEWBOX.y}" width="${CAPGO_LOCKUP_VIEWBOX.width}" height="${CAPGO_LOCKUP_VIEWBOX.height}" fill="${BANNER_NAVY}"/>
${lockupGroup('#ffffff')}`,
  )
  await writeFile(join(OUT_DIR, 'capgo-lockup-navy.svg'), navyBanner, 'utf8')

  const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" role="img" aria-label="Capgo icon">
<rect width="1024" height="1024" rx="224" fill="${ICON_NAVY}"/>
<path fill="#fff" fill-rule="evenodd" transform="translate(512 512) rotate(-45) scale(0.85)" d="${CAPGO_MARK_PATH}"/>
</svg>`
  await writeFile(join(OUT_DIR, 'capgo-icon.svg'), iconSvg, 'utf8')

  console.log('Wrote brand SVGs to', OUT_DIR)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
