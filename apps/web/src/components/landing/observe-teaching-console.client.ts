export type ObserveConsoleStep = 'deploy' | 'observe' | 'investigate'

export type ObserveReleaseId = 'stable' | 'rollout'

type ReleaseData = {
  id: ObserveReleaseId
  version: string
  channel: string
  deployed: string
  issueFree: string
  nativeIssues: string
  launchP90: string
  webViewP90: string
  trackedDevices: string
  versionIssueFree: string
  versionLaunchP90: string
  versionWebViewP90: string
  versionEvents: string
  versionDevices: string
  topError: string
  topErrorShare: string
  topErrorEvents: string
  errorsInPeriod: string
  affectedDevices: string
  errorTypes: string
  errorPrimaryCount: string
  errorSecondaryCount: string
  errorTertiaryCount: string
  errorQuaternaryCount: string
  errorSecondaryLabel: string
  errorTertiaryLabel: string
  errorQuaternaryLabel: string
  affectedVersion: string
  affectedSummary: string
  secondaryAffectedVersion: string
  secondaryAffectedAction: string
  secondaryAffectedSummary: string
}

const RELEASES: Record<ObserveReleaseId, ReleaseData> = {
  stable: {
    id: 'stable',
    version: '4.8.0',
    channel: 'production',
    deployed: 'Jan 5, 2026',
    issueFree: '98.6%',
    nativeIssues: '326',
    launchP90: '781 ms',
    webViewP90: '1.2 s',
    trackedDevices: '8,240',
    versionIssueFree: '98.9%',
    versionLaunchP90: '760 ms',
    versionWebViewP90: '1.1 s',
    versionEvents: '42.1k',
    versionDevices: '6,980',
    topError: 'WebView JavaScript error',
    topErrorShare: '18.2%',
    topErrorEvents: '34',
    errorsInPeriod: '184',
    affectedDevices: '37',
    errorTypes: '5',
    errorPrimaryCount: '34',
    errorSecondaryCount: '28',
    errorTertiaryCount: '21',
    errorQuaternaryCount: '12',
    errorSecondaryLabel: 'App crash',
    errorTertiaryLabel: 'Bundle download failed',
    errorQuaternaryLabel: 'Checksum validation failed',
    affectedVersion: '4.8.0',
    affectedSummary: '18 events · 5 devices',
    secondaryAffectedVersion: '4.7.9',
    secondaryAffectedAction: 'Launch timeout',
    secondaryAffectedSummary: '9 events · 4 devices',
  },
  rollout: {
    id: 'rollout',
    version: '4.8.1',
    channel: 'production',
    deployed: 'Jan 12, 2026',
    issueFree: '91.2%',
    nativeIssues: '892',
    launchP90: '1.4 s',
    webViewP90: '2.1 s',
    trackedDevices: '8,240',
    versionIssueFree: '88.4%',
    versionLaunchP90: '1.4 s',
    versionWebViewP90: '2.1 s',
    versionEvents: '18.6k',
    versionDevices: '2,140',
    topError: 'Bundle download failed',
    topErrorShare: '44.6%',
    topErrorEvents: '82',
    errorsInPeriod: '312',
    affectedDevices: '96',
    errorTypes: '7',
    errorPrimaryCount: '82',
    errorSecondaryCount: '44',
    errorTertiaryCount: '31',
    errorQuaternaryCount: '18',
    errorSecondaryLabel: 'App crash',
    errorTertiaryLabel: 'WebView JavaScript error',
    errorQuaternaryLabel: 'Checksum validation failed',
    affectedVersion: '4.8.1',
    affectedSummary: '55 events · 14 devices',
    secondaryAffectedVersion: '4.8.0',
    secondaryAffectedAction: 'App crash',
    secondaryAffectedSummary: '12 events · 6 devices',
  },
}

const STEP_ORDER: ObserveConsoleStep[] = ['deploy', 'observe', 'investigate']

const STEP_STATUS: Record<ObserveConsoleStep, string> = {
  deploy: 'Step 1: Select a release marker to anchor the rollout you just shipped.',
  observe: 'Step 2: Compare issue-free devices, native issues, and P90 timing for the selected release.',
  investigate: 'Step 3: Follow the trend into Logs Insights for errors, versions, and devices.',
}

