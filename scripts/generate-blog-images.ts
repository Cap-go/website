/**
 * Generate Capgo-styled blog hero images at apps/web/public/blog-images/{slug}.webp (1536x1024).
 * Usage: bun run generate:blog-images [--slug=<slug>] [--external-only] [--update-frontmatter]
 */
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, resolve } from 'node:path'

const width = 1536
const height = 1024

const layout = {
  padX: 80,
  padY: 72,
  leftWidth: 820,
  columnGap: 64,
  panelWidth: 480,
  panelSidePad: 56,
} as const

const panelX = layout.padX + layout.leftWidth + layout.columnGap
const panelY = layout.padY
const panelH = height - layout.padY * 2

const brand = {
  azure: '#119eff',
  dusk: '#515271',
  pumpkin: '#ff7211',
  azureSoft: '#d6eeff',
  duskSoft: '#e8e9f0',
  pumpkinSoft: '#ffe8d6',
}

const rsvgConvert = '/opt/homebrew/bin/rsvg-convert'
const cwebp = '/opt/homebrew/bin/cwebp'

const blogDir = resolve('apps/web/src/content/blog/en')
const outputDir = resolve('apps/web/public/blog-images')

type PanelTheme = 'updates' | 'security' | 'cicd' | 'compliance' | 'plugins'

type BlogPost = {
  filePath: string
  slug: string
  title: string
  tag: string
  keywords: string
  headImage: string
}

type BlogImage = BlogPost & {
  output: string
  eyebrow: string
  titleLines: string[]
  chips: string[]
  theme: PanelTheme
  accent: string
  accentSoft: string
}

const logoOuterPath =
  'M264.2 265.3 17 512.5 264.5 760 512 1007.5 759.5 760 1007 512.5 759.8 265.3C623.8 129.3 512.3 18 512 18c-.3 0-111.8 111.3-247.8 247.3zm438.5 55.9C807.4 425.9 893 511.9 893 512.5c0 .5-85.7 86.7-190.5 191.5L512 894.5l-191-191-191-191 190.7-190.7c105-105 191-190.8 191.3-190.8.3 0 86.1 85.6 190.7 190.2z'
const logoInnerPath =
  'M440.8 347c-12.6 12.6-22.8 23.3-22.8 23.7 0 .5 53 53.7 117.8 118.4l117.7 117.7 23.2-23.3 23.1-23.2-47.4-47.4-47.4-47.4 47.5-47.5 47.5-47.5-23.3-23.3-23.2-23.2-47.5 47.5-47.5 47.5-47.5-47.4-47.5-47.5-22.7 22.9zM347 441.2 324.5 464l47.3 47.3 47.2 47.2-47.4 47.7-47.3 47.6 23 23 23 23 47.5-47.5 47.5-47.5 47.3 47.3c26 26 47.5 47.1 47.8 46.9 6.6-6.3 45.6-45.5 45.6-45.9 0-1.2-234.5-235.1-235.5-234.9-.6 0-11.1 10.4-23.5 23z'

const args = process.argv.slice(2)
const externalOnly = args.includes('--external-only')
const updateFrontmatter = args.includes('--update-frontmatter')
const slugArg = args.find((arg) => arg.startsWith('--slug='))?.split('=')[1]

function escapeText(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
}

function wrapText(value: string, maxChars: number) {
  const lines: string[] = []
  let current = ''

  for (const word of value.split(/\s+/).filter(Boolean)) {
    const next = current ? `${current} ${word}` : word
    if (next.length > maxChars && current) {
      lines.push(current)
      current = word
    } else {
      current = next
    }
  }

  if (current) lines.push(current)
  return lines
}

function parseFrontmatter(content: string) {
  if (!content.startsWith('---\n')) return null
  const end = content.indexOf('\n---\n', 4)
  if (end === -1) return null

  const block = content.slice(4, end)
  const fields = new Map<string, string>()

  for (const line of block.split('\n')) {
    const match = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/)
    if (!match) continue
    fields.set(match[1], match[2].trim())
  }

  return { fields, bodyStart: end + 5 }
}

