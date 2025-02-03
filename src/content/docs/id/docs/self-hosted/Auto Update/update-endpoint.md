---
title: Perbarui endpoint
description: Cara membuat endpoint pembaruan self-hosted
sidebar:
  order: 1
locale: id
---

Berikut adalah contoh kode dalam JavaScript untuk mengirim pembaruan ke plugin

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
  const body = JSONparse(eventbody || '{}') as AppInfos
  const {
    platform,
    app_id,
    version_os,
    device_id,
    version_name,
    version_build,
    plugin_version,
  } = body
  consolelog('update asked', platform,
    app_id,
    version_os,
    device_id,
    version_name,
    version_build,
    plugin_version)
  if (version_name === '100') {
    return {
      version: '101',
      url: 'https://apiurlcom/mybuild_101zip',
    }
  }
  else if (version_name === '101') {
    return {
      version: '102',
      url: 'https://apiurlcom/mybuild_102zip',
    }
  }
  else {
    return {
      message: 'Error version not found',
      version: '',
      url: '',
    }
  }
}
```

Endpoint ini harus mengembalikan JSON:

```json
{
  "version": "102",
  "url": "https://apiurlcom/mybuild_102zip"
}
```

Dan jika tidak ada pembaruan atau terjadi kesalahan, tambahkan kunci `message` dan opsional `error`

```json
{
  "message": "Version not found",
  "error": "The backend crashed",
  "version": "102",
  "url": "https://apiurlcom/mybuild_102zip"
}
```