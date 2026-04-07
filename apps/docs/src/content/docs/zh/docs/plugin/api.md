---
title: 功能与设置
description: 插件的所有可用方法和设置
sidebar:
  order: 2
locale: zh
---
# 更新插件配置

<docgen-config>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

CapacitorUpdater 可以使用以下选项进行配置：|道具|类型 |描述 |默认 |自从 |
| ---| ---| ---| ---| ---|
| **`appReadyTimeout`** | `number` |配置本机插件在考虑更新“失败”之前应等待的毫秒数。仅适用于 Android 和 iOS。 | `10000 // (10 seconds)` |  |
| **`responseTimeout`** | `number` |配置本机插件在考虑 API 超时之前应等待的秒数。仅适用于 Android 和 iOS。 | `20 // (20 second)` |  |
| **`autoDeleteFailed`** | `boolean` |配置插件是否应使用自动删除失败的包。仅适用于 Android 和 iOS。 | `true` |  |
| **`autoDeletePrevious`** | `boolean` |配置插件是否应在成功更新后自动删除以前的包。仅适用于 Android 和 iOS。 | `true` |  |
| **`autoUpdate`** | `boolean` |配置插件是否应通过更新服务器使用自动更新。仅适用于 Android 和 iOS。 | `true` |  |
| **`resetWhenUpdate`** | `boolean` |当更新的本机应用程序包安装到设备时，自动删除以前下载的包。如果用户从商店下载比当前下载的捆绑包旧的本机应用程序捆绑包，则将此设置为 false 可能会中断自动更新流程。频道设置 downgrade_under_native 将阻止上传。仅适用于 Android 和 iOS。 | `true` |  |
| **`updateUrl`** | `string` |配置更新检查发送到的 URL/端点。仅适用于 Android 和 iOS。 | `https://plugin.capgo.app/updates` |  |
| **`channelUrl`** | `string` |配置通道操作的 URL/端点。仅适用于 Android 和 iOS。 | `https://plugin.capgo.app/channel_self` |  |
| **`statsUrl`** | `string` |配置更新统计信息发送到的 URL/端点。仅适用于 Android 和 iOS。设置为“”以禁用统计报告。 | `https://plugin.capgo.app/stats` |  |
| **`publicKey`** | `string` |配置端到端实时更新加密的公钥版本 2 仅适用于 Android 和 iOS。 | `undefined` | 6.2.0 |
| **`version`** | `string` |配置应用程序的当前版本。这将用于第一次更新请求。如果未设置，插件将从本机代码获取版本。仅适用于 Android 和 iOS。 | `undefined` | 4.17.48 |
| **`directUpdate`** | `布尔值| '总是' | '在安装' | 'onLaunch'` |配置插件何时应直接安装更新。仅适用于自动更新模式。适用于小于 10MB 且使用 --delta 标志完成上传的应用程序。 Zip 或超过 10MB 的应用程序对于用户来说更新速度会相对较慢。 - false：从不进行直接更新（使用默认行为：开始时下载，后台设置） - atInstall：仅在安装应用程序、从商店更新等情况下直接更新rwise 充当 directUpdate = false - onLaunch：仅在已安装的应用程序、从商店更新或应用程序终止后直接更新，否则充当 directUpdate = false - 始终：在所有以前的情况下直接更新（安装应用程序、从商店更新、应用程序终止或应用程序恢复后），从不充当 directUpdate = false - true：（已弃用）与“始终”相同以实现向后兼容性激活此标志将自动在 CICD 环境中生成 CLI 上传增量，并要求确认在本地上传中。仅适用于 Android 和 iOS。 | `false` | 5.1.0 |
| **`autoSplashscreen`** | `boolean` |使用 directUpdate 时自动处理闪屏隐藏。启用后，该插件将在应用更新后或不需要更新时自动隐藏启动屏幕。这样就无需手动侦听 appReady 事件并调用 SplashScreen.hide()。仅当 directUpdate 设置为“atInstall”、“always”、“onLaunch”或 true 时才有效。需要安装 @capacitor/splash-screen 插件并配置 launchAutoHide: false。需要启用 autoUpdate 和 directUpdate。仅适用于 Android 和 iOS。 | `false` | 7.6.0 |
| **`autoSplashscreenLoader`** | `boolean` |当自动直接更新运行时，在初始屏幕顶部显示本机加载指示器。仅在启用 {@link autoSplashscreen} 时生效。需要安装 @capacitor/splash-screen 插件并配置 launchAutoHide: false。仅适用于 Android 和 iOS。 | `false` | 7.19.0 |
| **`autoSplashscreenTimeout`** | `number` |使用自动直接更新时，在指定的毫秒数后自动隐藏启动屏幕。如果超时，更新将继续在后台下载，同时闪屏将消失。设置为 `0`（零）以禁用超时。当超时触发时，将跳过直接更新流程，并在下一次后台/启动时安装下载的捆绑包。需要启用 {@link autoSplashscreen}。仅适用于 Android 和 iOS。 | `10000 // (10 seconds)` | 7.19.0 |
| **`periodCheckDelay`** | `number` |配置周期更新检查的延迟时间。单位为秒。仅适用于 Android 和 iOS。不能少于 600 秒（10 分钟）。 | `0 (disabled)` |  |
| **`localS3`** | `boolean` |配置 CLI 以使用本地服务器进行测试或自托管更新服务器。 | `undefined` | 4.17.48 |
| **`localHost`** | `string` |配置 CLI 以使用本地服务器进行测试或自托管更新服务器。 | `undefined` | 4.17.48 |
| **`localWebHost`** | `string` |配置 CLI 以使用本地服务器进行测试或自托管更新服务器。 | `undefined` | 4.17.48 |
| **`localSupa`** | `string` |配置 CLI 以使用本地服务器进行测试或自托管更新服务器。 | `undefined` | 4.17.48 |
| **`localSupaAnon`** | `string` |配置 CLI 以使用本地服务器进行测试。 | `undefined` | 4.17.48 |
| **`localApi`** | `string` |配置 CLI 以使用本地 api 进行测试。 | `undefined` | 6.3.3 |
| **`localApiFiles`** | `string` |配置 CLI 以使用本地文件 api 进行测试。 | `undefined` | 6.3.3 |
| **`allowModifyUrl`** | `boolean` |允许插件从 JavaScript 端动态修改 updateUrl、statsUrl 和 channelUrl。 | `false` | 5.4.0 |
| **`allowModifyAppId`** | `boolean` |允许插件从 JavaScript 端动态修改 appId。 | `false` | 7.14.0 |
| **`allowManualBundleError`** | `boolean` |使用手动更新流程时，允许将捆绑包标记为 JavaScript 出错。启用后，{@link CapacitorUpdaterPlugin.setBundleError} 可以将捆绑包状态更改为 `error`。 | `false` | 7.20.0 |
| **`persistCustomId`** | `boolean` |在应用重新启动时保留通过 {@link CapacitorUpdaterPlugin.setCustomId} 设置的 customId。仅适用于 Android 和 iOS。 | `false (will be true by default in a future major release v8.x.x)` | 7.17.3 | 7.17.3
| **`persistModifyUrl`** | `boolean` |在应用重新启动时保留通过 {@link CapacitorUpdaterPlugin.setUpdateUrl}、{@link CapacitorUpdaterPlugin.setStatsUrl} 和 {@link CapacitorUpdaterPlugin.setChannelUrl} 设置的 updateUrl、statsUrl 和 channelUrl。仅适用于 Android 和 iOS。 | `false` | 7.20.0 |
| **`allowSetDefaultChannel`** | `boolean` |允许或禁止 {@link CapacitorUpdaterPlugin.setChannel} 方法修改 defaultChannel。当设置为 `false` 时，调用 `setChannel()` 将返回代码为 `disabled_by_config` 的错误。 | `true` | 7.34.0 |
| **`defaultChannel`** | `string` |在配置中设置应用程序的默认频道。区分大小写。此设置将覆盖云中设置的默认通道，但仍会尊重在云中进行的覆盖。这要求通道允许设备在通道设置中自行解离/关联。 https://capgo.app/docs/public-api/channels/#channel-configuration-options | `undefined` | 5.5.0 |
| **`appId`** | `string` |在 config 中配置应用程序的应用程序 ID。 | `undefined` | 6.0.0 |
| **`keepUrlPathAfterReload`** | `boolean` |配置插件以在重新加载后保留 URL 路径。警告：触发重新加载时，“window.history”将被清除。 | `false` | 6.8.0 |
| **`disableJSLogging`** | `boolean` |禁用插件的 JavaScript 日志记录。如果为 true，则插件将不会登录到 JavaScript 控制台。只会完成本机日志| `false` | 7.3.0 |
| **`osLogging`** | `boolean` |启用操作系统级别的日志记录。启用后，日志将写入系统日志，可以在生产版本中进行检查。 - **iOS**：使用 os_log 而不是 Swift.print，可通过 Console.app 或 Instruments 访问日志 - **Android**：记录到 Logcat (android.util.Log) 当设置为 false 时，系统日志记录在两个平台上均被禁用（如果启用，则仅会发生 JavaScript 控制台日志记录）。时间这对于调试生产应用程序很有用（App Store/TestFlight 构建在 iOS 上，或在 Android 上构建生产 APK）。 | `true` | 8.42.0 |
| **`shakeMenu`** | `boolean` |启用摇动手势以显示更新菜单以进行调试/测试 | `false` | 7.5.0 |
| **`allowShakeChannelSelector`** | `boolean` |启用摇动手势可显示用于在更新频道之间切换的频道选择器菜单。当启用且 `shakeMenu` 为 true 时，摇动手势会显示通道选择器，而不是默认的调试菜单（返回主页/重新加载/关闭）。选择频道后，应用程序会自动检查更新和下载（如果有）。仅当通道在后端启用了 `allow_self_set` 时才有效。仅适用于 Android 和 iOS。 | `false` | 8.43.0 |</docgen-config>

