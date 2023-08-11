---
title: "Update endpoint"
sidebar:
  order: 1
---

Here is an example of code in JavaScript to send an update to the plugin

```typescript
interface AppInfos {
  version_name: string
  version_build: string
  version_os: string
  custom_id?: string
  is_prod?: boolean
  is_emulator?: boolean
  plugin_version: string
  platform: string
  app_id: string
  device_id: string
}

export const handler: Handler = async (event) => {
  const body = JSON.parse(event.body || '{}') as AppInfos
  const {
    platform,
    app_id,
    version_os,
    device_id,
    version_name,
    version_build,
    plugin_version,
  } = body
  console.log('update asked', platform,
    app_id,
    version_os,
    device_id,
    version_name,
    version_build,
    plugin_version)
  if (version_name === '1.0.0') {
    return {
      version: '1.0.1',
      url: 'https://apiurl.com/mybuild_101.zip',
    }
  }
  else if (version_name === '1.0.1') {
    return {
      version: '1.0.2',
      url: 'https://apiurl.com/mybuild_102.zip',
    }
  }
  else {
    return {
      message: 'Error version not found'
      version: '',
      url: '',
    }
  }
}
```

This endpoint should return a JSON:

```json
{
      "version": "1.0.2",
      "url": "https://apiurl.com/mybuild_102.zip",
}
```

And if no update or error, add the `message` key and optionally an `error`

```json
{
    "message": "Version not found",
    "error": "The backend crashed",
    "version": "1.0.2",
     "url": "https://apiurl.com/mybuild_102.zip",
}
```
