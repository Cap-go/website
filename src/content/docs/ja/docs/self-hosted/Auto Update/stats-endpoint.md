---
title: Stats 엔드포인트
description: 自前でホストする統計エンドポイントの作成方法
sidebar:
  order: 2
locale: ja
---

プラグインの統計情報を保存するためのJavaScriptコードの例です

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
  // データベースに保存
  return { status: 'ok' }
}
```

このエンドポイントは以下のようなJSONを返します：

```json
{ "status": "ok" }
```

## アクション：

* **delete**：バンドルがローカルで削除された時
* **reset**：アプリがビルトインバンドルにリセットされた時
* **set**：アプリが新しいバンドルを設定した時
* **set_fail**：アプリが設定するバンドルのIDを見つけられなかった時
* **update_fail**：遅延後に`notifyAppReady`が呼び出されなかった時
* **download_fail**：ダウンロードが完了しなかった時
* **download_complete:** ダウンロードが完了した時
* **download_xx:** ダウンロードの10%ごとに送信。例：download_20、download_70
* **update_fail:** バンドルが指定時間内に`notifyAppReady`の実行に失敗した時