---
title: Actualizar endpoint
description: Comment créer un point de terminaison de mise à jour auto-hébergé
sidebar:
  order: 1
locale: fr
---

Voici un exemple de code en JavaScript pour envoyer une mise à jour au plugin

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

Ce point d'accès doit retourner un JSON :

```json
{
  "version": "102",
  "url": "https://apiurlcom/mybuild_102zip"
}
```

Et s'il n'y a pas de mise à jour ou une erreur, ajoutez la clé `message` et éventuellement une `error`

```json
{
  "message": "Version not found",
  "error": "The backend crashed",
  "version": "102",
  "url": "https://apiurlcom/mybuild_102zip"
}
```