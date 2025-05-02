---
slug: vue-모바일-앱-capacitor
title: Vue와 Capacitor로 모바일 앱 만들기
description: 'Vue, Capacitor, 그리고 선택적으로 Konsta UI로 UI를 개선하여 모바일 앱을 만드는 방법을 알아보세요.'
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-08T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /vue_capacitor.webp
head_image_alt: Vue와 Capacitor 일러스트레이션
keywords: >-
  Vue, Capacitor, mobile app development, live updates, OTA updates, continuous
  integration, mobile app updates
tag: Tutorial
published: true
locale: ko
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
original_slug: vue-mobile-app-capacitor
---
이 튜토리얼에서는 Capacitor를 사용하여 Vue 웹 애플리케이션을 네이티브 모바일 앱으로 변환하는 과정을 안내합니다. 선택적으로 Tailwind CSS 기반 모바일 UI 라이브러리인 Konsta UI를 사용하여 모바일 UI를 향상시킬 수 있습니다.

## Capacitor 소개

Capacitor는 모든 웹 프로젝트에 쉽게 통합하여 애플리케이션을 네이티브 모바일 앱으로 변환할 수 있게 해주는 혁신적인 도구입니다. Xcode와 Android Studio 프로젝트를 자동으로 생성하고 JavaScript 브리지를 통해 카메라와 같은 네이티브 기기 기능에 접근할 수 있게 해줍니다.

## Vue 앱 준비하기

먼저, 다음 명령어를 실행하여 새로운 Vue 앱을 생성합니다:

```shell
vue create my-app
cd my-app
npm install
```

Vue 앱을 네이티브 모바일 배포를 위해 준비하려면 프로젝트를 내보내야 합니다. **package.json** 파일에 Vue 프로젝트를 빌드하고 복사하는 스크립트를 추가하세요:

```json
{
  "scripts": {
    // ...
    "build": "vue-cli-service build"
  }
}
```

`build` 명령어를 실행한 후, 프로젝트 루트 디렉토리에 새로운 `dist` 폴더가 생성됩니다. 이 폴더는 나중에 Capacitor에서 사용됩니다.

## Vue 앱에 Capacitor 추가하기

Vue 웹 앱을 네이티브 모바일 컨테이너로 변환하려면 다음 단계를 따르세요:

1. Capacitor CLI를 개발 의존성으로 설치하고 프로젝트에 설정합니다. 설정 중 이름과 번들 ID에 대해 기본값을 수락하세요.

2. 코어 패키지와 iOS 및 Android 플랫폼을 위한 관련 패키지를 설치하세요.

3. 플랫폼을 추가하면 Capacitor가 프로젝트 루트에 각 플랫폼용 폴더를 생성합니다:

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your Vue project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

이제 Vue 프로젝트에 새로운 **iOS**와 **android** 폴더가 생성됩니다.

**capacitor.config.json** 파일을 업데이트하여 **webDir**이 빌드 명령어의 결과를 가리키도록 설정하세요:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "dist"
}
```

이제 Vue 프로젝트를 빌드하고 Capacitor와 동기화할 수 있습니다:

```shell
npm run build
npx cap sync
```

## 네이티브 앱 빌드 및 배포

iOS 앱 개발을 위해서는 Xcode가, Android 앱 개발을 위해서는 Android Studio가 필요합니다. 또한 앱 스토어에 앱을 배포하려면 Apple Developer Program과 Google Play Console에 등록해야 합니다.

Capacitor CLI를 사용하여 두 네이티브 프로젝트를 엽니다:

```shell
npx cap open ios
npx cap open android
```

Android Studio 또는 Xcode를 사용하여 연결된 기기에 앱을 배포하세요.

## Capacitor 실시간 리로드

모바일 기기에서 Capacitor 앱이 네트워크의 특정 URL에서 콘텐츠를 로드하도록 하여 실시간 리로드를 활성화하세요.

로컬 IP 주소를 찾아 `capacitor.config.ts` 파일을 올바른 IP와 포트로 업데이트하세요:

```javascript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.x.xx:8080',
    cleartext: true
  }
};

export default config;
```

이러한 변경사항을 네이티브 프로젝트에 적용하세요:

```shell
npx cap copy
```

이제 Vue 앱을 업데이트하면 앱이 자동으로 리로드되어 변경사항이 표시됩니다.

## Capacitor 플러그인 사용하기

Share 플러그인과 같은 Capacitor 플러그인을 설치하고 Vue 앱에서 사용하세요:

```shell
npm i @capacitor/share
```

패키지를 임포트하고 앱에서 `share()` 함수를 호출하세요:

```html
<template>
  <div>
    <h1>Welcome to Vue and Capacitor!</h1>
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

새로운 플러그인을 설치한 후, `sync` 명령어를 실행하고 앱을 기기에 재배포하세요:

```
npx cap sync
```

## Konsta UI 추가하기

Vue 앱에서 Konsta UI를 사용하려면 [tailwind가 이미 설치](https://tailwindcss.com/docs/guides/vite/#vue)되어 있어야 하며 패키지를 설치해야 합니다:
Vue 앱에서 Konsta UI를 사용하려면 패키지를 설치하고 `tailwind.config.js` 파일을 수정하세요:

```shell
npm i konsta
```

`pages/_app.vue` 파일에서 앱을 `App` 컴포넌트로 감싸고, Vue 페이지에서 Konsta UI Vue 컴포넌트를 사용하세요.

## 결론

Capacitor는 기존 웹 프로젝트를 기반으로 네이티브 애플리케이션을 구축하는데 탁월한 선택입니다. Capgo를 추가하면 앱에 실시간 업데이트를 더욱 쉽게 추가할 수 있어, 사용자가 항상 최신 기능과 버그 수정에 접근할 수 있습니다.

Capgo가 더 나은 앱을 더 빠르게 구축하는 데 어떻게 도움이 되는지 알아보려면, [오늘 무료 계정에 가입](/register/)하세요.
