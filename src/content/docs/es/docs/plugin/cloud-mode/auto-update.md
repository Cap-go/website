---
title: Actualización automática
description: Cómo usar la auto-actualización con capacitor-updater
sidebar:
  order: 2
locale: es
---

Este modo permite a los desarrolladores usar capacitor-updater con modo de actualización automática y enviar actualizaciones a través de canales Capgo o equivalentes

### Requisitos previos

Asegúrate de que la versión de tu aplicación use [https://semverorg/](https://semverorg/) antes de usar la actualización automática de Capgo

Esta es la convención que utiliza para gestionar versiones en Capgo

Hay dos formas de establecer la versión en tu aplicación:

Nueva forma: Usa el campo `version` en tu archivo `capacitorconfigjson`

```json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true, // Habilitar actualización automática, true por defecto
      "appId": "comexampleapp", // Usado para identificar la app en el servidor
      "version": "100" // Usado para buscar actualizaciones
    }
  }
}
```
Estas opciones serán utilizadas por el plugin para buscar actualizaciones y por el CLI para subir la versión

Forma antigua:
En 3 archivos en tu proyecto:

* `packagejson` en **version**
* `android/app/buildgradle` en **versionName**
* `ios/App/Appxcodeproj/projectpbxproj` en **CURRENT\_PROJECT\_VERSION**

### Tutoriales

Configura tu app en 5 minutos

[Actualiza tus aplicaciones Capacitor sin problemas usando capacitor updater](https://capgoapp/blog/update-your-capacitor-apps-seamlessly-using-capacitor-updater)

Configura tu CI en 5 minutos

[Construcción y publicación automática con GitHub actions](https://capgoapp/blog/automatic-build-and-release-with-github-actions)

### Instalación

```bash
npm install @capgo/capacitor-updater
npx cap sync
```

### Introducción

Haz clic en [registrarse](https://capgoapp) para crear tu cuenta

El servidor te permite gestionar canales y versiones y mucho más

`autoUpdate` usará datos de `capacitorconfig` para identificar el servidor Capgo

:::note
Aún puedes usar Capgo Cloud sin enviar tu código a nuestro servidor si tu empresa no lo permite
:::

#### Validar versión

Cuando la actualización automática está configurada, debes notificar desde JS que tu aplicación está activa y lista

Esto se puede hacer llamando `notifyAppReady` dentro de tu aplicación

Hazlo lo antes posible

```ts
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdaternotifyAppReady()
```

#### Flujo de usuario
* El usuario abre la app, la app consulta al servidor para buscar actualizaciones, si se encuentra alguna se descargará en segundo plano
* El usuario sale de la app, la nueva versión se establece como activa
* El usuario abre la app de nuevo, cargamos la nueva versión activa y la establecemos como predeterminada
* Si se llama a `notifyAppReady()`, cuando el usuario sale de la app, la versión anterior se elimina
* El usuario continúa el flujo normal de la app hasta el siguiente ciclo de actualización

:::danger
⚠️ No llamar a `notifyAppReady()` en tu app, hará que la versión actual se marque como inválida y volverá al paquete válido anterior o al stock
:::

#### Flujo de desarrollo

Cuando desarrolles nuevas funciones, asegúrate de bloquear `autoUpdate`, ya que capgo sobrescribirá constantemente tu trabajo con el último paquete de actualización
Establece `autoUpdate` en false en tu configuración
Si por alguna razón te quedas atascado en una actualización, puedes eliminar la app y reinstalarla
Asegúrate de establecer `autoUpdate` en false en tu configuración antes de hacerlo
Y luego construirla de nuevo con Xcode o Android studio

Para subir la versión en cada commit, configura CI/CD con esta guía

[Construcción y publicación automática con GitHub actions](https://capgoapp/blog/automatic-build-and-release-with-github-actions)

#### Evento Major Available

Cuando `disableAutoUpdateBreaking` está establecido en true, puedes escuchar el evento para saber cuándo la app rechaza hacer una actualización importante

```jsx
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdateraddListener('majorAvailable', (info: any) => {
  consolelog('majorAvailable fue disparado', infoversion)
})
```