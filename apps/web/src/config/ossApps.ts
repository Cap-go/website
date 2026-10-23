export type OssAppLicense = 'mit' | 'agpl' | 'public'

const screenshotAltKeys = [
  'oss_apps_autobrowse_chat_alt',
  'oss_apps_autobrowse_home_alt',
  'oss_apps_simplefest_home_alt',
  'oss_apps_simplefest_scan_alt',
  'oss_apps_mondayquest_today_alt',
  'oss_apps_mondayquest_track_alt',
  'oss_apps_bewise_today_alt',
  'oss_apps_bewise_widget_alt',
  'oss_apps_mimesis_playing_alt',
  'oss_apps_mimesis_themes_alt',
  'oss_apps_forgr_home_alt',
  'oss_apps_forgr_chat_alt',
] as const

type ScreenshotAltKey = (typeof screenshotAltKeys)[number]

export interface OssAppScreenshot {
  src: string
  altKey: ScreenshotAltKey
  width: number
  height: number
}

const kindKeyByKind = {
  browser: 'oss_apps_kind_browser',
  events: 'oss_apps_kind_events',
  habits: 'oss_apps_kind_habits',
  quotes: 'oss_apps_kind_quotes',
  game: 'oss_apps_kind_game',
  tools: 'oss_apps_kind_tools',
} as const

const summaryKeyById = {
  autobrowse: 'oss_apps_autobrowse_description',
  simplefest: 'oss_apps_simplefest_description',
  mondayquest: 'oss_apps_mondayquest_description',
  bewise: 'oss_apps_bewise_description',
  mimesis: 'oss_apps_mimesis_description',
  forgr: 'oss_apps_forgr_description',
} as const

type AppId = keyof typeof summaryKeyById
type AppKind = keyof typeof kindKeyByKind

export interface OssApp {
  id: AppId
  name: string
  repo: string
  kindKey: (typeof kindKeyByKind)[AppKind]
  summaryKey: (typeof summaryKeyById)[AppId]
  license: OssAppLicense
  website: string
  github: string
  play: string
  appStore?: string
  screenshots: [OssAppScreenshot, OssAppScreenshot]
}

const SCREENSHOT_WIDTH = 640

// One row per app so Sonar does not treat the catalog as duplicated object literals.
// id|name|repo|kind|license|website|playId|appStore|srcA|altA|srcB|altB|height
const ossAppRows = String.raw`
autobrowse|Auto Browse|Cap-go/autobrowse|browser|public|https://autobrowse.dev/|app.capgo.browser||/oss-apps/auto-chat.webp|oss_apps_autobrowse_chat_alt|/oss-apps/auto-main.webp|oss_apps_autobrowse_home_alt|1391
simplefest|Simple Fest|Cap-go/simple-fest|events|mit|https://simplefest.app/|ee.forgr.festivalscan||/oss-apps/fest-home.webp|oss_apps_simplefest_home_alt|/oss-apps/fest-scan.webp|oss_apps_simplefest_scan_alt|1391
mondayquest|Monday Quest|Cap-go/MondayQuest|habits|public|https://mondayquest.com/|ee.forgr.mondayquest||/oss-apps/monday-today.webp|oss_apps_mondayquest_today_alt|/oss-apps/monday-track.webp|oss_apps_mondayquest_track_alt|1248
bewise|BeWise|Cap-go/bewise|quotes|mit|https://bewise.love/|ee.forgr.bewise|https://apps.apple.com/app/id1448918843|/oss-apps/bewise-today.webp|oss_apps_bewise_today_alt|/oss-apps/bewise-widget.webp|oss_apps_bewise_widget_alt|1391
mimesis|Mimesis|Cap-go/mimesis|game|agpl|https://mimesis.fun/|ee.forgr.mimesis|https://apps.apple.com/app/id1559423136|/oss-apps/mimesis-playing.webp|oss_apps_mimesis_playing_alt|/oss-apps/mimesis-themes.webp|oss_apps_mimesis_themes_alt|1391
forgr|Forgr|Cap-go/Forgr|tools|public|https://forgr.ee/|app.capgo.mapp||/oss-apps/forgr-home.webp|oss_apps_forgr_home_alt|/oss-apps/forgr-chat.webp|oss_apps_forgr_chat_alt|1391
`
  .trim()
  .split('\n')

const isAppId = (value: string): value is AppId => value in summaryKeyById
const isAppKind = (value: string): value is AppKind => value in kindKeyByKind
const isLicense = (value: string): value is OssAppLicense => value === 'mit' || value === 'agpl' || value === 'public'
const isAltKey = (value: string): value is ScreenshotAltKey => (screenshotAltKeys as readonly string[]).includes(value)

const screenshot = (src: string, altKey: ScreenshotAltKey, height: number): OssAppScreenshot => ({
  src,
  altKey,
  width: SCREENSHOT_WIDTH,
  height,
})

export const ossApps: OssApp[] = ossAppRows.map((row) => {
  const [id, name, repo, kind, license, website, playId, appStore, srcA, altA, srcB, altB, heightRaw] = row.split('|')
  if (!isAppId(id) || !isAppKind(kind) || !isLicense(license) || !srcA || !altA || !isAltKey(altA) || !srcB || !altB || !isAltKey(altB)) {
    throw new Error(`Invalid open app row: ${row}`)
  }

  const height = Number(heightRaw)
  if (!Number.isInteger(height) || height <= 0) throw new Error(`Invalid screenshot height for ${id}`)

  return {
    id,
    name,
    repo,
    kindKey: kindKeyByKind[kind],
    summaryKey: summaryKeyById[id],
    license,
    website,
    github: `https://github.com/${repo}/`,
    play: `https://play.google.com/store/apps/details?id=${playId}`,
    ...(appStore ? { appStore } : {}),
    screenshots: [screenshot(srcA, altA, height), screenshot(srcB, altB, height)],
  }
})