function prefersReducedMotion() {
  return typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function setupObserveTeachingConsole(root: HTMLElement) {
  const statusEl = root.querySelector<HTMLElement>('[data-observe-status]')
  const stepButtons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-observe-step]'))
  const releaseButtons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-observe-release]'))
  const investigateButton = root.querySelector<HTMLButtonElement>('[data-observe-investigate]')
  const healthPanel = root.querySelector<HTMLElement>('[data-observe-panel="health"]')
  const logsPanel = root.querySelector<HTMLElement>('[data-observe-panel="logs"]')
  const tabObserve = root.querySelector<HTMLButtonElement>('[data-observe-tab="observe"]')
  const tabLogs = root.querySelector<HTMLButtonElement>('[data-observe-tab="logs"]')

  let currentStep: ObserveConsoleStep = 'deploy'
  let selectedRelease: ObserveReleaseId = 'stable'
  let autoTimer: ReturnType<typeof setTimeout> | undefined
  let hintTimer: ReturnType<typeof setTimeout> | undefined
  let userInteracted = false
  let autoAdvanceCancelled = false

  function announce(message: string) {
    if (statusEl) statusEl.textContent = message
  }

  function setStep(step: ObserveConsoleStep, fromUser = false, focusStep = fromUser) {
    if (fromUser) userInteracted = true
    currentStep = step
    root.dataset.step = step

    for (const button of stepButtons) {
      const stepName = button.dataset.observeStep as ObserveConsoleStep
      const isActive = stepName === step
      button.classList.toggle('is-active', isActive)
      button.setAttribute('aria-current', isActive ? 'step' : 'false')
    }

    const onHealth = step !== 'investigate'
    healthPanel?.toggleAttribute('hidden', !onHealth)
    logsPanel?.toggleAttribute('hidden', onHealth)
    tabObserve?.classList.toggle('is-active', onHealth)
    tabLogs?.classList.toggle('is-active', !onHealth)
    tabObserve?.setAttribute('aria-selected', onHealth ? 'true' : 'false')
    tabLogs?.setAttribute('aria-selected', !onHealth ? 'true' : 'false')

    if (investigateButton) {
      investigateButton.hidden = step === 'investigate'
    }

    if (step === 'observe') {
      const data = RELEASES[selectedRelease]
      announce(`Step 2: Release v${data.version} on ${data.channel} — issue-free ${data.issueFree}, native issues ${data.nativeIssues}.`)
    } else {
      announce(STEP_STATUS[step])
    }

    if (focusStep) {
      stepButtons.find((button) => button.dataset.observeStep === step)?.focus()
    }
  }

  function applyRelease(releaseId: ObserveReleaseId, fromUser = false) {
    selectedRelease = releaseId
    const data = RELEASES[releaseId]
    root.dataset.release = releaseId

    for (const button of releaseButtons) {
      const id = button.dataset.observeRelease as ObserveReleaseId
      const selected = id === releaseId
      button.classList.toggle('is-selected', selected)
      button.setAttribute('aria-pressed', selected ? 'true' : 'false')
    }

    for (const [key, value] of Object.entries(data)) {
      root.querySelectorAll<HTMLElement>(`[data-metric="${key}"]`).forEach((el) => {
        el.textContent = value
      })
    }

    const versionRow = root.querySelector<HTMLElement>('[data-observe-version-row]')
    const contextRow = root.querySelector<HTMLElement>('[data-observe-version-context]')
    if (versionRow) {
      versionRow.classList.add('otc-version-focus')
      versionRow.dataset.release = releaseId
    }
    if (contextRow) {
      contextRow.hidden = releaseId !== 'rollout'
    }

    root.classList.toggle('is-rollout', releaseId === 'rollout')

    if (fromUser && currentStep === 'deploy') {
      scheduleAutoInvestigate()
      setStep('observe')
    }
  }

  function scheduleAutoInvestigate() {
    if (prefersReducedMotion() || autoAdvanceCancelled) return
    clearTimeout(autoTimer)
    autoTimer = setTimeout(() => {
      if (!autoAdvanceCancelled && currentStep === 'observe') {
        setStep('investigate', false, true)
      }
    }, 4200)
  }

  function cancelAutoAdvance() {
    autoAdvanceCancelled = true
    clearAuto()
  }

  function clearAuto() {
    clearTimeout(autoTimer)
    clearTimeout(hintTimer)
  }

  for (const button of stepButtons) {
    button.addEventListener('click', () => {
      cancelAutoAdvance()
      const step = button.dataset.observeStep as ObserveConsoleStep
      setStep(step, true)
      if (step === 'observe') scheduleAutoInvestigate()
    })
  }

  for (const button of releaseButtons) {
    button.addEventListener('click', () => {
      applyRelease(button.dataset.observeRelease as ObserveReleaseId, true)
    })
  }

  investigateButton?.addEventListener('click', () => {
    cancelAutoAdvance()
    setStep('investigate', true, true)
  })

  tabObserve?.addEventListener('click', () => {
    cancelAutoAdvance()
    setStep('observe', true)
  })

  tabLogs?.addEventListener('click', () => {
    cancelAutoAdvance()
    setStep('investigate', true, true)
  })

  root.addEventListener('keydown', (event) => {
    if (!(event.target instanceof HTMLElement) || !root.contains(event.target)) return
    if (event.target.closest('[data-observe-tab]')) return
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    cancelAutoAdvance()
    const index = STEP_ORDER.indexOf(currentStep)
    const nextIndex = event.key === 'ArrowRight' ? Math.min(index + 1, STEP_ORDER.length - 1) : Math.max(index - 1, 0)
    const nextStep = STEP_ORDER[nextIndex]
    setStep(nextStep, true, true)
  })

  if (prefersReducedMotion()) {
    applyRelease('rollout')
    setStep('investigate')
    return
  }

  applyRelease('stable')
  setStep('deploy')

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (!entry?.isIntersecting || userInteracted) return
      hintTimer = setTimeout(() => {
        if (!userInteracted && currentStep === 'deploy') {
          root.classList.add('is-hinting')
          setTimeout(() => root.classList.remove('is-hinting'), 1600)
        }
      }, 700)
      observer.disconnect()
    },
    { threshold: 0.35 },
  )
  observer.observe(root)

  root.addEventListener(
    'pointerdown',
    (event) => {
      const target = event.target
      if (!(target instanceof HTMLElement)) return
      if (!target.closest('[data-observe-step], [data-observe-tab]')) return
      userInteracted = true
      cancelAutoAdvance()
      root.classList.remove('is-hinting')
    },
    true,
  )
}
