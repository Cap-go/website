---
title: "Force update"
description: "Force your user to get the update"
sidebar:
  order: 4
---

Add a listener to even `updateAvailable` and then show alert to tell the user the app will update:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater';
import { Dialog } from '@capacitor/dialog';

CapacitorUpdater.addListener('updateAvailable', async (res) => {
    try {
      await Dialog.alert({
        title: 'Update Available',
        message: `Version ${res.bundle.version} is available. The app will update now`,
      });
      CapacitorUpdater.set(res.bundle);
    }
    catch (error) {
      console.log(error);
    }
  });

  CapacitorUpdater.notifyAppReady();
```

You can also let the user decide by showing a dialog to ask the user to update:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater';
import { Dialog } from '@capacitor/dialog';

CapacitorUpdater.addListener('updateAvailable', async (res) => {
    try {
      const { value } = await Dialog.confirm({
        title: 'Update Available',
        message: `Version ${res.bundle.version} is available. Would you like to update now?`,
      });

      if (value) {
        CapacitorUpdater.set(res.bundle);
      }
    }
    catch (error) {
      console.log(error);
    }
  });

  CapacitorUpdater.notifyAppReady();
```
