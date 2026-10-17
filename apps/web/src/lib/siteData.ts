// Snapshots of remote data rendered by static pages. Refreshed nightly by
// .github/workflows/refresh-site-data.yml (scripts/fetch-build-data.ts), so builds never hit the network.
import creditsData from '@/data/capgo-credits.json'
import plansData from '@/data/capgo-plans.json'
import githubReleasesData from '@/data/github-releases.json'
import sponsorsData from '@/data/github-sponsors.json'
import storeTopData from '@/data/store-top.json'
import type { UnifiedRssItem } from '@/lib/unifiedRss'
import type { Database } from '@/services/supabase.types'

export type Plan = Database['public']['Tables']['plans']['Row']

export type StoreTopApp = {
  url: string
  title: string
  icon: string
  installs: number
  category: string
}

export type StoreTopMode = 'capacitor' | 'capgo' | 'cordova' | 'flutter' | 'kotlin' | 'nativeScript' | 'reactNative'

export type Sponsor = {
  id: string
  name: string
  imageUrl: string
  url: string
  tier?: string
}

export const getPlans = (): Plan[] => plansData as unknown as Plan[]

export const getCredits = <T = any>(): T[] => creditsData as unknown as T[]

export const getStoreTop = (mode: StoreTopMode): { apps: StoreTopApp[]; usage: number } | undefined =>
  (storeTopData as unknown as Record<StoreTopMode, { apps: StoreTopApp[]; usage: number }>)[mode]

export const getSponsors = (): Sponsor[] => sponsorsData as Sponsor[]

export const getGithubReleaseRssItems = (): UnifiedRssItem[] =>
  (githubReleasesData as unknown as (Omit<UnifiedRssItem, 'pubDate'> & { pubDate: string })[]).map((item) => ({ ...item, pubDate: new Date(item.pubDate) }))
