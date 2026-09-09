export type TeachingStepHandler = {
  id: string
  enter: (ctx: TeachingContext) => void
  actionLabel?: string
  status?: string
}

export type TeachingContext = {
  root: HTMLElement
  setStatus: (text: string) => void
  setActionLabel: (text: string) => void
  setActionDisabled: (disabled: boolean) => void
  prefersReducedMotion: boolean
  query: <T extends Element = HTMLElement>(selector: string) => T | null
  queryAll: <T extends Element = HTMLElement>(selector: string) => T[]
}

const AUTO_MS = 3800

function prefersReducedMotion() {
  return typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function setupTeachingConsole(root: HTMLElement, steps: TeachingStepHandler[]) {
  if (!steps.length || root.dataset.tcReady === '1') return
  root.dataset.tcReady = '1'

  const statusEl = root.querySelector<HTMLElement>('[data-tc-status]')
  const actionBtn = root.querySelector<HTMLButtonElement>('[data-tc-action]')
  const stepButtons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-tc-step-btn]'))
  const reduced = prefersReducedMotion()

  let index = 0
  let timer: ReturnType<typeof setTimeout> | undefined
  let interrupted = false
  let finished = false

  const ctx: TeachingContext = {
    root,
    prefersReducedMotion: reduced,
    setStatus(text) {
      if (statusEl) statusEl.textContent = text
    },
    setActionLabel(text) {
      if (actionBtn) actionBtn.textContent = text
    },
    setActionDisabled(disabled) {
      if (actionBtn) actionBtn.disabled = disabled
    },
    query: (selector) => root.querySelector(selector),
    queryAll: (selector) => Array.from(root.querySelectorAll(selector)),
  }

  function clearTimer() {
    if (timer) clearTimeout(timer)
    timer = undefined
  }

  function paintStepChrome() {
    stepButtons.forEach((button, i) => {
      const active = i === index
      const complete = i < index || (finished && i === steps.length - 1)
      button.classList.toggle('is-active', active)
      button.classList.toggle('is-complete', complete)
      button.setAttribute('aria-current', active ? 'step' : 'false')
    })
    root.dataset.tcStep = steps[index]?.id ?? ''
  }

  function enter(i: number) {
    index = Math.max(0, Math.min(i, steps.length - 1))
    const step = steps[index]
    paintStepChrome()
    if (step.actionLabel) ctx.setActionLabel(step.actionLabel)
    if (step.status) ctx.setStatus(step.status)
    step.enter(ctx)
    schedule()
  }

  function schedule() {
    clearTimer()
    if (interrupted || reduced || finished || index >= steps.length - 1) return
    timer = setTimeout(() => {
      if (!interrupted && !finished) enter(index + 1)
    }, AUTO_MS)
  }

  function advance() {
    interrupted = true
    clearTimer()
    if (index >= steps.length - 1) {
      finished = true
      ctx.setActionDisabled(true)
      paintStepChrome()
      return
    }
    enter(index + 1)
  }

  stepButtons.forEach((button, i) => {
    button.addEventListener('click', () => {
      interrupted = true
      clearTimer()
      enter(i)
    })
  })

  actionBtn?.addEventListener('click', advance)

  root.addEventListener(
    'pointerdown',
    () => {
      interrupted = true
      clearTimer()
    },
    { once: true, capture: true },
  )

  if (reduced) {
    enter(steps.length - 1)
    finished = true
    ctx.setActionDisabled(true)
    return
  }

  enter(0)
}

export function animateProgress(el: HTMLElement | null, percent: number, reduced: boolean) {
  if (!el) return
  el.style.width = `${percent}%`
  if (reduced) el.style.transition = 'none'
}

export function typeTerminalLines(
  el: HTMLElement | null,
  lines: string[],
  reduced: boolean,
  onDone?: () => void,
) {
  if (!el) return
  if (reduced) {
    el.innerHTML = lines.join('\n')
    onDone?.()
    return
  }

  let i = 0
  el.innerHTML = ''
  const tick = () => {
    if (i >= lines.length) {
      onDone?.()
      return
    }
    el.innerHTML += (i === 0 ? '' : '\n') + lines[i]
    i += 1
    setTimeout(tick, 220)
  }
  tick()
}
