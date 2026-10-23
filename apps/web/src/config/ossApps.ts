export type OssAppLicense = 'mit' | 'agpl' | 'public'

export interface OssAppScreenshot {
  src: string
  width: number
  height: number
  altKey:
    | 'oss_apps_autobrowse_chat_alt'
    | 'oss_apps_autobrowse_home_alt'
    | 'oss_apps_simplefest_home_alt'
    | 'oss_apps_simplefest_scan_alt'
    | 'oss_apps_mondayquest_today_alt'
    | 'oss_apps_mondayquest_track_alt'
    | 'oss_apps_bewise_today_alt'
    | 'oss_apps_bewise_widget_alt'
    | 'oss_apps_mimesis_playing_alt'
    | 'oss_apps_mimesis_themes_alt'
    | 'oss_apps_forgr_home_alt'
    | 'oss_apps_forgr_chat_alt'
}

export interface OssApp {
  id: 'autobrowse' | 'simplefest' | 'mondayquest' | 'bewise' | 'mimesis' | 'forgr'
  name: string
  repo: string
  kindKey: 'oss_apps_kind_browser' | 'oss_apps_kind_events' | 'oss_apps_kind_habits' | 'oss_apps_kind_quotes' | 'oss_apps_kind_game' | 'oss_apps_kind_tools'
  summaryKey:
    | 'oss_apps_autobrowse_description'
    | 'oss_apps_simplefest_description'
    | 'oss_apps_mondayquest_description'
    | 'oss_apps_bewise_description'
    | 'oss_apps_mimesis_description'
    | 'oss_apps_forgr_description'
  license: OssAppLicense
  website: string
  github: string
  play: string
  appStore?: string
  screenshots: [OssAppScreenshot, OssAppScreenshot]
}

const shot = (src: string, height: number, altKey: OssAppScreenshot['altKey']): OssAppScreenshot => ({
  src,
  width: 640,
  height,
  altKey,
})

export const ossApps: OssApp[] = [
  {
    id: 'autobrowse',
    name: 'Auto Browse',
    repo: 'Cap-go/autobrowse',
    kindKey: 'oss_apps_kind_browser',
    summaryKey: 'oss_apps_autobrowse_description',
    license: 'public',
    website: 'https://autobrowse.dev/',
    github: 'https://github.com/Cap-go/autobrowse/',
    play: 'https://play.google.com/store/apps/details?id=app.capgo.browser',
    screenshots: [shot('/oss-apps/auto-chat.webp', 1391, 'oss_apps_autobrowse_chat_alt'), shot('/oss-apps/auto-main.webp', 1391, 'oss_apps_autobrowse_home_alt')],
  },
  {
    id: 'simplefest',
    name: 'Simple Fest',
    repo: 'Cap-go/simple-fest',
    kindKey: 'oss_apps_kind_events',
    summaryKey: 'oss_apps_simplefest_description',
    license: 'mit',
    website: 'https://simplefest.app/',
    github: 'https://github.com/Cap-go/simple-fest/',
    play: 'https://play.google.com/store/apps/details?id=ee.forgr.festivalscan',
    screenshots: [shot('/oss-apps/fest-home.webp', 1391, 'oss_apps_simplefest_home_alt'), shot('/oss-apps/fest-scan.webp', 1391, 'oss_apps_simplefest_scan_alt')],
  },
  {
    id: 'mondayquest',
    name: 'Monday Quest',
    repo: 'Cap-go/MondayQuest',
    kindKey: 'oss_apps_kind_habits',
    summaryKey: 'oss_apps_mondayquest_description',
    license: 'public',
    website: 'https://mondayquest.com/',
    github: 'https://github.com/Cap-go/MondayQuest/',
    play: 'https://play.google.com/store/apps/details?id=ee.forgr.mondayquest',
    screenshots: [shot('/oss-apps/monday-today.webp', 1248, 'oss_apps_mondayquest_today_alt'), shot('/oss-apps/monday-track.webp', 1248, 'oss_apps_mondayquest_track_alt')],
  },
  {
    id: 'bewise',
    name: 'BeWise',
    repo: 'Cap-go/bewise',
    kindKey: 'oss_apps_kind_quotes',
    summaryKey: 'oss_apps_bewise_description',
    license: 'mit',
    website: 'https://bewise.love/',
    github: 'https://github.com/Cap-go/bewise/',
    play: 'https://play.google.com/store/apps/details?id=ee.forgr.bewise',
    appStore: 'https://apps.apple.com/app/id1448918843',
    screenshots: [shot('/oss-apps/bewise-today.webp', 1391, 'oss_apps_bewise_today_alt'), shot('/oss-apps/bewise-widget.webp', 1391, 'oss_apps_bewise_widget_alt')],
  },
  {
    id: 'mimesis',
    name: 'Mimesis',
    repo: 'Cap-go/mimesis',
    kindKey: 'oss_apps_kind_game',
    summaryKey: 'oss_apps_mimesis_description',
    license: 'agpl',
    website: 'https://mimesis.fun/',
    github: 'https://github.com/Cap-go/mimesis/',
    play: 'https://play.google.com/store/apps/details?id=ee.forgr.mimesis',
    appStore: 'https://apps.apple.com/app/id1559423136',
    screenshots: [shot('/oss-apps/mimesis-playing.webp', 1391, 'oss_apps_mimesis_playing_alt'), shot('/oss-apps/mimesis-themes.webp', 1391, 'oss_apps_mimesis_themes_alt')],
  },
  {
    id: 'forgr',
    name: 'Forgr',
    repo: 'Cap-go/Forgr',
    kindKey: 'oss_apps_kind_tools',
    summaryKey: 'oss_apps_forgr_description',
    license: 'public',
    website: 'https://forgr.ee/',
    github: 'https://github.com/Cap-go/Forgr/',
    play: 'https://play.google.com/store/apps/details?id=app.capgo.mapp',
    screenshots: [shot('/oss-apps/forgr-home.webp', 1391, 'oss_apps_forgr_home_alt'), shot('/oss-apps/forgr-chat.webp', 1391, 'oss_apps_forgr_chat_alt')],
  },
]
