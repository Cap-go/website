---
slug: how-cicd-tools-trigger-ota-updates
title: CI/CD 도구가 OTA 업데이트를 트리거하는 방법
description: >-
  CI/CD 도구가 OTA 업데이트를 강화하여 자동화된 프로세스를 통해 더 빠르고, 더 안전하며, 더 신뢰할 수 있는 앱 배포를 구현하는
  방법에 대해 알아보겠습니다.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-02-12T08:43:18.401Z
updated_at: 2025-10-21T10:46:26.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67abf1dcdd71129bfb8de766-1739349815106.jpg
head_image_alt: 모바일 개발
keywords: 'CI/CD, OTA updates, automation, app deployment, security, Capgo, Capacitor'
tag: 'Development, Mobile, Updates'
published: true
locale: ko
next_blog: ''
---

CI/CD 도구는 프로세스를 자동화하여 무선(OTA) 업데이트를 더 빠르고, 안전하며, 신뢰성 있게 만듭니다. 방법은 다음과 같습니다:

-   **OTA 업데이트란?** HTML, CSS, JavaScript와 같은 앱 자산을 앱스토어 승인 지연을 건너뛰고 CDN을 통해 즉시 업데이트할 수 있습니다
-   **CI/CD의 이점:** [GitHub Actions](https://docsgithubcom/actions)와 같은 자동화 도구는 빌드 검사, 보안 검증, 배포와 같은 주요 단계를 간소화하여 오류를 72% 줄이고 당일 패치를 가능하게 합니다
-   **주요 기능:**
    -   **보안:** HTTPS, 코드 서명, 암호화를 사용하여 업데이트 보호
    -   **단계별 출시:** 문제를 조기에 발견하기 위해 소규모 그룹에 먼저 업데이트 배포
    -   **롤백 옵션:** 오류율이 증가하면 자동으로 업데이트 되돌리기
-   **주요 도구:** [Capgo](https://capgo.app/)는 CLI 명령, 웹훅 통합, 상세 메트릭 추적으로 OTA 업데이트를 단순화합니다

OTA 업데이트 자동화는 더 빠른 전달, 적은 오류, 더 나은 앱 안정성을 보장합니다. 아래에서 [Capacitor](https://capacitorjs.com/) 앱을 CI/CD 파이프라인과 설정하는 단계별 지침을 확인할 수 있습니다.

## [Appflow](https://ionicio/appflow/live-updates) 실시간 업데이트: 사용자에게 즉각적인 업데이트 배포

![Appflow](https://mars-images.imgix.net/seobot/screenshots/ionicio-f18932d1af08bf70cb14b84540039486-2025-02-12.jpg?auto=compress)

<Steps>

1. 필요한 Appflow CLI 설치
2. 앱과 Appflow 연결 
3. 자동 배포 설정 구성

</Steps>

## [Capacitor](https://capacitorjs.com/)를 OTA 업데이트용으로 준비하기

![Capacitor](https://mars-images.imgix.net/seobot/screenshots/capacitorjs.com-4c1a6a7e452082d30f5bff9840b00b7d-2025-02-12.jpg?auto=compress)

[자동화된 무선](https://capgo.app/blog/open-source-licecing/) (OTA) 업데이트를 위한 Capacitor 설정에는 세 가지 주요 단계가 포함됩니다: 설정 구성, 보안 조치 구현, [업데이트 시스템 통합](https://capgo.app/docs/plugin/cloud-mode/hybrid-update). 이 프로세스는 앱을 안전하게 유지하면서 CI/CD 자동화와의 호환성을 보장합니다.

### capacitorconfigjson에서 OTA 설정 구성하기

`capacitorconfigjson` 파일을 필요한 매개변수로 업데이트하여 시작하세요:

```json
{
  "plugins": {
    "OtaUpdate": {
      "checkFrequency": 30,
      "defaultChannel": "production"
    }
  }
}
```

적절한 확인 빈도를 설정하면 업데이트 지연을 최소화할 수 있습니다 - 최대 47%까지 감소 [\[2\]](https://githubcom/becem-gharbi/esp-ota-cicd)

### OTA 업데이트 보안 구현

OTA 업데이트 프로세스를 보호하여 무단 업데이트를 방지하고 앱의 무결성을 보호하는 것이 필수적입니다. 이는 세 가지 보호 계층을 포함합니다:

| 보안 계층 | 구현 | 목적 |
| --- | --- | --- |
| HTTPS 보안 | 인증서 고정 | 중간자 공격 차단 |
| 코드 서명 | ed25519 서명 | 업데이트 유효성 확인 |
| 패키지 보안 | AES-256-GCM 암호화 | 업데이트 내용 보호 |

이러한 보안 기능을 적용하려면 구성에 다음을 포함하세요:

```javascript
{
  "security": {
    "certificatePinning": true,
    "signatureValidation": "ed25519",
    "encryptionMethod": "aes-256-gcm"
  }
}
```

### [Capgo](https://capgo.app/)를 OTA 업데이트용으로 구성하기

![Capgo](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-02-12.jpg?auto=compress)

Capgo는 OTA 업데이트 프로세스를 단순화합니다. 필요한 플러그인을 설치하여 시작하세요:

```bash
npm install @capgo/capacitor-updater
```

다음으로, `capacitorconfigjson` 파일에 Capgo 관련 설정을 추가하세요:

```json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true,
      "statsUrl": "https://your-stats-server.com"
    }
  }
}
```

Capgo는 `20250212-a1b2c3d`와 같은 빌드 식별자가 포함된 시맨틱 버전 관리를 사용하여 정확한 업데이트 추적을 합니다. 이를 통해 앱의 업데이트 수명주기를 더 쉽게 관리하고 모니터링할 수 있습니다.

## OTA 업데이트 파이프라인 생성

Capacitor 환경에서 Capgo를 설정한 후, 다음 단계는 CI/CD 도구와 연결하여 업데이트 전달을 자동화하는 것입니다. 이를 통해 앱을 안정적으로 유지하면서 업데이트가 안전하고 효율적으로 처리되도록 보장합니다.

### 자동 업데이트를 위한 웹훅 설정

CI/CD 설정의 웹훅은 코드가 변경될 때마다 자동으로 업데이트를 트리거할 수 있습니다. 예를 들어, GitHub Actions에서는 다음과 같은 워크플로우 파일을 생성할 수 있습니다:

```yaml
name: OTA Update
on:
  push:
    branches: [main]
```

CI/CD 플랫폼의 [암호화된 저장소](https://capgo)에 API 키와 비밀을 안전하게 저장해야 합니다.app/docs/cli/migrations/encryption/) 를 통해 중요 데이터 보호

### Capgo CLI 업데이트 명령어

Capgo CLI는 파이프라인 내 업데이트 관리를 간소화하는 주요 명령어를 제공합니다. 다음은 일반적인 배포 워크플로우의 예시입니다:

| 단계 | 명령어 | 목적 |
| --- | --- | --- |
| 빌드 | `capgo deploy --channel production` | 새로운 빌드 아티팩트 업로드 |
| 테스트 | `capgo promote build-123 --group beta` | [테스트 그룹에 업데이트 배포](https://capgo.app/blog/how-to-send-specific-version-to-users/) |
| 검증 | `capgo metrics get --last-24h` | 업데이트 성공 지표 확인 |
| 배포 | `capgo promote build-123 --channel stable` | 모든 사용자에게 업데이트 배포 |

### 업데이트 롤백 방법

안정적인 롤백 메커니즘은 앱 안정성 유지에 필수적입니다. 시스템은 문제를 감지하고 자동으로 업데이트를 되돌릴 수 있어야 합니다. 예를 들어, 헬스 체크 엔드포인트를 사용하여 오류율을 모니터링하고 필요시 롤백을 트리거할 수 있습니다:

[[CODE_BLOCK]]

이 접근 방식은 [Gunnebo Safe Storage](https://wwwgunnebosafestoragecom/)가 다운타임을 수 시간에서 수 분으로 줄이는데 도움을 주었습니다 [\[6\]](https://menderio/blog/mender-ota-updates-and-an-automated-ci-cd-pipeline-at-gunnebo-safe-storage)

위험도가 높은 업데이트의 경우, Capgo의 단계적 출시 기능 사용을 고려하세요. 전체 배포 전에 작은 사용자 그룹에 먼저 업데이트를 배포할 수 있어 광범위한 문제 발생 가능성을 줄일 수 있습니다.

###### sbb-itb-f9944d2

## OTA 업데이트 방법

### 단계적 업데이트와 사용자 그룹

단계적 업데이트를 통해 업데이트 배포를 제어하여 사용자에게 원활한 경험을 제공할 수 있습니다. 예를 들어, Capgo의 _promote_ 명령어(앞서 논의됨)는 베타 그룹 관리를 돕습니다. 기업 데이터에 따르면 앱의 거의 절반(49%)이 월간 업데이트가 필요하므로 [\[4\]](https://capacitorjs.com/docs/guides/ci-cd), 단계적 배포는 점진적으로 변경사항을 적용하면서 앱의 안정성을 유지하는 핵심 전략이 됩니다.

### 지표 기반 업데이트 트리거

성능 지표를 기반으로 [업데이트 자동화](https://capgo.app/docs/live-updates/update-behavior/)는 시간을 절약하고 문제를 예방할 수 있습니다. 모니터링 웹훅을 설정하여 중요 지표를 추적하고 업데이트 진행 또는 중단을 결정할 수 있습니다:

| 지표 유형 | 임계값 | 조치 |
| --- | --- | --- |
| 충돌률 | >2% | 배포 중단 |
| 오류율 | >0.5% | 팀 알림 |

이러한 검사를 CI/CD 파이프라인에 통합하여 원활한 모니터링이 가능합니다. 예시:

[[CODE_BLOCK]]

이러한 지표는 다음 섹션에서 살펴볼 성능 추적 시스템과 직접 연결됩니다.

### 신속 대응 업데이트

중요한 보안 문제나 주요 버그에 직면했을 때, 신속하게 업데이트를 배포할 방법이 필요합니다. 긴급 상황을 위해 특별히 설계된 빠른 배포 채널을 사용하세요. 이러한 채널에는 위험을 최소화하기 위한 기기 검증 확인과 자동 롤백 옵션이 포함되어야 합니다.

긴급 업데이트의 경우 전용 채널을 통해 배포할 수 있습니다:

[[CODE_BLOCK]]

배포 속도를 더욱 향상시키고 규정 준수 기준을 충족하기 위해 CDN 규칙이 있는 지역 기반 채널 사용을 고려하세요. 이를 통해 위치에 관계없이 효율적으로 업데이트가 사용자에게 전달됩니다.

## 업데이트 성능 추적

업데이트 전달 방법을 구현한 후에는 그 효과를 측정할 차례입니다. 다음 주요 성과 지표를 사용하여 상황을 파악하세요:

### 업데이트 성공 지표

**배포 완료**, **검증 시간**, **사용자 채택** 세 가지 주요 영역에 주목하세요. 모바일 앱의 경우 일반적으로 배포 성공률이 95%에서 99% 사이입니다 [\[1\]](https://embeddedartistrycom/blog/2024/01/15/exploring-serverless-ci-cd-for-embedded-devices/). CI/CD 파이프라인을 통한 실시간 모니터링으로 목표 달성을 도울 수 있습니다:

| 지표 | 목표 | 위험 임계값 |
| --- | --- | --- |
| 배포 완료 | >98% | [[HTML_TAG]]120s |
| 사용자 채택(24시간) | >75% | <50% |

### 업데이트 오류 관리

자동화된 시스템으로 업데이트 상태를 추적하고 오류에 대응할 수 있습니다.
