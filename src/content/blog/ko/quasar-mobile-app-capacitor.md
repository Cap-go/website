---
slug: live-update-with-quasar-and-capacitor
title: '실시간 업데이트, Quasar 및 Capacitor를 사용한 모바일 앱 개발.'
description: Quasar와 Capacitor를 사용하여 모바일 앱을 만들고 라이브 업데이트를 구현하는 방법.
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikDhabal'
created_at: 2023-09-14T00:00:00.000Z
updated_at: 2023-09-14T00:00:00.000Z
head_image: /quasar_capgo.webp
head_image_alt: Quasar 및 Capgo 설명
keywords: >-
  Quasar, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: ko
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
이 튜토리얼에서는 [Quasar](https://quasar.dev/)를 사용하여 새로운 웹 앱을 만드는 것으로 시작하겠습니다. 이후에는 이를 Capacitor를 사용하여 모바일 앱으로 전환하는 방법을 배우겠습니다. 모바일에서 앱을 더 멋지게 보이게 하고 싶다면요.

Capacitor를 사용하면 Quasar 웹 앱을 많은 복잡한 작업 없이 혹은 React Native와 같은 완전히 새로운 앱 제작 방식을 배우지 않고도 모바일 앱으로 전환할 수 있습니다.

이 튜토리얼은 새로운 Quasar 앱으로 시작하여 Capacitor를 통합하여 네이티브 모바일 앱의 영역으로 이동하는 과정을 안내합니다. 추가로, [Capgo](https://capgo.app/)를 사용하여 몇 초 안에 앱에 실시간 업데이트를 전송할 것입니다.

## Capacitor에 대해

CapacitorJS는 정말 게임 체인저입니다! 웹 프로젝트에 손쉽게 통합할 수 있으며, 애플리케이션을 네이티브 웹뷰로 감싸고, 네이티브 Xcode 및 Android Studio 프로젝트를 생성해줍니다. 또한, 플러그인을 통해 카메라와 같은 네이티브 장치 기능에 JS 브리지를 통해 접근할 수 있습니다.

Capacitor를 사용하면 복잡한 설정이나 가파른 학습 곡선 없이 환상적인 네이티브 모바일 앱을 얻을 수 있습니다. 그 슬림한 API와 간소화된 기능은 프로젝트에 통합하기 쉽게 만듭니다. 믿으세요, Capacitor로 완전한 기능을 갖춘 네이티브 앱을 만드는 것이 얼마나 쉬운지에 놀랄 것입니다!

## Quasar 앱 준비하기

새로운 Quasar 앱을 만들려면 다음 명령을 실행하세요:

```shell
npm init quasar
```

![Quasar 프로젝트 설정](/quasar-setup.webp)

"Quasar CLI를 이용한 앱" 옵션을 선택한 다음 "Quasar v2"를 선택하세요.

네이티브 모바일 앱을 만들기 위해서는 프로젝트의 **export**가 필요합니다. 따라서, Quasar 프로젝트를 빌드하고 복사하는 데 사용할 수 있는 간단한 스크립트를 **package.json**에 포함시켜 보겠습니다:

```json
{
  "scripts": {
    // ...
    "build": "quasar build"
  }
}
```

`generate` 명령을 실행한 후, 프로젝트 루트에 새로운 `dist` 폴더가 생긴 것을 확인할 수 있어야 합니다.

이 폴더는 나중에 Capacitor에서 사용되겠지만, 지금은 올바르게 설정해야 합니다.

## Quasar 앱에 Capacitor 추가하기

모든 웹 앱을 네이티브 모바일 컨테이너로 패키징하려면 몇 가지 초기 단계를 따라야 하지만, 이후에는 단일 `sync` 명령을 실행하는 것으로 간단히 할 수 있습니다.

먼저, [Capacitor CLI](https://capacitorjs.com/docs/cli/)를 개발 종속성으로 설치한 후 프로젝트 내에서 설정합니다. 설정 중에 이름과 번들 ID에 대한 기본값을 수락하기 위해 "enter"를 눌러주세요.

다음으로, iOS 및 Android 플랫폼에 대한 핵심 패키지와 관련 패키지를 설치해야 합니다.

마지막으로 플랫폼을 추가하면 Capacitor가 프로젝트의 루트에 각 플랫폼에 대한 폴더를 생성합니다:

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your Quasar project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

![Capacitor 초기화](/capacitor-init.webp)

이 시점에서 Quasar 프로젝트에 새로운 **ios** 및 **android** 폴더가 표시되어야 합니다.

**이것들은 실제 네이티브 프로젝트입니다!**

나중에 Android 프로젝트에 접근하려면 [Android Studio](https://developer.android.com/studio/)를 설치해야 합니다. iOS의 경우 Mac이 필요하며 [Xcode](https://developer.apple.com/xcode/)를 설치해야 합니다.

또한, 귀하의 프로젝트에는 **capacitor.config.ts** 파일이 있어야 하며, 이는 동기화 과정 중 사용되는 기본 Capacitor 설정을 포함합니다. 주의해야 할 유일한 사항은 **webDir**로, 이는 빌드 명령의 결과를 가리켜야 합니다. 현재로서는 부정확합니다.

이를 수정하기 위해 **capacitor.config.json** 파일을 열고 **webDir**를 업데이트하세요:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "dist"
}
```

다음 명령어를 실행하여 시험해 보세요:

```shell
npm run generate
npx cap sync
```

첫 번째 명령인 `npm run generate`는 단순히 Quasar 프로젝트를 빌드하고 정적 빌드를 복사하며 두 번째 명령인 `npx cap sync`는 모든 웹 코드를 네이티브 플랫폼의 올바른 위치로 동기화하여 앱에서 표시될 수 있도록 합니다.

또한, 동기화 명령은 네이티브 플랫폼을 업데이트하고 플러그인을 설치할 수 있으므로 새로운 [Capacitor 플러그인](https://capacitorjs.com/docs/plugins/)을 설치할 때 다시 `npx cap sync`를 실행해야 합니다.

모르는 사이에 실제로는 완료되었습니다. 이제 장치에서 앱을 봅시다!

## 네이티브 앱 빌드 및 배포

iOS 앱을 개발하려면 **Xcode**가 설치되어 있어야 하고 Android 앱을 개발하려면 **Android Studio**가 설치되어 있어야 합니다. 또한, 앱을 앱 스토어에서 배포할 계획이라면 iOS의 경우 Apple 개발자 프로그램에 등록하고 Android의 경우 Google 플레이 콘솔에 가입해야 합니다.

네이티브 모바일 개발이 처음이라면 Capacitor CLI를 사용하여 두 네이티브 프로젝트를 쉽게 열 수 있습니다:

```shell
npx cap open ios
npx cap open android
```

네이티브 프로젝트를 설정한 후에는 연결된 장치에 앱을 배포하기가 쉽습니다. Android Studio에서는 모든 것이 준비될 때까지 기다리면 되며 설정을 변경하지 않고도 연결된 장치에 앱을 배포할 수 있습니다. 예를 들어:

![android-studio-run](/android-studio-run.webp)

Xcode에서는 실제 장치에 앱을 배포하기 위해 서명 계정을 설정해야 합니다. 시뮬레이터가 아닌 실제 장치로 배포하기 위해서입니다. 이 작업을 이전에 한 적이 없다면 Xcode가 프로세스를 안내해줍니다(하지만 여전히, 개발자 프로그램에 등록해야 합니다). 그 후, 단순히 재생 버튼을 눌러서 연결된 장치에서 앱을 실행하면 됩니다. 선택할 수 있는 예는 다음과 같습니다:

![xcode-run](/xcode-run.webp)

축하합니다! Quasar 웹 앱을 모바일 장치에 성공적으로 배포했습니다. 예시는 다음과 같습니다:

<div class="mx-auto" style="width: 50%;">
  <img src="/Quasar-mobile.webp" alt="quasar-mobile-app">
</div>

하지만 잠깐, 개발 중에 이것을 더 빠르게 할 수 있는 방법도 있습니다...

## Capgo 라이브 업데이트

Capgo 라이브 업데이트는 개발자가 전통적인 앱 스토어 제출 프로세스 없이 모바일 앱에 업데이트를 배포할 수 있도록 허용하는 서비스입니다. 이것은 버그를 빠르게 수정하거나 앱에 소규모 업데이트를 진행하기 위한 편리한 방법이 될 수 있습니다. 

Quasar 앱에 Capgo를 통합하는 것은 실시간 라이브 업데이트의 힘을 활용할 수 있게 해주는 간단한 과정입니다. 이 단계별 가이드는 Capgo 라이브 업데이트의 통합 및 구현 과정을 안내하여 원활한 업데이트를 제공할 수 있도록 합니다.

**가입 및 Capgo 대시보드에 접근하기**:

이제 가입하고 첫 번째 버전을 업로드할 API 키를 얻을 때입니다! [Capgo 계정 가입](https://web.capgo.app/register/)을 시작하세요.

**Capgo SDK 설치**:

명령 줄에서 Capacitor 앱의 루트로 직접 이동하여 다음을 실행하세요:

`npm i @capgo/capacitor-updater && npx cap sync` 이 명령은 Capacitor 앱에 플러그인을 설치합니다.

그런 다음, 이 코드를 CodePush 대신에 앱에 추가하세요:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

이것은 네이티브 플러그인에 설치가 성공적으로 이루어졌음을 알려줍니다.

**Capgo CLOUD에 로그인**:

먼저 계정에 있는 `all` [apikey](https://web.capgo.app/dashboard/apikeys/)를 사용하여 CLI로 로그인합니다:

    `npx @capgo/cli@latest login YOU_KEY`

**첫 번째 앱 추가하기**:

CLI로 Capgo Cloud에서 앱을 먼저 만들어 시작해 보겠습니다.

```shell
    npx @capgo/cli@latest app add
```
이 명령은 Capacitor 구성 파일에서 정의된 모든 변수를 사용하여 앱을 생성합니다.

**첫 번째 버전 업로드하기**:

코드를 빌드하고 Capgo에 보내기 위해 다음 명령을 실행하세요: 

```shell
npx @capgo/cli@latest bundle upload`
```

기본적으로 버전 이름은 **package.json** 파일의 것이 될 것입니다.

Capgo에서 빌드가 있는지 확인하세요: [Capgo](https://web.capgo.app/login/)에 확인해 볼 수 있습니다.

제 [모바일 샌드박스 앱](https://capgo.app/app_mobile/)으로 테스트해 볼 수도 있습니다.

**채널 기본값 설정**:

앱을 Capgo에 보낸 후, 앱이 Capgo로부터 업데이트를 받을 수 있도록 채널 기본값을 설정해야 합니다.

`npx @capgo/cli@latest channel set production -s default`

**업데이트를 확인하기 위해 앱 구성**:

다음 구성을 메인 JavaScript 파일에 추가하세요.

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

그런 다음 `npm run build && npx cap copy`를 실행하여 앱을 업데이트하세요.

**라이브 업데이트 수신하기**:

애플리케이션이 배포로부터 라이브 업데이트를 받으려면 장치 또는 에뮬레이터에서 앱을 실행해야 합니다. 가장 쉽게 하는 방법은 다음 명령어를 사용하여 로컬 앱을 에뮬레이터 또는 컴퓨터에 연결된 장치에서 실행하는 것입니다.

      npx cap run [ios | android]

앱을 열고 백그라운드로 두었다가 다시 열면 앱이 업데이트되었음을 로그에서 확인할 수 있습니다.

축하합니다! 🎉 첫 번째 라이브 업데이트를 성공적으로 배포했습니다. 이는 라이브 업데이트로 할 수 있는 일의 시작일 뿐입니다. 더 알아보려면 전체 [라이브 업데이트 문서](https://capgo.app/docs/plugin/cloud-mode/getting-started/)를 참조하세요.

## Capacitor 플러그인 사용하기

Capacitor 플러그인을 작동하는 모습으로 사용해 보겠습니다. 이를 위해 상대적으로 간단한 플러그인을 설치해 보겠습니다:

```shell
npm i @capacitor/share
```

[Share 플러그인](https://capacitorjs.com/docs/apis/share/)은 특별한 점은 없지만, 그래도 네이티브 공유 다이얼로그를 호출합니다! 이를 위해 우리는 패키지를 가져오고 앱에서 해당 `share()` 함수를 호출하면 됩니다. 따라서 **pages/index.vue**를 다음과 같이 변경해 보겠습니다:

```html
<template>
  <div>
    <h1>Welcome to Quasar and Capacitor!</h1>
    <button @click="share">Share now!</button>
  </div>
</template>

<script setup lang="ts">
import { Share } from '@capacitor/share';

async function share() {
  await Share.share({
    title: 'Open Youtube',
    text: 'Check new video on youtube',
    url: 'https://www.youtube.com',
    dialogTitle: 'Share with friends'
  });
}
</script>
```

앞서 언급했듯이, 새로운 플러그인을 설치할 때는 동기화 작업을 수행하고 앱을 장치에 다시 배포해야 합니다. 이를 위해 다음 명령어를 실행하세요:

```
npx cap sync
```

버튼을 클릭하면 아름다운 네이티브 공유 다이얼로그를 보는 것을 경험할 수 있습니다!

## 선택적으로 Konsta UI 추가하기

Quasar 앱에서 Konsta UI를 사용하려면 [tailwind를 이미 설치](https://tailwindcss.com/docs/installation/)하고 패키지를 설치해야 합니다:

```shell
npm i konsta
```

또한, `tailwind.config.js` 파일을 수정해야 합니다:

```javascript
// import konstaConfig config
const konstaConfig = require('konsta/config')

// wrap config with konstaConfig config
module.exports = konstaConfig({
  content: [
    './pages/**/*.{vue}',
    './components/**/*.{vue}',
  ],
  darkMode: 'media', // or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
})
```

`konstaConfig`는 Konsta UI에 필요한 추가 변형 및 유틸리티 도우미로 기본(또는 사용자 정의) Tailwind CSS 구성을 확장합니다.

이제 전역 매개변수를 설정할 수 있도록 메인 [App](https://konstaui.com/vue/app/) 구성 요소를 설정해야 합니다.

앱 전체를 `pages/_app.vue`의 `App`으로 감싸야 합니다:

```html
<template>
  <App theme="ios">
    <Quasar />
  </App>
</template>

<script setup>
import { App } from 'konsta/vue';
</script>
```

### 예시 페이지

모든 것이 설정되었으므로 Quasar 페이지에서 Konsta UI Vue 구성 요소를 사용할 수 있습니다.

예를 들어, `pages/index.vue`를 열어 다음과 같이 변경해 보겠습니다:

[[코드 블록]]

필요한 모든 구성 요소를 설치한 후 라이브 리로드가 동기화되지 않으면 모든 것을 다시 시작해 보세요. 그렇게 하면 Quasar와 Capacitor로 구축된 다소 네이티브한 모양의 모바일 앱을 볼 수 있어야 합니다!

## 결론

Capacitor는 기존 웹 프로젝트를 기반으로 네이티브 애플리케이션을 구축하기 위한 훌륭한 선택으로, 코드를 공유하고 일관된 UI를 유지하는 간단한 방법을 제공합니다.

또한 [Capgo](https://capgo.app/)를 추가하면 앱에 라이브 업데이트를 추가하는 것이 훨씬 쉬워져 사용자들이 항상 최신 기능과 버그 수정을 이용할 수 있습니다.

Next.js 앱에 Capgo를 추가하는 방법을 배우고 싶다면 다음 기사를 확인해 보세요:
