---
slug: creating-mobile-apps-with-react-and-capacitor
title: Pure React.js と Capacitor を使用してモバイルアプリを構築する
description: >-
  React.jsウェブアプリケーションをCapacitorを利用してネイティブモバイルアプリに変換し、Konsta
  UIでネイティブUIを強化する方法に関するガイド。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-29T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /react_capacitor.webp
head_image_alt: React.jsおよびCapacitorのイラスト
keywords: >-
  React, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: ja
next_blog: implementing-live-updates-in-your-react-capacitor-app
---
このチュートリアルでは、React、Capacitor、およびKonsta UIを使用してモバイルアプリケーションを作成する方法を説明します。最後には、React.jsウェブアプリをCapacitorを使用してネイティブモバイルアプリに変換する方法と、Konsta UIを使ってネイティブUIを実装する方法を学ぶことができます。

Capacitorは、React.jsウェブアプリをネイティブモバイルアプリに簡単に変換できる機能を提供し、React Nativeのような新しい戦略を学ぶ必要がありません。

このプロセスは簡単な手順を含んでおり、すぐにあなたのReact.jsアプリは完全に機能するモバイルアプリになります。ですので、この旅にあなたを案内するので、一緒にいてください。

## Capacitorの概要

CapacitorJSはゲームチェンジャーです。これは、任意のウェブプロジェクトにシームレスに統合でき、アプリをネイティブウェブビューにラップしながら、ネイティブのXcodeおよびAndroid Studioプロジェクトを生成します。さらに、プラグインを通じて、JSブリッジを介してカメラなどのネイティブデバイス機能にアクセスできます。

Capacitorは、手間なく簡単にネイティブモバイルアプリを作成する方法を提供します。そのシンプルなAPIとスムーズな機能は、プロジェクトに統合するのを容易にします。

## React.jsアプリのセットアップ

Reactアプリケーションを開始する最も簡単な方法に取り組んでみましょう。npmパッケージマネージャーを使用して新しいReactアプリを作成します。

```shell
npx create-react-app my-app
```

プロジェクトをネイティブモバイルアプリに変換するには、アプリの**エクスポート**が必要です。

これについては後ほど詳しく説明します。まず、CapacitorをReactアプリに統合する方法を理解しましょう。

## React.jsアプリにCapacitorを統合する

初期設定の手順は少し詳細になるかもしれませんが、その後はネイティブアプリラッパーを更新するのが`sync`コマンドを実行するのと同じくらい簡単になります。

最初に、Capacitor CLIを開発依存関係としてインストールし、プロジェクト内で設定します。セットアップ中に、名前とバンドルIDのデフォルト値を受け入れるには「enter」を押します。

次に、コアパッケージとiOSおよびAndroidプラットフォーム用の関連パッケージをインストールします。

最後に、プラットフォームを追加し、Capacitorはプロジェクトのルートに各プラットフォーム用のフォルダーを作成します。

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

**ios**および**android**ディレクトリが、あなたのReact.jsプロジェクトに存在しています。

