---
title: Stats endpoint
description: So erstellen Sie einen selbst gehosteten Statistik-Endpunkt
sidebar:
  order: 2
locale: de
---

Hier ist ein Beispiel für JavaScript-Code zum Speichern der Plugin-Statistiken

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
  // Save it in your database
  return { status: 'ok' }
}
```

Dieser Endpunkt sollte ein JSON zurückgeben:

```json
{ "status": "ok" }
```

## Aktionen:

* **delete**: wenn ein Bundle lokal gelöscht wird
* **reset**: wenn die App auf das eingebaute Bundle zurückgesetzt wird 
* **set**: wenn die App ein neues Bundle festlegt
* **set_fail**: wenn die App die ID des festgelegten Bundles nicht finden konnte
* **update_fail**: wird nach der Verzögerung gesendet und `notifyAppReady` wurde nie aufgerufen
* **download_fail**: wenn der Download nie abgeschlossen wurde
* **download_complete:** Wenn der Download abgeschlossen ist
* **download_xx:** Wird alle 10% des Downloads gesendet, z.B.: download_20, download_70
* **update_fail:** wenn das Bundle `notifyAppReady` nicht im Zeitrahmen ausführen konnte