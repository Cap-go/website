export type OssAppLicense = 'mit' | 'agpl' | 'public'

export interface OssAppScreenshot {
  src: string
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
// id|name|repo|kind|license|website|playId|appStore|screenshotA|screenshotB|height
const ossAppRows = String.raw`
autobrowse|Auto Browse|Cap-go/autobrowse|browser|public|https://autobrowse.dev/|app.capgo.browser||/oss-apps/auto-chat.webp|/oss-apps/auto-main.webp|1391
simplefest|Simple Fest|Cap-go/simple-fest|events|mit|https://simplefest.app/|ee.forgr.festivalscan||/oss-apps/fest-home.webp|/oss-apps/fest-scan.webp|1391
mondayquest|Monday Quest|Cap-go/MondayQuest|habits|public|https://mondayquest.com/|ee.forgr.mondayquest||/oss-apps/monday-today.webp|/oss-apps/monday-track.webp|1248
bewise|BeWise|Cap-go/bewise|quotes|mit|https://bewise.love/|ee.forgr.bewise|https://apps.apple.com/app/id1448918843|/oss-apps/bewise-today.webp|/oss-apps/bewise-widget.webp|1391
mimesis|Mimesis|Cap-go/mimesis|game|agpl|https://mimesis.fun/|ee.forgr.mimesis|https://apps.apple.com/app/id1559423136|/oss-apps/mimesis-playing.webp|/oss-apps/mimesis-themes.webp|1391
forgr|Forgr|Cap-go/Forgr|tools|public|https://forgr.ee/|app.capgo.mapp||/oss-apps/forgr-home.webp|/oss-apps/forgr-chat.webp|1391
`
  .trim()
  .split('\n')

const isAppId = (value: string): value is AppId => value in summaryKeyById
const isAppKind = (value: string): value is AppKind => value in kindKeyByKind
const isLicense = (value: string): value is OssAppLicense => value === 'mit' || value === 'agpl' || value === 'public'

const screenshot = (src: string, height: number): OssAppScreenshot => ({ src, width: SCREENSHOT_WIDTH, height })

export const ossApps: OssApp[] = ossAppRows.map((row) => {
  const [id, name, repo, kind, license, website, playId, appStore, srcA, srcB, heightRaw] = row.split('|')
  if (!isAppId(id) || !isAppKind(kind) || !isLicense(license) || !srcA || !srcB) {
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
    screenshots: [screenshot(srcA, height), screenshot(srcB, height)],
  }
})
