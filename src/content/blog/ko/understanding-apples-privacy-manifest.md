---
slug: understanding-apples-privacy-manifest
title: Apple의 개인정보 보호 매니페스트 이해하기
description: >-
  Apple이 요구하는 개인정보 보호 매니페스트에 관해, iOS 앱에서의 중요성과 효과적으로 준수하는 방법을 명확한 가이드라인과 함께
  알아보겠습니다.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-18T02:23:31.365Z
updated_at: 2025-04-18T02:26:28.853Z
head_image: >-
  https://assets.seobotai.com/capgo.app/68019d453c6b972ab5063e92-1744943188853.jpg
head_image_alt: 모바일 개발
keywords: >-
  Privacy Manifest, iOS, data collection, App Store, compliance, Capgo, JSON,
  updates
tag: 'Development, Mobile, Security'
published: true
locale: ko
next_blog: ''
---

**이제 Apple의 개인정보 보호 매니페스트가 모든 iOS 앱에 필수** 2024년 5월부터 모든 App Store 제출 시 데이터 수집, API 사용, 서드파티 SDK 및 네트워크 도메인을 상세히 기술하는 JSON 파일을 포함해야 합니다. 다음은 알아야 할 사항입니다:

-   **개념**: 다음 사항을 공개하는 JSON 설정 파일:
    -   수집되는 데이터와 그 목적
    -   사용되는 API와 서드파티 SDK
    -   접근하는 외부 도메인
