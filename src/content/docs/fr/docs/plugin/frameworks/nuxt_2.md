---
title: Nuxt 2
description: Comment installer le plugin dans Nuxt 2
sidebar:
  order: 1
locale: fr
---

# Installation dans Nuxt 2

Créez un fichier plugin `capacitor-updaterjs` dans le répertoire `plugins`

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

Cela chargera le plugin côté client et notifiera l'application qu'elle est prête à recevoir des mises à jour