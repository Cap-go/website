import { capgoMarkSvg } from '../../apps/web/src/config/capgoMark'

export type LogoTileStyle = {
  radius: number
  innerRadius: number
  inset: number
  shadowX: number
  shadowY: number
  shadowOpacity: number
  accentOpacity: number
}

/** Dark rounded tile with an accent tint and the white Capgo mark centered at 62% of the tile. */
export function capgoLogoTileSvg(x: number, y: number, size: number, accent: string, style: LogoTileStyle): string {
  const markSize = size * 0.62
  const markOffset = (size - markSize) / 2
  const innerSize = size - style.inset * 2

  return `
    <rect x="${x + style.shadowX}" y="${y + style.shadowY}" width="${size}" height="${size}" rx="${style.radius}" fill="#0f172a" opacity="${style.shadowOpacity}"/>
    <rect x="${x}" y="${y}" width="${size}" height="${size}" rx="${style.radius}" fill="#0f172a"/>
    <rect x="${x + style.inset}" y="${y + style.inset}" width="${innerSize}" height="${innerSize}" rx="${style.innerRadius}" fill="${accent}" opacity="${style.accentOpacity}"/>
    ${capgoMarkSvg(x + markOffset, y + markOffset, markSize)}`
}
