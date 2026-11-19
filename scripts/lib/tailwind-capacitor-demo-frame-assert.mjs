/**
 * @param {import('playwright').FrameLocator | import('playwright').Frame} frameLike
 * @param {{ minHeight?: number, minWidth?: number }} [options]
 */
export async function assertDemoFrameHasVisibleControl(frameLike, options = {}) {
  const minHeight = options.minHeight ?? 20
  const minWidth = options.minWidth ?? 48
  const locator =
    'locator' in frameLike
      ? frameLike.locator(
          '#tc-demo-root button, #tc-demo-root [role="button"], #tc-demo-root .button, #tc-demo-root input, #tc-demo-root select, #tc-demo-root textarea, #tc-demo-root [role="switch"], #tc-demo-root [role="checkbox"], #tc-demo-root [role="radio"], #tc-demo-root [role="slider"], #tc-demo-root [role="tab"], #tc-demo-root [role="progressbar"]',
        )
      : frameLike.locator(
          'button, [role="button"], .button, input, select, textarea, [role="switch"], [role="checkbox"], [role="radio"], [role="slider"], [role="tab"], [role="progressbar"]',
        )

  const count = await locator.count()
  if (count < 1) {
    throw new Error('demo frame has no interactive control nodes')
  }

  for (let i = 0; i < count; i += 1) {
    const control = locator.nth(i)
    const box = await control.boundingBox()
    if (!box || box.width < minWidth || box.height < minHeight) continue
    const visible = await control.evaluate((el) => {
      const style = getComputedStyle(el)
      if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) < 0.05) return false
      const rect = el.getBoundingClientRect()
      if (rect.width < 1 || rect.height < 1) return false
      const root = document.getElementById('tc-demo-root')
      if (!root) return false
      const rootRect = root.getBoundingClientRect()
      const intersects =
        rect.right > rootRect.left + 4 &&
        rect.left < rootRect.right - 4 &&
        rect.bottom > rootRect.top + 4 &&
        rect.top < rootRect.bottom - 4
      return intersects
    })
    if (visible) return
  }

  throw new Error('demo frame has no visible sized interactive control in the shell viewport')
}