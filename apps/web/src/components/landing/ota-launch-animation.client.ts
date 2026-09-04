import gsap from 'gsap'

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function queryParts(root: HTMLElement) {
  return {
    chrome: root.querySelectorAll('[data-ota-chrome]'),
    staged: root.querySelector('[data-ota-staged-bundle]'),
    status: root.querySelector('[data-ota-status]'),
    icon: root.querySelector('[data-ota-app-icon]'),
    stack: root.querySelector('[data-ota-bundle-stack]'),
    rings: root.querySelector('[data-ota-rings]'),
  }
}

/** Show the completed OTA update state without animation (reduced-motion path). */
function setFinalState(root: HTMLElement) {
  const { chrome, staged, status, icon, stack, rings } = queryParts(root)

  staged?.setAttribute('opacity', '0')
  status?.setAttribute('opacity', '0')
  icon?.setAttribute('opacity', '1')
  stack?.setAttribute('opacity', '1')
  rings?.setAttribute('opacity', '1')
  chrome.forEach((el) => el.setAttribute('opacity', '1'))

  for (const el of [staged, icon, stack, rings, ...chrome]) {
    if (el instanceof SVGElement) el.style.transform = ''
  }
}

/**
 * Three beats the reader can follow without a caption:
 * 1. App is open and usable (chrome + icon stay put).
 * 2. A bundle stages behind that live UI; status reads "Updating in background...".
 * 3. Next launch: the running app leaves and returns; the staged bundle is gone (applied).
 */
function buildTimeline(root: HTMLElement) {
  const { chrome, staged, status, icon, stack, rings } = queryParts(root)

  if (!staged || !status || !icon || !stack || !rings || chrome.length === 0) return null

  const appUi = [...chrome, icon]

  gsap.set(appUi, { opacity: 1, y: 0 })
  gsap.set(stack, { opacity: 1, y: 0 })
  gsap.set(rings, { opacity: 0.72 })
  gsap.set(status, { opacity: 0 })
  gsap.set(staged, { opacity: 0, y: 22 })

  const timeline = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } })

  timeline
    // Beat 1 — hold the open, usable app
    .to({}, { duration: 0.45 })
    // Beat 2 — bundle arrives in the background; UI stays up
    .to(staged, { y: 0, opacity: 0.32, duration: 1.15, ease: 'power2.out' }, 0.55)
    .to(status, { opacity: 1, duration: 0.4 }, 0.95)
    .to(rings, { opacity: 1, duration: 0.7 }, 0.7)
    .to({}, { duration: 1.15 })
    // Beat 3 — next launch: running app leaves, staged bundle is applied, same app returns
    .to(appUi, { opacity: 0, y: 10, duration: 0.4, ease: 'power2.in' }, 3.15)
    .to(status, { opacity: 0, duration: 0.28 }, 3.15)
    .to(staged, { y: -28, opacity: 0, duration: 0.5, ease: 'power2.in' }, 3.2)
    .to(rings, { opacity: 0.72, duration: 0.45 }, 3.25)
    .to(appUi, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 3.75)

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
