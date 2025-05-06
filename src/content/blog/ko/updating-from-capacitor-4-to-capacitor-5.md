---
slug: updating-from-capacitor-4-to-capacitor-5
title: 'Capacitor 4에서 Capacitor 5로 업데이트하기: 단계별 가이드'
description: >-
  최소한의 주요 변경사항으로 Capacitor 4에서 Capacitor 5로 프로젝트를 업데이트하는 방법을 알아보세요. 공식 플러그인과 필요한
  도구 업데이트를 포함합니다.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-09T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capacitor-5-update.webp
head_image_alt: Capacitor 4에서 5로의 업데이트 도해
keywords: >-
  Capacitor, mobile app development, live updates, OTA updates, continuous
  integration, mobile app updates
tag: Capacitor
published: true
locale: ko
next_blog: ''
---
Capacitor 4에서 Capacitor 5로의 전환은 이전 업데이트에 비해 최소한의 주요 변경사항만 포함합니다. 이 가이드는 프로젝트를 Capacitor 5로 업데이트하는 단계별 지침과 공식 플러그인의 주요 변경사항 목록을 제공합니다.

**참고**: Capacitor 5는 NodeJS 16 이상이 필요합니다. Node 12는 수명이 종료되었고 Node 14는 2023년 4월 30일에 수명이 종료될 예정이기 때문입니다. NodeJS의 최신 LTS 버전을 사용하는 것이 권장됩니다.

1. 프로젝트에 Capacitor CLI의 `latest` 버전을 설치하세요:

   ```
   npm i -D @capacitor/cli@latest
   ```

2. CLI가 마이그레이션을 처리하도록 다음 명령을 실행하세요:

   ```
   npx cap migrate
   ```

   마이그레이션 단계를 완료할 수 없는 경우 터미널 출력에 추가 정보가 제공됩니다. 수동 마이그레이션 단계는 아래에 나열되어 있습니다.

3. VS Code 확장 프로그램이 설치되어 있다면, 확장 프로그램의 추천 섹션에서 프로젝트를 Capacitor 5로 마이그레이션하는 옵션을 확인하세요.

### Capacitor 4 iOS 프로젝트를 Capacitor 5로 업그레이드

1. **Xcode 업그레이드**: Capacitor 5는 Xcode 14.1 이상이 필요합니다.

2. **.gitignore 업데이트**: `.gitignore` 파일에 다음 변경사항을 적용하세요:

   ```
   - App/Podfile.lock
   + App/output
   ```

3. **단일 앱 아이콘을 사용하도록 에셋 업데이트**: Xcode 14는 1024x1024 크기의 단일 앱 아이콘을 지원합니다. 불필요한 크기를 제거하여 AppIcon.appiconset을 정리하세요.

### Capacitor 4 Android 프로젝트를 Capacitor 5로 업그레이드

1. **Android Studio 업그레이드**: Capacitor 5는 Gradle 8 사용으로 인해 Java JDK 17이 필요한 Android Studio Flamingo | 2022.2.1 이상이 필요합니다. Java 17은 Android Studio Flamingo와 함께 제공되므로 추가 다운로드가 필요하지 않습니다.

2. **AGP 업그레이드 어시스턴트 실행**: Android Studio는 Gradle 관련 업데이트와 패키지를 빌드 파일로 이동하는 것을 도울 수 있습니다. 시작하려면 `Tools -> AGP Upgrade Assistant`를 실행하세요.

3. **Android 프로젝트 변수 업데이트**: `variables.gradle` 파일에서 다음과 같이 새로운 최소값으로 업데이트하세요:

   ```
   minSdkVersion = 22
   compileSdkVersion = 33
   targetSdkVersion = 33
   androidxActivityVersion = '1.7.0'
   androidxAppCompatVersion = '1.6.1'
   androidxCoordinatorLayoutVersion = '1.2.0'
   androidxCoreVersion = '1.10.0'
   androidxFragmentVersion = '1.5.6'
   coreSplashScreenVersion = '1.0.0'
   androidxWebkitVersion = '1.6.1'
   junitVersion = '4.13.2'
   androidxJunitVersion = '1.1.5'
   androidxEspressoCoreVersion = '3.5.1'
   cordovaAndroidVersion = '10.1.1'
   ```

4. **Google Services 업데이트**:

   ```
   # build.gradle
   dependencies {
   -       classpath 'com.google.gms:google-services:4.3.13'
   +       classpath 'com.google.gms:google-services:4.3.15'
   }
   ```

5. **Gradle 플러그인을 8.0.0으로 업데이트**:

   ```
   # build.gradle
   dependencies {
   -       classpath 'com.android.tools.build:gradle:7.2.1'
   +       classpath 'com.android.tools.build:gradle:8.0.0'
   }
   ```

