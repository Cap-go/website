---
title: Manual
description: Cómo usar el actualizador Capgo en modo manual
sidebar:
  order: 3
locale: es
---

## Antes de empezar

:::tip
Si usas esta herramienta gratis, tómate un tiempo para apoyar mi trabajo con [GitHub sponsor](https://github.com/sponsors/riderx/)

Aposté por hacer de código abierto todo el código que construí aquí

Podría haberlo guardado para mí y ponerle un precio alto

En cambio, quiero hacer de esto un negocio abierto y transparente

Creo que haría de nuestro mundo un mejor lugar al abrir en lugar de luchar y esconder

Para hacerlo posible, es necesario que todos hagamos nuestra parte, incluyéndote a ti 🥹

Si la oferta de Capgo cloud no te conviene, apoya a un creador independiente [AQUÍ](https://github.com/sponsors/riderx/) en tus términos
:::

## Instalación rápida

```
npm install @capgo/capacitor-updater
npx cap sync
```

#### Configuración

Agrega esto a tu configuración para deshabilitar la actualización automática:

```tsx
// capacitorconfigjson
{
	"appId": "*******",
	"appName": "Name",
	"plugins": {
		"CapacitorUpdater": {
			"autoUpdate": false
		}
	}
}
```

Luego agrega este código a tu aplicación para usar la descarga manual

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { SplashScreen } from '@capacitor/splash-screen'
import { App } from '@capacitor/app'
let data = {version: ""}
CapacitorUpdaternotifyAppReady()
AppaddListener('appStateChange', async(state) => {
     if (stateisActive) {
       // Realiza la descarga durante el tiempo activo del usuario para evitar descargas fallidas
       data = await CapacitorUpdaterdownload({
       version: '004',
       url: 'https://github.com/Cap-go/demo-app/releases/download/004/distzip',
       })
     }
     if (!stateisActive && dataversion !== "") {
       // Realiza el cambio cuando el usuario deja la aplicación
       SplashScreenshow()
       try {
         await CapacitorUpdaterset(data)
       } catch (err) {
         consolelog(err)
         SplashScreenhide() // en caso de que falle el set, de lo contrario la nueva app tendrá que ocultarlo
       }
     }
 })
```

⚠️ Si envías una actualización defectuosa, la aplicación volverá a la última versión que funcionaba o a la incluida en la compilación nativa, si ninguna funciona

## Aplicación de demostración

Revisa la aplicación de demostración para más información

[GitHub - Cap-go/demo-app: demo app with manual and auto mode](https://github.com/Cap-go/demo-app/)

## Paquete

Independientemente del nombre que elijas para el archivo que descargues desde tu URL del servidor de lanzamientos/actualizaciones, el archivo zip debe contener el contenido completo de la carpeta de salida de tu compilación Capacitor de producción, generalmente `{directorio del proyecto}/dist/` o `{directorio del proyecto}/www/`

Aquí es donde se ubicará `indexhtml`, y también debe contener todo el JavaScript empaquetado, CSS y recursos web necesarios para que tu aplicación funcione

No encriptes este archivo con contraseña, o fallará al desempaquetarse
