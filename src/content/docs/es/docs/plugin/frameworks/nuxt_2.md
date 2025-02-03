---
title: Nuxt 2
description: Cómo instalar el plugin en Nuxt 2
sidebar:
  order: 1
locale: es
---

# Instalación en Nuxt 2

Crea un archivo de plugin `capacitor-updaterjs` en el directorio `plugins`

```js

import { CapacitorUpdater } from '@capgo/capacitor-updater'

export default ({ app }) => {
  if (processclient) {
    windowonNuxtReady(() => {
      CapacitorUpdaternotifyAppReady()
    })
  }
}
```

Esto cargará el plugin en el lado del cliente y notificará a la aplicación que está lista para recibir actualizaciones