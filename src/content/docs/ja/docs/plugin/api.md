---
title: Fonctions et paramètres
description: プラグインの利用可能なすべてのメソッドと設定
sidebar:
  order: 2
locale: ja
---

# アップデータープラグイン設定

詳細については、Github の[リードミー](https://githubcom/Cap-go/capacitor-updater)をご覧ください

<docgen-config>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

Capacitor Updaterは以下のオプションで設定できます：

| プロパティ                    | 型                    | 説明                                                                                                                                                                                      | デフォルト値                                         | 導入バージョン |
| ---------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ----------- |
| **`appReadyTimeout`**        | <code>number</code>  | ネイティブプラグインがアップデートを'失敗'と判断するまでの待機時間（ミリ秒）を設定します。AndroidとiOSのみで利用可能                                                                          | <code>10000 // (10秒)</code>                        |             |
| **`responseTimeout`**        | <code>number</code>  | ネイティブプラグインがAPIタイムアウトと判断するまでの待機時間（ミリ秒）を設定します。AndroidとiOSのみで利用可能                                                                              | <code>20 // (20秒)</code>                           |             |
| **`autoDeleteFailed`**       | <code>boolean</code> | 失敗したバンドルを自動的に削除するかどうかを設定します。AndroidとiOSのみで利用可能                                                                                                           | <code>true</code>                                   |             |
| **`autoDeletePrevious`**     | <code>boolean</code> | アップデート成功後に以前のバンドルを自動的に削除するかどうかを設定します。AndroidとiOSのみで利用可能                                                                                         | <code>true</code>                                   |             |
| **`autoUpdate`**             | <code>boolean</code> | アップデートサーバーを介した自動アップデートを使用するかどうかを設定します。AndroidとiOSのみで利用可能                                                                                        | <code>true</code>                                   |             |
| **`resetWhenUpdate`**        | <code>boolean</code> | 新しいネイティブアプリバンドルがデバイスにインストールされた時に、以前にダウンロードしたバンドルを自動的に削除します。AndroidとiOSのみで利用可能                                             | <code>true</code>                                   |             |
| **`updateUrl`**              | <code>string</code>  | アップデートチェックを送信するURL/エンドポイントを設定します。AndroidとiOSのみで利用可能                                                                                                     | <code>https://plugincapgoapp/updates</code>         |             |
| **`channelUrl`**             | <code>string</code>  | チャンネル操作用のURL/エンドポイントを設定します。AndroidとiOSのみで利用可能                                                                                                                | <code>https://plugincapgoapp/channel_self</code>    |             |
| **`statsUrl`**               | <code>string</code>  | アップデート統計を送信するURL/エンドポイントを設定します。AndroidとiOSのみで利用可能。統計レポートを無効にするには""に設定します                                                             | <code>https://plugincapgoapp/stats</code>           |             |
| **`privateKey`**             | <code>string</code>  | エンドツーエンドのライブアップデート暗号化用の秘密鍵を設定します。AndroidとiOSのみで利用可能。バージョン620で非推奨となり、バージョン700で削除予定                                          | <code>undefined</code>                              |             |
| **`publicKey`**              | <code>string</code>  | エンドツーエンドのライブアップデート暗号化用の公開鍵を設定します（バージョン2）。AndroidとiOSのみで利用可能                                                                                 | <code>undefined</code>                              | 620         |
| **`version`**                | <code>string</code>  | アプリの現在のバージョンを設定します。最初のアップデートリクエストに使用されます。設定されていない場合、プラグインはネイティブコードからバージョンを取得します。AndroidとiOSのみで利用可能    | <code>undefined</code>                              | 41748       |
| **`directUpdate`**           | <code>boolean</code> | アプリが更新/インストールされた直後にアップデートを直接インストールするようにプラグインを設定します。自動アップデートモードのみ。AndroidとiOSのみで利用可能                                   | <code>undefined</code>                              | 510         |
| **`periodCheckDelay`**       | <code>number</code>  | 定期アップデートチェックの遅延期間を秒単位で設定します。AndroidとiOSのみで利用可能。600秒（10分）未満には設定できません                                                                     | <code>600 // (10分)</code>                          |             |
| **`localS3`**                | <code>boolean</code> | テストまたはセルフホストアップデートサーバー用にCLIがローカルサーバーを使用するように設定します                                                                                              | <code>undefined</code>                              | 41748       |
| **`localHost`**              | <code>string</code>  | テストまたはセルフホストアップデートサーバー用にCLIがローカルサーバーを使用するように設定します                                                                                              | <code>undefined</code>                              | 41748       |
| **`localWebHost`**           | <code>string</code>  | テストまたはセルフホストアップデートサーバー用にCLIがローカルサーバーを使用するように設定します                                                                                              | <code>undefined</code>                              | 41748       |
| **`localSupa`**              | <code>string</code>  | テストまたはセルフホストアップデートサーバー用にCLIがローカルサーバーを使用するように設定します                                                                                              | <code>undefined</code>                              | 41748       |
| **`localSupaAnon`**          | <code>string</code>  | テスト用にCLIがローカルサーバーを使用するように設定します                                                                                                                                   | <code>undefined</code>                              | 41748       |
| **`localApi`**               | <code>string</code>  | テスト用にCLIがローカルAPIを使用するように設定します                                                                                                                                        | <code>undefined</code>                              | 633         |
| **`localApiFiles`**          | <code>string</code>  | テスト用にCLIがローカルファイルAPIを使用するように設定します                                                                                                                                | <code>undefined</code>                              | 633         |
| **`allowModifyUrl`**         | <code>boolean</code> | JavaScript側からupdateUrl、statsUrl、channelUrlを動的に変更することをプラグインに許可します                                                                                                 | <code>false</code>                                  | 540         |
| **`defaultChannel`**         | <code>string</code>  | 設定でアプリのデフォルトチャンネルを設定します                                                                                                                                             | <code>undefined</code>                              |             || <code>undefined</code> | 550 |
| **`appId`** | <code>string</code> | アプリのconfigでアプリIDを設定 | <code>undefined</code> | 600 |
| **`keepUrlPathAfterReload`** | <code>boolean</code> | リロード後にURLパスを保持するようにプラグインを設定します。警告:リロードがトリガーされると、'windowhistory'はクリアされます | <code>false</code> | 680 |

## 例

`capacitorconfigjson`で:

```json
{
  "plugins": {
    "CapacitorUpdater": {
      "appReadyTimeout": 1000 // (1秒),
      "responseTimeout": 10 // (10秒),
      "autoDeleteFailed": false,
      "autoDeletePrevious": false,
      "autoUpdate": false,
      "resetWhenUpdate": false,
      "updateUrl": https://examplecom/api/auto_update,
      "channelUrl": https://examplecom/api/channel,
      "statsUrl": https://examplecom/api/stats,
      "privateKey": undefined,
      "publicKey": undefined,
      "version": undefined,
      "directUpdate": undefined,
      "periodCheckDelay": undefined,
      "localS3": undefined,
      "localHost": undefined,
      "localWebHost": undefined,
      "localSupa": undefined,
      "localSupaAnon": undefined,
      "localApi": undefined,
      "localApiFiles": undefined,
      "allowModifyUrl": undefined,
      "defaultChannel": undefined,
      "appId": undefined,
      "keepUrlPathAfterReload": undefined
    }
  }
}
```

`capacitorconfigts`で:

```ts
/// <reference types="@capgo/capacitor-updater" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    CapacitorUpdater: {
      appReadyTimeout: 1000 // (1秒),
      responseTimeout: 10 // (10秒),
      autoDeleteFailed: false,
      autoDeletePrevious: false,
      autoUpdate: false,
      resetWhenUpdate: false,
      updateUrl: https://examplecom/api/auto_update,
      channelUrl: https://examplecom/api/channel,
      statsUrl: https://examplecom/api/stats,
      privateKey: undefined,
      publicKey: undefined,
      version: undefined,
      directUpdate: undefined,
      periodCheckDelay: undefined,
      localS3: undefined,
      localHost: undefined,
      localWebHost: undefined,
      localSupa: undefined, 
      localSupaAnon: undefined,
      localApi: undefined,
      localApiFiles: undefined,
      allowModifyUrl: undefined,
      defaultChannel: undefined,
      appId: undefined,
      keepUrlPathAfterReload: undefined,
    },
  },
};

export default config;
```| パラメータ | 型 | 説明 |
| ------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | 次回アプリ起動時に設定する次のバンドルのIDを含む {@link <a href="#bundleinfo">BundleInfoid</a>} |

**戻り値:** <code>Promise&lt;<a href="#bundleinfo">BundleInfo</a>&gt;</code>

--------------------

## set()

```typescript
set(options: BundleId) => Promise<void>
```

現在のバンドルを設定し、すぐにアプリをリロードします

| パラメータ | 型 | 説明 |
| ------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | 現在のバンドルとして設定する新しいバンドルIDを含む {@link <a href="#bundleid">BundleId</a>} オブジェクト |

--------------------

## delete()

```typescript
delete(options: BundleId) => Promise<void>
```

指定されたバンドルをネイティブアプリストレージから削除します。{@link list}を使用して保存されているバンドルIDを取得します

| パラメータ | 型 | 説明 |
| ------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | 削除するバンドルのIDを含む {@link <a href="#bundleid">BundleId</a>} オブジェクト（注：これはバージョン名ではなくバンドルIDです） |

--------------------

## list()

```typescript
list(options?: ListOptions | undefined) => Promise<BundleListResult>
```

アプリにローカルにダウンロードされているすべてのバンドルを取得します

| パラメータ | 型 | 説明 |
| ------------- | --------------------------------------------------- | ---------------------------------------------------------------------- |
| **`options`** | <code><a href="#listoptions">ListOptions</a></code> | バンドルをリストするための {@link <a href="#listoptions">ListOptions</a>} |

**戻り値:** <code>Promise&lt;<a href="#bundlelistresult">BundleListResult</a>&gt;</code>

--------------------

## reset()

```typescript
reset(options?: ResetOptions | undefined) => Promise<void>
```

アプリを`builtin`バンドル（Apple App Store / Google Play Storeに送信されたもの）または最後に正常にロードされたバンドルにリセットします

| パラメータ | 型 | 説明 |
| ------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#resetoptions">ResetOptions</a></code> | {@link <a href="#resetoptions">ResetOptionstoLastSuccessful</a>}を含む、`true`はビルトインバンドルにリセット、`false`は最後に正常にロードされたバンドルにリセットします |

--------------------

## current()

```typescript
current() => Promise<CurrentBundleResult>
```

現在のバンドルを取得します。設定されていない場合は`builtin`を返します。currentNativeはデバイスにインストールされた元のバンドルです

**戻り値:** <code>Promise&lt;<a href="#currentbundleresult">CurrentBundleResult</a>&gt;</code>

--------------------

## reload()

```typescript
reload() => Promise<void>
```

ビューをリロードします

--------------------

## setMultiDelay()

```typescript
setMultiDelay(options: MultiDelayConditions) => Promise<void>
```

プラグインが更新を遅延させるために使用する条件を含む {@link <a href="#delaycondition">DelayCondition</a>} 配列を設定します
すべての条件が満たされた後、更新プロセスは通常通り再開され、アプリのバックグラウンド化または終了後に更新がインストールされます
`date`種類の場合、値はiso8601日付文字列である必要があります
`background`種類の場合、値はミリ秒単位の数値である必要があります
`nativeVersion`種類の場合、値はバージョン番号である必要があります
`kill`種類の場合、値は使用されません
この関数は、killオプションが最初の終了後に更新をトリガーし、他のオプションのように次のバックグラウンド後ではないという一貫性のない動作をします。これは将来のメジャーリリースで修正される予定です

| パラメータ | 型 | 説明 |
| ------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#multidelayconditions">MultiDelayConditions</a></code> | 設定する条件の {@link <a href="#multidelayconditions">MultiDelayConditions</a>} 配列を含む |

**バージョン:** 430

--------------------

## cancelDelay()

```typescript
cancelDelay() => Promise<void>
```

更新を即座に処理するために {@link <a href="#delaycondition">DelayCondition</a>} をキャンセルします

**バージョン:** 400

--------------------

## getLatest()

```typescript
getLatest(options?: GetLatestOptions | undefined) => Promise<LatestVersion>
```

更新URLから利用可能な最新のバンドルを取得します

| パラメータ | 型 |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#getlatestoptions">GetLatestOptions</a></code> |

**戻り値:** <code>Promise&lt;<a href="#latestversion">LatestVersion</a>&gt;</code>

**バージョン:** 400

--------------------

## setChannel()

```typescript
setChannel(options: SetChannelOptions) => Promise<ChannelRes>
```

このデバイスのチャンネルを設定します。チャンネルは自己割り当てを許可する必要があります
{@link PluginsConfig}で`autoUpdate`が有効な場合、起動時にチャンネルを設定するためにこのメソッドを使用しないでください
このメソッドはアプリの準備が整った後にチャンネルを設定するためのものです
このメソッドはデバイスIDをチャンネルにリンクするリクエストをCapgoバックエンドに送信します。Capgoはチャンネルの設定に応じて受け入れまたは拒否することができます

| パラメータ | 型 | 説明 |
| ------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setchanneloptions">SetChannelOptions</a></code> | 設定する {@link <a href="#setchanneloptions">SetChannelOptions</a>} チャンネル |

**戻り値:** <code>Promise&lt;<a href="#channelres">ChannelRes</a>&gt;</code>

**バージョン:** 470

--------------------

## unsetChannel()

```typescript
unsetChannel(options: UnsetChannelOptions) => Promise<void>
```

このデバイスのチャンネルを解除しますデバイスはデフォルトチャンネルに戻ります

| パラメータ | 型 |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#unsetchanneloptions">UnsetChannelOptions</a></code> |

**Since:** 470

--------------------

## getChannel()

```typescript
getChannel() => Promise<GetChannelRes>
```

このデバイスのチャンネルを取得します

**戻り値:** <code>Promise&lt;<a href="#getchannelres">GetChannelRes</a>&gt;</code>

**Since:** 480

--------------------

## setCustomId()

```typescript
setCustomId(options: SetCustomIdOptions) => Promise<void>
```

このデバイスにカスタムIDを設定します

| パラメータ | 型 | 説明 |
| ------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setcustomidoptions">SetCustomIdOptions</a></code> | は設定する{@link <a href="#setcustomidoptions">SetCustomIdOptions</a>} customIdです |

**Since:** 490

--------------------

## getBuiltinVersion()

```typescript
getBuiltinVersion() => Promise<BuiltinVersion>
```

ネイティブアプリのバージョンまたは設定で設定されているビルトインバージョンを取得します

**戻り値:** <code>Promise&lt;<a href="#builtinversion">BuiltinVersion</a>&gt;</code>

**Since:** 520

--------------------

## getDeviceId()

```typescript
getDeviceId() => Promise<DeviceId>
```

デバイスを識別するために使用される一意のID（自動更新サーバーに送信）を取得します

**戻り値:** <code>Promise&lt;<a href="#deviceid">DeviceId</a>&gt;</code>

--------------------

## getPluginVersion()

```typescript
getPluginVersion() => Promise<PluginVersion>
```

ネイティブCapacitor Updaterプラグインのバージョン（自動更新サーバーに送信）を取得します

**戻り値:** <code>Promise&lt;<a href="#pluginversion">PluginVersion</a>&gt;</code>

--------------------

## isAutoUpdateEnabled()

```typescript
isAutoUpdateEnabled() => Promise<AutoUpdateEnabled>
```

自動更新設定の状態を取得します

**戻り値:** <code>Promise&lt;<a href="#autoupdateenabled">AutoUpdateEnabled</a>&gt;</code>

--------------------

## removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

このプラグインのすべてのリスナーを削除します

**Since:** 100

--------------------

## addListener('download', )

```typescript
addListener(eventName: 'download', listenerFunc: (state: DownloadEvent) => void) => Promise<PluginListenerHandle>
```

アプリのバンドルダウンロードイベントを監視します。ダウンロードが開始されたとき、ダウンロード中、および完了時に発火します

| パラメータ | 型 |
| ------------------ | --------------------------------------------------------------------------- |
| **`eventName`** | <code>'download'</code> |
| **`listenerFunc`** | <code>(state: <a href="#downloadevent">DownloadEvent</a>) =&gt; void</code> |

**戻り値:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 2011

--------------------

## addListener('noNeedUpdate', )

```typescript
addListener(eventName: 'noNeedUpdate', listenerFunc: (state: NoNeedEvent) => void) => Promise<PluginListenerHandle>
```

更新不要イベントを監視します。アプリが起動するたびに強制的にチェックしたい場合に便利です

| パラメータ | 型 |
| ------------------ | ----------------------------------------------------------------------- |
| **`eventName`** | <code>'noNeedUpdate'</code> |
| **`listenerFunc`** | <code>(state: <a href="#noneedevent">NoNeedEvent</a>) =&gt; void</code> |

**戻り値:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 400

--------------------

## addListener('updateAvailable', )

```typescript
addListener(eventName: 'updateAvailable', listenerFunc: (state: UpdateAvailableEvent) => void) => Promise<PluginListenerHandle>
```

利用可能な更新イベントを監視します。アプリが起動するたびに強制的にチェックしたい場合に便利です

| パラメータ | 型 |
| ------------------ | ----------------------------------------------------------------------------------------- |
| **`eventName`** | <code>'updateAvailable'</code> |
| **`listenerFunc`** | <code>(state: <a href="#updateavailableevent">UpdateAvailableEvent</a>) =&gt; void</code> |

**戻り値:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 400

--------------------

## addListener('downloadComplete', )

```typescript
addListener(eventName: 'downloadComplete', listenerFunc: (state: DownloadCompleteEvent) => void) => Promise<PluginListenerHandle>
```

ダウンロード完了イベントを監視します

| パラメータ | 型 |
| ------------------ | ------------------------------------------------------------------------------------------- |
| **`eventName`** | <code>'downloadComplete'</code> |
| **`listenerFunc`** | <code>(state: <a href="#downloadcompleteevent">DownloadCompleteEvent</a>) =&gt; void</code> |

**戻り値:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 400

--------------------

## addListener('majorAvailable', )

```typescript
addListener(eventName: 'majorAvailable', listenerFunc: (state: MajorAvailableEvent) => void) => Promise<PluginListenerHandle>
```

アプリのメジャーアップデートイベントを監視します。disableAutoUpdateBreakingの設定によってメジャーアップデートがブロックされているときに通知します

| パラメータ | 型 |
| ------------------ | --------------------------------------------------------------------------------------- |
| **`eventName`** | <code>'majorAvailable'</code> |
| **`listenerFunc`** | <code>(state: <a href="#majoravailableevent">MajorAvailableEvent</a>) =&gt; void</code> |

**戻り値:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 230

--------------------

## addListener('updateFailed', )

```typescript
addListener(eventName: 'updateFailed', listenerFunc: (state: UpdateFailedEvent) => void) => Promise<PluginListenerHandle>
```

アプリの更新失敗イベントを監視します。次回のアプリ起動時に更新のインストールが失敗したときに通知します

| パラメータ | 型 |
| ------------------ | ----------------------------------------------------------------------------------- |
| **`eventName`** | <code>'updateFailed'</code> |
| **`listenerFunc`** | <code>(state: <a href="#updatefailedevent">UpdateFailedEvent</a>) =&gt; void</code> |

**戻り値:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 230

--------------------

## addListener('downloadFailed',```typescript
addListener(eventName: 'downloadFailed', listenerFunc: (state: DownloadFailedEvent) => void) => Promise<PluginListenerHandle>
```

アプリでダウンロード失敗イベントをリッスンし、バンドルのダウンロードが失敗した時に通知します

| Param              | Type                                                                    |
| ------------------ | --------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'downloadFailed'</code>                                                           |
| **`listenerFunc`** | <code>(state: <a href="#downloadfailedevent">DownloadFailedEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 400

--------------------


## addListener('appReloaded', )

```typescript
addListener(eventName: 'appReloaded', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

アプリでリロードイベントをリッスンし、リロードが発生した時に通知します

| Param              | Type                       |
| ------------------ | -------------------------- |
| **`eventName`**    | <code>'appReloaded'</code> |
| **`listenerFunc`** | <code>() =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 430

--------------------


## addListener('appReady', )

```typescript
addListener(eventName: 'appReady', listenerFunc: (state: AppReadyEvent) => void) => Promise<PluginListenerHandle>
```

アプリでアプリ準備完了イベントをリッスンし、アプリが使用可能になった時に通知します

| Param              | Type                                                                        |
| ------------------ | --------------------------------------------------------------------------- |
| **`eventName`**    | <code>'appReady'</code>                                                     |
| **`listenerFunc`** | <code>(state: <a href="#appreadyevent">AppReadyEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 510

--------------------


## isAutoUpdateAvailable()

```typescript
isAutoUpdateAvailable() => Promise<AutoUpdateAvailable>
```

自動更新が利用可能か(serverUrlで無効化されていないか)を取得します

**Returns:** <code>Promise&lt;<a href="#autoupdateavailable">AutoUpdateAvailable</a>&gt;</code>

--------------------


## getNextBundle()

```typescript
getNextBundle() => Promise<BundleInfo | null>
```

アプリがリロードされる時に使用される次のバンドルを取得します
次のバンドルが設定されていない場合はnullを返します

**Returns:** <code>Promise&lt;<a href="#bundleinfo">BundleInfo</a> | null&gt;</code>

**Since:** 680

--------------------


## Interfaces


### AppReadyResult

| Prop         | Type                                              |
| ------------ | ------------------------------------------------- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> |


### BundleInfo

| Prop             | Type                                                  |
| ---------------- | ----------------------------------------------------- |
| **`id`**         | <code>string</code>                                   |
| **`version`**    | <code>string</code>                                   |
| **`downloaded`** | <code>string</code>                                   |
| **`checksum`**   | <code>string</code>                                   |
| **`status`**     | <code><a href="#bundlestatus">BundleStatus</a></code> |


### UpdateUrl

| Prop      | Type                |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


### StatsUrl

| Prop      | Type                |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


### ChannelUrl

| Prop      | Type                |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


### DownloadOptions

| Prop             | Type                | Description                                                                                                                                                      | Default                | Since |
| ---------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ----- |
| **`url`**        | <code>string</code> | ダウンロードするバンドルzipファイル(例:distzip)のURL(Amazon S3、GitHubタグ、その他バンドルをホストした場所のURLを指定可能) |                        |       |
| **`version`**    | <code>string</code> | このバンドル/バージョンのバージョンコード/名前                                                                                                                      |                        |       |
| **`sessionKey`** | <code>string</code> | アップデートのセッションキー                                                                                                                                        | <code>undefined</code> | 400   |
| **`checksum`**   | <code>string</code> | アップデートのチェックサム                                                                                                                                         | <code>undefined</code> | 400   |


### BundleId

| Prop     | Type                |
| -------- | ------------------- |
| **`id`** | <code>string</code> |


### BundleListResult

| Prop          | Type                      |
| ------------- | ------------------------- |
| **`bundles`** | <code>BundleInfo[]</code> |


### ListOptions

| Prop      | Type                 | Description                                                                                                                                   | Default            | Since  |
| --------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------ |
| **`raw`** | <code>boolean</code> | 生のバンドルリストかマニフェストを返すかどうか。trueの場合、ディスク上のファイルの代わりに内部データベースからリストを読み取ろうとします | <code>false</code> | 6140   |


### ResetOptions

| Prop                   | Type                 |
| ---------------------- | -------------------- |
| **`toLastSuccessful`** | <code>boolean</code> |


### CurrentBundleResult

| Prop         | Type                                              |
| ------------ | ------------------------------------------------- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> |
| **`native`** | <code>string</code>                               |


### MultiDelayConditions

| Prop                  | Type                          |
| --------------------- | ----------------------------- |
| **`delayConditions`** | <code>DelayCondition[]</code> |


### DelayCondition

| Prop        | Type                                                      | Description                              |
| ----------- | --------------------------------------------------------- | ---------------------------------------- |
| **`kind`**  | <code><a href="#delayuntilnext">DelayUntilNext</a></code> | setMultiDelayで遅延条件を設定                |
| **`value`** | <code>string</code>                                       |                                          |


### LatestVersion

| Prop             | Type                         | Description                | Since |
| ---------------- | ---------------------------- | -------------------------- | ----- |
| **`version`**    | <code>string</code>          | getLatestメソッドの結果 | 400 |
| **`checksum`**   | <code>string</code>          |                            | 6     |
| **`major`**      | <code>boolean</code>         |                            |       |
| **`message`**    | <code>string</code>          |                            |       |
| **`sessionKey`** | <code>string</code>          |                            |       |
| **`error`**      | <code>string</code>          |                            |       |
| **`old`**        | <code>string</code>          |                            |       |
| **`url`**        | <code>string</code>          |                            |       |
| **`manifest`**   | <code>ManifestEntry[]</code> |                            | 61   |


### ManifestEntry

| プロパティ           | 型                          |
| ------------------ | --------------------------- |
| **`file_name`**    | <code>string \| null</code> |
| **`file_hash`**    | <code>string \| null</code> |
| **`download_url`** | <code>string \| null</code> |


### GetLatestOptions

| プロパティ      | 型                  | 説明                                                                                        | デフォルト                | Since |
| ------------- | ------------------- | ------------------------------------------------------------------------------------------ | ---------------------- | ----- |
| **`channel`** | <code>string</code> | 最新バージョンを取得するためのチャンネル。このチャンネルは'self_assign'を許可する必要があります | <code>undefined</code> | 680 |


### ChannelRes

| プロパティ      | 型                  | 説明                         | Since |
| ------------- | ------------------- | ---------------------------- | ----- |
| **`status`**  | <code>string</code> | 設定されたチャンネルの現在の状態 | 470 |
| **`error`**   | <code>string</code> |                              |       |
| **`message`** | <code>string</code> |                              |       |


### SetChannelOptions

| プロパティ                | 型                   |
| ----------------------- | -------------------- |
| **`channel`**           | <code>string</code>  |
| **`triggerAutoUpdate`** | <code>boolean</code> |


### UnsetChannelOptions

| プロパティ                | 型                   |
| ----------------------- | -------------------- |
| **`triggerAutoUpdate`** | <code>boolean</code> |


### GetChannelRes

| プロパティ       | 型                   | 説明                         | Since |
| -------------- | -------------------- | ---------------------------- | ----- |
| **`channel`**  | <code>string</code>  | 取得したチャンネルの現在の状態    | 480 |
| **`error`**    | <code>string</code>  |                              |       |
| **`message`**  | <code>string</code>  |                              |       |
| **`status`**   | <code>string</code>  |                              |       |
| **`allowSet`** | <code>boolean</code> |                              |       |


### SetCustomIdOptions

| プロパティ       | 型                  |
| -------------- | ------------------- |
| **`customId`** | <code>string</code> |


### BuiltinVersion

| プロパティ      | 型                  |
| ------------- | ------------------- |
| **`version`** | <code>string</code> |


### DeviceId

| プロパティ       | 型                  |
| -------------- | ------------------- |
| **`deviceId`** | <code>string</code> |


### PluginVersion

| プロパティ      | 型                  |
| ------------- | ------------------- |
| **`version`** | <code>string</code> |


### AutoUpdateEnabled

| プロパティ      | 型                   |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |


### PluginListenerHandle

| プロパティ     | 型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


### DownloadEvent

| プロパティ      | 型                                              | 説明                                     | Since |
| ------------- | ------------------------------------------------- | --------------------------------------- | ----- |
| **`percent`** | <code>number</code>                               | ダウンロードの現在の状態（0から100の間） | 400 |
| **`bundle`**  | <code><a href="#bundleinfo">BundleInfo</a></code> |                                         |       |


### NoNeedEvent

| プロパティ     | 型                                              | 説明                                     | Since |
| ------------ | ------------------------------------------------- | --------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | ダウンロードの現在の状態（0から100の間） | 400 |


### UpdateAvailableEvent

| プロパティ     | 型                                              | 説明                                     | Since |
| ------------ | ------------------------------------------------- | --------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | ダウンロードの現在の状態（0から100の間） | 400 |


### DownloadCompleteEvent

| プロパティ     | 型                                              | 説明                           | Since |
| ------------ | ------------------------------------------------- | ------------------------------ | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | 新しいアップデートが利用可能な時 | 400 |


### MajorAvailableEvent

| プロパティ      | 型                  | 説明                                     | Since |
| ------------- | ------------------- | ---------------------------------------- | ----- |
| **`version`** | <code>string</code> | 新しいメジャーバンドルが利用可能な時に発行 | 400 |


### UpdateFailedEvent

| プロパティ     | 型                                              | 説明                                 | Since |
| ------------ | ------------------------------------------------- | ------------------------------------ | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | アップデートのインストールが失敗した時 | 400 |


### DownloadFailedEvent

| プロパティ      | 型                  | 説明                           | Since |
| ------------- | ------------------- | ------------------------------ | ----- |
| **`version`** | <code>string</code> | ダウンロードが失敗した時に発行 | 400 |


### AppReadyEvent

| プロパティ     | 型                                              | 説明                               | Since |
| ------------ | ------------------------------------------------- | ---------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | アプリが使用可能になった時に発行    | 520 |
| **`status`** | <code>string</code>                               |                                    |       |


### AutoUpdateAvailable

| プロパティ        | 型                   |
| --------------- | -------------------- |
| **`available`** | <code>boolean</code> |


## Type Aliases


### BundleStatus

<code>'success' | 'error' | 'pending' | 'downloading'</code>


### DelayUntilNext

<code>'background' | 'kill' | 'nativeVersion' | 'date'</code>

</docgen-api>