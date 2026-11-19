const STORAGE_PLATFORM = 'tc-demo-platform'
const STORAGE_DARK = 'tc-demo-dark'

export type TailwindCapacitorDemoPlatform = 'ios' | 'material'

function readStoredPlatform(): TailwindCapacitorDemoPlatform {
  const value = localStorage.getItem(STORAGE_PLATFORM)
  return value === 'material' ? 'material' : 'ios'
}

function readStoredDark(): boolean {
  return localStorage.getItem(STORAGE_DARK) === '1'
}

function writeStoredTheme(platform: TailwindCapacitorDemoPlatform, dark: boolean) {
  localStorage.setItem(STORAGE_PLATFORM, platform)
  localStorage.setItem(STORAGE_DARK, dark ? '1' : '0')
}

export function bindTailwindCapacitorDemoTheme(root: HTMLElement, slug: string) {
  let platform = readStoredPlatform()
  let dark = readStoredDark()

  const iframes = () => Array.from(root.querySelectorAll<HTMLIFrameElement>('iframe.tc-demo-state-iframe'))

  const syncPressed = () => {
    root.querySelectorAll('[data-tc-platform]').forEach((btn) => {
      const el = btn as HTMLButtonElement
      const active = el.dataset.tcPlatform === platform
      el.setAttribute('aria-pressed', String(active))
      el.classList.toggle('text-white', active)
      el.classList.toggle('text-gray-300', !active)
      el.classList.toggle('border-blue-400/40', active)
    })
    root.querySelectorAll('[data-tc-dark]').forEach((btn) => {
      const el = btn as HTMLButtonElement
      const active = (el.dataset.tcDark === '1') === dark
      el.setAttribute('aria-pressed', String(active))
      el.classList.toggle('text-white', active)
      el.classList.toggle('text-gray-300', !active)
      el.classList.toggle('border-blue-400/40', active)
    })
  }

  const shellSrc = (iframe: HTMLIFrameElement) => {
    const shell = new URL(iframe.getAttribute('src') ?? iframe.src, window.location.origin)
    const stateId = iframe.dataset.tcState ?? shell.searchParams.get('state') ?? ''
    shell.searchParams.set('slug', slug)
    shell.searchParams.set('state', stateId)
    shell.searchParams.set('platform', platform)
    shell.searchParams.set('dark', dark ? '1' : '0')
    return `${shell.pathname}${shell.search}`
  }

  const pushTheme = () => {
    writeStoredTheme(platform, dark)
    let reloaded = false
    for (const iframe of iframes()) {
      const nextSrc = shellSrc(iframe)
      if (iframe.getAttribute('src') !== nextSrc) {
        iframe.setAttribute('src', nextSrc)
        reloaded = true
      } else {
        iframe.contentWindow?.postMessage({ type: 'tc-demo-theme', platform, dark }, window.location.origin)
      }
    }
    if (reloaded) return
    for (const iframe of iframes()) {
      iframe.contentWindow?.postMessage({ type: 'tc-demo-theme', platform, dark }, window.location.origin)
    }
  }

  root.querySelectorAll('[data-tc-platform]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = (btn as HTMLButtonElement).dataset.tcPlatform
      if (next === 'ios' || next === 'material') {
        platform = next
        syncPressed()
        pushTheme()
      }
    })
  })

  root.querySelectorAll('[data-tc-dark]').forEach((btn) => {
    btn.addEventListener('click', () => {
      dark = (btn as HTMLButtonElement).dataset.tcDark === '1'
      syncPressed()
      pushTheme()
    })
  })

  for (const iframe of iframes()) {
    iframe.setAttribute('src', shellSrc(iframe))
    iframe.addEventListener('load', () => {
      iframe.contentWindow?.postMessage({ type: 'tc-demo-theme', platform, dark }, window.location.origin)
    })
  }

  syncPressed()
}