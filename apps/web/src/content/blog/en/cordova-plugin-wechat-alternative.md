---
slug: cordova-plugin-wechat-alternative
title: "cordova-plugin-wechat Alternative for Capacitor"
description: "cordova-plugin-wechat alternative for Capacitor: WeChat login, sharing, Pay, and mini-programs with @capgo/capacitor-wechat and Universal Links on iOS."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-11-14T09:00:00.000Z
updated_at: 2026-11-14T13:09:05.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: "Illustration of migrating a Cordova app to Capacitor, used for a WeChat SDK guide"
keywords: cordova-plugin-wechat alternative, capacitor wechat login, wechat pay capacitor, @capgo/capacitor-wechat, cordova wechat migration
tag: Alternatives, Capacitor, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What is the cordova-plugin-wechat alternative for Capacitor?"
    answer: "@capgo/capacitor-wechat wraps the official WeChat Open SDK with initialize, isInstalled, auth, share, sendPaymentRequest, openMiniProgram, and chooseInvoice."
  - question: "Do I still need Universal Links on iOS?"
    answer: "Yes. Cordova plugin 3.0.0+ requires universallink at install time. Capgo stores universalLink in capacitor.config.ts CapacitorWechat or passes it to initialize()."
  - question: "Is cordova-plugin-wechat maintained?"
    answer: "npm lists 3.1.0 with modified 13 July 2023. GitHub xu-li/cordova-plugin-wechat had commits in January 2024. The README documents WeChat SDK Universal Links requirements from iOS 13."
  - question: "Does WeChat work on web?"
    answer: "No. The Capgo README lists iOS and Android only."
  - question: "How do install-time variables map?"
    answer: "Cordova uses --variable wechatappid and universallink. Capgo uses plugins.CapacitorWechat.appId and universalLink in capacitor.config or initialize({ appId, universalLink })."
  - question: "Where are docs?"
    answer: "https://capgo.app/docs/plugins/wechat/, npm @capgo/capacitor-wechat, GitHub Cap-go/capacitor-wechat."
---

If you need a **cordova-plugin-wechat alternative** in Capacitor, use [`@capgo/capacitor-wechat`](/plugins/capacitor-wechat/). It covers the flows the Cordova plugin documents (install check, OAuth, sharing, WeChat Pay, mini-programs, and invoice picker) through promise methods on `CapacitorWechat` instead of the global `Wechat` object and callback APIs. This guide lists maintenance facts, install steps, a login example, and an API mapping table.

## Why migrate off cordova-plugin-wechat

`cordova-plugin-wechat` on npm is version **3.1.0** with `modified` **13 July 2023**. Source lives at [xu-li/cordova-plugin-wechat](https://github.com/xu-li/cordova-plugin-wechat). The README notes that from **plugin 3.0.0** onward you must configure **Universal Links** and pass `universallink` when installing the Cordova plugin, matching WeChat SDK security changes on iOS 13+.

Cordova integration pain points:

- `cordova plugin add cordova-plugin-wechat --variable wechatappid=... --variable universallink=...`
- Global `Wechat.share`, `Wechat.auth`, and `Wechat.Scene` constants.
- No Capacitor config surface, so each CI job must repeat install variables.

[`@capgo/capacitor-wechat`](https://www.npmjs.com/package/@capgo/capacitor-wechat) stores credentials in `capacitor.config.ts` and exposes `initialize()` for overrides. It targets **Capacitor 8** on the maintained v8 line. Capgo maintains the plugin in the open source repo where a human still reviews, tests and merges 50+ pull requests daily.

## Install

```bash
bun add @capgo/capacitor-wechat
bunx cap sync
```

Add WeChat credentials to config (or call `initialize` at runtime):

```ts
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    CapacitorWechat: {
      appId: 'wx1234567890abcdef',
      universalLink: 'https://your-domain.example.com/wechat/',
    },
  },
};

export default config;
```

Follow the iOS `Info.plist` URL types and Android signature requirements in the [plugin README](https://github.com/Cap-go/capacitor-wechat/). Register the same Universal Link with WeChat Open Platform that you used for the Cordova plugin.

## Usage example

```ts
import { CapacitorWechat } from '@capgo/capacitor-wechat';

export async function signInWithWechat() {
  const { installed } = await CapacitorWechat.isInstalled();
  if (!installed) {
    throw new Error('WeChat is not installed');
  }

  const { code, state } = await CapacitorWechat.auth({
    scope: 'snsapi_userinfo',
    state: `_${Date.now()}`,
  });

  return code;
}
```

Exchange `code` on your backend for an access token, same as with the Cordova plugin.

## Migrating from Cordova to Capacitor

Remove Cordova install variables from `config.xml` and delete global `Wechat` typings. Map scenes and media types to the structured objects documented on Capgo `share()`.

### API mapping table

| cordova-plugin-wechat | @capgo/capacitor-wechat |
| --- | --- |
| `--variable wechatappid` | `plugins.CapacitorWechat.appId` or `initialize({ appId })` |
| `--variable universallink` | `universalLink` in config or `initialize()` |
| `Wechat.isInstalled(success, error)` | `isInstalled()` → `{ installed }` |
| `Wechat.auth(scope, state, success, error)` | `auth({ scope, state })` → `{ code, state }` |
| `Wechat.share(options, success, error)` | `share({ ... })` with typed payload |
| `scene: Wechat.Scene.TIMELINE` | `share({ scene: 1 })` (0 session, 1 timeline, 2 favorite) |
| `message.media.type: Wechat.Type.WEBPAGE` | `share({ type: 'link', title, description, link, imageUrl })` |
| `Wechat.sendPaymentRequest(params, ...)` | `sendPaymentRequest({ partnerId, prepayId, ... })` |
| `Wechat.openMiniProgram(params, ...)` | `openMiniProgram({ userName, path, miniprogramType })` |
| `Wechat.chooseInvoiceFromWX(params, ...)` | `chooseInvoice({ ... })` |
| Cordova global at runtime | `import { CapacitorWechat } from '@capgo/capacitor-wechat'` |

Port thumb images and HD mini-program preview data to local `file://` or `content://` paths Capacitor can read, same as Cordova.

## Links and next steps

- Plugin docs: [https://capgo.app/docs/plugins/wechat/](/docs/plugins/wechat/)
- Marketing page: [/plugins/capacitor-wechat/](/plugins/capacitor-wechat/)
- npm: [https://www.npmjs.com/package/@capgo/capacitor-wechat](https://www.npmjs.com/package/@capgo/capacitor-wechat)
- GitHub: [https://github.com/Cap-go/capacitor-wechat/](https://github.com/Cap-go/capacitor-wechat/)
- Cordova upstream: [https://github.com/xu-li/cordova-plugin-wechat](https://github.com/xu-li/cordova-plugin-wechat)

Universal Link or WeChat App ID changes need a new native build. Use [Capgo Build](/native-build/) for signed iOS and Android binaries, then ship login UI tweaks with [live updates](/live-update/). Platform migration checklist: [migrating Cordova to Capacitor](/blog/migrating-cordova-to-capacitor/).