declare global {
  interface Window {
    chatwootSDK: any
    $chatwoot: any
    chatwootSettings: {
      hideMessageBubble?: boolean
      position?: string // This can be left or right
      locale?: string // Language to be set
      useBrowserLanguage?: boolean // Set widget language from user's browser
      type?: 'standard' | 'expanded_bubble' // [standard, expanded_bubble]
      darkMode: 'auto' | 'light' // [light, auto]
    }
  }
}

export function chatLoader(cb?: () => void) {
  if (window.chatwootSettings) {
    if (cb) cb()
    return
  }

  window.chatwootSettings = {
    hideMessageBubble: true,
    useBrowserLanguage: true,
    type: 'standard',
    darkMode: 'auto',
  }
  const d = document
  const t = 'script'
  const BASE_URL = 'https://app.chatwoot.com'
  const g = d.createElement(t) as any
  const s = d.getElementsByTagName(t)[0] as any
  g.src = `${BASE_URL}/packs/js/sdk.js`
  g.defer = true
  g.async = true
  s.parentNode.insertBefore(g, s)
  g.onload = function () {
    window.chatwootSDK.run({
      websiteToken: 'GvGEEE6AcQ3E6jhfSbwSQaXa',
      baseUrl: BASE_URL,
    })
    if (cb) setTimeout(cb, 300)
  }
}

export function openMessenger() {
  chatLoader(() => {
    window.$chatwoot.toggle('open')
  })
}
