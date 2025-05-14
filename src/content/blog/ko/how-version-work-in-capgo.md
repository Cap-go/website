---
slug: how-version-work-in-capgo
title: Capgo에서 버전은 어떻게 작동하나요
description: >-
  Capgo가 당신의 Capacitor 앱에서 버전을 어떻게 관리하는지 이해하고 이를 최적으로 사용하는 방법을 배우세요. 주요, 부, 패치의
  의미를 알아보세요.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-08-25T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /versionning.webp
head_image_alt: Capgo 번들 버전 시스템
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Tutorial
published: true
locale: ko
next_blog: how-to-release-major-version-in-capgo
---
Capgo는 Capacitor 앱에서 버전을 관리하기 위해 2개의 주요 변수를 사용합니다:
  - 네이티브 버전
  - 자바스크립트 버전

<div class="mx-auto" style="width:100%;">
  <img src="/graph_capgo.webp" alt="Capacitor update system">
</div>

모든 버전 선택은 Capgo에 의해 서버 측에서 결정됩니다.

## 버전 관리 시스템

버전을 관리하기 위해 Capgo는 SemVer 시스템을 사용합니다. 자세한 내용은 [여기](https://semver.org/)에서 확인하세요.
### 버전

Capgo가 비교할 버전을 찾는 위치

  > `capacitor.config.json` 파일에서 version 키를 설정하여 이 동작을 재정의할 수 있습니다. [문서 여기](/docs/plugin/settings/#version)
  > 네이티브 버전은 모든 플랫폼에 대해 무시됩니다.

#### IOS

 IOS에서는 변수는 프로젝트의 `ios/App/App/Info.plist` 파일의 키 `CFBundleShortVersionString`에 설정되거나 `ios/App/App.xcodeproj/project.pbxproj` 파일의 키 `MARKETING_VERSION`에 설정됩니다. `Info.plist` 파일에서 `MARKETING_VERSION`이 설정되었을 경우입니다.

#### Android

  Android에서는 변수는 프로젝트의 `android/app/build.gradle` 파일의 키 `defaultConfig.versionName`에 설정됩니다.

#### JavaScript (Capgo 번들 버전)

  자바스크립트에서는 변수를 `package.json` 파일의 키 `version`에서 설정할 수 있습니다.
  그렇지 않으면 업로드 명령에서 제공해야 합니다.

## 기본 동작

사용자가 설정을 변경하지 않았을 경우 Capgo 채널의 동작 방식입니다.

> 이 동작은 사용자가 기본으로 설정한 고유 채널을 기반으로 합니다.

### Capacitor 앱의 새 설치 시
사용자가 Ionic 앱을 처음 다운로드하고 앱을 열면 Capgo 서버에 연락하게 됩니다.

현재 발생할 수 있는 4가지 출력:
  - 네이티브 번들 버전 (1.2.3)이 Capgo 번들 버전 (1.2.4)보다 낮으면, Capgo는 사용자에게 그의 번들을 보냅니다.
  - 네이티브 번들 버전 (1.2.3)이 Capgo 번들 버전 (1.2.3)과 같으면, Capgo는 "업데이트할 필요 없음"을 보냅니다.
  - 네이티브 번들 버전 (1.2.4)이 Capgo 번들 버전 (1.2.3)보다 높으면, Capgo는 "업데이트할 필요 없음"을 보냅니다.
  - 네이티브 번들 버전 (1.2.3)이 Capgo 번들 버전 (2.2.3)보다 MAJOR 낮으면, Capgo는 "업데이트할 필요 없음"을 보냅니다.

### 기타 설정

#### 네이티브에서 자동 다운그레이드 비활성화

이 설정을 false로 변경하면, Capgo는 항상 버전의 신뢰할 수 있는 소스로 간주합니다.
그런 다음 동작은 다음과 같이 변경됩니다:
- 네이티브 버전 (1.2.4)이 Capgo 버전 (1.2.3)보다 높습니다.

> Capgo는 사용자에게 그의 버전을 보냅니다.

#### 자동 업그레이드 전략 비활성화

여러 가지 전략 중에서 선택할 수 있습니다. 자세한 내용은 [여기](/docs/cli/commands/#disable-updates-strategy)에서 확인하세요.

## 자바스크립트 번들 버전

자바스크립트 번들 버전은 `npx @capgo/cli@latest bundle upload --channel production`을 실행할 때 전송하는 버전입니다.

`--bundle 1.2.3` 옵션을 사용하지 않으면, Capgo는 `package.json` 파일에서 번들 버전을 가져옵니다 (version 키에서).

당신의 Ionic 앱이 Capgo에서 버전을 설치한 후, 이 버전이 비교됩니다:
  - 그들의 자바스크립트 번들 버전 (1.2.3)이 Capgo 번들 버전 (1.2.4)보다 낮으면, Capgo는 사용자에게 그의 번들을 보냅니다.

몇 가지 조건이 적용됩니다:
  - 네이티브 번들 버전이 Capgo 버전보다 높으면, `네이티브에서 자동 다운그레이드 비활성화` 조건이 적용됩니다.
  - 네이티브 번들 버전이 Capgo 버전보다 MAJOR 낮으면, `MAJOR 이상 자동 업그레이드 비활성화` 조건이 적용됩니다.

## 앱 스토어 업데이트

당신이 Capacitor JS 앱을 앱 스토어에 게시하면, 발생하는 일은 간단합니다.

사용자는 기본적으로 스토어에서 새로운 버전을 받고, 그들의 앱에서 모든 로컬 업데이트를 제거합니다.

이 동작을 변경하려면 `resetWhenUpdate` 설정을 설정해야 합니다. 자세한 내용은 [여기](/docs/plugin/api#settings)에서 확인하세요.

이는 다른 설정과 달리 앱 측에서만 변경할 수 있습니다.

### 기타 설정

이 모든 동작 이후에, 특정한 기기 ID와 연결된 몇 가지 추가 설정이 있을 수 있습니다.

Capgo에서는 각 기기 ID에 대해 동작을 재정의할 수 있습니다.

하나의 기기 ID를 다음과 연결할 수 있습니다:
  - 특정 번들 버전
  - 특정 채널

이 설정은 위에서 설정한 모든 내용을 우회합니다.

아래 기사에서 더 알아보세요.
