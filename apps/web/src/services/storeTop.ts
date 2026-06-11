export interface StoreTopApp {
  url: string
  title: string
  icon: string
  summary: string
  installs: number
  category: string
}

interface StoreTopResponse {
  apps?: StoreTopApp[]
}

const storeTopCache = new Map<string, Promise<StoreTopApp[]>>()

function storeTopEndpoint(baseApiUrl: string): string {
  const base = baseApiUrl.trim().replace(/\/$/, '') || 'https://api.capgo.app'
  return `${base}/private/store_top`
}

function readPackageId(url: string): string | null {
  try {
    return new URL(url).searchParams.get('id')
  } catch {
    return null
  }
}

export async function fetchStoreTopApps(baseApiUrl: string): Promise<StoreTopApp[]> {
  const endpoint = storeTopEndpoint(baseApiUrl)
  const cached = storeTopCache.get(endpoint)
  if (cached) return cached

  const request = fetch(endpoint, { signal: AbortSignal.timeout(4000) })
    .then(async (response) => {
      if (!response.ok) return []
      const payload = (await response.json()) as StoreTopResponse
      return Array.isArray(payload.apps) ? payload.apps : []
    })
    .catch(() => [])

  storeTopCache.set(endpoint, request)
  return request
}

export async function findStoreTopApp(baseApiUrl: string, appId: string): Promise<StoreTopApp | null> {
  const apps = await fetchStoreTopApps(baseApiUrl)
  return apps.find((app) => readPackageId(app.url) === appId) ?? null
}

export function plainStoreSummary(summary: string, maxLength = 260): string {
  const text = summary
    .replace(/<br\s*\/?\s*>/gi, ' ')
    .replace(/<\/p>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;|&#x27;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (text.length <= maxLength) return text
  const clipped = text
    .slice(0, maxLength - 3)
    .trimEnd()
    .replace(/[,.!?;:]+$/, '')
  return `${clipped}...`
}
