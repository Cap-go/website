---
title: "Manual"
description: "How to use Capgo updater in manual mode"
sidebar:
    order: 3
---

## Before start

:::tip
If you use this tool for free, take time to support my work with [GitHub sponsor](https://github.com/sponsors/riderx).

I made a bet to open source all the code I built here.

I could have kept it for myself and put a high ticket price.

Instead, I want to make it an open and transparent business.

I do think it would make our world a better place by opening instead of fighting and hiding.

To make it possible, it is necessary for all of us to do our part, including you 🥹.

If Capgo cloud offer can't suit you, back a bootstrapped Maker [HERE](https://github.com/sponsors/riderx) on your terms.
:::

## Quick install

```
npm install @capgo/capacitor-updater
npx cap sync
```

#### Config

Add this to your config, to disable auto-update:

```tsx
// capacitor.config.json
{
	"appId": "**.***.**",
	"appName": "Name",
	"plugins": {
		"CapacitorUpdater": {
			"autoUpdate": false
		}
	}
}
```

Then add this code to your app to use manual download

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { SplashScreen } from '@capacitor/splash-screen'
import { App } from '@capacitor/app'
let data = {version: ""}
CapacitorUpdater.notifyAppReady()
App.addListener('appStateChange', async(state) => {
     if (state.isActive) {
       // Do the download during user active app time to prevent failed download
       data = await CapacitorUpdater.download({
       version: '0.0.4',
       url: 'https://github.com/Cap-go/demo-app/releases/download/0.0.4/dist.zip',
       })
     }
     if (!state.isActive && data.version !== "") {
       // Do the switch when user leave app
       SplashScreen.show()
       try {
         await CapacitorUpdater.set(data)
       } catch (err) {
         console.log(err)
         SplashScreen.hide() // in case the set fail, otherwise the new app will have to hide it
       }
     }
 })
 
```

⚠️ If you send a broken update, the app will revert to the last working version, or the one include with the native build, if none works.

## Demo app&#x20;

Check the demo app for more info

[GitHub - Cap-go/demo-app: demo app with manual and auto mode](https://github.com/Cap-go/demo-app)

## Package

Whatever you choose to name the file you download from your release/update server URL, the zip file should contain the full contents of your production Capacitor build output folder, usually `{project directory}/dist/` or `{project directory}/www/`.

This is where `index.html` will be located, and it should also contain all bundled JavaScript, CSS, and web resources necessary for your app to run.

Do not password encrypt this file, or it will fail to unpack.
