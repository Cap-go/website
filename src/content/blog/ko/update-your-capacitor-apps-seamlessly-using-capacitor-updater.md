---
slug: update-your-capacitor-apps-seamlessly-using-capacitor-updater
title: Capacitor-updater를 사용하여 Capacitor 앱을 원활하게 업데이트하기
description: >-
  Capacitor Ionic 커뮤니티 여러분, 안녕하세요. 오늘은 여러분의 앱에 Capacitor-updater를 설정하는 것을
  도와드리겠습니다. 이를 통해 원활한 릴리스를 할 수 있습니다.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-02-27T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /update_flow.webp
head_image_alt: Capacitor 개발자를 위한 대안 검색
keywords: >-
  Capacitor, mobile app development, live updates, OTA updates, continuous
  integration, mobile app updates
tag: Tutorial
published: true
locale: ko
next_blog: ''
---

## Capacitor-updater란 무엇인가?

Capacitor-updater는 앱 업데이트와 개선사항을 최종 사용자에게 즉시 전달하는 것을 도와주는 기술입니다

특히 중요한 버그 수정을 하고 App Store 심사 과정 없이 즉시 전달하고 싶을 때 매우 유용합니다

사용 가능한 업데이트를 즉시 사이드로딩할 수 있는 "웹과 같은" 민첩성을 가진 것으로 생각할 수 있습니다

또한 새로운 업데이트가 앱을 중단시키는 경우 롤백을 제공합니다

## 어떻게 작동하나요?

Capgo는 앱의 JavaScript 번들을 Capgo 서버와 동기화 상태로 유지하며, 사용자가 앱을 열 때마다 Capgo 서버에서 번들에 대한 새로운 업데이트가 있는지 확인합니다. 물론 사용자 경험을 미세 조정하는 데 도움이 되는 수많은 멋진 구성이 함께 제공됩니다

저는 제가 만드는 모든 프로젝트에서 Capgo를 사용합니다. 이를 통해 App Store 검토 프로세스에 소요되는 시간을 줄일 수 있습니다

자세한 내용은 [여기](https://capgo.app/)에서 확인할 수 있습니다

## 제한 사항이 있나요?

좋아 보이지만, 우리가 명심해야 할 몇 가지 사항이 있습니다
첫 번째는 OTA 업데이트가 __웹 번들에서만 작동한다는 것입니다__ 
Capacitor JS에서는 거의 모든 코드를 JS, CSS, HTML로 작성하기 때문에 이것이 큰 제한은 아니라고 생각할 수 있습니다
이것이 사실일 수 있지만, 앱에 설치하는 네이티브 모듈도 여전히 있습니다
모듈이 android나 iOS 디렉토리를 변경하는 경우 OTA를 사용하여 앱을 업데이트할 수 없습니다
이는 이러한 디렉토리의 내용이 OTA가 업데이트할 수 없는 네이티브 바이너리를 컴파일하는 데 사용되기 때문입니다
네이티브 앱조차도 이 부분을 업데이트할 수 없습니다

하지만 CI/CD를 설정하여 이 부분을 처리할 수 있습니다. [여기 IOS용](https://capgo.app/blog/automatic-capacitor-android-build-github-action/)에서 이를 수행하는 방법에 대한 튜토리얼을 만들었습니다

## 자동 Capgo 구성

가입하고 첫 번째 버전을 업로드하기 위한 API 키를 받을 시간입니다! [Capgo 계정에 가입](/register/)하는 것으로 시작하세요

Capgo에 로그인하면 온보딩 페이지가 표시됩니다 

![온보딩 페이지](/onboarding_1_new.webp)

온보딩 페이지의 단계를 따라 첫 번째 앱을 추가하세요

### CLI 가이드 따르기

명령줄에서 Capacitor 앱의 루트 디렉토리에서 직접 실행하세요:

`npx @capgo/cli@latest init`
Capgo를 Capacitor 앱에 설치하기 위해 CLI가 Capgo로 앱을 설정하는 과정을 안내할 것입니다

수동으로 하고 싶다면 아래 단계를 따르세요

## 수동 Capgo 구성

### 플러그인 설치

앱에 다음 코드가 추가되어야 합니다:

`npm i @capgo/capacitor-updater && npx cap sync`
Capacitor 앱에 플러그인을 설치하기 위해

그리고 JS 번들이 정상이라는 것을 네이티브 플러그인에 알리기 위해 앱에 이 코드를 추가하세요 (이를 하지 않으면 네이티브 플러그인이 이전 버전으로 롤백됩니다):

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

이는 네이티브 플러그인에 설치가 성공했음을 알립니다

그런 다음 `npm run build && npx cap copy`를 실행하여 앱을 업데이트하세요

### Capgo CLOUD에 로그인

먼저 계정에 있는 `all` [apikey](https://webcapgo.app/dashboard/apikeys/)를 사용하여 CLI로 로그인하세요:

`npx @capgo/cli@latest login YOU_KEY`

### 첫 번째 앱 추가

CLI로 Capgo Cloud에 앱을 생성하는 것부터 시작하겠습니다

`npx @capgo/cli@latest app add`

이 명령은 Capacitor 구성 파일에 정의된 모든 변수를 사용하여 앱을 생성합니다

### 첫 번째 버전 업로드

코드를 빌드하고 Capgo로 보내는 명령을 실행하세요:
`npx @capgo/cli@latest bundle upload`

기본적으로 버전 이름은 `packagejson` 파일의 버전이 됩니다

[Capgo](https://webcapgo.app/)에서 빌드가 있는지 확인하세요

내 [모바일 샌드박스 앱](https://capgo.app/app_mobile/)으로 테스트할 수도 있습니다

### 채널을 기본값으로 설정

앱을 Capgo로 보낸 후에는 앱이 Capgo에서 업데이트를 받을 수 있도록 채널을 `default`로 설정해야 합니다

`npx @capgo/cli@latest channel set production -s default`

## 디바이스에서 실시간 업데이트 받기

Deploy에서 실시간 업데이트를 받으려면 디바이스나 에뮬레이터에서 앱을 실행해야 합니다에뮬레이터나 컴퓨터에 연결된 기기에서 로컬 앱을 실행하는 가장 쉬운 방법은 다음 명령어를 사용하는 것입니다

    npx cap run [ios | android]

앱을 열고 백그라운드로 전환한 다음 다시 열면 로그에서 앱이 업데이트된 것을 확인할 수 있습니다

축하합니다! 🎉 첫 번째 Live Update 배포에 성공하셨습니다. 이것은 Live Updates로 할 수 있는 것들의 시작일 뿐입니다. 자세한 내용은 [Live Updates 문서](/docs/plugin/cloud-mode/getting-started/)를 참조하세요

> 로컬에서 업데이트 수신을 중지해야 하는 경우 다음 명령어를 실행하세요
`npx @capgo/cli@latest channel set`