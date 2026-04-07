---
title: "From V2 to V3"
description: "A comprehensive guide on transitioning from version 2 to version 3 of Capgo updater, detailing the necessary steps and considerations for a successful upgrade process"
sidebar:
  order: 4
---

This documentation will explain how to upgrade to the version 3 of auto-update.

## First migrate to the last tooling:

```bash
npm remove -g capgo
npm remove capacitor-updater

npm i @capgo/cli
npm i @capgo/capacitor-updater@3
npx cap sync
```

## Remove all your previous config:

```json
{
  CapacitorUpdater: {
      autoUpdateURL: "https...",
      ...
  },
}
```

to only let this:

```json
{
  "CapacitorUpdater": {
    "autoUpdate": true
  }
}
```

> ⚠️ If you were using your server, with `autoUpdateURL`, I will upgrade this guide soon for you. Meanwhile, take a look at the new upload option `external` which allows you to send only the link of your zip, not the code in Capgo cloud. This has been made for companies with strict privacy policies. In external mode, the code will never land on Capgo server, we just store the URL and send it to the device, which will directly download it. In the standard way, the code is zipped and stored in our server, but we will never open it or use it either.

## What change

All configurations become server-side for auto-update, to give you more control on how you send an update to users.

That allows us to revert, even deploy just to one user with channels! These settings are added back to the web interface:

* disable revert under native
* disable update above major

> ⚠️ They will become true by default for all channels

This will also remove the need to update often the plugin, most updates will be done server side, and you will get it without any change in your side.

> ⚠️ Reset when an update becomes the default, so if you prefer not to remove all download versions when updating from the store, do this:

```json
{
  "CapacitorUpdater": {
    "autoUpdate": true,
    "resetWhenUpdate": false
  }
}
```

## Update your code

Lastly, update all your imports in JS from:

```
import { CapacitorUpdater } from 'capacitor-updater'
```

to

```
import { CapacitorUpdater } from '@capgo/capacitor-updater'
```

Then build your code again `npm run build` and copy assets once more `npx cap copy`.

You should be able now to test the last auto-update system

Send your version with:

```
npx @capgo/cli@latest bundle upload
```

instead of

```
npx capgo upload
```

## Future evolution

For now only the first public channel is in use, in the future, public will change for multi public channels, if more than one is set.

## Common problems:

* Build problem after upgrade: if you have already opened the source code of the plugin in Android studio or Xcode, sometimes the sync doesn't remove them, that the cause of the issue. Open the native IDE and remove `capacitor-updater` by hands and do `npx cap sync` this should solve.
