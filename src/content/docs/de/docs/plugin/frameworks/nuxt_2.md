---
title: Nuxt 2
description: So installierst du das Plugin in Nuxt 2
sidebar:
  order: 1
locale: de
---

# Installation in Nuxt 2

Erstellen Sie eine Plugin-Datei `capacitor-updaterjs` im `plugins` Verzeichnis

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

Dies lädt das Plugin auf der Client-Seite und informiert die App, dass sie bereit ist, Updates zu empfangen