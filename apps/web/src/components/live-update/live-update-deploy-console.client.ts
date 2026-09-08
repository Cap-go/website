export type LiveUpdateConsoleCopy = {
  steps: [string, string, string]
  status: {
    uploadIdle: string
    uploadDone: string
    channelIdle: string
    channelDone: string
    rollout10: string
    rolloutHealth: string
    rolloutDone: string
  }
  actions: {
    upload: string
    channel: string
    viewRollout: string
  }
  hint: string
  bundleVersion: string
  bundleSize: string
  checksum: string
  checksumBadge: string
  channelProduction: string
  channelStaging: string
  fieldBundle: string
  fieldChecksum: string
  fieldChannel: string
  fieldRollout: string
  rolloutLabel: string
  healthOk: string
  orgName: string
  appName: string
  tabBundles: string
}

type Step = 0 | 1 | 2

const AUTO_ADVANCE_MS = 4200

export function setupLiveUpdateDeployConsole(root: HTMLElement, copy: LiveUpdateConsoleCopy) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const statusEl = root.querySelector<HTMLElement>('[data-console-status]')
  const actionBtn = root.querySelector<HTMLButtonElement>('[data-console-action]')
  const stepButtons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-console-step]'))
  const panels = Array.from(root.querySelectorAll<HTMLElement>('[data-console-panel]'))
  const channelButtons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-channel]'))
  const rolloutBar = root.querySelector<HTMLElement>('[data-rollout-bar]')
  const rolloutPercent = root.querySelector<HTMLElement>('[data-rollout-percent]')
  const rolloutHealth = root.querySelector<HTMLElement>('[data-rollout-health]')
  const channelNameEl = root.querySelector<HTMLElement>('[data-channel-name]')

  if (!statusEl || !actionBtn || stepButtons.length !== 3 || panels.length !== 3) return

  const status = statusEl
  const action = actionBtn

  let step: Step = 0
  let selectedChannel = 'production'
  let rolloutProgress = 0
  let rolloutComplete = false
  let autoTimer: ReturnType<typeof setTimeout> | null = null
  let rolloutTimer: ReturnType<typeof setTimeout> | null = null
  let userInterrupted = false

  function clearTimers() {
    if (autoTimer) {
      clearTimeout(autoTimer)
      autoTimer = null
    }
    if (rolloutTimer) {
      clearTimeout(rolloutTimer)
      rolloutTimer = null
    }
  }

  function interruptAuto() {
    if (!userInterrupted) {
      userInterrupted = true
      clearTimers()
    }
  }

  function setStatus(text: string) {
    status.textContent = text
  }

  function setRollout(percent: number, healthVisible: boolean) {
    rolloutProgress = percent
    if (rolloutBar) rolloutBar.style.width = `${percent}%`
    if (rolloutPercent) rolloutPercent.textContent = `${percent}%`
    if (rolloutHealth) rolloutHealth.hidden = !healthVisible
  }

  function updateStepUi() {
    stepButtons.forEach((button, index) => {
      const isActive = index === step
      const isComplete = index < step || (index === 2 && rolloutComplete)
      button.classList.toggle('is-active', isActive)
      button.classList.toggle('is-complete', isComplete)
      button.setAttribute('aria-selected', isActive ? 'true' : 'false')
      button.tabIndex = isActive ? 0 : -1
    })

    panels.forEach((panel, index) => {
      const isActive = index === step
      panel.hidden = !isActive
      panel.setAttribute('aria-hidden', isActive ? 'false' : 'true')
    })

    channelButtons.forEach((button) => {
      const isSelected = button.dataset.channel === selectedChannel
      button.classList.toggle('is-selected', isSelected)
      button.setAttribute('aria-pressed', isSelected ? 'true' : 'false')
    })

    if (channelNameEl) {
      channelNameEl.textContent = selectedChannel === 'production' ? copy.channelProduction : copy.channelStaging
    }

    if (step === 0) {
      action.textContent = copy.actions.upload
      action.disabled = false
      setStatus(copy.status.uploadIdle)
    } else if (step === 1) {
      action.textContent = copy.actions.channel
      action.disabled = false
      setStatus(copy.status.channelIdle)
    } else {
      action.textContent = copy.actions.viewRollout
      action.disabled = rolloutComplete
      if (!rolloutComplete) {
        setStatus(copy.status.rollout10)
      } else {
        setStatus(copy.status.rolloutDone)
      }
    }
  }

  function runRolloutSequence() {
    clearTimers()
    if (reducedMotion) {
      setRollout(100, true)
      setStatus(copy.status.rolloutDone)
      rolloutComplete = true
      action.disabled = true
      updateStepUi()
      return
    }

    setRollout(10, false)
    setStatus(copy.status.rollout10)

    setTimeout(() => {
      setRollout(10, true)
      setStatus(copy.status.rolloutHealth)
    }, 900)

    setTimeout(() => {
      setRollout(55, true)
    }, 1800)

    rolloutTimer = setTimeout(() => {
      setRollout(100, true)
      setStatus(copy.status.rolloutDone)
      rolloutComplete = true
      action.disabled = true
      updateStepUi()
    }, 2800)
  }

  function goToStep(next: Step) {
    step = next
    updateStepUi()
    if (step === 2 && !rolloutComplete && rolloutProgress === 0) {
      runRolloutSequence()
    }
    scheduleAutoAdvance()
  }

  function advance() {
    interruptAuto()
    if (step === 0) {
      setStatus(copy.status.uploadDone)
      goToStep(1)
      return
    }
    if (step === 1) {
      setStatus(copy.status.channelDone)
      goToStep(2)
      return
    }
    if (!rolloutComplete) {
      runRolloutSequence()
    }
  }

  function scheduleAutoAdvance() {
    if (userInterrupted || reducedMotion || rolloutComplete) return
    clearTimers()
    if (step === 2) return

    autoTimer = setTimeout(() => {
      if (step === 0) {
        setStatus(copy.status.uploadDone)
        goToStep(1)
      } else if (step === 1) {
        setStatus(copy.status.channelDone)
        goToStep(2)
      }
    }, AUTO_ADVANCE_MS)
  }

  stepButtons.forEach((button) => {
    button.addEventListener('click', () => {
      interruptAuto()
      const target = Number(button.dataset.consoleStep) as Step
      if (Number.isNaN(target)) return
      if (target > step && target !== step + 1) return
      if (target < step) {
        if (target === 0) {
          rolloutComplete = false
          rolloutProgress = 0
          setRollout(0, false)
        }
        goToStep(target)
        return
      }
      if (target === step + 1) advance()
      else goToStep(target)
    })
  })

  channelButtons.forEach((button) => {
    button.addEventListener('click', () => {
      interruptAuto()
      const channel = button.dataset.channel
      if (!channel) return
      selectedChannel = channel
      updateStepUi()
    })
  })

  action.addEventListener('click', advance)

  root.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    const target = event.target
    if (target instanceof HTMLElement && target.closest('[data-console-step]')) {
      event.preventDefault()
      target.closest<HTMLButtonElement>('[data-console-step]')?.click()
    }
  })

  updateStepUi()
  scheduleAutoAdvance()

  return () => clearTimers()
}
