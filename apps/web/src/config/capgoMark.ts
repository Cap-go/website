/**
 * Capgo brand mark: a rounded diamond with the capacitor symbol cut out.
 * The path is drawn around the origin and placed into a 1024x1024 box with CAPGO_MARK_TRANSFORM.
 * Use fill-rule="evenodd" so the symbol renders as a cutout.
 */
export const CAPGO_MARK_PATH =
  'M-190-340H190A150 150 0 0 1 340-190V190A150 150 0 0 1 190 340H-190A150 150 0 0 1-340 190V-190A150 150 0 0 1-190-340ZM-160-145A45 45 0 0 1-70-145V145A45 45 0 0 1-160 145V50H-195A45 45 0 0 1-240 5V-5A45 45 0 0 1-195-50H-160ZM160-145A45 45 0 0 0 70-145V145A45 45 0 0 0 160 145V50H195A45 45 0 0 0 240 5V-5A45 45 0 0 0 195-50H160Z'

export const CAPGO_MARK_TRANSFORM = 'translate(512 512) rotate(-45) scale(0.85)'

/** Visible bounds of the mark inside the 1024 box (154..870 on both axes). */
export const CAPGO_MARK_BOUNDS = { min: 154, size: 716 } as const

/** Tight viewBox around the visible mark. */
export const CAPGO_MARK_VIEWBOX = `${CAPGO_MARK_BOUNDS.min} ${CAPGO_MARK_BOUNDS.min} ${CAPGO_MARK_BOUNDS.size} ${CAPGO_MARK_BOUNDS.size}`

/** SVG markup drawing the mark so its visible bounds fill the square at (x, y) with side `size`. */
export function capgoMarkSvg(x: number, y: number, size: number, fill = '#ffffff'): string {
  const scale = size / CAPGO_MARK_BOUNDS.size
  const tx = x - CAPGO_MARK_BOUNDS.min * scale
  const ty = y - CAPGO_MARK_BOUNDS.min * scale
  return `<g transform="translate(${tx} ${ty}) scale(${scale})"><path fill="${fill}" fill-rule="evenodd" transform="${CAPGO_MARK_TRANSFORM}" d="${CAPGO_MARK_PATH}"/></g>`
}
