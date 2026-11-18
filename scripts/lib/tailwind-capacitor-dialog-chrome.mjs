/**
 * Pixel validation for Konsta Dialog chrome inside #tc-demo-root screenshots.
 */

import sharp from 'sharp'

/**
 * @param {string} raw
 * @param {boolean} dark
 */
export function effectiveHairlineCss(raw, dark) {
  const t = (raw ?? '').trim()
  if (dark && (!t || t === '#0003' || t === 'rgba(0, 0, 0, 0.2)')) {
    return 'rgba(255, 255, 255, 0.15)'
  }
  if (!t) return dark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.2)'
  return t
}

/**
 * @param {string} color
 */
function parseCssRgbA(color) {
  const rgba = color.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/)
  if (rgba) {
    return {
      r: Number(rgba[1]),
      g: Number(rgba[2]),
      b: Number(rgba[3]),
      a: rgba[4] !== undefined ? Number(rgba[4]) : 1,
    }
  }
  const hex = color.match(/^#([\da-f]{3,8})$/i)
  if (!hex) return null
  let h = hex[1]
  if (h.length === 3 || h.length === 4) {
    h = h
      .split('')
      .map((c) => c + c)
      .join('')
  }
  if (h.length === 6) {
    return {
      r: Number.parseInt(h.slice(0, 2), 16),
      g: Number.parseInt(h.slice(2, 4), 16),
      b: Number.parseInt(h.slice(4, 6), 16),
      a: 1,
    }
  }
  if (h.length === 8) {
    return {
      r: Number.parseInt(h.slice(0, 2), 16),
      g: Number.parseInt(h.slice(2, 4), 16),
      b: Number.parseInt(h.slice(4, 6), 16),
      a: Number.parseInt(h.slice(6, 8), 16) / 255,
    }
  }
  return null
}

/**
 * @param {string} color
 * @param {number} surfaceRgb
 */
export function compositeHairlineOnSurface(color, surfaceRgb = 255) {
  const parsed = parseCssRgbA(color)
  if (!parsed) return { r: 204, g: 204, b: 204 }
  const blend = (c) => Math.round(c * parsed.a + surfaceRgb * (1 - parsed.a))
  return { r: blend(parsed.r), g: blend(parsed.g), b: blend(parsed.b) }
}

/**
 * @param {{
 *   dialog: { left: number; right: number; top: number; bottom: number };
 *   dividerY: number;
 *   sampleAboveY: number;
 *   root?: { x: number; y: number };
 * }} metrics
 */
export function dialogMetricsRelativeToRootCrop(metrics) {
  const ox = metrics.root?.x ?? 0
  const oy = metrics.root?.y ?? 0
  return {
    ...metrics,
    dividerY: metrics.dividerY - oy,
    sampleAboveY: metrics.sampleAboveY - oy,
    dialog: {
      left: metrics.dialog.left - ox,
      right: metrics.dialog.right - ox,
      bottom: metrics.dialog.bottom - oy,
      top: metrics.dialog.top - oy,
    },
  }
}

/**
 * @param {Uint8Array | Buffer} data
 * @param {number} w
 * @param {number} channels
 * @param {number} x
 * @param {number} y
 */
function rgbAt(data, w, channels, x, y) {
  const i = (y * w + x) * channels
  return [data[i], data[i + 1], data[i + 2]]
}

/**
 * @param {import('sharp').Sharp} shot
 * @param {{
 *   dialog: { left: number; right: number; top: number; bottom: number };
 *   dividerY: number;
 *   sampleAboveY: number;
 *   hasHairline: boolean;
 *   hairlineCss: string;
 *   dialogSurfaceRgb: number;
 *   dark: boolean;
 *   scale?: number;
 * }} opts
 */
