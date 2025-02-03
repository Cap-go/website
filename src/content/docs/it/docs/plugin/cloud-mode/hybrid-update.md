---
title: 하이브리드 업데이트
description: Metodo di aggiornamento per gli aggiornamenti automatici
sidebar:
  order: 3
locale: it
---

Durante il push degli aggiornamenti agli utenti, hai diversi modi per gestire il ciclo di aggiornamento come ritieni opportuno prima di applicarli

- Aggiornamento silenzioso
- Ascolta l'evento ```updateAvailable```
- Mostra una finestra modale o ritarda gli aggiornamenti

## Aggiornamento silenzioso

Puoi forzare un ciclo di aggiornamento ad ogni avvio dell'app impostando `directUpdate` su `true`,
questo attiverà il ciclo di aggiornamento come al solito senza l'interazione dell'utente

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

E poi nella tua app, dovresti nascondere la schermata iniziale quando ricevi l'evento `appReady`:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { SplashScreen } from '@capacitor/splash-screen'

CapacitorUpdateraddListener('appReady', () => {
  // Hide splash
  SplashScreenhide()
})

CapacitorUpdaternotifyAppReady()
```

## Forza aggiornamento

Aggiungi un listener all'evento `updateAvailable` e poi mostra un avviso per informare l'utente che l'app si aggiornerà:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { Dialog } from '@capacitor/dialog'

CapacitorUpdateraddListener('updateAvailable', async (res) => {
  try {
    await Dialogalert({
      title: 'Aggiornamento Disponibile',
      message: `La versione ${resbundleversion} è disponibile. L'app si aggiornerà ora`,
    })
    CapacitorUpdaterset(resbundle)
  }
  catch (error) {
    consolelog(error)
  }
})

CapacitorUpdaternotifyAppReady()
```

## Aggiornamento modale

Puoi anche lasciare decidere all'utente mostrando una finestra di dialogo per chiedere se desidera aggiornare:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { Dialog } from '@capacitor/dialog'

CapacitorUpdateraddListener('updateAvailable', async (res) => {
  try {
    const { value } = await Dialogconfirm({
      title: 'Aggiornamento Disponibile',
      message: `La versione ${resbundleversion} è disponibile. Vuoi aggiornare ora?`,
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