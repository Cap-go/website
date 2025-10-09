---
slug: installing-capacitor-cli-step-by-step-guide
title: 'Capacitor CLI 설치하기: 단계별 가이드'
description: 웹 앱을 네이티브 모바일 앱으로 효율적으로 변환하기 위한 Capacitor CLI의 설치 및 구성 방법을 알아보세요.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-04T02:49:29.961Z
updated_at: 2025-10-09T00:13:34.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67ef362eebbb9dc80641f34f-1743734983341.jpg
head_image_alt: 모바일 개발
keywords: 'Capacitor, CLI, mobile app development, Node.js, Android, iOS, live updates'
tag: 'Development, Mobile, Updates'
published: true
locale: ko
next_blog: ''
---
**[Capacitor](https://capacitorjs.com/) CLI는 하나의 코드베이스로 웹 앱을 네이티브 iOS 및 Android 앱으로 변환하는 데 도움을 줍니다.** 다음과 같이 빠르게 설정할 수 있습니다:

-   **전제 조건**: [Node.js](https://nodejs.org/en) (v16+), npm, 웹 프레임워크(React, Vue, Angular 등)를 설치하세요.
-   **[Capacitor CLI 설치](https://capgo.app/docs/cli/commands)**: `npm install @capacitor/cli @capacitor/core`를 실행하고 `npx cap init`으로 프로젝트를 초기화하세요.
-   **플랫폼 준비**: iOS(`npx cap add ios`)와 Android(`npx cap add android`) 플랫폼 지원을 추가하세요.
-   **빌드 및 동기화**: `npm run build`와 `npx cap sync`를 사용하여 웹 자산을 네이티브 프로젝트로 전송하세요.
-   **선택적 실시간 업데이트**: [Capgo](https://capgo.app/)와 같은 도구를 사용하여 앱 스토어 지연 없이 즉시 업데이트를 푸시하세요.

Capacitor CLI는 앱 개발과 유지보수를 단순화합니다. 원활한 설정과 문제 해결을 위해 가이드를 따르세요.

## 모바일 앱을 빠르게 만들기! React + [Capacitor](https://capacitorjs.com/) + [Tailwind](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)

![Capacitor](https://assets.seobotai.com/capgo.app/67ef362eebbb9dc80641f34f/7e137b9b90adb3934b29b03381f213c1.jpg)

<iframe src="https://www.youtube.com/embed/PPXktTJXMPE" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## 시작하기 전에

다음 단계에 따라 환경을 준비하세요:

### [Node.js](https://nodejs.org/en)와 npm 설정

![Node.js](https://assets.seobotai.com/capgo.app/67ef362eebbb9dc80641f34f/a74739743b1f15b8d0bf124a9c30cba9.jpg)

Node.js 버전 16 이상이 필요합니다. 최신 LTS 버전을 권장합니다. 설정을 확인하려면 다음을 실행하세요:

```bash
node --version
npm --version
```

업데이트가 필요한 경우, 공식 웹사이트에서 npm이 포함된 Node.js를 다운로드하세요.

Node.js가 준비되었는지 확인한 후, 웹 프로젝트가 Capacitor 요구사항을 충족하는지 확인하세요.

### 웹 프로젝트 확인

웹 프로젝트에는 다음이 필요합니다:

-   **유효한 package.json**: 적절하게 구성되어 있는지 확인하세요.
-   **빌드 디렉토리**: 웹 자산이 있는 위치입니다(일반적으로 `dist` 또는 `www`).
-   **진입점**: 빌드 디렉토리에는 `index.html` 파일이 포함되어야 합니다.

주요 `package.json` 필드를 살펴보겠습니다:

| 필수 필드 | 예시 값 | 용도 |
| --- | --- | --- |
| name | "my-app" | 프로젝트 식별 |
| version | "1.0.0" | 앱 버전 지정 |
| build directory | "dist" 또는 "www" | 웹 자산 위치 지정 |

Node.js와 웹 프로젝트가 준비되면 플랫폼별 도구 설치로 진행하세요.

### 필수 소프트웨어 설치

**Android 개발용:**

-   최신 버전의 **[Android Studio](https://developer.android.com/studio)**를 다운로드하고 설치하세요.
-   최소 API 레벨 22의 Android SDK를 설정하세요.
-   `ANDROID_HOME` 환경 변수를 구성하세요.

**iOS 개발용 (Mac 전용):**

-   **[Xcode](https://developer.apple.com/xcode/) 14** 이상 버전을 설치하세요.
    
-   Command Line Tools를 설치하세요.
    
-   [Homebrew](https://brew.sh/)를 사용하여 [CocoaPods](https://cocoapods.org/)를 설치하세요:
    
    ```bash
    brew install cocoapods
    ```
    
-   Xcode 라이선스를 수락하세요:
    
    ```bash
    sudo xcodebuild -license accept
    ```
    

나중에 Capgo를 통합할 때는 안정적인 인터넷 연결과 유효한 SSL 인증서가 있는지 확인하세요.

이러한 단계를 완료하면 원활한 Capacitor 개발 프로세스를 위한 준비가 완료됩니다. 다음으로 Capacitor CLI를 설치할 것입니다.

[이하 생략...]
