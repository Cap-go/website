---
slug: how-version-work-in-capgo
title: Wie Versionen in Capgo funktionieren
description: >-
  Erfahren Sie, wie Capgo die Versionen Ihrer Capacitor-App verwaltet und wie
  Sie das Beste daraus machen können. Verstehen Sie die Bedeutung von Major,
  Minor und Patch.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-08-25T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /versionning.webp
head_image_alt: Capgo의 번들 버전 시스템
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Tutorial
published: true
locale: ko
next_blog: how-to-release-major-version-in-capgo
---

Capgo는 Capacitor 앱에서 버전을 관리하기 위해 2가지 주요 변수를 사용합니다:
  - 네이티브 버전
  - JavaScript 버전

<div class="mx-auto" style="width:100%;">
  <img src="/graph_capgo.webp" alt="Capacitor update system">
</div>

모든 버전 선택은 Capgo 서버 측에서 결정됩니다

## 버전 관리 시스템

Capgo는 버전 관리를 위해 SemVer 시스템을 사용합니다. 자세한 내용은 [여기](https://semverorg/)에서 확인하세요

### 버전

Capgo가 비교할 버전을 찾는 위치

  > `capacitorconfigjson` 파일에서 version 키를 설정하여 이 동작을 재정의할 수 있습니다 [설명서](/docs/plugin/settings/#version)
  > 네이티브 버전은 모든 플랫폼에서 무시됩니다

#### IOS

IOS에서는 `ios/App/App/Infoplist`의 `CFBundleShortVersionString` 키 또는 `ios/App/Appxcodeproj/projectpbxproj`의 `MARKETING_VERSION` 키에서 변수가 설정됩니다 (`Infoplist` 파일에 `MARKETING_VERSION`이 설정된 경우)

#### Android

Android에서는 `android/app/buildgradle`의 `defaultConfigversionName` 키에서 변수가 설정됩니다

#### JavaScript (Capgo 번들 버전)

JavaScript에서는 `packagejson`의 `version` 키에서 변수를 설정할 수 있습니다
그렇지 않으면 업로드 명령에서 제공해야 합니다

## 기본 동작

설정을 변경하지 않았을 때 Capgo 채널이 작동하는 방식입니다

> 이 동작은 기본으로 설정한 유일한 채널을 기반으로 합니다

### Capacitor 앱을 처음 설치할 때
사용자가 Ionic 앱을 처음 다운로드하고 앱을 열면 Capgo 서버에 연결됩니다

현재 4가지 결과가 발생할 수 있습니다:
1. 네이티브 번들 버전(123)이 Capgo 번들 버전(124)보다 낮으면 Capgo가 번들을 사용자에게 전송합니다
2. 네이티브 번들 버전(123)이 Capgo 번들 버전(123)과 같으면 Capgo는 "업데이트 필요 없음"을 전송합니다
3. 네이티브 번들 버전(124)이 Capgo 번들 버전(123)보다 높으면 Capgo는 "업데이트 필요 없음"을 전송합니다
4. 네이티브 번들 버전(123)이 Capgo 번들 버전(223)보다 MAJOR 낮으면 Capgo는 "업데이트 필요 없음"을 전송합니다

### 기타 설정

#### 네이티브 아래로 자동 다운그레이드 비활성화

이 설정을 false로 변경하면 Capgo는 항상 신뢰할 수 있는 버전 소스로 간주됩니다
그러면 동작이 다음과 같이 됩니다:
- 네이티브 버전(124)이 Capgo 버전(123)보다 높음

> Capgo가 사용자에게 자신의 버전을 전송합니다

#### 자동 업그레이드 전략 비활성화

선택할 수 있는 몇 가지 전략이 있습니다. [여기](/docs/cli/commands/#disable-updates-strategy)에서 자세히 알아보세요

## JavaScript 번들 버전

JavaScript 번들 버전은 `npx @capgo/cli@latest bundle upload --channel production`을 실행할 때 전송하는 버전입니다

`--bundle 123` 옵션을 사용하지 않은 경우 Capgo는 `packagejson` 파일의 version 키에서 번들 버전을 가져옵니다

Ionic 앱이 Capgo에서 버전을 설치한 후에는 다음을 비교하게 됩니다:
1. JavaScript 번들 버전(123)이 Capgo 번들 버전(124)보다 낮으면 Capgo가 번들을 사용자에게 전송합니다

다음과 같은 보호 조건이 있습니다:
- 네이티브 번들 버전이 Capgo 버전보다 높으면 `네이티브 아래로 자동 다운그레이드 비활성화` 조건이 적용됩니다
- 네이티브 번들 버전이 Capgo 버전보다 MAJOR 낮으면 `MAJOR 이상 자동 업그레이드 비활성화` 조건이 적용됩니다

## 앱 스토어 업데이트

Capacitor JS 앱을 앱 스토어에 게시할 때 일어나는 일은 간단합니다

사용자는 스토어에서 새 버전을 받고 기본적으로 앱의 모든 로컬 업데이트가 제거됩니다

이 동작을 변경하려면 `resetWhenUpdate` 설정을 변경해야 합니다. 자세한 내용은 [여기](/docs/plugin/api#settings)에서 확인하세요

이는 다른 설정과 달리 클라우드가 아닌 앱 측에서만 변경할 수 있습니다

### 기타 설정

이 모든 동작 이후에 deviceID와 관련된 특정 동작을 가질 수 있습니다

Capgo에서는 각 deviceID에 대한 동작을 재정의할 수 있습니다

deviceID를 다음과 연결할 수 있습니다:
1. 특정 번들 버전
2. 특정 채널

이는 위에서 설정한 모든 설정을 무시합니다

자세한 내용은 아래 문서에서 확인하세요