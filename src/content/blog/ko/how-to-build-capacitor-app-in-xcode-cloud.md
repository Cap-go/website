---
slug: how-to-build-capacitor-app-in-xcode-cloud
title: Cómo compilar una aplicación Ionic Capacitor en Xcode Cloud
description: MacOS가 필요없이 Xcode cloud를 사용하여 Capacitor JS 앱을 빌드하세요.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-09-01T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /xcode_cloud.webp
head_image_alt: Capacitor Xcode 클라우드 빌드
keywords: >-
  Xcode Cloud, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: ko
---

## 사전 조건

튜토리얼을 진행하기 전에...

- GitHub을 사용하고 있는지 확인하세요
- Capacitor 사용
- 앱이 이미 Apple Store에 배포되어 있어야 합니다
- 읽고자 하는 의지 😆...

Ionic 사용은 선택사항이며, Cordova도 작동할 수 있지만 시도해보지는 않았습니다

## 가격에 대한 중요 사항

![Price Xcode Cloud](/xcode_cloud_pricewebp)

[https://developerapplecom/xcode-cloud/](https://developerapplecom/xcode-cloud/)

이 서비스는 제한까지는 '무료'입니다  
스크린샷에서 가격과 제한을 확인할 수 있습니다 (튜토리얼 작성 시점 기준 가격이며, 향후 변경될 수 있습니다)

🔴 **_요구사항과 가격에 대해 안내받았으니, 계속 진행하시겠습니까_**

> **_📣_ 이 게시물에서는 앱이 이미 Apple Store에 생성되어 있다고 가정합니다**

## 소개

Xcode가 Capacitor 앱을 빌드하도록 하기 위해서는 몇 가지 설정이 필요합니다

## 패키지 준비

`packagejson` 스크립트에 빌드 명령어가 있는지 확인하세요
그리고 아래와 같이 `sync:ios` 명령어를 추가하세요

```json
{
  "scripts": {
    "build": "YOUR BUILD COMMAND",
    "sync:ios": "cap sync ios"
  }
}
```
이 단계는 포스트 스크립트가 간단히 작동하도록 합니다

## 포스트 클론 스크립트
이 스크립트는 클론 단계 이후 Xcode cloud에 의해 실행됩니다

```bash
#!/usr/bin/env bash

set -x

export HOMEBREW_NO_INSTALL_CLEANUP=TRUE
# Install CocoaPods
echo "📦 Install CocoaPods"
brew install cocoapods
brew install node@18
brew link node@18

# Install dependencies
# XCode Cloud is literally broken for 2 months now - https://developer.apple.com/forums/thread/738136?answerId=774510022#774510022
npm config set maxsockets 3
npm ci
# or `pnpm install --frozen-lockfile` or `yarn install --frozen-lockfile` or bun install
npm run build 
# or npm run build
npm run sync:ios
```

이 파일을 프로젝트 루트에 저장하고 `ios/App/ci_scripts/ci_post_clonesh`로 이름을 지정하세요

그런 다음 `chmod +x ios/App/ci_scripts/ci_post_clonesh` 명령어로 이 파일을 실행 가능하게 만드세요

## Xcode 워크플로우 생성

Xcode를 엽니다 (네, Xcode를 제거하려면 Xcode가 필요합니다)

그리고 이 탭으로 이동하세요:
![Xcode step 1](/xcode_step_1webp)

워크플로우 생성을 클릭하고, 앱을 선택한 후, 아래와 같이 다음을 클릭하세요

![Xcode step 2](/xcode_step_2webp)

왼쪽의 워크플로우 편집을 클릭하세요
![Xcode step 2](/xcode_step_3webp)

환경 탭으로 이동하여 아래와 같이 Mac 124를 선택하고 적절한 옵션을 체크하세요
![Xcode step 3](/xcode_step_3webp)

시작 조건을 선택하세요
우리와 같은 빌드를 사용한다면, 이중 빌드를 피하기 위해 브랜치 대신 태그를 사용하는 것을 추천합니다

환경 변수를 설정하세요
![Xcode step 4](/xcode_step_4webp)

GitHub 계정을 연결하세요
![Xcode step 5](/xcode_step_5webp)

![Xcode step 6](/xcode_step_6webp)

그런 다음 워크플로우를 활성화하고 첫 번째 변경사항을 커밋하세요. Xcode에서 빌드가 실행되는 것을 볼 수 있습니다

## **빌드 처리**

Xcode Cloud에서는 **CI/CD 워크플로우 실행에 사용한 시간을 기준으로 요금이 청구됩니다**. 경험상 빌드가 Apple Store에서 처리되기까지 약 10-15분이 소요됩니다

비공개 프로젝트의 경우, 빌드당 예상 비용은 프로젝트의 구성이나 종속성에 따라 **$0.008/분 x 5분 = $0.4** 또는 그 이상이 될 수 있습니다

오픈소스 프로젝트의 경우, 이는 전혀 문제가 되지 않습니다. [가격 책정](https://githubcom/pricing/) 참조