## API 参考

<docgen-index>
<!--Auto-generated, do not edit by hand-->

- [`notifyAppReady`](#notifyappready)
- [`setUpdateUrl`](#setupdateurl)
- [`setStatsUrl`](#setstatsurl)
- [`setChannelUrl`](#setchannelurl)
- [`download`](#download)
- [`next`](#next)
- [`set`](#set)
- [`delete`](#delete)
- [`setBundleError`](#setbundleerror)
- [`list`](#list)
- [`reset`](#重置)
- [`current`](#当前)
- [`reload`](#reload)
- [`setMultiDelay`](#setmultidelay)
- [`cancelDelay`](#canceldelay)
- [`getLatest`](#getlatest)
- [`setChannel`](#setchannel)
- [`unsetChannel`](#unsetchannel)
- [`getChannel`](#getchannel)
- [`listChannels`](#listchannels)
- [`setCustomId`](#setcustomid)
- [`getBuiltinVersion`](#getbuiltinversion)
- [`getDeviceId`](#getdeviceid)
- [`getPluginVersion`](#getpluginversion)
- [`isAutoUpdateEnabled`](#isautoupdateenabled)
- [`removeAllListeners`](#removealllisteners)
- [`addListener('download')`](#addlistenerdownload-)
- [`addListener('noNeedUpdate')`](#addlistenernoneedupdate-)
- [`addListener('updateAvailable')`](#addlistenerupdateavailable-)
- [`addListener('downloadComplete')`](#addlistenerdownloadcomplete-)
- [`addListener('breakingAvailable')`](#addlistenerwritingavailable-)
- [`addListener('majorAvailable')`](#addlistenermajoravailable-)
- [`addListener('updateFailed')`](#addlistenerupdatefailed-)
- [`addListener('downloadFailed')`](#addlistenerdownloadfailed-)
- [`addListener('appReloaded')`](#addlistenerappreloaded-)
- [`addListener('appReady')`](#addlistenerappready-)
- [`addListener('channelPrivate')`](#addlistenerchannelprivate-)
- [`addListener('onFlexibleUpdateStateChange')`](#addlisteneronflexibleupdatestatechange-)
- [`isAutoUpdateAvailable`](#isautoupdateavailable)
- [`getNextBundle`](#getnextbundle)
- [`getFailedUpdate`](#getfailedupdate)
- [`setShakeMenu`](#setshakemenu)
- [`isShakeMenuEnabled`](#isshakemenuenabled)
- [`setShakeChannelSelector`](#setshakechannelselector)
- [`isShakeChannelSelectorEnabled`](#isshakechannelselectorenabled)
- [`getAppId`](#getappid)
- [`setAppId`](#setappid)
- [`getAppUpdateInfo`](#getappupdateinfo)
- [`openAppStore`](#openappstore)
- [`performImmediateUpdate`](#performimmediateupdate)
- [`startFlexibleUpdate`](#startflexibleupdate)
- [`completeFlexibleUpdate`](#completeflexibleupdate)

</docgen-index>

<docgen-api>
<!--Auto-generated, do not edit by hand-->

### 通知应用程序就绪

```typescript
notifyAppReady() => Promise<AppReadyResult>
```

通知native层JavaScript初始化成功。

**关键：您必须在每次应用程序启动时调用此方法，以防止自动回滚。**

这是一个简单的通知，用于确认您的捆绑包的 JavaScript 已加载并执行。
本机 Web 服务器成功提供了捆绑文件，并且您的 JS 运行时启动了。
这就是它检查的全部内容 - 没有更复杂的了。

**什么触发回滚：**
- 在超时（默认：10秒）内不调用此方法
- JavaScript 完全失败（包根本无法加载）

**什么不会触发回滚：**
- 初始化后运行时错误（API 失败、崩溃等）
- 网络请求失败
- 应用程序逻辑错误

**重要提示：在任何网络请求之前调用此函数。**
无需等待 API、数据加载或异步操作。一旦您的
JavaScript 包开始执行以确认包本身有效。最佳实践：
- 立即在您的应用程序入口点调用（main.js、应用程序组件挂载等）
- 不要将其放在网络调用或大量初始化之后
- 不要将其包装在带有条件的 try/catch 中
- 如果您需要更多时间，请调整 {@link PluginsConfig.CapacitorUpdater.appReadyTimeout}

**退货**

`Promise<AppReadyResult>` — 始终使用当前捆绑包信息成功解析。这个方法永远不会失败。


--------------------


### setUpdateUrl

```typescript
setUpdateUrl(options: UpdateUrl) => Promise<void>
```

在运行时动态设置应用程序的更新 URL。

这会覆盖 {@link PluginsConfig.CapacitorUpdater.updateUrl} 配置值。
需要将 {@link PluginsConfig.CapacitorUpdater.allowModifyUrl} 设置为 `true`。

使用 {@link PluginsConfig.CapacitorUpdater.persistModifyUrl} 在应用重新启动时保留此值。
否则，URL 将在下次应用程序启动时重置为配置值。

**参数**

|名称 |类型 |描述 |
| ---| ---| ---|
| `options` | `UpdateUrl` |包含用于检查更新的 URL。 |

**退货**

`Promise<void>` — 当 URL 成功更新时解析。

**自：** 5.4.0

**抛出：** {Error} 如果 `allowModifyUrl` 为 false 或操作失败。


--------------------


### setStatsUrl

```typescript
setStatsUrl(options: StatsUrl) => Promise<void>
```

在运行时动态设置应用程序的统计 URL。

这会覆盖 {@link PluginsConfig.CapacitorUpdater.statsUrl} 配置值。
需要将 {@link PluginsConfig.CapacitorUpdater.allowModifyUrl} 设置为 `true`。

传递一个空字符串以完全禁用统计信息收集。
使用 {@link PluginsConfig.CapacitorUpdater.persistModifyUrl} 在应用重新启动时保留此值。

**参数**

|名称 |类型 |描述 |
| ---| ---| ---|
| `options` | `StatsUrl` |包含用于发送统计信息的 URL，或要禁用的空字符串。 |

**退货**

`Promise<void>` — 当 URL 成功更新时解析。

**自：** 5.4.0

**抛出：** {Error} 如果 `allowModifyUrl` 为 false 或操作失败。


--------------------


### setChannelUrl

```typescript
setChannelUrl(options: ChannelUrl) => Promise<void>
```

在运行时动态设置应用程序的通道 URL。

这会覆盖 {@link PluginsConfig.CapacitorUpdater.channelUrl} 配置值。
需要将 {@link PluginsConfig.CapacitorUpdater.allowModifyUrl} 设置为 `true`。

使用 {@link PluginsConfig.CapacitorUpdater.persistModifyUrl} 在应用重新启动时保留此值。
否则，URL 将在下次应用程序启动时重置为配置值。

**参数**

|名称 |类型 |描述 |
| ---| ---| ---|
| `options` | `ChannelUrl` |包含用于通道操作的 URL。 |

**退货**

`Promise<void>` — 当 URL 成功更新时解析。

**自：** 5.4.0

**抛出：** {Error} 如果 `allowModifyUrl` 为 false 或操作失败。


--------------------


###下载

```typescript
download(options: DownloadOptions) => Promise<BundleInfo>
```

从提供的 URL 下载新包以供以后安装。

下载的捆绑包存储在本地但未激活。使用方法：
- 调用 {@link next} 将其设置为在下一个应用程序后台/重新启动时安装
- 调用 {@link set} 立即激活它（破坏当前的 JavaScript 上下文）URL 应指向包含以下任一内容的 zip 文件：
- 您的应用程序文件直接位于 zip 根目录中，或者
- 包含所有应用程序文件的单个文件夹

该捆绑包必须在根级别包含 `index.html` 文件。

对于加密捆绑包，请提供 `sessionKey` 和 `checksum` 参数。
对于多文件增量更新，请提供 `manifest` 数组。

**参数**

|名称 |类型 |描述 |
| ---| ---| ---|
| `options` | `DownloadOptions` |用于下载新捆绑包 zip 的 {@link DownloadOptions}。 |

**退货**

`Promise<BundleInfo>` — 下载的捆绑包的 {@link BundleInfo}。

**抛出：** {Error} 如果下载失败或捆绑包无效。

**示例**

```ts
const bundle = await CapacitorUpdater.download({
  url: `https://example.com/versions/${version}/dist.zip`,
  version: version
});
// Bundle is downloaded but not active yet
await CapacitorUpdater.next({ id: bundle.id }); // Will activate on next background
```


--------------------


### 下一个

```typescript
next(options: BundleId) => Promise<BundleInfo>
```

设置应用程序后台或重新启动时要激活的下一个捆绑包。

这是应用更新的推荐方法，因为它不会中断用户的当前会话。
该捆绑包将在以下情况下激活：
- 应用程序处于后台（用户切换离开），或者
- 该应用程序被终止并重新启动，或者
- 手动调用{@link reload}

与 {@link set} 不同，此方法不会立即销毁当前的 JavaScript 上下文。
您的应用程序将继续正常运行，直到发生上述事件之一。

在应用更新之前，使用 {@link setMultiDelay} 添加附加条件。

**参数**

|名称 |类型 |描述 |
| ---| ---| ---|
| `options` | `BundleId` |包含要设置为下一个的捆绑包的 ID。使用下载的捆绑包中的 {@link BundleInfo.id}。 |

**退货**

`Promise<BundleInfo>` — 指定捆绑包的 {@link BundleInfo}。

**抛出：** {Error} 当bundle文件夹内没有index.html文件或bundle不存在时。


--------------------


### 设置

```typescript
set(options: BundleId) => Promise<void>
```

设置当前捆绑包并立即重新加载应用程序。

**重要提示：这是一个终端操作，会破坏当前的 JavaScript 上下文。**

当你调用这个方法时：
- 整个 JavaScript 上下文立即被销毁
- 应用程序从包含不同文件的不同文件夹重新加载
- 此调用后不会执行任何代码
- 任何承诺都无法解决
- 不会触发任何回调
- 在此调用后注册的事件侦听器不可靠，可能永远不会触发

重新加载会自动发生 - 您无需执行任何其他操作。
如果您需要保留当前 URL 路径等状态，请使用 {@link PluginsConfig.CapacitorUpdater.keepUrlPathAfterReload} 配置选项。
对于其他状态保存需求，请在调用此方法之前保存数据（例如，保存到 localStorage）。

**不要**在调用 `set()` 之后尝试执行其他逻辑 - 它不会按预期工作。

**参数**

|名称 |类型 |描述 |
| ---| ---| ---|
| `options` | `BundleId` |包含要设置为当前的新捆绑包 ID 的 {@link BundleId} 对象。 |

**退货**

`Promise<void>` — 一个永远不会解决的承诺，因为 JavaScript 上下文已被破坏。

**抛出：** {Error} 当bundle文件夹中没有index.html文件时。


--------------------


###删除

```typescript
delete(options: BundleId) => Promise<void>
```从本地存储中删除捆绑包以释放磁盘空间。

您不能删除：
- 当前活动的捆绑包
- `builtin` 捆绑包（随应用程序附带的版本）
- 捆绑包设置为 `next` （首先使用不同的捆绑包调用 {@link next}）

使用 {@link list} 获取所有可用的捆绑包 ID。

**注意：** 捆绑包 ID 与版本名称不同。
使用 {@link BundleInfo} 中的 `id` 字段，而不是 `version` 字段。

**参数**

|名称 |类型 |描述 |
| ---| ---| ---|
| `options` | `BundleId` |包含要删除的捆绑包 ID 的 {@link BundleId} 对象。 |

**退货**

`Promise<void>` — 当捆绑包成功删除时解决。

**抛出：** {Error} 如果捆绑包当前正在使用或不存在。


--------------------


### 设置BundleError

```typescript
setBundleError(options: BundleId) => Promise<BundleInfo>
```

在手动更新模式下将捆绑包手动标记为失败/错误。

当您检测到捆绑包存在严重问题并想要阻止时，这非常有用
以免再次使用。捆绑包状态将更改为 `error` 并且插件
将来将避免使用此捆绑包。

**要求：**
- {@link PluginsConfig.CapacitorUpdater.allowManualBundleError} 必须设置为 `true`
- 仅适用于手动更新模式（禁用自动更新时）

常见用例：下载并测试捆绑包后，您发现它具有关键性
错误并希望将其标记为失败，这样就不会重试。

**参数**

|名称 |类型 |描述 |
| ---| ---| ---|
| `options` | `BundleId` |包含要标记为错误的包 ID 的 {@link BundleId} 对象。 |

**退货**

`Promise<BundleInfo>` — 更新后的 {@link BundleInfo}，状态设置为 `error`。

**自：** 7.20.0

**抛出：** {Error} 当捆绑包不存在或 `allowManualBundleError` 为 false 时。


--------------------


### 列表

```typescript
list(options?: ListOptions | undefined) => Promise<BundleListResult>
```

获取存储在您的应用程序中的所有本地下载的捆绑包。

这将返回所有已下载并在本地可用的捆绑包，包括：
- 当前活动的捆绑包
- `builtin` 捆绑包（随您的应用程序一起提供）
- 任何等待激活的已下载捆绑包
- 失败的捆绑包（状态为 `error`）

用它来：
- 通过计算捆绑包来检查可用磁盘空间
- 使用 {@link delete} 删除旧捆绑包
- 监控捆绑包下载状态

**参数**

|名称 |类型 |描述 |
| ---| ---| ---|
| `options` | `列表选项 |未定义` |用于自定义捆绑包列表输出的 {@link ListOptions}。 |

**退货**

`Promise<BundleListResult>` — 包含 {@link BundleInfo} 对象数组的 Promise。

**抛出：** {Error} 如果操作失败。


--------------------


###重置

```typescript
reset(options?: ResetOptions | undefined) => Promise<void>
```

将应用程序重置为已知良好的捆绑包。

此方法通过恢复到以下任一状态来帮助从有问题的更新中恢复：
- `builtin` 捆绑包（您的应用程序附带的原始版本为 App Store/Play Store）
- 最后成功加载的捆绑包（最近运行正常的捆绑包）**重要提示：这会触发应用程序立即重新加载，从而破坏当前的 JavaScript 上下文。**
有关此操作的影响的详细信息，请参阅{@link set}。

使用案例：
- 更新导致严重问题时的紧急恢复
- 测试回滚功能
- 为用户提供“恢复出厂设置”选项

**参数**

|名称 |类型 |描述 |
| ---| ---| ---|
| `options` | `重置选项|未定义` |  |

**退货**

`Promise<void>` — 可能永远无法解决的承诺，因为应用程序将重新加载。

**抛出：** {Error} 如果重置操作失败。


--------------------


### 当前

```typescript
current() => Promise<CurrentBundleResult>
```

获取有关当前活动捆绑包的信息。

返回：
- `bundle`：当前活动的捆绑包信息
- `native`：内置捆绑包的版本（来自 App/Play Store 的原始应用程序版本）

如果未应用任何更新，`bundle.id` 将是“内置”，指示该应用程序
正在运行本机应用程序附带的原始版本。

用它来：
- 向用户显示当前版本
- 检查更新当前是否处于活动状态
- 与可用更新进行比较
- 记录活动包以进行调试

**退货**

`Promise<CurrentBundleResult>` — 包含当前捆绑包和本机版本信息的承诺。

**抛出：** {Error} 如果操作失败。


--------------------


### 重新加载

```typescript
reload() => Promise<void>
```

手动重新加载应用程序以应用待处理的更新。

这会触发应用程序后台时自动发生的相同重新加载行为。
如果您已调用 {@link next} 来排队更新，则调用 `reload()` 将立即应用它。

**重要提示：这会立即破坏当前的 JavaScript 上下文。**
有关此操作的影响的详细信息，请参阅{@link set}。

常见用例：
- 下载后立即应用更新，而不是等待后台
- 更新准备就绪后向用户提供“立即重新启动”按钮
- 开发期间测试更新流程

如果没有待处理的更新（没有调用 {@link next}），这只会重新加载当前包。

**退货**

`Promise<void>` — 可能永远无法解决的承诺，因为应用程序将重新加载。

**抛出：** {Error} 如果重新加载操作失败。


--------------------


### 设置多重延迟

```typescript
setMultiDelay(options: MultiDelayConditions) => Promise<void>
```

配置应用挂起更新之前必须满足的条件。

调用 {@link next} 将更新排队后，使用此方法来控制何时应用它。
仅在满足所有指定条件后才会安装更新。

可用的条件类型：
- `background`：等待应用程序进入后台。可以选择指定持续时间（以毫秒为单位）。
- `kill`：等待应用程序被杀死并重新启动（**注意：**当前行为会在杀死时立即触发更新，而不是在下一个后台触发更新。这将在 v8 中修复。）
- `date`：等到特定日期/时间（ISO 8601 格式）
- `nativeVersion`：等待本机应用程序更新到特定版本条件值格式：
- `background`：以毫秒为单位的数字（例如，“300000”表示 5 分钟），或省略以表示立即
- `kill`：不需要值
- `date`：ISO 8601 日期字符串（例如 `"2025-12-31T23:59:59Z"`）
- `nativeVersion`：版本字符串（例如，`"2.0.0"`）

**参数**

|名称 |类型 |描述 |
| ---| ---| ---|
| `options` | `MultiDelayConditions` |包含 {@link MultiDelayConditions} 条件数组。 |

**退货**

`Promise<void>` — 在设置延迟条件时解析。

**自：** 4.3.0

**抛出：** {Error} 如果操作失败或条件无效。

**示例**

```ts
// Update after user kills app OR after 5 minutes in background
await CapacitorUpdater.setMultiDelay({
  delayConditions: [
    { kind: 'kill' },
    { kind: 'background', value: '300000' }
  ]
});
```

**示例**

```ts
// Update after a specific date
await CapacitorUpdater.setMultiDelay({
  delayConditions: [{ kind: 'date', value: '2025-12-31T23:59:59Z' }]
});
```

**示例**

```ts
// Default behavior: update on next background
await CapacitorUpdater.setMultiDelay({
  delayConditions: [{ kind: 'background' }]
});
```


--------------------


### 取消延迟

```typescript
cancelDelay() => Promise<void>
```

取消所有延迟条件并立即应用挂起的更新。

如果您使用 {@link setMultiDelay} 设置了延迟条件，此方法会清除它们
并触发待处理的更新应用于下一个应用程序后台或重新启动。

这在以下情况下很有用：
- 用户手动请求立即更新（例如，单击“立即更新”按钮）
- 您的应用程序检测到现在是更新的好时机（例如，用户完成了关键任务）
- 您想尽早覆盖基于时间的延迟

**退货**

`Promise<void>` — 当延迟条件被清除时解析。

**自：** 4.0.0

**抛出：** {Error} 如果操作失败。


--------------------


### 获取最新

```typescript
getLatest(options?: GetLatestOptions | undefined) => Promise<LatestVersion>
```

检查更新服务器以获取最新的可用捆绑版本。

这会查询您配置的更新 URL（或 Capgo 后端）以查看是否有更新的捆绑包
可供下载。它不会自动下载捆绑包。

响应内容包括：
- `version`：最新可用版本标识符
- `url`：捆绑包的下载 URL（如果可用）
- `breaking`：此更新是否被标记为不兼容（需要本机应用程序更新）
- `message`：来自服务器的可选消息
- `manifest`：增量更新的文件列表（如果使用多文件下载）

收到最新版本信息后，您可以：
1. 与您当前的版本进行比较
2.使用{@link download}下载
3.使用{@link next}或{@link set}应用它

**重要提示：“无新版本可用”的错误处理**

当设备的当前版本与服务器上的最新版本匹配时（即设备已经是
最新），服务器返回 200 响应，其中包含 `error: "no_new_version_available"` 和
`message: "No new version available"`。 **这会导致 `getLatest()` 抛出错误**，即使
这是正常的、预期的情况。

您应该捕获此特定错误以优雅地处理它：

```typescript
try {
  const latest = await CapacitorUpdater.getLatest();
  // New version is available, proceed with download
} catch (error) {
  if (error.message === 'No new version available') {
    // Device is already on the latest version - this is normal
    console.log('Already up to date');
  } else {
    // Actual error occurred
    console.error('Failed to check for updates:', error);
  }
}
```

在这种情况下，服务器：
- 记录请求并显示“没有可用的新版本”消息
- 发送“noNew”统计操作来跟踪设备检查更新但已经是最新的（在后端完成）

**参数**

|名称 |类型 |描述 |
| ---| ---| ---|
| `options` | `获取最新选项|未定义` |可选的 {@link GetLatestOptions} 用于指定要检查的频道。 |

**退货**

`Promise<LatestVersion>` — 有关最新可用捆绑版本的信息。

**自：** 4.0.0**抛出：** {Error} 当没有可用的新版本 (`error: "no_new_version_available"`) 或请求失败时始终抛出。


--------------------


### 设置频道

```typescript
setChannel(options: SetChannelOptions) => Promise<ChannelRes>
```

在运行时将此设备分配给特定的更新通道。

渠道允许您将不同的捆绑版本分发给不同的用户组
（例如，“生产”、“测试版”、“分期”）。此方法将设备切换到新通道。

**要求：**
- 目标渠道必须允许自我分配（在 Capgo 仪表板或后端中配置）
- 后端可以根据通道设置接受或拒绝请求

**何时使用：**
- 应用程序准备就绪并且用户进行交互后（例如，选择加入测试版计划）
- 实现应用内渠道切换（测试版切换、测试人员访问等）
- 对于用户驱动的频道变更

**何时不使用：**
- 在应用程序启动/初始化时 - 使用 {@link PluginsConfig.CapacitorUpdater.defaultChannel} 配置代替
- 用户交互之前

**重要提示：监听 `channelPrivate` 事件**

当用户尝试设置不允许设备自分配的通道时，该方法将
抛出错误并触发 {@link addListener}('channelPrivate') 事件。你应该听听这个事件
向用户提供适当的反馈：

```typescript
CapacitorUpdater.addListener('channelPrivate', (data) => {
  console.warn(`Cannot access channel "${data.channel}": ${data.message}`);
  // Show user-friendly message
});
```

这会向 Capgo 后端发送一个请求，将您的设备 ID 链接到指定通道。

**参数**

|名称 |类型 |描述 |
| ---| ---| ---|
| `options` | `SetChannelOptions` | {@link SetChannelOptions} 包含频道名称和可选的自动更新触发器。 |

**退货**

`Promise<ChannelRes>` — 带有状态和可选错误/消息的通道操作结果。

**自：** 4.7.0

**抛出：** {Error} 如果通道不存在或不允许自分配。


--------------------


### 取消设置频道

```typescript
unsetChannel(options: UnsetChannelOptions) => Promise<void>
```

删除设备的通道分配并返回到默认通道。

这会取消设备与任何特定分配通道的链接，导致其回退到：
- {@link PluginsConfig.CapacitorUpdater.defaultChannel}（如果已配置），或者
- 此应用程序的后端默认频道

在以下情况下使用此功能：
- 用户选择退出测试/测试计划
- 您想要将设备重置为标准更新分发
- 测试通道切换行为

**参数**

|名称 |类型 |描述 |
| ---| ---| ---|
| `options` | `UnsetChannelOptions` |  |

**退货**

`Promise<void>` — 当通道成功取消设置时解决。

**自：** 4.7.0

**抛出：** {Error} 如果操作失败。


--------------------


### 获取频道

```typescript
getChannel() => Promise<GetChannelRes>
```

获取分配给该设备的当前通道。

返回有关以下内容的信息：
- `channel`：当前分配的通道名称（如果有）
- `allowSet`：通道是否允许自分配
- `status`：运行状态
- `error`/`message`：附加信息（如果适用）

用它来：
- 向用户显示当前频道（例如，“您在 Beta 频道”）
- 在显示功能之前检查设备是否位于特定频道
- 调用 {@link setChannel} 后验证通道分配

**退货**`Promise<GetChannelRes>` — 当前通道信息。

**自：** 4.8.0

**抛出：** {Error} 如果操作失败。


--------------------


### 列表频道

```typescript
listChannels() => Promise<ListChannelsResult>
```

获取可供该设备自行分配的所有可用频道的列表。

仅返回 `allow_self_set` 为 `true` 的通道。这些渠道
用户可以切换到使用{@link setChannel}，无需后端管理员干预。

每个频道包括：
- `id`：唯一通道标识符
- `name`：人类可读的通道名称
- `public`：频道是否公开可见
- `allow_self_set`：结果中始终为 `true`（过滤到仅可自分配的通道）

用它来：
- 为用户构建频道选择器 UI（例如“加入 Beta”按钮）
- 显示可用的测试/预览通道
- 实现频道发现功能

**退货**

`Promise<ListChannelsResult>` — 设备可以自行分配的通道列表。

**自：** 7.5.0

**抛出：** {Error} 如果操作失败或者对后端的请求失败。


--------------------


### 设置自定义ID

```typescript
setCustomId(options: SetCustomIdOptions) => Promise<void>
```

为此设备设置自定义标识符。

这允许您通过自己的自定义 ID（用户 ID、帐户 ID 等）来识别设备
代替或补充设备的唯一硬件 ID。自定义 ID 已发送
到您的更新服务器，可用于：
- 针对特定用户进行更新
- 分析和用户跟踪
- 调试和支持（将设备与用户关联起来）
- A/B 测试或功能标记

**坚持：**
- 当 {@link PluginsConfig.CapacitorUpdater.persistCustomId} 为 `true` 时，ID 在应用程序重新启动后仍然存在
- 当`false`时，仅保留当前会话的ID

**清除自定义ID：**
- 传递一个空字符串 `""` 以删除任何存储的自定义 ID

**参数**

|名称 |类型 |描述 |
| ---| ---| ---|
| `options` | `SetCustomIdOptions` |包含自定义标识符字符串的 {@link SetCustomIdOptions}。 |

**退货**

`Promise<void>` — 立即解析（同步操作）。

**自：** 4.9.0

**抛出：** {Error} 如果操作失败。


--------------------


### 获取内置版本

```typescript
getBuiltinVersion() => Promise<BuiltinVersion>
```

获取内置捆绑版本（随本机应用程序附带的原始版本）。

这将返回安装应用程序时包含的捆绑包的版本
来自 App Store 或 Play Store。这不是当前有效的捆绑版本 -
使用 {@link current} 来实现。

返回：
- {@link PluginsConfig.CapacitorUpdater.version} 配置值（如果已设置），或者
- 平台配置中的本机应用程序版本（package.json、Info.plist、build.gradle）

用它来：
- 向用户显示“工厂”版本
- 与下载的捆绑版本进行比较
- 确定是否已应用任何更新
- 调试版本不匹配

**退货**

`Promise<BuiltinVersion>` — 内置捆绑包版本字符串。

**自：** 5.2.0


--------------------


### 获取设备ID

```typescript
getDeviceId() => Promise<DeviceId>
```

获取该设备唯一的、保护隐私的标识符。

该 ID 用于在与更新服务器通信时识别设备。
它由插件自动生成并安全存储。**隐私和安全特征：**
- 生成为 UUID（不基于硬件标识符）
- 安全地存储在特定于平台的安全存储中
- Android：Android 密钥库（在 API 23+ 上重新安装应用程序时仍然存在）
- iOS：带 `kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly` 的钥匙扣
- 未同步到云 (iOS)
- 遵循 Apple 和 Google 隐私最佳实践
- 用户可以通过系统设置（Android）或钥匙串访问（iOS）清除它

**坚持：**
设备 ID 在应用程序重新安装后仍然存在，以保持一致的设备标识
用于更新跟踪和分析。

用它来：
- 调试更新交付问题（检查服务器看到的 ID）
- 实施特定于设备的功能
- 将服务器日志与特定设备关联起来

**退货**

`Promise<DeviceId>` — 唯一的设备标识符字符串。

**抛出：** {Error} 如果操作失败。


--------------------


### 获取插件版本

```typescript
getPluginVersion() => Promise<PluginVersion>
```

获取应用程序中安装的 Capacitor 更新程序插件的版本。

这将返回发送的本机插件代码 (Android/iOS) 的版本
每个请求都发送到更新服务器。这不是您的应用程序版本或捆绑版本。

用它来：
- 调试特定于插件的问题（报告错误时）
- 验证插件安装和版本
- 检查与后端功能的兼容性
- 在调试/关于屏幕中显示

**退货**

`Promise<PluginVersion>` — Capacitor 更新程序插件版本字符串。

**抛出：** {Error} 如果操作失败。


--------------------


### 已启用自动更新

```typescript
isAutoUpdateEnabled() => Promise<AutoUpdateEnabled>
```

检查当前是否启用了自动更新。

如果启用了 {@link PluginsConfig.CapacitorUpdater.autoUpdate}，则返回 `true`，
这意味着该插件将自动检查、下载并应用更新。

如果处于手动模式，则返回 `false`，您可以使用以下命令控制更新流程
{@link getLatest}、{@link download}、{@link next} 和 {@link set}。

用它来：
- 确定您的应用程序正在使用哪个更新流程
- 根据模式显示/隐藏手动更新 UI
- 调试更新行为

**退货**

`Promise<AutoUpdateEnabled>` — `true` 如果启用自动更新，则 `false` 如果处于手动模式。

**抛出：** {Error} 如果操作失败。


--------------------


### 删除所有监听器

```typescript
removeAllListeners() => Promise<void>
```

删除为此插件注册的所有事件侦听器。

这会注销通过 {@link addListener} 添加的所有事件类型的所有侦听器：
- `download`
- `noNeedUpdate`
- `updateAvailable`
- `downloadComplete`
- `downloadFailed`
- `breakingAvailable` / `majorAvailable`
- `updateFailed`
- `appReloaded`
- `appReady`

在清理过程中使用它（例如，卸载组件或关闭屏幕时）
以防止延迟事件侦听器造成内存泄漏。

**退货**

`Promise<void>` — 当所有侦听器被删除时解决。

**自：** 1.0.0


--------------------


### addListener('下载')

```typescript
addListener(eventName: 'download', listenerFunc: (state: DownloadEvent) => void) => Promise<PluginListenerHandle>
```

监听应用程序中的捆绑包下载事件。下载开始、下载过程中和完成后触发。
这将返回下载期间的所有下载百分比

**参数**|名称 |类型 |描述 |
| ---| ---| ---|
| `eventName` | `'下载'` |  |
| `listenerFunc` | `(state: DownloadEvent) => void` |  |

**退货**

`Promise<PluginListenerHandle>`

**自：** 2.0.11


--------------------


### addListener('noNeedUpdate')

```typescript
addListener(eventName: 'noNeedUpdate', listenerFunc: (state: NoNeedEvent) => void) => Promise<PluginListenerHandle>
```

监听无需更新的事件，当您希望每次启动应用程序时强制检查时很有用

**参数**

|名称 |类型 |描述 |
| ---| ---| ---|
| `eventName` | `'不需要更新'` |  |
| `listenerFunc` | `(state: NoNeedEvent) => void` |  |

**退货**

`Promise<PluginListenerHandle>`

**自：** 4.0.0


--------------------


### addListener('updateAvailable')

```typescript
addListener(eventName: 'updateAvailable', listenerFunc: (state: UpdateAvailableEvent) => void) => Promise<PluginListenerHandle>
```

监听可用的更新事件，当您想在每次启动应用程序时强制检查时很有用

**参数**

|名称 |类型 |描述 |
| ---| ---| ---|
| `eventName` | `'更新可用'` |  |
| `listenerFunc` | `(state: UpdateAvailableEvent) => void` |  |

**退货**

`Promise<PluginListenerHandle>`

**自：** 4.0.0


--------------------


### addListener('下载完成')

```typescript
addListener(eventName: 'downloadComplete', listenerFunc: (state: DownloadCompleteEvent) => void) => Promise<PluginListenerHandle>
```

监听 downloadComplete 事件。

**参数**

|名称 |类型 |描述 |
| ---| ---| ---|
| `eventName` | `'下载完成'` |  |
| `listenerFunc` | `(state: DownloadCompleteEvent) => void` |  |

**退货**

`Promise<PluginListenerHandle>`

**自：** 4.0.0


--------------------


### addListener('breakAvailable')

```typescript
addListener(eventName: 'breakingAvailable', listenerFunc: (state: BreakingAvailableEvent) => void) => Promise<PluginListenerHandle>
```

当后端将更新标记为与当前应用程序不兼容时，侦听中断更新事件。
发出与旧版 `majorAvailable` 侦听器相同的负载。

**参数**

|名称 |类型 |描述 |
| ---| ---| ---|
| `eventName` | `'打破可用'` |  |
| `listenerFunc` | `(state: MajorAvailableEvent) => void` |  |

**退货**

`Promise<PluginListenerHandle>`

**自：** 7.22.0


--------------------


### addListener('majorAvailable')

```typescript
addListener(eventName: 'majorAvailable', listenerFunc: (state: MajorAvailableEvent) => void) => Promise<PluginListenerHandle>
```

监听应用程序中的主要更新事件，通过设置disableAutoUpdateBreaking让您知道何时阻止主要更新

**参数**

|名称 |类型 |描述 |
| ---| ---| ---|
| `eventName` | `'主要可用'` |  |
| `listenerFunc` | `(state: MajorAvailableEvent) => void` |  |

**退货**

`Promise<PluginListenerHandle>`

**自：** 2.3.0


--------------------


### addListener('更新失败')

```typescript
addListener(eventName: 'updateFailed', listenerFunc: (state: UpdateFailedEvent) => void) => Promise<PluginListenerHandle>
```

监听应用程序中的更新失败事件，让您知道下次应用程序启动时更新安装失败

**参数**

|名称 |类型 |描述 |
| ---| ---| ---|
| `eventName` | `'更新失败'` |  |
| `listenerFunc` | `(state: UpdateFailedEvent) => void` |  |

**退货**

`Promise<PluginListenerHandle>`

**自：** 2.3.0


--------------------


### addListener('下载失败')

```typescript
addListener(eventName: 'downloadFailed', listenerFunc: (state: DownloadFailedEvent) => void) => Promise<PluginListenerHandle>
```

监听应用程序中的下载失败事件，让您知道捆绑包下载失败

**参数**

|名称 |类型 |描述 |
| ---| ---| ---|
| `eventName` | `'下载失败'` |  |
| `listenerFunc` | `(state: DownloadFailedEvent) => void` |  |

**退货**

`Promise<PluginListenerHandle>`

**自：** 4.0.0


--------------------


### addListener('appReloaded')

```typescript
addListener(eventName: 'appReloaded', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

监听应用程序中的重新加载事件，让您知道何时发生重新加载

**参数**

|名称 |类型 |描述 |
| ---| ---| ---|
| `eventName` | `'应用程序重新加载'` |  |
| `listenerFunc` | `() => void` |  |

**退货**`Promise<PluginListenerHandle>`

**自：** 4.3.0


--------------------


### addListener('appReady')

```typescript
addListener(eventName: 'appReady', listenerFunc: (state: AppReadyEvent) => void) => Promise<PluginListenerHandle>
```

在应用程序中监听应用程序就绪事件，让您知道应用程序何时可以使用，该事件将保留直至消耗。

**参数**

|名称 |类型 |描述 |
| ---| ---| ---|
| `eventName` | `'应用程序就绪'` |  |
| `listenerFunc` | `(state: AppReadyEvent) => void` |  |

**退货**

`Promise<PluginListenerHandle>`

**自：** 5.1.0


--------------------


### addListener('channelPrivate')

```typescript
addListener(eventName: 'channelPrivate', listenerFunc: (state: ChannelPrivateEvent) => void) => Promise<PluginListenerHandle>
```

监听通道私有事件，在尝试设置不允许设备自分配的通道时触发。

此事件适用于：
- 通知用户他们无权切换到特定频道
- 针对通道限制实施自定义错误处理
- 记录未经授权的通道访问尝试

**参数**

|名称 |类型 |描述 |
| ---| ---| ---|
| `eventName` | `'频道私人'` |  |
| `listenerFunc` | `(state: ChannelPrivateEvent) => void` |  |

**退货**

`Promise<PluginListenerHandle>`

**自：** 7.34.0


--------------------


### addListener('onFlexibleUpdateStateChange')

```typescript
addListener(eventName: 'onFlexibleUpdateStateChange', listenerFunc: (state: FlexibleUpdateState) => void) => Promise<PluginListenerHandle>
```

侦听 Android 上灵活的更新状态更改。

此事件在灵活更新下载过程中触发，提供：
- 下载进度（下载字节数/总字节数）
- 安装状态更改

**安装状态值：**
- `UNKNOWN` (0)：未知状态
- `PENDING` (1)：下载待处理
- `DOWNLOADING` (2)：下载正在进行中
- `INSTALLING` (3)：安装更新
- `INSTALLED` (4)：已安装更新（需要重新启动应用程序）
- `FAILED` (5): 更新失败
- `CANCELED` (6): 更新被取消
- `DOWNLOADED` (11)：下载完成，准备安装

当状态为 `DOWNLOADED` 时，您应该提示用户并调用
{@link CompleteFlexibleUpdate} 完成安装。

**参数**

|名称 |类型 |描述 |
| ---| ---| ---|
| `eventName` | `'onFlexibleUpdateStateChange'` |  |
| `listenerFunc` | `(state: FlexibleUpdateState) => void` |  |

**退货**

`Promise<PluginListenerHandle>`

**自：** 8.0.0


--------------------


### isAutoUpdateAvailable

```typescript
isAutoUpdateAvailable() => Promise<AutoUpdateAvailable>
```

检查自动更新功能是否可用（自定义服务器配置未禁用）。

配置自定义 `updateUrl` 时返回 `false`，这通常表示
您使用的自托管更新服务器可能不支持所有自动更新功能。

当使用默认的 Capgo 后端或该功能可用时，返回 `true` 。

这与 {@link isAutoUpdateEnabled} 不同：
- `isAutoUpdateEnabled()`：检查自动更新模式是否打开/关闭
- `isAutoUpdateAvailable()`：检查当前配置是否支持自动更新

**退货**

`Promise<AutoUpdateAvailable>` — 设置自定义 updateUrl 时为 `false`，否则为 `true`。

**抛出：** {Error} 如果操作失败。


--------------------


### 获取下一个包

```typescript
getNextBundle() => Promise<BundleInfo | null>
```

获取有关在下次重新加载时排队激活的捆绑包的信息。

返回：
- {@link BundleInfo} 对象（如果捆绑包已通过 {@link next} 排队）
- `null` 如果没有待更新的更新这对于：
- 检查是否有更新正在等待应用
- 向用户显示“更新待处理”状态
- 显示排队更新的版本信息
- 决定是否显示“重启更新”提示

排队的捆绑包将在以下情况下被激活：
- 应用程序处于后台（默认行为）
- 应用程序被终止并重新启动
- 手动调用{@link reload}
- 满足{@link setMultiDelay}设置的延迟条件

**退货**

`Promise<BundleInfo | null>` — 待处理的捆绑包信息，如果没有排队，则为 `null`。

**自：** 6.8.0

**抛出：** {Error} 如果操作失败。


--------------------


### 获取更新失败

```typescript
getFailedUpdate() => Promise<UpdateFailedEvent | null>
```

检索有关无法加载的最新捆绑包的信息。

当捆绑包无法加载时（例如，JavaScript 错误阻止初始化、丢失文件），
该插件会自动回滚并存储有关失败的信息。这个方法
检索该失败信息。

**重要：存储的值在检索一次后将被清除。**
多次调用该方法只会返回第一次调用时的失败信息，
然后在后续调用中使用 `null` ，直到发生另一次失败。

返回：
- {@link UpdateFailedEvent} 如果记录了失败，则包含捆绑信息
- `null` 如果没有发生故障或者已经检索到

用它来：
- 向用户显示更新失败的原因
- 记录失败信息以供调试
- 实施自定义错误处理/报告
- 显示回滚通知

**退货**

`Promise<UpdateFailedEvent | null>` — 失败的更新信息（首次检索后清除），或 `null`。

**自：** 7.22.0

**抛出：** {Error} 如果操作失败。


--------------------


### 设置摇动菜单

```typescript
setShakeMenu(options: SetShakeMenuOptions) => Promise<void>
```

启用或禁用摇动手势菜单以进行调试和测试。

启用后，用户可以摇动设备来打开调试菜单，其中显示：
- 当前捆绑包信息
- 可用捆绑包
- 手动切换捆绑包的选项
- 更新状态

这在开发和测试过程中非常有用：
- 快速测试不同的捆绑版本
- 调试更新流程
- 在生产和测试包之间切换
- 验证捆绑安装

**重要提示：** 在生产版本中禁用此功能或仅对内部测试人员启用。

也可以通过 {@link PluginsConfig.CapacitorUpdater.shakeMenu} 进行配置。

**参数**

|名称 |类型 |描述 |
| ---| ---| ---|
| `options` | `SetShakeMenuOptions` |  |

**退货**

`Promise<void>` — 应用设置时解析。

**自：** 7.5.0

**抛出：** {Error} 如果操作失败。


--------------------


### isShakeMenuEnabled

```typescript
isShakeMenuEnabled() => Promise<ShakeMenuEnabled>
```

检查当前是否启用了摇动手势调试菜单。

返回摇动菜单功能的当前状态，可以通过以下方式切换
{@link setShakeMenu} 或通过 {@link PluginsConfig.CapacitorUpdater.shakeMenu} 配置。

用它来：
- 检查调试功能是否启用
- 显示/隐藏调试设置用户界面
- 测试期间验证配置

**退货**

`Promise<ShakeMenuEnabled>` — 具有 `enabled: true` 或 `enabled: false` 的对象。

**自：** 7.5.0

**抛出：** {Error} 如果操作失败。


--------------------


### setShakeChannelSelector

```typescript
setShakeChannelSelector(options: SetShakeChannelSelectorOptions) => Promise<void>
```在运行时启用或禁用抖动通道选择器。

当启用且 shakeMenu 为 true 时，摇动设备会显示频道
选择器而不是调试菜单。这允许用户在之间切换
通过摇动设备来更新频道。

选择频道后，应用程序会自动检查更新
并下载（如果有）。

也可以通过 {@link PluginsConfig.CapacitorUpdater.allowShakeChannelSelector} 进行配置。

**参数**

|名称 |类型 |描述 |
| ---| ---| ---|
| `options` | `SetShakeChannelSelectorOptions` |  |

**退货**

`Promise<void>` — 应用设置时解析。

**自：** 8.43.0

**抛出：** {Error} 如果操作失败。


--------------------


### isShakeChannelSelectorEnabled

```typescript
isShakeChannelSelectorEnabled() => Promise<ShakeChannelSelectorEnabled>
```

检查震动通道选择器当前是否已启用。

返回摇动通道选择器功能的当前状态，可以通过以下方式切换
{@link setShakeChannelSelector} 或通过 {@link PluginsConfig.CapacitorUpdater.allowShakeChannelSelector} 配置。

**退货**

`Promise<ShakeChannelSelectorEnabled>` — 具有 `enabled: true` 或 `enabled: false` 的对象。

**自：** 8.43.0

**抛出：** {Error} 如果操作失败。


--------------------


### 获取应用程序 ID

```typescript
getAppId() => Promise<GetAppIdRes>
```

获取当前配置的用于更新服务器通信的App ID。

将标识此应用程序的应用程序 ID 返回到更新服务器。这可以是：
- 通过 {@link setAppId} 设置的值，或者
- {@link PluginsConfig.CapacitorUpdater.appId} 配置值，或者
- 本机应用程序配置中的默认应用程序标识符

用它来：
- 验证哪个应用程序 ID 用于更新
- 调试更新交付问题
- 在调试屏幕中显示应用程序配置
- 调用{@link setAppId}后确认应用程序ID

**退货**

`Promise<GetAppIdRes>` — 包含当前 `appId` 字符串的对象。

**自：** 7.14.0

**抛出：** {Error} 如果操作失败。


--------------------


### 设置应用程序ID

```typescript
setAppId(options: SetAppIdOptions) => Promise<void>
```

动态更改用于更新服务器通信的应用程序 ID。

这会覆盖用于向更新服务器标识您的应用程序的应用程序 ID，从而允许您
在运行时在不同的应用程序配置之间切换（例如，生产与登台）
应用程序 ID 或多租户配置）。

**要求：**
- {@link PluginsConfig.CapacitorUpdater.allowModifyAppId} 必须设置为 `true`

**重要考虑因素：**
- 更改应用程序 ID 将影响该设备接收的更新
- 新的App ID必须存在于您的更新服务器上
- 这主要用于高级用例（多租户、环境切换）
- 大多数应用程序应使用基于配置的 {@link PluginsConfig.CapacitorUpdater.appId}

**参数**

|名称 |类型 |描述 |
| ---| ---| ---|
| `options` | `SetAppIdOptions` |  |

**退货**

`Promise<void>` — 当应用程序 ID 成功更改时解决。

**自：** 7.14.0

**抛出：** {Error} 如果 `allowModifyAppId` 为 false 或操作失败。


--------------------


### 获取应用程序更新信息

```typescript
getAppUpdateInfo(options?: GetAppUpdateInfoOptions | undefined) => Promise<AppUpdateInfo>
```

在 App Store 或 Play Store 中获取有关应用程序可用性的信息。此方法检查本机应用程序商店以查看是否有较新版本的应用程序
可供下载。这与 Capgo 的 OTA 更新不同 - 这
检查需要通过应用程序商店的本机应用程序更新。

**平台差异：**
- **Android**：使用 Play Store 的应用内更新 API 获取准确的更新信息
- **iOS**：查询 App Store 查找 API （需要国家/地区代码才能获得准确结果）

**返回有关以下内容的信息：**
- 当前安装的版本
- 商店中可用的版本（如果有）
- 是否有更新可用
- 更新优先级（仅Android）
- 是否允许立即/灵活更新（仅Android）

用它来：
- 检查用户是否需要从应用商店更新
- 显示本机更新的“可用更新”提示
- 实施版本控制（需要最低本机版本）
- 结合Capgo OTA更新，形成完整的更新策略

**参数**

|名称 |类型 |描述 |
| ---| ---| ---|
| `options` | `GetAppUpdateInfoOptions |未定义` |可选的 {@link GetAppUpdateInfoOptions}，其国家/地区代码为 iOS。 |

**退货**

`Promise<AppUpdateInfo>` — 有关当前和可用应用程序版本的信息。

**自：** 8.0.0

**抛出：** {Error} 如果操作失败或存储信息不可用。


--------------------


### 打开应用商店

```typescript
openAppStore(options?: OpenAppStoreOptions | undefined) => Promise<void>
```

在 App Store 或 Play Store 中打开应用程序的页面。

这会将用户导航到您应用的商品详情，他们可以在其中手动
更新应用程序。当应用内更新不可用时，将此用作后备
或者当用户需要在 iOS 上更新时。

**平台行为：**
- **Android**：打开 Play Store 到应用程序页面
- **iOS**：打开 App Store 到应用程序页面

**定制选项：**
- `appId`：指定自定义 App Store ID (iOS) - 用于打开不同应用程序的页面
- `packageName`：指定自定义包名称 (Android) - 用于打开不同应用程序的页面

**参数**

|名称 |类型 |描述 |
| ---| ---| ---|
| `options` | `打开AppStore选项|未定义` |可选的 {@link OpenAppStoreOptions} 用于自定义要打开的应用程序的商店页面。 |

**退货**

`Promise<void>` — 商店开业时解决。

**自：** 8.0.0

**抛出：** {Error} 如果无法打开商店。


--------------------


### 执行立即更新

```typescript
performImmediateUpdate() => Promise<AppUpdateResult>
```

在 Android 上立即执行应用内更新。

这会触发 Google Play 的立即更新流程，其中：
1. 显示全屏更新UI
2.下载并安装更新
3.自动重启应用程序

在更新完成之前，用户无法继续使用该应用程序。
这对于必须立即安装的关键更新来说是理想的选择。

**要求：**
- 仅 Android（在 iOS 上引发错误）
- 必须有可用更新（首先检查 {@link getAppUpdateInfo}）
- 更新必须允许立即更新 (`immediateUpdateAllowed: true`)**用户体验：**
- 全屏屏蔽UI
- 下载过程中显示进度
- 应用程序安装后自动重新启动

**退货**

`Promise<AppUpdateResult>` — 指示成功、取消或失败的结果。

**自：** 8.0.0

**抛出：** {Error} 如果不在 Android 上，则没有可用更新，或者不允许立即更新。


--------------------


### 开始灵活更新

```typescript
startFlexibleUpdate() => Promise<AppUpdateResult>
```

在 Android 上启动灵活的应用内更新。

这会触发 Google Play 的灵活更新流程，其中：
1.后台下载更新
2. 允许用户继续使用该应用程序
3.下载完成时通知
4.需要调用{@linkcompleteFlexibleUpdate}来安装

使用 `onFlexibleUpdateStateChange` 侦听器监视下载进度。

**要求：**
- 仅 Android（在 iOS 上引发错误）
- 必须有可用更新（首先检查 {@link getAppUpdateInfo}）
- 更新必须允许灵活更新 (`flexibleUpdateAllowed: true`)

**典型流量：**
1. 调用`startFlexibleUpdate()`开始下载
2. 听`onFlexibleUpdateStateChange`了解进度
3.当状态为`DOWNLOADED`时，提示用户重启
4.调用`completeFlexibleUpdate()`安装并重启

**退货**

`Promise<AppUpdateResult>` — 指示更新已开始、取消或失败的结果。

**自：** 8.0.0

**抛出：** {Error} 如果不在 Android 上，则没有可用的更新，或者不允许灵活更新。


--------------------


### 完整灵活更新

```typescript
completeFlexibleUpdate() => Promise<void>
```

在 Android 上完成灵活的应用内更新。

下载灵活更新后（状态 `DOWNLOADED`
`onFlexibleUpdateStateChange`)，调用此方法安装更新
并重新启动应用程序。

**重要提示：** 这将立即重新启动应用程序。确保：
- 调用前保存所有用户数据
- 重新启动前提示用户
- 仅当下载状态为 `DOWNLOADED` 时调用

**退货**

`Promise<void>` — 更新安装开始时解决（应用程序将重新启动）。

**自：** 8.0.0

**抛出：** {Error} 如果不在 Android 上或没有待下载的更新。


--------------------


</docgen-api>
