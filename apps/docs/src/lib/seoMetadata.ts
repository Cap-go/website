import { pluginNames } from '../config/sidebar.mjs'

const normalize = (value: string) => value.replace(/\s+/g, ' ').trim()

export function pluginSetupMetadata(pathname: string, description: string, brand = 'Capgo'): { title: string; description: string } | null {
  const match = pathname.match(/^\/docs\/plugins\/([^/]+)\/getting-started\/?$/)
  if (!match) return null
  const name = pluginNames.get(match[1])
  if (!name) return null
  const title = `${name} Capacitor Plugin: Setup | ${brand}`
  const summary = normalize(description)
  // Keep useful page-specific copy. Short placeholders need setup context, not
  // the unrelated site-wide live-update advertising that used to be appended.
  const text =
    summary.length >= 80 ? summary : `Install and configure the ${name} plugin for Capacitor. Follow the setup instructions and usage examples to integrate it into your app.`
  return { title, description: truncateDescription(text) }
}

export function truncateDescription(value: string, maxLength = 159): string {
  const text = normalize(value)
  if (text.length <= maxLength) return text
  const limit = text.slice(0, maxLength - 1)
  const boundary = limit.lastIndexOf(' ')
  return `${(boundary >= maxLength * 0.65 ? limit.slice(0, boundary) : limit).replace(/[\s,;:.-]+$/, '')}…`
}
