---
slug: 리액트와 Capacitor로 모바일 앱 만들기
title: React.js와 Capacitor로 모바일 앱 만들기
description: >-
  React.js 웹 애플리케이션을 Capacitor를 활용하여 네이티브 모바일 앱으로 변환하고 Konsta UI로 네이티브 UI를 향상시키는
  가이드입니다.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-29T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /react_capacitor.webp
head_image_alt: React.js와 Capacitor 일러스트레이션
keywords: >-
  React, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: ko
next_blog: implementing-live-updates-in-your-react-capacitor-app
original_slug: creating-mobile-apps-with-react-and-capacitor
---
이 튜토리얼에서는 React, Capacitor 및 Konsta UI를 사용하여 모바일 애플리케이션을 만드는 방법을 안내합니다. 마지막에는 Capacitor를 사용하여 React.js 웹 앱을 네이티브 모바일 애플리케이션으로 변환하고 Konsta UI를 사용하여 네이티브 UI를 구현하는 방법을 알게 될 것입니다.

Capacitor를 사용하면 React Native와 같은 새로운 전략을 배우거나 상당한 수정 없이도 React.js 웹 앱을 네이티브 모바일 애플리케이션으로 쉽게 변환할 수 있습니다.

이 과정은 몇 가지 간단한 단계로 이루어지며, 곧 여러분의 React.js 앱이 완전히 작동하는 모바일 애플리케이션이 될 것입니다. 이 여정을 함께 해보시죠.

## Capacitor 개요

CapacitorJS는 게임 체인저입니다. 모든 웹 프로젝트와 원활하게 통합되어 앱을 네이티브 웹뷰로 래핑하면서 네이티브 Xcode 및 Android Studio 프로젝트를 생성합니다. 또한 플러그인을 통해 JS 브리지를 통해 카메라와 같은 네이티브 기기 기능에 접근할 수 있습니다.

Capacitor는 번거로움이나 가파른 학습 곡선 없이 네이티브 모바일 애플리케이션을 만들 수 있는 간단한 방법을 제공합니다. 간단한 API와 간소화된 기능으로 프로젝트에 쉽게 통합할 수 있습니다.

## React.js 앱 설정하기

React 애플리케이션을 시작하는 가장 간단한 방법을 사용해보겠습니다. npm 패키지 매니저를 사용하여 새로운 React 앱을 만들 것입니다:

```shell
npx create-react-app my-app
```

네이티브 모바일 앱으로 변환하기 위해서는 앱의 **내보내기**가 필요합니다.

잠시 후에 다시 이 부분으로 돌아오겠습니다. 먼저, Capacitor를 React 앱에 통합하는 방법을 이해해보겠습니다.

## React.js 앱에 Capacitor 통합하기

초기 설정 단계는 약간 자세할 수 있지만, 그 이후에는 네이티브 앱 래퍼를 업데이트하는 것이 `sync` 명령어를 실행하는 것만큼 간단해집니다.

먼저, Capacitor CLI를 개발 의존성으로 설치하고 프로젝트 내에서 설정합니다. 설정 중에 "enter"를 눌러 이름과 번들 ID에 대한 기본값을 수락하세요.

다음으로, 코어 패키지와 iOS 및 Android 플랫폼용 관련 패키지를 설치합니다.

마지막으로, 플랫폼을 추가하면 Capacitor가 프로젝트 루트에 각 플랫폼용 폴더를 생성합니다:

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your React project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

이제 React.js 프로젝트에 **ios**와 **android** 디렉토리가 있습니다.

나중에 Android 프로젝트에 접근하려면 [Android Studio](https://developer.android.com/studio/)를 설치하세요. iOS의 경우 Mac이 필요하며 [Xcode](https://developer.apple.com/xcode/)를 설치해야 합니다.

다음으로, **capacitor.config.json** 파일에서 **webDir**을 아래와 같이 업데이트하세요:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "build",
  "bundledWebRuntime": false
}
```

빌드 명령어를 실행하고 Capacitor로 프로젝트를 동기화하세요:

```shell
npm run build
npx cap sync
```

`npm run build` 명령어는 React.js 프로젝트를 빌드하고, `npx cap sync`는 웹 코드를 네이티브 플랫폼의 정확한 위치에 맞춰 앱에서 실행될 수 있도록 정렬합니다.

이제 운이 좋다면 오류 없이 React.js 앱이 기기에서 실행될 준비가 되었을 것입니다!

## 네이티브 앱 빌드 및 배포하기

iOS 앱 개발에는 **Xcode**가 필요하고, Android 앱에는 **Android Studio**가 필요합니다. 앱 스토어에 앱을 배포할 계획이라면 iOS의 경우 Apple Developer Program에, Android의 경우 Google Play Console에 등록해야 합니다.

Capacitor CLI는 두 네이티브 프로젝트를 여는 과정을 간소화합니다:

```shell
npx cap open ios
npx cap open android
```

네이티브 프로젝트가 설정되면 연결된 기기에 앱을 배포하는 것은 간단한 과정입니다.

Android Studio의 경우, 모든 것이 로드될 때까지 기다린 다음 연결된 기기에 앱을 배포하세요.

Xcode의 경우, 시뮬레이터가 아닌 실제 기기에 앱을 배포하기 위해 서명 계정을 설정하세요. 그 후에는 상단에서 선택할 수 있는 연결된 기기에서 앱을 실행하기 위해 간단히 실행 버튼을 누르면 됩니다.

모든 것이 잘 진행되었다면, React.js 웹 앱을 네이티브 모바일 애플리케이션으로 변환한 것입니다!

## Capacitor 라이브 리로드

최신 개발 프레임워크에는 보통 핫 리로드가 포함되어 있으며, 다행히도 Capacitor에서도 **모바일 기기에서** 동일한 기능을 사용할 수 있습니다!

특정 URL에서 콘텐츠를 로드하도록 Capacitor 앱을 설정하여 로컬에서 호스팅되는 애플리케이션을 네트워크에서 라이브 리로드와 함께 접근할 수 있게 만들 수 있습니다.

먼저, 로컬 IP 주소를 확인하세요. Mac에서는 터미널에서 `ipconfig getifaddr en0`를 실행하여 확인할 수 있습니다. Windows에서는 `ipconfig`를 실행하고 IPv4 주소를 찾으세요.

그런 다음, `capacitor.config.ts` 파일에 다른 매개변수를 추가하여 서버에서 직접 앱을 로드하도록 Capacitor에 지시하세요:

```javascript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.x.xx:3000',
    cleartext: true
  }
};

