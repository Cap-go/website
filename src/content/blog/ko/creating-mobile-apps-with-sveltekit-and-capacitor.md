---
slug: sveltekit와-capacitor로-모바일-앱-만들기
title: SvelteKit와 Capacitor로 모바일 앱 만들기
description: 'SvelteKit, Capacitor 및 Konsta UI로 네이티브 UI를 향상시켜 모바일 앱을 구축하는 방법을 알아보세요.'
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-04T00:00:00.000Z
updated_at: 2023-06-04T00:00:00.000Z
head_image: /sveltekit_capacitor.webp
head_image_alt: SvelteKit와 Capgo 일러스트레이션
keywords: >-
  SvelteKit, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: ko
next_blog: updating-your-capacitor-apps-seamlessly-with-capacitor-updater
original_slug: creating-mobile-apps-with-sveltekit-and-capacitor
---
이 튜토리얼에서는 새로운 [SvelteKit](https://kit.svelte.dev/) 앱으로 시작하여 Capacitor를 사용해 네이티브 모바일 개발로 전환하는 방법을 알아보겠습니다. 선택적으로 [Konsta UI](https://konstaui.com/)를 통합하여 Tailwind CSS 모바일 UI를 향상시킬 수도 있습니다.

Capacitor를 사용하면 중요한 수정이나 React Native와 같은 새로운 기술을 배우지 않고도 SvelteKit 웹 애플리케이션을 네이티브 모바일 앱으로 쉽게 변환할 수 있습니다.

이 단계별 가이드를 따라 SvelteKit 앱을 Capacitor를 사용하여 모바일 앱으로 변환하고, 원한다면 Konsta UI로 모바일 UI를 향상시켜 보세요.

## Capacitor 소개

CapacitorJS는 게임 체인저입니다! 어떤 웹 프로젝트에도 쉽게 통합할 수 있으며, 애플리케이션을 네이티브 웹뷰로 래핑하고 Xcode와 Android Studio 프로젝트를 자동으로 생성합니다. 그의 플러그인들은 JavaScript 브리지를 통해 카메라와 같은 네이티브 기기 기능에 접근할 수 있게 해줍니다.

Capacitor를 사용하면 복잡한 설정이나 가파른 학습 곡선 없이도 훌륭한 네이티브 모바일 앱을 만들 수 있습니다. 슬림한 API와 간소화된 기능으로 프로젝트에 쉽게 통합할 수 있습니다. Capacitor로 완전히 기능하는 네이티브 앱을 만드는 것이 얼마나 간단한지 놀라실 것입니다!

## SvelteKit 앱 준비하기

새로운 SvelteKit 앱을 만들려면 다음 명령어를 실행하세요:

```shell
npm create svelte@latest my-app
cd my-app
npm install
npm run build
```

`build` 명령어를 실행한 후, 프로젝트 루트에 새로운 `dist` 폴더가 생성되어야 합니다.

이 폴더는 나중에 Capacitor에서 사용되지만, 지금은 올바르게 설정해야 합니다.

## SvelteKit 앱에 Capacitor 추가하기

웹 앱을 네이티브 모바일 컨테이너로 패키징하기 위해서는 몇 가지 초기 단계를 따라야 합니다. 그 후에는 단일 `sync` 명령어를 실행하는 것만큼 간단합니다.

먼저, [Capacitor CLI](https://capacitorjs.com/docs/cli/)를 개발 의존성으로 설치하고 프로젝트 내에서 설정하세요. 설정 중에 이름과 번들 ID에 대해 기본값을 수락하려면 "enter"를 누르면 됩니다.

그다음, 코어 패키지와 iOS 및 Android 플랫폼을 위한 관련 패키지를 설치하세요.

마지막으로, 플랫폼을 추가하면 Capacitor가 프로젝트 루트에 각 플랫폼용 폴더를 생성합니다:

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your SvelteKit project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

이 시점에서 SvelteKit 프로젝트에 새로운 **ios**와 **android** 폴더가 보여야 합니다.

**이것들은 실제 네이티브 프로젝트입니다!**

나중에 Android 프로젝트에 접근하려면 [Android Studio](https://developer.android.com/studio/)를 설치해야 합니다. iOS의 경우 Mac이 필요하며 [Xcode](https://developer.apple.com/xcode/)를 설치해야 합니다.

또한, 프로젝트에서 **capacitor.config.ts** 파일을 찾을 수 있어야 하는데, 이 파일에는 동기화 중에 사용되는 기본 Capacitor 설정이 포함되어 있습니다. 주의해야 할 유일한 것은 빌드 명령어의 결과를 가리켜야 하는 **webDir**입니다. 현재는 잘못되어 있습니다.

이를 수정하기 위해 **capacitor.config.ts** 파일을 열고 **webDir**을 업데이트하세요:

```ts
import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'build',
}

export default config
```

이제 Capacitor 설정을 업데이트했으니, 적절한 정적 어댑터 패키지를 다운로드하여 Sveltekit 프로젝트를 정적 애플리케이션으로 변경해 보겠습니다:

```shell
npm i -D @sveltejs/adapter-static
```

패키지가 설치된 후, _svelte.config.js_ 파일을 auto-adapter에서 static으로 변경해야 합니다:

```ts
import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/kit/vite'

/** @type {import('@sveltejs/kit').Config} */
const config = {
// Consult https://kit.svelte.dev/docs/integrations#preprocessors
// for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter({
      // default options are shown. On some platforms
      // these options are set automatically — see below
      pages: 'build',
      assets: 'build',
      fallback: null,
      precompress: false,
      strict: true
    })
  }
}

export default config
```

_svelte.config.js_를 업데이트한 후, _src/routes_에 _+layout.js_ 페이지를 만들어 _prerender_ 옵션을 추가하고 다음 내보내기를 _+layout.js_에 추가해야 합니다:

```ts
export const prerender = true
```

_+layout.js_ 페이지를 추가하고 업데이트한 후, 모바일 플랫폼을 추가하고 _build_ 폴더를 생성하기 위해 프로젝트를 다시 빌드해야 합니다.

다음 명령어를 실행하여 수행할 수 있습니다:

```shell
npm run build
npx cap sync
```

첫 번째 명령어 `npm run build`는 SvelteKit 프로젝트를 빌드하고 정적 빌드를 복사하며, 두 번째 명령어 `npx cap sync`는 모든 웹 코드를 네이티브 플랫폼의 올바른 위치에 동기화하여 앱에서 표시될 수 있도록 합니다.

또한, sync 명령어는 네이티브 플랫폼을 업데이트하고 플러그인을 설치할 수 있으므로, 새로운 [Capacitor 플러그인](https://capacitorjs.com/docs/plugins/)을 설치할 때는 `npx cap sync`를 다시 실행해야 합니다.

눈치채지 못했겠지만, 이제 프로세스가 완료되었으니 기기에서 앱을 확인해 보겠습니다!

## 네이티브 앱 빌드 및 배포

iOS 앱을 개발하려면 **Xcode**가 설치되어 있어야 하고, Android 앱의 경우 **Android Studio**가 설치되어 있어야 합니다. 또한, 앱 스토어에 앱을 배포하려면 iOS의 경우 Apple Developer Program에, Android의 경우 Google Play Console에 등록해야 합니다.

네이티브 모바일 개발이 처음이라면 Capacitor CLI를 사용하여 두 네이티브 프로젝트를 쉽게 열 수 있습니다:

```shell
npx cap open ios
npx cap open android
```

네이티브 프로젝트를 설정한 후에는 연결된 기기에 앱을 배포하기가 쉽습니다. Android Studio에서는 모든 것이 준비될 때까지 기다린 후, 설정을 변경하지 않고도 연결된 기기에 앱을 배포할 수 있습니다. 예시:

![android-studio-run](/android-studio-run.webp)

Xcode에서는 시뮬레이터가 아닌 실제 기기에 앱을 배포하기 위해 서명 계정을 설정해야 합니다. 이전에 해본 적이 없다면 Xcode가 프로세스를 안내해줍니다(하지만 Developer Program에 등록되어 있어야 합니다). 그 후에는 상단에서 연결된 기기를 선택하고 실행 버튼을 누르기만 하면 됩니다. 예시:

![xcode-run](/xcode-run.webp)

축하합니다! SvelteKit 웹 앱을 성공적으로 모바일 기기에 배포했습니다. 예시:

<div class="mx-auto" style="width: 50%;">
  <img src="/sveltekit-mobile-app.webp" alt="sveltekit-mobile-app">
</div>

하지만 개발 중에 더 빠른 방법도 있습니다...

## Capacitor 라이브 리로드

이제 모든 현대적인 프레임워크에서 핫 리로드를 사용하는 데 익숙해졌을 것이고, 좋은 소식은 최소한의 노력으로 **모바일 기기에서도** 동일한 기능을 사용할 수 있다는 것입니다!

Capacitor 앱이 특정 URL에서 콘텐츠를 로드하도록 하여 **네트워크에서** 라이브 리로드가 있는 로컬에서 호스팅되는 애플리케이션에 대한 액세스를 활성화하세요.

첫 번째 단계는 로컬 IP 주소를 찾는 것입니다. Mac을 사용하는 경우 터미널에서 다음 명령어를 실행하여 확인할 수 있습니다:

```shell
ipconfig getifaddr en0
```

Windows에서는 다음을 실행하세요:

```shell
ipconfig
```

그런 다음 IPv4 주소를 찾으세요.

`capacitor.config.ts` 파일에 다른 항목을 추가하여 서버에서 직접 앱을 로드하도록 Capacitor에 지시할 수 있습니다:

```javascript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.x.xx:3000',
    cleartext: true
  }
};

export default config;
```

위의 예시와 같이 **올바른 IP와 포트**를 사용해야 합니다.

이제 이러한 변경 사항을 네이티브 프로젝트에 복사하여 적용할 수 있습니다:

```shell
npx cap copy
```

`copy` 명령어는 `sync`와 비슷하지만 네이티브 프로젝트를 업데이트하지 않고 **웹 폴더와 구성에 대한 변경 사항만 복사**합니다.

이제 Android Studio나 Xcode를 통해 앱을 한 번 더 배포할 수 있습니다. 그 후에 Svelte 앱에서 무언가를 변경하면 **앱이 자동으로 다시 로드**되어 변경 사항을 보여줍니다!

**주의하세요** 카메라와 같은 새로운 플러그인을 설치하는 경우에는 여전히 네이티브 프로젝트를 다시 빌드해야 합니다. 이는 네이티브 파일이 변경되어 즉시 수행할 수 없기 때문입니다.

구성에서 올바른 IP와 포트를 사용해야 합니다. 위의 코드 블록은 데모 목적으로 기본 SvelteKit 포트를 보여줍니다.

## Capacitor 플러그인 사용하기

이전에 몇 번 언급했던 Capacitor 플러그인을 실제로 사용하는 방법을 살펴보겠습니다. 다음 명령어를 실행하여 간단한 플러그인을 설치할 수 있습니다:

```shell
npm i @capacitor/share
```

[Share 플러그인](https://capacitorjs.com/docs/apis/share/)은 특별한 것은 없지만, 네이티브 공유 대화상자를 띄워줍니다! 이를 위해 이제 패키지를 가져오고 앱에서 `share()` 함수를 호출하기만 하면 되므로, **src/routes/index.svelte**를 다음과 같이 변경해 보겠습니다:

```html
<script>
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

<h1>Welcome to SvelteKit and Capacitor!</h1>
<button on:click={share}>Share now!</button>
```

앞서 언급했듯이, 새로운 플러그인을 설치할 때는 동기화 작업을 수행하고 앱을 기기에 다시 배포해야 합니다. 이를 위해 다음 명령어를 실행하세요:

```
npx cap sync
```

버튼을 누르면 아름다운 네이티브 공유 대화상자가 작동하는 것을 볼 수 있습니다!

## Konsta UI 추가하기

Nuxt 3 앱에서 Konsta UI를 사용하려면 [tailwind가 이미 설치되어 있어야](https://tailwindcss.com/docs/guides/sveltekit/) 하며 패키지를 설치해야 합니다:

```shell
npm i konsta
```

또한 `tailwind.config.js` 파일을 수정해야 합니다:

```javascript
// import konstaConfig config
const konstaConfig = require('konsta/config')

// wrap config with konstaConfig config
module.exports = konstaConfig({
  content: [
    './src/routes/**/*.{svelte}',
    './src/components/**/*.{svelte}',
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

`konstaConfig`는 기본(또는 사용자 지정) Tailwind CSS 구
