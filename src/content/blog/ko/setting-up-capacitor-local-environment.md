---
slug: setting-up-capacitor-local-environment
title: Capacitor 로컬 환경 설정
description: >-
  이 종합 가이드를 통해 웹 기술을 사용하여 iOS 및 Android 앱을 구축하기 위한 로컬 Capacitor 환경을 빠르게 설정하는 방법을
  알아보세요.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-03T01:01:07.065Z
updated_at: 2025-04-03T01:01:18.509Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67edd19cebbb9dc8064069d2-1743642078509.jpg
head_image_alt: 모바일 개발
keywords: >-
  Capacitor, mobile development, iOS setup, Android setup, app development, web
  technologies, local environment
tag: 'Development, Mobile, Updates'
published: true
locale: ko
next_blog: ''
---
**웹 기술을 사용하여 iOS 및 Android 앱을 구축하고 싶으신가요? 로컬 [Capacitor](https://capacitorjs.com/) 환경을 빠르고 효율적으로 설정하는 방법을 알아보겠습니다.**

### 주요 단계:

1. **필수 소프트웨어 설치**:
    
    - **[Node.js](https://nodejs.org/en)** (v20.0.0+), **npm** (v9.0.0+), **Git** (v2.40.0+), 현대적인 IDE (예: [VS Code](https://code.visualstudio.com/)).
    - 시스템 요구사항: 8GB RAM, 256GB 저장공간, Intel i5/AMD Ryzen 5 프로세서.

2. **iOS 설정** (macOS 전용):
    
    - macOS 13.0+ (Ventura), [Xcode](https://developer.apple.com/xcode/) 16.0+, [CocoaPods](https://cocoapods.org/) 1.12.0+, 활성화된 Apple Developer 계정.

3. **Android 설정**:
    
    - [Android Studio](https://developer.android.com/studio) Hedgehog (2023.1.1)+, Android SDK API level 23+, JDK 17, [Gradle](https://gradle.org/) 8.0+.
    - Android 도구를 위한 환경 변수 설정.

4. **Capacitor 설치**:
    
    ```bash
    npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
    ```
    
5. **프로젝트 초기화**:
    
    - `npx cap init`를 사용하여 새 프로젝트를 생성하거나 기존 앱에 Capacitor 통합.

6. **플랫폼 추가**:
    
    ```bash
    npx cap add ios
    npx cap add android
    ```
    
7. **빌드 및 동기화**:
    
    - 웹 에셋 빌드 (`npm run build`) 및 네이티브 플랫폼과 동기화 (`npx cap sync`).

8. **실시간 업데이트 활성화**:
    
    - [Capgo](https://capgo.app/)를 사용하여 실시간 업데이트:
        
        ```bash
        npx @capgo/cli init
        ```
        
9. **[앱 테스트](https://capgo.app/docs/plugin/debugging/)**:
    
    - iOS 시뮬레이터 (`npx cap open ios`) 또는 Android 에뮬레이터 (`npx cap open android`) 사용.

### 빠른 팁:

환경 관리 및 실시간 업데이트 활성화를 위해 `capacitor.config.ts`를 업데이트하세요. 예시:

```typescript
const config: CapacitorConfig = {
  server: {
    url: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://production-url.com',
    cleartext: true
  }
};
```

이 설정을 통해 Capacitor 앱의 개발, 테스트, 배포가 원활해집니다.

[계속...]
