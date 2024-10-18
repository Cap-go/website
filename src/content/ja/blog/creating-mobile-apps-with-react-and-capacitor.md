---
slug: creating-mobile-apps-with-react-and-capacitor
title: Pure React.jsとCapacitorを使用したモバイルアプリケーションの作成
description: >-
  React.jsウェブアプリケーションをCapacitorを使用してネイティブモバイルアプリケーションに変換し、Konsta
  UIでネイティブユーザーインターフェースを強化する方法に関するガイド。
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-29T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /react_capacitor.webp
head_image_alt: React.jsとCapacitorのイラスト
tag: Tutorial
published: true
locale: ja
next_blog: implementing-live-updates-in-your-react-capacitor-app
---

このチュートリアルでは、React、Capacitor、およびKonsta UIを使用してモバイルアプリケーションを作成する方法を説明します。最後には、ReactjsウェブアプリをCapacitorを使ってネイティブモバイルアプリに変換し、Konsta UIを使用してネイティブUIを実装する方法を学ぶことができます。

Capacitorは、Reactjsウェブアプリをネイティブモバイルアプリに簡単に変換できるようにします。新たな戦略を学ぶことや、大幅な変更は必要ありません。React Nativeのようなこともありません。

プロセスは数ステップで簡単であり、あなたのReactjsアプリはフル機能のモバイルアプリになります。それでは、この旅に参加してください。

## Capacitorの概要

CapacitorJSはゲームチェンジャーです。ウェブプロジェクトにシームレスに統合され、ネイティブWebViewにアプリをラップし、ネイティブのXcodeおよびAndroid Studioプロジェクトを生成します。また、プラグインを通じて、JSブリッジを介してカメラなどのデバイスのネイティブ機能にアクセスできます。

Capacitorは、手間や急な学習曲線なしにネイティブモバイルアプリケーションを作成するための簡単な方法を提供します。シンプルなAPIと合理化された機能により、プロジェクトに組み込みやすくなっています。

## Reactjsアプリのセットアップ

Reactアプリケーションを開始する最も簡単な方法を見てみましょう。npmパッケージマネージャーを使用して新しいReactアプリを作成します。

```shell
npx create-react-app my-app
```

プロジェクトをネイティブモバイルアプリに変換するには、アプリの**エクスポート**が必要です。

次に、CapacitorをReactアプリに統合する方法を理解しましょう。

## ReactjsアプリへのCapacitorの統合

初期セットアップ手順は少し詳細ですが、その後はネイティブアプリラッパーの更新が`sync`コマンドを実行するだけの簡単な手順になります。

最初に、開発依存関係としてCapacitor CLIをインストールし、プロジェクト内で設定します。設定中は、名前とバンドルIDのデフォルト値を受け入れて「エンター」を押します。

次に、コアパッケージとiOSおよびAndroidプラットフォーム用の関連パッケージをインストールします。

最後に、プラットフォームを追加し、Capacitorはプロジェクトルートに各プラットフォーム用のフォルダーを作成します。

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

**ios**および**android**ディレクトリがReactjsプロジェクトに表示されるようになりました。

