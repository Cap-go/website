export const LOGO_OUTER_PATH =
  'M264.2 265.3 17 512.5 264.5 760 512 1007.5 759.5 760 1007 512.5 759.8 265.3C623.8 129.3 512.3 18 512 18c-.3 0-111.8 111.3-247.8 247.3zm438.5 55.9C807.4 425.9 893 511.9 893 512.5c0 .5-85.7 86.7-190.5 191.5L512 894.5l-191-191-191-191 190.7-190.7c105-105 191-190.8 191.3-190.8.3 0 86.1 85.6 190.7 190.2z'

export const LOGO_INNER_PATH =
  'M440.8 347c-12.6 12.6-22.8 23.3-22.8 23.7 0 .5 53 53.7 117.8 118.4l117.7 117.7 23.2-23.3 23.1-23.2-47.4-47.4-47.4-47.4 47.5-47.5 47.5-47.5-23.3-23.3-23.2-23.2-47.5 47.5-47.5 47.5-47.5-47.4-47.5-47.5-22.7 22.9zM347 441.2 324.5 464l47.3 47.3 47.2 47.2-47.4 47.7-47.3 47.6 23 23 23 23 47.5-47.5 47.5-47.5 47.3 47.3c26 26 47.5 47.1 47.8 46.9 6.6-6.3 45.6-45.5 45.6-45.9 0-1.2-234.5-235.1-235.5-234.9-.6 0-11.1 10.4-23.5 23z'

export function escapeText(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
}

export function wrapText(value: string, maxChars: number) {
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

export function textLine(
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

type LogoTileStyle = 'social' | 'blog'

export function logoTile(x: number, y: number, size: number, accent: string, style: LogoTileStyle = 'social') {
  const scale = (size * 0.62) / 1024
  const offset = size * 0.19
  const cornerRadius = style === 'blog' ? 30 : 42
  const innerCornerRadius = style === 'blog' ? 26 : 36
  const shadowDx = style === 'blog' ? 8 : 10
  const shadowDy = style === 'blog' ? 10 : 14
  const innerPad = style === 'blog' ? 6 : 8
  const shadowOpacity = style === 'blog' ? 0.14 : 0.16
  const innerAccentOpacity = style === 'blog' ? 0.14 : 0.12

  return `
    <rect x="${x + shadowDx}" y="${y + shadowDy}" width="${size}" height="${size}" rx="${cornerRadius}" fill="#0f172a" opacity="${shadowOpacity}"/>
    <rect x="${x}" y="${y}" width="${size}" height="${size}" rx="${cornerRadius}" fill="#0f172a"/>
    <rect x="${x + innerPad}" y="${y + innerPad}" width="${size - innerPad * 2}" height="${size - innerPad * 2}" rx="${innerCornerRadius}" fill="${accent}" opacity="${innerAccentOpacity}"/>
    <g transform="translate(${x + offset} ${y + offset}) scale(${scale})">
      <path fill="#ffffff" d="${LOGO_OUTER_PATH}"/>
      <path fill="#ffffff" d="${LOGO_INNER_PATH}"/>
    </g>`
}
