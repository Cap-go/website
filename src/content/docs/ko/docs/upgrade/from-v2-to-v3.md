---
title: V2에서 V3로
description: V2에서 V3로 업그레이드 하는 방법
sidebar:
  order: 4
locale: ko
---

auto-update 버전 3으로 업그레이드하는 방법을 설명하는 문서입니다.

## 먼저 최신 도구로 마이그레이션하세요:

```bash
npm remove -g capgo
npm remove capacitor-updater

npm i @capgo/cli
npm i @capgo/capacitor-updater@3
npx cap sync
```

## 이전 구성을 모두 제거하세요:

```json
{
  CapacitorUpdater: {
      autoUpdateURL: "https",
      
  },
}
```

다음과 같이만 남기세요:

```json
{
  "CapacitorUpdater": {
    "autoUpdate": true
  }
}
```

> ⚠️ `autoUpdateURL`로 자체 서버를 사용 중이었다면, 곧 이 가이드를 업데이트하겠습니다. 그동안 새로운 업로드 옵션 `external`을 확인해보세요. 이를 통해 Capgo 클라우드에 코드를 저장하지 않고 zip 파일의 링크만 전송할 수 있습니다. 엄격한 개인정보 보호 정책을 가진 기업을 위해 만들어졌습니다. external 모드에서는 코드가 Capgo 서버에 저장되지 않고, URL만 저장하여 기기로 전송하면 직접 다운로드합니다. 표준 방식에서는 코드가 압축되어 서버에 저장되지만, 우리는 절대 열어보거나 사용하지 않습니다.

## 변경사항

auto-update의 모든 구성이 서버 측으로 이동하여 사용자에게 업데이트를 보내는 방법을 더 잘 제어할 수 있습니다.

이를 통해 채널을 사용하여 한 사용자에게만 배포하거나 되돌리기가 가능합니다! 이러한 설정들이 웹 인터페이스에 추가되었습니다:

* 네이티브 아래에서 되돌리기 비활성화
* 메이저 버전 이상 업데이트 비활성화

> ⚠️ 모든 채널에서 기본적으로 true가 됩니다

이로 인해 플러그인을 자주 업데이트할 필요가 없어지며, 대부분의 업데이트는 서버 측에서 이루어지므로 사용자 측에서 변경 없이 적용됩니다

> ⚠️ 업데이트가 기본값이 되면 리셋됩니다. 스토어에서 업데이트할 때 모든 다운로드 버전을 제거하지 않으려면 다음과 같이 설정하세요:

```json
{
  "CapacitorUpdater": {
    "autoUpdate": true,
    "resetWhenUpdate": false
  }
}
```

## 코드 업데이트

마지막으로, JS의 모든 임포트를 다음과 같이 업데이트하세요:

```
import { CapacitorUpdater } from 'capacitor-updater'
```

에서

```
import { CapacitorUpdater } from '@capgo/capacitor-updater'
```

로 변경하세요.

그런 다음 코드를 다시 빌드하고 `npm run build` 자산을 다시 복사하세요 `npx cap copy`

이제 최신 auto-update 시스템을 테스트할 수 있습니다

다음 명령으로 버전을 전송하세요:

```
npx @capgo/cli@latest upload
```

다음 대신:

```
npx capgo upload
```

## 향후 발전 방향

현재는 첫 번째 공개 채널만 사용 중이지만, 향후에는 여러 공개 채널이 설정된 경우 public이 다중 공개 채널로 변경될 예정입니다

## 일반적인 문제:

* 업그레이드 후 빌드 문제: 플러그인의 소스 코드를 Android Studio나 Xcode에서 이미 열어본 경우, 때로는 동기화가 제거하지 못할 수 있습니다. 네이티브 IDE를 열고 `capacitor-updater`를 수동으로 제거한 후 `npx cap sync`를 실행하면 해결될 것입니다