
To have more control over updater system, you can configure it with these settings:

## `appReadyTimeout` :

> Configure the number of milliseconds the native plugin should wait before considering an update 'failed'.

Only available for Android and iOS.

Default: `10000` (10 seconds)

```json
// capacitor.config.json
{
  "appId": "**.***.**",
  "appName": "Name",
  "plugins": {
    "CapacitorUpdater": {
      "appReadyTimeout": 1000
    }
  }
}
```

## `responseTimeout` :

> Configure the number of milliseconds the native plugin should wait before considering API timeout.

Only available for Android and iOS.

Default: `20` (20 second)

```json
// capacitor.config.json
{
  "appId": "**.***.**",
  "appName": "Name",
  "plugins": {
    "CapacitorUpdater": {
      "responseTimeout": 1000
    }
  }
}
```

## `autoDeleteFailed` :

> Configure whether the plugin should use automatically delete failed bundles.

Only available for Android and iOS.

Default: `true`

```json
// capacitor.config.json
{
  "appId": "**.***.**",
  "appName": "Name",
  "plugins": {
    "CapacitorUpdater": {
      "autoDeleteFailed": false
    }
  }
}
```

## `autoDeletePrevious` :

> Configure whether the plugin should use automatically delete previous bundles after a successful update.

Only available for Android and iOS.

Default: `true`

```json
// capacitor.config.json
{
  "appId": "**.***.**",
  "appName": "Name",
  "plugins": {
    "CapacitorUpdater": {
      "autoDeletePrevious": false
    }
  }
}
```

## `autoUpdate` :

> Configure whether the plugin should use Auto Update via an update server.

Only available for Android and iOS.

Default: `true`

```json
// capacitor.config.json
{
  "appId": "**.***.**",
  "appName": "Name",
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": false
    }
  }
}
```

## `updateUrl` :

> Configure the URL / endpoint to which update checks are sent.

Only available for Android and iOS.

Default: `https://api.capgo.app/auto_update`

```json
// capacitor.config.json
{
  "appId": "**.***.**",
  "appName": "Name",
  "plugins": {
    "CapacitorUpdater": {
      "updateUrl": "https://example.com/api/auto_update"
    }
  }
}
```

## `statsUrl` :

> Configure the URL / endpoint to which update statistics are sent.

Only available for Android and iOS. Set to "" to disable stats reporting.

Default: `https://api.capgo.app/stats`

```json
// capacitor.config.json
{
  "appId": "**.***.**",
  "appName": "Name",
  "plugins": {
    "CapacitorUpdater": {
      "statsUrl": "https://example.com/api/stats"
    }
  }
}
```

## `privateKey` :

> Configure the private key for end to end live update encryption.

Only available for Android and iOS.

Create the private key with the command `npx @capgo/cli key create`

Default: `undefined`

```json
// capacitor.config.json
{
  "appId": "**.***.**",
  "appName": "Name",
  "plugins": {
    "CapacitorUpdater": {
      "privateKey": "YOUR_KEY"
    }
  }
}
```

## `directUpdate` :

> Make the plugin direct install the update when the app what just updated/installed. Only for autoUpdate mode.

Only available for Android and iOS.

Default: `undefined`

```json
// capacitor.config.json
{
  "appId": "**.***.**",
  "appName": "Name",
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true,
      "directUpdate": true
    }
  }
}
```

## `resetWhenUpdate` :

> When store update happens, disable force reset to the native version

You have also other config available only on the [web app](https://web.capgo.app/login)

To configure the plugin, use these settings:

```json
// capacitor.config.json
{
  "appId": "**.***.**",
  "appName": "Name",
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true,
      "resetWhenUpdate": false
    }
  }
}
```

## `version`

> Send this version to the server to identify your version at the first download. This setting disables the plugin to read the version in your native code.

```json
// capacitor.config.json
{
  "appId": "**.***.**",
  "appName": "Name",
  "plugins": {
    "CapacitorUpdater": {
      "version": "1.2.3"
    }
  }
}
```

