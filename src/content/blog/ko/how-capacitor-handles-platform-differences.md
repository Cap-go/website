---
slug: how-capacitor-handles-platform-differences
title: Comment Capacitor gère les différences entre les plateformes
description: iOS와 Android를 위한 단일 코드베이스를 사용하여 모바일 앱 개발에서 플랫폼 차이를 효과적으로 관리하는 방법을 알아보세요.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-25T02:08:36.160Z
updated_at: 2025-03-25T02:08:56.741Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67e200987856e801f1f26fa8-1742868536741.jpg
head_image_alt: 모바일 개발
keywords: >-
  Capacitor, mobile development, cross-platform, iOS, Android, custom plugins,
  UI design, live updates
tag: 'Development, Mobile, Updates'
published: true
locale: ko
next_blog: ''
---

[Capacitor](https://capacitorjscom/)는 개발자가 iOS와 Android 앱을 동일한 코드베이스로 개발하면서 플랫폼별 차이점을 해결할 수 있도록 도와줍니다. 네이티브 기능 통합을 단순화하고, 플랫폼 가이드라인을 준수하며, 성능을 최적화합니다. 주요 특징:

-   **플랫폼 감지**: `Capacitor.getPlatform()`을 사용하여 플랫폼별 코드 적용
-   **내장 플러그인**: 카메라, 스토리지, 위치 정보와 같은 기능을 위한 통합 API
-   **커스텀 플러그인**: 고유 요구사항을 위한 네이티브 코드 추가
-   **UI 조정**: iOS([SF Symbols](https://developer.apple.com/sf-symbols/), 둥근 버튼)와 Android([Material Icons](https://developers.google.com/fonts/docs/material_icons), 좌측 정렬 버튼)의 디자인 규칙 준수
-   **설정**: `capacitor.config.json`에서 양 플랫폼의 설정 조정
-   **[Capgo](https://capgo.app/)를 통한 실시간 업데이트**: 앱 스토어 지연 없이 즉시 업데이트 배포, 24시간 내 최대 95% 사용자 적용 달성

### 빠른 비교

| 기능 | iOS | Android |
| --- | --- | --- |
| **내비게이션** | 하단 탭 바, 왼쪽 뒤로 가기 버튼 | 상단 내비게이션 드로어, 하단 내비게이션 |
| **타이포그래피** | San Francisco 폰트 | Roboto 폰트 |
| **플러그인(예: 카메라)** | [AVFoundation](https://developer.apple.com/documentation/avfoundation/) | [Camera2 API](https://developer.android.com/media/camera/camera2) |
| **빌드 결과물** | `ipa` 파일 | `aab` 또는 `apk` 파일 |

Capacitor는 웹과 네이티브 앱 개발 사이의 간극을 연결하여, 플랫폼별 최적화를 유지하면서 크로스 플랫폼 앱을 더 쉽게 만들 수 있게 합니다.

## 크로스 플랫폼 개발: CapacitorJS 탐구

<Steps>

## [Capacitor](https://capacitorjs.com/)의 플랫폼 코드 처리 방식

![Capacitor](https://mars-images.imgix.net/seobot/screenshots/capacitorjs.com-4c1a6a7e452082d30f5bff9840b00b7d-2025-03-25.jpg?auto=compress)

Capacitor는 플랫폼별 코드를 관리하는 도구를 제공하여, 개발자가 단일 API를 사용하여 iOS와 Android를 위한 맞춤형 경험을 만들 수 있게 합니다.

### 코드에서 플랫폼 감지

Capacitor의 내장 플랫폼 API를 사용하면 현재 플랫폼을 감지하는 것이 간단합니다. `Capacitor.getPlatform()` 메서드는 실행 환경을 식별하여 조건부 로직을 쉽게 적용할 수 있게 합니다:

이 접근 방식은 [생체 인증](https://capgo.app/plugins/capacitor-native-biometric/)과 같은 기능에서 특히 유용하며, iOS는 [Face ID](https://en.wikipedia.org/wiki/Face_ID)를 사용하고 Android는 지문 인증을 사용합니다. 플랫폼 감지와 함께 Capacitor의 내장 플러그인은 네이티브 통합을 단순화합니다.

### 내장 플랫폼 기능

Capacitor는 플랫폼별 차이를 원활하게 처리하는 핵심 플러그인 세트를 제공합니다. 이러한 플러그인은 일관된 JavaScript 인터페이스를 제공하면서 네이티브 구현의 복잡성을 관리합니다:

| 플러그인 | iOS 구현 | Android 구현 |
| --- | --- | --- |
| 카메라 | AVFoundation | Camera2 API |
| 스토리지 | UserDefaults | SharedPreferences |
| 위치 정보 | CoreLocation | LocationManager |

각 플러그인은 자동으로 플랫폼의 네이티브 API를 사용하여 원활한 성능과 기능을 보장합니다.

### 커스텀 플랫폼 플러그인 만들기

내장 플러그인이 요구사항을 충족하지 못하는 경우, 특정 네이티브 API에 접근하기 위한 커스텀 플러그인을 만들 수 있습니다. 방법은 다음과 같습니다:

1.  **플러그인 정의**

2.  **네이티브 코드 추가**

3.  **플랫폼 핸들러 구현**

    -   **iOS (Swift):**

    -   **Android (Kotlin):**

커스텀 플러그인을 통해 일관되고 사용하기 쉬운 API를 유지하면서 네이티브 기능에 접근할 수 있습니다. 이를 통해 개발 프로세스를 복잡하게 만들지 않으면서 성능과 기능을 보장할 수 있습니다.

## 플랫폼별 UI 가이드라인

### iOS vs Android 디자인 규칙

iOS와 Android를 위한 디자인을 할 때는 네이티브 디자인 패턴을 따르는 것이 중요합니다.각 플랫폼의 사용자들은 내비게이션, 타이포그래피, 버튼, 헤더, 아이콘과 같은 요소들에 대해 서로 다른 기대를 가지고 있습니다. 다음은 그 비교입니다:

| 디자인 요소 | iOS | Android |
| --- | --- | --- |
| **내비게이션** | 하단 탭 바, 좌측 뒤로 가기 버튼 | 상단 내비게이션 드로어, 하단 내비게이션 |
| **타이포그래피** | San Francisco 폰트 | Roboto 폰트 |
| **버튼** | 둥근 사각형, 중앙 정렬 텍스트 | Material Design 버튼, 좌측 정렬 텍스트 |
| **헤더** | 큰 제목, 중앙 정렬 | 앱 바, 좌측 정렬 |
| **아이콘** | SF Symbols | Material Icons |

### 크로스 플랫폼 디자인 표준

각 플랫폼은 고유한 규칙이 있지만, 양쪽 모두에서 일관된 브랜드 정체성을 유지하는 것이 중요합니다. 다음은 일관성을 보장하는 방법입니다:

```typescript
import { Capacitor } from '@capacitor/core';

const platform = Capacitor.getPlatform();
if (platform === 'ios') {
  // Code specific to iOS
} else if (platform === 'android') {
  // Code specific to Android
}
```

Capacitor를 사용하면 기능의 일관성을 유지하면서 플랫폼별 UI 컴포넌트를 통합할 수 있습니다. 또한 다크 모드와 동적 타입과 같은 시스템 전반의 설정을 관리하는 데도 도움이 됩니다. 프로세스를 완료하려면 플랫폼별 빌드 설정이 이러한 가이드라인과 일치하는지 확인하세요.

## 플랫폼 설정 및 구성

플랫폼 코드를 관리한 후에는 iOS와 Android 모두에서 앱이 원활하게 실행되도록 적절한 구성이 필수적입니다.

### `capacitorconfigjson`의 플랫폼 설정

`capacitorconfigjson` 파일을 사용하여 주요 플랫폼별 설정을 정의하세요:

```typescript
    @Plugin({
      name: 'CustomFeature',
      platforms: ['ios', 'android']
    })
    ```

고려해야 할 구성 옵션들입니다:

| 옵션 | iOS | Android |
| --- | --- | --- |
| **딥 링크** | `scheme` 속성 | `androidScheme` 속성 |
| **상태 바** | `statusBarstyle` | `statusBarbackgroundColor` |
| **키보드** | `keyboardresize` | `keyboardresize`, `keyboardstyle` |
| **스플래시 스크린** | `splashScreenlaunchShowDuration` | `splashScreenlayoutName` |

런타임 설정이 완료되면 각 플랫폼의 성능을 향상시키기 위해 빌드 설정을 조정하세요.

### 플랫폼별 빌드 설정

iOS와 Android를 위해 빌드 설정을 최적화하세요.

iOS의 경우 `Infoplist` 파일을 업데이트하세요:

```typescript
    @PluginMethod()
    async customFunction(): Promise<void> {
      if (Capacitor.getPlatform() === 'ios') {
        // Add iOS-specific code
      } else {
        // Add Android-specific code
      }
    }
    ```

Android의 경우 `android/app/buildgradle`을 수정하세요:

```swift
        @objc func customFunction(_ call: CAPPluginCall) {
          // Add native iOS functionality
        }
        ```

주요 빌드 고려사항들입니다:

| 측면 | iOS | Android |
| --- | --- | --- |
| **권한** | `Infoplist`에 항목 추가 | `AndroidManifestxml`에 정의 |
| **아이콘** | 20px에서 1024px 크기 | mdpi에서 xxxhdpi 밀도 |
| **스플래시 스크린** | Storyboard 기반 | Layout XML 기반 |
| **빌드 출력** | `ipa` 파일 | `aab` 또는 `apk` 파일 |

## [Capgo](https://capgoapp/)로 앱 업데이트하기

![Capgo](https://mars-imagesimgixnet/seobot/screenshots/capgoapp-26aea05b7e2e737b790a9becb40f7bc5-2025-03-25jpg?auto=compress)

iOS와 Android 모두에서 [Capacitor 앱](https://capgoapp/blog/capacitor-comprehensive-guide/)을 효율적으로 업데이트하는 것이 중요합니다. Capgo는 양쪽 플랫폼의 가이드라인에 맞는 실시간 업데이트 시스템을 제공합니다.

### Capgo 기능

| 기능 | 설명 | 플랫폼 이점 |
| --- | --- | --- |
| **실시간 업데이트** | 앱스토어 심사 없이 즉시 배포 | iOS와 Android에서 통일된 경험 보장 |
| **종단간 암호화** | 업데이트 전송 보안 | 양쪽 플랫폼의 보안 요구사항 충족 |
| **[채널 시스템](https://capgoapp/docs/plugin/cloud-mode/channel-system/)** | 특정 사용자 그룹 타겟팅 | 베타 테스트와 단계적 출시 지원 |
| **부분 업데이트** | 수정된 콘텐츠만 다운로드 | 대역폭 절약과 업데이트 속도 향상 |

Capgo는 2억 3천5백만 건의 업데이트를 제공했으며, 24시간 내 95%의 활성 사용자 업데이트율을 달성했습니다 [\[1\]](https://capgoapp/) 이러한 기능들은 플랫폼 전반에서 [업데이트 관리](https://capgoapp/docs/plugin/cloud-mode/manual-update/)를 더 원활하고 효율적으로 만듭니다.

### Capgo 플랫폼 관리

Capgo의 채널 시스템은 업데이트 관리를 더 쉽게 만듭니다. 개발자는 iOS 특정 기능을 베타 사용자와 테스트하고, Android 업데이트를 단계적으로 출시하며, 성능 지표를 원활하게 추적할 수 있습니다.

이 플랫폼은 Apple과 Google의 무선 업데이트 요구사항을 준수합니다 [\[1\]](https://capgoapp/)현재 750개의 프로덕션 앱이 Capgo를 사용하고 있으며, 82%의 전역 업데이트 성공률을 유지하고 있습니다 [\[1\]](https://capgoapp/) CI/CD 통합으로 배포가 간소화되며, 롤백 기능을 통해 문제 발생 시 즉시 이전 버전으로 되돌릴 수 있습니다 실시간 분석을 통해 업데이트 성능에 대한 인사이트를 제공하고 앱 안정성을 유지하는데 도움을 줍니다

## 결론

### 플랫폼 관리의 이점

Capacitor에서 플랫폼 차이를 효과적으로 관리하면 크로스 플랫폼 개발이 향상됩니다 플랫폼 감지 및 구성을 위한 내장 도구를 통해 개발자는 각 플랫폼의 고유한 디자인 표준과 기능을 존중하면서 iOS와 Android 모두에 대해 원활한 경험을 만들 수 있습니다

적절한 플랫폼 관리에 집중함으로써 개발팀은 더 빠르게 업데이트를 출시하고 사용자 만족도를 높일 수 있습니다 Capgo와 같은 도구는 일관된 플랫폼 처리가 어떻게 더 높은 업데이트 성공률과 더 나은 사용자 경험으로 이어질 수 있는지 보여주었습니다 [\[1\]](https://capgoapp/)

> "우리는 애자일 개발을 실천하고 있으며 @Capgo는 지속적으로 사용자에게 제공하는데 매우 중요합니다!"  
> – Rodrigo Mantica [\[1\]](https://capgoapp/)

이러한 인사이트를 통해 실용적인 개선을 이룰 수 있습니다

### 다음 단계

이러한 이점을 최대화하기 위해 다음 전략의 구현을 고려해보세요:

| 실행 항목 | 이점 |
| --- | --- |
| 플랫폼 감지 활성화 | iOS와 Android 요구사항에 자동으로 적응 |
| 실시간 업데이트 구현 | 긴급 수정을 위한 앱스토어 지연 방지 |
| 분석 설정 | 각 플랫폼별 성능 지표 추적 |
| 롤백 지원 활성화 | 플랫폼별 문제를 신속하게 해결 |

워크플로우를 개선하고자 하는 개발자들에게 Capgo와 같은 도구는 프로세스를 단순화할 수 있습니다 종단간 암호화 및 CI/CD 통합과 같은 기능은 팀이 업데이트를 효율적으로 배포하면서 일관성을 유지하는데 도움을 줍니다

플랫폼 관리의 성공은 올바른 도구를 사용하고 플랫폼별 가이드라인을 준수하는 것에 달려있습니다 강력한 감지 및 관리 전략에 집중함으로써 개발자는 iOS와 Android 모두에서 앱이 원활하게 작동하도록 보장할 수 있습니다