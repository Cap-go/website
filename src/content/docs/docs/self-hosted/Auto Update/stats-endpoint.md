---
title: "Stats endpoint"
sidebar:
  order: 2
---

Here is an example of code in JavaScript to save the stats of the plugin

```typescript
interface AppInfos {
  version_name: string
  action: 'delete' |
          'reset' |
          'set' |
          'set_fail' |
          'update_fail' |
          'download_fail' |
          'update_fail' |
          'download_10' |
          'download_20' |
          'download_30' |
          'download_40' |
          'download_50' |
          'download_60' |
          'download_70' |
          'download_80' |
          'download_90' |
          'download_complete'
  version_build: string
  version_code: string
  version_os: string
  plugin_version: string
  platform: string
  app_id: string
  device_id: string
  custom_id?: string
  is_prod?: boolean
  is_emulator?: boolean
}

export const handler: Handler = async (event) => {
  const body = JSON.parse(event.body || '{}') as AppInfos
  const {
    platform,
    app_id,
    action,
    version_code,
    version_os,
    device_id,
    version_name,
    version_build,
    plugin_version,
  } = body
  console.log('update asked', platform,
    app_id,
    action,
    version_os,
    version_code,
    device_id,
    version_name,
    version_build,
    plugin_version)
  // Save it in your database
  return { status: 'ok' }
}
```

This endpoint should return a JSON:

```json
{ "status": "ok" }
```

## Actions:

* **delete** : when a bundle is deleted locally
* **reset** : when the app reset to the built-in bundle
* **set** : when app sets a new bundle
* **set\_fail** : when app couldn't find the ID of the bundle set
* **update\_fail** : send after the delay and `notifyAppReady` never called
* **download\_fail** : when download never finished
* **download\_complete:** When download finish
* **download\_xx:** Send every 10% of download ex : download\_20, download\_70
* **update\_fail:** when the bundle fails to do `notifyAppReady` in the timeframe
