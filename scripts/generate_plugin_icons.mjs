import fs from 'fs'
import { createRequire } from 'node:module'
import path from 'path'

const require = createRequire(import.meta.url)
const heroicons = require('@iconify-json/heroicons/icons.json')
const pluginsFile = fs.readFileSync('src/config/plugins.ts', 'utf8')
const preservedIcons = new Set(['zebra-datawedge'])

// 1. Parse actions
const actionsStart = pluginsFile.indexOf('export const actions = [')
const actionsEnd = pluginsFile.lastIndexOf(']')
const actionsContent = pluginsFile.substring(actionsStart, actionsEnd)

// Split by "}," to get rough objects
const objectStrings = actionsContent.split('},')

const plugins = []

for (const str of objectStrings) {
  const nameMatch = str.match(/name:\s*'([^']+)'/)
  const hrefMatch = str.match(/href:\s*'([^']+)'/)
  const titleMatch = str.match(/title:\s*'([^']+)'/)
  const iconMatch = str.match(/icon:\s*'([^']+)'/)

  if (nameMatch && hrefMatch && titleMatch && iconMatch) {
    plugins.push({
      name: nameMatch[1],
      href: hrefMatch[1],
      title: titleMatch[1],
      iconName: iconMatch[1],
    })
  }
}

// 3. Gradient Logic
const gradients = [
  ['#3b82f6', '#06b6d4'], // blue-500 to cyan-500
  ['#a855f7', '#ec4899'], // purple-500 to pink-500
  ['#22c55e', '#10b981'], // green-500 to emerald-500
  ['#f97316', '#ef4444'], // orange-500 to red-500
  ['#6366f1', '#a855f7'], // indigo-500 to purple-500
  ['#ec4899', '#f43f5e'], // pink-500 to rose-500
  ['#14b8a6', '#22c55e'], // teal-500 to green-500
  ['#ef4444', '#f97316'], // red-500 to orange-500
  ['#06b6d4', '#3b82f6'], // cyan-500 to blue-500
  ['#eab308', '#f97316'], // yellow-500 to orange-500
]

const getGradient = (str) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % gradients.length
  return gradients[index]
}

const toHeroiconName = (value) =>
  `${value
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([a-zA-Z])([0-9])/g, '$1-$2')
    .replace(/([0-9])([a-zA-Z])/g, '$1-$2')
    .toLowerCase()}-solid`

// 3. Generate SVGs
const outputDir = 'public/icons/plugins'
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

for (const plugin of plugins) {
  // Get slug from href
  let slug = plugin.href.split('/').filter(Boolean).pop()
  if (slug.startsWith('capacitor-')) {
    slug = slug.replace('capacitor-', '')
  }
  if (slug === 'ricoh360-camera-plugin') {
    slug = 'ricoh360-camera'
  }

  if (preservedIcons.has(slug)) {
    console.log(`Preserved custom icon for ${slug}`)
    continue
  }

  const iconData = heroicons.icons[toHeroiconName(plugin.iconName)]
  if (!iconData) {
    console.log(`Icon data not found for ${plugin.title} (${plugin.iconName})`)
    continue
  }

  const width = iconData.width ?? heroicons.width ?? 24
  const height = iconData.height ?? heroicons.height ?? 24
  const scale = 32 / Math.max(width, height)
  const translatedX = ((56 - width * scale) / 2).toFixed(2)
  const translatedY = ((56 - height * scale) / 2).toFixed(2)

  const svg = `<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="56" height="56" rx="12" fill="#119eff" />
  <g transform="translate(${translatedX}, ${translatedY}) scale(${scale})" fill="white">
    ${iconData.body}
  </g>
</svg>`

  fs.writeFileSync(path.join(outputDir, `${slug}.svg`), svg)
  console.log(`Generated ${slug}.svg`)
}