-   **중요성**: Apple의 개인정보 보호 기준에 대한 투명성과 준수 보장
-   **준수 방법**: iOS 앱 번들에 매니페스트를 추가하고 [Capgo](https://capgoapp/)와 같은 실시간 업데이트 도구를 사용할 경우 정기적으로 업데이트

**팁**: Capgo와 같은 도구는 매니페스트 업데이트를 자동화하고, 즉시 배포를 제공하며, 성공을 추적하기 위한 분석을 제공하여 준수를 단순화합니다.

개인정보 보호 매니페스트 설정 및 확인 방법, 일반적인 함정 피하기, 원활한 업데이트 보장 방법에 대해 계속 읽어보세요.

## WWDC23: 개인정보 보호 매니페스트 시작하기 | Apple

<iframe src="https://www.youtube.com/embed/OQMF4LDqscc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## 개인정보 보호 매니페스트 핵심 요소

Apple의 개인정보 보호 매니페스트는 세 가지 주요 구성 요소를 포함합니다:

1.  **데이터 선언**: 앱이 수집하는 데이터 유형, 수집 이유, 사용하는 개인정보 보호 민감 API, 앱에 통합된 서드파티 SDK를 지정해야 합니다. 각각에 대한 명확한 비즈니스 이유도 제공해야 합니다.
    
2.  **외부 도메인**: 앱이 통신하는 모든 외부 도메인을 나열하고, 통신 목적을 설명하며, 보안 조치에 대해 상세히 기술해야 합니다.
    
3.  **JSON 형식 및 임베딩**: Apple이 요구하는 매니페스트 JSON 구조를 따르고 앱 번들과 실시간 업데이트 패키지 모두에 포함되도록 해야 합니다.
    

다음으로, Capacitor 프로젝트에서 매니페스트를 생성하고 확인하는 방법을 살펴보겠습니다.

## [Capacitor](https://capacitorjscom/)에서 개인정보 보호 매니페스트 설정하기

![Capacitor](https://assetsseobotaicom/capgoapp/68019d453c6b972ab5063e92/7e137b9b90adb3934b29b03381f213c1jpg)

### 매니페스트 파일 생성

앱의 API 사용과 데이터 수집을 선언하기 위해 `ios/App/Resources/PrivacyInfoxcprivacy` 파일을 추가하여 시작하세요. 파일은 다음과 같은 형태일 수 있습니다:

```json
{
  "NSPrivacyAccessedAPITypes":[{"NSPrivacyAccessedAPIType":"NSUserDefaults","NSPrivacyAccessedAPITypeReasons":["FE001"]}],
  "NSPrivacyCollectedDataTypes":[{"NSPrivacyDataType":"NSPrivacyDataTypeDeviceID","NSPrivacyDataReason":"Basic app functionality"}]
}
```

이 파일을 생성한 후, [Xcode](https://developerapplecom/xcode/)를 열어 프로젝트에 올바르게 포함되었는지 확인하세요.

### 테스트 및 검증

Xcode에서 **Product > Analyze**로 이동하여 개인정보 보호 보고서를 생성하세요. 경고나 선언되지 않은 API가 있는지 보고서를 주의 깊게 검토하고, 문제를 피하기 위해 필요한 조정을 하세요. 모든 것이 확인되면 업데이트 배포를 진행하세요.

### [Capgo](https://capgoapp/)를 통한 업데이트

![Capgo](https://assetsseobotaicom/capgoapp/68019d453c6b972ab5063e92/d09851ee64a6d6c4e2e08ff1d656af11jpg)

Xcode 분석을 통과한 후, Capgo를 사용하여 앱의 개인정보 보호 매니페스트를 최신 상태로 유지하세요. Capgo는 다음을 제공합니다:

-   **즉시 배포**: 24시간 내 95%의 사용자가 업데이트 받음 [\[1\]](https://capgoapp/)
-   **원클릭 롤백** 신속한 수정
-   **분석 도구** 업데이트 성공 추적 및 준수 보장

Capgo의 Team 플랜은 월 $83(연간 청구)이며, 최대 100,000 월간 활성 사용자(MAU)와 2,000 GB의 대역폭을 지원합니다.

## 개인정보 보호 준수 지침

Xcode에서 매니페스트를 확인한 후, 개인정보 보호 준수가 유지되도록 하는 것이 중요합니다. 다음은 진행 상황을 유지하는 방법입니다.

### 권장 사례

Capgo를 사용하여 매니페스트 업데이트를 즉시 푸시하면 App Store 리뷰로 인한 지연을 피할 수 있습니다. 이 도구는 또한 단계적 출시를 지원하여 실시간 분석으로 변경 사항을 테스트한 후 모든 사용자에게 배포할 수 있습니다. [\[1\]](https://capgoapp/)

### 일반적인 함정

[수동 업데이트](https://capgoapp/docs/plugin/cloud-mode/manual-update/)에 의존하면 App Store 리뷰 시간에 따라 며칠 또는 몇 주가 걸릴 수 있어 느릴 수 있습니다. 이로 인해 문서가 오래된 상태로 남게 되는 경우가 많습니다.반면에 자동화된 도구는 즉각적인 업데이트를 가능하게 하고, 배포를 모니터링하기 위한 분석을 제공하며, 문제가 발생했을 때 쉽게 변경 사항을 롤백할 수 있게 합니다 [\[1\]](https://capgoapp/)

### 수동 vs 자동화된 업데이트

다음은 수동 및 자동화된 업데이트 방법의 간단한 비교입니다:

-   **전달 속도**: 수동 업데이트는 며칠이나 몇 주가 걸릴 수 있지만, [자동화된 업데이트](https://capgoapp/docs/plugin/cloud-mode/hybrid-update/)는 24시간 이내에 95%의 사용자에게 도달합니다 [\[1\]](https://capgoapp/)
-   **성공 추적**: 수동 방식은 다양하지만, 자동화된 업데이트는 전 세계적으로 82%의 성공률을 달성합니다 [\[1\]](https://capgoapp/)
-   **롤백 옵션**: 수동 업데이트는 제한된 복구를 제공하지만, 자동화된 업데이트는 즉각적인 롤백이 가능합니다
-   **모니터링**: 수동 확인은 시간이 많이 소요되는 반면, 자동화된 도구는 실시간 분석을 제공합니다 [\[1\]](https://capgoapp/)
-   **배포**: 수동 시스템은 기본적이지만, 자동화된 도구는 고급 배포 채널을 지원합니다 [\[1\]](https://capgoapp/)
-   **보안**: 수동 업데이트는 내장된 암호화가 부족하지만, 자동화된 시스템은 종단간 암호화를 사용합니다 [\[1\]](https://capgoapp/)

## 실시간 업데이트 도구 비교

두 가지 인기 있는 실시간 업데이트 플랫폼을 비교해보겠습니다

### 플랫폼 기능 및 가격

| 기능 | Capgo | [Appflow](https://ionicio/appflow/) |
| --- | --- | --- |
| 종단간 암호화 | **예** | \-  |
| 업데이트 성공률 | **전 세계적으로 82%** [\[1\]](https://capgoapp/) | \-  |
| 업데이트 전달 시간 | **24시간 이내 95%** [\[1\]](https://capgoapp/) | \-  |
| 번들 다운로드 속도 | **114 ms (5 MB)** [\[1\]](https://capgoapp/) | \-  |
| 연간 비용 (팀 플랜) | **$996** | **$6,000** [\[1\]](https://capgoapp/) |

**간단한 요약**: Capgo는 Appflow의 $6,000에 비해 첫 해 비용이 $996으로 훨씬 낮습니다

이제 Capgo가 프라이버시 매니페스트 업데이트에 특별히 어떻게 두각을 나타내는지 살펴보겠습니다

### 프라이버시 매니페스트: Capgo의 이점

Capgo의 오픈소스 코드베이스는 프라이버시 매니페스트 업데이트를 관리하는 데 강력한 선택입니다. 진화하는 프라이버시 표준을 충족하기 위한 빠른 조정을 가능하게 하여 규정 준수를 관리하기 쉽게 만듭니다 [\[1\]](https://capgoapp/)

## 요약

2024년 5월부터 모든 iOS 앱은 필수 매니페스트 요구사항을 준수해야 합니다. 자동화를 통해 이러한 매니페스트 관리가 훨씬 쉬워질 수 있습니다. Capacitor 프로젝트의 경우, iOS 번들에 매니페스트를 포함하고 Capgo와 같은 도구를 사용하여 종단간 암호화 덕분에 안전하게 업데이트를 자동화하세요.

매니페스트 설정과 업데이트 자동화가 완료되면, 원활한 프라이버시 매니페스트 업데이트를 위한 주요 사례는 다음과 같습니다:

-   배포를 단순화하기 위해 CLI 도구 사용
-   제어된 업데이트 출시를 위한 채널 시스템 구현
-   데이터 수집 프로세스에 대한 상세한 문서화 유지
-   정기적인 프라이버시 준수 테스트 및 검증