---
title: Stats 엔드포인트
description: 자체 호스팅 통계 엔드포인트 만들기
sidebar:
  order: 2
locale: ko
---

JavaScript로 플러그인 통계를 저장하는 코드 예시입니다.

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

이 엔드포인트는 다음과 같은 JSON을 반환해야 합니다:

```json
{ "status": "ok" }
```

## 액션:

* **delete**: 번들이 로컬에서 삭제될 때
* **reset**: 앱이 내장된 번들로 초기화될 때
* **set**: 앱이 새로운 번들을 설정할 때
* **set_fail**: 앱이 설정할 번들의 ID를 찾지 못할 때
* **update_fail**: 지연 후 `notifyAppReady`가 호출되지 않았을 때 전송
* **download_fail**: 다운로드가 완료되지 않았을 때
* **download_complete:** 다운로드가 완료될 때
* **download_xx:** 다운로드 진행률 10%마다 전송 예: download_20, download_70
* **update_fail:** 번들이 주어진 시간 내에 `notifyAppReady`를 실행하지 못했을 때