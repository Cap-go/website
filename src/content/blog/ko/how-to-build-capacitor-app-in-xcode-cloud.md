---
slug: how-to-build-capacitor-app-in-xcode-cloud
title: Xcode Cloud에서 Ionic Capacitor 앱을 구축하는 방법
description: Xcode 클라우드를 사용하여 Capacitor JS 앱을 빌드하고 MacOS의 필요성을 우회하십시오.
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
## 필수 조건

튜토리얼을 계속하기 전에…

-   GitHub를 사용하고 있는지 확인하세요.
-   Capacitor를 사용하세요.
-   귀하의 앱이 Apple Store에 이미 배포되어 있어야 합니다.
-   읽고 싶은 욕구 😆…

Ionic 사용은 선택 사항이며, Cordova도 작동할 수 있지만, 저는 시도해 보지 않았습니다.

## 가격에 대한 중요 사항

![Price Xcode Cloud](/xcode_cloud_price.webp)

[https://developer.apple.com/xcode-cloud/](https://developer.apple.com/xcode-cloud/)

서비스는 한도까지 ‘_무료’_입니다.  
스크린샷에서 가격과 제한을 확인할 수 있습니다(튜토리얼 작성 시 기준 가격이며, 향후 변경될 수 있습니다).

🔴 **_요구 사항과 가격을 알려드린 후, 원하시면 계속 진행합니다..._**

> **_📣_ 본문에서는 Apple Store에 앱이 생성되어 있다고 가정합니다.**

## 소개

Xcode가 귀하의 Capacitor 앱을 빌드하도록 하려면 몇 가지 설정이 필요합니다.

## 패키지 준비

`package.json` 스크립트에 빌드 명령이 있어야 합니다.  
그런 다음 아래와 같이 `sync:ios` 명령을 추가하세요.

```json
{
  "scripts": {
    "build": "YOUR BUILD COMMAND",
    "sync:ios": "cap sync ios"
  }
}
```  
이 단계는 게시 스크립트가 간단히 작동하도록 합니다.

## 클론 후 스크립트
이 스크립트는 클론 단계 후 Xcode Cloud에서 실행됩니다.

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

이 파일을 프로젝트의 루트에 저장하고 이름을 `ios/App/ci_scripts/ci_post_clone.sh`로 지정하세요.

그런 다음 이 파일을 실행 가능하게 하려면 `chmod +x ios/App/ci_scripts/ci_post_clone.sh` 명령을 실행하세요.

## Xcode 작업 흐름 만들기

Xcode를 여세요 (네, Xcode를 제거하려면 Xcode가 필요합니다).

그리고 이 탭으로 이동하세요:  
![Xcode step 1](/xcode_step_1.webp)

작업 흐름을 만들기를 클릭하고 앱을 선택한 다음 아래와 같이 다음을 클릭하세요.  
![Xcode step 2](/xcode_step_2.webp)

왼쪽에서 작업 흐름 편집을 클릭하세요.  
![Xcode step 2](/xcode_step_3.webp)

환경 탭으로 가서 아래와 같이 Mac 12.4를 선택하고 적절한 옵션을 확인하세요.  
![Xcode step 3](/xcode_step_3.webp)

시작 조건을 선택하세요.  
저희와 동일한 빌드를 사용한다면, 중복 빌드를 피하기 위해 분기 대신 태그를 사용하는 것이 좋습니다.

환경 변수를 설정하세요.  
![Xcode step 4](/xcode_step_4.webp)

GitHub 계정을 연결하세요.  
![Xcode step 5](/xcode_step_5.webp)

![Xcode step 6](/xcode_step_6.webp)

그런 다음 작업 흐름을 활성화하고 첫 번째 변경 사항을 커밋하세요. Xcode에서 빌드가 실행되는 것을 볼 수 있어야 합니다.

## **빌드 처리**

Xcode Cloud에서는 **CI/CD 작업 흐름을 실행하는 데 사용한 분을 기준으로 요금이 부과됩니다**. 경험상 Apple Store에서 빌드가 처리되기까지 약 10–15분이 소요됩니다.

개인 프로젝트의 경우, 빌드당 예상 비용은 **$0.008/분 x 5분 = $0.4**까지 올라갈 수 있으며, 설정 또는 프로젝트의 종속성에 따라 더 높아질 수 있습니다.

오픈 소스 프로젝트의 경우, 이는 전혀 문제가 되지 않을 것입니다. [가격](https://github.com/pricing/)을 참조하세요.
