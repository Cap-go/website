---
title: Actualización híbrida
description: Métodos de actualización para actualizaciones automáticas
sidebar:
  order: 3
locale: es
---

Al enviar actualizaciones a tu usuario, tienes varias formas de manejar el ciclo de actualización según consideres conveniente antes de aplicarlas:

- Actualización silenciosa
- Escuchar el evento ```updateAvailable```
- Mostrar una ventana modal o retrasar actualizaciones

## Actualización silenciosa

Puedes forzar que ocurra un ciclo de actualización en cada inicio de la aplicación configurando `directUpdate` como `true`,
esto activará el ciclo de actualización como de costumbre sin la interacción del usuario

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

Y luego en tu aplicación, debes ocultar la pantalla de inicio cuando recibas el evento `appReady`:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { SplashScreen } from '@capacitor/splash-screen'

CapacitorUpdateraddListener('appReady', () => {
  // Hide splash
  SplashScreenhide()
})

CapacitorUpdaternotifyAppReady()
```

## Forzar actualización

Agrega un listener al evento `updateAvailable` y luego muestra una alerta para informar al usuario que la aplicación se actualizará:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { Dialog } from '@capacitor/dialog'

CapacitorUpdateraddListener('updateAvailable', async (res) => {
  try {
    await Dialogalert({
      title: 'Actualización Disponible',
      message: `La versión ${resbundleversion} está disponible. La aplicación se actualizará ahora`,
    })
    CapacitorUpdaterset(resbundle)
  }
  catch (error) {
    consolelog(error)
  }
})

CapacitorUpdaternotifyAppReady()
```

## Actualización modal

También puedes dejar que el usuario decida mostrando un diálogo para preguntarles si desean actualizar:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { Dialog } from '@capacitor/dialog'

CapacitorUpdateraddListener('updateAvailable', async (res) => {
  try {
    const { value } = await Dialogconfirm({
      title: 'Actualización Disponible',
      message: `La versión ${resbundleversion} está disponible. ¿Te gustaría actualizar ahora?`,
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