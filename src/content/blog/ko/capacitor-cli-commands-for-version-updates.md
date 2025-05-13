---
slug: capacitor-cli-commands-for-version-updates
title: Comandos de la CLI de Capacitor para Actualizaciones de Versión
description: Capacitor CLIを使用してアプリを更新するための基本的なコマンドとベストプラクティスを学び、最適なパフォーマンスと互換性を確保しましょう。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-05-11T21:28:20.329Z
updated_at: 2025-05-11T21:29:40.056Z
head_image: >-
  https://assets.seobotai.com/cdn-cgi/image/quality=75,w=1536,h=1024/capgo.app/682028f45e3fe4823b5e5a52-1746998980056.jpg
head_image_alt: モバイル開発
keywords: >-
  Capacitor, CLI, app updates, mobile development, iOS, Android, migration,
  Capgo, plugins
tag: 'Development, Mobile, Updates'
published: true
locale: ja
next_blog: ''
---
[Capacitor](https://capacitorjs.com/) CLI는 [앱 업데이트](https://capgo.app/plugins/capacitor-updater/)를 iOS 및 Android용으로 간소화합니다. 알아야 할 내용은 다음과 같습니다:

-   **업데이트 이유:** 보안을 유지하고 성능을 향상시키며 최신 모바일 OS 버전과의 호환성을 보장합니다.
-   **주요 명령어:** `npm install @capacitor/cli@latest`를 사용하여 Capacitor CLI를 업데이트하고, `npx cap migrate`를 사용하여 변경 사항을 적용하고, `npx cap sync`를 사용하여 [업데이트를 완료](https://capgo.app/docs/plugin/cloud-mode/hybrid-update)합니다.
-   **플랫폼별 단계:** [CocoaPods](https://cocoapods.org/)(`pod install`) 및 [Xcode](https://developer.apple.com/xcode/) 설정을 사용하여 iOS를 업데이트합니다. Android의 경우 [Gradle](https://gradle.org/) 구성을 조정하고 Java 버전을 확인합니다.
-   **라이브 업데이트를 위한 [Capgo](https://capgo.app/) 사용:** 앱 스토어 지연 없이 즉시 변경 사항을 배포하고 롤백 및 실시간 분석과 같은 기능을 활용합니다.

업데이트는 앱이 효율적이고 사용자 친화적으로 유지되도록 합니다. 원활한 프로세스를 위해 위의 단계를 따르세요.

## Ionic 앱을 [Capacitor](https://capacitorjs.com/) 3로 마이그레이션하는 방법

![Capacitor](https://assets.seobotai.com/capgo.app/682028f45e3fe4823b5e5a52/7e137b9b90adb3934b29b03381f213c1.jpg)

<iframe src="https://www.youtube.com/embed/d5H729a-rBM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## 업데이트 전 준비 사항

업데이트 전에 준비 시간을 가지면 나중에 발생할 수 있는 두통을 피할 수 있습니다. 기초 작업을 통해 일반적인 함정을 피하고 모든 것이 원활하게 작동할 수 있도록 합니다. [업데이트 프로세스](https://capgo.app/docs/plugin/cloud-mode/manual-update/) 중에 위험을 최소화하기 위해 집중해야 할 내용은 다음과 같습니다.

### 시스템 요구 사항 확인

먼저 - 개발 설정이 Capacitor의 요구 사항을 충족하는지 확인하세요. 버전 6 및 7은 특정 소프트웨어 필요 사항이 있습니다 [\[1\]](https://capgo.app).

확인해야 할 내용은 다음과 같습니다:

-   **Node.js:** Node.js 버전이 호환되는지 확인하세요.
-   **플랫폼별 도구:**
    -   iOS 개발의 경우 최신 버전의 Xcode가 설치되어 있는지 확인합니다.
    -   Android의 경우, [Android Studio](https://developer.android.com/studio)가 최신인지 확인합니다.

### 업데이트 노트 읽기

업데이트 노트는 변경 사항이 프로젝트에 미칠 영향을 이해하기 위한 길잡이입니다. 다음 내용을 검토하는 시간을 가지세요:

-   **공식 문서:** Capacitor의 변경 로그 및 마이그레이션 가이드를 살펴보세요.
-   **중단된 변경 사항:** "중단된 변경 사항"으로 표시된 섹션에 주의하세요. 이러한 내용은 작업 흐름에 방해가 될 수 있는 중요한 업데이트를 강조합니다.
-   **플러그인 호환성:** 프로젝트의 모든 Capacitor 플러그인이 새로운 버전에서 지원되는지 다시 확인하세요.

## CLI 업데이트 명령어

이 명령어들은 앱을 업데이트하면서 모든 것이 원활하게 작동하도록 도와줍니다.

### Capacitor CLI 업데이트

최신 기능에 액세스하려면 Capacitor CLI를 업데이트하세요. 터미널을 열고 다음 명령어를 실행합니다:

```bash
npm install -g @capacitor/cli@latest
```

설치가 완료되면 CLI 버전을 확인하여 업데이트를 확인하세요:

```bash
npx cap --version
```

### 마이그레이션 명령어 실행

프로젝트 디렉토리에서 다음 명령어를 실행하여 코어 및 플랫폼별 Capacitor 패키지를 업데이트하세요:

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

`npx cap migrate` 명령어는:

-   앱의 구성을 업데이트합니다.
-   종속성을 동기화합니다.
-   필요한 프로젝트 변경 사항을 적용합니다.
-   호환성을 위해 플러그인을 검증합니다.

일부 업데이트가 자동으로 처리되지 않는 경우 수동으로 완료해야 할 수 있습니다.

### 수동 단계 완료

업데이트된 플랫폼과 프로젝트를 동기화하려면 아래를 실행하세요:

```bash
npx cap sync
```

추가 자동화를 원한다면 Capgo의 CLI 도구를 통합하여 다음을 실행할 수 있습니다:

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

업데이트 중 문제가 발생하면 CLI는 문제 해결을 도와줄 상세한 오류 메시지를 제공합니다. 주의가 필요한 경고 또는 오류가 있는지 빌드 출력을 검토하세요.

## 플랫폼 업데이트

코어 업데이트가 완료되면 iOS 및 Android 프로젝트의 플랫폼 구성을 미세 조정하는 다음 단계입니다.

### iOS 업데이트 단계

iOS 프로젝트를 시작하려면 Xcode에서 열고 다음 단계를 따르세요:

-   **CocoaPods 종속성 업데이트**  
    CocoaPods를 사용하여 종속성을 새로 고침하세요. iOS 프로젝트 디렉토리로 이동하여 다음 명령어를 실행합니다:
    
    ```bash
    cd ios/App
    pod install
    ```
    
-   **Xcode 설정 구성**  
    원활한 작동과 준수를 위해 다음 Xcode 설정이 업데이트되었는지 확인하세요:
    
    | **설정** | **필요한 조치** | **목적** |
    | --- | --- | --- |
    | 배포 목표 | 최소 iOS 버전 설정 | 호환성 보장 |
    | 빌드 설정 | 서명 아이덴티티 업데이트 | 앱 스토어 요구 사항 충족 |
    | 자산 카탈로그 | 아이콘 및 스플래시 자산 검증 | 시각적 일관성 유지 |
    
-   **클린 빌드**  
    캐시된 파일을 지우고 클린 빌드를 수행하여 남은 문제를 피하세요:
    
    ```bash
    # Clean the build folder
    xcodebuild clean
    # Build the project
    xcodebuild build
    ```
    

iOS 업데이트가 완료되면 Android 프로젝트로 눈을 돌릴 수 있습니다.

### Android 업데이트 단계

Android의 경우 Android Studio에서 프로젝트를 열고 다음 단계를 따르세요:

-   **Gradle 구성 업데이트**  
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
    
-   **프로젝트 파일 동기화**  
    Gradle 파일과 프로젝트를 동기화하여 모든 종속성이 최신인지 확인합니다. 이 단계는 SDK 도구 업데이트 및 충돌 해결을 포함할 수 있습니다.
    
-   **Java 버전 검증**  
    Java의 올바른 버전을 사용하고 있는지 확인하세요. 이는 Gradle 및 Android 기능과의 호환성에 매우 중요합니다:
    
    ```bash
    # Check the current Java version
    ./gradlew --version
    ```
    

Gradle 구성에 세심한 주의를 기울이세요. 일부 업데이트는 최신 Android 기능을 효과적으로 지원하기 위해 더 최신의 Gradle 버전이 필요할 수 있습니다.

## [Capgo](https://capgo.app/)를 통한 라이브 업데이트

![Capgo](https://assets.seobotai.com/capgo.app/682028f45e3fe4823b5e5a52/0270fe931d56d422c8e52846495749c7.jpg)

플랫폼이 구성되면 Capgo를 사용하여 앱 스토어 승인 대기 없이 즉시 변경 사항을 롤아웃할 수 있습니다. 이 단계는 실시간 배포 기능을 통해 플랫폼 업데이트를 향상합니다.

### Capgo 설정하기

Capgo 시작은 간단합니다. 간단한 명령어로 초기화할 수 있습니다:

```bash
npx @capgo/cli init
```

이 기능은 업데이트 프로세스를 간소화하여 전통적인 검토 주기의 지연 없이 앱을 최신 상태로 유지합니다. Capgo는 Capacitor 6 및 7과 호환되어 기존 설정에 유연한 선택입니다.

| **기능** | **설명** | **혜택** |
| --- | --- | --- |
| 종단 간 암호화 | 업데이트에 대한 내장 보안 | 권한이 있는 사용자만 업데이트에 접근 가능 |
| [채널 시스템](https://capgo.app/docs/plugin/cloud-mode/channel-system/) | 고급 업데이트 배포 | 특정 사용자 세그먼트 타겟팅 |
| 실시간 분석 | 업데이트 성능 모니터링 | 성공률 및 사용자 참여 추적 |

### 업데이트 안전 기능

Capgo는 안전하고 신뢰할 수 있는 업데이트를 우선시하며, 24시간 이내에 95%의 채택률과 82%의 전 세계 성공률을 달성하고 있습니다 [\[1\]](https://capgo.app). 여러 주요 안전 기능이 포함되어 있습니다:

-   **롤백 기능:** 문제가 발생하면 이전 버전으로 빠르게 복원할 수 있습니다.
-   **오류 추적:** 문제가 사용자에게 영향을 미치기 전에 식별하고 해결합니다.
-   **채널 기반 배포:** [베타 그룹으로 업데이트 테스트](https://capgo.app/blog/how-to-send-specific-version-to-users/) 후에 광범위하게 롤아웃합니다.

### CI/CD 통합

안전 조치가 마련된 후, Capgo를 CI/CD 파이프라인에 통합하여 원활하고 효율적인 배포를 진행할 수 있습니다. Capgo는 이미 50개 이상의 앱에 대해 CI/CD를 구성했으며, 다른 옵션과 비교했을 때 비용 효율적인 솔루션을 제공합니다 [\[1\]](https://capgo.app).

다음은 배포 명령에 대한 예입니다:

```bash
npx @capgo/cli deploy --channel production
```

Capgo는 다음과 같은 다양한 CI/CD 플랫폼을 지원합니다:

-   [GitHub Actions](https://docs.github.com/actions)
-   [GitLab CI](https://docs.gitlab.com/ee/ci/)
-   [Jenkins](https://www.jenkins.io/)
-   맞춤형 파이프라인 설정

> "GitHub Actions, GitLab CI 등 선호하는 플랫폼에서 CI/CD 파이프라인을 직접 구성합니다. CI/CD를 호스팅하거나 유지하는 데 비용을 청구하지 않습니다." - Capgo [\[1\]](https://capgo.app)

전문 지원을 원하는 팀을 위해 Capgo는 $2,600에 전문 CI/CD 구성 서비스를 제공합니다. 이 일회성 설정에는 맞춤형 파이프라인 구성과 모바일 앱 배포 모범 사례에 대한 전문가 조언이 포함됩니다 [\[1\]](https://capgo.app).

## 일반 문제 해결

[Capacitor 업데이트](https://capgo.app/plugins/capacitor-updater/)는 때때로 앱의 안정성을 방해하는 문제를 일으킬 수 있습니다. 다음은 이러한 일반 문제를 효과적으로 해결하는 방법입니다.

### 패키지 충돌 수정

먼저 Capacitor 패키지의 버전 불일치를 확인하세요. 다음 명령어를 사용합니다:

```bash
npm ls @capacitor/core
```

출력을 검토하고 **@capacitor/core**, **@capacitor/ios**, **@capacitor/android**의 버전이 `package.json` 파일에 일관된지 확인하세요. 충돌이 발견되면 문제의 패키지를 업데이트하거나 제거하여 환경을 안정화하세요.

이 문제를 해결한 후 설치된 모든 플러그인이 업데이트된 Capacitor 버전과 호환되는지 다시 확인하세요.

### 플러그인 지원 확인

업데이트하기 전에 플러그인이 최신 Capacitor 버전과 호환되는지 확인하세요. 플러그인 호환성을 관리하고 확인하는 다음 명령어를 사용하세요:

| **작업** | **명령어** | **목적** |
| --- | --- | --- |
| 플러그인 목록 | `npx cap ls` | 설치된 모든 플러그인을 표시합니다 |
| 버전 확인 | `npm outdated` | 구식 플러그인을 식별합니다 |
| 플러그인 업데이트 | `npm update` | 플러그인을 호환 가능한 버전으로 업데이트합니다 |

**Capgo**와 같은 라이브 업데이트 도구를 사용하는 경우 플러그인이 동적 업데이트를 지원하는지 확인하세요. 이는 런타임 충돌을 방지하고 원활한 성능을 보장하는 데 도움이 됩니다.

### 빌드 오류 해결

빌드 오류는 플랫폼에 따라 다양할 수 있지만, 다음은 플랫폼별 수정 방법입니다:

**iOS:**

빌드 폴더를 다음 명령어를 사용하여 정리하세요:

```bash
xcodebuild clean -workspace ios/App/App.xcworkspace -scheme App
```

**안드로이드의 경우:**

다음 명령어를 실행하여 Gradle 캐시를 지우세요:

```bash
cd android && ./gradlew clean
```

정리 후에도 오류가 계속 발생하면 영향을 받는 플랫폼을 다시 추가해야 할 수 있습니다. 방법은 다음과 같습니다:

```bash
npx cap rm ios
npx cap rm android
npx cap add ios
npx cap add android
```

마지막으로, 라이브 업데이트를 위해 Capgo를 사용하는 경우, 추가 문제를 피하기 위해 빌드 구성이 플랫폼의 요구 사항을 충족하는지 다시 확인하세요.

## 요약

이 섹션에서는 [업데이트 관리](https://capgo.app/docs/plugin/cloud-mode/manual-update/)에 필요한 필수 단계 및 도구를 강조하고 있으며, [Capacitor CLI 명령어](https://capgo.app/docs/cli/commands/)를 효과적으로 사용하는 방법이 앱 개발에서 원활한 작업 흐름을 보장하는 방법을 강조하고 있습니다. 논의된 도구와 전략은 업데이트를 단순화하면서 잠재적 위험을 줄이는 것을 목표로 합니다.

이전에는 Capgo가 **1.7K 생산 앱**을 지원한다고 언급했으며, 이는 **82% 업데이트 성공률**을 달성하고 있습니다 [\[1\]](https://capgo.app). 즉각적인 업데이트 기능은 **95%의 사용자들이 24시간 이내에 업데이트**할 수 있도록 하여 그 효율성을 보여줍니다 [\[1\]](https://capgo.app).

다음은 Capgo의 성능 지표 스냅샷입니다:

| 지표 | 성능 |
| --- | --- |
| 글로벌 API 응답 시간 | 434ms |
| 5MB 번들 다운로드 속도 | 114ms |
| 업데이트 성공률 | 82% |

> "우리는 애자일 개발을 실천하며 @Capgo는 사용자에게 지속적으로 제공하는 데 필수적입니다!" - Rodrigo Mantica [\[1\]](https://capgo.app)

최신 업데이트 도구는 몇 가지 주목할 만한 이점을 제공합니다:

-   **종단 간 암호화**를 통한 안전한 업데이트 전달
-   **부분 업데이트**로 수정된 구성 요소만 다운로드하여 대역폭 절약
-   **원클릭 롤백**으로 문제 발생 시 빠른 복구
-   **실시간 분석**으로 업데이트 성능 및 사용자 참여 모니터링

이러한 기능은 [버전 업데이트](https://capgo.app/docs/plugin/cloud-mode/hybrid-update/)를 효과적으로 관리하기 위한 견고한 프레임워크를 뒷받침합니다.

소규모 앱을 작업하든 대규모 배포를 확장하든, Capacitor CLI와 고급 업데이트 도구를 결합하면 오늘날 빠르게 변화하는 개발 환경에서 신뢰할 수 있고 효율적인 버전 관리를 보장할 수 있습니다.

## 자주 묻는 질문

::: faq
### Capacitor CLI로 앱을 업데이트할 때 어떤 어려움이 있을 수 있으며, 어떻게 해결할 수 있나요?

Capacitor CLI로 앱을 업데이트할 때 몇 가지 문제에 부딪힐 수 있습니다. 일반적인 어려움으로는 **의존성 충돌**, **플러그인에서의 파괴적인 변경**, 또는 **플랫폼 특정 구성 문제**가 있습니다. 이러한 문제는 종종 Capacitor 버전 간의 차이 또는 타사 플러그인의 업데이트에서 발생합니다.

이러한 문제를 해결하는 방법은 다음과 같습니다:

-   **이전 버전의 릴리스 노트**를 확인하세요. 파괴적인 변경 사항이나 수정이 필요한 사항을 살펴보세요.
-   프로덕션에 배포하기 전에 **스테이징 환경**에서 업데이트를 테스트하세요. 이는 사용자가 영향을 받기 전에 문제를 발견하고 수정하는 데 도움이 됩니다.
-   호환성 문제의 위험을 줄이기 위해 의존성과 플러그인을 정기적으로 업데이트하세요.

더 원활한 업데이트 경험을 위해 _Capgo_와 같은 도구를 시도해 볼 수도 있습니다. 이 도구를 사용하면 앱 스토어 승인 없이 사용자에게 직접 수정 사항과 새로운 기능을 푸시할 수 있습니다. 최소한의 다운타임으로 앱을 최신 상태로 유지할 수 있는 훌륭한 방법입니다.
:::

::: faq
### Capgo는 앱 업데이트를 어떻게 단순화하며, 어떤 두드러진 기능이 있나요?

Capgo는 개발자가 [앱 업데이트](https://capgo.app/plugins/capacitor-updater/)를 사용자에게 직접 푸시할 수 있도록 하여 앱 스토어 승인의 필요성을 우회함으로써 업데이트를 제공하는 방식을 단순화합니다. 이를 통해 사용자는 몇 분 만에 최신 업데이트를 즐길 수 있어 보다 부드럽고 효율적인 경험을 제공합니다.

Capgo의 두드러진 점은 다음과 같습니다:

-   **종단 간 암호화**로 업데이트의 보안을 보장합니다.
-   **CI/CD 통합**으로 원활한 작업 흐름을 유지합니다.
-   **사용자 특정 업데이트**로 정확한 타겟 롤아웃을 가능하게 합니다.
-   **유연한 조직 관리**로 모든 규모의 팀을 지원합니다.

Capgo는 완전한 오픈 소스이며 Apple 및 Android 표준을 준수하여 [실시간 앱 업데이트](https://capgo.app/blog/live-updates-for-flutter-app/)를 위한 신뢰할 수 있는 솔루션을 제공합니다.
:::

::: faq
### 업데이트하기 전에 플러그인이 최신 버전의 Capacitor와 호환되는지 어떻게 확인할 수 있나요?

최신 버전의 Capacitor로 업데이트하기 전에 플러그인이 업데이트를 처리할 준비가 되었는지 재확인하는 것이 중요합니다. 플러그인 설명서나 저장소를 살펴보아 버전별 요구 사항이나 업데이트가 있는지 확인하세요. 대부분의 플러그인은 지원하는 Capacitor 버전을 명확히 표시하므로 이 단계를 통해 불필요한 문제를 피할 수 있습니다.

컨트롤된 환경에서 업데이트된 Capacitor 버전으로 앱을 테스트할 수도 있습니다. 이렇게 하면 업데이트가 프로덕션에 적용되기 전에 호환성 문제를 발견하고 수정할 수 있습니다. **Capgo**와 같은 도구는 여기에서 생명의 은인이 될 수 있으며, 앱 스토어 승인 없이 직접 업데이트를 푸시할 수 있습니다. 이는 플랫폼 가이드라인 내에서 플러그인 관련 문제를 신속하게 해결할 수 있음을 의미합니다.
:::
