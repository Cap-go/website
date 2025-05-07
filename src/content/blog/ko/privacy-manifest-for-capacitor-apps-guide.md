---
slug: privacy-manifest-for-capacitor-apps-guide
title: 'Capacitor 앱의 프라이버시 매니페스트: 가이드'
description: iOS 앱의 개인정보 보호를 준수하고 사용자 데이터를 효과적으로 보호하기 위한 Privacy Manifest 생성 방법을 알아보세요.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-02T03:07:47.047Z
updated_at: 2025-04-02T03:08:00.473Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67ec9a7d7747adc4bca8a776-1743563280473.jpg
head_image_alt: 모바일 개발
keywords: >-
  Privacy Manifest, Capacitor, App Store compliance, user data protection, app
  development, privacy standards
tag: 'Development, Mobile, Security'
published: true
locale: ko
next_blog: ''
---
[App Store](https://en.wikipedia.org/wiki/App_Store_\(Apple\))에 지연 없이 [Capacitor](https://capacitorjs.com/) 앱을 출시하고 싶으신가요? Privacy Manifest를 만드는 것부터 시작하세요. Apple은 이제 앱이 엄격한 개인정보 보호 기준을 충족하도록 개발자가 이 문서를 포함하도록 요구합니다. 다음은 알아야 할 사항입니다:

-   **Privacy Manifest란 무엇인가요?**  
    앱의 데이터 수집 관행, API 사용 및 추적 도메인을 설명하는 구조화된 파일입니다.
    
-   **중요한 이유:**
    
    -   거부나 삭제를 피하기 위한 App Store 규칙 준수
    -   사용자 데이터 처리에 대한 투명성으로 신뢰 구축
-   **포함해야 할 주요 구성 요소:**
    
    -   사용자 데이터에 접근하는 API(예: 위치, 사진)
    -   수집된 데이터 유형에 대한 개인정보 보호 레이블
    -   분석이나 광고에 사용되는 추적 도메인
-   **만드는 방법:**
    
    -   JSON을 사용하여 데이터 수집 세부 정보 정의
    -   프로젝트의 올바른 디렉토리에 `PrivacyInfo.xcprivacy` 파일 배치
    -   오류를 피하기 위해 [Xcode](https://developer.apple.com/xcode/)와 같은 도구로 검증
-   **프로세스를 단순화하는 도구:**  
    자동화된 개인정보 보호 매니페스트 검증, 실시간 업데이트 및 오류 추적을 위해 [Capgo](https://capgo.app/)와 같은 플랫폼을 사용하세요.
    

**이 가이드를 따라 규정을 준수하고, 사용자 개인정보를 보호하며, 앱 스토어 지연을 피하세요.**

## Privacy Manifest 기본 사항

### Privacy Manifest 정의

개인정보 보호 매니페스트는 앱의 데이터 관행을 설명하는 구조화된 파일입니다. 사용자 데이터에 접근하는 API, 추적 도메인, 수집된 데이터 유형 및 서드파티 SDK 통합과 같은 요소를 자세히 설명합니다. 이 문서는 신뢰를 구축할 뿐만 아니라 App Store 가이드라인 준수를 보장합니다. 매니페스트에 포함해야 할 주요 구성 요소를 살펴보겠습니다.

### 주요 Privacy Manifest 요소

다음은 Apple의 요구 사항에 맞춰 개인정보 보호 매니페스트에 포함해야 할 주요 요소입니다:

1.  **필수 이유 API**  
    이 섹션에는 앱이 사용하는 개인정보 보호 관련 API와 그것이 필요한 이유를 나열합니다.
    
    일반적인 API 요구 사항을 요약한 표:
    
    | API 카테고리 | 일반적인 사용 | 필수 문서 |
    | --- | --- | --- |
    | 위치 서비스 | 사용자 내비게이션 | 목적 문자열 및 사용 설명 |
    | 사진 라이브러리 | 프로필 사진 | 접근 수준 및 의도 |
    | 연락처 | 주소록 동기화 | 데이터 최소화 설명 |
    
2.  **개인정보 보호 레이블**  
    이 레이블은 다음을 명시하여 투명성을 제공합니다:
    
    -   수집되는 데이터 유형
    -   데이터 수집 이유
    -   데이터가 사용자 신원과 연결되는지 여부
    -   데이터가 추적에 어떻게 사용되는지
3.  **추적 도메인**  
    이 섹션에는 분석, 광고 또는 서드파티 데이터 처리에 사용되는 추적 관련 모든 도메인을 나열합니다.
    

> "App Store 규정 준수" - Capgo [\[1\]](https://capgo.app/)

Capgo에 따르면, 사용자의 95%가 24시간 이내에 업데이트를 준수합니다. 2,350만 건 이상의 업데이트가 전달된 [\[1\]](https://capgo.app/) 상황에서, 개인정보 보호 문서를 최신 상태로 유지하는 것은 사용자 신뢰를 유지하는 데 필수적입니다.

## [Capacitor](https://capacitorjs.com/)를 위한 Privacy Manifest 구축

![Capacitor](https://assets.seobotai.com/capgo.app/67ec9a7d7747adc4bca8a776/7e137b9b90adb3934b29b03381f213c1.jpg)

### 설정 요구 사항

매니페스트 구축을 시작하기 전에 다음 사항을 확인하세요:

-   Xcode 15 이상 설치
-   Capacitor 5.0+ 프로젝트 설정
-   앱의 `Info.plist` 파일에 대한 접근
-   JSON 구조에 대한 기본 이해
-   앱의 데이터 수집 관행을 설명하는 문서

### 생성 단계

iOS 프로젝트 디렉토리에 `PrivacyInfo.xcprivacy` 파일을 생성하세요. 이 파일은 특정 형식 지침을 따라야 합니다:

**기본 정보 설정**

```json
{
    "NSPrivacyTracking": false,
    "NSPrivacyTrackingDomains": [],
    "NSPrivacyCollectedDataTypes": []
}
```

**데이터 수집 세부 정보 정의**

```json
{
    "NSPrivacyAccessedAPITypes": [
        {
            "NSPrivacyAccessedAPIType": "NSLocationWhenInUseUsageDescription",
            "NSPrivacyAccessedAPITypeReasons": ["1.1"]
        },
        {
            "NSPrivacyAccessedAPIType": "NSCameraUsageDescription",
            "NSPrivacyAccessedAPITypeReasons": ["2.1"]
        }
    ]
}
```

**추적 도메인 추가**

```json
{
    "NSPrivacyTrackingDomains": [
        "analytics.yourdomain.com",
        "metrics.yourdomain.com"
    ]
}
```

### 일반적인 오류 피하기

문제를 방지하려면 다음 팁을 명심하세요:

-   **모든 필수 필드 포함**: 일부 필드가 비어 있더라도 반드시 존재해야 합니다.
-   **유효한 API 유형 사용**: API 식별자를 Apple의 공식 문서와 대조 확인하세요.
-   **JSON 형식 확인**: JSON 검사기로 구문 오류를 확인하세요.
-   **완전한 이유 제공**: 모든 API 접근에 해당하는 이유 코드가 포함되어야 합니다.
-   **정보 최신 상태 유지**: 새로운 기능이 추가될 때마다 매니페스트를 업데이트하세요.

또한 빌드 오류를 피하기 위해 매니페스트 파일이 512KB 미만이 되도록 하세요. Xcode의 빌드 프로세스 중에 파일을 정기적으로 검증하여 초기에 실수를 발견하세요. 매니페스트가 준비되면 파일 배치 지침에 따라 Capacitor 프로젝트에 통합하세요.

## Capacitor에 Privacy Manifest 추가하기

### 파일 배치 가이드

Capacitor 프로젝트에 개인정보 보호 매니페스트를 포함하려면 다음 디렉토리 구조에 `PrivacyInfo.xcprivacy` 파일을 배치하세요:

```
your-app/
├── ios/
│   ├── App/
│   │   ├── PrivacyInfo.xcprivacy
│   │   └── Info.plist
│   └── App.xcworkspace
```

Capacitor 플러그인의 경우 이 구조를 사용하세요:

```
your-plugin/
├── ios/
│   ├── Plugin/
│   │   └── PrivacyInfo.xcprivacy
│   └── Plugin.xcodeproj
```

### 빌드 설정 구성

파일이 배치되면 제대로 통합되도록 Xcode 빌드 설정을 업데이트하세요:

1.  Xcode에서 프로젝트를 엽니다.
2.  **TARGETS**에서 앱 또는 플러그인 대상을 선택합니다.
3.  **Build Settings** 탭으로 이동합니다.
4.  **Privacy Manifest Development Region**을 `en`으로 설정합니다.
5.  **Include Privacy Manifest**를 `YES`로 설정합니다.

프로젝트에서 [CocoaPods](https://cocoapods.org/)를 사용하는 경우, 개인정보 보호 매니페스트를 활성화하기 위해 `Podfile`에 다음 스니펫을 포함하세요:

```ruby
post_install do |installer|
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      config.build_settings['INCLUDE_PRIVACY_MANIFEST'] = 'YES'
    end
  end
end
```

이러한 변경을 한 후, 모든 것이 올바르게 설정되었는지 확인하기 위해 구현 확인을 진행하세요.

### 구현 확인

개인정보 보호 매니페스트가 의도한 대로 작동하는지 확인하려면 다음 단계를 따르세요:

1.  **빌드 확인**
    
    -   빌드 중 개인정보 보호 관련 경고가 없는지 확인합니다.
    -   매니페스트가 문제없이 컴파일되는지 확인합니다.
    -   빌드 산출물에 개인정보 보호 매니페스트가 포함되어 있는지 확인합니다.
2.  **런타임 검증**
    
    -   디버그 모드에서 올바른 개인정보 보호 프롬프트와 API 접근 동작을 테스트합니다.
3.  **App Store Connect 검증**
    
    -   빌드를 업로드하고 App Store Connect에서 개인정보 보호 보고서를 검토합니다.
    -   API 선언이 완전하고 추적 도메인 형식이 올바른지 확인합니다.

"Privacy Manifest validation failed" 오류가 발생하면 매니페스트가 최신 App Store 요구 사항을 충족하는지 다시 확인하세요. API 유형과 추적 도메인 구성에 특히 주의를 기울이세요.

## Apple Privacy Manifest 변경 사항

<iframe src="https://www.youtube.com/embed/S8JnUkUkmbs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## 테스팅 및 수정

Apple의 가이드라인을 충족하는 Privacy Manifest를 만드는 것이 중요합니다. 진행 상황을 유지하려면 개발 프로세스에 안정적인 오류 추적을 통합하세요. 이는 개발 노력과 규정 준수 요구 사항을 연결하는 데 도움이 됩니다.

[Capgo](https://capgo.app)와 같은 도구가 도움이 될 수 있습니다. API 접근을 모니터링하고 문제가 사용자에게 영향을 미치기 전에 매니페스트 문제를 식별합니다. 잠재적인 문제가 표시되면 철저한 검증에 집중할 수 있습니다.

업데이트 후에는 개발 환경에서 매니페스트를 테스트하세요. 오류 추적에서 얻은 인사이트를 사용하여 검토를 안내하세요. 이 접근 방식은 앱이 Apple의 개인정보 보호 기준에 부합하도록 유지하는 데 도움이 됩니다.

## [Capgo](https://capgo.app/) 개인정보 보호 도구

![Capgo](https://assets.seobotai.com/capgo.app/67ec9a7d7747adc4bca8a776/454adbba4c00491adce88db59812b177.jpg)

Capgo는 개인정보 보호 매니페스트와 앱 업데이트 관리를 단순화하여 배포 지연 없이 개인정보 보호 기준을 유지할 수 있도록 합니다.

### Capgo 기능

**2,350만 건 이상의 안전한 업데이트**와 **82%의 전체 성공률**로, Capgo는 **활성 사용자의 95%가 24시간 이내에 업데이트를 받도록** 보장합니다 [\[1\]](https://capgo.app/). 제공하는 기능은 다음과 같습니다:

-   업데이트를 안전하게 유지하는 **종단 간 암호화**
-   제어된 업데이트 배포를 위한 **채널 시스템**
-   문제를 빠르게 식별하고 해결하는 **오류 추적**
-   이전 버전으로 즉시 되돌릴 수 있는 **원클릭 롤백**

이러한 도구를 통해 워크플로우에 Capgo를 원활하고 효율적으로 추가할 수 있습니다.

### Capgo 

-   **환경 설정**: `npx @capgo/cli init`를 실행하여 시작하세요.
-   **개인정보 보호 기능 활성화**: 보안 업데이트를 위해 종단간 암호화를 사용하세요.
-   **모니터링 도구 배포**: 분석을 통해 업데이트를 추적하세요.
-   **롤백 계획**: 필요한 경우 이전 버전으로 신속하게 되돌릴 수 있도록 하세요.

> "Capgo는 생산성을 높이고자 하는 개발자들에게 필수적인 도구입니다. 버그 수정을 위한 검토 지연을 피할 수 있다는 점이 획기적입니다." - Bessie Cooper

정기적인 업데이트와 적절한 도구는 규정 준수를 유지하고 시간이 지남에 따라 개선하는 데 핵심입니다.
