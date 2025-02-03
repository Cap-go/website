---
title: 자동 업데이트
description: Capacitor-Updater를 사용한 자동 업데이트 방법
sidebar:
  order: 2
locale: ko
---

이 모드를 사용하면 개발자가 자동 업데이트 모드로 capacitor-updater를 사용하고 Capgo 채널이나 동등한 수준에서 업데이트를 푸시할 수 있습니다.

### 전제 조건

Capgo 자동 업데이트를 사용하기 전에 앱 버전이 [https://semverorg/](https://semverorg/)를 사용하는지 확인하세요.

이는 Capgo에서 버전을 관리하는 데 사용하는 규칙입니다.

앱에서 버전을 설정하는 두 가지 방법이 있습니다:

새로운 방법: `capacitorconfigjson` 파일에서 `version` 필드 사용

```json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true, // 자동 업데이트 활성화, 기본값은 true
      "appId": "comexampleapp", // 서버에서 앱을 식별하는데 사용
      "version": "100" // 업데이트 확인에 사용
    }
  }
}
```
이러한 옵션은 플러그인이 업데이트를 확인하고 CLI가 버전을 업로드하는 데 사용됩니다.

이전 방법:
프로젝트의 3개 파일에서:

* `packagejson`의 **version**
* `android/app/buildgradle`의 **versionName**
* `ios/App/Appxcodeproj/projectpbxproj`의 **CURRENT\_PROJECT\_VERSION**

### 튜토리얼

5분 만에 앱 설정하기

[Update your capacitor apps seamlessly using capacitor updater](https://capgoapp/blog/update-your-capacitor-apps-seamlessly-using-capacitor-updater)

5분 만에 CI 설정하기

[Automatic build and release with GitHub actions](https://capgoapp/blog/automatic-build-and-release-with-github-actions)

### 설치

```bash
npm install @capgo/capacitor-updater
npx cap sync
```

### 소개

계정을 만들려면 [register](https://capgoapp)를 클릭하세요.

서버에서 채널과 버전 등을 관리할 수 있습니다.

`autoUpdate`는 Capgo 서버를 식별하기 위해 `capacitorconfig`의 데이터를 사용합니다.

:::note
회사에서 허용하지 않는 경우 코드를 서버로 보내지 않고도 Capgo Cloud를 계속 사용할 수 있습니다.
:::

#### 버전 확인

자동 업데이트가 설정되면 앱이 활성 상태이고 준비되었음을 JS에서 알려야 합니다.

이는 앱 내에서 `notifyAppReady`를 호출하여 수행할 수 있습니다.

가능한 한 빨리 수행하세요.

```ts
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdaternotifyAppReady()
```

#### 사용자 흐름
* 사용자가 앱을 열면 앱이 서버에 업데이트를 확인하고, 업데이트가 발견되면 백그라운드에서 다운로드됩니다.
* 사용자가 앱을 나가면 새 버전이 활성 상태로 설정됩니다.
* 사용자가 다시 앱을 열면 새로운 활성 버전을 로드하고 기본값으로 설정합니다.
* `notifyAppReady()`가 호출되면 사용자가 앱을 나갈 때 이전 버전이 삭제됩니다.
* 사용자는 다음 업데이트 주기까지 앱의 정상적인 흐름을 계속합니다.

:::danger
⚠️ 앱에서 `notifyAppReady()`를 호출하지 않으면 현재 버전이 무효로 표시되고 이전 유효한 번들이나 기본 버전으로 되돌아갑니다.
:::

#### 개발 흐름

새로운 기능을 개발할 때는 capgo가 최신 업데이트 번들로 작업을 지속적으로 덮어쓰므로 `autoUpdate`를 차단해야 합니다.
구성에서 `autoUpdate`를 false로 설정하세요.
어떤 이유로든 업데이트에 문제가 있다면 앱을 삭제하고 다시 설치할 수 있습니다.
그렇게 하기 전에 구성에서 `autoUpdate`를 false로 설정해야 합니다.
그런 다음 Xcode나 Android studio로 다시 빌드하세요.

각 커밋에서 버전을 업로드하려면 이 가이드로 CI/CD를 설정하세요.

[Automatic build and release with GitHub actions](https://capgoapp/blog/automatic-build-and-release-with-github-actions)

#### Major Available 이벤트

`disableAutoUpdateBreaking`이 true로 설정되면 앱이 주요 브레이킹 업데이트를 거부할 때를 알기 위해 이벤트를 수신할 수 있습니다.

```jsx
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdateraddListener('majorAvailable', (info: any) => {
  consolelog('majorAvailable was fired', infoversion)
})
```