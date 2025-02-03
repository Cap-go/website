---
title: Perbarui endpoint
description: Cómo crear un endpoint de actualización auto-alojado
sidebar:
  order: 1
locale: es
---

Aquí hay un ejemplo de código en JavaScript para enviar una actualización al plugin

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

Este endpoint debe devolver un JSON:

```json
{
  "version": "102",
  "url": "https://apiurlcom/mybuild_102zip"
}
```

Y si no hay actualización o hay error, agregar la clave `message` y opcionalmente un `error`

```json
{
  "message": "Versión no encontrada",
  "error": "El backend falló",
  "version": "102",
  "url": "https://apiurlcom/mybuild_102zip"
}
```