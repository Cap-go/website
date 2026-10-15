// Competitor comparison pages rendered by src/pages/alternatives/[slug].astro.
// Hand-written pages (ionic-appflow, capawesome, codepush, expo, median, voltbuilder) live in src/pages/alternatives/*.astro.
// Order here is the order shown on the /alternatives/ hub inside each category.

import { appcircle } from './appcircle'
import { appmysite } from './appmysite'
import { bitrise } from './bitrise'
import { codemagic } from './codemagic'
import { cordova } from './cordova'
import { despia } from './despia'
import { dotnetMaui } from './dotnet-maui'
import { flutter } from './flutter'
import { flutterflow } from './flutterflow'
import { hotUpdater } from './hot-updater'
import { kotlinMultiplatform } from './kotlin-multiplatform'
import { lynx } from './lynx'
import { mobiloud } from './mobiloud'
import { nativeDevelopment } from './native-development'
import { natively } from './natively'
import { nativescript } from './nativescript'
import { otakit } from './otakit'
import { pushy } from './pushy'
import { pwabuilder } from './pwabuilder'
import { reactNative } from './react-native'
import { revopush } from './revopush'
import { shorebird } from './shorebird'
import { stallion } from './stallion'
import type { AlternativeCompetitor } from './types'
import { webtonative } from './webtonative'

export const alternativeCompetitors: AlternativeCompetitor[] = [
  // Live updates
  otakit,
  revopush,
  hotUpdater,
  shorebird,
  stallion,
  pushy,
  // Web-to-app builders
  despia,
  mobiloud,
  natively,
  webtonative,
  pwabuilder,
  appmysite,
  // Frameworks and tech stacks
  reactNative,
  flutter,
  kotlinMultiplatform,
  nativeDevelopment,
  cordova,
  dotnetMaui,
  nativescript,
  lynx,
  flutterflow,
  // CI/CD
  codemagic,
  bitrise,
  appcircle,
]
