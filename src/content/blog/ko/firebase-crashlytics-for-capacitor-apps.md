---
slug: firebase-crashlytics-for-capacitor-apps
title: Firebase Crashlytics for Capacitor 앱
description: >-
  단계별 가이드를 통해 iOS와 Android 모두에서 Crashlytics를 설정하여 모바일 앱에 실시간 충돌 보고를 통합하는 방법을
  알아보세요.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-21T03:55:39.168Z
updated_at: 2025-04-21T03:56:15.479Z
head_image: >-
  https://assets.seobotai.com/capgo.app/6805ba51360079f947b8a1bf-1745207775479.jpg
head_image_alt: 모바일 개발
keywords: >-
  Firebase, Crashlytics, mobile apps, Capacitor, app development, crash
  reporting, error tracking
tag: 'Development, Mobile, Updates'
published: true
locale: ko
next_blog: ''
---
**[Firebase Crashlytics](https://firebase.google.com/docs/crashlytics)**는 실시간으로 앱 충돌을 추적하고, 문제를 신속하게 해결할 수 있는 상세 보고서를 제공합니다. iOS와 Android 앱 모두에서 [Capacitor](https://capacitorjs.com/)와 원활하게 통합됩니다. 알아야 할 사항은 다음과 같습니다:

- **Crashlytics를 사용하는 이유**
    
    - **실시간 충돌 알림** 받기
    - **자동 이슈 그룹화**와 함께 상세한 충돌 보고서 분석
    - 앱 안정성 유지를 위한 중요 오류 모니터링
- **설정 요구사항:**
    
    - **[Node.js](https://nodejs.org/en) (v16+)**, **Capacitor (v4+)**, **[Xcode](https://developer.apple.com/xcode/) 14+** 및 **[Android Studio](https://developer.android.com/studio) Electric Eel**과 같은 도구 설치
    - [Firebase](https://firebase.google.com/) 설정 파일 다운로드 (iOS용 `GoogleService-Info.plist`, Android용 `google-services.json`)
    - `Podfile` (iOS)와 `build.gradle` (Android)같은 플랫폼별 파일 업데이트
- **주요 단계:**
    
    - Crashlytics 설치:
        
        ```bash
        npm install @capacitor-firebase/crashlytics && npx cap sync
        ```
        
    - 앱에서 Crashlytics 초기화:
        
        ```typescript
        import { FirebaseCrashlytics } from '@capacitor-firebase/crashlytics';
        await FirebaseCrashlytics.initialize();
        ```
        
- **설정 테스트:**
    
    - 테스트 충돌 트리거:
        
        ```typescript
        await FirebaseCrashlytics.crash();
        ```
        
- **보너스 팁:** 앱 스토어 지연 없이 즉각적인 실시간 업데이트를 위해 Crashlytics를 **[Capgo](https://capgo.app/)**와 결합하세요.
    

이 가이드는 앱이 충돌 없이 사용자 친화적이 되도록 보장합니다. 오늘 Firebase Crashlytics 설정을 시작하세요!

## 2021 Android 가이드: [Firebase Crashlytics](https://firebase.google.com/docs/crashlytics) - 커스텀 충돌 ...

![Firebase Crashlytics](https://assets.seobotai.com/capgo.app/6805ba51360079f947b8a1bf/3578d58943ebaf5b91a7f0e1afb1607f.jpg)

<iframe src="https://www.youtube.com/embed/JxVYfZprK0g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## 설정 요구사항

시작하기 전에 다음 단계를 완료했는지 확인하세요:

### 필수 소프트웨어 및 계정

다음을 설치해야 합니다:

- **Node.js** (v16 이상)와 **Capacitor** (v4 이상)
- 활성 프로젝트가 있는 **Firebase 계정**
- iOS 개발을 위한 **Xcode 14+**
- Android 개발을 위한 **Android Studio Electric Eel** 또는 최신 버전
- 최신 버전의 **[CocoaPods](https://cocoapods.org/)** (iOS에 필수)

### 플랫폼 설정 파일

**iOS의 경우:**

- Firebase Console에서 `GoogleService-Info.plist` 파일 다운로드
- Crashlytics 의존성을 포함하도록 `Podfile` 업데이트
- `Info.plist` 파일에 필요한 프라이버시 키 추가

**Android의 경우:**

- Firebase Console에서 `google-services.json` 파일 획득
- 프로젝트 수준과 앱 수준 `build.gradle` 파일 모두 수정
- 필요한 권한을 포함하도록 `AndroidManifest.xml` 업데이트

### [Firebase](https://firebase.google.com/) 콘솔 설정

![Firebase](https://assets.seobotai.com/capgo.app/6805ba51360079f947b8a1bf/e510e8ab32244fff0b09e93222500c83.jpg)

다음 단계를 통해 Firebase를 설정하고 Crashlytics를 활성화하세요:

1. **Firebase 프로젝트를 생성**하고 Crashlytics를 활성화하세요.

2. Firebase Console에서 **앱을 등록**하세요:
    
    - iOS는 **번들 ID**를, Android는 **패키지 이름**을 사용하세요.
    - 설정 파일 다운로드: `GoogleService-Info.plist` (iOS)와 `google-services.json` (Android)

3. 다음 의존성을 추가하여 **Firebase SDK**를 앱에 통합하세요:
    
    **Android (앱 수준 `build.gradle`):**
    
    ```kotlin
    dependencies {
        implementation platform('com.google.firebase:firebase-bom:32.0.0')
        implementation 'com.google.firebase:firebase-crashlytics'
        implementation 'com.google.firebase:firebase-analytics'
    }
    ```
    
    **iOS (`Podfile`):**
    
    ```ruby
    pod 'Firebase/Crashlytics'
    pod 'Firebase/Analytics'
    ```

이러한 단계가 완료되면 플러그인 설치 섹션으로 진행할 준비가 된 것입니다.

## 설치 단계

### 플러그인 설치

먼저 플러그인을 설치하고 [Capacitor와 동기화](https://capgo.app/plugins/capacitor-updater/)하세요:

```bash
npm install @capacitor-firebase/crashlytics && npx cap sync
```

그런 다음 앱에서 Crashlytics를 초기화하세요. `app.component.ts` 또는 `main.ts`에 다음 코드를 추가하세요:

```typescript
import { FirebaseCrashlytics } from '@capacitor-firebase/crashlytics';
await FirebaseCrashlytics.initialize();
```

### 플랫폼 설정

Android와 iOS 플랫폼에 대한 필수 설정을 구성하세요.

**Android 설정**

1. 앱 수준 `build.gradle` 파일에 Crashlytics Gradle 플러그인 추가:
    
    ```kotlin
    buildscript { 
        dependencies { 
            classpath 'com.google.firebase:firebase-crashlytics-gradle:2.9.5' 
        } 
    }
    apply plugin: 'com.google.firebase.crashlytics'
    ```
    
2. `AndroidManifest.xml`에서 충돌 수집 활성화:
    
    ```xml
    <meta-data
        android:name="firebase_crashlytics_collection_enabled"
        android:value="true" />
    ```

**iOS 설정**

1. `AppDelegate.swift`에서 Firebase 설정:
    
    ```swift
    import Firebase
    FirebaseApp.configure()
    ```

### 설정 테스트

Firebase Console에서 테스트 충돌을 실행하고 확인하여 Crashlytics가 작동하는지 확인하세요:

- 커스텀 키로 테스트 충돌 트리거:
    
    ```typescript
    await FirebaseCrashlytics.setCustomKey({key: 'test_scenario', value: 'manual_crash'});
    await FirebaseCrashlytics.crash();
    ```
    
- 선택적으로 사용자 식별:
    
    ```typescript
    await FirebaseCrashlytics.setUserId({userId: 'user123'});
    ```
    
- 커스텀 이벤트 로깅:
    
    ```typescript
    await FirebaseCrashlytics.log({message: 'Test crash triggered'});
    ```

스택 추적, 기기 세부정보, 커스텀 키를 포함한 보고서가 약 5분 내에 Firebase Console에 나타나야 합니다.

**중요:** 앱 출시 전에 충돌 호출을 제거하세요. 개발 중에 충돌 수집을 비활성화하려면 다음을 사용하세요:

```typescript
await FirebaseCrashlytics.setCrashlyticsCollectionEnabled({enabled: false});
```

## 모니터링 가이드

테스트 충돌로 설정을 확인한 후에는 Firebase Console을 사용하여 실제 앱의 충돌과 오류를 추적하세요.

### 충돌 보고서 읽기

Firebase Console의 Crashlytics 섹션에서 충돌 보고서를 찾을 수 있습니다. 다음과 같은 내용을 볼 수 있습니다:

- **충돌 없는 사용자**: 충돌을 경험하지 않은 사용자의 비율
- **이슈 안정성**: 충돌이 발생하는 빈도
- **영향 분석**: 영향을 받은 사용자 수

모든 이슈를 클릭하여 스택 추적, 기기 정보(예: OS 버전, 메모리), 커스텀 키, 로그, 충돌 전까지의 사용자 여정과 같은 세부 정보를 자세히 볼 수 있습니다.

**프로 팁**: 충돌 비율이 갑자기 증가할 때 알림을 받으려면 "속도 알림" 기능을 활성화하세요. 이는 너무 많은 사용자에게 영향을 미치기 전에 문제를 해결하는 데 도움이 될 수 있습니다.

### 오류 관리 팁

- **영향도로 우선순위 지정**: 가장 많은 사용자에게 영향을 미치거나 앱의 중요 부분에서 발생하는 충돌에 집중하세요. 트렌드를 추적하면 긴급한 이슈를 식별하는 데 도움이 됩니다.
    
- **커스텀 키 사용**: 커스텀 키로 충돌 보고서에 컨텍스트를 추가하세요. 예시:
    
    ```typescript
    await FirebaseCrashlytics.setCustomKey({
      key: 'current_view',
      value: 'payment_processing'
    });
    ```
    
- **유사한 이슈 그룹화**: Firebase의 자동 이슈 그룹화를 활용하세요. 일관된 커스텀 키로 관련 충돌에 태그를 지정하고 쉽게 추적할 수 있도록 명확하고 설명적인 제목을 사용할 수도 있습니다.

### 사용자 개인정보 보호

규정 준수와 사용자 데이터 보호를 위해 다음 지침을 따르세요:

- **권한**:
    
    - 개인정보 처리방침에 충돌 보고를 언급하세요.
    - GDPR 규정이 있는 지역에서는 데이터 수집에 대한 사용자 동의를 받으세요.
    - 사용자에게 충돌 보고를 거부할 수 있는 옵션을 제공하세요.
- **데이터 수집 제어**:
    
    ```typescript
    await FirebaseCrashlytics.setCrashlyticsCollectionEnabled({enabled: false});
    await FirebaseCrashlytics.setCrashlyticsCollectionEnabled({enabled: true});
    ```
    
- **데이터 보존**:
    
    - 90일 후 자동 데이터 삭제 설정
    - 보고서에서 민감한 정보 제거
    - 디버깅하면서도 사용자 개인정보를 보호하기 위해 식별 불가능한 커스텀 키 사용

## [Capgo](https://capgo.app/) 통합

![Capgo](https://assets.seobotai.com/capgo.app/6805ba51360079f947b8a1bf/12eddca90b08193253253ea10516a6c4.jpg)

Capgo의 실시간 업데이트 시스템과 Crashlytics를 페어링하여 충돌 감지부터 수정 배포까지의 프로세스를 간소화하세요.

### Capgo 소개

Capgo는 [Capacitor 앱](https://capgo.app/blog/capacitor-comprehensive-guide/)을 위해 특별히 설계된 실시간 업데이트 도구입니다. 프로덕션에서 1,900개 이상의 앱과 24시간 이내 95%의 업데이트 비율로, 앱 스토어 승인 지연 없이 신속한 수정을 보장합니다 [\[1\]](https://capgo.app/).

주요 기능:

- 안전한 업데이트를 위한 **엔드투엔드 암호화**
- 이전 버전으로의 **원클릭 롤백**
- 대상 지정 릴리스를 위한 **채널 기반 배포**
- **원활한 CI/CD 통합**
- **100% 오픈소스 플랫폼**

### Crashlytics와 Capgo 함께 사용하기

Crashlytics를 Capgo와 함께 사용하면 이슈를 신속하게 식별하고 해결할 수 있는 효율적인 워크플로우가 생성됩니다.

작동 방식:

1. **충돌 감지 및 대응**  
   Crashlytics가 충돌을 식별하고, Capgo를 통해 앱 스토어 승인을 기다리지 않고 즉시 수정사항을 배포할 수 있습니다.
    
2. **대상 지정 업데이트**
    
    - _베타 테스팅_: 특정 그룹과 함께 수정사항을 테스트하여 효과를 확인
    - _단계적 롤아웃_: 위험을 줄이기 위해 점진적으로 업데이트 배포
    - _긴급 수정_: 긴급한 이슈를 해결하기 위해 신속하게 패치 푸시
3. **모니터링 및 검증**  
   Capgo로 업데이트를 배포한 후 Crashlytics를 사용하여 충돌 비율을 추적하고 이슈가 해결되었는지 확인

### 보안 및 앱 스토어 규칙

Capgo는 강력한 보안 기능을 제공하면서 Apple과 Google의 정책을 준수합니다:

- 82% 글로벌 업데이트 전달 성공률 [\[1\]](https://capgo.app/)
- 더 나은 구성을 위한 자동

### 설정 단계 요약

세 가지 주요 시작 단계를 완료했습니다:

-   Firebase 프로젝트를 생성하고 iOS/Android 앱을 등록했습니다.
-   Crashlytics 플러그인을 설치하고 구성했습니다.
-   필요한 iOS 및 Android 플랫폼 파일을 업데이트했습니다.

### 이러한 도구를 통합하는 이유는?

Firebase Crashlytics와 Capgo를 함께 사용하면 오류 추적과 [업데이트 관리](https://capgo.app/docs/plugin/cloud-mode/manual-update/)를 위한 강력한 시스템을 얻을 수 있습니다. 이 조합이 제공하는 것:

-   **빠른 수정**: 한 번의 클릭으로 즉각적인 업데이트와 변경 사항 롤백이 가능합니다.
-   **안정적인 배포**: 업데이트가 광범위하게 적용되고 사용자에게 원활하게 전달되도록 보장합니다.

### 다음 단계는?

1.  Firebase 콘솔에서 상세 크래시 분석을 활성화하세요.
2.  간소화된 업데이트를 위해 CI/CD 파이프라인에 Capgo를 추가하세요.
3.  [Capgo 채널](https://capgo.app/docs/webapp/channels/)을 사용하여 단계별로 수정 사항을 테스트하고 출시하세요.

Crashlytics와 Capgo가 설정되면, 앱을 원활하게 운영하고 시간이 지남에 따라 개선할 준비가 된 것입니다.
