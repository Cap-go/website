#!/usr/bin/env bun

/**
 * Snapshots Capgo client app icons + store user counts for the homepage hero.
 * Writes a committed JSON catalog. The site never fetches this at request time.
 *
 *   bun run refresh:hero-apps
 */

import { HERO_LOGO_SLOT_COUNT, pickStableMixedHeroApps, type HeroClientAppsFile, type HeroLogoSlotsFile } from '../apps/web/src/lib/heroClientApps'

const REFRESH = process.env.HERO_APPS_REFRESH === 'true'
const POOL_PATH = new URL('../apps/web/src/data/hero-client-apps.json', import.meta.url).pathname
const SLOTS_PATH = new URL('../apps/web/src/data/hero-logo-slots.json', import.meta.url).pathname
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID ?? '9ee3d7479a3c359681e3fab2c8cb22c0'
const DATABASE_NAME = 'capgo_prod_storeapp'
const SQL = `SELECT app_id, title, icon, installs FROM store_apps WHERE capgo = 1 AND icon != '' AND title != '' AND installs > 0 ORDER BY installs DESC LIMIT 200`

type StoreAppRow = {
  app_id: string
  title: string
  icon: string
  installs: number
}

const readCached = async (path: string): Promise<HeroClientAppsFile | null> => {
  try {
    const file = Bun.file(path)
    if (!(await file.exists())) return null
    return (await file.json()) as HeroClientAppsFile
  } catch (error) {
    console.warn(`Could not read ${path}:`, error)
    return null
  }
}

const writeCatalog = async (pool: HeroClientAppsFile) => {
  const slots: HeroLogoSlotsFile = {
    fetchedAt: pool.fetchedAt,
    source: pool.source,
    apps: pickStableMixedHeroApps(pool.apps, HERO_LOGO_SLOT_COUNT),
  }

  await Bun.write(POOL_PATH, `${JSON.stringify(pool, null, 2)}\n`)
  await Bun.write(SLOTS_PATH, `${JSON.stringify(slots, null, 2)}\n`)
  console.log(`Saved ${pool.apps.length} catalog apps and ${slots.apps.length} hero slots`)
}

const fetchFromD1 = async (): Promise<HeroClientAppsFile> => {
  const command = ['bunx', 'wrangler', 'd1', 'execute', DATABASE_NAME, '--remote', '--json', '--command', SQL]
  const proc = Bun.spawn(command, {
    stdout: 'pipe',
    stderr: 'pipe',
    env: {
      ...process.env,
      CLOUDFLARE_ACCOUNT_ID: ACCOUNT_ID,
    },
  })
  const stdout = await new Response(proc.stdout).text()
  const stderr = await new Response(proc.stderr).text()
  const exitCode = await proc.exited
  if (exitCode !== 0) {
    throw new Error(`wrangler d1 execute failed (${exitCode}): ${stderr || stdout}`)
  }

  const parsed = JSON.parse(stdout) as Array<{ results?: StoreAppRow[] }>
  const rows = parsed[0]?.results ?? []
  if (rows.length < 50) {
    throw new Error(`Expected at least 50 Capgo client apps, got ${rows.length}`)
  }

  return {
    fetchedAt: new Date().toISOString(),
    source: 'capgo_store_apps',
    apps: rows.map((row) => ({
      id: row.app_id,
      title: row.title,
      icon: row.icon,
      users: Number(row.installs) || 0,
    })),
  }
}

async function main() {
  const cached = await readCached(POOL_PATH)

  if (!REFRESH) {
    if (cached) {
      await writeCatalog(cached)
      console.log(`Rebuilt hero slots from catalog dated ${cached.fetchedAt}. Set HERO_APPS_REFRESH=true to fetch.`)
      return
    }
    console.warn('Hero client apps cache is missing. Set HERO_APPS_REFRESH=true to fetch.')
    return
  }

  console.log(`Fetching 200 Capgo client apps from ${DATABASE_NAME}...`)
  const live = await fetchFromD1()
  await writeCatalog(live)
}

await main()
