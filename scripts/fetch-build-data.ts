#!/usr/bin/env bun

/**
 * Snapshots the remote data that static pages render (plans, Stripe plan prices per currency, credits,
 * store rankings, GitHub sponsors, GitHub releases for /feed.xml) into apps/web/src/data/*.json.
 * The nightly refresh-site-data workflow runs this; builds only read the JSON files,
 * so a deploy never waits on (or breaks because of) a third-party API.
 *
 * Run with: bun run fetch:build-data
 * Each source keeps its previous snapshot when it fails; the script exits 1 if any failed.
 */

import { collectGithubReleaseRssItems } from '../apps/web/src/lib/unifiedRss'
import keys from '../configs.json'

const DATA_DIR = new URL('../apps/web/src/data/', import.meta.url).pathname
const BASE_API_URL = (process.env.PUBLIC_BASE_API_URL || `https://api.${keys.base_domain.prod}`).trim().replace(/\/$/, '')
const GITHUB_TOKEN = process.env.PERSONAL_ACCESS_TOKEN
// Restricted Stripe key (Prices: read) of the Capgo EE account, the one non-US customers are billed by.
const STRIPE_PRICES_KEY = process.env.STRIPE_PRICES_READ_KEY
const TIMEOUT_MS = 30_000

// Page key -> store_top mode query value (undefined = default Capacitor ranking).
const STORE_TOP_MODES: Record<string, string | undefined> = {
  capacitor: undefined,
  capgo: 'capgo',
  cordova: 'cordova',
  flutter: 'flutter',
  kotlin: 'kotlin',
  nativeScript: 'nativeScript',
  reactNative: 'reactNative',
}

const SPONSORSHIP_FIELDS = `
  sponsorshipsAsMaintainer(first: 100) {
    nodes {
      sponsorEntity {
        ... on User { login name url avatarUrl }
        ... on Organization { login name url avatarUrl }
      }
      isActive
      tier { monthlyPriceInDollars }
    }
  }
`

async function getJson<T>(url: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(url, { ...init, signal: AbortSignal.timeout(TIMEOUT_MS) })
  if (!response.ok) throw new Error(`${url} -> HTTP ${response.status}`)
  return (await response.json()) as T
}

async function fetchPlans() {
  const plans = await getJson<unknown[]>(`${BASE_API_URL}/private/plans`)
  if (!Array.isArray(plans) || plans.length === 0) throw new Error('plans response is empty')
  return plans
}

// Stripe amounts are in the currency's smallest unit. Same special cases as Cap-go/capgo
// supabase/functions/shared/stripe-amount.ts (ISK and UGX stay two-decimal in the API).
// https://docs.stripe.com/currencies#special-cases
const ZERO_DECIMAL_CURRENCIES = new Set(['bif', 'clp', 'djf', 'gnf', 'jpy', 'kmf', 'krw', 'mga', 'pyg', 'rwf', 'vnd', 'vuv', 'xaf', 'xof', 'xpf'])
const THREE_DECIMAL_CURRENCIES = new Set(['bhd', 'jod', 'kwd', 'omr', 'tnd'])

function stripeAmountToMajorUnits(amount: number, currency: string) {
  return amount / (ZERO_DECIMAL_CURRENCIES.has(currency) ? 1 : THREE_DECIMAL_CURRENCIES.has(currency) ? 1000 : 100)
}

type StripeAmount = { unit_amount?: number | null; unit_amount_decimal?: string | null }

function readStripeAmount(option: StripeAmount) {
  const amount = option.unit_amount ?? (option.unit_amount_decimal ? Number(option.unit_amount_decimal) : null)
  return typeof amount === 'number' && Number.isFinite(amount) ? amount : null
}

// Every currency a Stripe price is sold in (major units), as Checkout charges it.
async function fetchStripePriceAmounts(priceId: string): Promise<Record<string, number>> {
  const price = await getJson<StripeAmount & { currency: string; active: boolean; currency_options?: Record<string, StripeAmount> }>(
    `https://api.stripe.com/v1/prices/${encodeURIComponent(priceId)}?expand[]=currency_options`,
    { headers: { Authorization: `Bearer ${STRIPE_PRICES_KEY}` } },
  )
  if (!price.active) throw new Error(`Stripe price ${priceId} is archived`)
  const amounts: Record<string, number> = {}
  for (const [currency, option] of Object.entries({ ...price.currency_options, [price.currency]: price })) {
    const amount = readStripeAmount(option)
    if (amount !== null) amounts[currency.toLowerCase()] = stripeAmountToMajorUnits(amount, currency.toLowerCase())
  }
  return amounts
}

type PlanPriceIds = { price_m_id?: string; price_y_id?: string }

async function fetchPlanPriceSet(ids: PlanPriceIds | undefined) {
  if (!ids?.price_m_id || !ids.price_y_id) return null
  const [month, year] = await Promise.all([fetchStripePriceAmounts(ids.price_m_id), fetchStripePriceAmounts(ids.price_y_id)])
  return { month, year }
}

