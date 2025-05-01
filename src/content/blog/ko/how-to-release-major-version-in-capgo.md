---
slug: how-to-release-major-version-in-capgo
title: Comment publier une version majeure dans Capgo
description: 사용자 앱을 손상시키지 않고 앱의 주요 버전을 출시하는 것이 필요한 시기와 방법을 이해하기
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

## 메이저 버전 출시 시

버전 관리는 어려울 수 있습니다. 일반적으로 사용자에게 중요한 변경사항이 있을 때 메이저 업데이트를 보내고 싶을 것입니다.

하지만 버전 관리는 그런 용도로 만들어진 것이 아닙니다. 앱스토어 버전은 네이티브 버전과 다릅니다.

네이티브 버전은 *코드*의 주요 변경사항을 관리하기 위한 것입니다.

예를 들어 iOS에서, iOS 16은 Apple의 `store version`이지만 코드 버전은 `20A5283p`입니다 (여기서는 SemVer를 사용하지 않는 것 같습니다)

이제 이들을 혼동하지 않고 각각의 용도에 맞게 사용하는 것이 명확해졌습니다!

## 메이저 릴리스

Capacitor 앱에서 메이저 릴리스는 주요 변경사항이 있을 때 필요합니다.
예를 들어, 새로운 iOS 타겟(15에서 16으로), 또는 새로운 Capacitor 버전(3에서 4로), 또는 사용 중인 플러그인(12에서 20으로)이 메이저 버전으로 업데이트된 경우입니다.

이러한 변경은 모든 도구가 주요 변경사항을 처리하기 위해 정렬되어야 함을 의미합니다.

그래서 Capgo는 이 시스템을 따릅니다.
따라서 메이저 버전을 출시하면 Capgo는 스토어에서 설치하지 않은 사용자에게 이를 전송하지 않습니다.\
이 동작은 사용자 정의할 수 있습니다. [여기](/docs/cli/commands/#disable-updates-strategy)에서 자세히 알아볼 수 있습니다.

### 버전

Capgo가 비교할 버전을 찾는 위치

#### iOS
  > Capgo가 JavaScript 버전과 비교하고 메이저 업그레이드를 찾는 데 사용됩니다.

 iOS에서 변수는 `ios/App/App/Infoplist`의 `CFBundleShortVersionString` 키 또는 `ios/App/Appxcodeproj/projectpbxproj`의 `MARKETING_VERSION` 키 아래에 설정됩니다. `Infoplist` 파일에 `MARKETING_VERSION`이 설정된 경우입니다.
  > `capacitorconfigjson` 파일에서 version 키를 설정하여 이 동작을 재정의할 수 있습니다. [여기에서 문서 확인](/docs/plugin/auto-update#advanced-settings/)

#### Android
  > Capgo가 JavaScript 버전과 비교하고 메이저 업그레이드를 찾는 데 사용됩니다.

  Android에서 변수는 `android/app/buildgradle`의 `defaultConfigversionName` 키 아래에 설정됩니다.
  > `capacitorconfigjson` 파일에서 version 키를 설정하여 이 동작을 재정의할 수 있습니다. [여기에서 문서 확인](/docs/plugin/auto-update#advanced-settings/)

#### JavaScript
  > Capgo가 네이티브 버전과 비교하고 메이저 업그레이드를 찾는 데 사용됩니다.

  JavaScript에서 변수는 `packagejson`의 `version` 키 아래에 설정됩니다.

## 예시

현재 Capacitor 3으로 버전 `1.2.3`이 출시된 Ionic 앱이 있습니다.

Capacitor 4로 업그레이드를 진행 중입니다.

버전 번호를 `2.2.3`으로 업그레이드해야 하며, Capgo를 포함한 모든 패키지가 이 큰 변경을 알아차릴 것입니다.

이 버전을 Capgo와 App Store에 출시할 때

Capgo의 다음 라이브 업데이트 `2.2.4`는 `1.2.3` 버전 사용자에게는 전송되지 않고 `2.2.3` 버전 사용자에게만 전송됩니다.

이 패턴을 따르면 더 이상 걱정할 필요가 없으며 모든 것이 잘 처리됩니다.

## 이를 따르지 않을 경우

이 경우, Capacitor 4가 포함된 새 앱을 Apple과 Google에 보내야 하지만 Capgo에는 보내지 않습니다.

그런 다음 사용자의 100% 또는 최소 90%가 앱을 업데이트할 때까지 기다려야 하며, 이는 아마도 몇 달이 걸릴 것입니다.

이 기간 동안 이전 사용자가 새 버전을 받을 수 없기 때문에 Capgo로 어떤 업데이트도 보낼 수 없습니다.
업데이트를 받을 사용자를 선택할 방법이 없습니다.