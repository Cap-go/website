---
title: 기능 및 설정
description: 플러그인의 모든 사용 가능한 메서드와 구성
sidebar:
  order: 2
locale: ko
---

# 업데이터 플러그인 설정

자세한 내용은 Github [Readme](https://github.com/Cap-go/capacitor-updater)를 참조하세요

<docgen-config>

CapacitorUpdater는 다음 옵션으로 구성할 수 있습니다:

| 속성                         | 타입                 | 설명                                                                                                                                                                                     | 기본값                                            | 버전    |
| ---------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ------- |
| **`appReadyTimeout`**        | <code>number</code>  | 네이티브 플러그인이 업데이트를 '실패'로 간주하기 전에 대기할 밀리초 수를 설정합니다. Android와 iOS에서만 사용 가능                                                                    | <code>10000 // (10초)</code>                      |         |
| **`responseTimeout`**        | <code>number</code>  | 네이티브 플러그인이 API 타임아웃으로 간주하기 전에 대기할 밀리초 수를 설정합니다. Android와 iOS에서만 사용 가능                                                                       | <code>20 // (20초)</code>                         |         |
| **`autoDeleteFailed`**       | <code>boolean</code> | 플러그인이 실패한 번들을 자동으로 삭제할지 여부를 설정합니다. Android와 iOS에서만 사용 가능                                                                                           | <code>true</code>                                  |         |
| **`autoDeletePrevious`**     | <code>boolean</code> | 성공적인 업데이트 후 플러그인이 이전 번들을 자동으로 삭제할지 여부를 설정합니다. Android와 iOS에서만 사용 가능                                                                        | <code>true</code>                                  |         |
| **`autoUpdate`**             | <code>boolean</code> | 플러그인이 업데이트 서버를 통한 자동 업데이트를 사용할지 여부를 설정합니다. Android와 iOS에서만 사용 가능                                                                             | <code>true</code>                                  |         |
| **`resetWhenUpdate`**        | <code>boolean</code> | 새로운 네이티브 앱 번들이 기기에 설치될 때 이전에 다운로드한 번들을 자동으로 삭제합니다. Android와 iOS에서만 사용 가능                                                               | <code>true</code>                                  |         |
| **`updateUrl`**              | <code>string</code>  | 업데이트 확인이 전송되는 URL/엔드포인트를 설정합니다. Android와 iOS에서만 사용 가능                                                                                                    | <code>https://plugin.capgo.app/updates</code>      |         |
| **`channelUrl`**             | <code>string</code>  | 채널 작업을 위한 URL/엔드포인트를 설정합니다. Android와 iOS에서만 사용 가능                                                                                                            | <code>https://plugin.capgo.app/channel_self</code> |         |
| **`statsUrl`**               | <code>string</code>  | 업데이트 통계가 전송되는 URL/엔드포인트를 설정합니다. Android와 iOS에서만 사용 가능. 통계 보고를 비활성화하려면 ""로 설정                                                            | <code>https://plugin.capgo.app/stats</code>        |         |
| **`privateKey`**             | <code>string</code>  | 엔드-투-엔드 라이브 업데이트 암호화를 위한 개인 키를 설정합니다. Android와 iOS에서만 사용 가능. 버전 6.2.0에서 deprecated되었으며 버전 7.0.0에서 제거될 예정                         | <code>undefined</code>                             |         |
| **`publicKey`**              | <code>string</code>  | 엔드-투-엔드 라이브 업데이트 암호화를 위한 공개 키를 설정합니다 (버전 2). Android와 iOS에서만 사용 가능                                                                               | <code>undefined</code>                             | 620   |
| **`version`**                | <code>string</code>  | 앱의 현재 버전을 설정합니다. 첫 업데이트 요청에 사용됩니다. 설정하지 않으면 플러그인이 네이티브 코드에서 버전을 가져옵니다. Android와 iOS에서만 사용 가능                          | <code>undefined</code>                             | 41748 |
| **`directUpdate`**           | <code>boolean</code> | 앱이 방금 업데이트/설치되었을 때 플러그인이 업데이트를 직접 설치하도록 합니다. 자동 업데이트 모드에서만 사용 가능. Android와 iOS에서만 사용 가능                                    | <code>undefined</code>                             | 510   |
| **`periodCheckDelay`**       | <code>number</code>  | 주기적 업데이트 확인의 지연 시간을 초 단위로 설정합니다. Android와 iOS에서만 사용 가능. 600초(10분) 미만으로 설정할 수 없음                                                          | <code>600 // (10분)</code>                        |         |
| **`localS3`**                | <code>boolean</code> | 테스트 또는 자체 호스팅 업데이트 서버를 위해 CLI가 로컬 서버를 사용하도록 설정                                                                                                         | <code>undefined</code>                             | 41748 |
| **`localHost`**              | <code>string</code>  | 테스트 또는 자체 호스팅 업데이트 서버를 위해 CLI가 로컬 서버를 사용하도록 설정                                                                                                         | <code>undefined</code>                             | 41748 |
| **`localWebHost`**           | <code>string</code>  | 테스트 또는 자체 호스팅 업데이트 서버를 위해 CLI가 로컬 서버를 사용하도록 설정                                                                                                         | <code>undefined</code>                             | 41748 |
| **`localSupa`**              | <code>string</code>  | 테스트 또는 자체 호스팅 업데이트 서버를 위해 CLI가 로컬 서버를 사용하도록 설정                                                                                                         | <code>undefined</code>                             | 41748 |
| **`localSupaAnon`**          | <code>string</code>  | 테스트를 위해 CLI가 로컬 서버를 사용하도록 설정                                                                                                                                         | <code>undefined</code>                             | 41748 |
| **`localApi`**               | <code>string</code>  | 테스트를 위해 CLI가 로컬 API를 사용하도록 설정                                                                                                                                          | <code>undefined</code>                             | 633   |
| **`localApiFiles`**          | <code>string</code>  | 테스트를 위해 CLI가 로컬 파일 API를 사용하도록 설정                                                                                                                                     | <code>undefined</code>                             | 633   |
| **`allowModifyUrl`**         | <code>boolean</code> | 플러그인이 JavaScript 측에서 updateUrl, statsUrl 및 channelUrl을 동적으로 수정할 수 있도록 허용                                                                                         | <code>false</code>                                 | 540   |
| **`defaultChannel`**         | <code>string</code>  | 설정에서 앱의 기본 채널 설정| <code>undefined</code>                             | 550   |
| **`appId`**                  | <code>string</code>  | 앱의 설정에서 앱 ID를 구성합니다                                                                                                                                                 | <code>undefined</code>                             | 600   |
| **`keepUrlPathAfterReload`** | <code>boolean</code> | 리로드 후 URL 경로를 유지하도록 플러그인을 구성합니다 경고: 리로드가 트리거되면 'windowhistory'가 지워집니다                                                                | <code>false</code>                                 | 680   |

## 예시

`capacitorconfigjson`에서:

```json
{
  "plugins": {
    "CapacitorUpdater": {
      "appReadyTimeout": 1000 // (1초),
      "responseTimeout": 10 // (10초),
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

`capacitorconfigts`에서:

```ts
/// <reference types="@capgo/capacitor-updater" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    CapacitorUpdater: {
      appReadyTimeout: 1000 // (1초),
      responseTimeout: 10 // (10초),
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
```

# 메서드

## notifyAppReady()

```typescript
notifyAppReady() => Promise<AppReadyResult>
```

현재 번들이 제대로 작동하고 있다는 것을 Capacitor Updater에 알립니다 (이 메서드가 모든 앱 실행 시 호출되지 않으면 롤백이 발생합니다)
기본적으로 이 메서드는 앱 실행 후 처음 10초 내에 호출되어야 하며, 그렇지 않으면 롤백이 발생합니다
이 동작은 {@link appReadyTimeout}으로 변경할 수 있습니다

**반환:** <code>Promise&lt;<a href="#appreadyresult">AppReadyResult</a>&gt;</code>

## setUpdateUrl()

```typescript
setUpdateUrl(options: UpdateUrl) => Promise<void>
```

앱의 업데이트 URL을 설정합니다. 이는 업데이트를 확인하는 데 사용됩니다

| 매개변수       | 타입                                            | 설명                                      |
| ------------- | ----------------------------------------------- | ----------------------------------------- |
| **`options`** | <code><a href="#updateurl">UpdateUrl</a></code> | 업데이트 확인에 사용할 URL을 포함합니다 |

**버전:** 540부터

## setStatsUrl()

```typescript
setStatsUrl(options: StatsUrl) => Promise<void>
```

앱의 통계 URL을 설정합니다. 이는 통계를 전송하는 데 사용됩니다. 빈 문자열을 전달하면 통계 수집이 비활성화됩니다

| 매개변수       | 타입                                          | 설명                                    |
| ------------- | --------------------------------------------- | --------------------------------------- |
| **`options`** | <code><a href="#statsurl">StatsUrl</a></code> | 통계 전송에 사용할 URL을 포함합니다 |

**버전:** 540부터

## setChannelUrl()

```typescript
setChannelUrl(options: ChannelUrl) => Promise<void>
```

앱의 채널 URL을 설정합니다. 이는 채널을 설정하는 데 사용됩니다

| 매개변수       | 타입                                              | 설명                                     |
| ------------- | ------------------------------------------------- | ---------------------------------------- |
| **`options`** | <code><a href="#channelurl">ChannelUrl</a></code> | 채널 설정에 사용할 URL을 포함합니다 |

**버전:** 540부터

## download()

```typescript
download(options: DownloadOptions) => Promise<BundleInfo>
```

제공된 URL에서 새 번들을 다운로드합니다. 이는 내부에 파일이 있는 zip 파일이거나 모든 파일이 포함된 고유 ID가 있는 zip 파일이어야 합니다

| 매개변수       | 타입                                                        | 설명                                                                                  |
| ------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#downloadoptions">DownloadOptions</a></code> | 새 번들 zip을 다운로드하기 위한 {@link <a href="#downloadoptions">DownloadOptions</a>} |

**반환:** <code>Promise&lt;<a href="#bundleinfo">BundleInfo</a>&gt;</code>

## next()

```typescript
next(options: BundleId) => Promise<BundleInfo>
```

앱이 리로드될 때 사용할 다음 번들을 설정합니다| Param         | Type                                          | Description                                                                                                   |
| ------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | 다음 앱 실행 시 설정할 다음 번들의 ID를 포함합니다 {@link <a href="#bundleinfo">BundleInfoid</a>} |

**Returns:** <code>Promise&lt;<a href="#bundleinfo">BundleInfo</a>&gt;</code>

--------------------

## set()

```typescript
set(options: BundleId) => Promise<void>
```

현재 번들을 설정하고 즉시 앱을 리로드합니다

| Param         | Type                                          | Description                                                                                       |
| ------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | 현재 설정할 새 번들 ID를 포함하는 {@link <a href="#bundleid">BundleId</a>} 객체 |

--------------------

## delete()

```typescript
delete(options: BundleId) => Promise<void>
```

네이티브 앱 저장소에서 지정된 번들을 삭제합니다. {@link list}와 함께 저장된 번들 ID를 가져오는 데 사용하세요.

| Param         | Type                                          | Description                                                                                                                                   |
| ------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | 삭제할 번들의 ID를 포함하는 {@link <a href="#bundleid">BundleId</a>} 객체 (참고: 이것은 버전 이름이 아닌 번들 ID입니다) |

--------------------

## list()

```typescript
list(options?: ListOptions | undefined) => Promise<BundleListResult>
```

앱에 로컬로 다운로드된 모든 번들을 가져옵니다

| Param         | Type                                                | Description                                                            |
| ------------- | --------------------------------------------------- | ---------------------------------------------------------------------- |
| **`options`** | <code><a href="#listoptions">ListOptions</a></code> | 번들을 나열하기 위한 {@link <a href="#listoptions">ListOptions</a>} |

**Returns:** <code>Promise&lt;<a href="#bundlelistresult">BundleListResult</a>&gt;</code>

--------------------

## reset()

```typescript
reset(options?: ResetOptions | undefined) => Promise<void>
```

앱을 `builtin` 번들(Apple App Store / Google Play Store에 전송된 것) 또는 마지막으로 성공적으로 로드된 번들로 리셋합니다

| Param         | Type                                                  | Description                                                                                                                                                                      |
| ------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#resetoptions">ResetOptions</a></code> | {@link <a href="#resetoptions">ResetOptionstoLastSuccessful</a>}을 포함하며, `true`는 기본 제공 번들로 리셋하고 `false`는 마지막으로 성공적으로 로드된 번들로 리셋합니다 |

--------------------

## current()

```typescript
current() => Promise<CurrentBundleResult>
```

현재 번들을 가져옵니다. 설정된 것이 없으면 `builtin`을 반환합니다. currentNative는 기기에 설치된 원본 번들입니다

**Returns:** <code>Promise&lt;<a href="#currentbundleresult">CurrentBundleResult</a>&gt;</code>

--------------------

## reload()

```typescript
reload() => Promise<void>
```

뷰를 리로드합니다

--------------------

## setMultiDelay()

```typescript
setMultiDelay(options: MultiDelayConditions) => Promise<void>
```

플러그인이 업데이트를 지연시키는 데 사용할 조건이 포함된 {@link <a href="#delaycondition">DelayCondition</a>} 배열을 설정합니다
모든 조건이 충족되면 업데이트 프로세스가 다시 평소대로 시작되므로 앱을 백그라운드로 전환하거나 종료한 후에 업데이트가 설치됩니다
`date` 종류의 경우 값은 iso8601 날짜 문자열이어야 합니다
`background` 종류의 경우 값은 밀리초 단위의 숫자여야 합니다
`nativeVersion` 종류의 경우 값은 버전 번호여야 합니다
`kill` 종류의 경우 값이 사용되지 않습니다
이 함수는 kill 옵션이 다른 옵션처럼 다음 백그라운드 후가 아닌 첫 번째 종료 후에 업데이트를 트리거하는 일관되지 않은 동작을 보입니다. 이는 향후 주요 릴리스에서 수정될 예정입니다

| Param         | Type                                                                  | Description                                                                                                |
| ------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#multidelayconditions">MultiDelayConditions</a></code> | 설정할 조건 배열을 포함하는 {@link <a href="#multidelayconditions">MultiDelayConditions</a>} |

**Since:** 430

--------------------

## cancelDelay()

```typescript
cancelDelay() => Promise<void>
```

업데이트를 즉시 처리하기 위해 {@link <a href="#delaycondition">DelayCondition</a>}을 취소합니다

**Since:** 400

--------------------

## getLatest()

```typescript
getLatest(options?: GetLatestOptions | undefined) => Promise<LatestVersion>
```

업데이트 URL에서 사용 가능한 최신 번들을 가져옵니다

| Param         | Type                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#getlatestoptions">GetLatestOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#latestversion">LatestVersion</a>&gt;</code>

**Since:** 400

--------------------

## setChannel()

```typescript
setChannel(options: SetChannelOptions) => Promise<ChannelRes>
```

이 기기의 채널을 설정합니다. 이 작업이 작동하려면 채널이 자체 할당을 허용해야 합니다
`autoUpdate`가 {@link PluginsConfig}에서 활성화된 경우 부팅 시 채널을 설정하는 데 이 메서드를 사용하지 마세요
이 메서드는 앱이 준비된 후에 채널을 설정하는 데 사용됩니다
이 메서드는 기기 ID를 채널에 연결하는 요청을 Capgo 백엔드로 보냅니다. Capgo는 채널 설정에 따라 수락하거나 거부할 수 있습니다

| Param         | Type                                                            | Description                                                                      |
| ------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setchanneloptions">SetChannelOptions</a></code> | 설정할 채널인 {@link <a href="#setchanneloptions">SetChannelOptions</a>} |

**Returns:** <code>Promise&lt;<a href="#channelres">ChannelRes</a>&gt;</code>

**Since:** 470

--------------------

## unsetChannel()

```typescript
unsetChannel(options: UnsetChannelOptions) => Promise<void>
```

이 기기의 채널 설정을 해제합니다디바이스가 기본 채널로 돌아갑니다

| Param | Type |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#unsetchanneloptions">UnsetChannelOptions</a></code> |

**Since:** 470

--------------------

## getChannel()

```typescript
getChannel() => Promise<GetChannelRes>
```

이 디바이스의 채널을 가져옵니다

**Returns:** <code>Promise&lt;<a href="#getchannelres">GetChannelRes</a>&gt;</code>

**Since:** 480

--------------------

## setCustomId()

```typescript
setCustomId(options: SetCustomIdOptions) => Promise<void>
```

이 디바이스에 대한 커스텀 ID를 설정합니다

| Param | Type | Description |
| ------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setcustomidoptions">SetCustomIdOptions</a></code> | {@link <a href="#setcustomidoptions">SetCustomIdOptions</a>} 설정할 customId입니다 |

**Since:** 490

--------------------

## getBuiltinVersion()

```typescript
getBuiltinVersion() => Promise<BuiltinVersion>
```

네이티브 앱 버전 또는 config에 설정된 빌트인 버전을 가져옵니다

**Returns:** <code>Promise&lt;<a href="#builtinversion">BuiltinVersion</a>&gt;</code>

**Since:** 520

--------------------

## getDeviceId()

```typescript
getDeviceId() => Promise<DeviceId>
```

디바이스를 식별하는데 사용되는 고유 ID를 가져옵니다(자동 업데이트 서버로 전송됨)

**Returns:** <code>Promise&lt;<a href="#deviceid">DeviceId</a>&gt;</code>

--------------------

## getPluginVersion()

```typescript
getPluginVersion() => Promise<PluginVersion>
```

네이티브 Capacitor Updater 플러그인 버전을 가져옵니다(자동 업데이트 서버로 전송됨)

**Returns:** <code>Promise&lt;<a href="#pluginversion">PluginVersion</a>&gt;</code>

--------------------

## isAutoUpdateEnabled()

```typescript
isAutoUpdateEnabled() => Promise<AutoUpdateEnabled>
```

자동 업데이트 설정 상태를 가져옵니다

**Returns:** <code>Promise&lt;<a href="#autoupdateenabled">AutoUpdateEnabled</a>&gt;</code>

--------------------

## removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

이 플러그인의 모든 리스너를 제거합니다

**Since:** 100

--------------------

## addListener('download', )

```typescript
addListener(eventName: 'download', listenerFunc: (state: DownloadEvent) => void) => Promise<PluginListenerHandle>
```

앱에서 번들 다운로드 이벤트를 수신합니다. 다운로드가 시작되고, 다운로드 중이며, 완료되었을 때 발생합니다

| Param | Type | 
| ------------------ | --------------------------------------------------------------------------- |
| **`eventName`** | <code>'download'</code> |
| **`listenerFunc`** | <code>(state: <a href="#downloadevent">DownloadEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 2011

--------------------

## addListener('noNeedUpdate', )

```typescript
addListener(eventName: 'noNeedUpdate', listenerFunc: (state: NoNeedEvent) => void) => Promise<PluginListenerHandle>
```

업데이트가 필요 없음 이벤트를 수신합니다. 앱이 실행될 때마다 강제로 확인하고 싶을 때 유용합니다

| Param | Type |
| ------------------ | ----------------------------------------------------------------------- |
| **`eventName`** | <code>'noNeedUpdate'</code> |
| **`listenerFunc`** | <code>(state: <a href="#noneedevent">NoNeedEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 400

--------------------

## addListener('updateAvailable', )

```typescript
addListener(eventName: 'updateAvailable', listenerFunc: (state: UpdateAvailableEvent) => void) => Promise<PluginListenerHandle>
```

사용 가능한 업데이트 이벤트를 수신합니다. 앱이 실행될 때마다 강제로 확인하고 싶을 때 유용합니다

| Param | Type |
| ------------------ | ----------------------------------------------------------------------------------------- |
| **`eventName`** | <code>'updateAvailable'</code> |
| **`listenerFunc`** | <code>(state: <a href="#updateavailableevent">UpdateAvailableEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 400

--------------------

## addListener('downloadComplete', )

```typescript
addListener(eventName: 'downloadComplete', listenerFunc: (state: DownloadCompleteEvent) => void) => Promise<PluginListenerHandle>
```

다운로드 완료 이벤트를 수신합니다

| Param | Type |
| ------------------ | ------------------------------------------------------------------------------------------- |
| **`eventName`** | <code>'downloadComplete'</code> |
| **`listenerFunc`** | <code>(state: <a href="#downloadcompleteevent">DownloadCompleteEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 400

--------------------

## addListener('majorAvailable', )

```typescript
addListener(eventName: 'majorAvailable', listenerFunc: (state: MajorAvailableEvent) => void) => Promise<PluginListenerHandle>
```

앱에서 메이저 업데이트 이벤트를 수신합니다. disableAutoUpdateBreaking 설정에 의해 메이저 업데이트가 차단된 경우를 알려줍니다

| Param | Type |
| ------------------ | --------------------------------------------------------------------------------------- |
| **`eventName`** | <code>'majorAvailable'</code> |
| **`listenerFunc`** | <code>(state: <a href="#majoravailableevent">MajorAvailableEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 230

--------------------

## addListener('updateFailed', )

```typescript
addListener(eventName: 'updateFailed', listenerFunc: (state: UpdateFailedEvent) => void) => Promise<PluginListenerHandle>
```

업데이트 실패 이벤트를 수신합니다. 다음 앱 시작 시 업데이트 설치가 실패했을 때를 알려줍니다

| Param | Type |
| ------------------ | ----------------------------------------------------------------------------------- |
| **`eventName`** | <code>'updateFailed'</code> |
| **`listenerFunc`** | <code>(state: <a href="#updatefailedevent">UpdateFailedEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 230

--------------------

## addListener('downloadFailed',```typescript
addListener(eventName: 'downloadFailed', listenerFunc: (state: DownloadFailedEvent) => void) => Promise<PluginListenerHandle>
```

앱에서 다운로드 실패 이벤트를 수신하여 번들 다운로드가 실패했을 때 알려줍니다

| Param              | Type                                                                    |
| ------------------ | ----------------------------------------------------------------------- |
| **`eventName`**    | <code>'downloadFailed'</code>                                           |
| **`listenerFunc`** | <code>(state: <a href="#downloadfailedevent">DownloadFailedEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 400

--------------------

## addListener('appReloaded', )

```typescript
addListener(eventName: 'appReloaded', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

앱의 리로드 이벤트를 수신하여 리로드가 발생했을 때 알려줍니다

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

앱의 준비 완료 이벤트를 수신하여 앱을 사용할 준비가 되었을 때 알려줍니다

| Param              | Type                                                                    |
| ------------------ | ----------------------------------------------------------------------- |
| **`eventName`**    | <code>'appReady'</code>                                                 |
| **`listenerFunc`** | <code>(state: <a href="#appreadyevent">AppReadyEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 510

--------------------

## isAutoUpdateAvailable()

```typescript
isAutoUpdateAvailable() => Promise<AutoUpdateAvailable>
```

자동 업데이트가 사용 가능한지 확인합니다 (serverUrl에 의해 비활성화되지 않음)

**Returns:** <code>Promise&lt;<a href="#autoupdateavailable">AutoUpdateAvailable</a>&gt;</code>

--------------------

## getNextBundle()

```typescript
getNextBundle() => Promise<BundleInfo | null>
```

앱이 리로드될 때 사용될 다음 번들을 가져옵니다 
다음 번들이 설정되지 않은 경우 null을 반환합니다

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

| Prop             | Type                | Description                                                                                                                           | Default                | Since |
| ---------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ----- |
| **`url`**        | <code>string</code> | 다운로드할 번들 zip 파일(예: distzip)의 URL(Amazon S3, GitHub 태그, 번들을 호스팅한 다른 위치 등의 URL일 수 있습니다) |                        |       |
| **`version`**    | <code>string</code> | 이 번들/버전의 버전 코드/이름                                                                                                          |                        |       |
| **`sessionKey`** | <code>string</code> | 업데이트를 위한 세션 키                                                                                                               | <code>undefined</code> | 400   |
| **`checksum`**   | <code>string</code> | 업데이트를 위한 체크섬                                                                                                                | <code>undefined</code> | 400   |


### BundleId

| Prop     | Type                |
| -------- | ------------------- |
| **`id`** | <code>string</code> |


### BundleListResult

| Prop          | Type                      |
| ------------- | ------------------------- |
| **`bundles`** | <code>BundleInfo[]</code> |


### ListOptions

| Prop      | Type                 | Description                                                                                                           | Default            | Since  |
| --------- | -------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------ | ------ |
| **`raw`** | <code>boolean</code> | 원시 번들 목록 또는 매니페스트를 반환할지 여부. true인 경우 디스크의 파일 대신 내부 데이터베이스를 읽으려고 시도합니다 | <code>false</code> | 6140   |


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

| Prop        | Type                                                      | Description                    |
| ----------- | --------------------------------------------------------- | ------------------------------ |
| **`kind`**  | <code><a href="#delayuntilnext">DelayUntilNext</a></code> | setMultiDelay에서 지연 조건 설정 |
| **`value`** | <code>string</code>                                       |                                |


### LatestVersion

| Prop             | Type                 | Description                | Since |
| ---------------- | -------------------- | -------------------------- | ----- |
| **`version`**    | <code>string</code>  | getLatest 메서드의 결과      | 40| **`checksum`**   | <code>string</code>          |                            | 6     |
| **`major`**      | <code>boolean</code>         |                            |       |
| **`message`**    | <code>string</code>          |                            |       |
| **`sessionKey`** | <code>string</code>          |                            |       |
| **`error`**      | <code>string</code>          |                            |       |
| **`old`**        | <code>string</code>          |                            |       |
| **`url`**        | <code>string</code>          |                            |       |
| **`manifest`**   | <code>ManifestEntry[]</code> |                            | 61   |


### ManifestEntry

| Prop               | Type                        |
| ------------------ | --------------------------- |
| **`file_name`**    | <code>string \| null</code> |
| **`file_hash`**    | <code>string \| null</code> |
| **`download_url`** | <code>string \| null</code> |


### GetLatestOptions

| Prop          | Type                | Description                                                                                     | Default                | Since |
| ------------- | ------------------- | ----------------------------------------------------------------------------------------------- | ---------------------- | ----- |
| **`channel`** | <code>string</code> | 최신 버전을 받을 채널입니다. 이 작업을 위해서는 채널이 'self_assign'을 허용해야 합니다 | <code>undefined</code> | 680 |


### ChannelRes

| Prop          | Type                | Description                   | Since |
| ------------- | ------------------- | ----------------------------- | ----- |
| **`status`**  | <code>string</code> | 설정된 채널의 현재 상태 | 470 |
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

| Prop           | Type                 | Description                   | Since |
| -------------- | -------------------- | ----------------------------- | ----- |
| **`channel`**  | <code>string</code>  | 가져온 채널의 현재 상태 | 480 |
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

| Prop          | Type                                              | Description                                    | Since |
| ------------- | ------------------------------------------------- | ---------------------------------------------- | ----- |
| **`percent`** | <code>number</code>                               | 다운로드의 현재 상태, 0에서 100 사이 | 400 |
| **`bundle`**  | <code><a href="#bundleinfo">BundleInfo</a></code> |                                                |       |


### NoNeedEvent

| Prop         | Type                                              | Description                                    | Since |
| ------------ | ------------------------------------------------- | ---------------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | 다운로드의 현재 상태, 0에서 100 사이 | 400 |


### UpdateAvailableEvent

| Prop         | Type                                              | Description                                    | Since |
| ------------ | ------------------------------------------------- | ---------------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | 다운로드의 현재 상태, 0에서 100 사이 | 400 |


### DownloadCompleteEvent

| Prop         | Type                                              | Description                          | Since |
| ------------ | ------------------------------------------------- | ------------------------------------ | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | 새로운 업데이트가 가능할 때 발생 | 400 |


### MajorAvailableEvent

| Prop          | Type                | Description                                | Since |
| ------------- | ------------------- | ------------------------------------------ | ----- |
| **`version`** | <code>string</code> | 새로운 메이저 번들이 가능할 때 발생 | 400 |


### UpdateFailedEvent

| Prop         | Type                                              | Description                           | Since |
| ------------ | ------------------------------------------------- | ------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | 업데이트 설치에 실패했을 때 발생 | 400 |


### DownloadFailedEvent

| Prop          | Type                | Description                | Since |
| ------------- | ------------------- | -------------------------- | ----- |
| **`version`** | <code>string</code> | 다운로드 실패 시 발생 | 400 |


### AppReadyEvent

| Prop         | Type                                              | Description                           | Since |
| ------------ | ------------------------------------------------- | ------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | 앱이 사용 준비가 되었을 때 발생 | 520 |
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