function isExternalHeadImage(value: string) {
  return /seobot|cdnimg/i.test(value)
}

function detectTheme(slug: string, title: string, tag: string, keywords: string): PanelTheme {
  const hay = `${slug} ${title} ${tag} ${keywords}`.toLowerCase()

  if (/(plugin|bridge|native module|capacitor plugin)/.test(hay)) return 'plugins'
  if (/(compliance|gdpr|hipaa|soc2|regulat|audit trail|app store review)/.test(hay)) return 'compliance'
  if (/(security|encrypt|secret|vulnerab|privacy|malware|phishing)/.test(hay)) return 'security'
  if (/(ci\/?cd|pipeline|github action|automation|build system|xcode cloud|fastlane)/.test(hay)) return 'cicd'
  if (/(update|ota|live update|hotfix|rollout|channel|bundle)/.test(hay)) return 'updates'

  return 'updates'
}

function themeColors(theme: PanelTheme) {
  switch (theme) {
    case 'security':
      return { accent: brand.dusk, accentSoft: brand.duskSoft }
    case 'cicd':
      return { accent: brand.pumpkin, accentSoft: brand.pumpkinSoft }
    case 'compliance':
      return { accent: brand.dusk, accentSoft: brand.azureSoft }
    case 'plugins':
      return { accent: brand.azure, accentSoft: brand.pumpkinSoft }
    case 'updates':
    default:
      return { accent: brand.azure, accentSoft: brand.azureSoft }
  }
}

function eyebrowForTheme(theme: PanelTheme, tag: string) {
  if (tag.trim()) {
    const first = tag.split(',')[0]?.trim()
    if (first) return first
  }

  switch (theme) {
    case 'security':
      return 'Security'
    case 'cicd':
      return 'CI/CD'
    case 'compliance':
      return 'Compliance'
    case 'plugins':
      return 'Plugins'
    default:
      return 'Live updates'
  }
}

function chipsFromTag(tag: string) {
  const items = tag
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 4)

  if (items.length > 0) return items
  return ['Capacitor', 'Mobile', 'Capgo']
}

