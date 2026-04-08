---
title: 機能と設定
description: プラグインの利用可能なすべてのメソッドと設定
sidebar:
  order: 2
locale: ja
---
# アップデータープラグイン構成

詳細については、Github [Readme](https://github.com/Cap-go/capacitor-updater) を参照してください。

<docgen-config>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

CapacitorUpdater は次のオプションで構成できます。|小道具 |タイプ |説明 |デフォルト |以来 |
| ---------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------- | ------- |
| **`appReadyTimeout`** | <code>番号</code> |ネイティブ プラグインが更新が「失敗」したと判断するまでに待機するミリ秒数を構成します。 Android、iOS、および Electron で利用可能です。                                                                                                                                                                                                                                                                                                                                                                                                                                     | <code>10000 // (10 秒)</code> |         |
| **`responseTimeout`** | <code>番号</code> | API タイムアウトを考慮する前にネイティブ プラグインが待機するミリ秒数を構成します。 Android、iOS、および Electron で利用可能です。                                                                                                                                                                                                                                                                                                                                                                                                                                            | <code>20000 // (20 秒)</code> |         |
| **`autoDeleteFailed`** | <code>ブール値</code> |プラグインが失敗したバンドルの自動削除を使用するかどうかを構成します。 Android、iOS、および E で利用可能レクトロン。                                                                                                                                                                                                                                                                                                                                                                                                                                                              | <code>true</code> |         |
| **`autoDeletePrevious`** | <code>ブール値</code> |プラグインが更新の成功後に以前のバンドルを自動的に削除するようにするかどうかを構成します。 Android、iOS、および Electron で利用可能です。                                                                                                                                                                                                                                                                                                                                                                                                                                      | <code>true</code> |         |
| **`autoUpdate`** | <code>ブール値</code> |プラグインが更新サーバー経由の自動更新を使用するかどうかを構成します。 Android、iOS、および Electron で利用可能です。                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | <code>true</code> |         |
| **`resetWhenUpdate`** | <code>ブール値</code> |新しいネイティブ アプリ バンドルがデバイスにインストールされると、以前にダウンロードしたバンドルが自動的に削除されます。 Android、iOS、および Electron で利用可能です。                                                                                                                                                                                                                                                                                                                                                                                                                                   | <code>true</code> |         |
| **`updateUrl`** | <code>string</code> |更新チェックの送信先となる URL / エンドポイントを構成します。 Android、iOS、および Electron で利用可能です。| <code>https://plugin.capgo.app/updates</code> |         |
| **`channelUrl`** | <code>文字列</code> |チャネル操作の URL / エンドポイントを構成します。 Android、iOS、および Electron で利用可能です。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | <code>https://plugin.capgo.app/channel_self</code> |         |
| **`statsUrl`** | <code>string</code> |更新統計の送信先となる URL / エンドポイントを構成します。 Android、iOS、および Electron で利用可能です。統計レポートを無効にするには、「」に設定します。                                                                                                                                                                                                                                                                                                                                                                                                                                       | <code>https://plugin.capgo.app/stats</code> |         |
| **`publicKey`** | <code>文字列</code> |エンドツーエンドのライブ アップデート暗号化バージョン 2 の公開キーを構成します。Android、iOS、および Electron で利用可能です。                                                                                                                                                                                                                                                                                                                                                                                                                                                             | <code>未定義</code> | 6.2.0 |
| **`version`** | <code>文字列</code> |アプリの現在のバージョンを構成します。これは最初の更新リクエストに使用されます。設定されていない場合、プラグインはネイティブ コードからバージョンを取得します。 Android、iOS、および Electron で利用可能です。| <code>未定義</code> | 4.17.48 |
| **`directUpdate`** | <code>ブール値 \| '常に' \| 'atInstall' \| '起動時'</code> |プラグインがアップデートをいつインストールするかを設定します。自動更新モードのみ。 10MB 未満のアプリや --delta フラグを使用してアップロードを行う場合にうまく機能します。 10MB を超える ZIP やアプリは、ユーザーの更新に比較的時間がかかります。 - false: 直接更新を行わない (デフォルトの動作を使用: 開始時にダウンロード、バックグラウンド時に設定) - atInstall: アプリがインストールされたときのみ直接更新、ストアから更新、それ以外の場合は directUpdate = false として動作 - onLaunch: アプリがインストールされた場合のみ直接更新、ストアから更新またはアプリの強制終了後に更新、それ以外の場合は directUpdate = false として動作 - always: 以前のすべてのケース (アプリのインストール、ストアからの更新、アプリの強制終了またはアプリの再開後) で直接更新し、directUpdate = false として動作しない - true: (非推奨) 同じ下位互換性のために「常に」 Android、iOS、および Electron で使用できます。 | <code>false</code> | 5.1.0 |
| **`autoSplashscreen`** | <code>ブール値</code> | directUpdate の使用時にスプラッシュスクリーンの非表示を自動的に処理します。有効にすると、プラグインは更新が適用された後、または更新が必要ない場合に、スプラッシュスクリーンを自動的に非表示にします。これにより、手動で appReady イベントをリッスンして SplashScreen.hide() を呼び出す必要がなくなります。 directUpdate が「atInstall」、「always」、または true に設定されている場合にのみ機能します。 @capacitor/splash-screen プラグインをインストールし、launchAutoHide: false で構成する必要があります。 autoUpdate と directUpdate を有効にする必要があります。 Android および iOS で利用可能です。                      | <code>false</code> | 7.6.0 |
| **`periodCheckDelay`** | <code>番号</code> |期間更新チェックの遅延期間を設定します。単位は秒です。 Android、iOS、および Electron で利用可能です。 600 秒 (10 分) 未満にすることはできません。                                                                                                                                                                                                                                                                                                                                                                                                                     | <code>600 // (10 分)</code> |         |
| **`localS3`** | <code>ブール値</code> |テスト用のローカル サーバーまたは自己ホスト型更新サーバーを使用するように CLI を構成します。| <code>未定義</code> | 4.17.48 |
| **`localHost`** | <code>文字列</code> |テスト用のローカル サーバーまたは自己ホスト型更新サーバーを使用するように CLI を構成します。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>未定義</code> | 4.17.48 |
| **`localWebHost`** | <code>string</code> |テスト用のローカル サーバーまたは自己ホスト型更新サーバーを使用するように CLI を構成します。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>未定義</code> | 4.17.48 |
| **`localSupa`** | <code>文字列</code> |テスト用のローカル サーバーまたは自己ホスト型更新サーバーを使用するように CLI を構成します。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>未定義</code> | 4.17.48 |
| **`localSupaAnon`** | <code>string</code> |テストにローカル サーバーを使用するように CLI を構成します。| <code>未定義</code> | 4.17.48 |
| **`localApi`** | <code>文字列</code> |テストにローカル API を使用するように CLI を構成します。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>未定義</code> | 6.3.3 |
| **`localApiFiles`** | <code>string</code> |テストにローカル ファイル API を使用するように CLI を構成します。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | <code>未定義</code> | 6.3.3 |
| **`allowModifyUrl`** | <code>ブール値</code> |プラグインが JavaScript 側から updateUrl、statsUrl、channelUrl を動的に変更できるようにします。                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | <code>false</code> | 5.4.0 |
| **`defaultChannel`** | <code>string</code> |構成でアプリのデフォルトのチャネルを設定します。大文字と小文字を区別。この設定はクラウドに設定されているデフォルトのチャネルをオーバーライドしますが、クラウドで行われたオーバーライドは引き続き尊重されます。                                                                                                                                                                                                                                                                                                                                                                                      | <code>未定義</code> | 5.5.0 |
| **`appId`** | <code>string</code> |構成でアプリのアプリ ID を構成します。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | <code>未定義</code> | 6.0.0 |
| **`keepUrlPathAfterReload`** | <code>ブール値</code> |リロード後に URL パスを保持するようにプラグインを構成します。警告: リロードがトリガーされると、「window.history」はクリアされます。                                                                                                                                                                                                                                                                                                                                                                                                                                                  | <code>false</code> | 6.8.0 |
| **`disableJSLogging`** | <code>ブール値</code> |プラグインの JavaScript ログを無効にします。 true の場合、プラグインは JavaScript コンソールにログを記録しません。ネイティブ ログのみが実行されます。 <code>false</code> | 7.3.0 |
| **`shakeMenu`** | <code>ブール値</code> |デバッグ/テスト目的で更新メニューを表示するには、シェイク ジェスチャを有効にします。 <code>false</code> | 7.5.0 |## 例

`capacitor.config.json`:

```json
{
  "plugins": {
    "CapacitorUpdater": {
      "appReadyTimeout": 1000 // (1 second),
      "responseTimeout": 10 // (10 second),
      "autoDeleteFailed": false,
      "autoDeletePrevious": false,
      "autoUpdate": false,
      "resetWhenUpdate": false,
      "updateUrl": https://example.com/api/auto_update,
      "channelUrl": https://example.com/api/channel,
      "statsUrl": https://example.com/api/stats,
      "publicKey": undefined,
      "version": undefined,
      "directUpdate": undefined,
      "autoSplashscreen": undefined,
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
      "keepUrlPathAfterReload": undefined,
      "disableJSLogging": undefined,
      "shakeMenu": undefined
    }
  }
}
```

`capacitor.config.ts` 内:

```ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    CapacitorUpdater: {
      appReadyTimeout: 1000 // (1 second),
      responseTimeout: 10 // (10 second),
      autoDeleteFailed: false,
      autoDeletePrevious: false,
      autoUpdate: false,
      resetWhenUpdate: false,
      updateUrl: https://example.com/api/auto_update,
      channelUrl: https://example.com/api/channel,
      statsUrl: https://example.com/api/stats,
      publicKey: undefined,
      version: undefined,
      directUpdate: undefined,
      autoSplashscreen: undefined,
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
      disableJSLogging: undefined,
      shakeMenu: undefined,
    },
  },
};

export default config;
```

</docgen-config>

<docgen-index>

* [`notifyAppReady()`](#notifyappready)
* [`setUpdateUrl(...)`](#setupdateurl)
* [`setStatsUrl(...)`](#setstatsurl)
* [`setChannelUrl(...)`](#setchannelurl)
* [`download(...)`](#download)
* [`next(...)`](#next)
* [`set(...)`](#set)
* [`delete(...)`](#削除)
* [`list(...)`](#リスト)
* [`reset(...)`](#リセット)
* [`current()`](#現在)
* [`reload()`](#reload)
* [`setMultiDelay(...)`](#setmultilay)
* [`cancelDelay()`](#キャンセル遅延)
* [`getLatest(...)`](#getlatest)
* [`setChannel(...)`](#setchannel)
* [`unsetChannel(...)`](#unsetchannel)
* [`getChannel()`](#getchannel)
* [`listChannels()`](#listchannels)
* [`setCustomId(...)`](#setcustomid)
* [`getBuiltinVersion()`](#getbuiltinversion)
* [`getDeviceId()`](#getdeviceid)
* [`getPluginVersion()`](#getpluginversion)
* [`isAutoUpdateEnabled()`](#isautoupdateenabled)
* [`removeAllListeners()`](#removealllisteners)
* [`addListener('download', ...)`](#addlistenerdownload-)
* [`addListener('noNeedUpdate', ...)`](#addlistenernoneedupdate-)
* [`addListener('updateAvailable', ...)`](#addlistenerupdateavailable-)
* [`addListener('downloadComplete', ...)`](#addlistenerdownloadcomplete-)
* [`addListener('majorAvailable', ...)`](#addlistenermajoravailable-)
* [`addListener('updateFailed', ...)`](#addlistenerupdatefailed-)
* [`addListener('downloadFailed', ...)`](#addlistenerdownloadfailed-)
* [`addListener('appReloaded', ...)`](#addlistenerappreloaded-)
* [`addListener('appReady', ...)`](#addlistenerappready-)
* [`isAutoUpdateAvailable()`](#isautoupdateavailable)
* [`getNextBundle()`](#getnextbundle)
* [`setShakeMenu(...)`](#setshakemenu)
* [`isShakeMenuEnabled()`](#isshakemenuenabled)
* [インターフェース](#interfaces)
* [タイプエイリアス](#type-aliases)

</docgen-index>

# メソッド

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

## 通知AppReady()

```typescript
notifyAppReady() => Promise<AppReadyResult>
```

現在のバンドルが機能していることを Capacitor Updater に通知します (アプリの起動ごとにこのメソッドが呼び出されないとロールバックが発生します)
デフォルトでは、このメソッドはアプリ起動後の最初の 10 秒以内に呼び出される必要があります。そうしないとロールバックが発生します。
この動作を {@link appReadyTimeout} で変更します

**戻り値:** <code>Promise<<a href="#appreadyresult">AppReadyResult</a>></code>

--------------------


## setUpdateUrl(...)

```typescript
setUpdateUrl(options: UpdateUrl) => Promise<void>
```

アプリの updateUrl を設定します。これは更新を確認するために使用されます。

|パラム |タイプ |説明 |
| ------------- | ----------------------------------------------- | -------------------------------------------------- |
| **`options`** | <code><a href="#updateurl">UpdateUrl</a></code> |更新の確認に使用する URL が含まれています。 |

**以降:** 5.4.0

--------------------


## setStatsUrl(...)

```typescript
setStatsUrl(options: StatsUrl) => Promise<void>
```

アプリの statsUrl を設定します。これは統計の送信に使用されます。空の文字列を渡すと、統計の収集が無効になります。|パラム |タイプ | Description                                     |
| ------------- | ----------------------------------------------- | ----------------------------------------------- |
| **`options`** | <code><a href="#statsurl">StatsUrl</a></code> |統計の送信に使用する URL が含まれています。 |

**以降:** 5.4.0

--------------------


## setChannelUrl(...)

```typescript
setChannelUrl(options: ChannelUrl) => Promise<void>
```

Set the channelUrl for the app, this will be used to set the channel.

|パラム | Type                                              | Description                                      |
| ------------- | -------------------------------------------------- | ------------------------------------------------ |
| **`options`** | <code><a href="#channelurl">ChannelUrl</a></code> |チャネルの設定に使用する URL が含まれています。 |

**以降:** 5.4.0

--------------------


## ダウンロード(...)

```typescript
download(options: DownloadOptions) => Promise<BundleInfo>
```

Download a new bundle from the provided URL, it should be a zip file, with files inside or with a unique id inside with all your files

|パラム |タイプ | Description                                                                                  |
| ------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#downloadoptions">ダウンロード オプション</a></code> |新しいバンドル zip をダウンロードするための {@link <a href="#downloadoptions">DownloadOptions</a>}。 |

**Returns:** <code>Promise<<a href="#bundleinfo">BundleInfo</a>></code>

--------------------


## 次(...)

```typescript
next(options: BundleId) => Promise<BundleInfo>
```

アプリのリロード時に使用される次のバンドルを設定します。

|パラム |タイプ | Description                                                                                                   |
| ------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **`options`** | <code><a href="#bundleid">バンドルID</a></code> |次回のアプリ起動時に設定する次のバンドルの ID が含まれます。 {@link <a href="#bundleinfo">BundleInfo.id</a>} |

**戻り値:** <code>約束<<a href="#bundleinfo">バンドル情報</a>></code>

--------------------


## セット(...)

```typescript
set(options: BundleId) => Promise<void>
```

現在のバンドルを設定し、すぐにアプリをリロードします。|パラム |タイプ |説明 |
| ------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">バンドルID</a></code> |現在として設定する新しいバンドル ID を含む {@link <a href="#bundleid">BundleId</a>} オブジェクト。 |

--------------------


## 削除(...)

```typescript
delete(options: BundleId) => Promise<void>
```

指定されたバンドルをネイティブ アプリ ストレージから削除します。 {@link list} とともに使用して、保存されているバンドル ID を取得します。

|パラム |タイプ |説明 |
| ------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">バンドルID</a></code> |削除するバンドルの ID を含む {@link <a href="#bundleid">BundleId</a>} オブジェクト (これはバンドル ID であり、バージョン名ではないことに注意してください) |

--------------------


## リスト(...)

```typescript
list(options?: ListOptions | undefined) => Promise<BundleListResult>
```

ローカルにダウンロードされたすべてのバンドルをアプリで取得します

|パラム |タイプ |説明 |
| ------------- | --------------------------------------------------- | ---------------------------------------------------------------------- |
| **`options`** | <code><a href="#listoptions">リストオプション</a></code> |バンドルをリストするための {@link <a href="#listoptions">ListOptions</a>} |

**戻り値:** <code>約束<<a href="#bundlelistresult">BundleListResult</a>></code>

--------------------


## リセット(...)

```typescript
reset(options?: ResetOptions | undefined) => Promise<void>
```

アプリを `builtin` バンドル ( Apple App Store / Google Play ストア に送信されたもの) または最後に正常にロードされたバンドルにリセットします。

|パラム |タイプ |説明 |
| ------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#resetoptions">リセットオプション</a></code> | {@link <a href="#resetoptions">ResetOptions.toLastSuccessful</a>} を含む、`true` は組み込みバンドルにリセットされ、`false` は最後に正常にロードされたバンドルにリセットされます。 |

--------------------


## 現在()

```typescript
current() => Promise<CurrentBundleResult>
```現在のバンドルを取得します。何も設定されていない場合は、`builtin` を返します。 currentNative はデバイスにインストールされている元のバンドルです

**戻り値:** <code>約束<<a href="#currentbundleresult">CurrentBundleResult</a>></code>

--------------------


## リロード()

```typescript
reload() => Promise<void>
```

ビューをリロードする

--------------------


## setMultiDelay(...)

```typescript
setMultiDelay(options: MultiDelayConditions) => Promise<void>
```

プラグインが更新を遅らせるために使用する条件を含む {@link <a href="#delaycondition">DelayCondition</a>} 配列を設定します。
すべての条件が満たされると、更新プロセスが通常どおりに再び実行され、アプリのバックグラウンド化または終了後に更新がインストールされます。
`date` 種類の場合、値は iso8601 日付文字列である必要があります。
`background` 種類の場合、値はミリ秒単位の数値である必要があります。
`nativeVersion` 種類の場合、値はバージョン番号である必要があります。
`kill` 種類の場合、値は使用されません。
この関数には一貫性のない動作があり、オプション kill では、他のオプションのように次のバックグラウンドの後ではなく、最初の kill 後に更新がトリガーされます。これは将来のメジャー リリースで修正される予定です。

|パラム |タイプ |説明 |
| ------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **`options`** | <code><a href="#multidelayconditions">MultiDelayConditions</a></code> |設定する条件の {@link <a href="#multidelayconditions">MultiDelayConditions</a>} 配列が含まれています |

**以降:** 4.3.0

--------------------


## cancelDelay()

```typescript
cancelDelay() => Promise<void>
```

{@link <a href="#delaycondition">DelayCondition</a>} をキャンセルして、更新をすぐに処理します。

**以降:** 4.0.0

--------------------


## getlatest(...)

```typescript
getLatest(options?: GetLatestOptions | undefined) => Promise<LatestVersion>
```

アップデート URL から最新のバンドルを入手

|パラム |タイプ |
| ------------- | -------------------------------------------------------------- |
| **`options`** | <code><a href="#getlatestoptions">最新オプションの取得</a></code> |

**戻り値:** <code>約束<<a href="#latestversion">最新バージョン</a>></code>

**以降:** 4.0.0

--------------------


## setChannel(...)

```typescript
setChannel(options: SetChannelOptions) => Promise<ChannelRes>
```

このデバイスのチャンネルを設定します。これが機能するには、チャネルで `allow_device_self_set` が有効になっている必要があります。このデバイスのカスタム ID を設定する

|パラム |タイプ |説明 |
| ------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setcustomidoptions">SetCustomIdOptions</a></code> |は、設定する {@link <a href="#setcustomidoptions">SetCustomIdOptions</a>} カスタム ID です |

**以降:** 4.9.0

--------------------


## getBuiltinVersion()

```typescript
getBuiltinVersion() => Promise<BuiltinVersion>
```

ネイティブアプリのバージョン、または構成で設定されている場合は組み込みバージョンを取得します

**戻り値:** <code>約束<<a href="#builtinversion">BuiltinVersion</a>></code>

**以降:** 5.2.0

--------------------


## getDeviceId()

```typescript
getDeviceId() => Promise<DeviceId>
```

デバイスを識別するために使用される固有の ID を取得します (自動更新サーバーに送信されます)。

**戻り値:** <code>約束<<a href="#deviceid">DeviceId</a>></code>

--------------------


## getPluginVersion()

```typescript
getPluginVersion() => Promise<PluginVersion>
```

ネイティブ Capacitor アップデーター プラグインのバージョンを取得します (自動更新サーバーに送信されます)。

**戻り値:** <code>約束<<a href="#pluginversion">プラグインバージョン</a>></code>

--------------------


## isAutoUpdateEnabled()

```typescript
isAutoUpdateEnabled() => Promise<AutoUpdateEnabled>
```

自動更新設定の状態を取得します。

**戻り値:** <code>約束<<a href="#autoupdateenabled">AutoUpdateEnabled</a>></code>

--------------------


## 削除AllListeners()

```typescript
removeAllListeners() => Promise<void>
```

このプラグインのすべてのリスナーを削除します。

**以降:** 1.0.0

--------------------


## addListener('ダウンロード', ...)

```typescript
addListener(eventName: 'download', listenerFunc: (state: DownloadEvent) => void) => Promise<PluginListenerHandle>
```

アプリでバンドルのダウンロード イベントをリッスンします。ダウンロードの開始時、ダウンロード中、終了時に発生します。
これにより、ダウンロード中にすべてのダウンロードパーセントが返されます

|パラム |タイプ |
| ------------------ | --------------------------------------------------------------------------- |
| **`eventName`** | <code>「ダウンロード」</code> |
| **`listenerFunc`** | <code>(状態: <a href="#downloadevent">DownloadEvent</a>) => void</code> |

**戻り値:** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**以降:** 2.0.11

--------------------


## addListener('noNeedUpdate', ...)

```typescript
addListener(eventName: 'noNeedUpdate', listenerFunc: (state: NoNeedEvent) => void) => Promise<PluginListenerHandle>
```

イベントを更新する必要がないためリッスンします。アプリが起動されるたびに強制的にチェックしたい場合に便利です

|パラム |タイプ |
| ------------------ | ----------------------------------------------------------------------- |
| **`eventName`** | <code>'アップデートは必要ありません'</code> |
| **`listenerFunc`** | <code>(状態: <a href="#noneedevent">NoNeedEvent</a>) => void</code> |**戻り値:** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**以降:** 4.0.0

--------------------


## addListener('updateAvailable', ...)

```typescript
addListener(eventName: 'updateAvailable', listenerFunc: (state: UpdateAvailableEvent) => void) => Promise<PluginListenerHandle>
```

利用可能な更新イベントをリッスンします。アプリが起動されるたびに強制的にチェックしたい場合に便利です。

|パラム |タイプ |
| ------------------ | ----------------------------------------------------------------------------------------- |
| **`eventName`** | <code>'アップデートあり'</code> |
| **`listenerFunc`** | <code>(状態: <a href="#updateavailableevent">UpdateAvailableEvent</a>) => void</code> |

**戻り値:** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**以降:** 4.0.0

--------------------


## addListener('downloadComplete', ...)

```typescript
addListener(eventName: 'downloadComplete', listenerFunc: (state: DownloadCompleteEvent) => void) => Promise<PluginListenerHandle>
```

downloadComplete イベントをリッスンします。

|パラム |タイプ |
| ------------------ | ------------------------------------------------------------------------------------------- |
| **`eventName`** | <code>'ダウンロード完了'</code> |
| **`listenerFunc`** | <code>(状態: <a href="#downloadcompleteevent">DownloadCompleteEvent</a>) => void</code> |

**戻り値:** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**以降:** 4.0.0

--------------------


## addListener('majorAvailable', ...)

```typescript
addListener(eventName: 'majorAvailable', listenerFunc: (state: MajorAvailableEvent) => void) => Promise<PluginListenerHandle>
```

アプリでメジャー アップデート イベントをリッスンし、disableAutoUpdateBreaking を設定することでメジャー アップデートがブロックされたときに通知します。

|パラム |タイプ |
| ------------------ | ----------------------------------------------------------------------------------------- |
| **`eventName`** | <code>'メジャー利用可能'</code> |
| **`listenerFunc`** | <code>(状態: <a href="#majoravailableevent">MajorAvailableEvent</a>) => void</code> |

**戻り値:** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**以降:** 2.3.0

--------------------


## addListener('updateFailed', ...)

```typescript
addListener(eventName: 'updateFailed', listenerFunc: (state: UpdateFailedEvent) => void) => Promise<PluginListenerHandle>
```

アプリ内で更新失敗イベントをリッスンし、次回のアプリ起動時に更新のインストールに失敗したことを通知します

|パラム |タイプ |
| ------------------ | ----------------------------------------------------------------------------------- |
| **`eventName`** | <code>'更新失敗'</code> |
| **`listenerFunc`** | <code>(状態: <a href="#updatefailedevent">UpdateFailedEvent</a>) => void</code> |**戻り値:** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**以降:** 2.3.0

--------------------


## addListener('ダウンロード失敗', ...)

```typescript
addListener(eventName: 'downloadFailed', listenerFunc: (state: DownloadFailedEvent) => void) => Promise<PluginListenerHandle>
```

アプリでダウンロード失敗イベントをリッスンし、バンドルのダウンロードが失敗したときに通知します

|パラム |タイプ |
| ------------------ | ----------------------------------------------------------------------------------------- |
| **`eventName`** | <code>'ダウンロード失敗'</code> |
| **`listenerFunc`** | <code>(状態: <a href="#downloadfailedevent">DownloadFailedEvent</a>) => void</code> |

**戻り値:** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**以降:** 4.0.0

--------------------


## addListener('appReloaded', ...)

```typescript
addListener(eventName: 'appReloaded', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

アプリでリロード イベントをリッスンし、リロードが発生したときに通知します

|パラム |タイプ |
| ------------------ | ------------------------ |
| **`eventName`** | <code>'アプリが再ロードされました'</code> |
| **`listenerFunc`** | <code>() => void</code> |

**戻り値:** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**以降:** 4.3.0

--------------------


## addListener('appReady', ...)

```typescript
addListener(eventName: 'appReady', listenerFunc: (state: AppReadyEvent) => void) => Promise<PluginListenerHandle>
```

アプリ内でアプリ準備完了イベントをリッスンし、アプリが使用できるようになったときに通知します

|パラム |タイプ |
| ------------------ | --------------------------------------------------------------------------- |
| **`eventName`** | <code>'アプリ準備完了'</code> |
| **`listenerFunc`** | <code>(状態: <a href="#appreadyevent">AppReadyEvent</a>) => void</code> |

**戻り値:** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**以降:** 5.1.0

--------------------


## isAutoUpdateAvailable()

```typescript
isAutoUpdateAvailable() => Promise<AutoUpdateAvailable>
```

自動更新が利用可能かどうかを取得します (serverUrl によって無効になっていない)。

**戻り値:** <code>約束<<a href="#autoupdateavailable">AutoUpdateAvailable</a>></code>

--------------------


## getNextBundle()

```typescript
getNextBundle() => Promise<BundleInfo | null>
```

Get the next bundle that will be used when the app reloads.
次のバンドルが設定されていない場合は null を返します。

**戻り値:** <code>約束<<a href="#bundleinfo">バンドル情報</a> | null></code>

**以降:** 6.8.0

--------------------


## setShakeMenu(...)

```typescript
setShakeMenu(options: SetShakeMenuOptions) => Promise<void>
```

デバッグ/テスト目的でシェイク メニューを有効または無効にします。|パラム |タイプ |説明 |
| ------------- | ------------------------------------------------------------------- | -------------------------------------------------------- |
| **`options`** | <code><a href="#setshakemenuoptions">SetShakeMenuOptions</a></code> |シェイク メニューを有効または無効にするための有効なブール値が含まれます |

**以降:** 7.5.0

--------------------


## isShakeMenuEnabled()

```typescript
isShakeMenuEnabled() => Promise<ShakeMenuEnabled>
```

シェイク メニューの現在の状態を取得する

**戻り値:** <code>約束<<a href="#shakemenuenabled">ShakeMenuEnabled</a>></code>

**以降:** 7.5.0

--------------------


## インターフェース


### AppReady結果

|小道具 |タイプ |
| ------------ | -------------------------------------------------- |
| **`bundle`** | <code><a href="#bundleinfo">バンドル情報</a></code> |


### バンドル情報

|小道具 |タイプ |
| ---------------- | ----------------------------------------------------- |
| **`id`** | <code>string</code> |
| **`version`** | <code>string</code> |
| **`downloaded`** | <code>string</code> |
| **`checksum`** | <code>string</code> |
| **`status`** | <code><a href="#bundlestatus">バンドルステータス</a></code> |


### 更新URL

|小道具 |タイプ |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


### 統計URL

|小道具 |タイプ |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


### チャンネルURL

|小道具 |タイプ |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


### ダウンロードオプション

この URL とバージョンは、サーバーからバンドルをダウンロードするために使用されます。バックエンドを使用する場合は、すべての情報が getlatest メソッドによって提供されます。
バックエンドを使用しない場合は、バンドルの URL とバージョンを指定する必要があります。 CLI コマンド encrypt を使用してバンドルを暗号化した場合は、チェックサムとセッションキーが必要です。これらはコマンドの結果として受け取る必要があります。|小道具 |タイプ |説明 |デフォルト |以来 |
| ---------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ----- |
| **`url`** | <code>string</code> |ダウンロードするバンドル zip ファイル (例: dist.zip) の URL。 (これは任意の URL にすることができます。例: Amazon S3、GitHub タグ、バンドルをホストしているその他の場所。)                        |       |
| **`version`** | <code>string</code> |このバンドル/バージョンのバージョン コード/名前 |                        |       |
| **`sessionKey`** | <code>string</code> |バンドルがセッション キーで暗号化されている場合の更新用のセッション キー | <code>未定義</code> | 4.0.0 |
| **`checksum`** | <code>string</code> |アップデートのチェックサム。バンドルが暗号化されている場合は、sha256 で秘密キーで暗号化されている必要があります。 <code>未定義</code> | 4.0.0 |
| **`manifest`** | <code>ManifestEntry[]</code> |デルタ (マニフェスト) マルチファイル ダウンロードのマニフェスト | <code>未定義</code> | 6.1.0 |


### マニフェストエントリ

|小道具 |タイプ |
| ------------------ | ------------------------- |
| **`file_name`** | <code>文字列 \| null</code> |
| **`file_hash`** | <code>文字列 \| null</code> |
| **`download_url`** | <code>文字列 \| null</code> |


### BundleId

|小道具 |タイプ |
| -------- | ------------------- |
| **`id`** | <code>string</code> |


### バンドルリスト結果

|小道具 |タイプ |
| ------------- | ------------------------- |
| **`bundles`** | <code>バンドル情報[]</code> |


### リストオプション|小道具 |タイプ |説明 |デフォルト |以来 |
| --------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------ |
| **`raw`** | <code>ブール値</code> |生のバンドル リストを返すかマニフェストを返すか。 true の場合、リストはディスク上のファイルではなく内部データベースの読み取りを試みます。 | <code>false</code> | 6.14.0 |


### リセットオプション

| Prop                   |タイプ |
| ---------------------- | -------------------- |
| **`toLastSuccessful`** | <code>ブール値</code> |


### 現在のバンドル結果

|小道具 |タイプ |
| ------------ | -------------------------------------------------- |
| **`bundle`** | <code><a href="#bundleinfo">バンドル情報</a></code> |
| **`native`** | <code>string</code> |


### マルチ遅延条件

|小道具 |タイプ |
| --------------------- | ----------------------------- |
| **`delayConditions`** | <code>遅延条件[]</code> |


### 遅延条件

|小道具 |タイプ |説明 |
| ----------- | -------------------------------------------------------- | -------------------------------------- |
| **`kind`** | <code><a href="#delayuntilnext">次まで遅延</a></code> | setMultiDelay | で遅延条件を設定します。
| **`value`** | <code>string</code> |                                          |


### 最新バージョン|小道具 |タイプ |説明 |以来 |
| ---------------- | ---------------------------- | ------------------------ | ----- |
| **`version`** | <code>string</code> | getlatest メソッドの結果 | 4.0.0 |
| **`checksum`** | <code>string</code> |                            | 6 |
| **`major`** | <code>ブール値</code> |                            |       |
| **`message`** | <code>string</code> |                            |       |
| **`sessionKey`** | <code>string</code> |                            |       |
| **`error`** | <code>string</code> |                            |       |
| **`old`** | <code>string</code> |                            |       |
| **`url`** | <code>string</code> |                            |       |
| **`manifest`** | <code>ManifestEntry[]</code> |                            | 6.1 |


### GetlatestOptions

|小道具 |タイプ |説明 |デフォルト |以来 |
| ------------- | ------------------- | ---------------------------------------------------------------------------------------------- | ---------------------- | ----- |
| **`channel`** | <code>string</code> |最新バージョンを取得するチャネル このチャネルが機能するには、「self_assign」を許可する必要があります。 <code>未定義</code> | 6.8.0 |


### チャンネル解像度

|小道具 |タイプ |説明 |以来 |
| ------------- | ------------------- | ----------------------------- | ----- |
| **`status`** | <code>string</code> |設定チャンネルの現在の状態 | 4.7.0 |
| **`error`** | <code>string</code> |                               |       |
| **`message`** | <code>string</code> |                               |       |


### SetChannelOptions

|小道具 |タイプ |
| ----------------------- | -------------------- |
| **`channel`** | <code>string</code> |
| **`triggerAutoUpdate`** | <code>ブール値</code> |


### UnsetChannelOptions

|小道具 |タイプ |
| ----------------------- | -------------------- |
| **`triggerAutoUpdate`** | <code>ブール値</code> |


### GetChannelRes|小道具 |タイプ |説明 |以来 |
| -------------- | -------------------- | ----------------------------- | ----- |
| **`channel`** | <code>string</code> |チャンネル取得の現在のステータス | 4.8.0 |
| **`error`** | <code>string</code> |                               |       |
| **`message`** | <code>string</code> |                               |       |
| **`status`** | <code>string</code> |                               |       |
| **`allowSet`** | <code>ブール値</code> |                               |       |


### ListChannelsResult

|小道具 |タイプ |説明 |以来 |
| -------------- | ------------------------ | ------------------------ | ----- |
| **`channels`** | <code>チャンネル情報[]</code> |利用可能なチャンネルのリスト | 7.5.0 |


### チャンネル情報

|小道具 |タイプ |説明 |以来 |
| -------------------- | -------------------- | ----------------------------------------------- | ----- |
| **`id`** | <code>string</code> |チャンネル ID | 7.5.0 |
| **`name`** | <code>string</code> |チャンネル名 | 7.5.0 |
| **`public`** | <code>ブール値</code> | true の場合、これはデフォルト/フォールバック チャネルです。デバイスはパブリック チャネルに自己割り当てできません。代わりに、デバイスがチャネル オーバーライドを削除すると (`unsetChannel()` を使用)、一致するパブリック チャネルから更新を自動的に受信します。 | 7.5.0 |
| **`allow_self_set`** | <code>ブール値</code> | true の場合、デバイスは `setChannel()` を使用してこのチャネルに明示的に自己割り当てできます。これは通常、ベータ テスト、A/B テスト、またはオプトイン更新トラックに使用されます。 | 7.5.0 |


### SetCustomIdOptions

|小道具 |タイプ |
| -------------- | ------------------- |
| **`customId`** | <code>string</code> |


### 組み込みバージョン

|小道具 |タイプ |
| ------------- | ------------------- |
| **`version`** | <code>string</code> |


### デバイス ID

|小道具 |タイプ |
| -------------- | ------------------- |
| **`deviceId`** | <code>string</code> |


### プラグインのバージョン

|小道具 |タイプ |
| ------------- | ------------------- |
| **`version`** | <code>string</code> |


### 自動更新が有効です

|小道具 |タイプ |
| ------------- | -------------------- |
| **`enabled`** | <code>ブール値</code> |


### プラグインリスナーハンドル

|小道具 |タイプ |
| ------------ | -------------------------------------- |
| **`remove`** | <code>() => 約束<void></code> |


### DownloadEvent|小道具 |タイプ |説明 |以来 |
| ------------- | -------------------------------------------------- | ------------------------------------------------ | ----- |
| **`percent`** | <code>番号</code> |ダウンロードの現在のステータス (0 ～ 100)。 4.0.0 |
| **`bundle`** | <code><a href="#bundleinfo">バンドル情報</a></code> |                                                |       |


### 必要のないイベント

|小道具 |タイプ |説明 |以来 |
| ------------ | -------------------------------------------------- | ------------------------------------------------ | ----- |
| **`bundle`** | <code><a href="#bundleinfo">バンドル情報</a></code> |ダウンロードの現在のステータス (0 ～ 100)。 4.0.0 |


### UpdateAvailableEvent

|小道具 |タイプ |説明 |以来 |
| ------------ | -------------------------------------------------- | ------------------------------------------------ | ----- |
| **`bundle`** | <code><a href="#bundleinfo">バンドル情報</a></code> |ダウンロードの現在のステータス (0 ～ 100)。 4.0.0 |


### ダウンロード完了イベント

|小道具 |タイプ |説明 |以来 |
| ------------ | -------------------------------------------------- | ------------------------------------ | ----- |
| **`bundle`** | <code><a href="#bundleinfo">バンドル情報</a></code> |新しいアップデートが利用可能になったときに発行されます。 | 4.0.0 |


### MajorAvailableEvent

|小道具 |タイプ |説明 |以来 |
| ------------- | ------------------- | ------------------------------------------ | ----- |
| **`version`** | <code>string</code> |新しいメジャー バンドルが利用可能になったときに発行されます。 | 4.0.0 |


### 更新失敗イベント

|小道具 |タイプ |説明 |以来 |
| ------------ | -------------------------------------------------- | ------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">バンドル情報</a></code> |アップデートのインストールに失敗した場合に発行されます。 | 4.0.0 |


### DownloadFailedEvent

|小道具 |タイプ |説明 |以来 |
| ------------- | ------------------- | ------------------------ | ----- |
| **`version`** | <code>string</code> |ダウンロードが失敗したときに発行されます。 | 4.0.0 |


### AppReadyイベント|小道具 |タイプ |説明 |以来 |
| ------------ | -------------------------------------------------- | ------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">バンドル情報</a></code> |アプリを使用する準備ができたときに発行されます。 | 5.2.0 |
| **`status`** | <code>string</code> |                                       |       |


### 自動更新が利用可能

|小道具 |タイプ |
| --------------- | -------------------- |
| **`available`** | <code>ブール値</code> |


### SetShakeMenuOptions

|小道具 |タイプ |
| ------------- | -------------------- |
| **`enabled`** | <code>ブール値</code> |


### ShakeMenuEnabled

|小道具 |タイプ |
| ------------- | -------------------- |
| **`enabled`** | <code>ブール値</code> |


## タイプエイリアス


### バンドルのステータス

pending: バンドルは次のバンドルとして **SET** されるまで保留中です。
ダウンロード中: バンドルをダウンロード中です。
成功: バンドルはダウンロードされ、次のバンドルとして **SET** する準備ができています。
エラー: バンドルのダウンロードに失敗しました。

<code>「成功」 | 'エラー' | '保留中' | 'ダウンロード中'</code>


### 次までの遅延

<code>'背景' | '殺す' | 'ネイティブバージョン' | '日付'</code>

</docgen-api>
