---
title: 설정
description: Capacitor Updaterで利用可能なパラメーター
sidebar:
  order: 8
locale: ja
---

アップデートシステムをより細かく制御するには、以下の設定で構成できます：

## `appReadyTimeout` 

> ネイティブプラグインがアップデートを「失敗」とみなすまでの待機時間（ミリ秒）を設定

AndroidとiOSのみで利用可能

デフォルト：`10000`（10秒）

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "appReadyTimeout": 1000
    }
  }
}
```

## `responseTimeout` 

> ネイティブプラグインがAPIタイムアウトとみなすまでの待機時間（ミリ秒）を設定

AndroidとiOSのみで利用可能

デフォルト：`20`（20秒）

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "responseTimeout": 1000
    }
  }
}
```

## `autoDeleteFailed` 

> プラグインが失敗したバンドルを自動的に削除するかどうかを設定

AndroidとiOSのみで利用可能

デフォルト：`true`

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "autoDeleteFailed": false
    }
  }
}
```

## `autoDeletePrevious` 

> プラグインが成功したアップデート後に以前のバンドルを自動的に削除するかどうかを設定

AndroidとiOSのみで利用可能

デフォルト：`true`

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "autoDeletePrevious": false
    }
  }
}
```

## `autoUpdate` 

> プラグインがアップデートサーバーを介した自動アップデートを使用するかどうかを設定

AndroidとiOSのみで利用可能

デフォルト：`true`

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": false
    }
  }
}
```

## `updateUrl` 

> アップデートチェックが送信されるURL/エンドポイントを設定

AndroidとiOSのみで利用可能

デフォルト：`https://apicapgoapp/updates`

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "updateUrl": "https://examplecom/api/updates"
    }
  }
}
```

## `statsUrl` 

> アップデート統計が送信されるURL/エンドポイントを設定

AndroidとiOSのみで利用可能。""に設定すると統計レポートが無効になります

デフォルト：`https://apicapgoapp/stats`

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "statsUrl": "https://examplecom/api/stats"
    }
  }
}
```

## `privateKey` 

> エンドツーエンドのライブアップデート暗号化用の秘密鍵を設定

AndroidとiOSのみで利用可能

`npx @capgo/cli key create`コマンドで秘密鍵を作成

デフォルト：`undefined`

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "privateKey": "YOUR_KEY"
    }
  }
}
```

## `directUpdate` 

> アプリが更新/インストールされた直後にプラグインが直接アップデートをインストールするように設定。自動アップデートモードでのみ適用

AndroidとiOSのみで利用可能

デフォルト：`undefined`

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true,
      "directUpdate": true
    }
  }
}
```

## `resetWhenUpdate` 

:::note
ストアアップデートが発生した時、ネイティブバージョンへの強制リセットを無効にする
:::

[ウェブアプリ](https://webcapgoapp/login)でのみ利用可能な設定が他にもたくさんあります

プラグインを設定するには、以下の設定を使用します：

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true,
      "resetWhenUpdate": false
    }
  }
}
```

## `directUpdate`
アプリが更新/インストールされた直後にプラグインが直接アップデートをインストールするように設定。自動アップデートモードでのみ適用

:::caution
この設定では、アップデートのインストール中にユーザーからアプリを隠す必要があります。そうしないと、ユーザーが操作中にアプリがリセットされます
:::

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true,
      "directUpdate": true
    }
  }
}
```

## `defaultChannel`
アプリのデフォルトチャンネルを設定。チャンネルが上書きを許可している場合、Capgoで設定された他のチャンネルより優先されます

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "defaultChannel": "production"
    }
  }
}
```

## `appId`
アプリのappIdを設定。他の方法で取得したappIdより優先されます。Capgoとネイティブコードで異なるappIdを使用したい場合に便利です
:::note
これはappIdを設定する新しい方法です。古い方法も引き続きサポートされます
:::
```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "AppId": "comexampleapp"
    }
  }
}
```

## `version`
アプリのバージョンを設定。他の方法で取得したバージョンより優先されます。Capgoとネイティブコードで異なるバージョンを使用したい場合に便利です
:::note
これはバージョンを設定する新しい方法です。古い方法も引き続きサポートされます
:::
```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "version": "123"
    }
  }
}
```