// Plan prices in every currency of the Stripe prices, plus the Solo regional (PPP) tiers from regional_price_ids.
async function fetchPlanPrices() {
  if (!STRIPE_PRICES_KEY) throw new Error('STRIPE_PRICES_READ_KEY is required to fetch Stripe plan prices')
  const plans = await fetchPlans()
  const entries = await Promise.all(
    plans.map(async (plan: any) => {
      const full = await fetchPlanPriceSet(plan)
      if (!full) throw new Error(`plan ${plan.stripe_id} has no Stripe price IDs`)
      const tiers = Object.fromEntries(
        await Promise.all(
          Object.entries((plan.regional_price_ids ?? {}) as Record<string, PlanPriceIds>).map(async ([tier, ids]) => [tier, await fetchPlanPriceSet(ids)] as const),
        ),
      )
      const regional = Object.fromEntries(Object.entries(tiers).filter(([, prices]) => prices))
      return [plan.stripe_id, { ...full, ...(Object.keys(regional).length ? { tiers: regional } : {}) }] as const
    }),
  )
  return { plans: Object.fromEntries(entries) }
}

async function fetchCredits() {
  const credits = await getJson<unknown[]>(`${BASE_API_URL}/private/credits`)
  if (!Array.isArray(credits) || credits.length === 0) throw new Error('credits response is empty')
  return credits
}

async function fetchStoreTop() {
  const entries = await Promise.all(
    Object.entries(STORE_TOP_MODES).map(async ([key, mode]) => {
      const url = `${BASE_API_URL}/private/store_top${mode ? `?mode=${mode}` : ''}`
      // usage comes back as a number or a numeric string depending on the mode.
      const data = await getJson<{ apps?: unknown[]; usage?: number | string }>(url)
      const usage = Number(data.usage)
      if (!Array.isArray(data.apps) || !Number.isFinite(usage)) throw new Error(`${url} returned an unexpected shape`)
      // Keep only the fields the top_*_app pages render; the store summaries would bloat the nightly diff.
      const apps = data.apps.map(({ url, title, icon, installs, category }: any) => ({ url, title, icon, installs, category }))
      return [key, { apps, usage }] as const
    }),
  )
  return Object.fromEntries(entries)
}

async function fetchSponsors() {
  if (!GITHUB_TOKEN) throw new Error('PERSONAL_ACCESS_TOKEN is required to fetch GitHub sponsors')
  const query = `query { riderx: user(login: "riderx") { ${SPONSORSHIP_FIELDS} } capgo: organization(login: "Cap-go") { ${SPONSORSHIP_FIELDS} } }`
  const data = await getJson<any>('https://api.github.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${GITHUB_TOKEN}` },
    body: JSON.stringify({ query }),
  })
  if (data.errors) throw new Error(`GitHub GraphQL errors: ${JSON.stringify(data.errors)}`)
  const nodes = [...(data?.data?.riderx?.sponsorshipsAsMaintainer?.nodes ?? []), ...(data?.data?.capgo?.sponsorshipsAsMaintainer?.nodes ?? [])]
  const tierOf = (price: number) => (price >= 100 ? 'platinum' : price >= 50 ? 'gold' : price >= 25 ? 'silver' : 'baker')
  return nodes
    .filter((node) => node?.sponsorEntity?.login)
    .map((node) => ({
      id: node.sponsorEntity.login,
      name: node.sponsorEntity.name || node.sponsorEntity.login,
      imageUrl: node.sponsorEntity.avatarUrl,
      url: node.sponsorEntity.url,
      tier: tierOf(node?.tier?.monthlyPriceInDollars ?? 0),
    }))
}

async function fetchGithubReleases() {
  const items = await collectGithubReleaseRssItems()
  if (items.length === 0) throw new Error('no GitHub releases fetched (rate limited or offline?)')
  return items.map((item) => ({ ...item, pubDate: item.pubDate.toISOString() }))
}

// Optional sources only warn on failure: the sponsors query needs a token with the read:user scope,
// and plan prices need a Stripe key (without one the pricing page stays in USD).
const OPTIONAL_SOURCES = new Set(['github-sponsors.json', 'capgo-plan-prices.json'])

const SOURCES: Record<string, () => Promise<unknown>> = {
  'capgo-plans.json': fetchPlans,
  'capgo-plan-prices.json': fetchPlanPrices,
  'capgo-credits.json': fetchCredits,
  'store-top.json': fetchStoreTop,
  'github-sponsors.json': fetchSponsors,
  'github-releases.json': fetchGithubReleases,
}

const results = await Promise.allSettled(
  Object.entries(SOURCES).map(async ([file, fetchSource]) => {
    const data = await fetchSource()
    await Bun.write(`${DATA_DIR}${file}`, `${JSON.stringify(data, null, 2)}\n`)
    console.log(`Updated ${file}`)
  }),
)

let failed = false
results.forEach((result, index) => {
  if (result.status === 'fulfilled') return
  const file = Object.keys(SOURCES)[index]
  console.error(`Kept previous snapshot for ${file}: ${result.reason}`)
  if (!OPTIONAL_SOURCES.has(file)) failed = true
})
if (failed) process.exit(1)
