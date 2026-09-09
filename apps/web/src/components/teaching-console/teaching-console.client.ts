export type TeachingStepHandler = {
  id: string
  enter: (ctx: TeachingContext) => void
  leave?: (ctx: TeachingContext) => void
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
  registerCancel: (fn: () => void) => void
}

export type TeachingConsoleOptions = {
  /** Defer enter(0)/auto-advance until the demo scrolls into view. */
  startWhenVisible?: boolean
  visibilityThreshold?: number
}

const AUTO_MS = 3800

function prefersReducedMotion() {
  return typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
}

const terminalRuns = new WeakMap<HTMLElement, number>()

export function setupTeachingConsole(
  root: HTMLElement,
  steps: TeachingStepHandler[],
  options: TeachingConsoleOptions = {},
) {
  if (!steps.length || root.dataset.tcReady === '1') return
  root.dataset.tcReady = '1'

  const statusEl = root.querySelector<HTMLElement>('[data-tc-status]')
  const actionBtn = root.querySelector<HTMLButtonElement>('[data-tc-action]')
  const stepButtons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-tc-step-btn]'))
  const reduced = prefersReducedMotion()
  const cancels = new Set<() => void>()

  let index = 0
  let timer: ReturnType<typeof setTimeout> | undefined
  let interrupted = false
  let finished = false
  let started = false
  let visibilityObserver: IntersectionObserver | undefined

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
    registerCancel(fn) {
      cancels.add(fn)
    },
  }

  function runCancels() {
    cancels.forEach((fn) => {
      try {
        fn()
      } catch {
        /* ignore */
      }
    })
    cancels.clear()
  }

  function clearTimer() {
    if (timer) clearTimeout(timer)
    timer = undefined
  }

  function markStarted() {
    if (started) return
    started = true
    visibilityObserver?.disconnect()
    visibilityObserver = undefined
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
    markStarted()
    const next = Math.max(0, Math.min(i, steps.length - 1))
    if (next !== index) {
      steps[index]?.leave?.(ctx)
      runCancels()
    }
    index = next
    const step = steps[index]
    paintStepChrome()
    ctx.setActionDisabled(false)
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
      finished = false
      enter(i)
    })
  })

  actionBtn?.addEventListener('click', advance)

  root.addEventListener(
    'pointerdown',
    (event) => {
      if (interrupted) return
      const target = event.target as Element | null
      // Catalog / channel / marker toggles update local state without killing the teaching flow.
      if (target?.closest('[data-plugin], [data-lu-channel], [data-observe-release]')) return
      interrupted = true
      clearTimer()
    },
    { capture: true },
  )

  function startReducedMotion() {
    for (let i = 0; i < steps.length; i += 1) {
      index = i
      const step = steps[i]
      if (step.actionLabel) ctx.setActionLabel(step.actionLabel)
      if (step.status) ctx.setStatus(step.status)
      step.enter(ctx)
    }
    finished = true
    paintStepChrome()
    ctx.setActionDisabled(true)
  }

  function start() {
    if (started) return
    markStarted()
    if (reduced) {
      startReducedMotion()
      return
    }
    enter(0)
  }

  if (options.startWhenVisible && typeof IntersectionObserver !== 'undefined') {
    // Prevent footer action from advancing before enter(0) has run.
    ctx.setActionDisabled(true)
    visibilityObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          visibilityObserver?.disconnect()
          visibilityObserver = undefined
          start()
        }
      },
      { threshold: options.visibilityThreshold ?? 0.25 },
    )
    visibilityObserver.observe(root)
  } else {
    start()
  }
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
  const runId = (terminalRuns.get(el) ?? 0) + 1
  terminalRuns.set(el, runId)

  if (reduced) {
    el.innerHTML = lines.join('\n')
    onDone?.()
    return
  }

  let i = 0
  el.innerHTML = ''
  const tick = () => {
    if (terminalRuns.get(el) !== runId) return
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