export async function analyzeDialogChromeScreenshot(shot, opts) {
  const scale = opts.scale ?? 1
  const dLeft = Math.round(opts.dialog.left * scale)
  const dRight = Math.round(opts.dialog.right * scale)
  const dTop = Math.round(opts.dialog.top * scale)
  const dBottom = Math.round(opts.dialog.bottom * scale)
  const dividerRow = Math.round(opts.dividerY * scale)
  const sampleY = Math.max(dTop + 2, Math.round(opts.sampleAboveY * scale))
  const edgePad = Math.max(4, Math.round(6 * scale))

  const { data, info } = await shot.ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const w = info.width
  const h = info.height
  const ch = info.channels

  const hairlineCss = effectiveHairlineCss(opts.hairlineCss, opts.dark)
  const hairline = compositeHairlineOnSurface(hairlineCss, opts.dialogSurfaceRgb)
  const surfaceMin = opts.dark ? 28 : 145

  const scanLeft = Math.max(0, dLeft + edgePad)
  const scanRight = Math.min(w - 1, dRight - edgePad)

  let visibleLeft = w
  let visibleRight = 0
  for (let x = scanLeft; x <= scanRight; x++) {
    const [r, g, b] = rgbAt(data, w, ch, x, sampleY)
    const lum = (r + g + b) / 3
    if (lum > surfaceMin) {
      visibleLeft = Math.min(visibleLeft, x)
      visibleRight = Math.max(visibleRight, x)
    }
  }

  const errors = []

  let lineLeft = w
  let lineRight = 0
  let lineRow = -1
  if (opts.hasHairline) {
    const contrastFloor = opts.dark ? 8 : 14
    const heavyLum = opts.dark ? 22 : 80
    for (let rowY = dividerRow - 6; rowY <= dividerRow + 4; rowY++) {
      if (rowY < 0 || rowY >= h) continue
      let l = w
      let r = 0
      let hits = 0
      let heavyHits = 0
      const lineSamples = []
      for (let x = scanLeft; x <= scanRight; x++) {
        const [pr, pg, pb] = rgbAt(data, w, ch, x, sampleY)
        const [lr, lg, lb] = rgbAt(data, w, ch, x, rowY)
        const lum = (lr + lg + lb) / 3
        const above = (pr + pg + pb) / 3
        if (!opts.dark && lum < heavyLum) heavyHits++
        if (opts.dark && above - lum > 18 && lum < heavyLum) heavyHits++
        if (Math.abs(above - lum) > contrastFloor) {
          l = Math.min(l, x)
          r = Math.max(r, x)
          hits++
          lineSamples.push([lr, lg, lb])
        }
      }
      if (l < r && hits > (scanRight - scanLeft) * 0.2) {
        lineLeft = l
        lineRight = r
        lineRow = rowY
        if (heavyHits > Math.max(8, hits * 0.35)) {
          errors.push(`divider uses heavy black pixels (count=${heavyHits})`)
        }
        if (lineSamples.length) {
          const avg = lineSamples.reduce(
            (acc, [cr, cg, cb]) => [acc[0] + cr, acc[1] + cg, acc[2] + cb],
            [0, 0, 0],
          )
          const n = lineSamples.length
          const ar = avg[0] / n
          const ag = avg[1] / n
          const ab = avg[2] / n
          const dr = Math.abs(ar - hairline.r)
          const dg = Math.abs(ag - hairline.g)
          const db = Math.abs(ab - hairline.b)
          const tol = opts.dark ? 36 : 28
          if (dr > tol || dg > tol || db > tol) {
            errors.push(
              `divider color rgb(${ar.toFixed(0)},${ag.toFixed(0)},${ab.toFixed(0)}) vs hairline rgb(${hairline.r},${hairline.g},${hairline.b})`,
            )
          }
        }
        break
      }
    }

    if (visibleLeft >= visibleRight) {
      errors.push('no visible dialog fill above divider')
    } else if (lineRow < 0) {
      errors.push(`no divider row near y=${dividerRow}`)
    } else {
      const insetMin = Math.max(8, Math.round(12 * scale))
      const innerLeft = dLeft + insetMin
      const innerRight = dRight - insetMin
      if (lineLeft < innerLeft || lineRight > innerRight) {
        errors.push(
          `divider spans [${lineLeft},${lineRight}] outside inset box [${innerLeft},${innerRight}] (need ≥${insetMin}px from dialog edge)`,
        )
      }
      if (lineLeft < dLeft + edgePad || lineRight > dRight - edgePad) {
        errors.push(`divider past dialog interior [${dLeft + edgePad},${dRight - edgePad}]`)
      }
    }
  }

  let blueEdge = 0
  const y0 = Math.max(dTop, lineRow > 0 ? lineRow : dividerRow)
  for (let y = y0; y <= Math.min(h - 1, dBottom); y++) {
    for (let dx = -3; dx <= 3; dx++) {
      const x = dRight + dx
      if (x < 0 || x >= w) continue
      const [r, g, b] = rgbAt(data, w, ch, x, y)
      const lum = (r + g + b) / 3
      if (opts.dark && lum < 24) continue
      if (!opts.dark && lum > 250) continue
      if (b > 170 && b > r + 45 && b > g + 15) blueEdge++
    }
  }
  if (blueEdge > 6) {
    errors.push(`blue edge strip count=${blueEdge} (x≈${dRight - 3}..${dRight + 3}, y=${y0}..${dBottom})`)
  }

  return {
    ok: errors.length === 0,
    errors,
    detail: {
      visible: [visibleLeft, visibleRight],
      line: lineRow >= 0 ? [lineLeft, lineRight, lineRow] : null,
      dialog: [dLeft, dRight, dTop, dBottom],
      blueEdge,
      hairline,
    },
  }
}

const BODY_LEAK_MEAN_THRESHOLD = 8

/**
 * Fail when dialog body pixels change if the underlay trigger is hidden (see-through surface).
 * @param {import('playwright').Frame} frame
 */
export async function assertDialogBodyOpaque(frame) {
  const body = frame.locator('[role="dialog"] .text-sm').first()
  if (!(await body.count())) {
    return { ok: false, error: 'no dialog body text node' }
  }
  await body.waitFor({ state: 'visible', timeout: 12_000 })
  const withUnderlay = await body.screenshot()
  await frame.evaluate(() => {
    for (const el of document.querySelectorAll('.tc-demo-overlay-trigger')) {
      el.style.visibility = 'hidden'
    }
    const under = document.querySelector('.tc-demo-underlay-screen')
    if (under instanceof HTMLElement) under.style.visibility = 'hidden'
  })
  await frame.waitForTimeout(120)
  const withoutUnderlay = await body.screenshot()
  await frame.evaluate(() => {
    for (const el of document.querySelectorAll('.tc-demo-overlay-trigger')) {
      el.style.visibility = ''
    }
    const under = document.querySelector('.tc-demo-underlay-screen')
    if (under instanceof HTMLElement) under.style.visibility = ''
  })

  const { data: a, info } = await sharp(withUnderlay).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { data: b } = await sharp(withoutUnderlay).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const ch = info.channels
  const pixels = Math.min(a.length, b.length) / ch
  if (pixels < 16) return { ok: false, error: 'body crop too small' }

  let sum = 0
  for (let i = 0; i < a.length; i += ch) {
    sum += Math.abs(a[i] - b[i]) + Math.abs(a[i + 1] - b[i + 1]) + Math.abs(a[i + 2] - b[i + 2])
  }
  const mean = sum / (pixels * 3)
  return {
    ok: mean <= BODY_LEAK_MEAN_THRESHOLD,
    mean,
    threshold: BODY_LEAK_MEAN_THRESHOLD,
  }
}