import { CAPGO_MARK_PATH, CAPGO_MARK_TRANSFORM, CAPGO_MARK_VIEWBOX } from '../../apps/web/src/config/capgoMark'
import { CAPGO_LOCKUP_MARK_TRANSFORM, CAPGO_LOCKUP_TEXT_X, CAPGO_LOCKUP_VIEWBOX_ATTR, CAPGO_WORDTYPE_PATH, CAPGO_WORDTYPE_TRANSFORM } from '../../apps/web/src/config/capgoWordtype'

export const BRAND_BANNER_NAVY = '#002444'
export const BRAND_ICON_NAVY = '#001827'

function lockupPaths(fill: string): string {
  return `<g fill="${fill}">
    <path fill-rule="evenodd" transform="${CAPGO_LOCKUP_MARK_TRANSFORM}" d="${CAPGO_MARK_PATH}"/>
    <path transform="translate(${CAPGO_LOCKUP_TEXT_X} 0) ${CAPGO_WORDTYPE_TRANSFORM}" d="${CAPGO_WORDTYPE_PATH}"/>
  </g>`
}

export function capgoLockupSvg(options: { background?: string; fill: string }): string {
  const background = options.background ? `<rect x="0" y="0" width="100%" height="100%" fill="${options.background}"/>` : ''
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${CAPGO_LOCKUP_VIEWBOX_ATTR}" role="img" aria-label="Capgo">
  ${background}
  ${lockupPaths(options.fill)}
</svg>`
}

export function capgoIconSvg(options: { background?: string; markFill: string; roundedTile?: boolean }): string {
  const { background, markFill, roundedTile = true } = options
  const bg = background ? (roundedTile ? `<rect width="1024" height="1024" rx="224" fill="${background}"/>` : `<rect width="1024" height="1024" fill="${background}"/>`) : ''
  const mark = `<path fill="${markFill}" fill-rule="evenodd" transform="${CAPGO_MARK_TRANSFORM}" d="${CAPGO_MARK_PATH}"/>`
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" role="img" aria-label="Capgo">
  ${bg}
  ${mark}
</svg>`
}

export function capgoIconMarkOnlySvg(markFill: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${CAPGO_MARK_VIEWBOX}" role="img" aria-label="Capgo mark">
  <path fill="${markFill}" fill-rule="evenodd" transform="${CAPGO_MARK_TRANSFORM}" d="${CAPGO_MARK_PATH}"/>
</svg>`
}
