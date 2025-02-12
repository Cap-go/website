---
title: Mise à jour hybride
description: Update-Methoden für automatische Updates
sidebar:
  order: 3
locale: de
---

Beim Pushen von Updates an Ihre Benutzer haben Sie mehrere Möglichkeiten, den Update-Zyklus nach Ihren Vorstellungen zu handhaben, bevor Sie sie anwenden

- Stilles Update
- Auf ```updateAvailable``` Event hören
- Modalfenster anzeigen oder Updates verzögern

## Stilles Update

Sie können einen Update-Zyklus bei jedem App-Start erzwingen, indem Sie `directUpdate` auf `true` setzen. 
Dies löst den Update-Zyklus wie gewohnt ohne Benutzerinteraktion aus

```tsx
// capacitorconfigjson
{
	"appId": "*******",
	"appName": "Name",
	"plugins": {
		"CapacitorUpdater": {
			"directUpdate": true,
		},
    "SplashScreen": {
      "launchAutoHide": false,
    }
	}
}
```

In Ihrer App sollten Sie dann den Splash Screen ausblenden, wenn Sie das Event `appReady` empfangen:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { SplashScreen } from '@capacitor/splash-screen'

CapacitorUpdateraddListener('appReady', () => {
  // Hide splash
  SplashScreenhide()
})

CapacitorUpdaternotifyAppReady()
```

## Erzwungenes Update

Fügen Sie einen Listener für das Event `updateAvailable` hinzu und zeigen Sie dann eine Benachrichtigung an, um den Benutzer über das Update zu informieren:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { Dialog } from '@capacitor/dialog'

CapacitorUpdateraddListener('updateAvailable', async (res) => {
  try {
    await Dialogalert({
      title: 'Update verfügbar',
      message: `Version ${resbundleversion} ist verfügbar. Die App wird jetzt aktualisiert`,
    })
    CapacitorUpdaterset(resbundle)
  }
  catch (error) {
    consolelog(error)
  }
})

CapacitorUpdaternotifyAppReady()
```

## Modal Update

Sie können den Benutzer auch entscheiden lassen, indem Sie einen Dialog anzeigen, der nach dem Update fragt:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { Dialog } from '@capacitor/dialog'

CapacitorUpdateraddListener('updateAvailable', async (res) => {
  try {
    const { value } = await Dialogconfirm({
      title: 'Update verfügbar',
      message: `Version ${resbundleversion} ist verfügbar. Möchten Sie jetzt aktualisieren?`,
    })

    if (value)
      CapacitorUpdaterset(resbundle)

  }
  catch (error) {
    consolelog(error)
  }
})

CapacitorUpdaternotifyAppReady()
```