---
title: Nuxt 2
description: Cara menginstall plugin di Nuxt 2
sidebar:
  order: 1
locale: id
---

# Instalasi di Nuxt 2

Buat file plugin `capacitor-updaterjs` di direktori `plugins`

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

Ini akan memuat plugin di sisi klien dan memberi tahu aplikasi bahwa aplikasi siap menerima pembaruan