function loadPosts() {
  const files = readdirSync(blogDir)
    .filter((name) => name.endsWith('.md'))
    .sort()

  const posts: BlogPost[] = []

  for (const name of files) {
    const filePath = resolve(blogDir, name)
    const content = readFileSync(filePath, 'utf8')
    const parsed = parseFrontmatter(content)
    if (!parsed) continue

    const slug = parsed.fields.get('slug') ?? name.replace(/\.md$/, '')
    const title = (parsed.fields.get('title') ?? slug).replace(/^['"]|['"]$/g, '')
    const tag = parsed.fields.get('tag') ?? ''
    const keywords = parsed.fields.get('keywords') ?? ''
    const headImage = parsed.fields.get('head_image') ?? ''

    if (slugArg && slug !== slugArg) continue
    if (externalOnly && !isExternalHeadImage(headImage)) continue

    posts.push({ filePath, slug, title, tag, keywords, headImage })
  }

  return posts
}

function buildImage(post: BlogPost): BlogImage {
  const theme = detectTheme(post.slug, post.title, post.tag, post.keywords)
  const colors = themeColors(theme)
  const titleLines = wrapText(post.title, 22).slice(0, 3)

  return {
    ...post,
    output: resolve(outputDir, `${post.slug}.webp`),
    eyebrow: eyebrowForTheme(theme, post.tag),
    titleLines,
    chips: chipsFromTag(post.tag),
    theme,
    accent: colors.accent,
    accentSoft: colors.accentSoft,
  }
}

function textLine(
  text: string,
  x: number,
  y: number,
  options: {
    size: number
    color: string
    weight?: number
    anchor?: 'start' | 'middle'
    opacity?: number
    hanging?: boolean
  },
) {
  const baseline = options.hanging ? ' dominant-baseline="hanging"' : ''
  return `<text x="${x}" y="${y}"${baseline} text-anchor="${options.anchor ?? 'start'}" font-family="Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="${options.size}" font-weight="${options.weight ?? 500}" fill="${options.color}" opacity="${options.opacity ?? 1}">${escapeText(text)}</text>`
}

function logoTile(x: number, y: number, size: number, accent: string) {
  const scale = (size * 0.62) / 1024
  const offset = size * 0.19

  return `
    <rect x="${x + 8}" y="${y + 10}" width="${size}" height="${size}" rx="30" fill="#0f172a" opacity="0.14"/>
    <rect x="${x}" y="${y}" width="${size}" height="${size}" rx="30" fill="#0f172a"/>
    <rect x="${x + 6}" y="${y + 6}" width="${size - 12}" height="${size - 12}" rx="26" fill="${accent}" opacity="0.14"/>
    <g transform="translate(${x + offset} ${y + offset}) scale(${scale})">
      <path fill="#ffffff" d="${logoOuterPath}"/>
      <path fill="#ffffff" d="${logoInnerPath}"/>
    </g>`
}

function chips(items: string[], x: number, y: number, maxWidth: number, accent: string) {
  const gap = 16
  const rowGap = 14
  const chipHeight = 46
  let cursorX = x
  let cursorY = y
  const parts: string[] = []

  for (const item of items.slice(0, 4)) {
    const chipWidth = Math.min(260, 34 + item.length * 13)
    if (cursorX > x && cursorX + chipWidth > x + maxWidth) {
      cursorX = x
      cursorY += chipHeight + rowGap
    }

    parts.push(`
        <rect x="${cursorX}" y="${cursorY}" width="${chipWidth}" height="${chipHeight}" rx="23" fill="#ffffff" stroke="${accent}" stroke-opacity="0.24"/>
        <circle cx="${cursorX + 22}" cy="${cursorY + 23}" r="6" fill="${accent}"/>
        ${textLine(item, cursorX + 38, cursorY + 14, { size: 18, color: '#334155', weight: 700, hanging: true })}`)
    cursorX += chipWidth + gap
  }

  return parts.join('')
}

function panelFooterCaptions(x: number, y: number, w: number, h: number, title: string, subtitle: string) {
  const captionX = x + layout.panelSidePad
  return `
    ${textLine(title, captionX, y + h - 88, { size: 24, color: '#0f172a', weight: 800 })}
    ${textLine(subtitle, captionX, y + h - 52, { size: 20, color: '#64748b', weight: 600 })}`
}

function panelFrame(x: number, y: number, w: number, h: number) {
  return `
    <rect x="${x + 10}" y="${y + 12}" width="${w}" height="${h}" rx="36" fill="#0f172a" opacity="0.12"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="36" fill="#ffffff" stroke="#dce9f8"/>
    <rect x="${x}" y="${y}" width="${w}" height="68" rx="36" fill="#f8fbff"/>
    <rect x="${x}" y="${y + 34}" width="${w}" height="34" fill="#f8fbff"/>
    <circle cx="${x + 34}" cy="${y + 34}" r="8" fill="#ef4444"/>
    <circle cx="${x + 60}" cy="${y + 34}" r="8" fill="#f59e0b"/>
    <circle cx="${x + 86}" cy="${y + 34}" r="8" fill="#22c55e"/>`
}

function renderPhonePanel(image: BlogImage) {
  const x = panelX
  const y = panelY
  const w = layout.panelWidth
  const h = panelH
  const side = layout.panelSidePad
  const innerW = w - side * 2
  const rows = ['Production channel', 'Staged rollout', 'Crash guard active', 'Rollback ready']

  const notchW = Math.min(220, innerW - 80)
  const notchX = x + side + (innerW - notchW) / 2

  const rowMarkup = rows
    .map((row, index) => {
      const rowY = y + 250 + index * 96
      return `
        <rect x="${x + side}" y="${rowY}" width="${innerW}" height="68" rx="18" fill="#111827"/>
        <circle cx="${x + side + 32}" cy="${rowY + 34}" r="8" fill="${image.accent}"/>
        ${textLine(row, x + side + 52, rowY + 42, { size: 22, color: '#e5e7eb', weight: 700 })}`
    })
    .join('')

  return `
    ${panelFrame(x, y, w, h)}
    <rect x="${notchX - 18}" y="${y + 108}" width="${notchW + 36}" height="120" rx="58" fill="#020617"/>
    <rect x="${notchX}" y="${y + 126}" width="${notchW}" height="84" rx="44" fill="#f8fbff"/>
    <rect x="${notchX + notchW / 2 - 60}" y="${y + 142}" width="120" height="16" rx="8" fill="#020617" opacity="0.82"/>
    <rect x="${x + side}" y="${y + 188}" width="${innerW}" height="52" rx="20" fill="${image.accentSoft}"/>
    ${textLine('Live update control', x + side + 20, y + 222, { size: 24, color: '#0f172a', weight: 900 })}
    ${rowMarkup}`
}

function renderShieldPanel(image: BlogImage) {
  const x = panelX
  const y = panelY
  const w = layout.panelWidth
  const h = panelH
  const side = layout.panelSidePad
  const innerW = w - side * 2
  const cx = x + w / 2
  const cy = y + 360

  return `
    ${panelFrame(x, y, w, h)}
    <path d="M ${cx} ${cy - 150} L ${cx + 150} ${cy - 78} L ${cx + 150} ${cy + 40} C ${cx + 150} ${cy + 150} ${cx} ${cy + 210} ${cx} ${cy + 210} C ${cx} ${cy + 210} ${cx - 150} ${cy + 150} ${cx - 150} ${cy + 40} L ${cx - 150} ${cy - 78} Z" fill="${image.accentSoft}" stroke="${image.accent}" stroke-width="8"/>
    <path d="M ${cx - 70} ${cy + 10} L ${cx - 18} ${cy + 62} L ${cx + 92} ${cy - 48}" fill="none" stroke="${image.accent}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
    ${panelFooterCaptions(x, y, w, h, 'Encrypted delivery', 'Signed bundles and audit trail')}`
}

function renderTerminalPanel(image: BlogImage) {
  const x = panelX
  const y = panelY
  const w = layout.panelWidth
  const h = panelH
  const side = layout.panelSidePad
  const innerW = w - side * 2
  const lines = [
    'capgo build ios --profile release',
    'capgo upload --channel production',
    'health check passed',
    'promote rollout to 25%',
  ]

  const lineMarkup = lines
    .map((line, index) => {
      const color = index === 0 ? image.accent : index === 1 ? '#cbd5e1' : '#94a3b8'
      return textLine(line, x + side + 12, y + 250 + index * 56, { size: 24, color, weight: index === 0 ? 800 : 600 })
    })
    .join('')

  return `
    ${panelFrame(x, y, w, h)}
    <rect x="${x + side}" y="${y + 108}" width="${innerW}" height="${h - 144}" rx="24" fill="#020617"/>
    ${lineMarkup}
    ${panelFooterCaptions(x, y, w, h, 'Automated release pipeline', 'Build, sign, upload, and promote')}`
}

function renderChecklistPanel(image: BlogImage) {
  const x = panelX
  const y = panelY
  const w = layout.panelWidth
  const h = panelH
  const side = layout.panelSidePad
  const innerW = w - side * 2
  const items = ['Policy checks', 'Store guidelines', 'Audit evidence', 'Release approval']

  const itemMarkup = items
    .map((item, index) => {
      const itemY = y + 250 + index * 88
      return `
        <rect x="${x + side}" y="${itemY}" width="34" height="34" rx="8" fill="${image.accentSoft}" stroke="${image.accent}" stroke-width="3"/>
        <path d="M ${x + side + 8} ${itemY + 18} L ${x + side + 18} ${itemY + 28} L ${x + side + 34} ${itemY + 10}" fill="none" stroke="${image.accent}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        ${textLine(item, x + side + 52, itemY + 26, { size: 26, color: '#0f172a', weight: 700 })}`
    })
    .join('')

  return `
    ${panelFrame(x, y, w, h)}
    ${itemMarkup}
    ${panelFooterCaptions(x, y, w, h, 'Compliance-ready releases', 'Checklists for review and rollout')}`
}

function renderBridgePanel(image: BlogImage) {
  const x = panelX
  const y = panelY
  const w = layout.panelWidth
  const h = panelH
  const side = layout.panelSidePad
  const innerW = w - side * 2
  const boxSize = 120
  const bridgeGap = 100
  const groupWidth = boxSize * 2 + bridgeGap
  const leftX = x + (w - groupWidth) / 2
  const rightX = leftX + boxSize + bridgeGap
  const bridgeY = y + 360

  return `
    ${panelFrame(x, y, w, h)}
    <rect x="${leftX}" y="${y + 250}" width="${boxSize}" height="${boxSize}" rx="24" fill="${image.accentSoft}" stroke="${image.accent}" stroke-width="4"/>
    ${textLine('Web', leftX + 36, y + 322, { size: 24, color: '#0f172a', weight: 800 })}
    <rect x="${rightX}" y="${y + 250}" width="${boxSize}" height="${boxSize}" rx="24" fill="${brand.pumpkinSoft}" stroke="${brand.pumpkin}" stroke-width="4"/>
    ${textLine('Native', rightX + 20, y + 322, { size: 24, color: '#0f172a', weight: 800 })}
    <rect x="${leftX + boxSize}" y="${bridgeY - 10}" width="${bridgeGap}" height="20" rx="10" fill="${image.accent}"/>
    <circle cx="${leftX + boxSize + bridgeGap / 2}" cy="${bridgeY}" r="26" fill="#ffffff" stroke="${image.accent}" stroke-width="6"/>
    ${panelFooterCaptions(x, y, w, h, 'Plugin bridge', 'Capacitor APIs without rewrites')}`
}

function renderThematicPanel(image: BlogImage) {
  switch (image.theme) {
    case 'security':
      return renderShieldPanel(image)
    case 'cicd':
      return renderTerminalPanel(image)
    case 'compliance':
      return renderChecklistPanel(image)
    case 'plugins':
      return renderBridgePanel(image)
    case 'updates':
    default:
      return renderPhonePanel(image)
  }
}

function renderSvg(image: BlogImage) {
  const { padX, padY, leftWidth } = layout
  const logoSize = 80
  const eyebrowSize = 18
  const titleSize = image.titleLines.some((line) => line.length > 18) ? 54 : image.titleLines.length > 2 ? 58 : 64
  const titleLineHeight = titleSize + 14

  const logoBottom = padY + logoSize
  const eyebrowY = logoBottom + 28
  const titleY = eyebrowY + eyebrowSize + 36
  const chipsY = titleY + image.titleLines.length * titleLineHeight + 36

  const titleSvg = image.titleLines
    .map((line, index) =>
      textLine(line, padX, titleY + index * titleLineHeight, {
        size: titleSize,
        color: '#101827',
        weight: 900,
        hanging: true,
      }),
    )
    .join('')
  const glowX = panelX + layout.panelWidth / 2
  const glowY = height / 2
  const accentBandX = padX + leftWidth

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fbfdff"/>
      <stop offset="0.55" stop-color="#f7fbff"/>
      <stop offset="1" stop-color="${image.accentSoft}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(${glowX} ${glowY}) rotate(90) scale(520 ${panelH})">
      <stop stop-color="${image.accent}" stop-opacity="0.22"/>
      <stop offset="0.55" stop-color="${image.accent}" stop-opacity="0.08"/>
      <stop offset="1" stop-color="${image.accent}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="2" fill="#9eb7d1" opacity="0.38"/>
    </pattern>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <rect width="${width}" height="${height}" fill="url(#dots)"/>
  <rect width="${width}" height="${height}" fill="url(#glow)"/>
  <rect x="${accentBandX}" y="0" width="${width - accentBandX}" height="${height}" fill="${image.accent}" opacity="0.05"/>
  ${logoTile(padX, padY, logoSize, image.accent)}
  ${textLine('Capgo blog', padX + logoSize + 20, padY + 34, { size: 20, color: brand.dusk, weight: 800, hanging: true })}
  ${textLine(image.eyebrow.toUpperCase(), padX, eyebrowY, { size: eyebrowSize, color: image.accent, weight: 900, hanging: true })}
  ${titleSvg}
  ${chips(image.chips, padX, chipsY, leftWidth, image.accent)}
  ${renderThematicPanel(image)}
</svg>`
}

function renderWebp(svgPath: string, webpPath: string) {
  mkdirSync(dirname(webpPath), { recursive: true })

  const pngPath = `${webpPath}.png`
  const rsvg = spawnSync(rsvgConvert, ['-w', String(width), '-h', String(height), '-f', 'png', '-o', pngPath, svgPath], {
    stdio: 'inherit',
  })

  if (rsvg.status !== 0) {
    throw new Error(`rsvg-convert failed for ${svgPath}`)
  }

  const webp = spawnSync(cwebp, ['-q', '85', pngPath, '-o', webpPath], { stdio: 'inherit' })
  if (webp.status !== 0) {
    throw new Error(`cwebp failed for ${webpPath}`)
  }

  rmSync(pngPath, { force: true })
}

function yamlQuote(value: string) {
  return `"${value.replaceAll('\\', '\\\\').replaceAll('"', '\\"')}"`
}

function updatePostFrontmatter(post: BlogPost) {
  const content = readFileSync(post.filePath, 'utf8')
  const headImage = `/blog-images/${post.slug}.webp`
  const headImageAlt = `${post.title} Capgo blog illustration`

  let updated = content

  if (/^head_image:/m.test(updated)) {
    updated = updated.replace(/^head_image:.*$/m, `head_image: ${headImage}`)
  } else {
    updated = updated.replace(/^---\n/, `---\nhead_image: ${headImage}\n`)
  }

  if (/^head_image_alt:/m.test(updated)) {
    updated = updated.replace(/^head_image_alt:.*$/m, `head_image_alt: ${yamlQuote(headImageAlt)}`)
  } else {
    updated = updated.replace(/^head_image:.*\n/, (match) => `${match}head_image_alt: ${yamlQuote(headImageAlt)}\n`)
  }

  if (updated !== content) {
    writeFileSync(post.filePath, updated)
  }
}

const tempDir = mkdtempSync(resolve(tmpdir(), 'capgo-blog-'))

const errors: string[] = []
let generated = 0

try {
  const posts = loadPosts()
  console.log(`Processing ${posts.length} blog post(s)...`)

  for (const post of posts) {
    const image = buildImage(post)
    const svgPath = resolve(tempDir, `${post.slug}.svg`)

    try {
      writeFileSync(svgPath, renderSvg(image))
      renderWebp(svgPath, image.output)
      generated += 1
      console.log(`Generated ${image.output}`)

      if (updateFrontmatter) {
        updatePostFrontmatter(post)
        console.log(`Updated frontmatter ${post.filePath}`)
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      errors.push(`${post.slug}: ${message}`)
      console.error(`Failed ${post.slug}: ${message}`)
    }
  }

  console.log(`\nDone. Generated ${generated} image(s).`)
  if (errors.length > 0) {
    console.log(`Errors: ${errors.length}`)
    for (const error of errors) console.error(error)
    process.exitCode = 1
  }
} finally {
  if (existsSync(tempDir)) rmSync(tempDir, { recursive: true, force: true })
}
