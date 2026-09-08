import gsap from 'gsap'

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const BEAT_A_HOLD = 0.7
const BEAT_B_DOWNLOAD = 2.0
const BEAT_C_RELAUNCH = 1.4

function queryParts(root: HTMLElement) {
  return {
    chrome: root.querySelectorAll('[data-ota-chrome]'),
    appUi: root.querySelectorAll('[data-ota-app-ui]'),
    staged: root.querySelector('[data-ota-staged-bundle]'),
    status: root.querySelector('[data-ota-status]'),
    progress: root.querySelector('[data-ota-progress]'),
    progressFill: root.querySelector('[data-ota-progress-fill]'),
    launchBlank: root.querySelector('[data-ota-launch-blank]'),
    liveStatus: root.querySelector('[data-ota-live-status]'),
    stack: root.querySelector('[data-ota-bundle-stack]'),
    rings: root.querySelector('[data-ota-rings]'),
  }
}

/** Show the completed OTA update state without animation (reduced-motion path). */
function setFinalState(root: HTMLElement) {
  const { chrome, staged, status, progress, progressFill, launchBlank, stack, rings, appUi } = queryParts(root)

  staged?.setAttribute('opacity', '0')
  status?.setAttribute('opacity', '0')
  progress?.setAttribute('opacity', '0')
  launchBlank?.setAttribute('opacity', '0')
  progressFill?.setAttribute('transform', 'scaleX(0)')
  stack?.setAttribute('opacity', '1')
  rings?.setAttribute('opacity', '1')
  chrome.forEach((el) => el.setAttribute('opacity', '1'))

  for (const el of [staged, progress, launchBlank, stack, rings, status, ...appUi, ...chrome]) {
    if (el instanceof SVGElement) {
      el.style.transform = ''
      gsap.set(el, { clearProps: 'opacity,transform' })
    }
  }
}

/**
 * Storyboard (~4.1s):
 * A — App open and usable.
 * B — Download progress fills while the running UI stays up; bundle stages behind.
 * C — App exits, brief launch blank, app returns with update applied.
 */
function buildTimeline(root: HTMLElement) {
  const {
    chrome,
    appUi,
    staged,
    status,
    progress,
    progressFill,
    launchBlank,
    liveStatus,
    stack,
    rings,
  } = queryParts(root)
  const statusText = root.dataset.otaStatusText ?? ''

  if (!staged || !status || !progress || !progressFill || !launchBlank || !stack || !rings || chrome.length === 0) {
    return null
  }

  gsap.set(chrome, { opacity: 1 })
  gsap.set(appUi, { opacity: 1, y: 0, scale: 1, transformOrigin: '50% 50%' })
  gsap.set(stack, { opacity: 1, y: 0 })
  gsap.set(rings, { opacity: 0.72 })
  gsap.set(status, { opacity: 0 })
  gsap.set(progress, { opacity: 0 })
  gsap.set(progressFill, { scaleX: 0, transformOrigin: '0% 50%' })
  gsap.set(launchBlank, { opacity: 0 })
  gsap.set(staged, { opacity: 0, y: 28 })
  if (liveStatus) liveStatus.textContent = ''

  const timeline = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } })
  const beatBStart = BEAT_A_HOLD
  const beatCStart = beatBStart + BEAT_B_DOWNLOAD

  timeline
    .addLabel('beatA', 0)
    .to({}, { duration: BEAT_A_HOLD })
    .addLabel('beatB', beatBStart)
    .to(
      progress,
      {
        opacity: 1,
        duration: 0.25,
      },
      'beatB',
    )
    .to(
      status,
      {
        opacity: 1,
        duration: 0.35,
        onStart: () => {
          if (liveStatus && statusText) liveStatus.textContent = statusText
        },
      },
      'beatB+=0.15',
    )
    .to(
      staged,
      {
        y: 0,
        opacity: 0.58,
        duration: 0.85,
        ease: 'power2.out',
      },
      'beatB+=0.2',
    )
    .to(
      progressFill,
      {
        scaleX: 1,
        duration: 1.55,
        ease: 'none',
      },
      'beatB+=0.25',
    )
    .to(rings, { opacity: 1, duration: 0.6 }, 'beatB+=0.35')
    .to({}, { duration: 0.25 }, 'beatB+=1.75')
    .addLabel('beatC', beatCStart)
    .to(
      appUi,
      {
        y: 58,
        opacity: 0,
        scale: 0.88,
        duration: 0.48,
        ease: 'power2.in',
        stagger: 0,
      },
      'beatC',
    )
    .to(
      [status, progress],
      {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          if (liveStatus) liveStatus.textContent = ''
        },
      },
      'beatC',
    )
    .to(
      launchBlank,
      {
        opacity: 1,
        duration: 0.28,
      },
      'beatC+=0.32',
    )
    .to(
      staged,
      {
        y: -34,
        opacity: 0,
        duration: 0.42,
        ease: 'power2.in',
      },
      'beatC+=0.38',
    )
    .to(
      launchBlank,
      {
        opacity: 0,
        duration: 0.32,
      },
      'beatC+=0.82',
    )
    .fromTo(
      appUi,
      { y: -36, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.55,
        ease: 'power2.out',
        stagger: 0,
      },
      'beatC+=0.9',
    )
    .to(rings, { opacity: 0.72, duration: 0.35 }, 'beatC+=0.95')

  return timeline
}

/** Initialize viewport-triggered OTA launch animation (plays once). */
export function setupOtaLaunchAnimations() {
  document.querySelectorAll<HTMLElement>('[data-ota-launch]').forEach((root) => {
    if (root.dataset.otaReady === 'true') return
    root.dataset.otaReady = 'true'

    if (REDUCED_MOTION) {
      setFinalState(root)
      return
    }

    const timeline = buildTimeline(root)
    if (!timeline) return

    let hasPlayed = false

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayed) {
            hasPlayed = true
            timeline.play()
            observer.disconnect()
          }
        })
      },
      { threshold: 0.45 },
    )

    observer.observe(root)
  })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupOtaLaunchAnimations)
} else {
  setupOtaLaunchAnimations()
}
