---
slug: creating-mobile-apps-with-react-and-capacitor
title: Creando Aplicaciones Móviles con React.js Puro y Capacitor
description: >-
  React.jsのWebアプリケーションをCapacitorを使用してネイティブモバイルアプリケーションに変換し、Konsta
  UIを使用してネイティブな外観を向上させるガイド。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-29T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /react_capacitor.webp
head_image_alt: React.js と Capacitor の説明
keywords: >-
  React, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: ja
next_blog: implementing-live-updates-in-your-react-capacitor-app
---

このチュートリアルでは、React、Capacitor、Konsta UIを使用してモバイルアプリケーションを作成する方法を説明します。最終的に、ReactjsのWebアプリをCapacitorを使用してネイティブモバイルアプリケーションに変換し、Konsta UIを使用してネイティブUIを実装する方法を理解できるようになります。

Capacitorを使用すると、ReactjsのWebアプリを、React Nativeのような新しい戦略を学ぶことや大幅な変更を必要とせずに、ネイティブモバイルアプリケーションに簡単に変換できます。

プロセスはいくつかの簡単なステップで構成されており、すぐにReactjsアプリが完全に機能するモバイルアプリケーションになります。では、このプロセスをご案内していきましょう。

## Capacitorの概要

CapacitorJSは革新的なツールです。任意のWebプロジェクトとシームレスに統合し、アプリをネイティブWebviewでラップしながら、ネイティブのXcodeとAndroid Studioプロジェクトを生成します。さらに、そのプラグインを通じて、JSブリッジを介してカメラなどのネイティブデバイス機能にアクセスできます。

Capacitorは、面倒な作業や急な学習曲線なしに、ネイティブモバイルアプリケーションを作成する簡単な方法を提供します。シンプルなAPIと合理化された機能により、プロジェクトへの組み込みが容易になります。

## Reactjsアプリのセットアップ

Reactアプリケーションを開始する最も簡単な方法を選びましょう。npmパッケージマネージャーを使用して新しいReactアプリを作成します：

```shell
npx create-react-app my-app
```

ネイティブモバイルアプリに変換するには、アプリの**エクスポート**が必要です。

この点については後ほど戻ってきます。まず、CapacitorをReactアプリに統合する方法を理解しましょう。

## ReactjsアプリへのCapacitorの統合

初期セットアップのステップは少し詳細かもしれませんが、その後は、ネイティブアプリラッパーの更新は`sync`コマンドを実行するだけの簡単な作業になります。

まず、Capacitor CLIを開発依存関係としてインストールし、プロジェクト内でセットアップします。セットアップ中、名前とバンドルIDのデフォルト値は「Enter」キーを押して受け入れてください。

次に、コアパッケージとiOSおよびAndroidプラットフォーム用の関連パッケージをインストールします。

最後に、プラットフォームを追加すると、Capacitorがプロジェクトルートに各プラットフォーム用のフォルダを作成します：

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

**ios**と**android**ディレクトリがReactjsプロジェクトに作成されました。

