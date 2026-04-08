---
title: 기능 및 설정
description: 플러그인의 사용 가능한 모든 방법 및 설정
sidebar:
  order: 2
locale: ko
---
# 업데이터 플러그인 구성

자세한 내용은 Github [Readme](https://github.com/Cap-go/capacitor-updater)를 참조하세요.

<docgen-config>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

CapacitorUpdater는 다음 옵션으로 구성할 수 있습니다.| 소품 | 유형 | 설명 | 기본값 | 이후 |
| --------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ------- |
| **`appReadyTimeout`** | <code>번호</code> | 업데이트 '실패'를 고려하기 전에 기본 플러그인이 기다려야 하는 시간(밀리초)을 구성합니다. Android, iOS 및 Electron에서 사용할 수 있습니다.                                                                                                                                                                                                                                                                                                                                                                                                                                     | <code>10000 // (10초)</code> |         |
| **`responseTimeout`** | <code>번호</code> | API 시간 초과를 고려하기 전에 기본 플러그인이 기다려야 하는 시간(밀리초)을 구성합니다. Android, iOS 및 Electron에서 사용할 수 있습니다.                                                                                                                                                                                                                                                                                                                                                                                                                                            | <code>20000 // (20초)</code> |         |
| **`autoDeleteFailed`** | <code>boolean</code> | 플러그인이 실패한 번들을 자동으로 삭제해야 하는지 여부를 구성합니다. Android, iOS 및 E에서 사용 가능전자.                                                                                                                                                                                                                                                                                                                                                                                                                                                              | <code>true</code> |         |
| **`autoDeletePrevious`** | <code>boolean</code> | 성공적인 업데이트 후 플러그인이 이전 번들을 자동으로 삭제해야 하는지 여부를 구성합니다. Android, iOS 및 Electron에서 사용할 수 있습니다.                                                                                                                                                                                                                                                                                                                                                                                                                                      | <code>true</code> |         |
| **`autoUpdate`** | <code>boolean</code> | 플러그인이 업데이트 서버를 통해 자동 업데이트를 사용해야 하는지 여부를 구성합니다. Android, iOS 및 Electron에서 사용할 수 있습니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | <code>true</code> |         |
| **`resetWhenUpdate`** | <code>boolean</code> | 최신 기본 앱 번들이 기기에 설치되면 이전에 다운로드한 번들을 자동으로 삭제합니다. Android, iOS 및 Electron에서 사용할 수 있습니다.                                                                                                                                                                                                                                                                                                                                                                                                                                   | <code>true</code> |         |
| **`updateUrl`** | <code>string</code> | 업데이트 확인이 전송되는 URL/엔드포인트를 구성합니다. Android, iOS 및 Electron에서 사용할 수 있습니다.| <code>https://plugin.capgo.app/updates</code> |         |
| **`channelUrl`** | <code>string</code> | 채널 작업을 위한 URL/엔드포인트를 구성합니다. Android, iOS 및 Electron에서 사용할 수 있습니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | <code>https://plugin.capgo.app/channel_self</code> |         |
| **`statsUrl`** | <code>string</code> | 업데이트 통계가 전송되는 URL/엔드포인트를 구성합니다. Android, iOS 및 Electron에서 사용할 수 있습니다. 통계 보고를 비활성화하려면 ""로 설정하세요.                                                                                                                                                                                                                                                                                                                                                                                                                                       | <code>https://plugin.capgo.app/stats</code> |         |
| **`publicKey`** | <code>string</code> | 종단 간 라이브 업데이트 암호화 버전 2에 대한 공개 키를 구성합니다. Android, iOS 및 Electron에서 사용할 수 있습니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                             | <code>정의되지 않음</code> | 6.2.0 |
| **`version`** | <code>string</code> | 앱의 현재 버전을 구성합니다. 이는 첫 번째 업데이트 요청에 사용됩니다. 설정하지 않으면 플러그인이 네이티브 코드에서 버전을 가져옵니다. Android, iOS 및 Electron에서 사용할 수 있습니다.| <code>정의되지 않음</code> | 4.17.48 |
| **`directUpdate`** | <code>부울 \| '항상' \| 'atInstall' \| 'onLaunch'</code> | 플러그인이 업데이트 설치를 지시해야 하는 시기를 구성합니다. 자동 업데이트 모드에만 해당됩니다. 10MB 미만의 앱과 --delta 플래그를 사용하여 업로드를 수행하는 경우 잘 작동합니다. 10MB를 초과하는 Zip 또는 앱은 사용자의 업데이트 속도가 상대적으로 느립니다. - false: 직접 업데이트를 수행하지 않음(기본 동작 사용: 시작 시 다운로드, 백그라운드에서 설정) - atInstall: 앱이 설치된 경우에만 직접 업데이트, 스토어에서 업데이트, 그렇지 않으면 directUpdate = false로 작동 - onLaunch: 앱 설치 시에만 직접 업데이트, 스토어에서 또는 앱 종료 후에 업데이트, 그렇지 않으면 directUpdate = false로 작동 - 항상: 모든 이전 사례(앱 설치, 스토어에서 업데이트, 앱 종료 또는 앱 재개 후)에서 직접 업데이트, directUpdate = false로 작동하지 않음 - true: (사용되지 않음) 동일 이전 버전과의 호환성을 위해 "항상" Android, iOS 및 Electron에서 사용할 수 있습니다. | <code>false</code> | 5.1.0 |
| **`autoSplashscreen`** | <code>boolean</code> | directUpdate를 사용할 때 스플래시 화면 숨기기를 자동으로 처리합니다. 활성화되면 업데이트가 적용된 후 또는 업데이트가 필요하지 않을 때 플러그인이 자동으로 스플래시 화면을 숨깁니다. 이렇게 하면 appReady 이벤트를 수동으로 수신하고 SplashScreen.hide()를 호출할 필요가 없습니다. directUpdate가 "atInstall", "always" 또는 true로 설정된 경우에만 작동합니다. launchAutoHide: false를 사용하여 설치하고 구성하려면 @capacitor/splash-screen 플러그인이 필요합니다. autoUpdate 및 directUpdate를 활성화해야 합니다. Android 및 iOS에서 사용할 수 있습니다.                      | <code>false</code> | 7.6.0 |
| **`periodCheckDelay`** | <code>번호</code> | 기간 업데이트 확인을 위한 지연 기간을 구성합니다. 단위는 초입니다. Android, iOS 및 Electron에서 사용할 수 있습니다. 600초(10분) 미만일 수 없습니다.                                                                                                                                                                                                                                                                                                                                                                                                                     | <code>600 // (10분)</code> |         |
| **`localS3`** | <code>boolean</code> | 테스트용 로컬 서버 또는 자체 호스팅 업데이트 서버를 사용하도록 CLI를 구성합니다.| <code>정의되지 않음</code> | 4.17.48 |
| **`localHost`** | <code>string</code> | 테스트용 로컬 서버 또는 자체 호스팅 업데이트 서버를 사용하도록 CLI을 구성합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>정의되지 않음</code> | 4.17.48 |
| **`localWebHost`** | <code>string</code> | 테스트용 로컬 서버 또는 자체 호스팅 업데이트 서버를 사용하도록 CLI을 구성합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>정의되지 않음</code> | 4.17.48 |
| **`localSupa`** | <code>string</code> | 테스트용 로컬 서버 또는 자체 호스팅 업데이트 서버를 사용하도록 CLI을 구성합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>정의되지 않음</code> | 4.17.48 |
| **`localSupaAnon`** | <code>string</code> | 테스트를 위해 로컬 서버를 사용하도록 CLI을 구성합니다.| <code>정의되지 않음</code> | 4.17.48 |
| **`localApi`** | <code>string</code> | 테스트에 로컬 API를 사용하도록 CLI를 구성합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>정의되지 않음</code> | 6.3.3 |
| **`localApiFiles`** | <code>string</code> | 테스트를 위해 로컬 파일 API를 사용하도록 CLI을 구성합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | <code>정의되지 않음</code> | 6.3.3 |
| **`allowModifyUrl`** | <code>boolean</code> | 플러그인이 JavaScript 측에서 updateUrl, statsUrl 및 ChannelUrl을 동적으로 수정하도록 허용합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | <code>false</code> | 5.4.0 |
| **`defaultChannel`** | <code>string</code> | 구성에서 앱의 기본 채널을 설정하세요. 대소문자를 구분합니다. 이 설정은 클라우드에 설정된 기본 채널을 재정의하지만 클라우드에서 수행된 재정의는 계속 존중합니다.                                                                                                                                                                                                                                                                                                                                                                                      | <code>정의되지 않음</code> | 5.5.0 |
| **`appId`** | <code>string</code> | 구성에서 앱의 앱 ID를 구성합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | <code>정의되지 않음</code> | 6.0.0 |
| **`keepUrlPathAfterReload`** | <code>boolean</code> | 다시 로드한 후 URL 경로를 유지하도록 플러그인을 구성하십시오. 경고: 다시 로드가 트리거되면 'window.history'가 지워집니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                  | <code>false</code> | 6.8.0 |
| **`disableJSLogging`** | <code>boolean</code> | 플러그인의 JavaScript 로깅을 비활성화합니다. true인 경우 플러그인은 JavaScript 콘솔에 기록하지 않습니다. 기본 로그만 수행됩니다 | <code>false</code> | 7.3.0 |
| **`shakeMenu`** | <code>boolean</code> | 디버깅/테스트 목적으로 업데이트 메뉴를 표시하려면 흔들기 동작을 활성화하세요 | <code>false</code> | 7.5.0 |## 예

`capacitor.config.json`에서:

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

`capacitor.config.ts`에서:

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
* [`download(...)`](#다운로드)
* [`next(...)`](#다음)
* [`set(...)`](#세트)
* [`delete(...)`](#삭제)
* [`list(...)`](#목록)
* [`reset(...)`](#재설정)
* [`current()`](#현재)
* [`reload()`](#다시 로드)
* [`setMultiDelay(...)`](#setmultidelay)
* [`cancelDelay()`](#canceldelay)
* [`getLatest(...)`](#getlatest)
* [`setChannel(...)`](#set채널)
* [`unsetChannel(...)`](#unset채널)
* [`getChannel()`](#getchannel)
* [`listChannels()`](#listchannels)
* [`setCustomId(...)`](#setcustomid)
* [`getBuiltinVersion()`](#getbuildinversion)
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
* [`isAutoUpdateAvailable()`](#is자동 업데이트 가능)
* [`getNextBundle()`](#getnextbundle)
* [`setShakeMenu(...)`](#setshakemenu)
* [`isShakeMenuEnabled()`](#isshakemenuenabled)
* [인터페이스](#인터페이스)
* [유형 별칭](#type-aliases)

</docgen-index>

# 방법

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

## 통지AppReady()

```typescript
notifyAppReady() => Promise<AppReadyResult>
```

현재 번들이 작동 중임을 Capacitor 업데이터에 알립니다. 앱을 시작할 때마다 이 메서드가 호출되지 않으면 롤백이 발생합니다.
기본적으로 이 메서드는 앱 실행 후 처음 10초 내에 호출되어야 하며, 그렇지 않으면 롤백이 발생합니다.
{@link appReadyTimeout}을 사용하여 이 동작을 변경하세요.

**반환:** <code>약속<<a href="#appreadyresult">AppReadyResult</a>></code>

-------


## setUpdateUrl(...)

```typescript
setUpdateUrl(options: UpdateUrl) => Promise<void>
```

앱의 updateUrl을 설정합니다. 이는 업데이트를 확인하는 데 사용됩니다.

| 파람 | 유형 | 설명 |
| ------------- | ---------------------------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#updateurl">UpdateUrl</a></code> | 업데이트 확인에 사용할 URL이 포함되어 있습니다. |

**이후:** 5.4.0

-------


## setStatsUrl(...)

```typescript
setStatsUrl(options: StatsUrl) => Promise<void>
```

앱에 대한 statsUrl을 설정합니다. 이는 통계를 보내는 데 사용됩니다. 빈 문자열을 전달하면 통계 수집이 비활성화됩니다.| 파람 | 유형 | 설명 |
| ------------- | -------------------------------- | ---------------------------------- |
| **`options`** | <code><a href="#statsurl">StatsUrl</a></code> | 통계 전송에 사용할 URL이 포함되어 있습니다. |

**이후:** 5.4.0

-------


## setChannelUrl(...)

```typescript
setChannelUrl(options: ChannelUrl) => Promise<void>
```

앱의 ChannelUrl을 설정합니다. 이는 채널을 설정하는 데 사용됩니다.

| 파람 | 유형 | 설명 |
| ------------- | ------------------------------------------------- | ------------------------------------------------ |
| **`options`** | <code><a href="#channelurl">ChannelUrl</a></code> | 채널 설정에 사용할 URL이 포함되어 있습니다. |

**이후:** 5.4.0

-------


## 다운로드(...)

```typescript
download(options: DownloadOptions) => Promise<BundleInfo>
```

제공된 URL에서 새 번들을 다운로드하세요. zip 파일이어야 하며 내부에 파일이 있거나 모든 파일이 포함된 고유 ID가 있어야 합니다.

| 파람 | 유형 | 설명 |
| ------------- | ---------------------------------------------- | ------------------------------------------------------------------ |
| **`options`** | <code><a href="#downloadoptions">다운로드 옵션</a></code> | 새 번들 zip을 다운로드하기 위한 {@link <a href="#downloadoptions">DownloadOptions</a>} |

**반품:** <code>약속<<a href="#bundleinfo">BundleInfo</a>></code>

-------


## 다음(...)

```typescript
next(options: BundleId) => Promise<BundleInfo>
```

앱을 다시 로드할 때 사용할 다음 번들을 설정합니다.

| 파람 | 유형 | 설명 |
| ------------- | -------------------------------- | ------------------------------------------------------------------------------------------------ |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | 다음 앱 실행 시 설정할 다음 번들의 ID를 포함합니다. {@link <a href="#bundleinfo">BundleInfo.id</a>} |

**반품:** <code>약속<<a href="#bundleinfo">BundleInfo</a>></code>

-------


## 세트(...)

```typescript
set(options: BundleId) => Promise<void>
```

현재 번들을 설정하고 즉시 앱을 다시 로드합니다.| 파람 | 유형 | 설명 |
| ------------- | -------------------------------- | ------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | 현재로 설정할 새 번들 ID가 포함된 {@link <a href="#bundleid">BundleId</a>} 객체. |

-------


## 삭제(...)

```typescript
delete(options: BundleId) => Promise<void>
```

네이티브 앱 스토리지에서 지정된 번들을 삭제합니다. 저장된 번들 ID를 가져오려면 {@link list}와 함께 사용하세요.

| 파람 | 유형 | 설명 |
| ------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | 삭제할 번들의 ID가 포함된 {@link <a href="#bundleid">BundleId</a>} 객체(참고: 버전 이름이 아닌 번들 ID임) |

-------


## 목록(...)

```typescript
list(options?: ListOptions | undefined) => Promise<BundleListResult>
```

앱에서 로컬로 다운로드한 모든 번들을 가져옵니다.

| 파람 | 유형 | 설명 |
| ------------- | -------------------------------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#listoptions">ListOptions</a></code> | 번들 나열을 위한 {@link <a href="#listoptions">ListOptions</a>} |

**반품:** <code>약속<<a href="#bundlelistresult">BundleListResult</a>></code>

-------


## 재설정(...)

```typescript
reset(options?: ResetOptions | undefined) => Promise<void>
```

앱을 `builtin` 번들( Apple App Store / Google Play Store 로 전송된 번들) 또는 마지막으로 성공적으로 로드된 번들로 재설정합니다.

| 파람 | 유형 | 설명 |
| ------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#resetoptions">ResetOptions</a></code> | {@link <a href="#resetoptions">ResetOptions.toLastSuccessful</a>}을 포함하면 `true`는 내장 번들로 재설정되고 `false`는 마지막으로 성공적으로 로드된 번들로 재설정됩니다. |

-------


## 현재()

```typescript
current() => Promise<CurrentBundleResult>
```현재 번들을 가져옵니다. 설정된 것이 없으면 `builtin`을 반환합니다. currentNative는 장치에 설치된 원래 번들입니다.

**반품:** <code>약속<<a href="#currentbundleresult">CurrentBundleResult</a>></code>

-------


## 다시 로드()

```typescript
reload() => Promise<void>
```

뷰를 다시 로드하세요.

-------


## setMultiDelay(...)

```typescript
setMultiDelay(options: MultiDelayConditions) => Promise<void>
```

플러그인이 업데이트를 지연하는 데 사용할 조건이 포함된 {@link <a href="#delaycondition">DelayCondition</a>} 배열을 설정합니다.
모든 조건이 충족되면 업데이트 프로세스가 평소와 같이 다시 시작되므로 앱을 백그라운드로 설정하거나 종료한 후에 업데이트가 설치됩니다.
`date` 종류의 경우 값은 iso8601 날짜 문자열이어야 합니다.
`background` 종류의 경우 값은 밀리초 단위의 숫자여야 합니다.
`nativeVersion` 종류의 경우 값은 버전 번호여야 합니다.
`kill` 종류의 경우 값이 사용되지 않습니다.
이 함수는 kill 옵션이 다른 옵션처럼 다음 배경 이후가 아니라 첫 번째 kill 후에 업데이트를 트리거하는 일관되지 않은 동작을 가지고 있습니다. 이 문제는 향후 주요 릴리스에서 수정될 예정입니다.

| 파람 | 유형 | 설명 |
| ------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#multidelayconditions">MultiDelayConditions</a></code> | 설정할 조건의 {@link <a href="#multidelayconditions">MultiDelayConditions</a>} 배열 포함 |

**이후:** 4.3.0

-------


## 취소지연()

```typescript
cancelDelay() => Promise<void>
```

업데이트를 즉시 처리하려면 {@link <a href="#delaycondition">DelayCondition</a>}을 취소합니다.

**이후:** 4.0.0

-------


## 최신 정보(...)

```typescript
getLatest(options?: GetLatestOptions | undefined) => Promise<LatestVersion>
```

업데이트 URL에서 사용 가능한 최신 번들 받기

| 파람 | 유형 |
| ------------- | ------------------------------------------------ |
| **`options`** | <code><a href="#getlatestoptions">GetLatestOptions</a></code> |

**반품:** <code>약속<<a href="#latestversion">최신 버전</a>></code>

**이후:** 4.0.0

-------


## 세트채널(...)

```typescript
setChannel(options: SetChannelOptions) => Promise<ChannelRes>
```

이 장치의 채널을 설정합니다. 이 기능이 작동하려면 채널에 `allow_device_self_set`이 활성화되어 있어야 합니다.**중요 사항:**
- 부팅 시 채널을 설정하는 데 이 방법을 사용하지 마세요. 대신 Capacitor 구성에서 `defaultChannel`을 사용하세요.
- 이 방법은 앱이 준비되고 사용자가 상호작용(예: 베타 프로그램 선택)한 후에 사용하기 위한 것입니다.
- **공개 채널은 자체 할당할 수 없습니다.** 채널이 `public`로 표시된 경우 `setChannel()`을 호출하면 오류가 반환됩니다. 공개 채널을 사용하려면 대신 `unsetChannel()`을 호출하세요. 그러면 장치가 자동으로 일치하는 공개 채널로 대체됩니다.
- `listChannels()`을 사용하여 사용 가능한 채널과 자체 할당 허용 여부를 확인하세요.

| 파람 | 유형 | 설명 |
| ------------- | -------------------------------------------------- | -------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setchanneloptions">SetChannelOptions</a></code> | 설정할 {@link <a href="#setchanneloptions">SetChannelOptions</a>} 채널이 |

**반품:** <code>약속<<a href="#channelres">ChannelRes</a>></code>

**이후:** 4.7.0

-------


## unsetChannel(...)

```typescript
unsetChannel(options: UnsetChannelOptions) => Promise<void>
```

이 기기의 채널 재정의를 설정 해제하세요. 이 메서드를 호출하면 장치는 해당 조건(플랫폼, 장치 유형, 빌드 유형)과 일치하는 **공개 채널**로부터 자동으로 업데이트를 수신합니다.

이는 다음과 같은 경우에 유용합니다.
- 장치를 기본 업데이트 트랙으로 다시 이동하려는 경우
- 공개 채널을 사용하고 싶습니다(공개 채널은 `setChannel()`을 통해 자체 할당될 수 없으므로).

| 파람 | 유형 |
| ------------- | ------------------------------------------------------ |
| **`options`** | <code><a href="#unsetchanneloptions">UnsetChannelOptions</a></code> |

**이후:** 4.7.0

-------


## getChannel()

```typescript
getChannel() => Promise<GetChannelRes>
```

이 장치의 채널 가져오기

**반품:** <code>약속<<a href="#getchannelres">GetChannelRes</a>></code>

**이후:** 4.8.0

-------


## 목록채널()

```typescript
listChannels() => Promise<ListChannelsResult>
```

이 장치에 사용 가능한 모든 채널을 나열합니다. 기기의 현재 환경(플랫폼, 에뮬레이터/실제 기기, 개발/프로덕션 빌드)과 호환되고 공개되거나 자체 할당을 허용하는 채널을 반환합니다.

결과의 각 채널에는 다음이 포함됩니다.
- `public`: `true`인 경우 **기본 채널**입니다. `setChannel()`를 사용하여 자체 할당할 수 없습니다. 대신 `unsetChannel()`을 사용하여 채널 할당을 제거하면 장치는 자동으로 이 공개 채널에서 업데이트를 받게 됩니다.
- `allow_self_set`: `true`인 경우 **자체 할당 가능한 채널**입니다. `setChannel()`을 사용하여 이 채널에 장치를 명시적으로 할당할 수 있습니다.

**반품:** <code>약속<<a href="#listchannelsresult">ListChannelsResult</a>></code>

**이후:** 7.5.0

-------


## setCustomId(...)

```typescript
setCustomId(options: SetCustomIdOptions) => Promise<void>
```이 기기의 맞춤 ID를 설정하세요.

| 파람 | 유형 | 설명 |
| ------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------- |
| **`options`** | <code><a href="#setcustomidoptions">SetCustomIdOptions</a></code> | 설정할 {@link <a href="#setcustomidoptions">SetCustomIdOptions</a>} customId입니다 |

**이후:** 4.9.0

-------


## getBuiltinVersion()

```typescript
getBuiltinVersion() => Promise<BuiltinVersion>
```

구성에 설정된 경우 기본 앱 버전 또는 내장 버전을 가져옵니다.

**반환:** <code>약속<<a href="#builtinversion">BuiltinVersion</a>></code>

**이후:** 5.2.0

-------


## getDeviceId()

```typescript
getDeviceId() => Promise<DeviceId>
```

장치 식별에 사용되는 고유 ID 가져오기(자동 업데이트 서버로 전송)

**반환:** <code>약속<<a href="#deviceid">DeviceId</a>></code>

-------


## getPluginVersion()

```typescript
getPluginVersion() => Promise<PluginVersion>
```

기본 Capacitor 업데이터 플러그인 버전 가져오기(자동 업데이트 서버로 전송됨)

**반품:** <code>약속<<a href="#pluginversion">PluginVersion</a>></code>

-------


## isAutoUpdateEnabled()

```typescript
isAutoUpdateEnabled() => Promise<AutoUpdateEnabled>
```

자동 업데이트 구성 상태를 가져옵니다.

**반환:** <code>약속<<a href="#autoupdateenabled">AutoUpdateEnabled</a>></code>

-------


## 제거AllListeners()

```typescript
removeAllListeners() => Promise<void>
```

이 플러그인의 모든 리스너를 제거하세요.

**이후:** 1.0.0

-------


## addListener('다운로드', ...)

```typescript
addListener(eventName: 'download', listenerFunc: (state: DownloadEvent) => void) => Promise<PluginListenerHandle>
```

앱에서 번들 다운로드 이벤트를 수신합니다. 다운로드가 시작되면, 다운로드하는 동안, 완료되면 실행됩니다.
다운로드하는 동안 모든 다운로드 비율이 반환됩니다.

| 파람 | 유형 |
| ------------------ | ------------------------------------------------- |
| **`eventName`** | <code>'다운로드'</code> |
| **`listenerFunc`** | <code>(상태: <a href="#downloadevent">DownloadEvent</a>) => void</code> |

**반환:** <code>약속<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**이후:** 2.0.11

-------


## addListener('noNeedUpdate', ...)

```typescript
addListener(eventName: 'noNeedUpdate', listenerFunc: (state: NoNeedEvent) => void) => Promise<PluginListenerHandle>
```

업데이트할 필요 없는 이벤트를 수신합니다. 앱이 실행될 때마다 강제 확인을 원할 때 유용합니다.

| 파람 | 유형 |
| ------------------ | ---------------------------------------------------------- |
| **`eventName`** | <code>'업데이트 필요 없음'</code> |
| **`listenerFunc`** | <code>(상태: <a href="#noneedevent">NoNeedEvent</a>) => void</code> |**반환:** <code>약속<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**이후:** 4.0.0

-------


## addListener('updateAvailable', ...)

```typescript
addListener(eventName: 'updateAvailable', listenerFunc: (state: UpdateAvailableEvent) => void) => Promise<PluginListenerHandle>
```

사용 가능한 업데이트 이벤트를 수신합니다. 앱이 실행될 때마다 강제로 확인하려는 경우 유용합니다.

| 파람 | 유형 |
| ------------------ | --------------------------------------------------------------- |
| **`eventName`** | <code>'업데이트 가능'</code> |
| **`listenerFunc`** | <code>(상태: <a href="#updateavailableevent">UpdateAvailableEvent</a>) => void</code> |

**반환:** <code>약속<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**이후:** 4.0.0

-------


## addListener('downloadComplete', ...)

```typescript
addListener(eventName: 'downloadComplete', listenerFunc: (state: DownloadCompleteEvent) => void) => Promise<PluginListenerHandle>
```

downloadComplete 이벤트를 수신합니다.

| 파람 | 유형 |
| ------------------ | ----------------------------------------------------------------- |
| **`eventName`** | <code>'다운로드 완료'</code> |
| **`listenerFunc`** | <code>(상태: <a href="#downloadcompleteevent">DownloadCompleteEvent</a>) => void</code> |

**반환:** <code>약속<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**이후:** 4.0.0

-------


## addListener('majorAvailable', ...)

```typescript
addListener(eventName: 'majorAvailable', listenerFunc: (state: MajorAvailableEvent) => void) => Promise<PluginListenerHandle>
```

앱에서 주요 업데이트 이벤트를 수신하고, 비활성화AutoUpdateBreaking을 설정하여 주요 업데이트가 차단되면 알려줍니다.

| 파람 | 유형 |
| ------------------ | -------------------------------------------------------------------------- |
| **`eventName`** | <code>'주요 사용 가능'</code> |
| **`listenerFunc`** | <code>(상태: <a href="#majoravailableevent">MajorAvailableEvent</a>) => void</code> |

**반환:** <code>약속<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**이후:** 2.3.0

-------


## addListener('updateFailed', ...)

```typescript
addListener(eventName: 'updateFailed', listenerFunc: (state: UpdateFailedEvent) => void) => Promise<PluginListenerHandle>
```

앱에서 업데이트 실패 이벤트를 수신하고 다음 앱 시작 시 업데이트 설치에 실패하면 알려줍니다.

| 파람 | 유형 |
| ------------------ | ---------------------------------------------------------------------- |
| **`eventName`** | <code>'업데이트 실패'</code> |
| **`listenerFunc`** | <code>(상태: <a href="#updatefailedevent">UpdateFailedEvent</a>) => void</code> |**반환:** <code>약속<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**이후:** 2.3.0

-------


## addListener('다운로드실패', ...)

```typescript
addListener(eventName: 'downloadFailed', listenerFunc: (state: DownloadFailedEvent) => void) => Promise<PluginListenerHandle>
```

앱에서 다운로드 실패 이벤트를 수신하고, 번들 다운로드가 실패하면 알려줍니다.

| 파람 | 유형 |
| ------------------ | -------------------------------------------------------------------------- |
| **`eventName`** | <code>'다운로드 실패'</code> |
| **`listenerFunc`** | <code>(상태: <a href="#downloadfailedevent">DownloadFailedEvent</a>) => void</code> |

**반환:** <code>약속<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**이후:** 4.0.0

-------


## addListener('appReloaded', ...)

```typescript
addListener(eventName: 'appReloaded', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

앱에서 다시 로드 이벤트를 수신하고 다시 로드가 발생하면 알려줍니다.

| 파람 | 유형 |
| ------------------ | ------------- |
| **`eventName`** | <code>'appReloaded'</code> |
| **`listenerFunc`** | <code>() => void</code> |

**반환:** <code>약속<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**이후:** 4.3.0

-------


## addListener('appReady', ...)

```typescript
addListener(eventName: 'appReady', listenerFunc: (state: AppReadyEvent) => void) => Promise<PluginListenerHandle>
```

앱에서 앱 준비 이벤트를 수신하고 앱을 사용할 준비가 되면 알려줍니다.

| 파람 | 유형 |
| ------------------ | ------------------------------------------------- |
| **`eventName`** | <code>'appReady'</code> |
| **`listenerFunc`** | <code>(상태: <a href="#appreadyevent">AppReadyEvent</a>) => void</code> |

**반환:** <code>약속<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**이후:** 5.1.0

-------


## isAutoUpdateAvailable()

```typescript
isAutoUpdateAvailable() => Promise<AutoUpdateAvailable>
```

자동 업데이트가 가능한지 확인합니다(serverUrl에 의해 비활성화되지 않음).

**반품:** <code>약속<<a href="#autoupdateavailable">AutoUpdateAvailable</a>></code>

-------


## getNextBundle()

```typescript
getNextBundle() => Promise<BundleInfo | null>
```

앱이 다시 로드될 때 사용될 다음 번들을 가져옵니다.
다음 번들이 설정되지 않은 경우 null을 반환합니다.

**반품:** <code>약속<<a href="#bundleinfo">BundleInfo</a> | null></code>

**이후:** 6.8.0

-------


## setShakeMenu(...)

```typescript
setShakeMenu(options: SetShakeMenuOptions) => Promise<void>
```

디버깅/테스트 목적으로 흔들기 메뉴를 활성화 또는 비활성화합니다.| 파람 | 유형 | 설명 |
| ------------- | ------------------------------------------------------ | ------------------------------------------- |
| **`options`** | <code><a href="#setshakemenuoptions">SetShakeMenuOptions</a></code> | 흔들기 메뉴를 활성화하거나 비활성화하는 활성화된 부울이 포함되어 있습니다.

**이후:** 7.5.0

-------


## isShakeMenuEnabled()

```typescript
isShakeMenuEnabled() => Promise<ShakeMenuEnabled>
```

쉐이크 메뉴의 현재 상태를 가져옵니다.

**반품:** <code>약속<<a href="#shakemenuenabled">ShakeMenuEnabled</a>></code>

**이후:** 7.5.0

-------


## 인터페이스


### 앱준비결과

| 소품 | 유형 |
| ------------ | ------------------------------------------------- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> |


### 번들정보

| 소품 | 유형 |
| ---------------- | ---------------------------------------- |
| **`id`** | <code>string</code> |
| **`version`** | <code>string</code> |
| **`downloaded`** | <code>string</code> |
| **`checksum`** | <code>string</code> |
| **`status`** | <code><a href="#bundlestatus">BundleStatus</a></code> |


### 업데이트 URL

| 소품 | 유형 |
| --------- | ------ |
| **`url`** | <code>string</code> |


### 통계 URL

| 소품 | 유형 |
| --------- | ------ |
| **`url`** | <code>string</code> |


### 채널 URL

| 소품 | 유형 |
| --------- | ------ |
| **`url`** | <code>string</code> |


### 다운로드 옵션

이 URL과 버전은 서버에서 번들을 다운로드하는 데 사용됩니다. 백엔드를 사용하는 경우 모든 정보는 getLatest 메소드를 통해 제공됩니다.
백엔드를 사용하지 않는 경우 번들의 URL과 버전을 제공해야 합니다. CLI 명령 encrypt를 사용하여 번들을 암호화한 경우 체크섬 및 sessionKey가 필요하며 명령의 결과로 이를 받아야 합니다.| 소품 | 유형 | 설명 | 기본값 | 이후 |
| ---------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------- | --------- | ----- |
| **`url`** | <code>string</code> | 다운로드할 번들 zip 파일(예: dist.zip)의 URL입니다. (이는 임의의 URL일 수 있습니다. 예: Amazon S3, GitHub 태그, 번들을 호스팅한 기타 장소.) |                        |       |
| **`version`** | <code>string</code> | 이 번들/버전의 버전 코드/이름 |                        |       |
| **`sessionKey`** | <code>string</code> | 업데이트용 세션 키(번들이 세션 키로 암호화된 경우) | <code>정의되지 않음</code> | 4.0.0 |
| **`checksum`** | <code>string</code> | 업데이트에 대한 체크섬은 sha256에 있어야 하며 번들이 암호화된 경우 개인 키로 암호화되어야 합니다. | <code>정의되지 않음</code> | 4.0.0 |
| **`manifest`** | <code>매니페스트 항목[]</code> | 델타(매니페스트) 다중 파일 다운로드용 매니페스트 | <code>정의되지 않음</code> | 6.1.0 |


### 매니페스트 항목

| 소품 | 유형 |
| ------------------ | -------------- |
| **`file_name`** | <code>string \| null</code> |
| **`file_hash`** | <code>string \| null</code> |
| **`download_url`** | <code>string \| null</code> |


### 번들 ID

| 소품 | 유형 |
| -------- | ------ |
| **`id`** | <code>string</code> |


### BundleListResult

| 소품 | 유형 |
| ------------- | ------------ |
| **`bundles`** | <code>번들정보[]</code> |


### 목록 옵션| 소품 | 유형 | 설명 | 기본값 | 이후 |
| --------- | ------- | ------------------------------------------------------------------------------------------------------------------- | ------------------ | ------ |
| **`raw`** | <code>boolean</code> | 원시 번들 목록을 반환할지 아니면 매니페스트를 반환할지 여부입니다. true인 경우 목록은 디스크의 파일 대신 내부 데이터베이스를 읽으려고 시도합니다. | <code>false</code> | 6.14.0 |


### 재설정 옵션

| 소품 | 유형 |
| --------- | ------- |
| **`toLastSuccessful`** | <code>boolean</code> |


### 현재 번들 결과

| 소품 | 유형 |
| ------------ | ------------------------------------------------- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> |
| **`native`** | <code>string</code> |


### 다중 지연 조건

| 소품 | 유형 |
| -------- | ---------------- |
| **`delayConditions`** | <code>지연 조건[]</code> |


### 지연조건

| 소품 | 유형 | 설명 |
| ----------- | -------------------------------------------- | --------------------------- |
| **`kind`** | <code><a href="#delayuntilnext">DelayUntilNext</a></code> | setMultiDelay에서 지연 조건 설정 |
| **`value`** | <code>string</code> |                                          |


### 최신 버전| 소품 | 유형 | 설명 | 이후 |
| ---------------- | --------------- | ------------- | ----- |
| **`version`** | <code>string</code> | getLatest 메소드의 결과 | 4.0.0 |
| **`checksum`** | <code>string</code> |                            | 6 |
| **`major`** | <code>boolean</code> |                            |       |
| **`message`** | <code>string</code> |                            |       |
| **`sessionKey`** | <code>string</code> |                            |       |
| **`error`** | <code>string</code> |                            |       |
| **`old`** | <code>string</code> |                            |       |
| **`url`** | <code>string</code> |                            |       |
| **`manifest`** | <code>매니페스트 항목[]</code> |                            | 6.1 |


### GetLatestOptions

| 소품 | 유형 | 설명 | 기본값 | 이후 |
| ------------- | ------ | --------------------------------------------------------------------- | --------- | ----- |
| **`channel`** | <code>string</code> | 최신 버전을 얻으려면 채널이 작동하려면 'self_sign'을 허용해야 합니다 | <code>정의되지 않음</code> | 6.8.0 |


### 채널 해상도

| 소품 | 유형 | 설명 | 이후 |
| ------------- | ------ | ---------------- | ----- |
| **`status`** | <code>string</code> | 설정된 채널 현황 | 4.7.0 |
| **`error`** | <code>string</code> |                               |       |
| **`message`** | <code>string</code> |                               |       |


### 채널 옵션 설정

| 소품 | 유형 |
| ---------- | ------- |
| **`channel`** | <code>string</code> |
| **`triggerAutoUpdate`** | <code>boolean</code> |


### UnsetChannelOptions

| 소품 | 유형 |
| ---------- | ------- |
| **`triggerAutoUpdate`** | <code>boolean</code> |


### GetChannelRes| 소품 | 유형 | 설명 | 이후 |
| -------------- | ------- | ---------------- | ----- |
| **`channel`** | <code>string</code> | 채널 확보 현황 | 4.8.0 |
| **`error`** | <code>string</code> |                               |       |
| **`message`** | <code>string</code> |                               |       |
| **`status`** | <code>string</code> |                               |       |
| **`allowSet`** | <code>boolean</code> |                               |       |


### ListChannelsResult

| 소품 | 유형 | 설명 | 이후 |
| -------------- | ------------- | ------------- | ----- |
| **`channels`** | <code>채널정보[]</code> | 사용 가능한 채널 목록 | 7.5.0 |


### 채널정보

| 소품 | 유형 | 설명 | 이후 |
| ------- | ------- | ---------------------------------- | ----- |
| **`id`** | <code>string</code> | 채널 ID | 7.5.0 |
| **`name`** | <code>string</code> | 채널 이름 | 7.5.0 |
| **`public`** | <code>boolean</code> | true인 경우 이는 기본/대체 채널입니다. 장치는 공개 채널에 자체 할당할 수 없습니다. 대신, 장치가 채널 재정의를 제거하면(`unsetChannel()` 사용) 일치하는 공개 채널에서 자동으로 업데이트를 받게 됩니다. | 7.5.0 |
| **`allow_self_set`** | <code>boolean</code> | true인 경우 장치는 `setChannel()`를 사용하여 이 채널에 명시적으로 자체 할당할 수 있습니다. 이는 일반적으로 베타 테스트, A/B 테스트 또는 선택 업데이트 트랙에 사용됩니다. | 7.5.0 |


### SetCustomIdOptions

| 소품 | 유형 |
| -------------- | ------ |
| **`customId`** | <code>string</code> |


### 내장 버전

| 소품 | 유형 |
| ------------- | ------ |
| **`version`** | <code>string</code> |


### 장치 ID

| 소품 | 유형 |
| -------------- | ------ |
| **`deviceId`** | <code>string</code> |


### 플러그인 버전

| 소품 | 유형 |
| ------------- | ------ |
| **`version`** | <code>string</code> |


### 자동 업데이트가 활성화되었습니다.

| 소품 | 유형 |
| ------------- | ------- |
| **`enabled`** | <code>boolean</code> |


### 플러그인리스너핸들

| 소품 | 유형 |
| ------------ | ---------------------------- |
| **`remove`** | <code>() => 약속<void></code> |


### 다운로드 이벤트| 소품 | 유형 | 설명 | 이후 |
| ------------- | ------------------------------------------------- | --------------------------------- | ----- |
| **`percent`** | <code>번호</code> | 현재 다운로드 상태(0~100) | 4.0.0 |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> |                                                |       |


### NoNeed이벤트

| 소품 | 유형 | 설명 | 이후 |
| ------------ | ------------------------------------------------- | --------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | 현재 다운로드 상태(0~100) | 4.0.0 |


### UpdateAvailableEvent

| 소품 | 유형 | 설명 | 이후 |
| ------------ | ------------------------------------------------- | --------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | 현재 다운로드 상태(0~100) | 4.0.0 |


### 다운로드완료이벤트

| 소품 | 유형 | 설명 | 이후 |
| ------------ | ------------------------------------------------- | ----------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | 새 업데이트가 제공되면 내보냅니다. | 4.0.0 |


### MajorAvailableEvent

| 소품 | 유형 | 설명 | 이후 |
| ------------- | ------ | ----------------------------- | ----- |
| **`version`** | <code>string</code> | 새로운 주요 번들을 사용할 수 있을 때 내보냅니다. | 4.0.0 |


### 업데이트실패이벤트

| 소품 | 유형 | 설명 | 이후 |
| ------------ | ------------------------------------------------- | ------------------------ | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | 업데이트 설치에 실패하면 내보냅니다. | 4.0.0 |


### 다운로드 실패 이벤트

| 소품 | 유형 | 설명 | 이후 |
| ------------- | ------ | ------------- | ----- |
| **`version`** | <code>string</code> | 다운로드가 실패하면 내보냅니다. | 4.0.0 |


### 앱준비이벤트| 소품 | 유형 | 설명 | 이후 |
| ------------ | ------------------------------------------------- | ------------------------ | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | 앱을 사용할 준비가 되면 발생합니다. | 5.2.0 |
| **`status`** | <code>string</code> |                                       |       |


### 자동 업데이트 가능

| 소품 | 유형 |
| --------------- | ------- |
| **`available`** | <code>boolean</code> |


### SetShakeMenuOptions

| 소품 | 유형 |
| ------------- | ------- |
| **`enabled`** | <code>boolean</code> |


### ShakeMenu활성화됨

| 소품 | 유형 |
| ------------- | ------- |
| **`enabled`** | <code>boolean</code> |


## 유형 별칭


### 번들상태

보류 중: 번들이 다음 번들로 **설정**되도록 보류 중입니다.
downloading: 번들이 다운로드 중입니다.
성공: 번들이 다운로드되었으며 다음 번들로 **설정**될 준비가 되었습니다.
오류: 번들을 다운로드하지 못했습니다.

<code>'성공' | '오류' | '보류 중' | '다운로드 중'</code>


### 다음까지 지연

<code>'배경' | '죽이다' | '네이티브 버전' | '날짜'</code>

</docgen-api>
