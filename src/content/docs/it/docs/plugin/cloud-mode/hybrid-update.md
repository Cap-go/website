---
title: Aggiornamento ibrido
description: Metodo di aggiornamento per gli aggiornamenti automatici
sidebar:
  order: 3
locale: it
---

Quando si inviano aggiornamenti agli utenti, ci sono diversi modi per gestire il ciclo di aggiornamento come meglio si crede prima di applicarli

1. Aggiornamento silenzioso 
2. Ascolto dell'evento ```updateAvailable```
3. Mostrare una finestra modale o ritardare gli aggiornamenti

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

Aggiungi un listener all'evento `updateAvailable` e poi mostra un avviso per far sapere all'utente che l'app si aggiornerà:

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

Puoi anche lasciare decidere all'utente mostrando una finestra di dialogo per chiedere se vogliono aggiornare:

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