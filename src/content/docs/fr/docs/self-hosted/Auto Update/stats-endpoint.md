---
title: Stats 엔드포인트
description: Comment créer un point de terminaison statistique auto-hébergé
sidebar:
  order: 2
locale: fr
---

Voici un exemple de code en JavaScript pour sauvegarder les statistiques du plugin

```typescript
interface AppInfos {
  version_name: string
  action: 'delete' |
          'reset' |
          'set' |
          'get' |
          'set_fail' |
          'update_fail' |
          'download_fail' |
          'windows_path_fail' |
          'canonical_path_fail' |
          'directory_path_fail' |
          'unzip_fail' |
          'low_mem_fail' |
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
          'download_complete' |
          'decrypt_fail' |
          'app_moved_to_foreground' |
          'app_moved_to_background'
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
  const body = JSONparse(eventbody || '{}') as AppInfos
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
  consolelog('update asked', platform,
    app_id,
    action,
    version_os,
    version_code,
    device_id,
    version_name,
    version_build,
    plugin_version)
  // Sauvegardez-le dans votre base de données
  return { status: 'ok' }
}
```

Ce point de terminaison doit renvoyer un JSON :

```json
{ "status": "ok" }
```

## Actions :

* **delete** : lorsqu'un bundle est supprimé localement
* **reset** : lorsque l'application revient au bundle intégré
* **set** : lorsque l'application définit un nouveau bundle
* **set\_fail** : lorsque l'application ne trouve pas l'ID du bundle défini
* **update\_fail** : envoyé après le délai et `notifyAppReady` jamais appelé
* **download\_fail** : lorsque le téléchargement ne s'est jamais terminé
* **download\_complete :** Lorsque le téléchargement se termine
* **download\_xx :** Envoyé tous les 10% du téléchargement ex : download\_20, download\_70
* **update\_fail :** lorsque le bundle ne parvient pas à faire `notifyAppReady` dans le délai imparti