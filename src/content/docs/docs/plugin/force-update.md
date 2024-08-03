---
title: "Force update"
description: "Force your user to get the update"
sidebar:
  order: 4
---


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

And then in your app, you should hide the splash until receive the event `appReady`:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { SplashScreen } from '@capacitor/splash-screen'

// when the app boot for the first time it should hide the splash screen and show the downloading screen
// Keep in mind Apple and Google policy about splash screen, saying "downloading" or "updating" is not allowed
// You should show a loading screen with a progress bar or a spinner
// Keep in mind that the api respond time is average 1 sec and in the most far location ( Australia ) from our DB ( Germany ) is 3 sec
// To that you add the time to download (serve at the edge for Capgo) your zip bundle and unzip it ( 1-2 sec for a 5MB zip file )
// So you should show a loading screen for at least 5 sec in most of the case
// This has beeen reported to be a bad user experience outside of gaming, so we recommend to use the modal update, the force update or background ( the best )
// You can consider around 20-30% of user will close the app and never open it again if they see a loading screen for more than 5 sec

let isReady = false
SplashScreen.hide()
let percent = 0
let listDownload

const listReady = CapacitorUpdater.addListener('appReady', () => {
  // Hide splash
  isReady = true
  // Remove listeners
  listReady?.remove()
  listDownload?.remove()
})

listDownload = CapacitorUpdater.addListener('download', (res) => {
  // update download progress
  console.log(`Downloading ${res.bundle} ${res.percent}%`)
  percent = res.percent
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
