---
title: "Force update"
description: "Force your user to get the update"
sidebar:
  order: 4
---


# Options

You have 3 options to force your user to update:

- Direct update
- Force update
- Modal update


## Direct update

You can force an update to happen at every app start by setting `directUpdate` to `true`:

```tsx
// capacitor.config.json
{
	"appId": "**.***.**",
	"appName": "Name",
	"plugins": {
		"CapacitorUpdater": {
			"directUpdate": true,
		}
	}
}
```

And then in your app, you should hide the splash until receive the event  `appReady`:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { SplashScreen } from '@capacitor/splash-screen'

CapacitorUpdater.addListener('appReady', () => {
  // Hide splash
  SplashScreen.hide()
})

CapacitorUpdater.notifyAppReady()
```

## Force update

Add a listener to even `updateAvailable` and then show alert to tell the user the app will update:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { Dialog } from '@capacitor/dialog'

CapacitorUpdater.addListener('updateAvailable', async (res) => {
  try {
    await Dialog.alert({
      title: 'Update Available',
      message: `Version ${res.bundle.version} is available. The app will update now`,
    })
    CapacitorUpdater.set(res.bundle)
  }
  catch (error) {
    console.log(error)
  }
})

CapacitorUpdater.notifyAppReady()
```

## Modal update

You can also let the user decide by showing a dialog to ask the user to update:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { Dialog } from '@capacitor/dialog'

CapacitorUpdater.addListener('updateAvailable', async (res) => {
  try {
    const { value } = await Dialog.confirm({
      title: 'Update Available',
      message: `Version ${res.bundle.version} is available. Would you like to update now?`,
    })

    if (value)
      CapacitorUpdater.set(res.bundle)

  }
  catch (error) {
    console.log(error)
  }
})

CapacitorUpdater.notifyAppReady()
```
