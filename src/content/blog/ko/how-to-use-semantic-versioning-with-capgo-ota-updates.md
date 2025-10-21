---
slug: how-to-use-semantic-versioning-with-capgo-ota-updates
title: Capgo OTA 업데이트와 함께 시맨틱 버저닝 사용하기
description: Capgo의 OTA 업데이트를 사용하여 시맨틱 버저닝을 통해 Capacitor 앱의 업데이트와 버전 관리를 간소화하는 방법을 알아보세요.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-03T04:48:38.491Z
updated_at: 2025-10-21T10:46:26.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67c4f6356c9ebce91891f4e6-1740977344964.jpg
head_image_alt: 모바일 개발
keywords: >-
  Semantic Versioning, Capgo, OTA updates, Capacitor apps, version control, app
  updates, deployment, CI/CD
tag: 'Development, Mobile, Updates'
published: true
locale: ko
next_blog: ''
---

**[앱 업데이트](https://capgo.app/plugins/capacitor-updater/)와 버전 관리를 단순화하고 싶으신가요?** Semantic Versioning (SemVer)과 [Capgo](https://capgo.app/)의 무선 업데이트(OTA)를 결합하면 [Capacitor](https://capacitorjs.com/) 앱 관리가 더 쉽고 빨라집니다. 방법은 다음과 같습니다:

-   **시맨틱 버전 관리 기본사항:** 버전은 `MAJORMINORPATCH` 형식을 사용합니다:
    
    -   **MAJOR:** 호환성이 깨지는 변경사항
    -   **MINOR:** 이전 버전과 호환되는 새로운 기능
    -   **PATCH:** 버그 수정
-   **Capgo와 함께 SemVer를 사용하는 이유?**
    
    -   업데이트에 대한 명확한 소통
    -   더 스마트한 버전 관리
    -   의존성 충돌 방지
    -   체계적인 릴리스 계획
-   **[Capgo 설정](https://capgo.app/docs/cli/commands/) 단계:**
    
    1.  Capgo 업데이터 플러그인 설치
    2.  `capacitorconfigjson`과 다른 파일에서 앱 버전 구성
    3.  API 키로 초기화
    4.  [Capgo CLI](https://capgo.app/docs/cli/commands)를 사용하여 번들링 및 업데이트 업로드
-   **[버전과 채널 관리](https://capgo.app/docs/webapp/channels/):**
    
    -   별도의 채널 사용 (예: 테스트용 "beta", 안정 릴리스용 "production")
    -   업데이트 정책 제어 (패치 자동 업데이트, 주요 변경사항은 수동 승인)
    -   실패한 업데이트에 대한 롤백 옵션
-   **배포 프로세스:**
    
    -   SemVer 규칙에 따라 버전 번호 업데이트
    -   배포 전 철저한 테스트
    -   CLI 명령어를 사용하여 업데이트 업로드 및 배포

Capgo는 업데이트가 사용자에게 빠르고 안정적으로 도달하도록 보장하며, 중단을 처리하고 안정성을 유지하기 위한 도구를 제공합니다. CI/CD 워크플로우로 업데이트를 자동화하는 팀에게 완벽합니다.

**빠른 팁:** 항상 업데이트를 테스트하고 채널을 사용하여 단계적 출시를 효과적으로 관리하세요.

## 시맨틱 버전 관리 | 레벨 업

[[HTML_TAG]][[HTML_TAG]]

## [Capgo](https://capgo.app/) 설정 가이드

![Capgo](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-03-03.jpg?auto=compress)

OTA 업데이트와 버전 관리를 쉽게 관리하기 위한 Capgo 설정 방법입니다.

### 초기 설정 단계

[Capgo 업데이터 플러그인](https://capgo.app/docs/plugin/self-hosted/manual-update/)을 설치하며 시작하세요:

[[CODE_BLOCK]]

`capacitorconfigjson` 파일이 시맨틱 버전 형식을 사용하는지 확인하세요:

[[CODE_BLOCK]]

오래된 프로젝트의 경우, 다음 위치에서 버전 정보를 업데이트하세요:

-   `packagejson` (`version` 필드 확인)
-   `android/app/buildgradle` (`versionName` 업데이트)
-   `ios/App/Appxcodeproj/projectpbxproj` (`CURRENT_PROJECT_VERSION` 업데이트)

구성이 완료되면 API 키로 Capgo를 초기화하세요:

[[CODE_BLOCK]]

**빠른 참조 표:**

| 설정 단계 | 주요 작업 | 검증 단계 |
| --- | --- | --- |
| 설치 | 플러그인 설치 및 동기화 | `packagejson` 확인 |
| 구성 | 버전 번호 설정 | 모든 파일에서 확인 |
| 초기화 | API 키로 연결 | 연결 상태 테스트 |
| 빌드 | 초기 번들 생성 | 업로드 성공 확인 |

### 버전 관리 통합

Capgo는 CI/CD 플랫폼과 잘 작동하여 [자동화된 업데이트](https://capgo.app/docs/live-updates/update-behavior/)를 간단하게 만듭니다. 지원되는 플랫폼:

-   [GitHub Actions](https://docsgithubcom/actions)
-   [GitLab CI](https://docsgitlabcom/ee/ci/)
-   [Azure DevOps](https://azuremicrosoftcom/en-us/products/devops)
-   [Jenkins](https://wwwjenkinsio/)
-   [CircleCI](https://circlecicom/)

로컬 개발 작업 중이라면 구성에 다음을 추가하여 자동 업데이트를 비활성화할 수 있습니다:

[[CODE_BLOCK]]

이렇게 하면 Capgo가 로컬 변경사항을 덮어쓰지 않습니다. 설정이 준비되면 첫 번째 버전을 업로드하세요:

[[CODE_BLOCK]]

마지막으로, 앱의 메인 파일에서 번들의 상태를 네이티브 플러그인에 알립니다:

[[CODE_BLOCK]]

이 설정으로 앱이 원활한 OTA 배포와 버전 관리를 할 준비가 됩니다.
