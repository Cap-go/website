---
slug: create-offline-screen-in-vue-angular-react
title: 'Vue, Angular 및 React 애플리케이션에서 Network API와 Capacitor를 사용하여 오프라인 화면을 만드는 방법'
description: >-
  Vue, Angular 또는 React 애플리케이션에서 Network API와 Capacitor를 사용하여 오프라인 화면을 구현하는 방법을
  알아보세요. 오프라인 시나리오를 효과적으로 처리하여 사용자 경험을 향상시킬 수 있습니다.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-21T00:00:00.000Z
updated_at: 2022-06-21T00:00:00.000Z
head_image: /vue_angular_react.webp
head_image_alt: 컴퓨터로 작업하는 사람의 이미지
keywords: >-
  Vue, Angular, React, offline screen, network API, Capacitor, mobile app
  development, live updates, OTA updates, continuous integration, mobile app
  updates
tag: Tutorial
published: true
locale: ko
next_blog: ''
---
# Vue 3, Angular 14 또는 React에서 오프라인 화면 만드는 방법

이 튜토리얼에서는 Network API를 사용하여 Vue 3, Angular 14 및 React 애플리케이션에서 오프라인 화면을 만드는 방법을 배워보겠습니다. Network API는 네트워크 및 연결 정보를 제공하여 오프라인 시나리오를 처리하고 더 나은 사용자 경험을 제공할 수 있게 합니다.

## 사전 요구 사항

시작하기 전에 다음 항목이 설치되어 있는지 확인하세요:

