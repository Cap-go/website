---
slug: how-to-use-capgo-documentation-for-ota-updates
title: Capgo 문서를 사용하여 OTA 업데이트 하는 방법
description: >-
  Capgo의 포괄적인 문서와 단계별 안내를 통해 Capacitor 앱에서 안전한 Over-the-Air 업데이트를 구현하는 방법을
  알아보세요.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-02-19T03:56:01.854Z
updated_at: 2025-03-18T13:13:59.127Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67b53306eac600a2c6713dad-1740671704703.jpg
head_image_alt: 모바일 개발
keywords: >-
  OTA updates, Capacitor, Capgo, mobile app updates, documentation, app
  deployment, security features, error handling
tag: 'Development, Mobile, Updates'
published: true
locale: ko
next_blog: ''
---
앱스토어 지연 없이 [앱 업데이트](https://capgo.app/plugins/capacitor-updater/)가 필요하신가요? [Capgo](https://capgo.app/)를 사용하면 사용자에게 안전한 무선(OTA) 업데이트를 즉시 제공할 수 있습니다. 앱스토어 심사를 건너뛰고 앱을 쉽게 최신 상태로 유지하세요.

### 주요 요점:

-   **Capgo란?** [Capacitor](https://capacitorjs.com/) 앱을 위한 오픈소스 실시간 업데이트 플랫폼입니다.
-   **OTA 업데이트의 장점?** 시간 절약, 사용자 경험 개선, 빠른 버그 수정이 가능합니다.
-   **시작하는 방법?**
    -   [Capgo 플러그인](https://capgo.app/plugins/) 설치: `npm install @capgo/capacitor-updater`
    -   API 키로 앱 구성
    -   "production" 또는 "beta"와 같은 채널을 사용하여 대상 롤아웃
-   **고급 기능:** 종단간 암호화, 오류 처리, CI/CD 통합

Capgo 문서([capgo.app/docs](https://capgo.app/docs))에서 설정, 보안, 문제 해결을 위한 단계별 지침을 제공합니다. 설치부터 고급 구성까지, 원활한 업데이트를 위한 완벽한 가이드입니다.

## [Capgo](https://capgo.app/), 실시간 업데이트를 위한 CapacitorJs 플러그인

![Capgo Live Update Dashboard Interface](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-02-19.jpg?auto=compress)

<Steps>
</Steps>

## Capgo 문서 사용하기

OTA 업데이트 작업 시 문서를 효과적으로 탐색하는 것이 필수적입니다. Capgo의 문서는 Capacitor 앱에 실시간 업데이트를 통합하기 위한 자세한 지침을 제공합니다.

### 문서 찾는 방법

Capgo의 문서는 [capgo.app/docs](https://capgo.app/docs) [\[1\]](https://github.com/Cap-go/capacitor-updater)에서 확인할 수 있습니다. 특정 목적에 따라 섹션별로 구성되어 있습니다:

| **섹션** | **목적** | **주요 주제** |
| --- | --- | --- |
| 시작하기 | 초기 설정 | 설치 단계, [API 키 설정](https://capgo.app/docs/webapp/api-keys/) |
| 구성 | 핵심 설정 | 플러그인 구성, 환경 설정 |
| API 참조 | 기술 세부사항 | 메서드, 매개변수, 반환 값 |
| 보안 | 보호 조치 | 암호화 설정, 서명 확인 |
| 문제 해결 | 문제 해결 | 일반적인 문제, 진단 도구 |

### 중요한 용어와 개념

다음은 자주 접하게 될 주요 용어들입니다:

-   **채널**: 버전 배포를 제어하는 데 사용되는 업데이트 스트림입니다. 예를 들어 다양한 사용자 그룹을 위해 "production", "beta", "staging" 채널을 설정할 수 있습니다 [\[4\]](https://www.indeed.com/career-advice/career-development/how-to-write-articles).
-   **업데이트 정책**: 업데이트가 전달되고 적용되는 방식을 정의합니다. 자동 다운로드, 설치 시기, 사용자 프롬프트 등의 옵션이 포함됩니다 [\[1\]](https://github.com/Cap-go/capacitor-updater).
-   **앱 상태 리스너**: 앱이 포그라운드인지 백그라운드인지 추적하는 컴포넌트입니다 [\[4\]](https://www.indeed.com/career-advice/career-development/how-to-write-articles).
-   **번들**: 앱의 새 버전이 포함된 패키지 업데이트 파일로, 자산, 코드 변경 사항, 구성 업데이트가 포함됩니다 [\[4\]](https://www.indeed.com/career-advice/career-development/how-to-write-articles).

[이하 생략]

Capgo의 리소스를 사용하여 개발자는 초기 설정부터 고급 구성까지 **엔드투엔드 암호화**와 **CI/CD 통합**과 같은 필수 기능을 구현할 수 있습니다 [\[1\]](https://github.com/Cap-go/capacitor-updater).

### 주요 구현 영역

| **측면** | **주요 초점** | **찾을 수 있는 곳** |
| --- | --- | --- |
| **보안** | 암호화 및 무결성 검사 | _보안 기능_ 섹션 |
| **규정 준수** | Apple 및 Android 요구사항 충족 | _앱 스토어 규칙_ 가이드 |
| **[업데이트 관리](https://capgo.app/docs/plugin/cloud-mode/manual-update/)** | 버전 관리 및 롤백 옵션 | _[업데이트 방법](https://capgo.app/docs/plugin/cloud-mode/hybrid-update)_ 가이드 |
| **오류 처리** | 로깅 및 문제 해결 단계 | _문제 해결 가이드_ |

이러한 영역들이 Capgo 업데이트 관리 시스템의 근간을 이룹니다.

Capgo의 CLI와 분석 도구는 앱 수명 주기 전반에 걸쳐 [업데이트 관리](https://capgo.app/docs/plugin/cloud-mode/manual-update/)를 단순화합니다 [\[1\]](https://github.com/Cap-go/capacitor-updater).

추가 지원을 위해 **API 문서**, **샘플 프로젝트**, **커뮤니티 포럼**과 같은 추가 리소스를 탐색할 수 있습니다 [\[2\]](https://dev.to/arnosolo/ionic-appflow-live-update-alternative-55c3).
