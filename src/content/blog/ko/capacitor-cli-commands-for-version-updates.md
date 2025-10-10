---
slug: capacitor-cli-commands-for-version-updates
title: Capacitor CLI 명령어 버전 업데이트
description: Capacitor CLI를 사용하여 앱을 업데이트하는 데 필요한 필수 명령어와 모범 사례를 배우고 최적의 성능과 호환성을 확보하세요.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-05-11T21:28:20.329Z
updated_at: 2025-10-10T02:23:14.000Z
head_image: >-
  https://assets.seobotai.com/cdn-cgi/image/quality=75,w=1536,h=1024/capgo.app/682028f45e3fe4823b5e5a52-1746998980056.jpg
head_image_alt: 모바일 개발
keywords: >-
  Capacitor, CLI, app updates, mobile development, iOS, Android, migration,
  Capgo, plugins
tag: 'Development, Mobile, Updates'
published: true
locale: ko
next_blog: ''
---
[Capacitor](https://capacitorjs.com/) CLI는 iOS 및 Android에 대한 [앱 업데이트](https://capgo.app/plugins/capacitor-updater/)를 간소화합니다. 알아야 할 사항은 다음과 같습니다:

1.   **업데이트 이유**: 보안을 유지하고 성능을 개선하며 최신 모바일 OS 버전과의 호환성을 보장합니다.
2.   **주요 명령어**: `npm install @capacitor/cli@latest`를 사용하여 Capacitor CLI를 업데이트하고, `npx cap migrate`로 변경 사항을 적용하며, `npx cap sync`로 [업데이트를 최종화](https://capgo.app/docs/plugin/cloud-mode/hybrid-update)합니다.
3.   **플랫폼별 단계**: iOS는 [CocoaPods](https://cocoapods.org/) (`pod install`) 및 [Xcode](https://developer.apple.com/xcode/) 설정을 업데이트합니다. Android의 경우 [Gradle](https://gradle.org/) 구성을 조정하고 Java 버전을 확인합니다.
4.   **라이브 업데이트를 위해 [Capgo](https://capgo.app/) 사용**: 롤백 및 실시간 분석 기능과 함께 앱 스토어 지연 없이 즉시 변경 사항을 배포합니다.

업데이트는 앱이 효율적이고 사용자 친화적으로 유지되도록 보장합니다. 위의 단계를 따라 원활한 프로세스를 진행하세요.

## Ionic 앱을 [Capacitor](https://capacitorjs.com/) 3으로 마이그레이트하는 방법

![Capacitor](https://assets.seobotai.com/capgo.app/682028f45e3fe4823b5e5a52/7e137b9b90adb3934b29b03381f213c1.jpg)

<iframe src="https://www.youtube.com/embed/d5H729a-rBM" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## 업데이트 전에

업데이트 전에 준비하는 데 시간을 들이면 나중에 발생할 수 있는 문제를 피할 수 있습니다. 약간의 사전 작업이 일반적인 함정을 피하고 모든 것이 원활하게 진행되도록 도와줍니다. [업데이트 프로세스](https://capgo.app/docs/plugin/cloud-mode/manual-update/) 동안 위험을 최소화하기 위해 집중해야 할 사항은 다음과 같습니다.

### 시스템 요구 사항 확인

우선, 개발 설정이 Capacitor 요구 사항을 충족하는지 확인하세요. 버전 6 및 7은 특정 소프트웨어 요구 사항이 있습니다 [\[1\]](https://capgo.app).

확인해야 할 사항은 다음과 같습니다:

1.   **Node.js**: Node.js 버전이 호환되는지 확인하세요.
2.   **플랫폼별 도구**:
    -   iOS 개발을 위해 최신 버전의 Xcode가 설치되어 있는지 확인하세요.
    -   Android의 경우, [Android Studio](https://developer.android.com/studio)가 최신 상태인지 확인하세요.

### 업데이트 노트 읽기

업데이트 노트는 변경 사항이 프로젝트에 미칠 영향을 이해하기 위한 로드맵입니다. 다음을 검토하세요:

1.   **공식 문서**: Capacitor의 변경 로그 및 마이그레이션 가이드를 살펴보세요.
2.   **파손된 변경 사항**: "파손된 변경 사항" 레이블이 붙은 섹션에 주의하세요. 이러한 섹션은 워크플로를 방해할 수 있는 중요한 업데이트를 강조합니다.
3.   **플러그인 호환성**: 프로젝트의 모든 Capacitor 플러그인이 새 버전에서 지원되는지 다시 확인하세요.

## CLI 업데이트 명령어

이 명령어는 앱을 업데이트하면서 모든 것이 원활하게 작동하도록 도와줍니다.

### Capacitor CLI 업데이트

최신 기능에 액세스하려면 Capacitor CLI를 업데이트하세요. 터미널을 열고 다음을 실행하세요:

```bash
npm install -g @capacitor/cli@latest
```

설치가 완료되면 CLI 버전을 확인하여 업데이트를 확인하세요:

```bash
npx cap --version
```

### 마이그레이션 명령어 실행

프로젝트 디렉토리에서 다음 명령어를 실행하여 핵심 및 플랫폼별 Capacitor 패키지를 업데이트하세요:

```bash
# Update core Capacitor packages
npm install @capacitor/core@latest
npm install @capacitor/cli@latest

# Update platform-specific packages
npm install @capacitor/ios@latest
npm install @capacitor/android@latest

# Run the migration command
npx cap migrate
```

`npx cap migrate` 명령은 다음을 수행합니다:

1.   앱의 구성을 업데이트합니다.
2.   종속성을 동기화합니다.
3.   필요한 프로젝트 변경 사항을 적용합니다.
4.   호환성을 위해 플러그인을 검증합니다.

일부 업데이트가 자동으로 처리되지 않는 경우 수동으로 완료해야 할 수 있습니다.

### 수동 단계 완료

업데이트된 플랫폼과 프로젝트를 동기화하려면 다음을 실행하세요:

```bash
npx cap sync
```

추가 자동화를 위해 Capgo의 CLI 도구를 통합하려면 다음을 실행하세요:

```bash
npx @capgo/cli init
```

마지막으로 각 플랫폼에 대해 앱을 빌드하여 업데이트를 확인하세요:

```bash
# For iOS
npx cap open ios

# For Android
npx cap open android
```

업데이트 중 문제가 발생하면 CLI는 문제 해결에 도움이 되는 상세한 오류 메시지를 제공합니다. 빌드 출력에 주의하여 주의가 필요한 경고 또는 오류를 검토하세요.

## 플랫폼 업데이트

핵심 업데이트가 완료되면 다음 단계는 iOS 및 Android 프로젝트의 플랫폼 구성을 미세 조정하는 것입니다.

### iOS 업데이트 단계

iOS 프로젝트를 시작하려면 Xcode에서 열고 다음 단계를 따르세요:

1.   **CocoaPods 종속성 업데이트**  
    CocoaPods를 사용하여 종속성을 새로 고침합니다. iOS 프로젝트 디렉토리로 이동하여 다음 명령어를 실행하세요:
    
    ```bash
    cd ios/App
    pod install
    ```
    
2.   **Xcode 설정 구성**  
    원활한 작동과 준수를 보장하기 위해 이 Xcode 설정이 업데이트되어 있는지 확인하세요:
    
    | **설정** | **필요한 작업** | **목적** |
    | --- | --- | --- |
    | 배포 대상 | 최소 iOS 버전 설정 | 호환성 보장 |
    | 빌드 설정 | 서명 신원 업데이트 | 앱 스토어 요구 사항 충족 |
    | 자산 카탈로그 | 아이콘 및 스플래시 자산 검증 | 비주얼 일관성 유지 |
    
3.   **클린 빌드**  
    캐시된 파일을 정리하고 클린 빌드를 수행하여 남은 문제를 피합니다:
    
    ```bash
    # Clean the build folder
    xcodebuild clean
    # Build the project
    xcodebuild build
    ```
    

iOS 업데이트가 완료되면 Android 프로젝트로 관심을 돌릴 수 있습니다.

### Android 업데이트 단계

Android의 경우 Android Studio에서 프로젝트를 열고 다음 단계를 따르세요:

1.   **Gradle 구성 업데이트**  
    `build.gradle` 파일을 열고 이 설정이 올바르게 구성되어 있는지 확인하세요:
    
    ```kotlin
    android {
        compileSdkVersion 33
        defaultConfig {
            minSdkVersion 22
            targetSdkVersion 33
        }
    }
    ```
    
2.   **프로젝트 파일 동기화**  
    Gradle 파일과 프로젝트를 동기화하여 모든 종속성이 최신 상태인지 확인하세요. 이 단계는 SDK 도구를 업데이트하고 충돌을 해결하는 것을 포함할 수 있습니다.
    
3.   **Java 버전 확인**  
    Gradle 및 Android 기능과의 호환성에 중요한 Java의 올바른 버전을 사용하고 있는지 확인하세요:
    
    ```bash
    # Check the current Java version
    ./gradlew --version
    ```
    

Gradle 구성에 세심한 주의를 기울이세요. 일부 업데이트는 최신 Android 기능을 효과적으로 지원하기 위해 더 최신 Gradle 버전을 필요로 할 수 있습니다.

## [Capgo](https://capgo.app/)로 라이브 업데이트

![Capgo](https://assets.seobotai.com/capgo.app/682028f45e3fe4823b5e5a52/0270fe931d56d422c8e52846495749c7.jpg)

플랫폼이 구성되면 Capgo를 사용하여 앱 스토어 승인을 기다리지 않고 즉시 변경 사항을 배포할 수 있습니다. 이 단계는 실시간 배포 기능을 통해 플랫폼 업데이트를 개선합니다.

### Capgo 설정

Capgo를 시작하는 것은 간단합니다. 다음 간단한 명령으로 초기화할 수 있습니다:

```bash
npx @capgo/cli init
```

이 기능은 업데이트 프로세스를 간소화하며, 전통적인 검토 주기 지연 없이 앱을 최신 상태로 유지합니다. Capgo는 Capacitor 6 및 7 모두와 호환되어 기존 설정에 유연하게 사용될 수 있습니다.

| **기능** | **설명** | **혜택** |
| --- | --- | --- |
| 종단 간 암호화 | 업데이트에 대한 내장 보안 | 승인된 사용자만 업데이트에 접근할 수 있도록 보장 |
| [채널 시스템](https://capgo.app/docs/plugin/cloud-mode/channel-system/) | 고급 업데이트 배포 | 특정 사용자 세그먼트 대상으로 타겟팅 |
| 실시간 분석 | 업데이트 성능 모니터링 | 성공률 및 사용자 참여 추적 |

### 업데이트 안전 기능

Capgo는 안전하고 신뢰할 수 있는 업데이트를 우선시하며, 24시간 이내에 95% 채택률과 82% 전 세계 성공률을 달성합니다 [\[1\]](https://capgo.app). 몇 가지 주요 안전 기능이 포함되어 있습니다:

1.   **롤백 기능**: 문제가 발생하면 이전 버전으로 신속하게 되돌릴 수 있습니다.
2.   **오류 추적**: 문제가 발생하기 전에 식별하고 해결합니다.
3.   **채널 기반 배포**: [베타 그룹과 함께 업데이트 테스트](https://capgo.app/blog/how-to-send-specific-version-to-users/)한 후 광범위하게 배포합니다.

### CI/CD 통합

안전 조치가 마련되면 원활하고 효율적인 배포를 위해 CI/CD 파이프라인에 Capgo를 통합할 수 있습니다. Capgo는 이미 50개 이상의 앱에 대해 CI/CD를 구성하여 다른 옵션에 비해 비용 효율적인 솔루션을 제공합니다 [\[1\]](https://capgo.app).

다음은 배포 명령어의 예입니다:

```bash
npx @capgo/cli deploy --channel production
```

Capgo는 다음과 같은 다양한 CI/CD 플랫폼을 지원합니다:

1.   [GitHub Actions](https://docs.github.com/actions)
2.   [GitLab CI](https://docs.gitlab.com/ee/ci/)
3.   [Jenkins](https://www.jenkins.io/)
4.   맞춤형 파이프라인 설정

> "우리는 GitHub Actions, GitLab CI 등 선호하는 플랫폼에서 직접 CI/CD 파이프라인을 구성합니다. 우리는 CI/CD를 호스팅하거나 유지 관리비를 부과하지 않습니다." - Capgo [\[1\]](https://capgo.app)

전문적인 지원을 원하는 팀을 위해 Capgo는 $2,600에 전문 CI/CD 구성 서비스도 제공합니다. 이 일회성 설정에는 맞춤형 파이프라인 구성 및 모바일 앱 배포 모범 사례에 대한 전문가 조언이 포함됩니다 [\[1\]](https://capgo.app).

## 일반적인 문제 해결

[Capacitor 업데이트](https://capgo.app/plugins/capacitor-updater/)는 때때로 앱의 안정성을 방해하는 문제를 초래할 수 있습니다. 이러한 일반적인 문제를 효과적으로 해결하는 방법은 다음과 같습니다.

### 패키지 충돌 수정

시작은 Capacitor 패키지 간의 버전 불일치를 확인하는 것입니다. 다음 명령어를 사용하세요:

```bash
npm ls @capacitor/core
```

출력을 검토하고 **@capacitor/core**, **@capacitor/ios**, **@capacitor/android**의 버전이 `package.json` 파일에서 일관된지 확인하세요. 충돌이 발견되면 문제를 일으키는 패키지를 업데이트하거나 제거하여 환경을 안정화하세요.

이 문제를 해결한 후, 모든 설치된 플러그인이 업데이트된 Capacitor 버전과 호환되는지 다시 확인하세요.

### 플러그인 지원 확인

업데이트 전에 플러그인이 최신 Capacitor 버전과 함께 작동할 준비가 되었는지 확인하세요. 플러그인 호환성을 관리하고 검증하기 위해 다음 명령어를 사용하세요:

| **작업** | **명령어** | **목적** |
| --- | --- | --- |
| 플러그인 목록 | `npx cap ls` | 설치된 모든 플러그인 표시 |
| 버전 확인 | `npm outdated` | 구식 플러그인 식별 |
| 플러그인 업데이트 | `npm update` | 플러그인을 호환되는 버전으로 업데이트 |

라이브 업데이트 도구인 **Capgo**를 사용하는 경우, 플러그인이 동적 업데이트를 지원하는지 확인하세요. 이는 런타임 충돌을 방지하고 성능을 원활하게 유지하는 데 도움이 됩니다.

### 빌드 오류 해결

빌드 오류는 플랫폼에 따라 다를 수 있지만, 다음은 플랫폼별 수정 사항입니다:

**iOS:**

빌드 폴더를 다음 명령어를 사용하여 청소하세요:

```bash
xcodebuild clean -workspace ios/App/App.xcworkspace -scheme App
```

**안드로이드의 경우:**

다음 명령어를 실행하여 Gradle 캐시를 지우세요:

```bash
cd android && ./gradlew clean
```

청소 후에도 오류가 지속된다면, 영향을 받은 플랫폼을 다시 추가해야 할 수도 있습니다. 방법은 다음과 같습니다:

```bash
npx cap rm ios
npx cap rm android
npx cap add ios
npx cap add android
```

마지막으로, 실시간 업데이트를 위해 Capgo를 사용하고 있다면, 추가 문제를 피하기 위해 빌드 구성 사항이 플랫폼의 요구 사항을 충족하는지 다시 확인하세요.

## 요약

이 섹션에서는 Capacitor에서 [업데이트 관리](https://capgo.app/docs/plugin/cloud-mode/manual-update/)를 위한 필수 단계와 도구를 강조하며, [Capacitor CLI 명령어](https://capgo.app/docs/cli/commands/)의 효과적인 사용이 앱 개발에서 원활한 작업 흐름을 보장하는 방법을 강조합니다. 논의된 도구와 전략은 업데이트를 단순화하면서도 잠재적 위험을 줄이는 것을 목표로 합니다.

우리는 이전에 Capgo가 **1.7K 생산 앱**을 지원하며, **82% 업데이트 성공률**을 달성한다고 언급했습니다 [\[1\]](https://capgo.app). 이의 즉각적인 업데이트 기능 덕분에 **95%의 사용자들이 24시간 이내에 업데이트를 완료**할 수 있습니다 [\[1\]](https://capgo.app), 이는 그 효율성을 보여줍니다.

Capgo의 성능 지표를 살펴보면 다음과 같습니다:

| 지표 | 성능 |
| --- | --- |
| 글로벌 API 응답 시간 | 57ms |
| 5MB 번들 다운로드 속도 | 114ms |
| 업데이트 성공률 | 82% |

> "우리는 애자일 개발을 실천하며, @Capgo는 사용자에게 지속적으로 제공하는 데 필수적입니다!" - 로드리고 만티카 [\[1\]](https://capgo.app)

현대의 업데이트 도구는 여러 가지 눈에 띄는 장점을 제공합니다:

-   **종단 간 암호화**를 통한 안전한 업데이트 전송
-   **부분 업데이트**로 수정된 구성 요소만 다운로드하여 대역폭 절약
-   **원클릭 롤백**으로 문제 발생 시 신속 복구
-   **실시간 분석**을 통한 업데이트 성능 및 사용자 참여 모니터링

이러한 기능은 [버전 업데이트](https://capgo.app/docs/plugin/cloud-mode/hybrid-update/)를 효과적으로 관리하기 위한 강력한 프레임워크를 뒷받침합니다.

작은 앱에서 큰 배포로 확장하는 경우까지, Capacitor CLI와 고급 업데이트 도구를 결합하면 오늘날의 빠르게 변화하는 개발 환경에서 신뢰할 수 있고 효율적인 버전 관리를 보장합니다.

## 자주 묻는 질문(FAQs)

:::faq
### Capacitor CLI로 앱을 업데이트할 때 어떤 문제에 직면할 수 있으며, 어떻게 해결할 수 있을까요?

Capacitor CLI로 앱을 업데이트할 때, 몇 가지 문제에 직면할 수 있습니다. 일반적인 문제는 **의존성 충돌**, **플러그인에서의 변경 사항**, 또는 **플랫폼별 구성 문제**입니다. 이러한 문제는 종종 Capacitor 버전 간의 차이나 서드파티 플러그인 업데이트로 인해 발생합니다.

이러한 문제를 해결하는 방법은 다음과 같습니다:

-   **업데이트할 새 버전의 릴리스 노트를 확인**하세요. 변경 사항이나 조정이 필요한 부분을 주의 깊게 살펴보세요.
-   **생산 환경에 배포하기 전에 스테이징 환경에서 업데이트를 테스트**하세요. 이를 통해 사용자에게 영향이 가기 전에 문제를 포착하고 수정할 수 있습니다.
-   정기적으로 의존성과 플러그인을 업데이트하여 호환성 문제의 위험을 줄이세요.

더 부드러운 업데이트 경험을 위해 _Capgo_와 같은 도구를 사용하는 것도 좋습니다. 이 도구를 사용하면 앱 스토어 승인 없이 사용자에게 직접 수정 사항과 새로운 기능을 제공할 수 있습니다. 최소한의 다운타임으로 앱을 최신 상태로 유지하는 훌륭한 방법입니다.
:::

:::faq
### Capgo는 앱 업데이트를 어떻게 단순화하며, 그 주요 특징은 무엇인가요?

Capgo는 개발자가 [앱 업데이트](https://capgo.app/plugins/capacitor-updater/)를 사용자에게 직접 변경 사항, 수정 및 새로운 기능을 푸시할 수 있도록 하여 앱 스토어 승인 없이 제공할 수 있게 하여 업데이트 방식을 단순화합니다. 이를 통해 사용자들이 몇 분 만에 최신 업데이트를 즐길 수 있어 보다 원활하고 효율적인 경험을 제공합니다.

다음은 Capgo의 두드러진 점입니다:

-   **종단 간 암호화**로 업데이트의 보안을 보장합니다.
-   **CI/CD 통합**으로 효율적인 작업 흐름을 유지합니다.
-   **사용자별 업데이트**로 정밀한 타겟 롤아웃이 가능합니다.
-   **유연한 조직 관리**로 모든 규모의 팀을 지원합니다.

Capgo는 완전 오픈 소스이며 Apple 및 Android 기준을 준수하여 [실시간 앱 업데이트](https://capgo.app/blog/live-updates-for-flutter-app/)를 위한 신뢰할 수 있는 솔루션을 제공합니다.
:::

:::faq
### 업데이트 전에 플러그인이 최신 버전의 Capacitor와 호환되는지 어떻게 확인할 수 있나요?

최신 버전의 Capacitor로 업그레이드하기 전에, 플러그인이 업데이트를 처리할 준비가 되었는지 다시 확인하는 것이 중요합니다. 플러그인 문서나 리포지토리를 살펴보며 버전별 요구 사항이나 업데이트가 있는지 확인하세요. 대부분의 플러그인은 지원하는 Capacitor 버전을 명확히 표시하므로, 이 단계를 통해 불필요한 문제를 예방할 수 있습니다.

또한, 업데이트된 Capacitor 버전으로 제어된 환경에서 앱을 테스트할 수 있습니다. 이렇게 하면 업데이트가 사용자에게 영향을 미치기 전에 호환성 문제를 미리 발견하고 수정할 수 있습니다. **Capgo**와 같은 도구는 여기서 큰 도움이 될 수 있으며, 앱 스토어 승인 없이 직접 업데이트를 푸시할 수 있게 해줍니다. 이를 통해 플랫폼 가이드라인을 준수하면서 플러그인 관련 문제를 신속하게 해결할 수 있습니다.
:::