- [Node.js](https://nodejs.org/) (버전 14 이상)
- [Vue CLI](https://cli.vuejs.org/)
- [Angular CLI](https://cli.angular.io/)
- [Create React App](https://create-react-app.dev/)

## 프로젝트 설정

먼저 각 프레임워크의 스캐폴딩 도구를 사용하여 새 프로젝트를 만들어보겠습니다.

### Vue 3

터미널을 열고 다음 명령어를 실행하여 새로운 Vue 3 프로젝트를 생성하세요:

```shell
vue create offline-screen-vue3
```

기본 프리셋을 선택하고 프로젝트가 생성될 때까지 기다리세요.

### Angular 14

터미널을 열고 다음 명령어를 실행하여 새로운 Angular 14 프로젝트를 생성하세요:

```shell
ng new offline-screen-angular14
```

프롬프트를 따라가며, 추가 기능을 물어볼 때 **스페이스바** 키를 눌러 "Routing"을 선택하세요. 프로젝트가 생성될 때까지 기다리세요.

### React

터미널을 열고 다음 명령어를 실행하여 새로운 React 프로젝트를 생성하세요:

```shell
npx create-react-app offline-screen-react
```

프로젝트가 생성될 때까지 기다리세요.

## Network API 설치하기

이제 Network API를 제공하는 `@capacitor/network` 패키지를 설치해보겠습니다.

터미널을 열고 프로젝트 디렉토리로 이동한 다음, 다음 명령어를 실행하여 패키지를 설치하세요:

```shell
npm install @capacitor/network
```

Capacitor 프로젝트의 경우, 다음 명령어를 실행하여 네이티브 프로젝트 파일을 동기화하세요:

```shell
npx cap sync
```

다음 명령어를 실행하여 Capacitor CLI가 전역적으로 설치되어 있는지 확인하세요:

```shell
npm install -g @capacitor/cli
```

## 오프라인 화면 구현하기

이제 각 프레임워크에서 오프라인 화면 기능을 구현해보겠습니다. 사용자가 오프라인 상태가 되면 간단한 메시지를 표시할 것입니다.

### Vue 3

Vue 3 프로젝트에서 `src/main.js` 파일을 열고 `@capacitor/network`에서 `Network` 모듈을 가져오세요:

```javascript
import { createApp } from 'vue';
import { Network } from '@capacitor/network';

const app = createApp(App);

// Your application setup

app.mount('#app');

Network.addListener('networkStatusChange', status => {
  if (status.connected) {
    // User is back online
    // Hide the offline screen
    document.getElementById('offline-screen').style.display = 'none';
  } else {
    // User is offline
    // Display the offline screen
    document.getElementById('offline-screen').style.display = 'block';
  }
});

const logCurrentNetworkStatus = async () => {
  const status = await Network.getStatus();
  console.log('Network status:', status);
};
```

애플리케이션 템플릿(`App.vue`)에서 오프라인 화면 메시지를 표시할 `<div>` 요소를 id가 `offline-screen`인 상태로 추가하세요:

```html
<template>
  <div id="app">
    <div id="offline-screen">
      <h1>You are offline</h1>
      <p>Please check your internet connection and try again.</p>
    </div>
    <!-- Your application content -->
  </div>
</template>

<style>
#offline-screen {
  display: none;
  text-align: center;
  padding: 20px;
  background-color: #f2f2f2;
}

#offline-screen h1 {
  font-size: 24px;
}

#offline-screen p {
  font-size: 16px;
}
</style>
```

이제 사용자가 오프라인 상태가 되면 오프라인 화면이 표시됩니다. 사용자가 다시 온라인 상태가 되면 오프라인 화면이 숨겨집니다.

### Angular 14

Angular 14 프로젝트에서 `src/app/app.component.ts` 파일을 열고 `@capacitor/network`에서 `Network` 모듈을 가져오세요:

```typescript
import { Component } from '@angular/core';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
    Network.addListener('networkStatusChange', status => {
      if (status.connected) {
        // User is back online
        // Hide the offline screen
        document.getElementById('offline-screen').style.display = 'none';
      } else {
        // User is offline
        // Display the offline screen
        document.getElementById('offline-screen').style.display = 'block';
      }
    });
  }

  logCurrentNetworkStatus = async () => {
    const status = await Network.getStatus();
    console.log('Network status:', status);
  };

}
```

애플리케이션 템플릿(`app.component.html`)에서 오프라인 화면 메시지를 표시할 `<template>` 요소를 id가 `offline-screen`인 상태로 추가하세요:

```html
<div id="offline-screen">
  <h1>You are offline</h1>
  <p>Please check your internet connection and try again.</p>
</div>

<!-- Your application content -->
```

`app.component.css` 파일에 다음 스타일을 추가하세요:

```css
#offline-screen {
  display: none;
  text-align: center;
  padding: 20px;
  background-color: #f2f2f2;
}

#offline-screen h1 {
  font-size: 24px;
}

#offline-screen p {
  font-size: 16px;
}
```

이제 사용자가 오프라인 상태가 되면 오프라인 화면이 표시됩니다. 사용자가 다시 온라인 상태가 되면 오프라인 화면이 숨겨집니다.

### React

React 프로젝트에서 `src/App.js` 파일을 열고 `@capacitor/network`에서 `Network` 모듈을 가져오세요:

```jsx
import React, { useEffect } from 'react'
import { Network } from '@capacitor/network'

function App() {

  useEffect(() => {
    Network.addListener('networkStatusChange', (status) => {
      if (status.connected) {
        // User is back online
        // Hide the offline screen
        document.getElementById('offline-screen').style.display = 'none'
      }
      else {
        // User is offline
        // Display the offline screen
        document.getElementById('offline-screen').style.display = 'block'
      }
    })
  }, [])

  const logCurrentNetworkStatus = async () => {
    const status = await Network.getStatus()
    console.log('Network status:', status)
  }

  return (
    <div id="app">
      <div id='offline-screen'>
        <h1>You are offline</h1>
        <p>Please check your internet connection and try again.</p>
      </div>
      {/* Your application content */}
    </div>
  )

}

export default App
```

`App.css` 파일에 다음 스타일을 추가하세요:

```css
#offline-screen {
  display: none;
  text-align: center;
  padding: 20px;
  background-color: #f2f2f2;
}

#offline-screen h1 {
  font-size: 24px;
}

#offline-screen p {
  font-size: 16px;
}
```

이제 사용자가 오프라인 상태가 되면 오프라인 화면이 표시됩니다. 사용자가 다시 온라인 상태가 되면 오프라인 화면이 숨겨집니다.

## 지원 메서드 및 인터페이스

Network API는 네트워크 연결을 처리하는 데 도움이 되는 여러 메서드와 인터페이스를 제공합니다. 주요 메서드는 다음과 같습니다:

- [`getStatus()`](https://capacitorjs.com/docs/apis/network/#getstatus): 현재 네트워크 연결 상태를 조회합니다.
- [`addListener('networkStatusChange', ...)`](https://capacitorjs.com/docs/apis/network/#addlistenernetworkstatuschange): 네트워크 연결 변경사항을 수신합니다.
-
