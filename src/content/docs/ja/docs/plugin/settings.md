---
title: 설정
description: Capacitor Updater で利用可能なすべての設定
sidebar:
  order: 8
locale: ja
---

更新システムをより細かく制御するために、以下の設定で構成することができます：

## `appReadyTimeout` 

> ネイティブプラグインがアップデートを「失敗」とみなすまでの待機時間（ミリ秒）を設定します

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

> ネイティブプラグインがAPIタイムアウトとみなすまでの待機時間（ミリ秒）を設定します

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

> 失敗したバンドルを自動的に削除するかどうかを設定します

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

> アップデート成功後に以前のバンドルを自動的に削除するかどうかを設定します

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

> アップデートサーバーを介した自動アップデートを使用するかどうかを設定します

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

> アップデートチェックを送信するURL/エンドポイントを設定します

AndroidとiOSのみで利用可能

デフォルト：`https://apicapgo.app/updates`

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

> アップデート統計を送信するURL/エンドポイントを設定します

AndroidとiOSのみで利用可能。統計レポートを無効にするには""に設定します

デフォルト：`https://apicapgo.app/stats`

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

> エンドツーエンドのライブアップデート暗号化用の秘密鍵を設定します

AndroidとiOSのみで利用可能

`npx @capgo/cli key create`コマンドで秘密鍵を作成します

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

> アプリが更新/インストールされた直後にアップデートを直接インストールするようにプラグインを設定します。自動アップデートモードでのみ適用されます

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
ストアアップデートが発生した場合、ネイティブバージョンへの強制リセットを無効にします
:::

[ウェブアプリ](https://console.capgo.app/login)でのみ利用可能な設定が他にもたくさんあります

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
アプリが更新/インストールされた直後にアップデートを直接インストールするようにプラグインを設定します。自動アップデートモードでのみ適用されます

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
アプリのデフォルトチャンネルを設定します。チャンネルが上書きを許可している場合、Capgoで設定された他のチャンネルよりも優先されます

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
アプリのappIdを設定します。他の方法で取得したappIdを上書きします。Capgoとネイティブコードで異なるappIdを持ちたい場合に便利です
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
アプリのバージョンを設定します。他の方法で取得したバージョンを上書きします。Capgoとネイティブコードで異なるバージョンを持ちたい場合に便利です
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
