# ChatGPT ads (OpenAI Ads Manager)

Import file built from the OpenAI Ads campaign workbook template. One campaign per landing page, one ad group, three ads.
Every campaign: 15/day, Clicks objective (max CPC 3), launch 2026-10-21, countries US, CA, GB, AU, NZ, IE.

Every link carries `offer=direct`. With it, the site replaces the free trial copy with a 14-day money-back guarantee, and the signup gets no trial (backend reads `offer` from the signup metadata).

Limits: title ≤ 24, copy ≤ 48. Images are 1080×1080 PNG in `apps/web/public/ads/chatgpt/`, one per ad, served at `https://capgo.app/ads/chatgpt/{campaign}-{variant}.png`.

## CapgoChatGPTLovableToMobile

Landing page: https://capgo.app/solutions/lovable-to-mobile/

| Variant | Title | Copy | Image | Links |
|---|---|---|---|---|
| `a_store` | Lovable app to App Store (24) | Turn your Lovable app into iOS and Android apps (47) | Phone with App Store and Google Play buttons | [image](https://capgo.app/ads/chatgpt/lovable-a_store.png) · [tracking URL](https://capgo.app/solutions/lovable-to-mobile/?offer=direct&utm_source=chatgpt&utm_medium=paid_chat&utm_campaign=chatgpt_lovabletomobile&utm_content=a_store) |
| `b_nomac` | Lovable to iOS, no Mac (22) | No Mac, no Xcode. Signed builds in the cloud. (45) | Terminal running `npx @capgo/cli build request --platform ios` | [image](https://capgo.app/ads/chatgpt/lovable-b_nomac.png) · [tracking URL](https://capgo.app/solutions/lovable-to-mobile/?offer=direct&utm_source=chatgpt&utm_medium=paid_chat&utm_campaign=chatgpt_lovabletomobile&utm_content=b_nomac) |
| `c_updates` | Ship Lovable to stores (22) | Each Lovable Publish ships as a live update (43) | One web change updating three phones | [image](https://capgo.app/ads/chatgpt/lovable-c_updates.png) · [tracking URL](https://capgo.app/solutions/lovable-to-mobile/?offer=direct&utm_source=chatgpt&utm_medium=paid_chat&utm_campaign=chatgpt_lovabletomobile&utm_content=c_updates) |

## CapgoChatGPTBase44ToMobile

Landing page: https://capgo.app/solutions/base44-to-mobile/

| Variant | Title | Copy | Image | Links |
|---|---|---|---|---|
| `a_store` | Base44 app to App Store (23) | Turn your Base44 app into iOS and Android apps (46) | Phone with App Store and Google Play buttons | [image](https://capgo.app/ads/chatgpt/base44-a_store.png) · [tracking URL](https://capgo.app/solutions/base44-to-mobile/?offer=direct&utm_source=chatgpt&utm_medium=paid_chat&utm_campaign=chatgpt_base44tomobile&utm_content=a_store) |
| `b_nomac` | Base44 to iOS, no Mac (21) | No Mac, no Xcode. Signed builds in the cloud. (45) | Terminal running `npx @capgo/cli build request --platform ios` | [image](https://capgo.app/ads/chatgpt/base44-b_nomac.png) · [tracking URL](https://capgo.app/solutions/base44-to-mobile/?offer=direct&utm_source=chatgpt&utm_medium=paid_chat&utm_campaign=chatgpt_base44tomobile&utm_content=b_nomac) |
| `c_updates` | Ship Base44 to stores (21) | Each Base44 change ships as a live update (41) | One web change updating three phones | [image](https://capgo.app/ads/chatgpt/base44-c_updates.png) · [tracking URL](https://capgo.app/solutions/base44-to-mobile/?offer=direct&utm_source=chatgpt&utm_medium=paid_chat&utm_campaign=chatgpt_base44tomobile&utm_content=c_updates) |

## CapgoChatGPTBoltToMobile

Landing page: https://capgo.app/solutions/bolt-to-mobile/

| Variant | Title | Copy | Image | Links |
|---|---|---|---|---|
| `a_store` | Bolt app to App Store (21) | Turn your Bolt app into iOS and Android apps (44) | Phone with App Store and Google Play buttons | [image](https://capgo.app/ads/chatgpt/bolt-a_store.png) · [tracking URL](https://capgo.app/solutions/bolt-to-mobile/?offer=direct&utm_source=chatgpt&utm_medium=paid_chat&utm_campaign=chatgpt_bolttomobile&utm_content=a_store) |
| `b_nomac` | Bolt to iOS, no Mac (19) | No Mac, no Xcode. Signed builds in the cloud. (45) | Terminal running `npx @capgo/cli build request --platform ios` | [image](https://capgo.app/ads/chatgpt/bolt-b_nomac.png) · [tracking URL](https://capgo.app/solutions/bolt-to-mobile/?offer=direct&utm_source=chatgpt&utm_medium=paid_chat&utm_campaign=chatgpt_bolttomobile&utm_content=b_nomac) |
| `c_updates` | Ship Bolt to stores (19) | Each Bolt change ships as a live update (39) | One web change updating three phones | [image](https://capgo.app/ads/chatgpt/bolt-c_updates.png) · [tracking URL](https://capgo.app/solutions/bolt-to-mobile/?offer=direct&utm_source=chatgpt&utm_medium=paid_chat&utm_campaign=chatgpt_bolttomobile&utm_content=c_updates) |

## CapgoChatGPTReplitToMobile

Landing page: https://capgo.app/solutions/replit-to-mobile/

| Variant | Title | Copy | Image | Links |
|---|---|---|---|---|
| `a_store` | Replit app to App Store (23) | Turn your Replit app into iOS and Android apps (46) | Phone with App Store and Google Play buttons | [image](https://capgo.app/ads/chatgpt/replit-a_store.png) · [tracking URL](https://capgo.app/solutions/replit-to-mobile/?offer=direct&utm_source=chatgpt&utm_medium=paid_chat&utm_campaign=chatgpt_replittomobile&utm_content=a_store) |
| `b_nomac` | Replit to iOS, no Mac (21) | No Mac, no Xcode. Signed builds in the cloud. (45) | Terminal running `npx @capgo/cli build request --platform ios` | [image](https://capgo.app/ads/chatgpt/replit-b_nomac.png) · [tracking URL](https://capgo.app/solutions/replit-to-mobile/?offer=direct&utm_source=chatgpt&utm_medium=paid_chat&utm_campaign=chatgpt_replittomobile&utm_content=b_nomac) |
| `c_updates` | Ship Replit to stores (21) | Each Replit change ships as a live update (41) | One web change updating three phones | [image](https://capgo.app/ads/chatgpt/replit-c_updates.png) · [tracking URL](https://capgo.app/solutions/replit-to-mobile/?offer=direct&utm_source=chatgpt&utm_medium=paid_chat&utm_campaign=chatgpt_replittomobile&utm_content=c_updates) |

## CapgoChatGPTV0ToMobile

Landing page: https://capgo.app/solutions/v0-to-mobile/

| Variant | Title | Copy | Image | Links |
|---|---|---|---|---|
| `a_store` | v0 app to App Store (19) | Turn your v0 app into iOS and Android apps (42) | Phone with App Store and Google Play buttons | [image](https://capgo.app/ads/chatgpt/v0-a_store.png) · [tracking URL](https://capgo.app/solutions/v0-to-mobile/?offer=direct&utm_source=chatgpt&utm_medium=paid_chat&utm_campaign=chatgpt_v0tomobile&utm_content=a_store) |
| `b_nomac` | v0 to iOS, no Mac (17) | No Mac, no Xcode. Signed builds in the cloud. (45) | Terminal running `npx @capgo/cli build request --platform ios` | [image](https://capgo.app/ads/chatgpt/v0-b_nomac.png) · [tracking URL](https://capgo.app/solutions/v0-to-mobile/?offer=direct&utm_source=chatgpt&utm_medium=paid_chat&utm_campaign=chatgpt_v0tomobile&utm_content=b_nomac) |
| `c_updates` | Ship v0 to stores (17) | Each v0 change ships as a live update (37) | One web change updating three phones | [image](https://capgo.app/ads/chatgpt/v0-c_updates.png) · [tracking URL](https://capgo.app/solutions/v0-to-mobile/?offer=direct&utm_source=chatgpt&utm_medium=paid_chat&utm_campaign=chatgpt_v0tomobile&utm_content=c_updates) |

## CapgoChatGPTLiveUpdates

Landing page: https://capgo.app/live-update/

| Variant | Title | Copy | Image | Links |
|---|---|---|---|---|
| `a_ota` | Capacitor live updates (22) | Ship fixes without waiting on store review. (43) | One fix reaching three phones at next open | [image](https://capgo.app/ads/chatgpt/live-update-a_ota.png) · [tracking URL](https://capgo.app/live-update/?offer=direct&utm_source=chatgpt&utm_medium=paid_chat&utm_campaign=chatgpt_liveupdates&utm_content=a_ota) |
| `b_minutes` | Fix bugs in minutes (19) | Live updates reach users at the next app open. (46) | Terminal running `npx @capgo/cli bundle upload --channel=production` | [image](https://capgo.app/ads/chatgpt/live-update-b_minutes.png) · [tracking URL](https://capgo.app/live-update/?offer=direct&utm_source=chatgpt&utm_medium=paid_chat&utm_campaign=chatgpt_liveupdates&utm_content=b_minutes) |
| `c_rollback` | Roll back bad updates (21) | Choose who gets each update. Take it back fast. (47) | Channel version list with a rolled-back release | [image](https://capgo.app/ads/chatgpt/live-update-c_rollback.png) · [tracking URL](https://capgo.app/live-update/?offer=direct&utm_source=chatgpt&utm_medium=paid_chat&utm_campaign=chatgpt_liveupdates&utm_content=c_rollback) |

## CapgoChatGPTNativeBuild

Landing page: https://capgo.app/native-build/

| Variant | Title | Copy | Image | Links |
|---|---|---|---|---|
| `a_command` | Ship without the Mac (20) | One command builds signed iOS and Android apps (46) | Terminal running `npx @capgo/cli build request --platform ios` | [image](https://capgo.app/ads/chatgpt/native-build-a_command.png) · [tracking URL](https://capgo.app/native-build/?offer=direct&utm_source=chatgpt&utm_medium=paid_chat&utm_campaign=chatgpt_nativebuild&utm_content=a_command) |
| `b_cloud` | iOS cloud builds (16) | Capacitor iOS builds on cloud Macs. No Xcode. (45) | Terminal with signed Android and iOS builds | [image](https://capgo.app/ads/chatgpt/native-build-b_cloud.png) · [tracking URL](https://capgo.app/native-build/?offer=direct&utm_source=chatgpt&utm_medium=paid_chat&utm_campaign=chatgpt_nativebuild&utm_content=b_cloud) |
| `c_qr` | Share builds by QR code (23) | Share a build with a QR code. No TestFlight. (44) | QR code with install checklist | [image](https://capgo.app/ads/chatgpt/native-build-c_qr.png) · [tracking URL](https://capgo.app/native-build/?offer=direct&utm_source=chatgpt&utm_medium=paid_chat&utm_campaign=chatgpt_nativebuild&utm_content=c_qr) |

## CapgoChatGPTBuildWithoutMac

Landing page: https://capgo.app/solutions/build-without-mac/

| Variant | Title | Copy | Image | Links |
|---|---|---|---|---|
| `a_nomac` | iOS apps without a Mac (22) | Build iOS apps without owning a Mac (35) | Phone with App Store and Google Play buttons | [image](https://capgo.app/ads/chatgpt/build-without-mac-a_nomac.png) · [tracking URL](https://capgo.app/solutions/build-without-mac/?offer=direct&utm_source=chatgpt&utm_medium=paid_chat&utm_campaign=chatgpt_buildwithoutmac&utm_content=a_nomac) |
| `b_windows` | Ship iOS from Windows (21) | Windows and Linux devs ship iOS with Capgo. (43) | PowerShell terminal running an iOS build | [image](https://capgo.app/ads/chatgpt/build-without-mac-b_windows.png) · [tracking URL](https://capgo.app/solutions/build-without-mac/?offer=direct&utm_source=chatgpt&utm_medium=paid_chat&utm_campaign=chatgpt_buildwithoutmac&utm_content=b_windows) |
| `c_keys` | Cloud Macs, your keys (21) | Credentials are deleted when each build ends. (45) | Three cards: credentials, native folder, isolated build | [image](https://capgo.app/ads/chatgpt/build-without-mac-c_keys.png) · [tracking URL](https://capgo.app/solutions/build-without-mac/?offer=direct&utm_source=chatgpt&utm_medium=paid_chat&utm_campaign=chatgpt_buildwithoutmac&utm_content=c_keys) |

## CapgoChatGPTWebappToMobile

Landing page: https://capgo.app/solutions/webapp-to-mobile/

| Variant | Title | Copy | Image | Links |
|---|---|---|---|---|
| `a_store` | Web app to App Store (20) | Turn your web app into iOS and Android apps (43) | Phone with App Store and Google Play buttons | [image](https://capgo.app/ads/chatgpt/webapp-to-mobile-a_store.png) · [tracking URL](https://capgo.app/solutions/webapp-to-mobile/?offer=direct&utm_source=chatgpt&utm_medium=paid_chat&utm_campaign=chatgpt_webapptomobile&utm_content=a_store) |
| `b_codebase` | Keep your web codebase (22) | One web codebase for iOS and Android apps. (42) | One web app reaching three phones | [image](https://capgo.app/ads/chatgpt/webapp-to-mobile-b_codebase.png) · [tracking URL](https://capgo.app/solutions/webapp-to-mobile/?offer=direct&utm_source=chatgpt&utm_medium=paid_chat&utm_campaign=chatgpt_webapptomobile&utm_content=b_codebase) |
| `c_build` | Web app to iOS, no Mac (22) | Signed iOS and Android builds in the cloud. (43) | Terminal running `npx cap add ios && npx cap add android` and `npx @capgo/cli build request --platform ios` | [image](https://capgo.app/ads/chatgpt/webapp-to-mobile-c_build.png) · [tracking URL](https://capgo.app/solutions/webapp-to-mobile/?offer=direct&utm_source=chatgpt&utm_medium=paid_chat&utm_campaign=chatgpt_webapptomobile&utm_content=c_build) |
