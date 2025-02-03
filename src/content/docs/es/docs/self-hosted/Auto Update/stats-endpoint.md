---
title: Endpoint delle statistiche
description: Cómo crear un endpoint de estadísticas autohospedado
sidebar:
  order: 2
locale: es
---

Aquí hay un ejemplo de código en JavaScript para guardar las estadísticas del plugin

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
  // Guárdalo en tu base de datos
  return { status: 'ok' }
}
```

Este endpoint debe devolver un JSON:

```json
{ "status": "ok" }
```

## Acciones:

* **delete**: cuando un paquete se elimina localmente
* **reset**: cuando la aplicación se restablece al paquete incorporado
* **set**: cuando la aplicación establece un nuevo paquete
* **set\_fail**: cuando la aplicación no pudo encontrar el ID del paquete establecido
* **update\_fail**: enviado después del retraso y `notifyAppReady` nunca fue llamado
* **download\_fail**: cuando la descarga nunca se completó
* **download\_complete:** Cuando la descarga finaliza
* **download\_xx:** Enviado cada 10% de descarga ej: download\_20, download\_70
* **update\_fail:** cuando el paquete falla al ejecutar `notifyAppReady` en el marco de tiempo