後でAndroidプロジェクトにアクセスするには、[Android Studio](https://developer.android.com/studio/)をインストールしてください。iOSの場合は、Macが必要で、[Xcode](https://developer.apple.com/xcode/)をインストールする必要があります。

次に、以下のように**capacitor.config.json**ファイルの**webDir**を更新します。

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "build",
  "bundledWebRuntime": false
}
```

ビルドコマンドを実行して、プロジェクトをCapacitorと同期させます。

```shell
npm run build
npx cap sync
```

`npm run build`コマンドは、あなたのReact.jsプロジェクトをビルドし、`npx cap sync`はネイティブプラットフォームの正確な場所にウェブコードを配置して、アプリで実行できるようにします。

さあ、少しの運とエラーがなければ、あなたのReact.jsアプリはデバイスで起動できる状態になっているはずです！

## ネイティブアプリをビルドしてデプロイする

iOSアプリの開発には**Xcode**が必要で、Androidアプリには**Android Studio**が必要です。アプリをアプリストアで配布する予定がある場合は、iOS用のApple Developer ProgramやAndroid用のGoogle Play Consoleに登録する必要があります。

Capacitor CLIは、両方のネイティブプロジェクトを開くプロセスを簡素化します。

```shell
npx cap open ios
npx cap open android
```

ネイティブプロジェクトのセットアップが完了したら、接続されたデバイスにアプリをデプロイするのは簡単なプロセスです。

Android Studioでは、すべてが読み込まれるまで待ち、接続されたデバイスにアプリをデプロイします。

Xcodeでは、アプリをシミュレーターではなく実際のデバイスにデプロイするために、サインインアカウントを設定します。それが終わったら、アプリを接続されたデバイスで実行するために再生ボタンを押すだけです。接続されているデバイスは、上部で選択できます。

すべてがうまくいけば、あなたはReact.jsウェブアプリをネイティブモバイルアプリに変換したことになります！

## Capacitorライブリロード

最新の開発フレームワークは通常ホットリロードを備えており、幸運なことに、Capacitorでも**モバイルデバイス上で**同様のことが可能です！

ローカルホストされたアプリケーションをライブリロードでネットワーク上でアクセス可能にするために、Capacitorアプリが特定のURLからコンテンツを読み込むようにできます。

最初に、ローカルIPアドレスを特定します。Macでは、ターミナルで`ipconfig getifaddr en0`を実行します。Windowsでは、`ipconfig`を実行し、IPv4アドレスを探します。

これが終わったら、`capacitor.config.ts`ファイルに別のパラメータを追加して、Capacitorにサーバーからアプリを直接読み込むよう指示します。

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

正確なIPとポートを使用することを確認してください。変更をネイティブプロジェクトに適用するために`npx cap copy`を実行します。

Android StudioまたはXcodeを通じて再度アプリをデプロイすると、Reactアプリの変更が自動的に再読み込みされ、アプリに表示されます！

新しいプラグイン、たとえばカメラがインストールされた場合、ネイティブプロジェクトの再ビルドが必要になることに注意してください。これは、ネイティブファイルが変更され、即時に更新できなくなるためです。

## Capacitorプラグインの使用

Capacitorプラグインの使用方法を簡単に見てみましょう。シンプルなプラグイン、[Shareプラグイン](https://capacitorjs.com/docs/apis/share/)をインストールして、ネイティブ共有ダイアログを表示します。

```shell
npm i @capacitor/share
```

使用するには、パッケージをインポートし、アプリから対応する`share()`関数を呼び出します。**App.js**を考えてみてください。

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

新しいプラグインをインストールした後は、`npx cap sync`を再度使ってReactプロジェクトを同期することを忘れないでください。

## Konsta UIの実装：より良い見た目のモバイルUI

より良い見た目のモバイルUI体験を得るために、Konsta UIを使用します。これにより、iOSおよびAndroid固有のスタイリングが提供され、作業が容易です。

Konsta UIを使用するために、Reactパッケージをインストールします。

```shell
npm i konsta
```

`tailwind.config.js`ファイルを次のように変更します。

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

`konstaConfig`は、Konsta UIに必要な追加のバリアントとユーティリティで、現在のTailwind CSS設定を補完します。

次に、テーマなどのグローバルパラメータを設定するために、主要なAppコンポーネントを設定します。`src/index.js`のメインアプリをAppでラップします。

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

React.jsページ内でKonsta UI Reactコンポーネントを使用しましょう。`src/App.js`を開いて、次のように変更します。

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

すべてが正しく行われていれば、ReactとKonsta UIの間でスムーズな統合が実現し、モバイルアプリにネイティブの見た目を与えることができるでしょう。

## 結論

Capacitorは、既存のウェブプロジェクトに基づいてネイティブアプリを構築するシームレスな手段を提供し、コードを共有し、一貫したUIを持つ簡単な方法を提供します。

Capacitorのような技術のおかげで、React.jsウェブアプリからモバイルアプリケーションを構築することはこれまでにないほど簡単になりました。あなたのウェブ開発スキルを次のレベルに引き上げて、印象的なネイティブモバイルアプリを作成してください。コーディングを楽しんでください！

アプリ開発プロセスを加速する方法についてもっと知りたい方は、[無料アカウントにサインアップ](/register/)してください。
