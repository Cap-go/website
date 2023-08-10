declare global {
  interface Window {
    Reflio: any
  }
}
export function initAffiliate() {
  if (window.Reflio) return
  const d = document
  const t = 'script'
  const BASE_URL = 'https://reflio.com'
  const g = d.createElement(t) as any
  const s = d.getElementsByTagName(t)[0] as any
  g.src = `${BASE_URL}/js/reflio.min.js`
  g.defer = true
  g.async = true
  g.setAttribute('data-reflio', 'hi8q6z93wyt147h')
  g.setAttribute('data-domain', 'https://capgo.app,https://web.capgo.app')
  s.parentNode.insertBefore(g, s)
}
