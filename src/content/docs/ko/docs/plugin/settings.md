---
title: 설정
description: Capacitor Updater에 사용 가능한 모든 구성
sidebar:
  order: 8
locale: ko
---

업데이트 시스템을 더 세밀하게 제어하려면 다음 설정으로 구성할 수 있습니다:

## `appReadyTimeout` 

> 네이티브 플러그인이 업데이트를 '실패'로 간주하기 전에 대기할 밀리초 수를 구성합니다

Android와 iOS에서만 사용 가능

기본값: `10000` (10초)

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

> 네이티브 플러그인이 API 타임아웃으로 간주하기 전에 대기할 밀리초 수를 구성합니다

Android와 iOS에서만 사용 가능

기본값: `20` (20초)

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

> 플러그인이 실패한 번들을 자동으로 삭제할지 여부를 구성합니다

Android와 iOS에서만 사용 가능

기본값: `true`

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

> 성공적인 업데이트 후 플러그인이 이전 번들을 자동으로 삭제할지 여부를 구성합니다

Android와 iOS에서만 사용 가능

기본값: `true`

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

> 플러그인이 업데이트 서버를 통한 자동 업데이트를 사용할지 여부를 구성합니다

Android와 iOS에서만 사용 가능

기본값: `true`

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

> 업데이트 확인이 전송되는 URL/엔드포인트를 구성합니다

Android와 iOS에서만 사용 가능

기본값: `https://apicapgo.app/updates`

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

> 업데이트 통계가 전송되는 URL/엔드포인트를 구성합니다

Android와 iOS에서만 사용 가능. 통계 보고를 비활성화하려면 ""로 설정

기본값: `https://apicapgo.app/stats`

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

> 엔드-투-엔드 라이브 업데이트 암호화를 위한 개인 키를 구성합니다

Android와 iOS에서만 사용 가능

`npx @capgo/cli key create` 명령으로 개인 키 생성

기본값: `undefined`

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

> 앱이 방금 업데이트/설치되었을 때 플러그인이 직접 업데이트를 설치하도록 합니다. 자동 업데이트 모드에서만 적용됩니다

Android와 iOS에서만 사용 가능

기본값: `undefined`

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
스토어 업데이트가 발생할 때, 네이티브 버전으로의 강제 재설정을 비활성화합니다
:::

[웹 앱](https://webcapgo.app/login)에서만 사용 가능한 더 많은 설정이 있습니다

플러그인을 구성하려면 다음 설정을 사용하세요:

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
앱이 방금 업데이트/설치되었을 때 플러그인이 직접 업데이트를 설치하도록 합니다. 자동 업데이트 모드에서만 적용됩니다

:::caution
이 설정은 업데이트가 설치되는 동안 사용자로부터 앱을 숨길 것을 요구합니다. 그렇지 않으면 사용자가 탐색하는 동안 앱이 재설정됩니다
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
앱의 기본 채널을 설정합니다. 채널이 덮어쓰기를 허용하는 경우 Capgo에 설정된 다른 모든 채널을 재정의합니다

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
앱의 appId를 설정합니다. 다른 모든 appId 획득 방법을 재정의합니다. Capgo와 네이티브 코드에서 다른 appId를 사용하고 싶을 때 유용합니다
:::note
이것은 appId를 설정하는 새로운 방법입니다. 기존 방법도 계속 지원됩니다
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
앱의 버전을 설정합니다. 다른 모든 버전 획득 방법을 재정의합니다. Capgo와 네이티브 코드에서 다른 버전을 사용하고 싶을 때 유용합니다
:::note
이것은 버전을 설정하는 새로운 방법입니다. 기존 방법도 계속 지원됩니다
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