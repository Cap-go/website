import gsap from 'gsap'

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Show the completed OTA update state without animation (reduced-motion path). */
function setFinalState(root: HTMLElement) {
  const staged = root.querySelector('[data-ota-staged-bundle]')
  const status = root.querySelector('[data-ota-status]')
  const icon = root.querySelector('[data-ota-app-icon]')
  const stack = root.querySelector('[data-ota-bundle-stack]')

  staged?.setAttribute('opacity', '0')
  status?.setAttribute('opacity', '0')
  icon?.setAttribute('opacity', '1')
  stack?.setAttribute('opacity', '1')

  if (staged instanceof SVGElement) staged.style.transform = ''
  if (stack instanceof SVGElement) stack.style.transform = ''
}

/** Build the GSAP timeline for bundle transfer, download, and apply-on-launch. */
function buildTimeline(root: HTMLElement) {
  const staged = root.querySelector('[data-ota-staged-bundle]')
  const status = root.querySelector('[data-ota-status]')
  const icon = root.querySelector('[data-ota-app-icon]')
  const stack = root.querySelector('[data-ota-bundle-stack]')

  if (!staged || !status || !icon || !stack) return null

  gsap.set(staged, { y: -14, opacity: 0 })
  gsap.set(status, { opacity: 0 })
  gsap.set(stack, { opacity: 1, y: 0 })
  gsap.set(icon, { opacity: 1 })

  const timeline = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } })

  timeline
    .to(staged, { y: 0, opacity: 0.3, duration: 1.15 }, 0.45)
    .to(status, { opacity: 1, duration: 0.5 }, 0.95)
    .to({}, { duration: 1.1 })
    .to(staged, { opacity: 0, duration: 0.55 }, 3.2)
    .to(status, { opacity: 0, duration: 0.4 }, 3.2)

  return timeline
}

/** Initialize viewport-triggered OTA launch animations and replay controls. */
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
