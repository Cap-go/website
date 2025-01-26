---
title: Nuxt 2
description: Wie man das Plugin in Nuxt 2 installiert
sidebar:
  order: 1
locale: de
---

# Installation in Nuxt 2

Erstellen Sie eine Plugin-Datei `capacitor-updaterjs` im Verzeichnis `plugins`

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

Dies wird das Plugin auf der Client-Seite laden und die App benachrichtigen, dass sie bereit ist, Updates zu empfangen.