---
slug: how-to-release-major-version-in-capgo
title: capgo에서 주요 버전을 릴리스하는 방법
description: 앱의 사용자 앱을 중단시키지 않고 주요 버전을 언제 그리고 어떻게 릴리스해야 하는지 이해하세요.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-08-30T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo-feature-image.webp
head_image_alt: Capgo 주요 버전 시스템
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Tutorial
published: true
locale: ko
next_blog: how-to-send-specific-version-to-users
---
## 주요 버전을 출시할 때

버전 관리는 어려울 수 있으며, 일반적으로 주요 변경 사항이 사용자에게 나타날 때 주요 업데이트를 보내고자 합니다.

하지만 버전 관리는 그렇게 설계되지 않았습니다. 앱 스토어의 버전은 네이티브 버전과 다릅니다.

네이티브 버전은 *코드*에서의 중단 변경을 관리하기 위해 만들어졌습니다.

예를 들어 iOS에서 iOS 16은 Apple의 `스토어 버전`이지만, 코드 버전은 `20A5283p`입니다(여기서는 SemVer를 사용하지 않는 것 같습니다).

이제 우리는 그것들을 혼합하지 않고 각각의 목적에 맞게 사용해야 함이 분명해졌습니다!

## 주요 릴리즈

귀하의 Capacitor 앱에서 중단 변경이 발생할 때 주요 릴리즈가 필요합니다.
예를 들어, 새로운 iOS 타겟 (15에서 16으로) 또는 새로운 Capacitor 버전 (3에서 4로), 또는 사용 중인 플러그인 (1.2에서 2.0으로)이 주요 버전으로 업데이트되었습니다.

이 변경은 모든 도구가 중단 변경을 처리하도록 정렬되어야 함을 의미합니다.

그래서 Capgo는 이 시스템을 따릅니다.
따라서 주요 버전을 출시하면 Capgo는 스토어에서 설치하지 않은 사용자에게 전송하지 않습니다.\
이 동작은 사용자 지정할 수 있습니다. 자세한 내용은 [여기](/docs/cli/commands/#disable-updates-strategy)에서 확인해 보세요.

### 버전

Capgo가 비교할 버전을 찾는 위치

#### iOS
  > Capgo가 자바스크립트 버전에 비교하여 주요 업그레이드를 찾는 데 사용됩니다.

iOS에서 변수는 귀하의 프로젝트에서 `ios/App/App/Info.plist`의 `CFBundleShortVersionString` 키 아래에 설정되거나, `ios/App/App.xcodeproj/project.pbxproj`의 `MARKETING_VERSION` 키 아래에 설정됩니다. 만약 `Info.plist` 파일에 `MARKETING_VERSION`이 설정되어 있다면.  
  > 이 동작은 `capacitor.config.json` 파일에서 버전 키를 설정하여 오버라이드할 수 있습니다 [문서 여기](/docs/plugin/auto-update#advanced-settings/)

#### Android
  > Capgo가 자바스크립트 버전에 비교하여 주요 업그레이드를 찾는 데 사용됩니다.

Android에서 변수는 귀하의 프로젝트에서 `android/app/build.gradle`의 `defaultConfig.versionName` 키 아래에 설정됩니다.  
  > 이 동작은 `capacitor.config.json` 파일에서 버전 키를 설정하여 오버라이드할 수 있습니다 [문서 여기](/docs/plugin/auto-update#advanced-settings/)

#### JavaScript
  > Capgo가 네이티브 버전에 비교하여 주요 업그레이드를 찾는 데 사용됩니다.

JavaScript에서 변수는 귀하의 프로젝트에서 `package.json`의 `version` 키 아래에 설정됩니다.

## 예시

귀하의 Ionic 앱은 현재 `1.2.3` 버전으로 Capacitor 3과 함께 출시되었습니다.

귀하는 Capacitor 4로 업그레이드를 진행하고 있습니다.

버전 번호를 `2.2.3`으로 업그레이드해야 하며, 그러면 귀하의 모든 패키지에는 Capgo가 이 큰 변경 사항을 알립니다.

이 버전을 Capgo와 App Store에 출시하면 됩니다.

이후 Capgo의 모든 라이브 업데이트 `2.2.4`는 `1.2.3` 버전의 사용자에게는 절대 전송되지 않습니다. 오직 `2.2.3` 버전만 가능합니다.

이 패턴을 따르면 더 이상 걱정할 필요가 없습니다. 모든 것이 잘 처리되기 때문입니다.

## 이 패턴을 따르지 않을 경우

이 경우, 이는 귀하가 Capacitor 4를 사용하여 Apple과 Google에 새로운 앱을 보내야 하지만 Capgo에는 보내지 않아야 함을 의미합니다.

그렇다면 귀하의 100% 사용자, 또는 최소한 90%가 앱을 보유할 때까지 기다려야 하며, 이는 몇 달이 걸릴 수 있습니다.

이 기간 동안에는 Capgo로 업데이트를 전송할 수 없으며, 기존 사용자는 새로운 버전을 받을 수 없습니다.
업데이트를 받을 사용자만 선택할 방법이 없습니다.
