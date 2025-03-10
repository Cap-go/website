---
title: Stats 엔드포인트
description: Come creare un endpoint statistico self-hosted
sidebar:
  order: 2
locale: it
---

Ecco un esempio di codice in JavaScript per salvare le statistiche del plugin

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
  // Salvalo nel tuo database
  return { status: 'ok' }
}
```

Questo endpoint dovrebbe restituire un JSON:

```json
{ "status": "ok" }
```

## Azioni:

* **delete**: quando un bundle viene eliminato localmente
* **reset**: quando l'app viene ripristinata al bundle incorporato
* **set**: quando l'app imposta un nuovo bundle
* **set_fail**: quando l'app non riesce a trovare l'ID del bundle impostato
* **update_fail**: inviato dopo il ritardo e `notifyAppReady` non è mai stato chiamato
* **download_fail**: quando il download non è mai stato completato
* **download_complete:** Quando il download è completato
* **download_xx:** Inviato ogni 10% del download es: download_20, download_70
* **update_fail:** quando il bundle non riesce a eseguire `notifyAppReady` nel periodo di tempo stabilito