6. **Gradle wrapper를 8.0.2로 업데이트**:

   ```
   # gradle-wrapper.properties
   distributionBase=GRADLE_USER_HOME
   distributionPath=wrapper/dists
   - distributionUrl=https\://services.gradle.org/distributions/gradle-7.4.2-all.zip
   + distributionUrl=https\://services.gradle.org/distributions/gradle-8.0.2-all.zip
   zipStoreBase=GRADLE_USER_HOME
   zipStorePath=wrapper/dists
   ```

7. **Jetifier 비활성화**:

   ```
   # gradle.properties
   android.useAndroidX=true
   - android.enableJetifier=true
   ```

8. **패키지를 `build.gradle`로 이동**:

   ```
   # AndroidManifest.xml
   <?xml version="1.0" encoding="utf-8"?>
   - <manifest xmlns:android="http://schemas.android.com/apk/res/android"
   -     package="[YOUR_PACKAGE_ID]">
   + <manifest xmlns:android="http://schemas.android.com/apk/res/android">
   ```

   ```
   # build.gradle
   android {
   +     namespace "[YOUR_PACKAGE_ID]"
         compileSdkVersion rootProject.ext.compileSdkVersion
   ```

9. **androidScheme 업데이트**: Capacitor 6에서는 기존 앱의 `androidScheme` 기본값이 시스템 자동완성 기능을 더 잘 활용할 수 있도록 `https`로 설정됩니다. 이 변경으로 인한 데이터 손실을 방지하기 위해 현재 기본값이더라도 지금 scheme을 `http`로 설정하세요.

   ```
   {
     server: {
       androidScheme: "http"
     }
   }
   ```

10. **Kotlin 버전 업데이트**: 프로젝트에서 Kotlin을 사용하는 경우 `kotlin_version` 변수를 `'1.8.20'`으로 업데이트하세요.

### 플러그인 기능 변경사항

다음 플러그인 기능이 수정되거나 제거되었습니다. 코드를 적절히 업데이트하세요:

- Action Sheet
- Browser
- Camera
- Device
- Geolocation
- Google Maps
- Local Notifications
- Push Notifications
- Status Bar

### Action Sheet

- `androidxMaterialVersion` 변수를 `1.8.0`으로 업데이트하세요.

### Browser

- `androidxBrowserVersion` 변수를 `1.5.0`으로 업데이트하세요.

### Camera

- Android 13의 경우 `AndroidManifest.xml`에 미디어 이미지 읽기 권한(`<?xml version="1.0" encoding="utf-8"?>`)을 추가하세요.
- `androidxMaterialVersion` 변수를 `1.8.0`으로 업데이트하세요.
- `androidxExifInterfaceVersion` 변수를 `1.3.6`으로 업데이트하세요.

### Device

- `DeviceId.uuid`를 `DeviceId.identifier`로 변경하세요.
- iOS 16 이상에서는 적절한 [entitlements](https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_developer_device-information_user-assigned-device-name/)를 추가하지 않으면 `DeviceInfo.name`이 일반 기기 이름을 반환합니다.

### Geolocation

- `playServicesLocationVersion`을 `21.0.1`로 업데이트하세요.

### Google Maps

- 다음 변수들을 업데이트하세요:
  - `googleMapsPlayServicesVersion`을 `18.1.0`으로
  - `googleMapsUtilsVersion`을 `3.4.0`으로
  - `googleMapsKtxVersion`을 `3.4.0`으로
  - `googleMapsUtilsKtxVersion`을 `3.4.0`으로
  - `kotlinxCoroutinesVersion`을 `1.6.4`로
  - `androidxCoreKTXVersion`을 `1.10.0`으로
  - `kotlin_version`을 `1.8.20`으로

### Local Notifications

- Android 13에서 SDK 33을 대상으로 할 때 로컬 알림을 예약하려면 새로운 런타임 권한 확인이 필요합니다. 적절히 `checkPermissions()`와 `requestPermissions()`를 호출하세요.

### Push Notifications

- Android 13에서 SDK 33을 대상으로 할 때 푸시 알림을 받으려면 새로운 런타임 권한 확인이 필요합니다. 적절히 `checkPermissions()`와 `requestPermissions()`를 호출하세요.
- `firebaseMessagingVersion` 변수를 `23.1.2`로 업데이트하세요.

### Status Bar

- iOS에서 기본 상태 바 애니메이션이 `FADE`로 변경되었습니다.

이 단계들을 따르고 코드를 적절히 업데이트하면 이제 프로젝트를 Capacitor 4에서 Capacitor 5로 성공적으로 업데이트했을 것입니다. 모든 기능과 플러그인이 예상대로 작동하는지 확인하기 위해 애플리케이션을 철저히 테스트하세요.
