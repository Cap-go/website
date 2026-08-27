import gsap from 'gsap'

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Show the completed OTA update state without animation (reduced-motion path). */
function setFinalState(root: HTMLElement) {
  root.classList.add('is-complete')

  const bundle = root.querySelector('[data-ota-bundle]')
  const progress = root.querySelector('[data-ota-progress]')
  const screenOld = root.querySelector('[data-ota-screen-old]')
  const screenNew = root.querySelector('[data-ota-screen-new]')
  const badge = root.querySelector('[data-ota-badge]')
  const pathActive = root.querySelector('[data-ota-path-active]')
  const ripples = root.querySelectorAll('[data-ota-ripple-1], [data-ota-ripple-2], [data-ota-ripple-3]')

  bundle?.setAttribute('opacity', '0')
  progress?.setAttribute('opacity', '0')
  screenOld?.setAttribute('opacity', '0')
  screenNew?.setAttribute('opacity', '1')
  badge?.setAttribute('opacity', '1')
  pathActive?.setAttribute('stroke-dashoffset', '0')
  ripples.forEach((ripple, index) => {
    ripple.setAttribute('opacity', String([0.35, 0.22, 0.12][index] ?? 0.2))
  })
}

/** Build the GSAP timeline for bundle transfer, download, and apply-on-launch. */
function buildTimeline(root: HTMLElement) {
  const bundle = root.querySelector('[data-ota-bundle]')
  const progressGroup = root.querySelector('[data-ota-progress]')
  const progress = root.querySelector('[data-ota-progress-fill]')
  const screenOld = root.querySelector('[data-ota-screen-old]')
  const screenNew = root.querySelector('[data-ota-screen-new]')
  const badge = root.querySelector('[data-ota-badge]')
  const pathActive = root.querySelector('[data-ota-path-active]')
  const ripples = [root.querySelector('[data-ota-ripple-1]'), root.querySelector('[data-ota-ripple-2]'), root.querySelector('[data-ota-ripple-3]')]
  const flash = root.querySelector('[data-ota-flash]')

  if (!bundle || !progress || !progressGroup || !screenOld || !screenNew || !badge || !pathActive || !flash) return null

  const pathLength = (pathActive as SVGPathElement).getTotalLength()
  gsap.set(pathActive, { strokeDasharray: pathLength, strokeDashoffset: pathLength })
  gsap.set(bundle, { opacity: 0, y: 0 })
  gsap.set(progress, { scaleX: 0, transformOrigin: 'left center' })
  gsap.set(screenNew, { opacity: 0 })
  gsap.set(badge, { opacity: 0, y: 6 })
  gsap.set(flash, { opacity: 0 })
  ripples.forEach((ripple, index) => {
    if (!ripple) return
    gsap.set(ripple, { opacity: 0, scale: 0.55 + index * 0.08, transformOrigin: 'center center' })
  })

  const timeline = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } })

  timeline
    .to(bundle, { opacity: 1, duration: 0.35 }, 0.2)
    .to(bundle, { y: 34, duration: 1.4, ease: 'power1.inOut' }, 0.45)
    .to(pathActive, { strokeDashoffset: 0, duration: 1.4, ease: 'power1.inOut' }, 0.45)
    .to(progress, { scaleX: 1, duration: 0.9, ease: 'power1.inOut' }, 1.55)
    .to(bundle, { opacity: 0, duration: 0.2 }, 1.85)
    .to(flash, { opacity: 0.55, duration: 0.12, yoyo: true, repeat: 1 }, 2.05)
    .to(screenOld, { opacity: 0, duration: 0.25 }, 2.1)
    .to(screenNew, { opacity: 1, duration: 0.35 }, 2.2)
    .to(
      ripples,
      {
        opacity: (index) => [0.35, 0.22, 0.12][index] ?? 0.2,
        scale: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power2.out',
      },
      2.35,
    )
    .to(badge, { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.6)' }, 2.65)
    .add(() => {
      root.classList.add('is-complete')
      progressGroup.setAttribute('opacity', '0')
    })

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

    const play = () => {
      root.classList.remove('is-complete')
      root.querySelector('[data-ota-progress]')?.removeAttribute('opacity')
      timeline.restart()
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayed) {
            hasPlayed = true
            play()
          }
        })
      },
      { threshold: 0.45 },
    )

    observer.observe(root)

    root.querySelector('[data-ota-replay]')?.addEventListener('click', () => {
      play()
    })
  })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupOtaLaunchAnimations)
} else {
  setupOtaLaunchAnimations()
}
