---
slug: create-react-mobile-apps-with-capacitor
title: React와 Capacitor를 사용한 모바일 앱 개발
description: 'React, Capacitor를 사용하여 모바일 앱을 구축하는 방법과 Konsta UI로 네이티브 UI를 향상시키는 방법을 배워보세요.'
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-02-21T00:00:00.000Z
updated_at: 2023-03-10T00:00:00.000Z
head_image: /react_capacitor.webp
head_image_alt: 리액트 및 Capacitor 그림
keywords: >-
  React, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: ko
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
이 튜토리얼에서는 새로운 [React](https://reactjs.org/) 앱으로 시작하여 Capacitor를 사용해 네이티브 모바일 개발로 전환할 것입니다. 선택적으로 더 나은 모바일 UI를 위해 [Konsta UI](https://konstaui.com/)를 추가할 수도 있습니다.

Capacitor를 사용하면 React 웹 애플리케이션을 큰 수정 없이 또는 React Native와 같은 새로운 기술을 배우지 않고도 쉽게 네이티브 모바일 앱으로 변환할 수 있습니다.

몇 가지 간단한 단계만으로 대부분의 React 애플리케이션을 모바일 앱으로 변환할 수 있습니다.

이 튜토리얼은 새로운 React 앱으로 시작하여 Capacitor를 통합하여 네이티브 모바일 앱의 영역으로 나아가는 과정을 안내합니다. 또한 선택적으로 [Konsta UI](https://konstaui.com/)를 사용하여 Tailwind CSS로 모바일 UI를 향상시킬 수 있습니다.

## Capacitor에 대하여

CapacitorJS는 게임 체인저입니다! 여러분은 그것을 어떤 웹 프로젝트에든 쉽게 통합할 수 있으며, 애플리케이션을 네이티브 웹뷰에 래핑하여 네이티브 Xcode 및 Android Studio 프로젝트를 생성합니다. 또한, 플러그인을 통해 JS 브리지를 사용해 카메라와 같은 네이티브 장치 기능에 접근할 수 있습니다.

Capacitor를 사용하면 복잡한 설정이나 가파른 학습 곡선 없이 훌륭한 네이티브 모바일 앱을 얻을 수 있습니다. 그것의 간결한 API와 효율적인 기능 덕분에 프로젝트에 통합하기가 매우 쉽습니다. 믿어보세요, Capacitor로 완전한 기능을 갖춘 네이티브 앱을 만드는 것이 얼마나 쉬운지 놀랄 것입니다!

## React 앱 준비하기

React 애플리케이션을 시작하는 다양한 방법이 있지만, 이 튜토리얼에서는 빈 React 애플리케이션을 제공하는 가장 간단한 방법을 선택하겠습니다:

```shell
npx create-react-app my-app
```

네이티브 모바일 앱을 만들기 위해서는 우리 프로젝트의 **내보내기**가 필요합니다. 그래서 우리는 React 프로젝트를 빌드하고 내보내는 데 사용될 간단한 스크립트를 **package.json**에 포함하겠습니다:

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

이제 `npm run build`를 실행할 수 있으며, 프로젝트의 루트에 새로운 output 폴더가 생성되어야 합니다.

이 폴더는 이후에 Capacitor에 의해 사용되지만, 현재로서는 이를 올바르게 설정해야 합니다.

## React 앱에 Capacitor 추가하기

모든 웹 앱을 네이티브 모바일 컨테이너로 패키징하기 위해서는 몇 가지 초기 단계를 따라야 하지만, 이후의 과정은 단일 `sync` 명령을 실행하는 것만큼 간단합니다.

먼저, [Capacitor CLI](https://capacitorjs.com/docs/cli/)를 개발 종속성으로 설치한 다음, 우리의 프로젝트 내에 설정합니다. 설정하는 동안 이름과 번들 ID에 대한 기본값을 수락하려면 "enter"를 누르시면 됩니다.

다음으로, iOS 및 Android 플랫폼을 위한 핵심 패키지와 관련 패키지를 설치해야 합니다.

마지막으로, 플랫폼을 추가하면 Capacitor가 우리 프로젝트의 루트에 각 플랫폼에 대한 폴더를 생성합니다:

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

이 시점에서 React 프로젝트에서 새로운 **ios** 및 **android** 폴더를 확인할 수 있어야 합니다.

**그것들은 실제 네이티브 프로젝트입니다!**

이후 Android 프로젝트에 접근하려면 [Android Studio](https://developer.android.com/studio/)를 설치해야 합니다. iOS의 경우 Mac이 필요하며 [Xcode](https://developer.apple.com/xcode/)를 설치해야 합니다.

또한, `capacitor.config.ts` 파일이 프로젝트에 있을 것이며, 이 파일에는 동기화 중 사용되는 몇 가지 기본 Capacitor 설정이 포함되어 있습니다. 유의해야 할 점은 **webDir**이며, 이는 빌드 명령의 결과를 가리켜야 합니다. 현재는 부정확합니다.

이를 수정하기 위해 **capacitor.config.json** 파일을 열고 **webDir**을 업데이트합니다:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "out",
  "bundledWebRuntime": false
}
```

다음 명령어를 실행하여 테스트해볼 수 있습니다:

```shell
npm run build
npx cap sync
```

첫 번째 명령어 `npm run build`는 단순히 React 프로젝트를 빌드하고 정적 빌드를 내보냅니다.

반면 두 번째 명령어 `npx cap sync`는 모든 웹 코드를 네이티브 플랫폼의 올바른 위치로 동기화하여 앱에서 표시될 수 있도록 합니다.

또한, sync 명령은 네이티브 플랫폼을 업데이트하고 플러그인을 설치할 수 있으므로 새로운 [Capacitor 플러그인](https://capacitorjs.com/docs/plugins/)을 설치할 때는 다시 `npx cap sync`를 실행해야 합니다.

모르는 사이에 이제 실제로 모든 것이 완료되었습니다. 자, 기기에서 앱을 확인해 봅시다!

## 네이티브 앱 빌드 및 배포

iOS 앱을 개발하려면 **Xcode**를 설치해야 하고, Android 앱을 개발하려면 **Android Studio**를 설치해야 합니다. 또한, 앱 스토어에서 앱을 배포할 계획이라면 iOS용 Apple Developer Program과 Android용 Google Play Console에 가입해야 합니다.

네이티브 모바일 개발이 처음이라면, Capacitor CLI를 사용하여 두 네이티브 프로젝트를 쉽게 열 수 있습니다:

```shell
npx cap open ios
npx cap open android
```

네이티브 프로젝트를 설정하면, 연결된 기기에 앱을 배포하는 것은 쉽습니다. Android Studio에서는 모든 것이 준비될 때까지 기다리기만 하면 되며, 아무 설정을 변경하지 않고도 연결된 기기에 앱을 배포할 수 있습니다. 예시입니다:

![android-studio-run](/android-studio-run.webp)

Xcode에서는 실제 기기에 앱을 배포하기 위해 서명 계정을 설정해야 합니다. 시뮬레이터가 아닌 실제 기기에 앱을 배포하려면 서명 계정을 설정해야 합니다. 이전에 해본 적이 없다면, Xcode가 프로세스를 안내합니다 (다시 말하지만, Developer Program에 등록해야 합니다). 그 후, 연결된 기기에서 앱을 실행하려면 플레이 버튼을 누르기만 하면 되며 선택할 수 있습니다. 예시입니다:

![xcode-run](/xcode-run.webp)

축하합니다! React 웹 앱을 모바일 기기에 성공적으로 배포했습니다. 예시입니다:

<div class="mx-auto" style="width: 50%;">
  <img src="/next-capacitor-share.webp" alt="react-mobile-app">
</div>

하지만 잠시만요, 개발 중에 이것을 더 빠르게 수행할 수 있는 방법도 있습니다...

## Capacitor 라이브 리로드

이제 여러분은 아마도 모든 현대 프레임워크에서 핫 리로드하는 것에 익숙해져 있을 것이며, 좋은 소식은 최소한의 노력으로 **모바일 장치에서도** 같은 기능을 가지게 될 수 있다는 것입니다!

네트워크에서 **로컬 호스팅된 애플리케이션**에 라이브 리로드 기능을 활성화하여 Capacitor 앱이 특정 URL에서 콘텐츠를 로드하게 하세요.

첫 번째 단계는 로컬 IP 주소를 확인하는 것입니다. Mac을 사용하는 경우 터미널에서 다음 명령어를 실행하여 알아낼 수 있습니다:

```shell
ipconfig getifaddr en0
```

Windows에서는 다음을 실행합니다:

```shell
ipconfig
```

그런 다음 IPv4 주소를 찾습니다.

Capacitor가 서버에서 앱을 직접 로드하도록 다른 항목을 `capacitor.config.ts` 파일에 추가할 수 있습니다:

```javascript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.x.xx:3000',
    cleartext: true
  }
};

export default config;
```

**올바른 IP와 포트를 사용해야** 하며, 예시에서는 기본 React 포트를 사용했습니다.

이제 이 변경 사항을 우리의 네이티브 프로젝트에 복사하여 적용할 수 있습니다:

```shell
npx cap copy
```

`copy` 명령은 `sync`와 비슷하지만 웹 폴더와 설정에서 변경된 사항만 **복사**하고 네이티브 프로젝트를 업데이트하지 않습니다.

이제 Android Studio 또는 Xcode를 통해 앱을 한 번 더 배포할 수 있습니다. 그 후 React 앱에서 무언가를 변경하면 **앱이 자동으로 리로드**되고 변경 사항이 표시됩니다!

**유의할 점**은 카메라와 같은 새로운 플러그인을 설치하면 여전히 네이티브 프로젝트를 다시 빌드해야 합니다. 이는 네이티브 파일이 변경되며 즉흥적으로 수행할 수 없기 때문입니다.

설정에서 올바른 IP와 포트를 사용해야 한다는 점에 유의하세요. 위의 코드 블록은 설명 목적으로 기본 React 포트를 보여줍니다.

## Capacitor 플러그인 사용하기

이제 Capacitor 플러그인을 어떻게 사용하는지 살펴보겠습니다. 이전에 몇 번 언급했던 내용입니다. 이를 위해 다음 명령어를 실행하여 꽤 간단한 플러그인을 설치할 수 있습니다:

```shell
npm i @capacitor/share
```

[Share 플러그인](https://capacitorjs.com/docs/apis/share/)에 특별한 것은 없지만, 어쨌든 네이티브 공유 대화상자를 띄웁니다! 이를 위해 이제 패키지를 가져오고 앱에서 `share()` 함수를 호출하기만 하면 됩니다. **src/App.js**를 다음과 같이 변경해보세요:

```javascript
import React from 'react';
import { Share } from '@capacitor/share';

function App() {
  const share = async () => {
    await Share.share({
      title: 'Open Youtube',
      text: 'Check new video on youtube',
      url: 'https://www.youtube.com',
      dialogTitle: 'Share with friends'
    });
  };

  return (
    <div>
      <h1>Welcome to React and Capacitor!</h1>
      <p>
        <h2>Cool channel</h2>
        <button onClick={() => share()}>Share now!</button>
      </p>
    </div>
  );
}

export default App;
```

앞서 언급했듯이, 새로운 플러그인을 설치할 때는 동기화 작업을 수행하고 앱을 기기로 다시 배포해야 합니다. 이를 위해 다음 명령어를 실행합니다:

```
npx cap sync
```

버튼을 누르면 아름다운 네이티브 공유 대화상자가 나타나는 것을 볼 수 있습니다!

<div>
  <h1>
</h1>

버튼을 더 모바일 친화적으로 보이게 하려면 웹 앱을 위한 내가 가장 좋아하는 UI 컴포넌트 라이브러리인 React를 사용하여 스타일링할 수 있습니다 (농담이 아니며).

## Konsta UI 추가하기

나는 [Ionic](https://ionicframework.com/)으로 멋진 크로스 플랫폼 애플리케이션을 구축하는 데 수년을 보내왔고, 이는 오랫동안 최고의 선택 중 하나였습니다. 하지만 이제 더 이상 추천하지 않습니다. React와 통합하는 것이 매우 성가시고, 이미 [tailwindcss](https://tailwindcss.com/)가 있을 때는 그만한 가치가 없습니다.

iOS와 Android의 특정 스타일링에 적응하는 멋진 모바일 UI를 원하신다면 Konsta UI를 추천합니다.

[tailwind를 이미 설치해야 합니다](https://tailwindcss.com/docs/guides/vite/#react) 

이를 사용하기 위해서는 패키지를 설치하기만 하면 됩니다:

```shell
npm i konsta
```

추가로 `tailwind.config.js` 파일을 수정해야 합니다:

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

`konstaConfig`는 Konsta UI에 필요한 추가 변형 및 도우미 유틸리티와 함께 기본 (또는 사용자 지정) Tailwind CSS 구성을 확장합니다.

이제 [App](https://konstaui.com/react/app/) 컴포넌트를 설정하여 일부 전역 매개변수(예: `theme`)를 설정할 수 있습니다.

`src/App.js`에서 전체 앱을 `App`로 감싸야 합니다:

```javascript
import { App } from 'konsta/react';
import './App.css';

function MyApp({ Component, pageProps }) {
  return (
    // Wrap our app with App component
    <App theme="ios">
      <Component {...pageProps} />
    </App>
  );
}

export default MyApp;
```

### 예시 페이지

모든 설정이 완료되었으므로 React 앱에서 Konsta UI React 컴포넌트를 사용할 수 있습니다.

예를 들어, `src/App.js`를 열고 다음과 같이 변경합니다:

```javascript
// Konsta UI components
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListItem,
  Link,
  BlockTitle,
} from 'konsta/react';

function App() {
  return (
    <Page>
      <Navbar title="My App" />

      <Block strong>
        <p>
          Here is your React & Konsta UI app. Let's see what we have here.
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

export default App;
```

모든 필요한 구성 요소를 설치한 후 라이브 리로드가 비동기일 경우 모든 것을 재시작해 보세요. 그렇게 하면 React와 Capacitor로 구축된 다소 네이티브한 모습의 모바일 앱을 볼 수 있어야 합니다!

결과적으로 다음 페이지를 확인할 수 있어야 합니다:

<p>
  <h2>
</h2>

## 결론

Capacitor는 기존 웹 프로젝트를 기반으로 네이티브 애플리케이션을 구축하는 훌륭한 선택이며, 코드를 공유하고 일관된 UI를 유지하는 간단한 방법을 제공합니다.

[Capgo](https://capgo.app/)의 추가로 앱에 실시간 업데이트를 추가하는 것이 훨씬 쉬워졌습니다. 사용자가 항상 최신 기능과 버그 수정을 이용할 수 있도록 보장합니다.

Capgo를 React 앱에 추가하는 방법을 배우고 싶다면 다음 기사를 확인해 보세요:
