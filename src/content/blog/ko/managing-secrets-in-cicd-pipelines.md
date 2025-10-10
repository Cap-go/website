---
slug: managing-secrets-in-cicd-pipelines
title: CI/CD 파이프라인에서 비밀 관리하기
description: CI/CD 파이프라인에서 보안을 강화하고 침해와 규정 준수 문제를 방지하기 위한 효과적인 비밀 관리 전략을 알아보세요.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-20T00:50:40.782Z
updated_at: 2025-10-10T02:17:19.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/68043aae6000445eb1a64c9e-1745110261303.jpg
head_image_alt: 기술
keywords: 'CI/CD, secret management, security, environment variables, automated scanning'
tag: 'Development, Security, Updates'
published: true
locale: ko
next_blog: ''
---
**CI/CD 파이프라인에서 비밀 정보를 안전하게 보관하는 것은 침해, 서비스 중단 및 규정 준수 문제를 방지하는 데 매우 중요합니다.** 다음은 효과적으로 수행하는 방법입니다:

-   비밀 정보를 안전하게 저장하기 위해 **환경 변수**와 **보안 볼트**를 사용하세요.
-   필요한 권한만 부여하고 비밀 정보를 정기적으로 교체하여 **접근을 제한**하세요.
-   `git-secrets` 또는 `truffleHog`와 같은 도구로 **비밀 정보 스캔을 자동화**하여 유출을 조기에 감지하세요.
-   [GitHub Actions](https://docs.github.com/actions), [GitLab CI](https://docs.gitlab.com/ee/ci/), 또는 [Jenkins](https://www.jenkins.io/)와 같은 **CI/CD 도구**를 활용하여 내장된 비밀 정보 관리를 사용하세요.
-   상세한 로그로 비밀 정보 사용을 **모니터링하고 감사**하세요.

### 일반적인 CI/CD 비밀 정보

-   [API 키](https://capgo.app/docs/webapp/api-keys/)
-   데이터베이스 자격 증명
-   암호화 키
-   인증 토큰
-   SSL 인증서

### 인기 있는 비밀 정보 관리 플랫폼

| 플랫폼 | 기능 | 최적 사용처 |
| --- | --- | --- |
| **[HashiCorp Vault](https://www.hashicorp.com/products/vault)** | 동적 비밀 정보, 암호화, 접근 제어 | 대규모 운영 |
| **[AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/)** | AWS 통합, 자동 교체 | AWS 중심 설정 |
| **[Azure Key Vault](https://learn.microsoft.com/en-us/azure/key-vault/)** | 인증서 처리, 키 교체 | Microsoft 환경 |

이러한 관행을 따르고 적절한 도구를 사용함으로써 CI/CD 파이프라인을 보호하고 안전한 워크플로우를 유지할 수 있습니다.

## 비밀 정보에 대한 보안 지침

### 코드에서 비밀 정보 제외하기

-   민감한 정보를 관리하기 위해 **환경 변수**를 사용하세요.
-   비밀 정보를 이를 위해 설계된 **보안 볼트**에 저장하세요.
-   빌드 프로세스 중 자격 증명을 주입하기 위해 CI/CD 파이프라인을 볼트에 연결하세요.

### 접근 제한 및 모니터링

각 사용자나 서비스에 **필요한 최소한의 권한**만 부여하고 권한을 정기적으로 검토하세요.

또한, 정기적으로 비밀 정보를 교체하고 잠재적인 침해를 추적하고 식별하기 위해 **감사 로그**를 유지하세요.

## [GitLab CI](https://docs.gitlab.com/ee/ci/)를 [HashiCorp Vault](https://www.hashicorp.com/products/vault)와 통합하여 검색하는 방법...

<iframe src="https://www.youtube.com/embed/NsPcl4rqy9A" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## 비밀 정보 관리 도구

보안 지침이 마련되면 비밀 정보 관리를 위해 특별히 설계된 도구를 배포할 때입니다.

### 비밀 정보 저장 플랫폼

이러한 도구를 사용하여 모든 비밀 정보를 중앙화하고 모니터링하세요:

| 플랫폼 | 기능 | 최적 사용처 |
| --- | --- | --- |
| **HashiCorp Vault** | 동적 비밀 정보, 암호화 서비스, ID 기반 접근 | 대규모 운영 |
| **AWS Secrets Manager** | AWS와의 원활한 통합, 자동 교체, 세분화된 권한 | AWS 중심 설정 |
| **Azure Key Vault** | 하드웨어 보안 모듈, 인증서 처리, 키 교체 | Microsoft 클라우드 환경 |

저장 플랫폼에서 비밀 정보를 안전하게 보관한 후, CI/CD 도구에 포함된 비밀 정보 관리 기능을 활용하세요.

### CI/CD 비밀 정보 관리

많은 CI/CD 도구는 내장된 비밀 정보 관리 기능을 제공합니다:

-   **GitHub Actions**: 저장소와 조직 수준 모두에서 암호화된 비밀 정보를 제공합니다. 비밀 정보는 로그에서 자동으로 마스킹되며 승인된 워크플로우에서만 접근할 수 있습니다.
-   **GitLab CI**: 보호된 변수와 그룹 수준의 비밀 정보를 제공하여 격리를 유지하면서 프로젝트 간 안전한 공유가 가능합니다.
-   **Jenkins**: 자격 증명 플러그인과 함께 작동하고 외부 비밀 정보 저장소를 지원합니다. 로그에서 비밀 정보를 마스킹하기 위해 플러그인이 필요합니다.

### [Capgo](https://capgo.app/) 보안 기능

![Capgo](https://assets.seobotai.com/capgo.app/68043aae6000445eb1a64c9e/37a0fc028bf1f414683e8dee42eedfb0.jpg)

Capgo는 표준 CI/CD 비밀 정보 관리를 확장하여 Capacitor 앱의 실시간 업데이트 보안을 강화합니다. 승인된 사용자만 민감한 데이터를 복호화할 수 있도록 종단 간 암호화를 사용합니다[\[1\]](https://capgo.app/).

Capgo는 GitHub Actions, GitLab CI, Jenkins와 같은 도구와 원활하게 통합됩니다. 또한 채널 기반 배포와 역할 기반 접근 제어를 지원하여 Apple과 Android 플랫폼의 업데이트 요구 사항을 충족합니다.

## 버전 제어의 비밀 정보

하드코딩된 자격 증명이 유출되는 것을 방지하여 저장소를 보호하세요. 보안 볼트 저장소로 시작한 다음, 코드의 민감한 정보를 차단하기 위한 추가 보호 장치를 추가하세요.

다음은 방어를 강화하는 방법입니다:

-   **[git-secrets](https://github.com/awslabs/git-secrets)나 pre-commit 프레임워크와 같은 도구를 사용**하여 커밋하기 전에 문제를 감지하세요.
-   **[truffleHog](https://github.com/trufflesecurity/trufflehog)이나 [GitGuardian](https://www.gitguardian.com/)과 같은 도구로 정기적인 스캔을 실행**하여 유출될 수 있는 비밀 정보를 감지하세요.
-   **CI/CD 검사를 자동화**하여 비밀 정보가 발견되면 빌드를 플래그하고 실패하도록 하세요.

다음으로, 노출된 비밀 정보를 효과적으로 처리하는 방법을 다룰 것입니다.

## 요약

이 가이드에서는 볼트 저장소, 자동화된 스캔, CI/CD 도구 통합, 저장소 보호에 대해 살펴보았습니다. Capgo는 종단 간 암호화와 원활한 CI/CD 통합을 통해 보안과 빠른 배포를 결합합니다[\[1\]](https://capgo.app/).

안전한 비밀 정보 관리를 위한 핵심 사항:

-   **볼트 저장소 사용**: 저장과 전송 중 모두 암호화를 제공하는 플랫폼을 사용하세요.
-   **보안 검사 자동화**: 비밀 정보 노출을 조기에 식별하기 위한 스캐닝 도구를 구현하세요.
-   **활동 추적 및 모니터링**: 비밀 정보 접근과 수정에 대한 상세한 감사 로그를 유지하세요.
-   **사고 대비**: 노출된 비밀 정보를 처리하고 필요할 때 변경 사항을 롤백하기 위한 명확한 프로세스를 설정하세요.

효과적인 비밀 정보 관리는 보안을 장애물에서 지속적 배포를 위한 지원 시스템으로 전환합니다.
