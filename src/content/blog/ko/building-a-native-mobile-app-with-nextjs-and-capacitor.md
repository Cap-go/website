---
slug: building-a-native-mobile-app-with-nextjs-and-capacitor
title: '2025 Next.js 15와 Capacitor로 네이티브 모바일 앱 만들기: 단계별 가이드'
description: >-
  Next.js 15와 Capacitor를 사용하여 네이티브 모바일 앱을 만드는 방법을 알아보세요. 이 종합 가이드에서 최신 모범 사례와
  고성능, 기능이 풍부한 모바일 애플리케이션을 구축하기 위한 기술을 발견할 수 있습니다.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-02-21T00:00:00.000Z
updated_at: 2025-05-12T00:00:00.000Z
head_image: /next_capgo.webp
head_image_alt: Next.js 15 및 Capacitor 일러스트레이션
keywords: >-
  Next.js 15, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: ko
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
## 소개

이 자습서에서는 2024년에 [Next.js](https://nextjs.org/) 15와 [Capacitor](https://capacitorjs.com/)의 강력한 조합을 사용하여 네이티브 모바일 앱을 만드는 방법을 살펴보겠습니다. 이 기술들의 최신 버전을 활용하여 고성능의 기능 풍부한 모바일 애플리케이션을 쉽게 구축할 수 있습니다. 또한, 이 단계는 선택 사항이지만 [Konsta UI](https://konstaui.com/)와 Tailwind CSS를 사용하여 모바일 UI를 향상시키는 방법도 시연할 것입니다.

인기 있는 React 프레임워크인 Next.js는 웹 애플리케이션을 구축하기 위한 안정적인 기반을 제공하며, Capacitor는 Next.js 앱을 크게 수정하지 않고도 네이티브 모바일 앱으로 변환할 수 있게 해줍니다. 이 자습서는 새로운 Next.js 앱을 설정하고 Capacitor를 통합하여 네이티브 모바일 경험을 만드는 과정을 안내합니다.

### Next.js와 Capacitor 사용의 장점

- **코드 재사용성**: Next.js를 사용하면 재사용 가능한 컴포넌트를 작성하고 웹 및 모바일 앱 간에 코드를 공유하여 개발 시간과 노력을 절약할 수 있습니다.
- **성능**: Next.js는 서버 측 렌더링과 코드 스플리팅과 같은 내장 성능 최적화를 제공하여 빠른 로딩 시간과 매끄러운 사용자 경험을 보장합니다.
- **네이티브 기능**: Capacitor는 카메라, 위치 서비스 등과 같은 네이티브 기기 기능에 접근할 수 있게 해주어 기능이 풍부한 모바일 앱을 구축할 수 있도록 합니다.
- **간소화된 개발**: Capacitor를 사용하면 친숙한 웹 기술을 사용하여 모바일 앱을 개발하고 테스트할 수 있어 학습 곡선을 줄이고 개발 과정을 간소화할 수 있습니다.

## Next.js 앱 준비하기

시작하기 위해 `create-next-app` 명령어를 사용하여 새로운 Next.js 애플리케이션을 만들어 보겠습니다.

```shell
npx create-next-app@latest my-app
```

이 명령은 최신 버전에 대한 추천 구성으로 비어 있는 Next.js 프로젝트를 설정합니다.

다음으로, 프로젝트 디렉토리로 이동합니다:

```shell
cd my-app
```

네이티브 모바일 앱을 만들기 위해 Next.js 프로젝트의 정적 내보내기를 생성해야 합니다. `package.json` 파일을 업데이트하여 프로젝트를 빌드하고 내보내는 스크립트를 포함시킵니다:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "static": "NEXT_PUBLIC_IS_MOBILE=true next build"
  }
}
```

`npm run static` 명령을 실행하면 이미지 최적화 호환성 문제로 인해 오류가 발생할 수 있습니다. 이를 해결하기 위해 `next.config.js` 파일을 열고 다음과 같이 수정합니다:

```javascript
/** @type {import('next').NextConfig} */
const isMobile = process.env.NEXT_PUBLIC_IS_MOBILE === 'true';
const nextConfig = {
    ...(isMobile ? {output: 'export'} : {}),
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
```

이제 `npm run static`을 실행하면 문제가 없이 작동해야 하며, 프로젝트의 루트에 새로운 `out` 폴더가 생성됩니다. 이 폴더는 다음 단계에서 Capacitor에 의해 사용됩니다.

## Next.js 15 앱에 Capacitor 추가하기

Next.js 앱을 네이티브 모바일 컨테이너로 패키징하려면 다음 단계를 따르세요:

1. 개발 종속성으로 [Capacitor CLI](https://capacitorjs.com/docs/cli/)를 설치합니다:

```shell
npm install -D @capacitor/cli
```

2. Next.js 프로젝트에서 Capacitor를 초기화합니다:

```shell
npx cap init
```

초기화 과정에서 앱 이름과 번들 ID에 대한 기본 값을 수락하려면 "Enter"를 누르세요.

3. 필요한 Capacitor 패키지를 설치합니다:

```shell
npm install @capacitor/core @capacitor/ios @capacitor/android
```

4. 네이티브 플랫폼을 추가합니다:

```shell
npx cap add ios
npx cap add android
```

Capacitor는 프로젝트의 루트에 각 플랫폼(`ios` 및 `android`)에 대한 폴더를 생성합니다. 이 폴더들은 각각 iOS 및 Android의 네이티브 프로젝트를 포함합니다.

Android 프로젝트에 접근하고 빌드하기 위해서는 [Android Studio](https://developer.android.com/studio)를 설치해야 합니다. iOS 개발을 위해서는 Mac에 [Xcode](https://developer.apple.com/xcode/)가 설치되어 있어야 합니다.

5. Capacitor를 구성합니다:

`capacitor.config.ts` 파일을 열고 `webDir` 속성을 Next.js 빌드의 출력 디렉토리를 가리키도록 업데이트합니다:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "out",
  "bundledWebRuntime": false
}
```

6. 프로젝트를 빌드하고 동기화합니다:

```shell
npm run static
npx cap sync
```

`npm run static` 명령은 Next.js 프로젝트를 빌드하고 정적 파일을 내보내며, `npx cap sync`는 웹 코드를 네이티브 플랫폼과 동기화합니다.

## 네이티브 앱 빌드 및 배포 

네이티브 모바일 앱을 빌드하고 배포하려면 다음 단계를 따르세요:

iOS 앱을 개발하려면 **Xcode**를 설치해야 하며, Android 앱을 개발하려면 **Android Studio**를 설치해야 합니다. 또한, 앱을 앱 스토어에 배포할 계획이라면 iOS에 대해 Apple 개발자 프로그램에 등록하고, Android에 대해 Google Play Console에 등록해야 합니다.

1. 네이티브 프로젝트를 엽니다:

iOS:
```shell
npx cap open ios
```

Android:
```shell
npx cap open android
```

2. 앱을 빌드하고 실행합니다:

![android-studio-run](/android-studio-run.webp)

- Android Studio에서 프로젝트가 준비될 때까지 기다린 후, "Run" 버튼을 클릭하여 연결된 장치나 에뮬레이터에 앱을 배포합니다.
![xcode-run](/xcode-run.webp)

- Xcode에서 실제 장치에 앱을 배포하기 위해 서명 계정을 설정합니다. 이전에 이러한 경험이 없다면, Xcode가 이 과정을 안내할 것입니다 (Apple 개발자 프로그램에 등록되어 있어야 합니다). 설정이 완료되면 "Play" 버튼을 클릭하여 연결된 장치에서 앱을 실행합니다.

축하합니다! Next.js 웹 앱을 모바일 장치에 성공적으로 배포했습니다.

<div class="mx-auto" style="width: 50%;">
  <img src="/nextjs-mobile-app.webp" alt="nextjs-mobile-app">
</div>
하지만 잠시만 기다려 주세요, 개발 중에 이를 더 빠르게 수행할 수 있는 방법도 있습니다...

## Capacitor 라이브 리로드

개발 중에는 라이브 리로드를 활용하여 모바일 장치에서 즉시 변경 사항을 확인할 수 있습니다. 이 기능을 활성화하려면 다음 단계를 따르세요:

1. 로컬 IP 주소를 찾습니다:

- macOS에서 터미널에 다음 명령을 실행합니다:
  ```shell
  ipconfig getifaddr en0
  ```

- Windows에서 다음을 실행합니다:
  ```shell
  ipconfig
  ```
  출력에서 IPv4 주소를 찾습니다.

2. `capacitor.config.ts` 파일을 업데이트하여 서버 구성을 포함시킵니다:

```javascript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
    url: 'http://YOUR_IP_ADDRESS:3000',
    cleartext: true,
  },
};

export default config;
```

`YOUR_IP_ADDRESS`를 로컬 IP 주소로 교체합니다.

3. 네이티브 프로젝트에 변경 사항을 적용합니다:

```shell
npx cap copy
```

`copy` 명령은 전체 프로젝트를 업데이트하지 않고도 웹 폴더와 구성 변경 사항을 네이티브 프로젝트에 복사합니다.

4. Android Studio나 Xcode를 사용하여 장치에서 앱을 다시 빌드하고 실행합니다.

이제 Next.js 앱에 변경 사항을 만들 때마다 모바일 앱이 자동으로 리로드되어 해당 변경 사항을 반영합니다.

참고: 새로운 플러그인을 설치하거나 네이티브 파일을 변경하는 경우, 라이브 리로드는 웹 코드 변경에만 적용되므로 네이티브 프로젝트를 다시 빌드해야 합니다.

## Capacitor 플러그인 사용하기

Capacitor 플러그인은 Next.js 앱에서 네이티브 기기 기능에 접근할 수 있도록 해줍니다. [Share 플러그인](https://capacitorjs.com/docs/apis/share/)을 예시로 사용하여 사용하는 방법을 살펴보겠습니다:

1. Share 플러그인을 설치합니다:

```shell
npm i @capacitor/share
```

2. `pages/index.js` 파일을 업데이트하여 Share 플러그인을 사용합니다:

```javascript
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Share } from '@capacitor/share';

export default function Home() {
  const share = async () => {
    await Share.share({
      title: 'Open Youtube',
      text: 'Check new video on youtube',
      url: 'https://www.youtube.com',
      dialogTitle: 'Share with friends',
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Capgo!</a>
        </h1>

        <p className={styles.description}>
          <h2>Cool channel</h2>
          <button onClick={() => share()}>Share now!</button>
        </p>
      </main>
    </div>
  );
}
```

3. 네이티브 프로젝트와 변경 사항을 동기화합니다:

앞서 언급한 바와 같이 새로운 플러그인을 설치할 때는 동기화 작업을 수행한 다음 앱을 장치에 재배포해야 합니다. 이를 위해 다음 명령을 실행합니다:

```shell
npx cap sync
```

4. 장치에서 앱을 다시 빌드하고 실행합니다.

이제 "Share now!" 버튼을 클릭하면 네이티브 공유 다이얼로그가 나타나며, 다른 앱과 콘텐츠를 공유할 수 있습니다.

<div class="mx-auto" style="width: 50%;">
<img src="/next-capacitor-share.webp" alt="next-capacitor-share">
</div>

버튼을 더 모바일 친화적으로 보이게 하려면 제가 좋아하는 웹 앱용 UI 구성 요소 라이브러리를 사용하여 약간 스타일링을 추가할 수 있습니다 - Next.js(농담 아님).

## Konsta UI 추가하기

저는 [Ionic](https://ionicframework.com/)과 함께 여러 해를 멋진 크로스 플랫폼 애플리케이션을 구축하는 데 일해 왔으며, 그것은 수년 간 최고의 선택 중 하나였습니다.
하지만 이제는 더 이상 추천하지 않습니다. Next.js와 통합하기가 매우 해킹적이며, 이미 [tailwindcss](https://tailwindcss.com/)가 있는 경우에는 정말로 가치가 없습니다.

iOS 및 Android의 특정 스타일링에 적응하는 멋진 모바일 UI를 원하신다면 Konsta UI를 추천합니다.

[tailwind를 이미 설치해야 합니다](https://tailwindcss.com/docs/guides/nextjs/) 
Next.js 앱의 모바일 UI를 향상시키기 위해 [Konsta UI](https://konstaui.com/)를 사용할 수 있습니다. iOS와 Android 스타일링에 적응하는 모바일 친화적인 UI 구성 요소 라이브러리입니다. Konsta UI를 통합하려면 다음 단계를 따르세요:

1. 필요한 패키지를 설치합니다:

```shell
npm i konsta
```

2. `tailwind.config.js` 파일을 업데이트합니다:

```javascript
const konstaConfig = require('konsta/config');

module.exports = konstaConfig({
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});
```

3. `pages/_app.js`에서 Konsta UI `App` 구성 요소로 앱을 감쌉니다:

```javascript
import { App } from 'konsta/react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <App theme="ios">
      <Component {...pageProps} />
    </App>
  );
}

export default MyApp;
```
### 예시 페이지

이제 모든 설정이 완료되면 Next.js 페이지에서 Konsta UI React 구성 요소를 사용할 수 있습니다.

4. `pages/index.js` 파일을 업데이트하여 Konsta UI 구성 요소를 사용합니다:

```javascript
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListItem,
  BlockTitle,
} from 'konsta/react';

export default function Home() {
  return (
    <Page>
      <Navbar title="My App" />

      <Block strong>
        <p>
          Here is your Next.js & Konsta UI app. Let's see what we have here.
        </p>
      </Block>
      <BlockTitle>Navigation</BlockTitle>
      <List>
        <ListItem href="/about/" title="About" />
        <ListItem href="/form/" title="Form" />
      </List>

      <Block strong className="flex space-x-4">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </Block>
    </Page>
  );
}
```

5. 개발 서버를 재시작하고 앱을 다시 빌드합니다.

이제 Next.js 앱은 Konsta UI를 통해 네이티브처럼 보이는 모바일 UI를 갖추고 있어야 합니다.

## 성능 최적화

Next.js 및 Capacitor 앱의 최적 성능을 보장하기 위해 다음과 같은 모범 사례를 고려하세요:

- 미사용 종속성과 자산을 제거하여 앱 크기를 최소화합니다.
- 로딩 시간을 줄이기 위해 이미지 및 기타 미디어 파일을 최적화합니다.
- 구성 요소 및 페이지에 대해 지연 로딩을 구현하여 초기 로드 성능을 개선합니다.
- Next.js와 서버 측 렌더링(SSR)을 사용하여 앱의 로딩 속도 및 검색 엔진 최적화(SEO)를 강화합니다.
- 웹 뷰 캐싱과 앱 번들링과 같은 Capacitor의 내장 최적화를 활용합니다.

## 결론

이 자습서에서는 Next.js와 Capacitor를 사용하여 네이티브 모바일 앱을 구축하는 방법을 탐구했습니다. 이러한 기술의 힘을 활용하면 쉽게 고성능의 기능 풍부한 모바일 애플리케이션을 만들 수 있습니다.

Next.js 앱 설정, Capacitor 통합, 모바일 장치에 앱 빌드 및 배포하는 단계를 다루었습니다. 추가로, Capacitor 플러그인 사용, 향상된 모바일 UI를 위한 Konsta UI 추가, 성능 최적화 기술에 대해서도 논의했습니다.

Next.js 및 Capacitor 앱을 한 단계 끌어올리려면 원활한 라이브 업데이트를 제공하는 [Capgo](https://capgo.app/)를 탐색해 보세요. 이를 통해 사용자는 항상 최신 기능과 버그 수정에 접근할 수 있습니다.

이 가이드에서 설명한 모범 사례 및 기술을 따르면 Next.js와 Capacitor를 사용하여 멋진 네이티브 모바일 앱을 구축할 준비가 잘 되어 있을 것입니다.

## 리소스

- [Next.js 문서](https://nextjs.org/docs)
- [Capacitor 문서](https://capacitorjs.com/docs)
- [Konsta UI 문서](https://konstaui.com/docs)
- [Capgo - Capacitor 앱을 위한 실시간 업데이트](https://capgo.app/)

행복한 앱 빌딩을 하세요!

Capgo가 어떻게 더 나은 앱을 더 빠르게 만들 수 있는지 알아보세요, [무료 계정 등록](/register/)을 오늘 하세요.
