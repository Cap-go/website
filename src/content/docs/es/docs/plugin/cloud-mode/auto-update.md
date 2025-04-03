---
title: Auto actualización
description: Cómo utilizar la actualización automática con capacitor-updater
sidebar:
  order: 2
locale: es
---

Este modo permite a los desarrolladores utilizar capacitor-updater con modo de actualización automática y enviar actualizaciones a través de canales Capgo o equivalentes

### Prerrequisitos

Asegúrate de que la versión de tu aplicación use [https://semver.org/](https://semver.org/) antes de usar la actualización automática de Capgo

Esta es la convención que utiliza para gestionar versiones en Capgo

Hay dos formas de establecer la versión en tu aplicación:

Nueva forma: Usa el campo `version` en tu archivo `capacitor.config.json`

```json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true, // Habilitar actualización automática, true por defecto
      "appId": "com.example.app", // Usado para identificar la app en el servidor
      "version": "1.0.0" // Usado para verificar actualizaciones
    }
  }
}
```
Estas opciones serán utilizadas por el plugin para verificar actualizaciones y por la CLI para subir la versión

Forma antigua:
En 3 archivos en tu proyecto:

* `package.json` en **version**
* `android/app/build.gradle` en **versionName**
* `ios/App/App.xcodeproj/project.pbxproj` en **CURRENT_PROJECT_VERSION**

### Tutoriales

Configura tu app en 5 minutos

[Actualiza tus apps de capacitor sin problemas usando capacitor updater](https://capgo.app/blog/update-your-capacitor-apps-seamlessly-using-capacitor-updater)

Configura tu CI en 5 minutos

[Construcción y publicación automática con GitHub actions](https://capgo.app/blog/automatic-build-and-release-with-github-actions)

### Instalación

```bash
npm install @capgo/capacitor-updater
npx cap sync
```

### Introducción

Haz clic en [registro](https://capgo.app) para crear tu cuenta

El servidor te permite gestionar canales, versiones y mucho más

`autoUpdate` utilizará datos de `capacitor.config` para identificar el servidor Capgo

:::note
Aún puedes usar Capgo Cloud sin enviar tu código a nuestro servidor si tu empresa no lo permite
:::

#### Validar versión

Cuando la actualización automática está configurada, debes notificar desde JS que tu app está activa y lista

Esto se puede hacer llamando `notifyAppReady` dentro de tu app

Hazlo tan pronto como sea posible

```ts
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

#### Flujo de usuario
* El usuario abre la app, la app consulta al servidor por actualizaciones, si se encuentra alguna se descargará en segundo plano
* El usuario sale de la app, la nueva versión se establece como activa
* El usuario abre la app nuevamente, cargamos la nueva versión activa y la establecemos como predeterminada
* Si se llama a `notifyAppReady()`, cuando el usuario sale de la app, la versión anterior se elimina
* El usuario continúa el flujo normal de la app hasta el siguiente ciclo de actualización

:::danger
⚠️ No llamar a `notifyAppReady()` en tu app, hará que la versión actual se marque como inválida y volverá al último paquete válido o al original
:::

#### Flujo de desarrollo

Cuando desarrolles nuevas funciones, asegúrate de bloquear `autoUpdate`, ya que capgo sobrescribirá constantemente tu trabajo con el último paquete de actualización
Establece `autoUpdate` en false en tu configuración
Si por alguna razón te quedas atascado en una actualización, puedes eliminar la app y reinstalarla
Asegúrate de establecer `autoUpdate` en false en tu configuración antes de hacerlo
Y luego compílala nuevamente con Xcode o Android studio

Para subir la versión en cada commit configura CI/CD con esta guía

[Construcción y publicación automática con GitHub actions](https://capgo.app/blog/automatic-build-and-release-with-github-actions)

#### Evento Major Available

Cuando `disableAutoUpdateBreaking` está establecido en true, puedes escuchar el evento para saber cuándo la app rechaza hacer una actualización mayor

```jsx
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.addListener('majorAvailable', (info: any) => {
  console.log('majorAvailable was fired', info.version)
})
```