後でAndroidプロジェクトにアクセスするには、[Android Studio](https://developer.android.com/studio/)をインストールしてください。iOSの場合は、Macが必要で、[Xcode](https://developer.apple.com/xcode/)をインストールする必要があります。

次に、**capacitor.config.json**ファイルの**webDir**を以下のように更新します：

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "build",
  "bundledWebRuntime": false
}
```

ビルドコマンドを実行し、プロジェクトをCapacitorと同期します：

```shell
npm run build
npx cap sync
```

`npm run build`コマンドはReactjsプロジェクトをビルドし、`npx cap sync`はWebコードをネイティブプラットフォームの正確な場所に配置して、アプリで実行できるようにします。

これでエラーがなければ、Reactjsアプリをデバイスでローンチする準備が整いました！

## ネイティブアプリのビルドとデプロイ

iOSアプリの開発には**Xcode**が、Androidアプリには**Android Studio**が必要です。アプリストアでアプリを配布する予定がある場合は、iOSの場合はApple Developer Program、Androidの場合はGoogle Play Consoleに登録する必要があります。

Capacitor CLIは両方のネイティブプロジェクトを開くプロセスを簡素化します：

```shell
npx cap open ios
npx cap open android
```

ネイティブプロジェクトのセットアップが完了すると、接続されたデバイスへのアプリのデプロイは簡単なプロセスです。

Android Studioの場合、すべてがロードされるのを待ってから、接続されたデバイスにアプリをデプロイします。

Xcodeの場合、シミュレータだけでなく実際のデバイスにアプリをデプロイするために、署名アカウントを設定します。設定後、上部で選択できる接続されたデバイスでアプリを実行するには、単にプレイを押すだけです。

すべてが順調に進めば、Reactを変換することができます。js web アプリをネイティブモバイルアプリケーションに変換！

## Capacitor ライブリロード

最新の開発フレームワークには通常ホットリロードが付属していますが、幸運なことに、Capacitorでも**モバイルデバイス上で**同じことができます！

ローカルでホストされているアプリケーションを、特定のURLからコンテンツを読み込むようCapacitorアプリを設定することで、ネットワーク上でライブリロードを使用してアクセス可能にできます。

まず、ローカルIPアドレスを確認します。Macでは、ターミナルで`ipconfig getifaddr en0`を実行します。Windowsでは、`ipconfig`を実行してIPv4アドレスを探します。

次に、`capacitor.config.ts`ファイルに別のパラメータを追加して、サーバーから直接アプリを読み込むようCapacitorに指示します：

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

正確なIPとポートを使用してください。これらの変更をネイティブプロジェクトに適用するために`npx cap copy`を実行します。

Android StudioまたはXcodeを通じてアプリをもう一度デプロイすると、Reactアプリの変更が自動的にリロードされ、アプリに表示されます！

カメラなどの新しいプラグインをインストールした場合は、ネイティブプロジェクトの再ビルドが必要になることに注意してください。これは、ネイティブファイルが変更され、その場での更新ができないためです。

## Capacitorプラグインの使用

Capacitorプラグインの使用方法を簡単に見てみましょう。シンプルな例として、ネイティブの共有ダイアログを表示する[Shareプラグイン](https://capacitorjs.com/docs/apis/share/)をインストールしましょう：

```shell
npm i @capacitor/share
```

使用するには、パッケージをインポートし、アプリから該当する`share()`関数を呼び出します。**App.js**を考えてみましょう：

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

新しいプラグインをインストールした後は、`npx cap sync`を使用してReactプロジェクトを再同期することを忘れないでください。

## Konsta UIの実装：より見栄えの良いモバイルUI

より見栄えの良いモバイルUIエクスペリエンスのために、Konsta UIを使用します。iOSとAndroid固有のスタイリングを提供し、使用が簡単です。

Konsta UIを使用するには、Reactパッケージをインストールします：

```shell
npm i konsta
```

`tailwind.config.js`ファイルを以下のように変更します：

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

`konstaConfig`は、Konsta UIに必要な追加のバリアントとユーティリティを現在のTailwind CSS設定に補完します。

次に、`theme`などのグローバルパラメータを設定するためにメインのAppコンポーネントを設定します。`src/index.js`でAppをメインアプリでラップします：

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

Konsta UI Reactコンポーネントを私たちのReactjsページで使用しましょう。`src/App.js`を開いて以下のように変更します：

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

すべてが正しく行われていれば、ReactとKonsta UIの間のシームレスな統合により、モバイルアプリにネイティブな外観が与えられるはずです。

## 結論

Capacitorは、既存のWebプロジェクトに基づいてネイティブアプリを構築するためのシームレスな手段を提供し、コードを共有し、一貫したUIを持つ簡単な方法を提供します。

Capacitorのような技術のおかげで、ReactjsのWebアプリからモバイルアプリケーションを構築することがかつてないほど簡単になりました。印象的なネイティブモバイルアプリを作成することで、Webの開発スキルを次のレベルに引き上げましょう。ハッピーコーディング！

アプリ開発プロセスを迅速化する方法の詳細については、[無料アカウントに登録](/register/)してください。