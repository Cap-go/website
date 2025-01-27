---
title: Hybrides Update
description: Methoden für automatische Updates aktualisieren
sidebar:
  order: 3
locale: de
---

Wenn Sie Updates an Ihre Benutzer pushen, haben Sie einige Möglichkeiten, mit dem Aktualisierungszyklus umzugehen, wie es Ihnen am besten passt, bevor Sie sie anwenden.

- Stilles Update
- Auf das Ereignis ```updateAvailable``` hören
- Ein modales Fenster anzeigen oder Updates verzögern

## Stilles Update

Sie können einen Aktualisierungszyklus auslösen, der bei jedem Start der App stattfindet, indem Sie `directUpdate` auf `true` setzen. Dadurch wird der Aktualisierungszyklus wie gewohnt ohne Benutzerinteraktion ausgelöst.

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

Und dann sollten Sie in Ihrer App den Splashscreen ausblenden, wenn Sie das Ereignis `appReady` erhalten:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { SplashScreen } from '@capacitor/splash-screen'

CapacitorUpdateraddListener('appReady', () => {
  // Splash ausblenden
  SplashScreenhide()
})

CapacitorUpdaternotifyAppReady()
```

## Zwangsupdate

Fügen Sie einen Listener für das Ereignis `updateAvailable` hinzu und zeigen Sie dann ein Alert an, um den Benutzer darüber zu informieren, dass die App aktualisiert wird:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { Dialog } from '@capacitor/dialog'

CapacitorUpdateraddListener('updateAvailable', async (res) => {
  try {
    await Dialogalert({
      title: 'Update verfügbar',
      message: `Version ${resbundleversion} ist verfügbar. Die App wird jetzt aktualisiert.`,
    })
    CapacitorUpdaterset(resbundle)
  }
  catch (error) {
    consolelog(error)
  }
})

CapacitorUpdaternotifyAppReady()
```

## Modalupdate

Sie können auch den Benutzer entscheiden lassen, indem Sie einen Dialog anzeigen, um ihn zu fragen, ob er aktualisieren möchte:

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