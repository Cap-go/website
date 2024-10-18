---
slug: create-offline-screen-in-vue-angular-react
title: ネットワークAPIとCapacitorを使用して、Vue、Angular、Reactアプリケーションでオフラインスクリーンを作成する方法。
description: >-
  Vue、Angular、またはReactアプリケーションで、Network
  APIとCapacitorを使用してオフライン画面を実装する方法を学びましょう。オフラインシナリオを効果的に管理することで、ユーザー体験を向上させましょう。
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-21T00:00:00.000Z
updated_at: 2022-06-21T00:00:00.000Z
head_image: /vue_angular_react.webp
head_image_alt: コンピュータで作業している人の画像。
tag: Tutorial
published: true
locale: ja
next_blog: ''
---

# Vue 3、Angular 14、またはReactでオフライン画面を作成する方法

このチュートリアルでは、Network APIを使用して、Vue 3、Angular 14、そしてReactアプリケーションでオフライン画面を作成する方法を学びます。Network APIはネットワークおよび接続に関する情報を提供し、オフラインシナリオを処理し、より良いユーザーエクスペリエンスを提供することができます。

## 前提条件

始める前に、以下のものがインストールされていることを確認してください：

- [Nodejs](https://nodejsorg/)（バージョン14以上）
- [Vue CLI](https://clivuejsorg/)
- [Angular CLI](https://cliangulario/)
- [Create React App](https://create-react-appdev/)

## プロジェクトのセットアップ

まず、それぞれのフレームワークに対応するスキャフォールディングツールを使用して新しいプロジェクトを作成します。

### Vue 3

ターミナルを開き、以下のコマンドを実行して新しいVue 3プロジェクトを作成します：

```shell
vue create offline-screen-vue3
```

デフォルトのプリセットを選択し、プロジェクトが作成されるのを待ちます。

### Angular 14

ターミナルを開き、以下のコマンドを実行して新しいAngular 14プロジェクトを作成します：

```shell
ng new offline-screen-angular14
```

プロンプトに従い、追加機能が必要な場合は**スペースバー**キーを押して「ルーティング」を選択します。プロジェクトが作成されるのを待ちます。

### React

ターミナルを開き、以下のコマンドを実行して新しいReactプロジェクトを作成します：

```shell
npx create-react-app offline-screen-react
```

プロジェクトが作成されるのを待ちます。

## Network APIのインストール

次に、Network APIを提供する`@capacitor/network`パッケージをインストールします。

ターミナルを開き、プロジェクトディレクトリに移動します。その後、以下のコマンドを実行してパッケージをインストールします：

```shell
npm install @capacitor/network
```

Capacitorプロジェクトの場合、ネイティブプロジェクトファイルを同期するために以下のコマンドも実行します：

```shell
npx cap sync
```

グローバルにCapacitor CLIがインストールされていることを確認するために、以下を実行します：

```shell
npm install -g @capacitor/cli
```

## オフライン画面の実装

次に、それぞれのフレームワークでオフライン画面の機能を実装します。ユーザーがオフラインになるとシンプルなメッセージを表示します。

### Vue 3

Vue 3プロジェクトで、`src/main.js`ファイルを開き、`@capacitor/network`から`Network`モジュールをインポートします：

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

アプリケーションのテンプレート（`App.vue`）に、オフライン画面メッセージを表示するために`<div>`要素を`offline-screen`というIDで追加します：

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

これで、ユーザーがオフラインになるとオフライン画面が表示され、オンラインに戻るとオフライン画面が隠れます。

### Angular 14

Angular 14プロジェクトで、`src/app/app.component.ts`ファイルを開き、`@capacitor/network`から`Network`モジュールをインポートします：

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

アプリケーションのテンプレート（`app.component.html`）に、オフライン画面メッセージを表示するために`<template>`要素を`offline-screen`というIDで追加します：

```html
<div id="offline-screen">
  <h1>You are offline</h1>
  <p>Please check your internet connection and try again.</p>
</div>

<!-- Your application content -->
```

`app.component.css`ファイルに以下のスタイルを追加します：

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

これで、ユーザーがオフラインになるとオフライン画面が表示され、オンラインに戻るとオフライン画面が隠れます。

### React

Reactプロジェクトで、`src/App.js`ファイルを開き、`@capacitor/network`から`Network`モジュールをインポートします：

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

`App.css`ファイルに以下のスタイルを追加します：

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

これで、ユーザーがオフラインになるとオフライン画面が表示され、オンラインに戻るとオフライン画面が隠れます。

## サポートされているメソッドとインターフェース

Network APIには、ネットワーク接続を扱うためのいくつかのメソッドとインターフェースが提供されています。以下はその主要なものです：

- [`getStatus()`](https://capacitorjscom/docs/apis/network/#getstatus)：ネットワーク接続の現在の状態を照会する
- [`addListener('networkStatusChange', )`](https://capacitorjscom/docs/apis/network/#addlistenernetworkstatuschange)：ネットワーク接続の変化をリッスンする