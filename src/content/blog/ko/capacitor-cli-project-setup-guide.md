---
slug: capacitor-cli-project-setup-guide
title: 'Capacitor CLI: 프로젝트 설정 가이드'
description: >-
  몇 가지 간단한 단계를 통해 웹 기술을 사용하여 네이티브 iOS 및 Android 앱을 빌드하기 위한 Capacitor CLI 설정 방법을
  알아보세요.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-18T03:02:50.225Z
updated_at: 2025-10-10T02:17:19.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/6801ba663c6b972ab5067847-1744945493935.jpg
head_image_alt: 모바일 개발
keywords: >-
  Capacitor, CLI, mobile apps, iOS, Android, project setup, live updates,
  troubleshooting
tag: 'Development, Mobile, Updates'
published: true
locale: ko
next_blog: ''
---
**하나의 코드베이스로 iOS와 Android 앱을 만들고 싶으신가요?** [Capacitor](https://capacitorjs.com/) CLI를 사용하면 웹 기술로 네이티브 앱을 만드는 과정이 간단해집니다. 다음과 같은 내용을 배우게 됩니다:

-   **빠른 설정**: Capacitor CLI를 설치하고 몇 분 안에 프로젝트를 초기화하세요.
-   **플랫폼 통합**: 간단한 명령어로 iOS와 Android 지원을 추가하세요.
-   **실시간 업데이트**: [Capgo](https://capgo.app/)를 사용하여 즉각적인 OTA 업데이트를 수행하세요.
-   **일반적인 해결방법**: 동기화 오류나 빌드 실패와 같은 문제를 해결하세요.

**시작하기 위한 주요 단계:**

1. [Node.js](https://nodejs.org/en), npm, JDK, [Xcode](https://developer.apple.com/xcode/), 그리고 [Android Studio](https://developer.android.com/studio)를 설치하세요.
2. `npm install @capacitor/core @capacitor/cli`를 실행하고 프로젝트를 초기화하세요.
3. `npx cap add ios`와 `npx cap add android`를 사용하여 iOS와 Android 플랫폼을 추가하세요.
4. 선택사항: 실시간 [앱 업데이트](https://capgo.app/plugins/capacitor-updater/)를 위해 Capgo를 설정하세요.

이 가이드는 Capacitor CLI 설정, 플랫폼 구성, 앱 배포에 필요한 모든 것을 다룹니다. 시작해볼까요!

## [Capacitor](https://capacitorjs.com/) 구성 소개

![Capacitor](https://assets.seobotai.com/capgo.app/6801ba663c6b972ab5067847/7e137b9b90adb3934b29b03381f213c1.jpg)

<iframe src="https://www.youtube.com/embed/HufvY63esXs" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## 설정 요구사항

시작하기 전에 다음 도구들이 설치되어 있는지 확인하세요:

-   **Node.js** (버전 14 이상)와 **npm**
-   **Java JDK** (버전 11 이상)
-   **Xcode** (iOS 빌드를 위한 버전 12 이상)
-   **Android Studio** (Android 빌드용)
-   **Capacitor CLI** (버전 6 또는 7)

_선택사항:_ 실시간 업데이트를 활성화하고 싶다면, 아래의 "[Capgo 설정 가이드](https://capgo.app/docs/plugin/cloud-mode/getting-started/)"를 확인하세요.

## CLI 설치 단계

시작하기 전에 **Node.js**, **npm**, **JDK**, **Xcode**, 그리고 **Android Studio**가 설정되어 있는지 확인하세요. 준비가 되면 다음 명령어로 Capacitor CLI를 설치할 수 있습니다:

```bash
npm install --save @capacitor/core @capacitor/cli
npx cap init
```

이 명령어는 Capacitor를 설치하고 핵심 구성요소를 설정합니다.

이 단계를 완료한 후, **새 프로젝트 생성**으로 이동하여 애플리케이션을 구축하세요.

## 새 프로젝트 생성

[Capacitor CLI를 사용하여](https://capgo.app/docs/cli/commands/) 프로젝트를 시작하려면 다음 단계를 따르세요:

```bash
mkdir my-app && cd my-app
npm init -y
npx cap init my-app com.company.app --web-dir dist
```

### 구성 파일 업데이트

`capacitor.config.json` 파일을 편집하여 다음 설정을 포함하세요:

```json
{
  "appId": "com.company.app",
  "appName": "My App",
  "webDir": "dist",
  "bundledWebRuntime": false,
  "server": {
    "hostname": "app.example.com",
    "androidScheme": "https"
  }
}
```

업데이트가 완료되면 이 구성을 사용하여 프로젝트에 Capacitor를 설정하세요.

## 플랫폼 설정

이제 프로젝트 구조가 완성되었으니 iOS와 Android 대상을 설정할 차례입니다.

### iOS와 Android 추가

Capacitor CLI를 사용하여 필요한 플랫폼별 패키지를 설치하는 것으로 시작하세요:

```bash
npm install @capacitor/ios @capacitor/android
npx cap add ios
npx cap add android
```

iOS의 경우 Xcode 14 이상, [CocoaPods](https://cocoapods.org/) 1.11 이상, 그리고 macOS 12 이상이 필요합니다. Android의 경우 Android Studio Giraffe (2022.3.1+), JDK 17 이상, 그리고 [Gradle](https://gradle.org/) 7.5 이상이 필요합니다.

설치가 완료되면 웹 애플리케이션의 변경사항에 맞춰 네이티브 대상을 업데이트해야 합니다.

### 플랫폼 업데이트

웹 앱을 업데이트한 후 플랫폼을 최신 웹 변경사항과 동기화하려면 다음 단계를 따르세요:

```bash
npm run build
npx cap sync
```

`cap sync` 명령어는 두 가지 작업을 수행합니다:

-   업데이트된 웹 자산을 네이티브 플랫폼에 복사
-   네이티브 구성과 플러그인을 최신 변경사항과 일치하도록 업데이트

### IDE 설정

적절한 IDE에서 플랫폼별 프로젝트를 열어보세요:

```bash
npx cap open ios     # Opens Xcode
npx cap open android # Opens Android Studio
```

**Xcode에서:**

1. 개발 팀을 선택하세요.
2. 서명 인증서를 설정하세요.
3. 번들 식별자를 업데이트하세요.

**Android Studio에서:**

1. `build.gradle`에서 애플리케이션 ID를 수정하세요.
2. 서명을 위한 키스토어를 구성하세요.
3. 디버그와 릴리스 빌드 변형을 설정하세요.

모든 것이 구성되면 `npx cap build ios` 또는 `npx cap build android`를 사용하여 프로젝트를 빌드하세요. 모든 자산이 최신 상태인지 확인하기 위해 `npx cap sync`를 다시 실행하는 것을 잊지 마세요.

## [Capgo](https://capgo.app/) 설정 가이드

![Capgo](https://assets.seobotai.com/capgo.app/6801ba663c6b972ab5067847/d09851ee64a6d6c4e2e08ff1d656af11.jpg)

앱의 즉각적인 OTA 업데이트를 활성화하기 위해 Capgo를 설정하세요.

### Capgo의 주요 기능

Capgo는 앱 업데이트를 간소화하는 여러 도구를 제공합니다:

-   **종단간 암호화**로 업데이트의 안전한 전달을 보장합니다.
-   앱 실행 시 업데이트가 **백그라운드에서** 실행됩니다.
-   **분석 도구**로 업데이트 성공률과 사용자 참여도를 추적할 수 있습니다.
-   **원클릭 롤백** 옵션으로 문제가 있는 업데이트를 빠르게 복구할 수 있습니다.
-   단계적 출시와 베타 테스트를 위해 **[채널 시스템](https://capgo.app/docs/plugin/cloud-mode/channel-system/)**을 사용하세요.

### Capgo 설치

Capgo를 시작하려면 다음 단계를 따르세요:

1. [Capgo CLI 설치](https://capgo.app/docs/self-hosted/local-dev/cli/):

```bash
    npm install --save @capgo/cli
    ```

2. 프로젝트에서 [Capgo 초기화](https://capgo.app/docs/webapp/):

```bash
    npx capgo init
    ```

3. 업데이트 빌드 및 배포:

```bash
    npm run build
    npx capgo release
    ```

4. 백그라운드 업데이트 프로세스를 시작하기 위해 앱을 여세요.

### 모범 사례

-   모든 사용자에게 배포하기 전에 채널을 사용하여 업데이트를 테스트하세요.
-   업데이트가 성공적으로 전달되고 사용자가 계속 참여하는지 확인하기 위해 분석을 모니터링하세요.
-   문제를 조기에 발견하고 수정하기 위해 오류 추적을 활성화하세요.
-   문제를 빠르게 해결하기 위해 롤백 기능을 준비하세요.

Capgo는 Capacitor 6과 7을 지원하며, CI/CD 파이프라인과 원활하게 통합되고, Apple과 Google 스토어 요구사항을 준수합니다.

## 일반적인 문제와 팁

플랫폼과 Capgo 설정을 완료한 후에는 몇 가지 일반적인 오류에 직면할 수 있습니다. 다음은 이를 빠르게 해결하는 방법입니다.

### 환경 설정 문제

-   **CLI를 찾을 수 없음**  
    **오류**: `npx cap` 명령이 실패합니다.  
    **해결**: `npm install --save @capacitor/cli @capacitor/core`를 실행하고 다시 시도하세요.

-   **Node 버전 불일치**  
    **오류**: Node.js 버전 오류로 인해 CLI 명령이 실패합니다.  
    **해결**: 설정 요구사항에 명시된 대로 Node.js 버전 14 이상을 설치하세요.

### 구성 문제

-   **구성 불일치**  
    **오류**: `capacitor.config.json`의 변경사항이 적용되지 않습니다.  
    **해결**: `appId`와 `webDir` 값이 프로젝트의 `package.json`과 웹 빌드 출력 폴더와 일치하는지 확인하세요.

-   **플랫폼 동기화 오류**  
    **오류**: `npx cap sync` 실행 시 플러그인 버전 충돌이 발생합니다.  
    **해결**: `@capacitor/android`와 `@capacitor/ios`를 동일한 메이저 버전으로 업데이트한 후 동기화 명령을 다시 실행하세요.

### 빌드 및 배포

-   **빌드 서명 실패**  
    **오류**: 인증서나 키스토어가 없어 iOS 또는 Android 빌드가 실패합니다.  
    **해결**: IDE 설정 지침을 따르세요. iOS의 경우 Xcode에서 개발 팀을 추가하고, Android의 경우 `build.gradle`에서 키스토어를 구성하세요.

-   **웹 디렉토리를 찾을 수 없음**  
    **오류**: `npx cap sync`가 웹 자산을 찾을 수 없습니다.  
    **해결**: 플랫폼을 동기화하기 전에 웹 빌드 명령(예: `npm run build`)을 실행하세요.

### 실시간 업데이트 문제

-   **[Capgo 업데이트 실패](https://capgo.app/docs/plugin/cloud-mode/manual-update/)**  
    **오류**: 프로덕션 앱에서 업데이트가 나타나지 않습니다.  
    **해결**: `capacitor.config.json`에서 [Capgo API 키](https://capgo.app/docs/webapp/api-keys/)를 다시 확인하고 올바른 채널을 대상으로 하고 있는지 확인하세요.

플랫폼별 설정에 대한 자세한 내용은 플랫폼 설정 섹션을 다시 확인하세요. 실시간 업데이트 작업을 하고 있다면 추가 문제 해결 팁을 위해 Capgo 설정 가이드를 참조하세요.

## 요약

### 설정 검토

Capacitor CLI로 웹 앱을 시작하고, iOS와 Android 플랫폼을 설정하고, 선택적으로 실시간 업데이트를 위해 Capgo를 포함하세요.

시작하는 방법은 다음과 같습니다:

-   Capacitor CLI를 사용하여 프로젝트를 초기화하세요.
-   앱의 패키지 ID를 설정하고 웹 출력 디렉토리를 정의하세요.
-   iOS와 Android 플랫폼에 대한 지원을 추가하세요.
-   다음 명령어로 Capgo를 설치하고 설정하세요: `npm install --save @capgo/cli && npx capgo init`

자세한 설
