export type HeroClientApp = {
  id: string
  title: string
  icon: string
  users: number
}

export type HeroClientAppBucket = 'biggest' | 'other'

export type AssignedHeroApp = HeroClientApp & {
  bucket: HeroClientAppBucket
}

export type HeroClientAppsFile = {
  fetchedAt: string
  source: string
  apps: HeroClientApp[]
}

export type HeroLogoSlotsFile = {
  source: string
  apps: AssignedHeroApp[]
}

export const HERO_LOGO_SLOT_COUNT = 28

const compareAppIds = (left: string, right: string) => (left < right ? -1 : left > right ? 1 : 0)

export const formatHeroUsers = (users: number): string | null => {
  if (users < 1_000) return null
  if (users >= 999_500_000) return `${Math.round(users / 1_000_000_000)}B`
  if (users >= 999_500) return `${Math.round(users / 1_000_000)}M`
  if (users >= 10_000) return `${Math.round(users / 1_000)}K`
  return `${(users / 1_000).toFixed(1).replace(/\.0$/, '')}K`
}

export const splitHeroClientPool = (apps: HeroClientApp[]) => {
  const ranked = [...apps].filter((app) => app.icon && app.title).sort((left, right) => right.users - left.users || compareAppIds(left.id, right.id))
  const splitAt = Math.ceil(ranked.length / 2)
  return {
    biggest: ranked.slice(0, splitAt),
    other: ranked.slice(splitAt),
  }
}

const sampleEvenly = <T>(items: T[], count: number): T[] => {
  if (count <= 0 || items.length === 0) return []
  if (items.length <= count) return items
  if (count === 1) return [items[0]]

  return Array.from({ length: count }, (_, index) => {
    const position = Math.round((index * (items.length - 1)) / (count - 1))
    return items[position]
  })
}

export const pickStableMixedHeroApps = (apps: HeroClientApp[], slotCount = HERO_LOGO_SLOT_COUNT): AssignedHeroApp[] => {
  const { biggest, other } = splitHeroClientPool(apps)
  const biggestSlots = Math.ceil(slotCount / 2)
  const otherSlots = Math.max(slotCount - biggestSlots, 0)
  const pickedBiggest = biggest.slice(0, biggestSlots).map((app) => ({ ...app, bucket: 'biggest' as const }))
  const pickedOther = sampleEvenly(other, otherSlots).map((app) => ({ ...app, bucket: 'other' as const }))

  const mixed: AssignedHeroApp[] = []
  const length = Math.max(pickedBiggest.length, pickedOther.length)
  for (let index = 0; index < length; index += 1) {
    const big = pickedBiggest[index]
    const rest = pickedOther[index]
    if (big) mixed.push(big)
    if (rest) mixed.push(rest)
  }
  return mixed.slice(0, slotCount)
}
