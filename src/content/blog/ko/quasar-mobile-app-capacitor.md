---
slug: live-update-with-quasar-and-capacitor
title: >-
  Créer des applications mobiles avec des mises à jour en direct, Quasar et
  Capacitor.
description: 'Quasar, Capacitor를 이용하여 라이브 업데이트가 가능한 모바일 앱을 만드는 방법'
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikDhabal'
created_at: 2023-09-14T00:00:00.000Z
updated_at: 2023-09-14T00:00:00.000Z
head_image: /quasar_capgo.webp
head_image_alt: Quasar 및 Capgo 일러스트레이션
keywords: >-
  Quasar, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: ko
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

이 튜토리얼에서는 [Quasar](https://quasardev/)를 사용하여 새로운 웹 앱을 만드는 것으로 시작하겠습니다. 이후에 Capacitor를 사용하여 모바일 앱으로 전환하는 방법을 배우게 됩니다.

Capacitor를 사용하면 React Native와 같은 완전히 새로운 앱 개발 방식을 배우거나 복잡한 작업을 할 필요 없이 Quasar 웹 앱을 모바일 앱으로 변환할 수 있습니다.

이 튜토리얼은 새로운 Quasar 앱으로 시작하여 Capacitor를 통합하여 네이티브 모바일 앱 영역으로 진입하는 과정을 안내합니다. 또한 [Capgo](https://capgoapp/)를 사용하여 몇 초 만에 앱에 실시간 업데이트를 전송할 수 있습니다.

## Capacitor 소개

CapacitorJS는 정말 게임 체인저입니다! 어떤 웹 프로젝트에도 쉽게 통합할 수 있으며, 애플리케이션을 네이티브 웹뷰로 래핑하여 Xcode와 Android Studio 프로젝트를 자동으로 생성합니다. 또한 플러그인을 통해 JS 브리지를 통해 카메라와 같은 네이티브 기기 기능에 접근할 수 있습니다.

Capacitor를 사용하면 복잡한 설정이나 가파른 학습 곡선 없이 훌륭한 네이티브 모바일 앱을 얻을 수 있습니다. 간단한 API와 간소화된 기능을 통해 프로젝트에 쉽게 통합할 수 있습니다. Capacitor로 완전히 기능하는 네이티브 앱을 얼마나 쉽게 만들 수 있는지 놀라실 겁니다!

## Quasar 앱 준비하기

새로운 Quasar 앱을 만들기 위해 다음 명령어를 실행하세요:

[[CODE_BLOCK]]

![Quasar Project Setup](/quasar-setupwebp)

"App with Quasar CLI" 옵션을 선택한 다음 "Quasar v2"를 선택하세요.

네이티브 모바일 앱을 만들기 위해서는 프로젝트의 **export**가 필요합니다. 따라서 Quasar 프로젝트를 빌드하고 복사하는데 사용할 수 있는 간단한 스크립트를 **packagejson**에 포함시켜 보겠습니다:

[[CODE_BLOCK]]

`generate` 명령어를 실행한 후에는 프로젝트 루트에서 새로운 `dist` 폴더를 확인할 수 있어야 합니다.

이 폴더는 나중에 Capacitor에서 사용되지만, 지금은 올바르게 설정해야 합니다.

## Quasar 앱에 Capacitor 추가하기

웹 앱을 네이티브 모바일 컨테이너로 패키징하기 위해서는 몇 가지 초기 단계를 따라야 하지만, 이후에는 단순히 `sync` 명령어를 실행하는 것만큼 간단합니다.

먼저 [Capacitor CLI](https://capacitorjscom/docs/cli/)를 개발 의존성으로 설치하고 프로젝트 내에서 설정할 수 있습니다. 설정 중에 이름과 번들 ID에 대해 기본값을 수락하려면 "enter"를 누르면 됩니다.

다음으로 코어 패키지와 iOS 및 Android 플랫폼용 관련 패키지를 설치해야 합니다.

마지막으로 플랫폼을 추가할 수 있으며, Capacitor는 프로젝트 루트에 각 플랫폼용 폴더를 생성합니다:

[[CODE_BLOCK]]

![Initialize Capacitor](/capacitor-initwebp)

이제 Quasar 프로젝트에서 새로운 **ios**와 **android** 폴더를 확인할 수 있어야 합니다.

**이것들은 실제 네이티브 프로젝트입니다!**

나중에 Android 프로젝트에 접근하려면 [Android Studio](https://developerandroidcom/studio/)를 설치해야 합니다. iOS의 경우 Mac이 필요하며 [Xcode](https://developerapplecom/xcode/)를 설치해야 합니다.

또한 프로젝트에서 **capacitorconfigts** 파일을 찾을 수 있어야 하는데, 이 파일에는 동기화 중에 사용되는 기본적인 Capacitor 설정이 포함되어 있습니다. 주의해야 할 유일한 것은 **webDir**인데, 이는 빌드 명령어의 결과를 가리켜야 합니다. 현재는 부정확합니다.

이를 수정하기 위해 **capacitorconfigjson** 파일을 열고 **webDir**을 업데이트하세요:

[[CODE_BLOCK]]

다음 명령어를 실행하여 시도해볼 수 있습니다:

[[CODE_BLOCK]]

첫 번째 명령어 `npm run generate`는 단순히 Quasar 프로젝트를 빌드하고 정적 빌드를 복사하며, 두 번째 명령어 `npx cap sync`는 모든 웹 코드를 네이티브 플랫폼의 올바른 위치에 동기화하여 앱에서 표시될 수 있도록 합니다.

또한 sync 명령어는 네이티브 플랫폼을 업데이트하고 플러그인을 설치할 수 있으므로, 새로운 [Capacitor 플러그인](https://capacitorjscom/docs/plugins/)을 설치할 때 `npx cap sync`를 다시 실행해야 합니다.이제 알게 모르게 앱을 개발해냈으니, 실제 디바이스에서 확인해봅시다!

## 네이티브 앱 빌드 및 배포

iOS 앱을 개발하려면 **Xcode**가 설치되어 있어야 하고, Android 앱의 경우 **Android Studio**가 설치되어 있어야 합니다. 또한 앱스토어에 배포하려면 iOS의 경우 Apple Developer Program에, Android의 경우 Google Play Console에 등록해야 합니다.

네이티브 모바일 개발이 처음이시라면, Capacitor CLI를 사용하여 두 네이티브 프로젝트를 쉽게 열 수 있습니다:

[[CODE_BLOCK]]

네이티브 프로젝트 설정이 완료되면 연결된 디바이스에 앱을 배포하는 것은 쉽습니다. Android Studio에서는 모든 것이 준비될 때까지 기다리기만 하면 설정 변경 없이 연결된 디바이스에 앱을 배포할 수 있습니다. 예시입니다:

![android-studio-run](/android-studio-runwebp)

Xcode에서는 시뮬레이터가 아닌 실제 디바이스에 앱을 배포하기 위해 서명 계정을 설정해야 합니다. 처음 하시는 경우 Xcode가 과정을 안내해 줄 것입니다(단, Developer Program에 등록되어 있어야 합니다). 그 후에는 상단에서 연결된 디바이스를 선택하고 실행 버튼만 누르면 됩니다. 예시입니다:

![xcode-run](/xcode-runwebp)

축하합니다! Quasar 웹 앱을 모바일 디바이스에 성공적으로 배포했습니다. 예시입니다:

[[HTML_TAG]]
  [[HTML_TAG]]
[[HTML_TAG]]

하지만 개발 중에는 더 빠른 방법이 있습니다.

## Capgo 실시간 업데이트

Capgo 실시간 업데이트는 개발자가 전통적인 앱스토어 제출 과정 없이 모바일 앱을 업데이트할 수 있게 해주는 서비스입니다. 앱스토어 검토 과정을 기다리지 않고도 버그를 빠르게 수정하거나 작은 업데이트를 할 수 있는 편리한 방법입니다.

Quasar 앱에 Capgo를 통합하는 것은 실시간 업데이트의 힘을 활용할 수 있게 해주는 간단한 과정입니다. 이 단계별 가이드를 통해 Capgo 실시간 업데이트의 통합과 구현 과정을 안내해드리겠습니다.

**Capgo 대시보드 가입 및 접근**:

가입하고 첫 버전을 업로드하기 위한 API 키를 받을 시간입니다! [Capgo 계정에 가입](https://web.capgo.app/register/)하는 것부터 시작하세요.

**Capgo SDK 설치**:

Capacitor 앱의 루트 디렉토리에서 다음 명령어를 실행하세요:

`npm i @capgo/capacitor-updater && npx cap sync` Capacitor 앱에 플러그인을 설치합니다.

그리고 CodePush 대신 다음 코드를 앱에 추가하세요:

[[CODE_BLOCK]]

이는 네이티브 플러그인에 설치가 성공했음을 알립니다.

**Capgo CLOUD 로그인**:

먼저, 계정에 있는 `all` [apikey](https://web.capgo.app/dashboard/apikeys/)를 사용하여 CLI로 로그인하세요:

    `npx @capgo/cli@latest login YOU_KEY`

**첫 앱 추가하기**:

CLI로 Capgo Cloud에 앱을 생성하는 것부터 시작하겠습니다.

[[CODE_BLOCK]]
이 명령어는 Capacitor 설정 파일에 정의된 모든 변수를 사용하여 앱을 생성합니다.

**첫 버전 업로드하기**:

다음 명령어로 코드를 빌드하고 Capgo에 전송하세요:

[[CODE_BLOCK]]

기본적으로 버전 이름은 package.json 파일의 버전이 됩니다.

[Capgo](https://web.capgo.app/login/)에서 빌드가 있는지 확인하세요.

제 [모바일 샌드박스 앱](https://capgo.app/app_mobile/)으로 테스트해볼 수도 있습니다.

**채널을 기본값으로 설정하기**:

앱을 Capgo에 전송한 후, 앱이 Capgo에서 업데이트를 받을 수 있도록 채널을 기본값으로 설정해야 합니다.

`npx @capgo/cli@latest channel set production -s default`

**업데이트 검증을 위한 앱 설정**:

메인 JavaScript 파일에 이 설정을 추가하세요.

[[CODE_BLOCK]]

그리고 `npm run build && npx cap copy`를 실행하여 앱을 업데이트하세요.

**실시간 업데이트 받기**:

Deploy에서 실시간 업데이트를 받으려면 디바이스나 에뮬레이터에서 앱을 실행해야 합니다. 컴퓨터에 연결된 에뮬레이터나 디바이스에서 로컬 앱을 실행하는 가장 쉬운 방법은 다음 명령어를 사용하는 것입니다.