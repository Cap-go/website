---
title: "函数和设置"
locale: zh
description: "插件的所有可用方法和设置"
sidebar:
  order: 2
---

# Updater 插件配置

有关更多信息，请参阅 Github [Readme](https://github.com/Cap-go/capacitor-updater)。

<docgen-config>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

CapacitorUpdater 可以使用以下选项进行配置：

| 属性                         | 类型                                            | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 默认值                                            | 版本   |
| ---------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ------- |
| **`appReadyTimeout`**        | <code>number</code>                             | 配置原生插件在将更新视为"失败"之前应等待的毫秒数。仅适用于 Android 和 iOS。                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | <code>10000 // (10 秒)</code>                 |         |
| **`responseTimeout`**        | <code>number</code>                             | 配置原生插件在将 API 视为超时之前应等待的毫秒数。仅适用于 Android 和 iOS。                                                                                                                                                                                                                                                                                                                                                                                                                                                            | <code>20 // (20 秒)</code>                     |         |
| **`autoDeleteFailed`**       | <code>boolean</code>                            | 配置插件是否应自动删除失败的捆绑包。仅适用于 Android 和 iOS。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | <code>true</code>                                  |         |
| **`autoDeletePrevious`**     | <code>boolean</code>                            | 配置插件是否应在成功更新后自动删除以前的捆绑包。仅适用于 Android 和 iOS。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | <code>true</code>                                  |         |
| **`autoUpdate`**             | <code>boolean</code>                            | 配置插件是否应通过更新服务器使用自动更新。仅适用于 Android 和 iOS。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | <code>true</code>                                  |         |
| **`resetWhenUpdate`**        | <code>boolean</code>                            | 当将较新的原生应用捆绑包安装到设备时，自动删除以前下载的捆绑包。仅适用于 Android 和 iOS。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | <code>true</code>                                  |         |
| **`updateUrl`**              | <code>string</code>                             | 配置发送更新检查的 URL / 端点。仅适用于 Android 和 iOS。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>https://plugin.capgo.app/updates</code>      |         |
| **`channelUrl`**             | <code>string</code>                             | 配置频道操作的 URL / 端点。仅适用于 Android 和 iOS。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | <code>https://plugin.capgo.app/channel_self</code> |         |
| **`statsUrl`**               | <code>string</code>                             | 配置发送更新统计信息的 URL / 端点。仅适用于 Android 和 iOS。设置为 "" 以禁用统计报告。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | <code>https://plugin.capgo.app/stats</code>        |         |
| **`publicKey`**              | <code>string</code>                             | 配置端到端实时更新加密的公钥版本 2 仅适用于 Android 和 iOS。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | <code>undefined</code>                             | 6.2.0   |
| **`version`**                | <code>string</code>                             | 配置应用的当前版本。这将用于第一次更新请求。如果未设置，插件将从原生代码获取版本。仅适用于 Android 和 iOS。                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | <code>undefined</code>                             | 4.17.48 |
| **`directUpdate`**           | <code>boolean \| 'always' \| 'atInstall' \| 'onLaunch'</code> | 配置插件何时应直接安装更新。仅适用于 autoUpdate 模式。适用于小于 10MB 的应用和使用 --partial 标志上传的应用。Zip 或大于 10MB 的应用对用户来说更新速度相对较慢。- false：永不进行直接更新（使用默认行为：在启动时下载，在后台时设置）- atInstall：仅在安装应用、从商店更新时进行直接更新，否则表现为 directUpdate = false - onLaunch：仅在应用安装、从商店更新或应用终止后进行直接更新，否则表现为 directUpdate = false - always：在所有先前情况下进行直接更新（应用安装、从商店更新、应用终止或应用恢复后），永不表现为 directUpdate = false - true：（已弃用）与"always"相同以保持向后兼容性。仅适用于 Android 和 iOS。 | <code>false</code>                                 | 5.1.0   |
| **`autoSplashscreen`**       | <code>boolean</code>                            | 使用 directUpdate 时自动处理启动画面隐藏。启用后，插件将在应用更新后或不需要更新时自动隐藏启动画面。这消除了手动监听 appReady 事件并调用 SplashScreen.hide() 的需要。仅在 directUpdate 设置为"atInstall"、"always"或 true 时有效。需要安装 @capacitor/splash-screen 插件并配置 launchAutoHide: false。需要启用 autoUpdate 和 directUpdate。仅适用于 Android 和 iOS。                      | <code>false</code>                                 | 7.6.0   |
| **`periodCheckDelay`**       | <code>number</code>                             | 配置定期更新检查的延迟时间。单位为秒。仅适用于 Android 和 iOS。不能少于 600 秒（10 分钟）。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | <code>600 // (10 分钟)</code>                   |         |
| **`localS3`**                | <code>boolean</code>                            | 配置 CLI 使用本地服务器进行测试或自托管更新服务器。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>undefined</code>                             | 4.17.48 |
| **`localHost`**              | <code>string</code>                             | 配置 CLI 使用本地服务器进行测试或自托管更新服务器。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>undefined</code>                             | 4.17.48 |
| **`localWebHost`**           | <code>string</code>                             | 配置 CLI 使用本地服务器进行测试或自托管更新服务器。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>undefined</code>                             | 4.17.48 |
| **`localSupa`**              | <code>string</code>                             | 配置 CLI 使用本地服务器进行测试或自托管更新服务器。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>undefined</code>                             | 4.17.48 |
| **`localSupaAnon`**          | <code>string</code>                             | 配置 CLI 使用本地服务器进行测试。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | <code>undefined</code>                             | 4.17.48 |
| **`localApi`**               | <code>string</code>                             | 配置 CLI 使用本地 API 进行测试。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>undefined</code>                             | 6.3.3   |
| **`localApiFiles`**          | <code>string</code>                             | 配置 CLI 使用本地文件 API 进行测试。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | <code>undefined</code>                             | 6.3.3   |
| **`allowModifyUrl`**         | <code>boolean</code>                            | 允许插件从 JavaScript 端动态修改 updateUrl、statsUrl 和 channelUrl。                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | <code>false</code>                                 | 5.4.0   |
| **`defaultChannel`**         | <code>string</code>                             | 在配置中为应用设置默认频道。区分大小写。此设置将覆盖云中设置的默认频道，但仍会尊重云中所做的覆盖。                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | <code>undefined</code>                             | 5.5.0   |
| **`appId`**                  | <code>string</code>                             | 在配置中为应用配置应用 ID。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | <code>undefined</code>                             | 6.0.0   |
| **`keepUrlPathAfterReload`** | <code>boolean</code>                            | 配置插件在重新加载后保留 URL 路径。警告：触发重新加载时，'window.history' 将被清除。                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | <code>false</code>                                 | 6.8.0   |
| **`disableJSLogging`**       | <code>boolean</code>                            | 禁用插件的 JavaScript 日志记录。如果为 true，插件将不会记录到 JavaScript 控制台。只会完成原生日志                                                                                                                                                                                                                                                                                                                                                                                                                                                        | <code>false</code>                                 | 7.3.0   |
| **`shakeMenu`**              | <code>boolean</code>                            | 启用摇动手势以显示更新菜单用于调试/测试目的                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | <code>false</code>                                 | 7.5.0   |

## 示例

在 `capacitor.config.json` 中：

```json
{
  "plugins": {
    "CapacitorUpdater": {
      "appReadyTimeout": 1000 // (1 秒),
      "responseTimeout": 10 // (10 秒),
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

在 `capacitor.config.ts` 中：

```ts
/// <reference types="@capgo/capacitor-updater" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    CapacitorUpdater: {
      appReadyTimeout: 1000 // (1 秒),
      responseTimeout: 10 // (10 秒),
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
* [`delete(...)`](#delete)
* [`list(...)`](#list)
* [`reset(...)`](#reset)
* [`current()`](#current)
* [`reload()`](#reload)
* [`setMultiDelay(...)`](#setmultidelay)
* [`cancelDelay()`](#canceldelay)
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
* [接口](#interfaces)
* [类型别名](#type-aliases)

</docgen-index>

# 方法

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

## notifyAppReady()

```typescript
notifyAppReady() => Promise<AppReadyResult>
```

通知 Capacitor Updater 当前捆绑包正在工作（如果在每次应用启动时不调用此方法，将发生回滚）
默认情况下，此方法应在应用启动后的前 10 秒内调用，否则将发生回滚。
使用 {@link appReadyTimeout} 更改此行为

**返回：** <code>Promise&lt;<a href="#appreadyresult">AppReadyResult</a>&gt;</code>

--------------------


## setUpdateUrl(...)

```typescript
setUpdateUrl(options: UpdateUrl) => Promise<void>
```

为应用设置 updateUrl，这将用于检查更新。

| 参数         | 类型                                            | 描述                                       |
| ------------- | ----------------------------------------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#updateurl">UpdateUrl</a></code> | 包含用于检查更新的 URL。 |

**版本：** 5.4.0

--------------------


## setStatsUrl(...)

```typescript
setStatsUrl(options: StatsUrl) => Promise<void>
```

为应用设置 statsUrl，这将用于发送统计信息。传递空字符串将禁用统计信息收集。

| 参数         | 类型                                          | 描述                                     |
| ------------- | --------------------------------------------- | ----------------------------------------------- |
| **`options`** | <code><a href="#statsurl">StatsUrl</a></code> | 包含用于发送统计信息的 URL。 |

**版本：** 5.4.0

--------------------


## setChannelUrl(...)

```typescript
setChannelUrl(options: ChannelUrl) => Promise<void>
```

为应用设置 channelUrl，这将用于设置频道。

| 参数         | 类型                                              | 描述                                      |
| ------------- | ------------------------------------------------- | ------------------------------------------------ |
| **`options`** | <code><a href="#channelurl">ChannelUrl</a></code> | 包含用于设置频道的 URL。 |

**版本：** 5.4.0

--------------------


## download(...)

```typescript
download(options: DownloadOptions) => Promise<BundleInfo>
```

从提供的 URL 下载新捆绑包，它应该是一个 zip 文件，里面包含文件或里面有唯一 ID 的所有文件

| 参数         | 类型                                                        | 描述                                                                                  |
| ------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#downloadoptions">DownloadOptions</a></code> | 用于下载新捆绑包 zip 的 {@link <a href="#downloadoptions">DownloadOptions</a>}。 |

**返回：** <code>Promise&lt;<a href="#bundleinfo">BundleInfo</a>&gt;</code>

--------------------


## next(...)

```typescript
next(options: BundleId) => Promise<BundleInfo>
```

设置在应用重新加载时使用的下一个捆绑包。

| 参数         | 类型                                          | 描述                                                                                                   |
| ------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | 包含要在下次应用启动时设置的下一个捆绑包的 ID。{@link <a href="#bundleinfo">BundleInfo.id</a>} |

**返回：** <code>Promise&lt;<a href="#bundleinfo">BundleInfo</a>&gt;</code>

--------------------


## set(...)

```typescript
set(options: BundleId) => Promise<void>
```

设置当前捆绑包并立即重新加载应用。

| 参数         | 类型                                          | 描述                                                                                       |
| ------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | 包含要设置为当前的新捆绑包 ID 的 {@link <a href="#bundleid">BundleId</a>} 对象。 |

--------------------


## delete(...)

```typescript
delete(options: BundleId) => Promise<void>
```

从原生应用存储中删除指定的捆绑包。使用 {@link list} 获取存储的捆绑包 ID。

| 参数         | 类型                                          | 描述                                                                                                                                   |
| ------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | 包含要删除的捆绑包 ID 的 {@link <a href="#bundleid">BundleId</a>} 对象（注意，这是捆绑包 ID，而不是版本名称） |

--------------------


## list(...)

```typescript
list(options?: ListOptions | undefined) => Promise<BundleListResult>
```

获取应用中所有本地下载的捆绑包

| 参数         | 类型                                                | 描述                                                            |
| ------------- | --------------------------------------------------- | ---------------------------------------------------------------------- |
| **`options`** | <code><a href="#listoptions">ListOptions</a></code> | 用于列出捆绑包的 {@link <a href="#listoptions">ListOptions</a>} |

**返回：** <code>Promise&lt;<a href="#bundlelistresult">BundleListResult</a>&gt;</code>

--------------------


## reset(...)

```typescript
reset(options?: ResetOptions | undefined) => Promise<void>
```

将应用重置为 `builtin` 捆绑包（发送到 Apple App Store / Google Play Store 的捆绑包）或最后成功加载的捆绑包。

| 参数         | 类型                                                  | 描述                                                                                                                                                                      |
| ------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#resetoptions">ResetOptions</a></code> | 包含 {@link <a href="#resetoptions">ResetOptions.toLastSuccessful</a>}，`true` 重置为内置捆绑包，`false` 将重置为最后成功加载的捆绑包。 |

--------------------


## current()

```typescript
current() => Promise<CurrentBundleResult>
```

获取当前捆绑包，如果没有设置，则返回 `builtin`。currentNative 是设备上安装的原始捆绑包

**返回：** <code>Promise&lt;<a href="#currentbundleresult">CurrentBundleResult</a>&gt;</code>

--------------------


## reload()

```typescript
reload() => Promise<void>
```

重新加载视图

--------------------


## setMultiDelay(...)

```typescript
setMultiDelay(options: MultiDelayConditions) => Promise<void>
```

设置包含插件将用于延迟更新的条件的 {@link <a href="#delaycondition">DelayCondition</a>} 数组。
在满足所有条件后，更新过程将像往常一样重新开始运行，因此更新将在后台或终止应用后安装。
对于 `date` 类型，值应为 iso8601 日期字符串。
对于 `background` 类型，值应为以毫秒为单位的数字。
对于 `nativeVersion` 类型，值应为版本号。
对于 `kill` 类型，不使用该值。
该函数具有不一致的行为，kill 选项会在第一次终止后触发更新，而不是像其他选项那样在下一次后台后触发。这将在未来的主要版本中修复。

| 参数         | 类型                                                                  | 描述                                                                                                |
| ------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#multidelayconditions">MultiDelayConditions</a></code> | 包含要设置的 {@link <a href="#multidelayconditions">MultiDelayConditions</a>} 条件数组 |

**版本：** 4.3.0

--------------------


## cancelDelay()

```typescript
cancelDelay() => Promise<void>
```

取消 {@link <a href="#delaycondition">DelayCondition</a>} 以立即处理更新。

**版本：** 4.0.0

--------------------


## getLatest(...)

```typescript
getLatest(options?: GetLatestOptions | undefined) => Promise<LatestVersion>
```

从更新 Url 获取最新可用捆绑包

| 参数         | 类型                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#getlatestoptions">GetLatestOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#latestversion">LatestVersion</a>&gt;</code>

**版本：** 4.0.0

--------------------


## setChannel(...)

```typescript
setChannel(options: SetChannelOptions) => Promise<ChannelRes>
```

为此设备设置频道。频道必须允许自我分配才能生效。
不要使用此方法在启动时设置频道。
此方法用于在应用准备就绪并且用户进行交互后设置频道。
如果要在启动时设置频道，请使用 {@link PluginsConfig} 设置默认频道。
此方法向 Capgo 后端发送请求以将设备 ID 链接到频道。Capgo 可以根据您频道的设置接受或拒绝。

| 参数         | 类型                                                            | 描述                                                                      |
| ------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setchanneloptions">SetChannelOptions</a></code> | 是要设置的 {@link <a href="#setchanneloptions">SetChannelOptions</a>} 频道 |

**返回：** <code>Promise&lt;<a href="#channelres">ChannelRes</a>&gt;</code>

**版本：** 4.7.0

--------------------


## unsetChannel(...)

```typescript
unsetChannel(options: UnsetChannelOptions) => Promise<void>
```

取消设置此设备的频道。然后设备将返回到默认频道

| 参数         | 类型                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#unsetchanneloptions">UnsetChannelOptions</a></code> |

**版本：** 4.7.0

--------------------


## getChannel()

```typescript
getChannel() => Promise<GetChannelRes>
```

获取此设备的频道

**返回：** <code>Promise&lt;<a href="#getchannelres">GetChannelRes</a>&gt;</code>

**版本：** 4.8.0

--------------------


## listChannels()

```typescript
listChannels() => Promise<ListChannelsResult>
```

列出此设备可用的所有允许自我分配的频道

**返回：** <code>Promise&lt;<a href="#listchannelsresult">ListChannelsResult</a>&gt;</code>

**版本：** 7.5.0

--------------------


## setCustomId(...)

```typescript
setCustomId(options: SetCustomIdOptions) => Promise<void>
```

为此设备设置自定义 ID

| 参数         | 类型                                                              | 描述                                                                         |
| ------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setcustomidoptions">SetCustomIdOptions</a></code> | 是要设置的 {@link <a href="#setcustomidoptions">SetCustomIdOptions</a>} customId |

**版本：** 4.9.0

--------------------


## getBuiltinVersion()

```typescript
getBuiltinVersion() => Promise<BuiltinVersion>
```

获取原生应用版本或在配置中设置的内置版本

**返回：** <code>Promise&lt;<a href="#builtinversion">BuiltinVersion</a>&gt;</code>

**版本：** 5.2.0

--------------------


## getDeviceId()

```typescript
getDeviceId() => Promise<DeviceId>
```

获取用于标识设备的唯一 ID（发送到自动更新服务器）

**返回：** <code>Promise&lt;<a href="#deviceid">DeviceId</a>&gt;</code>

--------------------


## getPluginVersion()

```typescript
getPluginVersion() => Promise<PluginVersion>
```

获取原生 Capacitor Updater 插件版本（发送到自动更新服务器）

**返回：** <code>Promise&lt;<a href="#pluginversion">PluginVersion</a>&gt;</code>

--------------------


## isAutoUpdateEnabled()

```typescript
isAutoUpdateEnabled() => Promise<AutoUpdateEnabled>
```

获取自动更新配置的状态。

**返回：** <code>Promise&lt;<a href="#autoupdateenabled">AutoUpdateEnabled</a>&gt;</code>

--------------------


## removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除此插件的所有监听器。

**版本：** 1.0.0

--------------------


## addListener('download', ...)

```typescript
addListener(eventName: 'download', listenerFunc: (state: DownloadEvent) => void) => Promise<PluginListenerHandle>
```

在应用中监听捆绑包下载事件。在下载开始后、下载期间和完成时触发。
这将在下载期间返回所有下载百分比

| 参数              | 类型                                                                        |
| ------------------ | --------------------------------------------------------------------------- |
| **`eventName`**    | <code>'download'</code>                                                     |
| **`listenerFunc`** | <code>(state: <a href="#downloadevent">DownloadEvent</a>) =&gt; void</code> |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**版本：** 2.0.11

--------------------


## addListener('noNeedUpdate', ...)

```typescript
addListener(eventName: 'noNeedUpdate', listenerFunc: (state: NoNeedEvent) => void) => Promise<PluginListenerHandle>
```

监听无需更新事件，当您想每次启动应用时强制检查时很有用

| 参数              | 类型                                                                    |
| ------------------ | ----------------------------------------------------------------------- |
| **`eventName`**    | <code>'noNeedUpdate'</code>                                             |
| **`listenerFunc`** | <code>(state: <a href="#noneedevent">NoNeedEvent</a>) =&gt; void</code> |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**版本：** 4.0.0

--------------------


## addListener('updateAvailable', ...)

```typescript
addListener(eventName: 'updateAvailable', listenerFunc: (state: UpdateAvailableEvent) => void) => Promise<PluginListenerHandle>
```

监听可用更新事件，当您想每次启动应用时强制检查时很有用

| 参数              | 类型                                                                                      |
| ------------------ | ----------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'updateAvailable'</code>                                                            |
| **`listenerFunc`** | <code>(state: <a href="#updateavailableevent">UpdateAvailableEvent</a>) =&gt; void</code> |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**版本：** 4.0.0

--------------------


## addListener('downloadComplete', ...)

```typescript
addListener(eventName: 'downloadComplete', listenerFunc: (state: DownloadCompleteEvent) => void) => Promise<PluginListenerHandle>
```

监听 downloadComplete 事件。

| 参数              | 类型                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'downloadComplete'</code>                                                             |
| **`listenerFunc`** | <code>(state: <a href="#downloadcompleteevent">DownloadCompleteEvent</a>) =&gt; void</code> |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**版本：** 4.0.0

--------------------


## addListener('majorAvailable', ...)

```typescript
addListener(eventName: 'majorAvailable', listenerFunc: (state: MajorAvailableEvent) => void) => Promise<PluginListenerHandle>
```

在应用中监听主要更新事件，让您知道何时通过设置 disableAutoUpdateBreaking 阻止了主要更新

| 参数              | 类型                                                                                    |
| ------------------ | --------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'majorAvailable'</code>                                                           |
| **`listenerFunc`** | <code>(state: <a href="#majoravailableevent">MajorAvailableEvent</a>) =&gt; void</code> |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**版本：** 2.3.0

--------------------


## addListener('updateFailed', ...)

```typescript
addListener(eventName: 'updateFailed', listenerFunc: (state: UpdateFailedEvent) => void) => Promise<PluginListenerHandle>
```

在应用中监听更新失败事件，让您知道何时更新在下次应用启动时安装失败

| 参数              | 类型                                                                                |
| ------------------ | ----------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'updateFailed'</code>                                                         |
| **`listenerFunc`** | <code>(state: <a href="#updatefailedevent">UpdateFailedEvent</a>) =&gt; void</code> |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**版本：** 2.3.0

--------------------


## addListener('downloadFailed', ...)

```typescript
addListener(eventName: 'downloadFailed', listenerFunc: (state: DownloadFailedEvent) => void) => Promise<PluginListenerHandle>
```

在应用中监听下载失败事件，让您知道何时捆绑包下载失败

| 参数              | 类型                                                                                    |
| ------------------ | --------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'downloadFailed'</code>                                                           |
| **`listenerFunc`** | <code>(state: <a href="#downloadfailedevent">DownloadFailedEvent</a>) =&gt; void</code> |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**版本：** 4.0.0

--------------------


## addListener('appReloaded', ...)

```typescript
addListener(eventName: 'appReloaded', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

在应用中监听重新加载事件，让您知道何时发生了重新加载

| 参数              | 类型                       |
| ------------------ | -------------------------- |
| **`eventName`**    | <code>'appReloaded'</code> |
| **`listenerFunc`** | <code>() =&gt; void</code> |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**版本：** 4.3.0

--------------------


## addListener('appReady', ...)

```typescript
addListener(eventName: 'appReady', listenerFunc: (state: AppReadyEvent) => void) => Promise<PluginListenerHandle>
```

在应用中监听应用就绪事件，让您知道何时应用准备好使用

| 参数              | 类型                                                                        |
| ------------------ | --------------------------------------------------------------------------- |
| **`eventName`**    | <code>'appReady'</code>                                                     |
| **`listenerFunc`** | <code>(state: <a href="#appreadyevent">AppReadyEvent</a>) =&gt; void</code> |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**版本：** 5.1.0

--------------------


## isAutoUpdateAvailable()

```typescript
isAutoUpdateAvailable() => Promise<AutoUpdateAvailable>
```

获取自动更新是否可用（未被 serverUrl 禁用）。

**返回：** <code>Promise&lt;<a href="#autoupdateavailable">AutoUpdateAvailable</a>&gt;</code>

--------------------


## getNextBundle()

```typescript
getNextBundle() => Promise<BundleInfo | null>
```

获取应用重新加载时将使用的下一个捆绑包。
如果未设置下一个捆绑包，则返回 null。

**返回：** <code>Promise&lt;<a href="#bundleinfo">BundleInfo</a> | null&gt;</code>

**版本：** 6.8.0

--------------------


## setShakeMenu(...)

```typescript
setShakeMenu(options: SetShakeMenuOptions) => Promise<void>
```

启用或禁用摇动菜单用于调试/测试目的

| 参数         | 类型                                                                | 描述                                              |
| ------------- | ------------------------------------------------------------------- | -------------------------------------------------------- |
| **`options`** | <code><a href="#setshakemenuoptions">SetShakeMenuOptions</a></code> | 包含 enabled 布尔值以启用或禁用摇动菜单 |

**版本：** 7.5.0

--------------------


## isShakeMenuEnabled()

```typescript
isShakeMenuEnabled() => Promise<ShakeMenuEnabled>
```

获取摇动菜单的当前状态

**返回：** <code>Promise&lt;<a href="#shakemenuenabled">ShakeMenuEnabled</a>&gt;</code>

**版本：** 7.5.0

--------------------


## 接口


### AppReadyResult

| 属性         | 类型                                              |
| ------------ | ------------------------------------------------- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> |


### BundleInfo

| 属性             | 类型                                                  |
| ---------------- | ----------------------------------------------------- |
| **`id`**         | <code>string</code>                                   |
| **`version`**    | <code>string</code>                                   |
| **`downloaded`** | <code>string</code>                                   |
| **`checksum`**   | <code>string</code>                                   |
| **`status`**     | <code><a href="#bundlestatus">BundleStatus</a></code> |


### UpdateUrl

| 属性      | 类型                |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


### StatsUrl

| 属性      | 类型                |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


### ChannelUrl

| 属性      | 类型                |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


### DownloadOptions

此 URL 和版本用于从服务器下载捆绑包，如果您使用后端，所有信息将由 getLatest 方法提供。
如果您不使用后端，则需要提供捆绑包的 URL 和版本。如果您使用 CLI 命令 encrypt 加密了捆绑包，则需要 Checksum 和 sessionKey，您应该收到它们作为命令的结果。

| 属性             | 类型                         | 描述                                                                                                                                                      | 默认                | 版本 |
| ---------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ----- |
| **`url`**        | <code>string</code>          | 要下载的捆绑包 zip 文件的 URL（例如：dist.zip）。（这可以是任何 URL。例如：Amazon S3、GitHub 标签、您托管捆绑包的任何其他地方。） |                        |       |
| **`version`**    | <code>string</code>          | 此捆绑包/版本的版本代码/名称                                                                                                                                     |                        |       |
| **`sessionKey`** | <code>string</code>          | 更新的会话密钥，当捆绑包使用会话密钥加密时                                                                                  | <code>undefined</code> | 4.0.0 |
| **`checksum`**   | <code>string</code>          | 更新的校验和，它应该是 sha256 并使用私钥加密，如果捆绑包已加密                                                    | <code>undefined</code> | 4.0.0 |
| **`manifest`**   | <code>ManifestEntry[]</code> | 多文件下载的清单                                                                                                                            | <code>undefined</code> | 6.1.0 |


### ManifestEntry

| 属性               | 类型                        |
| ------------------ | --------------------------- |
| **`file_name`**    | <code>string \| null</code> |
| **`file_hash`**    | <code>string \| null</code> |
| **`download_url`** | <code>string \| null</code> |


### BundleId

| 属性     | 类型                |
| -------- | ------------------- |
| **`id`** | <code>string</code> |


### BundleListResult

| 属性          | 类型                      |
| ------------- | ------------------------- |
| **`bundles`** | <code>BundleInfo[]</code> |


### ListOptions

| 属性      | 类型                 | 描述                                                                                                                                   | 默认            | 版本  |
| --------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------ |
| **`raw`** | <code>boolean</code> | 是否返回原始捆绑包列表或清单。如果为 true，列表将尝试读取内部数据库而不是磁盘上的文件。 | <code>false</code> | 6.14.0 |


### ResetOptions

| 属性                   | 类型                 |
| ---------------------- | -------------------- |
| **`toLastSuccessful`** | <code>boolean</code> |


### CurrentBundleResult

| 属性         | 类型                                              |
| ------------ | ------------------------------------------------- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> |
| **`native`** | <code>string</code>                               |


### MultiDelayConditions

| 属性                  | 类型                          |
| --------------------- | ----------------------------- |
| **`delayConditions`** | <code>DelayCondition[]</code> |


### DelayCondition

| 属性        | 类型                                                      | 描述                              |
| ----------- | --------------------------------------------------------- | ---------------------------------------- |
| **`kind`**  | <code><a href="#delayuntilnext">DelayUntilNext</a></code> | 在 setMultiDelay 中设置延迟条件 |
| **`value`** | <code>string</code>                                       |                                          |


### LatestVersion

| 属性             | 类型                         | 描述                | 版本 |
| ---------------- | ---------------------------- | -------------------------- | ----- |
| **`version`**    | <code>string</code>          | getLatest 方法的结果 | 4.0.0 |
| **`checksum`**   | <code>string</code>          |                            | 6     |
| **`major`**      | <code>boolean</code>         |                            |       |
| **`message`**    | <code>string</code>          |                            |       |
| **`sessionKey`** | <code>string</code>          |                            |       |
| **`error`**      | <code>string</code>          |                            |       |
| **`old`**        | <code>string</code>          |                            |       |
| **`url`**        | <code>string</code>          |                            |       |
| **`manifest`**   | <code>ManifestEntry[]</code> |                            | 6.1   |


### GetLatestOptions

| 属性          | 类型                | 描述                                                                                     | 默认                | 版本 |
| ------------- | ------------------- | ----------------------------------------------------------------------------------------------- | ---------------------- | ----- |
| **`channel`** | <code>string</code> | 要获取最新版本的频道 频道必须允许"self_assign"才能生效 | <code>undefined</code> | 6.8.0 |


### ChannelRes

| 属性          | 类型                | 描述                   | 版本 |
| ------------- | ------------------- | ----------------------------- | ----- |
| **`status`**  | <code>string</code> | 设置频道的当前状态 | 4.7.0 |
| **`error`**   | <code>string</code> |                               |       |
| **`message`** | <code>string</code> |                               |       |


### SetChannelOptions

| 属性                    | 类型                 |
| ----------------------- | -------------------- |
| **`channel`**           | <code>string</code>  |
| **`triggerAutoUpdate`** | <code>boolean</code> |


### UnsetChannelOptions

| 属性                    | 类型                 |
| ----------------------- | -------------------- |
| **`triggerAutoUpdate`** | <code>boolean</code> |


### GetChannelRes

| 属性           | 类型                 | 描述                   | 版本 |
| -------------- | -------------------- | ----------------------------- | ----- |
| **`channel`**  | <code>string</code>  | 获取频道的当前状态 | 4.8.0 |
| **`error`**    | <code>string</code>  |                               |       |
| **`message`**  | <code>string</code>  |                               |       |
| **`status`**   | <code>string</code>  |                               |       |
| **`allowSet`** | <code>boolean</code> |                               |       |


### ListChannelsResult

| 属性           | 类型                       | 描述                | 版本 |
| -------------- | -------------------------- | -------------------------- | ----- |
| **`channels`** | <code>ChannelInfo[]</code> | 可用频道列表 | 7.5.0 |


### ChannelInfo

| 属性                 | 类型                 | 描述                                     | 版本 |
| -------------------- | -------------------- | ----------------------------------------------- | ----- |
| **`id`**             | <code>string</code>  | 频道 ID                                  | 7.5.0 |
| **`name`**           | <code>string</code>  | 频道名称                                | 7.5.0 |
| **`public`**         | <code>boolean</code> | 这是否是公共频道                | 7.5.0 |
| **`allow_self_set`** | <code>boolean</code> | 设备是否可以自我分配到此频道 | 7.5.0 |


### SetCustomIdOptions

| 属性           | 类型                |
| -------------- | ------------------- |
| **`customId`** | <code>string</code> |


### BuiltinVersion

| 属性          | 类型                |
| ------------- | ------------------- |
| **`version`** | <code>string</code> |


### DeviceId

| 属性           | 类型                |
| -------------- | ------------------- |
| **`deviceId`** | <code>string</code> |


### PluginVersion

| 属性          | 类型                |
| ------------- | ------------------- |
| **`version`** | <code>string</code> |


### AutoUpdateEnabled

| 属性          | 类型                 |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |


### PluginListenerHandle

| 属性         | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


### DownloadEvent

| 属性          | 类型                                              | 描述                                    | 版本 |
| ------------- | ------------------------------------------------- | ---------------------------------------------- | ----- |
| **`percent`** | <code>number</code>                               | 当前下载状态，介于 0 和 100 之间。 | 4.0.0 |
| **`bundle`**  | <code><a href="#bundleinfo">BundleInfo</a></code> |                                                |       |


### NoNeedEvent

| 属性         | 类型                                              | 描述                                    | 版本 |
| ------------ | ------------------------------------------------- | ---------------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | 当前下载状态，介于 0 和 100 之间。 | 4.0.0 |


### UpdateAvailableEvent

| 属性         | 类型                                              | 描述                                    | 版本 |
| ------------ | ------------------------------------------------- | ---------------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | 当前下载状态，介于 0 和 100 之间。 | 4.0.0 |


### DownloadCompleteEvent

| 属性         | 类型                                              | 描述                          | 版本 |
| ------------ | ------------------------------------------------- | ------------------------------------ | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | 当有新更新可用时发出。 | 4.0.0 |


### MajorAvailableEvent

| 属性          | 类型                | 描述                                | 版本 |
| ------------- | ------------------- | ------------------------------------------ | ----- |
| **`version`** | <code>string</code> | 当有新的主要捆绑包可用时发出。 | 4.0.0 |


### UpdateFailedEvent

| 属性         | 类型                                              | 描述                           | 版本 |
| ------------ | ------------------------------------------------- | ------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | 当更新安装失败时发出。 | 4.0.0 |


### DownloadFailedEvent

| 属性          | 类型                | 描述                | 版本 |
| ------------- | ------------------- | -------------------------- | ----- |
| **`version`** | <code>string</code> | 当下载失败时发出。 | 4.0.0 |


### AppReadyEvent

| 属性         | 类型                                              | 描述                           | 版本 |
| ------------ | ------------------------------------------------- | ------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | 当应用准备好使用时发出。 | 5.2.0 |
| **`status`** | <code>string</code>                               |                                       |       |


### AutoUpdateAvailable

| 属性            | 类型                 |
| --------------- | -------------------- |
| **`available`** | <code>boolean</code> |


### SetShakeMenuOptions

| 属性          | 类型                 |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |


### ShakeMenuEnabled

| 属性          | 类型                 |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |


## 类型别名


### BundleStatus

pending：捆绑包等待被**设置**为下一个捆绑包。
downloading：捆绑包正在下载。
success：捆绑包已下载并准备好被**设置**为下一个捆绑包。
error：捆绑包下载失败。

<code>'success' | 'error' | 'pending' | 'downloading'</code>


### DelayUntilNext

<code>'background' | 'kill' | 'nativeVersion' | 'date'</code>

</docgen-api>