export default config;
```

정확한 IP와 포트를 사용해야 합니다. 이러한 변경사항을 네이티브 프로젝트에 적용하려면 `npx cap copy`를 실행하세요.

Android Studio나 Xcode를 통해 앱을 한 번 더 배포하면, React 앱의 모든 변경사항이 자동으로 리로드되어 앱에 표시됩니다!

카메라와 같은 새로운 플러그인이 설치된 경우에는 네이티브 프로젝트를 다시 빌드해야 한다는 점을 유의하세요. 이는 네이티브 파일이 변경되었으며 즉시 업데이트할 수 없기 때문입니다.

## Capacitor 플러그인 사용하기

Capacitor 플러그인을 사용하는 방법을 간단히 살펴보겠습니다. 네이티브 공유 대화상자를 표시하는 간단한 [Share 플러그인](https://capacitorjs.com/docs/apis/share/)을 설치해보겠습니다:

```shell
npm i @capacitor/share
```

사용하려면 패키지를 가져오고 앱에서 해당 `share()` 함수를 호출하세요. **App.js**를 참고하세요:

```javascript
import { Share } from '@capacitor/share';

function ShareButton() {
  const share = async () => {
    await Share.share({
      title: 'React App',
      text: 'Visit this React App',
      url: 'http://localhost:3000',
      dialogTitle: 'Share with...'
    });
  };

  return (
    <button onClick={share}>
      Share
    </button>
  );
}

export default ShareButton;
```

새로운 플러그인을 설치한 후에는 `npx cap sync`를 사용하여 React 프로젝트를 다시 동기화해야 합니다.

## Konsta UI 구현하기: 더 나은 모바일 UI

더 나은 모바일 UI 경험을 위해 Konsta UI를 사용할 것입니다. iOS와 Android에 특화된 스타일링을 제공하며 사용하기 쉽습니다.

Konsta UI를 사용하려면 React 패키지를 설치하세요:

```shell
npm i konsta
```

`tailwind.config.js` 파일을 다음과 같이 수정하세요:

```javascript
// import konstaConfig config
const konstaConfig = require('konsta/config')

// wrap config with konstaConfig config
module.exports = konstaConfig({
  content: [
    './src/**/*.{js,ts,javascript,tsx}',
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

`konstaConfig`는 Konsta UI에 필요한 추가 변형과 유틸리티로 현재 Tailwind CSS 설정을 보완합니다.

이제 `theme`와 같은 전역 매개변수를 설정하기 위해 기본 App 컴포넌트를 설정하세요. `src/index.js`에서 주요 앱을 App으로 감싸세요:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import {App} from 'konsta/react';
import './index.css';
import MyApp from './App';

ReactDOM.render(
  <React.StrictMode>
    <App theme="ios">
      <MyApp />
    </App>
  </React.StrictMode>,
  document.getElementById('root')
);
```

React.js 페이지에서 Konsta UI React 컴포넌트를 사용해보겠습니다. `src/App.js`를 열고 다음과 같이 수정하세요:

```javascript
// Konsta UI components
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListItem,
} from 'konsta/react';

export default function MyApp() {
  return (
    <Page>
      <Navbar title="My App" />

      <Block strong>
        <p>
          Welcome to your React & Konsta UI app.
        </p>
      </Block>
      
      <List>
        <ListItem href="/about" title="About" />
      </List>

      <Block strong>
        <Button>Click Me</Button>
      </Block>
    </Page>
  );
}
```

모든 것이 올바르게 수행되었다면, React와 Konsta UI가 원활하게 통합되어 모바일 앱에 네이티브한 모습을 제공하는 것을 볼 수 있습니다.

## 결론

Capacitor는 기존 웹 프로젝트를 기반으로 네이티브 앱을 만드는 원활한 방법을 제공하며, 코드를 공유하고 일관된 UI를 가질 수 있는 간단한 방법을 제공합니다.

Capacitor와 같은 기술 덕분에 React.js 웹 앱에서 모바일 애플리케이션을 만드는 것이 그 어느 때보다 쉬워졌습니다. 인상적인 네이티브 모바일 앱을 만들어 웹 개발 기술을 한 단계 발전시켜 보세요. 즐거운 코딩 되세요!

앱 개발 프로세스를 더 빠르게 진행하는 방법에 대해 더 알아보려면, 오늘 [무료 계정에 가입](/register/)하세요.
