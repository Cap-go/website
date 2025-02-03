---
title: 통계 엔드포인트
description: 自己ホスト型の統計情報エンドポイントの作成
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

このエンドポイントは以下のJSONを返します：

```json
{ "status": "ok" }
```

## アクション：

* **delete**：バンドルがローカルで削除された時
* **reset**：アプリがビルトインバンドルにリセットされた時
* **set**：アプリが新しいバンドルを設定した時
* **set\_fail**：アプリが設定しようとしたバンドルのIDが見つからなかった時
* **update\_fail**：遅延後に`notifyAppReady`が呼び出されなかった時に送信
* **download\_fail**：ダウンロードが完了しなかった時
* **download\_complete**：ダウンロードが完了した時
* **download\_xx**：ダウンロードの10%ごとに送信 例：download\_20、download\_70
* **update\_fail**：バンドルが指定時間内に`notifyAppReady`の実行に失敗した時