後でAndroidプロジェクトにアクセスするために、[Android Studio](https://developerandroidcom/studio/)をインストールしてください。iOSの場合、Macを必要とし、[Xcode](https://developerapplecom/xcode/)をインストールする必要があります。

次に、**capacitorconfigjson**ファイルの**webDir**を以下のように更新します。

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

`npm run build`コマンドはあなたのReactjsプロジェクトをビルドし、`npx cap sync`はネイティブプラットフォームの正しい場所にウェブコードを整列させ、アプリ内で実行できるようにします。

運が良ければエラーがなければ、あなたのReactjsアプリはデバイスでの起動の準備が整っているはずです！

## ネイティブアプリのビルドとデプロイ

iOSアプリを開発するには**Xcode**が必要で、Androidアプリには**Android Studio**が必要です。アプリをアプリストアで配布する予定がある場合は、iOS用のApple Developer ProgramおよびAndroid用のGoogle Play Consoleに登録する必要があります。

Capacitor CLIは両方のネイティブプロジェクトを開くプロセスを簡素化します。

```shell
npx cap open ios
npx cap open android
```

ネイティブプロジェクトが設定されたら、接続されたデバイスにアプリをデプロイするのは簡単なプロセスです。

Android Studioでは、すべてが読み込まれるのを待ち、その後接続されたデバイスにアプリをデプロイします。

Xcodeでは、実際のデバイスにアプリをデプロイするために署名アカウントを確立します。その後、単に再生ボタンを押して連結されたデバイスでアプリを実行することができます。

すべてが順調であれば、あなたはReactを変換したことになります。jsウェブアプリをネイティブモバイルアプリケーションに変換！

## Capacitorライブリロード

現代の開発フレームワークは通常ホットリロードを備えており、幸運なことにCapacitorでも**あなたのモバイルデバイス上で**同じことができます！

Capacitorアプリを特定のURLからコンテンツを読み込ませることで、ローカルホストされたアプリケーションをネットワーク上でライブリロード可能にすることができます。

まず、ローカルIPアドレスを特定します。Macの場合、ターミナルで`ipconfig getifaddr en0`を実行します。Windowsの場合は`ipconfig`を実行し、IPv4アドレスを探します。

その後、`capacitorconfig.ts`ファイルに別のパラメータを追加して、Capacitorにサーバーからアプリを直接読み込むよう指示します：

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

正確なIPとポートを使用することを忘れないでください。`npx cap copy`を実行して、これらの変更をネイティブプロジェクトに適用します。

Android StudioまたはXcodeを通じてアプリをもう一度デプロイすると、Reactアプリ内の変更が自動的にリロードされ、アプリに表示されます！

新しいプラグイン（カメラなど）がインストールされると、ネイティブプロジェクトの再ビルドが必要になることに注意してください。これは、ネイティブファイルが変更され、即座に更新できないためです。

## Capacitorプラグインの使用

Capacitorプラグインの使用方法を簡単に見てみましょう。ネイティブシェアダイアログを表示するシンプルな[Shareプラグイン](https://capacitorjscom/docs/apis/share/)をインストールします：

```shell
npm i @capacitor/share
```

これを使用するには、パッケージをインポートし、アプリから適切な`share()`関数を呼び出します。**App.js**を考慮してください：

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

新しいプラグインをインストールした後、`npx cap sync`を使用してReactプロジェクトを再度同期するのを忘れないでください。

## Konsta UIの実装：より良いモバイルUI

より良いモバイルUIエクスペリエンスのために、Konsta UIを使用します。iOSおよびAndroid特有のスタイリングを提供し、扱いやすいです。

Konsta UIを使用するには、Reactパッケージをインストールします：

```shell
npm i konsta
```

`tailwind.config.js`ファイルを以下のように修正します：

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

`konstaConfig`は、Konsta UIに必要な追加のバリアントとユーティリティを既存のTailwind CSS設定に補充します。

次に、`theme`などのグローバルパラメータを設定するために、主要なAppコンポーネントを設定します。`src/index.js`でメインアプリをAppでラップします：

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

React.jsページでKonsta UI Reactコンポーネントを使用しましょう。`src/App.js`を開き、以下のように修正します：

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

すべてが正しく行われていれば、ReactとKonsta UIの間の統合がスムーズに行われ、モバイルアプリにネイティブな外観を与えることができるはずです。

## 結論

Capacitorは、既存のウェブプロジェクトに基づいてネイティブアプリを構築するシームレスな手段を提供し、コードの共有や一貫したUIを簡単に行う方法を提供します。

Capacitorのような技術のおかげで、React.jsウェブアプリからモバイルアプリケーションを構築することはこれまでになく簡単です。印象的なネイティブモバイルアプリを作成して、ウェブ開発スキルを次のレベルに引き上げましょう。 Happy coding！

アプリ開発プロセスを迅速化する方法についての詳細は、[無料アカウントにサインアップ](/register/)してください。