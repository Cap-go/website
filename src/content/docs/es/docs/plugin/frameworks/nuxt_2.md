---
title: Nuxt 2
description: Cómo instalar el Plugin en Nuxt 2
sidebar:
  order: 1
locale: es
---

# Instalar en Nuxt 2

Crea un archivo de Plugin `capacitor-updaterjs` en el directorio `plugins`

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

export default ({ app }) => {
  if (processclient) {
    windowonNuxtReady(() => {
      CapacitorUpdater.notifyAppReady()
    })
  }
}
```

Esto cargará el Plugin del lado del cliente y notificará a la aplicación que está lista para recibir actualizaciones
