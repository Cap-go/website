---
slug: automatic-capacitor-ios-build-github-action-with-match
title: GitHub actions에서 match를 사용한 자동 Capacitor iOS 빌드
description: 5분 안에 fastlane과 GitHub Actions를 사용하여 IOS Ionic 앱을 위한 CI/CD 파이프라인 설정하기 (2022)
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-10-30T00:00:00.000Z
updated_at: 2024-08-01T00:00:00.000Z
head_image: /fastlane_ios.webp
head_image_alt: Fastlane testflight GitHub action 설명
keywords: 'Fastlane, CI/CD, iOS, automatic build, automatic release, mobile app updates'
tag: CI/CD
published: true
locale: ko
next_blog: automatic-capacitor-android-build-github-action
---

# GitHub Actions를 사용한 자동 iOS 빌드 (Match 사용)

Capacitor 앱용 CI/CD 설정은 복잡하고 시간이 많이 걸릴 수 있습니다. 다음은 알아야 할 사항입니다:

## 사전 요구사항

시작하기 전에 다음이 필요합니다:

- 관리자 권한이 있는 GitHub 계정 
- iOS 개발자 프로그램 멤버십
- 적절한 권한이 있는 App Store Connect API 액세스
- GitHub Actions 워크플로우 이해
- Fastlane과 Match 구성에 대한 지식
- 파이프라인 유지보수 및 디버깅 시간
- 많은 개발자가 있는 팀, 그렇지 않으면 더 간단한 워크플로우를 위해 [fastlane cert](/blog/automatic-capacitor-ios-build-github-action)를 사용하는 것을 추천합니다

## Capgo의 전문 CI/CD 설정

복잡성을 건너뛰고 [Capgo](https://capgo.app/docs/getting-started/cicd-integration/)가 선호하는 플랫폼에서 직접 CI/CD 파이프라인을 구성합니다:

- **플랫폼 독립성**: GitHub Actions, GitLab CI 등에서 작동
- **원활한 통합**: 플랫폼 전환이 필요 없이 현재 프로세스와 함께 작동
- **맞춤형 구성**: 프로젝트 요구사항에 맞는 맞춤 설정
- **전문가 가이드**: 이미 50개 이상의 앱에 대해 CI/CD를 설정했습니다

### 가격
- 일회성 설정 비용: $2,600
- 운영 비용: ~$300/년
- 다른 독점 솔루션과 비교: $6,000/년
- **5년간 $26,100 절약**

[지금 CI/CD 설정하기](https://calcom/martindonadieu/mobile-ci-cd-done-for-you/)

## 수동 설정 가이드

직접 모든 것을 설정하고 싶다면, 다음과 같이 해야 합니다:

## Fastlane과 GitHub Actions를 사용한 iOS용 지속적 배포(match 사용)

## 사전 요구사항

튜토리얼을 계속하기 전에...

-   개발 머신에 Fastlane이 [설치](https://docsfastlanetools/)되어 있는지 확인하세요
-   iOS 개발자 프로그램 멤버십
-   읽고자 하는 의지 😆...
-   많은 개발자가 있는 팀, 그렇지 않으면 더 간단한 워크플로우를 위해 [fastlane cert](/blog/automatic-capacitor-ios-build-github-action)를 사용하는 것을 추천합니다

## 가격에 대한 중요 사항

![Price GitHub Action](/price_github_actionswebp)

[https://githubcom/features/actions](https://githubcom/features/actions/)

이 서비스는 선택한 머신에 따라 제한까지 '무료'입니다
우리는 **_macOS_** 머신을 사용할 것입니다. 스크린샷에서 가격과 제한을 확인할 수 있습니다(튜토리얼 작성 시점의 가격이며, 향후 변경될 수 있습니다)

🔴 **_요구사항과 가격에 대해 경고했으니, 계속 진행하겠습니다..._**

> **_📣_ 이 포스트에서는 iTunes Connect에 앱이 생성되어 있고, Apple 에코시스템의 인증서가 있다고 가정합니다. 모든 것은 Fastlane이 복사할 것입니다!**

## 시작해보겠습니다 🤿

**포스트에서 따라야 할 단계**

1. _Fastlane Match로 App Store Connect API 사용하기_
2. _요구사항_
3. _App Store Connect API 키 생성하기_
4. _App Store Connect API 키 사용하기_
5. _Fastline 파일 복사하기_
6. _Fastlane match 구성하기_
6. _Fastlane match 구성하기_

## 1. Fastlane Match로 App Store Connect API 사용하기

> 2021년 2월부터 모든 사용자는 App Store Connect에 로그인할 때 2단계 인증 또는 2단계 확인이 필요합니다. Apple ID에 대한 이 추가 보안 계층은 계정에 접근할 수 있는 유일한 사람이 귀하임을 보장합니다.  
> [Apple Support](https://developerapplecom/support/authentication/)에서

> match를 시작하려면 기존 인증서를 취소해야 합니다. 하지만 걱정하지 마세요, 새로운 인증서를 바로 받을 수 있습니다.

## 요구사항

App Store Connect API를 사용하기 위해 Fastlane은 **세 가지**가 필요합니다

1. Issuer ID
2. Key ID
3. Key 파일 또는 Key 내용

## App Store Connect API 키 생성하기

키를 생성하려면 App Store Connect에서 관리자 권한이 있어야 합니다. 해당 권한이 없다면 관련 담당자에게 이 문서를 전달하고 다음 지침을 따르도록 할 수 있습니다.

1 — [App Store Connect](https://appstoreconnectapplecom/)에 로그인하세요

2 — [사용자 및 액세스](https://appstoreconnectapplecom/access/users/)를 선택하세요

![App Store Connect user access](/select_user_accesswebp)

3 — 통합 탭을 선택하세요