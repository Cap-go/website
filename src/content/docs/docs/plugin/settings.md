---
title: "Settings"
description: "All available settings for Capacitor Updater"
sidebar:
  order: 8
---

To have more fine-grained control over the update system, you can configure it with these settings:

## `appReadyTimeout` 

> Configure the number of milliseconds the native plugin should wait before considering an update 'failed'.

Only available for Android and iOS.

Default: `10000` (10 seconds)

```json
// capacitor.config.json
{
  "plugins": {
    "CapacitorUpdater": {
      "appReadyTimeout": 1000
    }
  }
}
```

## `responseTimeout` 

> Configure the number of milliseconds the native plugin should wait before considering API timeout.

Only available for Android and iOS.

Default: `20` (20 second)

```json
// capacitor.config.json
{
  "plugins": {
    "CapacitorUpdater": {
      "responseTimeout": 1000
    }
  }
}
```

## `autoDeleteFailed` 

> Configure whether the plugin should automatically delete failed bundles.

Only available for Android and iOS.

Default: `true`

```json
// capacitor.config.json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoDeleteFailed": false
    }
  }
}
```

## `autoDeletePrevious` 

> Configure whether the plugin should automatically delete previous bundles after a successful update.

Only available for Android and iOS.

Default: `true`

```json
// capacitor.config.json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoDeletePrevious": false
    }
  }
}
```

## `autoUpdate` 

> Configure whether the plugin should use Auto Update via an update server.

Only available for Android and iOS.

Default: `true`

```json
// capacitor.config.json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": false
    }
  }
}
```

## `updateUrl` 

> Configure the URL / endpoint to which update checks are sent.

Only available for Android and iOS.

Default: `https://api.capgo.app/updates`

```json
// capacitor.config.json
{
  "plugins": {
    "CapacitorUpdater": {
      "updateUrl": "https://example.com/api/updates"
    }
  }
}
```

## `statsUrl` 

> Configure the URL / endpoint to which update statistics are sent.

Only available for Android and iOS. Set to "" to disable stats reporting.

Default: `https://api.capgo.app/stats`

```json
// capacitor.config.json
{
  "plugins": {
    "CapacitorUpdater": {
      "statsUrl": "https://example.com/api/stats"
    }
  }
}
```

## `privateKey` 

> Configure the private key for end-to-end live update encryption.

Only available for Android and iOS.

Create the private key with the command `npx @capgo/cli key create`

Default: `undefined`

```json
// capacitor.config.json
{
  "plugins": {
    "CapacitorUpdater": {
      "privateKey": "YOUR_KEY"
    }
  }
}
```

## `directUpdate` 

> Make the plugin directly install the update when the app what just updated/installed. Only applicable for autoUpdate mode.

Only available for Android and iOS.

Default: `undefined`

```json
// capacitor.config.json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true,
      "directUpdate": true
    }
  }
}
```

## `resetWhenUpdate` 

:::note
When an store update happens, disable force reset to the native version
:::

There are many more settings avaialble only on the [web app](https://web.capgo.app/login)


To configure the plugin, use these settings:

```json
// capacitor.config.json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true,
      "resetWhenUpdate": false
    }
  }
}
```

## `directUpdate`
Make the plugin directly install the update when the app what just updated/installed. Only applicable for autoUpdate mode.

:::caution
This setting require you to hide the app from the user while the update is being installed. Otherwise the app will reset when the user is navigating.
:::

```json
// capacitor.config.json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true,
      "directUpdate": true
    }
  }
}
```

## `defaultChannel`
Set the default channel for the app. This will override any other channel set in Capgo if the channel allows overwriting. 

> The channel name is case sensitive

```json
// capacitor.config.json
{
  "plugins": {
    "CapacitorUpdater": {
      "defaultChannel": "production"
    }
  }
}
```

## `appId`
Set the appId for the app. This will override any other way to get the appId. This is useful when you want to have a different appId in Capgo and in your native code.
:::note
This is the new way to set the appId. The old way is still and will stay supported.
:::
```json
// capacitor.config.json
{
  "plugins": {
    "CapacitorUpdater": {
      "AppId": "com.example.app"
    }
  }
}
```

## `version`
Set the version for the app. This will override any other way to get the version. This is useful when you want to have a different version in Capgo and in your native code.
:::note
This is the new way to set the version. The old way is still and will stay supported.
:::
```json
// capacitor.config.json
{
  "plugins": {
    "CapacitorUpdater": {
      "version": "1.2.3"
    }
  }
}
```
