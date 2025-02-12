---
title: Mise à jour hybride
description: Méthode de mise à jour pour les mises à jour automatiques
sidebar:
  order: 3
locale: fr
---

Lors de la mise à jour de votre application, vous disposez de plusieurs façons de gérer le cycle de mise à jour comme vous le souhaitez avant de les appliquer

- Mise à jour silencieuse
- Écouter l'événement ```updateAvailable```
- Afficher une fenêtre modale ou retarder les mises à jour

## Mise à jour silencieuse

Vous pouvez forcer un cycle de mise à jour à chaque démarrage de l'application en définissant `directUpdate` sur `true`,
cela déclenchera le cycle de mise à jour comme d'habitude sans l'interaction de l'utilisateur

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

Ensuite dans votre application, vous devez masquer l'écran de démarrage lorsque vous recevez l'événement `appReady` :

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { SplashScreen } from '@capacitor/splash-screen'

CapacitorUpdateraddListener('appReady', () => {
  // Hide splash
  SplashScreenhide()
})

CapacitorUpdaternotifyAppReady()
```

## Forcer la mise à jour

Ajoutez un écouteur à l'événement `updateAvailable` puis affichez une alerte pour informer l'utilisateur que l'application va se mettre à jour :

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { Dialog } from '@capacitor/dialog'

CapacitorUpdateraddListener('updateAvailable', async (res) => {
  try {
    await Dialogalert({
      title: 'Mise à jour disponible',
      message: `La version ${resbundleversion} est disponible. L'application va se mettre à jour maintenant`,
    })
    CapacitorUpdaterset(resbundle)
  }
  catch (error) {
    consolelog(error)
  }
})

CapacitorUpdaternotifyAppReady()
```

## Mise à jour modale

Vous pouvez également laisser l'utilisateur décider en affichant une boîte de dialogue pour lui demander de mettre à jour :

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { Dialog } from '@capacitor/dialog'

CapacitorUpdateraddListener('updateAvailable', async (res) => {
  try {
    const { value } = await Dialogconfirm({
      title: 'Mise à jour disponible',
      message: `La version ${resbundleversion} est disponible. Voulez-vous mettre à jour maintenant ?`,
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