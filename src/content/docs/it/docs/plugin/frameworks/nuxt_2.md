---
title: Nuxt 2
description: How to install plugins in Nuxt 2
sidebar:
  order: 1
locale: it
---

# Installazione in Nuxt 2

Crea un file plugin `capacitor-updaterjs` nella directory `plugins`

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

Questo caricherà il plugin sul lato client e notificherà all'app che è pronta a ricevere aggiornamenti