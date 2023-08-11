---
title: "Installation"
description: "Install the plugin in your app"
sidebar:
  order: 1
---

Add this to your main file.

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady();
```

Then you are all set.

`notifyAppReady` is important for your app, it allows the plugin to validate your update run properly.
