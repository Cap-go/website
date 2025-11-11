---
slug: automatic-capacitor-ios-build-codemagic
title: Codemagic을 사용한 자동 Capacitor iOS 빌드
description: 5분 안에 Codemagic과 Codemagic을 사용하여 IOS Ionic 앱의 CI/CD 파이프라인 설정하기 (2024)
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2024-07-24T00:00:00.000Z
updated_at: 2024-07-24T00:00:00.000Z
head_image: /Codemagic_ios.webp
head_image_alt: Codemagic 테스트플라이트 일러스트레이션
keywords: 'Codemagic, CI/CD, iOS, automatic build, automatic release, mobile app updates'
tag: CI/CD
published: true
locale: ko
next_blog: automatic-capacitor-android-build-codemagic
---
## Codemagic을 사용한 iOS 지속적 배포

## 사전 요구사항

튜토리얼을 계속하기 전에...

- iOS 개발자 프로그램 멤버십
- 읽고자 하는 의지 😆...

## 가격에 대한 중요 안내

![Price Codemagic Action](/price_codemagic.webp)

[https://codemagic.io/pricing/](https://codemagic.io/pricing/)

선택한 머신에 따라 월 500 macOS M1 분까지 '무료'로 서비스를 이용할 수 있습니다.
우리는 **_macOS M1_** 머신을 사용할 예정이며, 스크린샷에서 가격과 제한을 확인할 수 있습니다 (가격은 튜토리얼 작성 시점 기준이며, 향후 변경될 수 있습니다)

🔴 **_요구사항과 가격에 대해 안내했으니, 계속 진행하시겠습니다..._**

> **_📣_ 이 포스트에서는 iTunes Connect에 앱이 생성되어 있고, Apple 생태계의 인증서가 있다고 가정합니다. 모든 것은 Codemagic이 설정할 것입니다!**

## 시작해봅시다 🤿

**포스트에서 다룰 단계들**

1. _Codemagic에서 App Store Connect API 사용하기_
2. _요구사항_
3. _App Store Connect API 키 생성하기_
4. _App Store Connect API 키 사용하기_
5. _Fastlane 파일 복사하기_
6. _Codemagic 구성하기_

## 1. Codemagic에서 App Store Connect API 사용하기

> 2021년 2월부터 App Store Connect 로그인 시 2단계 인증 또는 2단계 확인이 모든 사용자에게 필요합니다. Apple ID에 대한 이 추가 보안 계층은 계정에 접근할 수 있는 유일한 사람이 본인임을 보장합니다.
> [Apple Support](https://developer.apple.com/support/authentication/) 참조

> match를 시작하려면 기존 인증서를 취소해야 합니다. 하지만 걱정하지 마세요, 새로운 인증서를 바로 받을 수 있습니다.

### 요구사항

App Store Connect API를 사용하기 위해 Codemagic은 **세 가지**가 필요합니다.

1. Issuer ID
2. Key ID
3. 키 파일 또는 키 내용

[... 나머지 내용 계속됨 ...]
