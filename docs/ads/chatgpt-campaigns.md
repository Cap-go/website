# ChatGPT ads (OpenAI Ads Manager)

Import file built from the OpenAI Ads campaign workbook template. One campaign per landing page, one ad group, three ads.
Every campaign: 15/day, Clicks objective (max CPC 3), launch 2026-10-21, countries US, CA, GB, AU, NZ, IE.

Every link carries `offer=direct`. With it, the site replaces the free trial copy with a 14-day money-back guarantee, and the signup gets no trial (backend reads `offer` from the signup metadata).

Limits: title ≤ 24, copy ≤ 48. Images are 1080×1080 PNG in `apps/web/public/ads/chatgpt/`, one per ad, served at `https://capgo.app/ads/chatgpt/{campaign}-{variant}.png`.

## CapgoChatGPTLovableToMobile

Landing page: https://capgo.app/solutions/lovable-to-mobile/

| Variant | Title | Copy | Image |
|---|---|---|---|
| `a_store` | Lovable app to App Store (24) | Turn your Lovable app into iOS and Android apps (47) | Phone with App Store and Google Play buttons |
| `b_nomac` | Lovable to iOS, no Mac (22) | No Mac, no Xcode. Signed builds in the cloud. (45) | Terminal running `build request --platform ios` |
| `c_updates` | Ship Lovable to stores (22) | Each Lovable Publish ships as a live update (43) | One web change updating three phones |

## CapgoChatGPTBase44ToMobile

Landing page: https://capgo.app/solutions/base44-to-mobile/

| Variant | Title | Copy | Image |
|---|---|---|---|
| `a_store` | Base44 app to App Store (23) | Turn your Base44 app into iOS and Android apps (46) | Phone with App Store and Google Play buttons |
| `b_nomac` | Base44 to iOS, no Mac (21) | No Mac, no Xcode. Signed builds in the cloud. (45) | Terminal running `build request --platform ios` |
| `c_updates` | Ship Base44 to stores (21) | Each Base44 change ships as a live update (41) | One web change updating three phones |

## CapgoChatGPTBoltToMobile

Landing page: https://capgo.app/solutions/bolt-to-mobile/

| Variant | Title | Copy | Image |
|---|---|---|---|
| `a_store` | Bolt app to App Store (21) | Turn your Bolt app into iOS and Android apps (44) | Phone with App Store and Google Play buttons |
| `b_nomac` | Bolt to iOS, no Mac (19) | No Mac, no Xcode. Signed builds in the cloud. (45) | Terminal running `build request --platform ios` |
| `c_updates` | Ship Bolt to stores (19) | Each Bolt change ships as a live update (39) | One web change updating three phones |

## CapgoChatGPTReplitToMobile

Landing page: https://capgo.app/solutions/replit-to-mobile/

| Variant | Title | Copy | Image |
|---|---|---|---|
| `a_store` | Replit app to App Store (23) | Turn your Replit app into iOS and Android apps (46) | Phone with App Store and Google Play buttons |
| `b_nomac` | Replit to iOS, no Mac (21) | No Mac, no Xcode. Signed builds in the cloud. (45) | Terminal running `build request --platform ios` |
| `c_updates` | Ship Replit to stores (21) | Each Replit change ships as a live update (41) | One web change updating three phones |

## CapgoChatGPTV0ToMobile

Landing page: https://capgo.app/solutions/v0-to-mobile/

| Variant | Title | Copy | Image |
|---|---|---|---|
| `a_store` | v0 app to App Store (19) | Turn your v0 app into iOS and Android apps (42) | Phone with App Store and Google Play buttons |
| `b_nomac` | v0 to iOS, no Mac (17) | No Mac, no Xcode. Signed builds in the cloud. (45) | Terminal running `build request --platform ios` |
| `c_updates` | Ship v0 to stores (17) | Each v0 change ships as a live update (37) | One web change updating three phones |

## CapgoChatGPTLiveUpdates

Landing page: https://capgo.app/live-update/

| Variant | Title | Copy | Image |
|---|---|---|---|
| `a_ota` | Capacitor live updates (22) | Ship fixes without waiting on store review. (43) | One fix reaching three phones at next open |
| `b_minutes` | Fix bugs in minutes (19) | Live updates reach users at the next app open. (46) | Terminal running `bundle upload --channel=production` |
| `c_rollback` | Roll back bad updates (21) | Choose who gets each update. Take it back fast. (47) | Channel version list with a rolled-back release |

## CapgoChatGPTNativeBuild

Landing page: https://capgo.app/native-build/

| Variant | Title | Copy | Image |
|---|---|---|---|
| `a_command` | Ship without the Mac (20) | One command builds signed iOS and Android apps (46) | Terminal running `build request --platform ios` |
| `b_cloud` | iOS cloud builds (16) | Capacitor iOS builds on cloud Macs. No Xcode. (45) | Terminal with signed Android and iOS builds |
| `c_qr` | Share builds by QR code (23) | Share a build with a QR code. No TestFlight. (44) | QR code with install checklist |

## CapgoChatGPTBuildWithoutMac

Landing page: https://capgo.app/solutions/build-without-mac/

| Variant | Title | Copy | Image |
|---|---|---|---|
| `a_nomac` | iOS apps without a Mac (22) | Build iOS apps without owning a Mac (35) | Phone with App Store and Google Play buttons |
| `b_windows` | Ship iOS from Windows (21) | Windows and Linux devs ship iOS with Capgo. (43) | PowerShell terminal running an iOS build |
| `c_keys` | Cloud Macs, your keys (21) | Credentials are deleted when each build ends. (45) | Three cards: credentials, native folder, isolated build |

## CapgoChatGPTWebappToMobile

Landing page: https://capgo.app/solutions/webapp-to-mobile/

| Variant | Title | Copy | Image |
|---|---|---|---|
| `a_store` | Web app to App Store (20) | Turn your web app into iOS and Android apps (43) | Phone with App Store and Google Play buttons |
| `b_codebase` | Keep your web codebase (22) | One web codebase for iOS and Android apps. (42) | One web app reaching three phones |
| `c_build` | Web app to iOS, no Mac (22) | Signed iOS and Android builds in the cloud. (43) | Terminal running `cap add` and `build request` |
