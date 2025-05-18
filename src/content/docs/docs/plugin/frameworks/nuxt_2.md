---
title: "Nuxt 2"
description: "A detailed guide on installing and configuring the Capgo plugin within a Nuxt 2 application, ensuring seamless integration and functionality."
sidebar:
  order: 1
---

# Install in Nuxt 2

Create a plugin file `capacitor-updater.js` in `plugins` directory.

```js

import { CapacitorUpdater } from '@capgo/capacitor-updater'

export default ({ app }) => {
  if (process.client) {
    window.onNuxtReady(() => {
      CapacitorUpdater.notifyAppReady()
    })
  }
}
```

This will load the plugin on the client side and notify the app that it is ready to receive updates.
