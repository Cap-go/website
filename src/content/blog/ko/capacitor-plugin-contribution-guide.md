---
slug: capacitor-plugin-contribution-guide
title: Capacitor 플러그인 기여 가이드
description: 'Capacitor 플러그인의 설정, 코딩 표준, 테스트, 문서화에 대한 포괄적인 가이드를 통해 효과적으로 기여하는 방법을 알아보세요.'
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-02-17T05:00:51.296Z
updated_at: 2025-12-12T10:43:53.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67b290a70d4a761ccc9919b5-1739768465938.jpg
head_image_alt: 모바일 개발
keywords: >-
  Capacitor, plugins, development, mobile, coding standards, testing,
  documentation, contribution, open source
tag: 'Development, Mobile, Updates'
published: true
locale: ko
next_blog: ''
---
[Capacitor](https://capacitorjs.com/) 플러그인은 웹 기술과 네이티브 기기 기능을 연결하여 [크로스 플랫폼 앱 개발](https://capgo.app/blog/cross-platform-mobile-app-development-guide-2024/)을 가능하게 합니다. 이 가이드는 다음을 도와드립니다:

-   **환경 설정**: [Node.js](https://nodejs.org/en), [Xcode](https://developer.apple.com/xcode/), [Android Studio](https://developer.android.com/studio)와 같은 도구가 필수적입니다.
-   **코드 표준 준수**: [TypeScript](https://www.typescriptlang.org/), [Swift](https://developer.apple.com/swift/), [Kotlin](https://kotlinlang.org/)을 일관된 명명 규칙과 오류 처리와 함께 사용하세요.
-   **철저한 테스트**: JavaScript, iOS, Android용 단위 테스트를 작성하여 신뢰성을 보장하세요.
-   **명확한 문서화**: 쉬운 적용을 위해 JSDoc과 README 파일을 사용하세요.
-   **풀 리퀘스트 제출**: 기여하기 전에 고품질 코드, 테스트, 문서화를 보장하세요.

## 오픈 소스 완벽 가이드 - 기여 방법

<iframe src="https://www.youtube.com/embed/yzeVMecydCE" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## 개발 환경 설정

적절한 개발 환경을 구축하는 것은 효율적인 플러그인 개발의 핵심입니다. 잘 준비된 설정은 플러그인의 코딩, 테스트, 배포를 원활하게 합니다.

### 필요한 도구와 기술

시작하기 전에 다음 도구들이 설치되어 있는지 확인하세요:

| 카테고리 | 요구사항 |
| --- | --- |
| **핵심 도구** | Node.js (LTS), npm 6+, Git |
| **IDE/에디터** | [Visual Studio Code](https://code.visualstudio.com/) 또는 선호하는 에디터 |
| **iOS 개발** | Xcode, [SwiftLint](https://github.com/realm/SwiftLint), [CocoaPods](https://cocoapods.org/) |
| **Android 개발** | Android Studio, Android SDK, JDK |

또한 웹 개발을 위한 TypeScript와 네이티브 개발 작업을 위한 Swift(iOS) 또는 Java/Kotlin(Android)에 익숙해야 합니다 [\[1\]]()[\[2\]](https://github.com/ionic-team/capacitor-plugins/blob/main/CONTRIBUTING.md).

### 모노레포 설정

[Capacitor 플러그인](https://capgo.app/plugins/) 생태계는 모노레포 구조에 의존합니다. 이 접근 방식은 처음부터 커뮤니티 표준에 맞춰 작업할 수 있도록 보장합니다.

1.  **저장소 포크 및 클론**  
    GitHub에서 Capacitor 플러그인 저장소를 포크하는 것으로 시작하세요. 그런 다음 포크한 저장소를 클론하세요:
    
    ```bash
    git clone https://github.com/your-username/capacitor-plugins.git
    cd capacitor-plugins
    npm install
    ```
    
2.  **의존성 설치 및 빌드**  
    필요한 모든 것을 설치하고 플러그인을 빌드하기 위해 다음 명령어를 실행하세요:
    
    ```bash
    npm run build
    ```
    
3.  **버전 관리 설정**  
    변경사항에 대해 기능 브랜치를 사용하고 업스트림 저장소와 포크를 동기화하세요.
    

### 네이티브 플랫폼 준비

크로스 플랫폼 개발을 위해 iOS와 Android 환경을 모두 구성해야 합니다.

**iOS의 경우:**

-   Mac App Store에서 Xcode를 다운로드하세요.
    
-   다음을 사용하여 명령줄 도구를 설치하세요:
    
    ```bash
    xcode-select --install
    ```
    
-   다음으로 CocoaPods를 설치하세요:
    
    ```bash
    sudo gem install cocoapods
    ```
    
-   Apple Developer 계정과 필요한 인증서를 설정하세요.
    
-   코드 품질 유지를 위해 SwiftLint를 사용하세요 (선택사항).
    

**Android의 경우:**

-   최신 SDK와 가상 기기가 포함된 Android Studio를 설치하세요.
-   JDK가 설치되어 있는지 확인하세요.
-   Android Studio 내에서 Android SDK를 적절히 구성하세요.

이러한 플랫폼이 설정되면, 확립된 코딩 관행을 따르고 플러그인 개발을 시작할 준비가 됩니다.

## 코드 표준 가이드

이제 개발 환경이 설정되었으니, 유지보수와 사용이 쉬운 플러그인을 만들기 위해 다음 지침을 따르세요.

### 스타일 가이드 준수

[Capacitor 플러그인 생태계](https://capgo.app/blog/capacitor-comprehensive-guide/)는 [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), SwiftLint와 같은 도구를 사용하여 엄격한 코딩 표준을 적용합니다. 다음은 필수 형식의 간단한 개요입니다:

| 구성 요소 | 형식 |
| --- | --- |
| 변수 | `deviceInfo` (camelCase) |
| 클래스 | `BatteryManager` (PascalCase) |
| 메서드 | `getLanguageCode()` (camelCase) |
| 상수 | `MAX_RETRY_COUNT` (SNAKE_CASE) |

플러그인은 더 나은 타입 안전성과 `async/await`와 같은 ES6+ 기능을 위해 TypeScript를 사용해야 합니다. 또한 Swift(iOS)와 Kotlin(Android)에 대한 플랫폼별 코딩 규칙을 따르세요.

### 오류 및 타입 관리

크로스 플랫폼 호환성을 위해 일관된 오류 처리가 중요합니다. 예시:

```typescript
async checkPermissions(): Promise<PermissionStatus> {
  try {
    const result = await this.implementation.checkPermissions();
    return result;
  } catch (error) {
    throw new Error(`Permission check failed: ${error.message}`);
  }
}
```

타입 안전성을 위해:

-   특정 사용 사례에 맞춘 집중된 인터페이스를 사용하세요.
-   플랫폼별 변형을 위해 유니온 타입을 적용하세요.

### 코드 문서화

좋은 문서화는 플러그인을 접근하기 쉽고 사용하기 쉽게 만드는 핵심입니다. 다음 관행을 따르세요:

1.  **API 문서화**: `@capacitor/docgen`과 함께 작동하는 JSDoc 주석을 작성하세요. 예시:

```typescript
/**
 * @description Get the device's current battery level
 * @returns Promise with the battery level percentage
 */
async getBatteryLevel(): Promise<{ level: number }>;
```

2.  **README 구조**: 설치 단계, 구성 지침, 플랫폼별 요구사항, 사용 예시, 상세한 API 참조와 같은 필수 정보를 포함하세요.

잘 작성된 문서는 플러그인이 쉽게 채택되고 더 넓은 Capacitor 커뮤니티에 기여할 수 있도록 보장합니다.

## 플러그인 테스트 가이드

Capacitor 플러그인 테스트는 원활한 기능과 신뢰성을 보장하기 위해 몇 가지 중요한 영역에 집중합니다.

### 네이티브 브릿지 테스트

네이티브 브릿지 테스트는 JavaScript와 네이티브 코드 간의 적절한 통신을 보장합니다. 각 플랫폼에 맞춰진 프레임워크로 테스트 환경을 설정하여 시작하세요.

다음은 JavaScript 측면의 [Jest](https://jestjs.io/) 단위 테스트 예시입니다:

```typescript
// Example of a Jest unit test for the JavaScript bridge
describe('DeviceInfo Plugin', () => {
  test('getBatteryLevel returns valid percentage', async () => {
    const result = await DeviceInfo.getBatteryLevel();
    expect(result.level).toBeGreaterThanOrEqual(0);
    expect(result.level).toBeLessThanOrEqual(100);
  });
});
```

네이티브 측면의 테스트를 위해 iOS에는 XCTest를, Android에는 JUnit을 사용하세요. 다음은 Android 예시입니다:

```kotlin
@Test
fun testBatteryLevel() {
    val plugin = DeviceInfo()
    val result = plugin.getBatteryLevel()
    assertTrue(result.level in 0..100)
}
```

핵심 브릿지 기능이 예상대로 작동하는 것을 확인한 후, 완전한 사용자 워크플로우 테스트로 이동하세요.

### 완전한 플러그인 테스트

플러그인이 다양한 시나리오에서 잘 수행되도록 하기 위해 다양한 카테고리를 테스트하세요:

| 테스트 카테고리 | 주요 집중 영역 |
| --- | --- |
| 통합 테스트 | 크로스 플랫폼 기능 |
| 성능 테스트 | 리소스 사용량 및 응답 시간 |
| 보안 테스트 | 데이터 처리 및 권한 확인 |

복잡한 기능이 있는 플러그인의 경우 실제 사용자 시나리오를 시뮬레이션하세요. 예를 들어, DeviceInfo 플러그인을 테스트하는 경우 다음을 확인하세요:

-   다양한 네트워크 조건에서의 성공적인 업로드
-   정확한 진행 상황 보고
-   대용량 파일 전송 중 메모리 사용량

### [Capgo](https://capgo.app/)를 통한 OTA 테스트

![Capgo Live Update Dashboard Interface](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-02-17.jpg?auto=compress)

Capgo의 오픈소스 도구를 사용하면 쉽게 업데이트를 배포하고 테스트할 수 있습니다. 사용 방법:

1.  개발, 스테이징, 프로덕션과 같은 [업데이트 채널](https://capgo.app/docs/webapp/channels/)을 설정하세요.
2.  CI/CD 도구로 배포를 자동화하세요.
3.  즉시 업데이트를 푸시하세요.
4.  [Capgo 대시보드](https://capgo.app/docs/webapp/)를 통해 성능과 이슈를 모니터링하세요.

단계별 출시를 위해 Capgo는 업데이트를 소수의 사용자로 제한할 수 있습니다. 예를 들어, 24시간마다 새 버전을 25%의 사용자에게 출시할 수 있습니다:

```typescript
// Example configuration for staged rollout
{
  "plugin": "camera-plugin",
  "version": "1.2.0",
  "rollout": {
    "percentage": 25,
    "interval": "24h"
  }
}
```

이러한 단계별 접근 방식은 전체 출시 전에 커뮤니티 피드백을 활용하여 초기에 문제를 식별하는 데 도움이 됩니다.

## 풀 리퀘스트 프로세스

변경사항을 철저히 테스트한 후, 다음 단계에 따라 풀 리퀘스트를 제출하세요:

### PR 제출 체크리스트

제출하기 전에 다음 주요 영역을 확인하세요:

| **카테고리** | **확인 사항** |
| --- | --- |
| **코드 품질** | \- Swift/Kotlin 구현이 웹 API와 일치하는지 확인 |
| **테스트** | \- 새로운 기능에 대한 단위 테스트 추가  <PermissionStatus>\- CI/CD 파이프라인 검사가 성공했는지 확인 |
| **문서화** | \- README, 인라인 문서, CHANGELOG를 필요에 따라 업데이트 |

### 커뮤니티 가이드라인

협업할 때 다음 모범 사례를 따르세요:

-   리뷰어 피드백에 신속히 응답하세요.
-   토론을 기술적 세부사항에 집중하세요.
-   코드 변경을 제안하기 위해 GitHub의 제안 기능을 사용하세요.
-   한 번에 하나의 기능이나 이슈를 다루는 작은 규모의 집중된 풀 리퀘스트를 제출하세요.

큰 변경사항의 경우, 먼저 이슈를 생성하고 접근 방식을 논의하는 것이 좋습니다. Capacitor 팀은 자동화된 검
