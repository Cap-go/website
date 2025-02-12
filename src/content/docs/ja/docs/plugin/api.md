---
title: 関数と設定
description: プラグインで利用可能なメソッドとコンフィグレーション
sidebar:
  order: 2
locale: ja
---

# アップデータープラグイン設定

詳細については、Github の[Readme](https://githubcom/Cap-go/capacitor-updater)をご覧ください

<docgen-config>

CapacitorUpdaterは以下のオプションで設定できます：

| プロパティ | 型 | 説明 | デフォルト値 | 導入バージョン |
| ---------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ------- |
| **`appReadyTimeout`** | <code>number</code> | ネイティブプラグインがアップデートを「失敗」とみなすまでの待機時間をミリ秒単位で設定します。AndroidとiOSのみで利用可能です | <code>10000 // (10秒)</code> | |
| **`responseTimeout`** | <code>number</code> | ネイティブプラグインがAPIタイムアウトとみなすまでの待機時間をミリ秒単位で設定します。AndroidとiOSのみで利用可能です | <code>20 // (20秒)</code> | |
| **`autoDeleteFailed`** | <code>boolean</code> | 失敗したバンドルを自動的に削除するかどうかを設定します。AndroidとiOSのみで利用可能です | <code>true</code> | |
| **`autoDeletePrevious`** | <code>boolean</code> | アップデート成功後に以前のバンドルを自動的に削除するかどうかを設定します。AndroidとiOSのみで利用可能です | <code>true</code> | |
| **`autoUpdate`** | <code>boolean</code> | アップデートサーバーを介した自動アップデートを使用するかどうかを設定します。AndroidとiOSのみで利用可能です | <code>true</code> | |
| **`resetWhenUpdate`** | <code>boolean</code> | 新しいネイティブアプリバンドルがデバイスにインストールされた時に、以前にダウンロードしたバンドルを自動的に削除します。AndroidとiOSのみで利用可能です | <code>true</code> | |
| **`updateUrl`** | <code>string</code> | アップデートチェックが送信されるURL/エンドポイントを設定します。AndroidとiOSのみで利用可能です | <code>https://plugincapgoapp/updates</code> | |
| **`channelUrl`** | <code>string</code> | チャンネル操作用のURL/エンドポイントを設定します。AndroidとiOSのみで利用可能です | <code>https://plugincapgoapp/channel_self</code> | |
| **`statsUrl`** | <code>string</code> | アップデート統計が送信されるURL/エンドポイントを設定します。AndroidとiOSのみで利用可能です。統計レポートを無効にするには""に設定します | <code>https://plugincapgoapp/stats</code> | |
| **`privateKey`** | <code>string</code> | エンドツーエンドのライブアップデート暗号化用の秘密鍵を設定します。AndroidとiOSのみで利用可能です。バージョン620で非推奨となり、バージョン700で削除予定です | <code>undefined</code> | |
| **`publicKey`** | <code>string</code> | エンドツーエンドのライブアップデート暗号化用の公開鍵を設定します（バージョン2）。AndroidとiOSのみで利用可能です | <code>undefined</code> | 620 |
| **`version`** | <code>string</code> | アプリの現在のバージョンを設定します。これは最初のアップデートリクエストで使用されます。設定されていない場合、プラグインはネイティブコードからバージョンを取得します。AndroidとiOSのみで利用可能です | <code>undefined</code> | 41748 |
| **`directUpdate`** | <code>boolean</code> | アプリが更新/インストールされた直後にアップデートを直接インストールするようにプラグインを設定します。自動アップデートモードのみです。AndroidとiOSのみで利用可能です | <code>undefined</code> | 510 |
| **`periodCheckDelay`** | <code>number</code> | 定期的なアップデートチェックの遅延時間を秒単位で設定します。AndroidとiOSのみで利用可能です。600秒（10分）未満にはできません | <code>600 // (10分)</code> | |
| **`localS3`** | <code>boolean</code> | テストまたはセルフホストアップデートサーバー用にローカルサーバーを使用するようにCLIを設定します | <code>undefined</code> | 41748 |
| **`localHost`** | <code>string</code> | テストまたはセルフホストアップデートサーバー用にローカルサーバーを使用するようにCLIを設定します | <code>undefined</code> | 41748 |
| **`localWebHost`** | <code>string</code> | テストまたはセルフホストアップデートサーバー用にローカルサーバーを使用するようにCLIを設定します | <code>undefined</code> | 41748 |
| **`localSupa`** | <code>string</code> | テストまたはセルフホストアップデートサーバー用にローカルサーバーを使用するようにCLIを設定します | <code>undefined</code> | 41748 |
| **`localSupaAnon`** | <code>string</code> | テスト用にローカルサーバーを使用するようにCLIを設定します | <code>undefined</code> | 41748 |
| **`localApi`** | <code>string</code> | テスト用にローカルAPIを使用するようにCLIを設定します | <code>undefined</code> | 633 |
| **`localApiFiles`** | <code>string</code> | テスト用にローカルファイルAPIを使用するようにCLIを設定します | <code>undefined</code> | 633 |
| **`allowModifyUrl`** | <code>boolean</code> | JavaScript側からupdateUrl、statsUrl、channelUrlを動的に変更することを許可します | <code>false</code> | 540 |
| **`defaultChannel`** | <code>string</code> | 設定でアプリのデフォルトチャンネルを設定します | <code>undefined</code> | || <code>undefined</code>                             | 550   |
| **`appId`**                  | <code>string</code>  | アプリのIDを設定します                                                                                                                                                 | <code>undefined</code>                             | 600   |
| **`keepUrlPathAfterReload`** | <code>boolean</code> | リロード後もURLパスを保持するようにプラグインを設定します。警告：リロードがトリガーされると、'windowhistory'がクリアされます                                                                | <code>false</code>                                 | 680   |

## 例

`capacitor.config.json`の場合：

```json
{
  "plugins": {
    "CapacitorUpdater": {
      "appReadyTimeout": 1000 // （1秒）,
      "responseTimeout": 10 // （10秒）,
      "autoDeleteFailed": false,
      "autoDeletePrevious": false,
      "autoUpdate": false,
      "resetWhenUpdate": false,
      "updateUrl": https://example.com/api/auto_update,
      "channelUrl": https://example.com/api/channel,
      "statsUrl": https://example.com/api/stats,
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

`capacitor.config.ts`の場合：

```ts
/// <reference types="@capgo/capacitor-updater" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    CapacitorUpdater: {
      appReadyTimeout: 1000 // （1秒）,
      responseTimeout: 10 // （10秒）,
      autoDeleteFailed: false,
      autoDeletePrevious: false,
      autoUpdate: false,
      resetWhenUpdate: false,
      updateUrl: https://example.com/api/auto_update,
      channelUrl: https://example.com/api/channel,
      statsUrl: https://example.com/api/stats,
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
```

</docgen-config>

<docgen-index>

* [`notifyAppReady()`](#notifyappready)
* [`setUpdateUrl()`](#setupdateurl)
* [`setStatsUrl()`](#setstatsurl)
* [`setChannelUrl()`](#setchannelurl)
* [`download()`](#download)
* [`next()`](#next)
* [`set()`](#set)
* [`delete()`](#delete)
* [`list()`](#list)
* [`reset()`](#reset)
* [`current()`](#current)
* [`reload()`](#reload)
* [`setMultiDelay()`](#setmultidelay)
* [`cancelDelay()`](#canceldelay)
* [`getLatest()`](#getlatest)
* [`setChannel()`](#setchannel)
* [`unsetChannel()`](#unsetchannel)
* [`getChannel()`](#getchannel)
* [`setCustomId()`](#setcustomid)
* [`getBuiltinVersion()`](#getbuiltinversion)
* [`getDeviceId()`](#getdeviceid)
* [`getPluginVersion()`](#getpluginversion)
* [`isAutoUpdateEnabled()`](#isautoupdateenabled)
* [`removeAllListeners()`](#removealllisteners)
* [`addListener('download', )`](#addlistenerdownload-)
* [`addListener('noNeedUpdate', )`](#addlistenernoneedupdate-)
* [`addListener('updateAvailable', )`](#addlistenerupdateavailable-)
* [`addListener('downloadComplete', )`](#addlistenerdownloadcomplete-)
* [`addListener('majorAvailable', )`](#addlistenermajoravailable-)
* [`addListener('updateFailed', )`](#addlistenerupdatefailed-)
* [`addListener('downloadFailed', )`](#addlistenerdownloadfailed-)
* [`addListener('appReloaded', )`](#addlistenerappreloaded-)
* [`addListener('appReady', )`](#addlistenerappready-)
* [`isAutoUpdateAvailable()`](#isautoupdateavailable)
* [`getNextBundle()`](#getnextbundle)
* [インターフェース](#interfaces)
* [型エイリアス](#type-aliases)

</docgen-index>

# メソッド

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

## notifyAppReady()

```typescript
notifyAppReady() => Promise<AppReadyResult>
```

現在のバンドルが正常に動作していることをCapacitor Updaterに通知します（このメソッドが全てのアプリ起動時に呼び出されない場合、ロールバックが発生します）
デフォルトでは、このメソッドはアプリ起動後10秒以内に呼び出される必要があります。そうでない場合はロールバックが発生します
この動作は{@link appReadyTimeout}で変更できます

**戻り値:** <code>Promise&lt;<a href="#appreadyresult">AppReadyResult</a>&gt;</code>

--------------------


## setUpdateUrl()

```typescript
setUpdateUrl(options: UpdateUrl) => Promise<void>
```

アプリのupdateUrlを設定します。これは更新を確認するために使用されます

| パラメータ     | 型                                             | 説明                                           |
| ------------- | ----------------------------------------------- | --------------------------------------------- |
| **`options`** | <code><a href="#updateurl">UpdateUrl</a></code> | 更新の確認に使用するURLを含みます |

**提供開始:** 540

--------------------


## setStatsUrl()

```typescript
setStatsUrl(options: StatsUrl) => Promise<void>
```

アプリのstatsUrlを設定します。これは統計情報の送信に使用されます。空文字列を渡すと統計情報の収集が無効になります

| パラメータ     | 型                                           | 説明                                         |
| ------------- | --------------------------------------------- | ------------------------------------------- |
| **`options`** | <code><a href="#statsurl">StatsUrl</a></code> | 統計情報の送信に使用するURLを含みます |

**提供開始:** 540

--------------------


## setChannelUrl()

```typescript
setChannelUrl(options: ChannelUrl) => Promise<void>
```

アプリのchannelUrlを設定します。これはチャンネルの設定に使用されます

| パラメータ     | 型                                               | 説明                                        |
| ------------- | ------------------------------------------------- | ------------------------------------------ |
| **`options`** | <code><a href="#channelurl">ChannelUrl</a></code> | チャンネルの設定に使用するURLを含みます |

**提供開始:** 540

--------------------


## download()

```typescript
download(options: DownloadOptions) => Promise<BundleInfo>
```

提供されたURLから新しいバンドルをダウンロードします。これはZIPファイルで、ファイルを内部に含むか、全てのファイルを含む一意のIDを内部に持つ必要があります

| パラメータ     | 型                                                         | 説明                                                                                    |
| ------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#downloadoptions">DownloadOptions</a></code> | 新しいバンドルZIPをダウンロードするための{@link <a href="#downloadoptions">DownloadOptions</a>} |

**戻り値:** <code>Promise&lt;<a href="#bundleinfo">BundleInfo</a>&gt;</code>

--------------------


## next()

```typescript
next(options: BundleId) => Promise<BundleInfo>
```

アプリがリロードされたときに使用する次のバンドルを設定します| パラメータ | タイプ | 説明 |
| ------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | 次回アプリ起動時に設定する次のバンドルのID {@link <a href="#bundleinfo">BundleInfoid</a>} |

**戻り値:** <code>Promise&lt;<a href="#bundleinfo">BundleInfo</a>&gt;</code>

--------------------

## set()

```typescript
set(options: BundleId) => Promise<void>
```

現在のバンドルを設定し、すぐにアプリを再読み込みします

| パラメータ | タイプ | 説明 |
| ------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | 現在のバンドルとして設定する新しいバンドルIDを含む {@link <a href="#bundleid">BundleId</a>} オブジェクト |

--------------------

## delete()

```typescript
delete(options: BundleId) => Promise<void>
```

ネイティブアプリストレージから指定されたバンドルを削除します。{@link list}を使用して保存されているバンドルIDを取得してください

| パラメータ | タイプ | 説明 |
| ------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | 削除するバンドルのIDを含む {@link <a href="#bundleid">BundleId</a>} オブジェクト (注意: これはバージョン名ではなく、バンドルIDです) |

--------------------

## list()

```typescript
list(options?: ListOptions | undefined) => Promise<BundleListResult>
```

アプリにローカルにダウンロードされているすべてのバンドルを取得します

| パラメータ | タイプ | 説明 |
| ------------- | --------------------------------------------------- | ---------------------------------------------------------------------- |
| **`options`** | <code><a href="#listoptions">ListOptions</a></code> | バンドルをリストするための {@link <a href="#listoptions">ListOptions</a>} |

**戻り値:** <code>Promise&lt;<a href="#bundlelistresult">BundleListResult</a>&gt;</code>

--------------------

## reset()

```typescript
reset(options?: ResetOptions | undefined) => Promise<void>
```

アプリを`builtin`バンドル（Apple App Store / Google Play Storeに送信されたもの）または最後に正常に読み込まれたバンドルにリセットします

| パラメータ | タイプ | 説明 |
| ------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#resetoptions">ResetOptions</a></code> | {@link <a href="#resetoptions">ResetOptionstoLastSuccessful</a>}を含む、`true`でビルトインバンドルにリセット、`false`で最後に正常に読み込まれたバンドルにリセット |

--------------------

## current()

```typescript
current() => Promise<CurrentBundleResult>
```

現在のバンドルを取得します。設定されていない場合は`builtin`を返します。currentNativeはデバイスにインストールされている元のバンドルです

**戻り値:** <code>Promise&lt;<a href="#currentbundleresult">CurrentBundleResult</a>&gt;</code>

--------------------

## reload()

```typescript
reload() => Promise<void>
```

ビューを再読み込みします

--------------------

## setMultiDelay()

```typescript
setMultiDelay(options: MultiDelayConditions) => Promise<void>
```

プラグインが更新を遅延させるために使用する {@link <a href="#delaycondition">DelayCondition</a>} 配列を設定します
すべての条件が満たされた後、更新プロセスは通常通り再開されます。そのため、アプリのバックグラウンド化または終了後に更新がインストールされます
`date`タイプの場合、値はiso8601日付文字列である必要があります
`background`タイプの場合、値はミリ秒単位の数値である必要があります
`nativeVersion`タイプの場合、値はバージョン番号である必要があります
`kill`タイプの場合、値は使用されません
この関数は、killオプションが他のオプションのように次のバックグラウンド後ではなく、最初の終了後に更新をトリガーする一貫性のない動作をします。これは将来のメジャーリリースで修正される予定です

| パラメータ | タイプ | 説明 |
| ------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#multidelayconditions">MultiDelayConditions</a></code> | 設定する条件の {@link <a href="#multidelayconditions">MultiDelayConditions</a>} 配列を含む |

**Since:** 430

--------------------

## cancelDelay()

```typescript
cancelDelay() => Promise<void>
```

更新を即座に処理するために {@link <a href="#delaycondition">DelayCondition</a>} をキャンセルします

**Since:** 400

--------------------

## getLatest()

```typescript
getLatest(options?: GetLatestOptions | undefined) => Promise<LatestVersion>
```

更新URLから利用可能な最新のバンドルを取得します

| パラメータ | タイプ |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#getlatestoptions">GetLatestOptions</a></code> |

**戻り値:** <code>Promise&lt;<a href="#latestversion">LatestVersion</a>&gt;</code>

**Since:** 400

--------------------

## setChannel()

```typescript
setChannel(options: SetChannelOptions) => Promise<ChannelRes>
```

このデバイスのチャンネルを設定します。チャンネルは自己割り当てを許可する必要があります
{@link PluginsConfig}で`autoUpdate`が有効な場合、起動時にチャンネルを設定するためにこのメソッドを使用しないでください
このメソッドはアプリの準備完了後にチャンネルを設定するためのものです
このメソッドはデバイスIDをチャンネルにリンクするリクエストをCapgoバックエンドに送信します。Capgoはチャンネルの設定に応じて受け入れまたは拒否します

| パラメータ | タイプ | 説明 |
| ------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setchanneloptions">SetChannelOptions</a></code> | 設定する {@link <a href="#setchanneloptions">SetChannelOptions</a>} チャンネル |

**戻り値:** <code>Promise&lt;<a href="#channelres">ChannelRes</a>&gt;</code>

**Since:** 470

--------------------

## unsetChannel()

```typescript
unsetChannel(options: UnsetChannelOptions) => Promise<void>
```

このデバイスのチャンネルを解除しますデバイスはデフォルトチャンネルに戻ります。

| パラメータ     | 型                                                                 |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#unsetchanneloptions">UnsetChannelOptions</a></code> |

**導入バージョン:** 470

--------------------


## getChannel()

```typescript
getChannel() => Promise<GetChannelRes>
```

このデバイスのチャンネルを取得します。

**戻り値:** <code>Promise&lt;<a href="#getchannelres">GetChannelRes</a>&gt;</code>

**導入バージョン:** 480

--------------------


## setCustomId()

```typescript
setCustomId(options: SetCustomIdOptions) => Promise<void>
```

このデバイスにカスタムIDを設定します。

| パラメータ     | 型                                                              | 説明                                                                         |
| ------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setcustomidoptions">SetCustomIdOptions</a></code> | は設定する {@link <a href="#setcustomidoptions">SetCustomIdOptions</a>} customId |

**導入バージョン:** 490

--------------------


## getBuiltinVersion()

```typescript
getBuiltinVersion() => Promise<BuiltinVersion>
```

ネイティブアプリのバージョンまたは設定で指定されたビルトインバージョンを取得します。

**戻り値:** <code>Promise&lt;<a href="#builtinversion">BuiltinVersion</a>&gt;</code>

**導入バージョン:** 520

--------------------


## getDeviceId()

```typescript
getDeviceId() => Promise<DeviceId>
```

デバイスを識別するために使用される一意のID（自動更新サーバーに送信）を取得します。

**戻り値:** <code>Promise&lt;<a href="#deviceid">DeviceId</a>&gt;</code>

--------------------


## getPluginVersion()

```typescript
getPluginVersion() => Promise<PluginVersion>
```

ネイティブCapacitor Updaterプラグインのバージョン（自動更新サーバーに送信）を取得します。

**戻り値:** <code>Promise&lt;<a href="#pluginversion">PluginVersion</a>&gt;</code>

--------------------


## isAutoUpdateEnabled()

```typescript
isAutoUpdateEnabled() => Promise<AutoUpdateEnabled>
```

自動更新設定の状態を取得します。

**戻り値:** <code>Promise&lt;<a href="#autoupdateenabled">AutoUpdateEnabled</a>&gt;</code>

--------------------


## removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

このプラグインのすべてのリスナーを削除します。

**導入バージョン:** 100

--------------------


## addListener('download', )

```typescript
addListener(eventName: 'download', listenerFunc: (state: DownloadEvent) => void) => Promise<PluginListenerHandle>
```

アプリでのバンドルダウンロードイベントをリッスンします。ダウンロードが開始された時、ダウンロード中、および完了時に発火します。

| パラメータ          | 型                                                                        |
| ------------------ | --------------------------------------------------------------------------- |
| **`eventName`**    | <code>'download'</code>                                                     |
| **`listenerFunc`** | <code>(state: <a href="#downloadevent">DownloadEvent</a>) =&gt; void</code> |

**戻り値:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**導入バージョン:** 2011

--------------------


## addListener('noNeedUpdate', )

```typescript
addListener(eventName: 'noNeedUpdate', listenerFunc: (state: NoNeedEvent) => void) => Promise<PluginListenerHandle>
```

更新不要イベントをリッスンします。アプリが起動されるたびに強制的にチェックしたい場合に便利です。

| パラメータ          | 型                                                                    |
| ------------------ | ----------------------------------------------------------------------- |
| **`eventName`**    | <code>'noNeedUpdate'</code>                                             |
| **`listenerFunc`** | <code>(state: <a href="#noneedevent">NoNeedEvent</a>) =&gt; void</code> |

**戻り値:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**導入バージョン:** 400

--------------------


## addListener('updateAvailable', )

```typescript
addListener(eventName: 'updateAvailable', listenerFunc: (state: UpdateAvailableEvent) => void) => Promise<PluginListenerHandle>
```

利用可能な更新イベントをリッスンします。アプリが起動されるたびに強制的にチェックしたい場合に便利です。

| パラメータ          | 型                                                                                      |
| ------------------ | ----------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'updateAvailable'</code>                                                            |
| **`listenerFunc`** | <code>(state: <a href="#updateavailableevent">UpdateAvailableEvent</a>) =&gt; void</code> |

**戻り値:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**導入バージョン:** 400

--------------------


## addListener('downloadComplete', )

```typescript
addListener(eventName: 'downloadComplete', listenerFunc: (state: DownloadCompleteEvent) => void) => Promise<PluginListenerHandle>
```

ダウンロード完了イベントをリッスンします。

| パラメータ          | 型                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'downloadComplete'</code>                                                             |
| **`listenerFunc`** | <code>(state: <a href="#downloadcompleteevent">DownloadCompleteEvent</a>) =&gt; void</code> |

**戻り値:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**導入バージョン:** 400

--------------------


## addListener('majorAvailable', )

```typescript
addListener(eventName: 'majorAvailable', listenerFunc: (state: MajorAvailableEvent) => void) => Promise<PluginListenerHandle>
```

アプリでのメジャーアップデートイベントをリッスンします。disableAutoUpdateBreaking設定によってメジャーアップデートがブロックされている場合に通知します。

| パラメータ          | 型                                                                                    |
| ------------------ | --------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'majorAvailable'</code>                                                           |
| **`listenerFunc`** | <code>(state: <a href="#majoravailableevent">MajorAvailableEvent</a>) =&gt; void</code> |

**戻り値:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**導入バージョン:** 230

--------------------


## addListener('updateFailed', )

```typescript
addListener(eventName: 'updateFailed', listenerFunc: (state: UpdateFailedEvent) => void) => Promise<PluginListenerHandle>
```

アプリでの更新失敗イベントをリッスンします。次回のアプリ起動時に更新のインストールが失敗した場合に通知します。

| パラメータ          | 型                                                                                |
| ------------------ | ----------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'updateFailed'</code>                                                         |
| **`listenerFunc`** | <code>(state: <a href="#updatefailedevent">UpdateFailedEvent</a>) =&gt; void</code> |

**戻り値:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**導入バージョン:** 230

--------------------


## addListener('downloadFailed',```typescript
addListener(eventName: 'downloadFailed', listenerFunc: (state: DownloadFailedEvent) => void) => Promise<PluginListenerHandle>
```

アプリでのダウンロード失敗イベントを監視し、バンドルのダウンロードが失敗した時に通知します

| Param | Type | 
| ------------------ | --------------------------------------------------------------------------------------- |
| **`eventName`** | <code>'downloadFailed'</code> |
| **`listenerFunc`** | <code>(state: <a href="#downloadfailedevent">DownloadFailedEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 400

--------------------

## addListener('appReloaded', )

```typescript
addListener(eventName: 'appReloaded', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

アプリでのリロードイベントを監視し、リロードが発生した時に通知します

| Param | Type |
| ------------------ | -------------------------- |
| **`eventName`** | <code>'appReloaded'</code> |
| **`listenerFunc`** | <code>() =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 430

--------------------

## addListener('appReady', )

```typescript
addListener(eventName: 'appReady', listenerFunc: (state: AppReadyEvent) => void) => Promise<PluginListenerHandle>
```

アプリでのアプリ準備完了イベントを監視し、アプリが使用可能になった時に通知します

| Param | Type |
| ------------------ | --------------------------------------------------------------------------- |
| **`eventName`** | <code>'appReady'</code> |
| **`listenerFunc`** | <code>(state: <a href="#appreadyevent">AppReadyEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 510

--------------------

## isAutoUpdateAvailable()

```typescript
isAutoUpdateAvailable() => Promise<AutoUpdateAvailable>
```

自動更新が利用可能かどうかを取得します (serverUrlによって無効化されていないか)

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

## インターフェース


### AppReadyResult

| Prop | Type |
| ------------ | ------------------------------------------------- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> |


### BundleInfo

| Prop | Type |
| ---------------- | ----------------------------------------------------- |
| **`id`** | <code>string</code> |
| **`version`** | <code>string</code> |
| **`downloaded`** | <code>string</code> |
| **`checksum`** | <code>string</code> |
| **`status`** | <code><a href="#bundlestatus">BundleStatus</a></code> |


### UpdateUrl

| Prop | Type |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


### StatsUrl

| Prop | Type |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


### ChannelUrl

| Prop | Type |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


### DownloadOptions

| Prop | Type | Description | Default | Since |
| ---------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ----- |
| **`url`** | <code>string</code> | ダウンロードするバンドルzipファイル(例: distzip)のURL (Amazon S3、GitHubタグ、その他バンドルをホストしている場所のURLを指定可能) | | |
| **`version`** | <code>string</code> | このバンドル/バージョンのバージョンコード/名前 | | |
| **`sessionKey`** | <code>string</code> | 更新用のセッションキー | <code>undefined</code> | 400 |
| **`checksum`** | <code>string</code> | 更新用のチェックサム | <code>undefined</code> | 400 |


### BundleId

| Prop | Type |
| -------- | ------------------- |
| **`id`** | <code>string</code> |


### BundleListResult

| Prop | Type |
| ------------- | ------------------------- |
| **`bundles`** | <code>BundleInfo[]</code> |


### ListOptions

| Prop | Type | Description | Default | Since |
| -------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------ |
| **`raw`** | <code>boolean</code> | 生のバンドルリストを返すかマニフェストを返すか。trueの場合、ディスク上のファイルではなく内部データベースから読み取りを試みます | <code>false</code> | 6140 |


### ResetOptions

| Prop | Type |
| ---------------------- | -------------------- |
| **`toLastSuccessful`** | <code>boolean</code> |


### CurrentBundleResult

| Prop | Type |
| ------------ | ------------------------------------------------- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> |
| **`native`** | <code>string</code> |


### MultiDelayConditions

| Prop | Type |
| --------------------- | ----------------------------- |
| **`delayConditions`** | <code>DelayCondition[]</code> |


### DelayCondition

| Prop | Type | Description |
| ----------- | --------------------------------------------------------- | ---------------------------------------- |
| **`kind`** | <code><a href="#delayuntilnext">DelayUntilNext</a></code> | setMultiDelayで遅延条件を設定します |
| **`value`** | <code>string</code> | |


### LatestVersion

| Prop | Type | Description | Since |
| ---------------- | ---------------------------- | -------------------------- | ----- |
| **`version`** | <code>string</code> | getLatestメソッドの結果 | 40| **`checksum`**   | <code>string</code>          |                            | 6     |
| **`major`**      | <code>boolean</code>         |                            |       |
| **`message`**    | <code>string</code>          |                            |       |
| **`sessionKey`** | <code>string</code>          |                            |       |
| **`error`**      | <code>string</code>          |                            |       |
| **`old`**        | <code>string</code>          |                            |       |
| **`url`**        | <code>string</code>          |                            |       |
| **`manifest`**   | <code>ManifestEntry[]</code> |                            | 61    |


### ManifestEntry

| Prop               | Type                        |
| ------------------ | --------------------------- |
| **`file_name`**    | <code>string \| null</code> |
| **`file_hash`**    | <code>string \| null</code> |
| **`download_url`** | <code>string \| null</code> |


### GetLatestOptions

| Prop          | Type                | 説明                                                                                          | デフォルト               | Since |
| ------------- | ------------------- | -------------------------------------------------------------------------------------------- | ---------------------- | ----- |
| **`channel`** | <code>string</code> | 最新バージョンを取得するためのチャンネル。チャンネルはこの機能を使用するために'self_assign'を許可する必要があります | <code>undefined</code> | 680   |


### ChannelRes

| Prop          | Type                | 説明                           | Since |
| ------------- | ------------------- | ----------------------------- | ----- |
| **`status`**  | <code>string</code> | 設定されたチャンネルの現在のステータス | 470   |
| **`error`**   | <code>string</code> |                               |       |
| **`message`** | <code>string</code> |                               |       |


### SetChannelOptions

| Prop                    | Type                 |
| ----------------------- | -------------------- |
| **`channel`**           | <code>string</code>  |
| **`triggerAutoUpdate`** | <code>boolean</code> |


### UnsetChannelOptions

| Prop                    | Type                 |
| ----------------------- | -------------------- |
| **`triggerAutoUpdate`** | <code>boolean</code> |


### GetChannelRes

| Prop           | Type                 | 説明                           | Since |
| -------------- | -------------------- | ----------------------------- | ----- |
| **`channel`**  | <code>string</code>  | 取得したチャンネルの現在のステータス   | 480   |
| **`error`**    | <code>string</code>  |                               |       |
| **`message`**  | <code>string</code>  |                               |       |
| **`status`**   | <code>string</code>  |                               |       |
| **`allowSet`** | <code>boolean</code> |                               |       |


### SetCustomIdOptions

| Prop           | Type                |
| -------------- | ------------------- |
| **`customId`** | <code>string</code> |


### BuiltinVersion

| Prop          | Type                |
| ------------- | ------------------- |
| **`version`** | <code>string</code> |


### DeviceId

| Prop           | Type                |
| -------------- | ------------------- |
| **`deviceId`** | <code>string</code> |


### PluginVersion

| Prop          | Type                |
| ------------- | ------------------- |
| **`version`** | <code>string</code> |


### AutoUpdateEnabled

| Prop          | Type                 |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |


### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


### DownloadEvent

| Prop          | Type                                              | 説明                                        | Since |
| ------------- | ------------------------------------------------- | ------------------------------------------ | ----- |
| **`percent`** | <code>number</code>                               | ダウンロードの現在の進捗状況（0から100の間）        | 400   |
| **`bundle`**  | <code><a href="#bundleinfo">BundleInfo</a></code> |                                            |       |


### NoNeedEvent

| Prop         | Type                                              | 説明                                        | Since |
| ------------ | ------------------------------------------------- | ------------------------------------------ | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | ダウンロードの現在の進捗状況（0から100の間）        | 400   |


### UpdateAvailableEvent

| Prop         | Type                                              | 説明                                        | Since |
| ------------ | ------------------------------------------------- | ------------------------------------------ | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | ダウンロードの現在の進捗状況（0から100の間）        | 400   |


### DownloadCompleteEvent

| Prop         | Type                                              | 説明                                    | Since |
| ------------ | ------------------------------------------------- | -------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | 新しいアップデートが利用可能な場合に発生        | 400   |


### MajorAvailableEvent

| Prop          | Type                | 説明                                        | Since |
| ------------- | ------------------- | ------------------------------------------ | ----- |
| **`version`** | <code>string</code> | 新しいメジャーバンドルが利用可能な場合に発生        | 400   |


### UpdateFailedEvent

| Prop         | Type                                              | 説明                                     | Since |
| ------------ | ------------------------------------------------- | --------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | アップデートのインストールが失敗した場合に発生 | 400   |


### DownloadFailedEvent

| Prop          | Type                | 説明                                | Since |
| ------------- | ------------------- | ---------------------------------- | ----- |
| **`version`** | <code>string</code> | ダウンロードが失敗した場合に発生        | 400   |


### AppReadyEvent

| Prop         | Type                                              | 説明                                   | Since |
| ------------ | ------------------------------------------------- | ------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | アプリが使用可能な状態になった場合に発生 | 520   |
| **`status`** | <code>string</code>                               |                                       |       |


### AutoUpdateAvailable

| Prop            | Type                 |
| --------------- | -------------------- |
| **`available`** | <code>boolean</code> |


## Type Aliases


### BundleStatus

<code>'success' | 'error' | 'pending' | 'downloading'</code>


### DelayUntilNext

<code>'background' | 'kill' | 'nativeVersion' | 'date'</code>