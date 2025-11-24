---
slug: capgo-integration-with-github-actions-guide
title: 'GitHub Actions를 통한 Capgo 통합: 가이드'
description: GitHub Actions를 Capgo와 통합하여 효율적이고 안전하며 비용 효율적인 앱 업데이트를 구현하여 개발 워크플로우를 향상시키세요.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-16T02:24:50.565Z
updated_at: 2025-10-22T12:30:10.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67d61b378b902ec211cf87e9-1742091902582.jpg
head_image_alt: 모바일 개발
keywords: >-
  Capgo, GitHub Actions, CI/CD, Capacitor apps, deployment, automation, updates,
  security
tag: 'Development, Mobile, Updates'
published: true
locale: ko
next_blog: ''
---
[Capgo](https://capgo.app/)와 [GitHub Actions](https://docs.github.com/actions)를 함께 사용하면 [Capacitor](https://capacitorjs.com/) 앱의 업데이트 배포가 간단해집니다. 다음은 이 통합이 주목할 만한 이유입니다:

-   **비용 절감**: [AppFlow](https://ionic.io/appflow/)와 비교하여 5년 동안 최대 $26,100의 CI/CD 비용을 절감할 수 있습니다.
-   **빠른 업데이트**: 즉시 업데이트를 푸시하여 24시간 내에 95%의 사용자가 수신할 수 있습니다.
-   **안전한 배포**: 엔드-투-엔드 암호화로 업데이트의 안전을 보장합니다.
-   **간소화된 워크플로우**: GitHub 저장소에서 직접 빌드와 배포를 자동화할 수 있습니다.

### 빠른 개요

1.  **요구사항**: GitHub 계정, [Capgo 계정](https://capgo.app/disclaimer/) (월 $12부터), Capacitor 프로젝트, [Node.js](https://nodejs.org/en).
2.  **설정**: `npx @capgo/cli init`로 [Capgo CLI](https://capgo.app/docs/cli/commands)를 설치하고, YAML 워크플로우로 GitHub Actions를 구성합니다.
3.  **배포**: `npx @capgo/cli deploy`와 같은 명령어를 사용하여 [업데이트를 자동화](https://capgo.app/docs/live-updates/update-behavior/)합니다.
4.  **테스트**: 프로덕션 전에 테스트 채널(예: 베타, 스테이징)에 배포합니다.

**워크플로우 예시 (YAML)**:

```yaml
name: Capgo Deploy  
on:  
  push:  
    branches:  
      - main  

jobs:  
  deploy:  
    runs-on: ubuntu-latest  
    steps:  
      - uses: actions/checkout@v3  
      - uses: actions/setup-node@v6  
        with:  
          node-version: '24'  
      - name: Install Dependencies  
        run: npm install  
      - name: Deploy to Capgo  
        run: npx @capgo/cli deploy  
        env:  
          CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}  
```

이 통합은 빠르고 안전하며 비용 효율적인 앱 업데이트를 보장하여 애자일 개발 팀에 이상적입니다.

## [GitHub Actions](https://docs.github.com/actions) 튜토리얼 - 기본 개념과 CI/CD 파이프라인

![GitHub Actions](https://mars-images.imgix.net/seobot/screenshots/docs.github.com-90237daad1b336de5d9b7f1a85aa7441-2025-03-16.jpg?auto=compress)

<iframe src="https://www.youtube.com/embed/R8_veQiYBjI" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## 설정 요구사항

[Capgo 통합](https://capgo.app/docs/webapp/)과 GitHub Actions에는 필요한 도구와 구성 설정이 필요합니다.

### 필수 도구와 계정

다음의 계정과 도구가 준비되어 있는지 확인하세요:

| 요구사항 | 목적 | 세부사항 |
| --- | --- | --- |
| **GitHub 계정** | 버전 관리 & CI/CD | 저장소 접근이 가능한 활성 계정 |
| **Capgo 계정** | 실시간 업데이트 관리 | SOLO 플랜 월 $12부터 시작 |
| **Capacitor 프로젝트** | 앱 개발 | 통합 준비가 된 기능적 프로젝트 |
| **Node.js** | 런타임 환경 | 최신 LTS 버전 권장 |

이들이 준비되면 자동화된 실시간 업데이트를 위해 프로젝트에 Capgo를 추가할 수 있습니다.

### 프로젝트에 [Capgo](https://capgo.app/) 추가하기

![Capgo](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-03-16.jpg?auto=compress)

Capgo를 통합하려면 CLI 도구를 사용하여 Capacitor 프로젝트에 설치하세요. Capgo의 창립자 Martin Donadieu의 말에 따르면:

> "npx @capgo/cli init만 실행하면 됩니다!" [\[1\]](https://capgo.app/)

이 명령어로 플러그인과 필요한 의존성이 설정됩니다.

### GitHub 저장소 설정

Capgo와의 CI/CD 통합을 위해 GitHub 저장소를 준비하세요. 문서에서 언급된 바와 같이:

> "GitHub Actions, GitLab CI 등 선호하는 플랫폼에서 직접 CI/CD 파이프라인을 구성합니다. CI/CD를 호스팅하거나 유지보수 비용을 청구하지 않습니다." [\[1\]](https://capgo.app/)

Capgo는 일회성 $2,600와 월 ~$300의 비용으로 이 설정을 제공하며, 이는 AppFlow의 연간 $6,000 비용에 비해 더 저렴합니다 [\[1\]](https://capgo.app/).

저장소 설정 방법:

-   **저장소 구조**: 소스 코드, 자산, 구성 파일을 별도의 디렉토리로 구성하여 모든 것을 깔끔하고 관리하기 쉽게 유지합니다.
-   **환경 구성**: 개발, 스테이징, 프로덕션을 위한 구별된 환경을 만들어 적절한 접근 제어와 보안 조치를 보장합니다.
-   **접근 관리**: [Capgo 통합](https://capgo.app/consulting/)을 허용하면서 보안을 유지하기 위해 저장소 권한을 신중하게 설정합니다.

이러한 단계들로 다음 섹션에서 설명할 GitHub Actions 워크플로우를 위한 프로젝트 준비가 완료됩니다.

## GitHub Actions 워크플로우 설정

[Capgo 배포](https://capgo.app/docs/cli/commands/)를 GitHub Actions로 자동화하여 CI/CD 프로세스를 간소화하세요.

### 워크플로우 파일 생성

저장소의 `.github/workflows` 디렉토리에 YAML 파일을 생성하세요. 예시:

```yaml
name: Capgo Deploy
on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v6
        with:
          node-version: '24'
      - name: Install Dependencies
        run: npm install
      - name: Build App
        run: npm run build
      - name: Deploy to Capgo
        run: npx @capgo/cli deploy
        env:
          CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}
```

이 구성으로 안전하고 자동화된 배포가 보장됩니다. 파일을 설정한 후 워크플로우에 맞는 트리거를 선택하세요.

### 워크플로우 트리거 옵션

GitHub Actions에서는 워크플로우 실행 시점을 커스터마이즈할 수 있습니다. 트리거 옵션은 다음과 같습니다:

| **트리거 유형** | **사용 사례** | **구성** |
| --- | --- | --- |
| Push 이벤트 | 코드 변경 시 배포 | 특정 브랜치에 코드가 푸시될 때 활성화 |
| 수동 실행 | 필요 시 업데이트 | 워크플로우를 수동으로 시작 가능 |
| 예약 | 정시 배포 | 정해진 간격으로 배포 실행 |
| Pull Request | 업데이트 테스트 | 메인 브랜치 병합 전 변경사항 테스트 |

### 보안 키 관리

안전한 배포를 위해 보안 키를 적절히 관리해야 합니다. GitHub Actions는 이를 위한 암호화된 시크릿 관리 시스템을 제공합니다.

**보안 인증 설정 단계:**

1.  **저장소 설정 접근**  
    저장소 설정에서 "Security" 탭 아래 "Secrets and variables" 섹션을 찾으세요.
    
2.  **[Capgo 자격증명](https://capgo.app/trust/) 추가**  
    Capgo 인증 토큰을 저장소 시크릿으로 저장하세요. `CAPGO_TOKEN`으로 이름을 지정하세요.
    
3.  **워크플로우에서 시크릿 참조**  
    저장된 시크릿을 다음과 같이 워크플로우에서 참조하세요: `${{ secrets.CAPGO_TOKEN }}`.
    

## 워크플로우에서 Capgo 명령어 사용

GitHub Actions 환경이 설정되면 Capgo CLI 명령어를 통합하여 배포를 자동화할 수 있습니다.

### Capgo CLI 설치

워크플로우에 Capgo CLI를 설치하는 단계를 추가하세요:

```yaml
steps:
  - name: Install Capgo CLI
    run: npm install -g @capgo/cli
  - name: Initialize Capgo
    run: npx @capgo/cli init
```

### CLI 인증

`CAPGO_TOKEN`을 사용하여 CLI를 안전하게 인증하세요:

```yaml
- name: Authenticate Capgo CLI
  run: npx @capgo/cli login
  env:
    CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}
```

### 배포 명령어

업데이트를 빌드, 버전 관리, 배포하는 주요 명령어입니다:

| 명령어 | 목적 | 사용 예시 |
| --- | --- | --- |
| `build` | [프로덕션용 번들](https://capgo.app/docs/webapp/bundles/) 생성 | `npx @capgo/cli build` |
| `deploy` | Capgo에 업데이트 푸시 | `npx @capgo/cli deploy` |
| `version` | 업데이트 버전 설정 | `npx @capgo/cli version 1.2.0` |

전체 배포 프로세스를 자동화하려면 다음과 같이 명령어를 함께 사용하세요:

```yaml
steps:
  - name: Build and Deploy
    run: |
      npx @capgo/cli build
      npx @capgo/cli version ${{ github.ref_name }}
      npx @capgo/cli deploy
    env:
      CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}
```

이 설정으로 워크플로우가 실행될 때마다 업데이트가 자동으로 빌드, 버전 관리, 배포됩니다. GitHub의 시크릿 관리 시스템이 프로세스 전반에 걸쳐 자격증명을 안전하게 보호합니다.

## 테스트와 수정

### 테스트 워크플로우 실행

전용 [Capgo 테스트 채널](https://capgo.app/docs/plugin/cloud-mode/channel-system/)을 사용하여 GitHub Actions 워크플로우를 테스트할 수 있습니다. 이를 통해 업데이트를 실제 배포하기 전에 검증할 수 있습니다.

```yaml
- name: Test Build Deployment
  run: |
    npx @capgo/cli build
    npx @capgo/cli deploy --channel beta
  env:
    CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}
```

Capgo의 채널 시스템은 다양한 단계별 배포 경로를 만드는 데 도움이 됩니다:

| 채널 | 목적 | 대상 사용자 |
| --- | --- | --- |
| 베타 | 사전 배포 테스트 | 내부 팀 |
| 스테이징 | QA 검증 | 테스트 사용자 |
| 프로덕션 | 실제 배포 | 모든 사용자 |

### 오류 해결

일반적인 통합 문제와 해결 방법입니다:

1.  **인증 실패**

GitHub Secrets의 CAPGO_TOKEN을 확인하세요. 만료된 경우 원활한 인증을 위해 재생성하세요.

2.  **빌드 오류**

빌드 구성이 배포 환경 요구사항과 일치하는지 확인하세요.

> "우리는 5000명 이상의 사용자 베이스에 Capgo OTA 업데이트를 프로덕션에 배포했습니다. OTA가 @Capgo에 배포된 후 몇 분 내에 거의 모든 사용자가 최신 상태가 되는 매우 원활한 운영을 확인했습니다." [\[1\]](https://capgo.app/)

3.  **버전 충돌**

배포 중 충돌을 방지하기 위해 시맨틱 버저닝을 준수하고 버전을 적절히 증가시키세요.

### 유지보수 팁

-   [Capgo 분석](https://capgo.app/dp/)을 사용하여 업데이트 성공률을 모니터링하세요.
-   문제가 발생할 수 있는 업데이트에 대해 자동 롤백을 활성화하세요.
-   더 나은 제어를 위해 채널 선택기를 사용하여 pull request(PR)를 테스트하세요.
-   최신 Capgo CLI 명령어로 워크플로우를 유지하세요.

우선순위가 높은 배포의 경우, Capgo의 오류 추적을 활용하여 잠재적 문제를 조기에 발견하세요. 문제가 발생하면 롤백 기능을 사용하여 빠르게 안정적인 버전으로 되돌릴 수 있어 중단을 최소화할 수 있습니다. 이러한 방법들은 프로덕션으로 나아갈수록 배포가 원활하게 진행되도록 도와줍니다.

## 결론

### 주요 하이라이

-   **커스텀 API 워크플로우**: Capgo의 공개 API를 사용하여 팀의 특정 요구사항에 맞는 배포 워크플로우를 설계하세요. 이를 통해 화이트 라벨 경험과 현재 도구와의 원활한 통합이 가능합니다 [\[1\]](https://capgo.app/).
-   **[채널 기반 릴리스](https://capgo.app/docs/webapp/channels/)**: Capgo의 채널 기능을 사용하여 단계적이고 제어된 업데이트를 통해 배포 프로세스를 최적화하세요.
-   **최적화된 성능**: Capgo의 부분 업데이트를 활용하여 대역폭 사용량을 줄이고 업데이트 속도를 높이세요. 750개의 프로덕션 앱에서 2,350만 건의 업데이트를 제공한 [\[1\]](https://capgo.app/) 시스템은 대규모 요구사항을 처리할 수 있는 능력이 입증되었습니다.

더 나은 결과를 위해 Capgo의 셀프 호스팅 옵션이나 커스텀 API 설정 사용을 고려해보세요. 이러한 전략을 완벽하게 구현하기 위한 자세한 설정 및 테스트 지침은 이전 섹션을 확인하세요.
