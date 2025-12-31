---
slug: create-react-mobile-apps-with-capacitor
title: モバイルアプリをReactとCapacitorで構築する
description: >-
  Reactとキャパシター（Capacitor）を使用してモバイルアプリを作成し、Konsta
  UIでネイティブのユーザーインターフェースを強化する方法を学びましょう。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-02-21T00:00:00.000Z
updated_at: 2023-03-10T00:00:00.000Z
head_image: /react_capacitor.webp
head_image_alt: Capacitor と React の説明
keywords: >-
  React, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: ja
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
このチュートリアルでは、新しい[React](https://reactjs.org/)アプリから始めて、Capacitorを使用してネイティブモバイル開発に移行します。オプションとして、[Konsta UI](https://konstaui.com/)を追加してTailwind CSSによるモバイルUIを改善することもできます。

Capacitorを使用すると、大きな変更やReact Nativeのような新しいスキルを学ぶことなく、ReactのWebアプリケーションを簡単にネイティブモバイルアプリに変換できます。

いくつかの簡単なステップで、ほとんどのReactアプリケーションをモバイルアプリに変換できます。

このチュートリアルでは、新しいReactアプリから始めて、Capacitorを組み込んでネイティブモバイルアプリの領域に移行するプロセスを案内します。さらに、オプションとして[Konsta UI](https://konstaui.com/)を使用してTailwind CSSでモバイルUIを強化することもできます。

## Capacitorについて

CapacitorJSは革新的です！どのWebプロジェクトにも簡単に組み込むことができ、アプリケーションをネイティブWebviewでラップし、XcodeとAndroid Studioのプロジェクトを生成します。さらに、そのプラグインはJSブリッジを介してカメラなどのネイティブデバイス機能へのアクセスを提供します。

Capacitorを使用すると、複雑なセットアップや急な学習曲線なしに、素晴らしいネイティブモバイルアプリを作成できます。スリムなAPIと効率的な機能により、プロジェクトへの統合が非常に簡単です。Capacitorで完全に機能するネイティブアプリを作成する簡単さに驚かれることでしょう！

## Reactアプリの準備

Reactアプリケーションを開始する方法は様々ありますが、このチュートリアルでは空のReactアプリケーションを提供する最も簡単な方法を選択しましょう：

```shell
npx create-react-app my-app
```

ネイティブモバイルアプリを作成するには、プロジェクトの**エクスポート**が必要です。そのため、Reactプロジェクトをビルドしてエクスポートするための簡単なスクリプトを**package.json**に含めましょう：

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

これで`npm run build`を安心して実行でき、プロジェクトのルートに新しいoutフォルダが表示されるはずです。

このフォルダは後でCapacitorによって使用されますが、今はそれを正しく設定する必要があります。

## ReactアプリにCapacitorを追加する

任意のWebアプリをネイティブモバイルコンテナにパッケージ化するには、最初にいくつかのステップを踏む必要がありますが、その後は単一の`sync`コマンドを実行するだけで済みます。

まず、開発依存関係として[Capacitor CLI](https://capacitorjs.com/docs/cli/)をインストールし、プロジェクト内でセットアップします。セットアップ中、名前とバンドルIDのデフォルト値を受け入れるにはEnterキーを押すだけです。

次に、コアパッケージとiOSおよびAndroidプラットフォーム用の関連パッケージをインストールする必要があります。

最後に、プラットフォームを追加すると、Capacitorがプロジェクトのルートに各プラットフォーム用のフォルダを作成します：

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

この時点で、Reactプロジェクトに新しい**ios**および**android**フォルダが表示されるはずです。

**これらは実際のネイティブプロジェクトです！**

後でAndroidプロジェクトにアクセスするには、[Android Studio](https://developer.android.com/studio/)をインストールする必要があります。iOSの場合は、Macが必要で[Xcode](https://developer.apple.com/xcode/)をインストールする必要があります。

さらに、同期中に使用される基本的なCapacitor設定を含む**capacitor.config.ts**ファイルがプロジェクトに存在するはずです。注意が必要な唯一のものは**webDir**で、ビルドコマンドの結果を指す必要があります。現在は不正確です。

これを修正するには、**capacitor.config.json**ファイルを開き、**webDir**を更新します：

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "out",
  "bundledWebRuntime": false
}
```

以下のコマンドを実行して試すことができます：

```shell
npm run build
npx cap sync
```

最初のコマンド`npm run build`は、単にReactプロジェクトをビルドして静的ビルドをエクスポートします。

2番目のコマンド`npx cap sync`は、すべてのWebコードをネイティブプラットフォームの適切な場所に同期して、アプリで表示できるようにします。

さらに、同期コマンドはネイティブプラットフォームを更新してプラグインをインストールする可能性があるので、新しい[Capacitorプラグイン](https://capacitorjs.com/docs/plugins/)をインストールした場合は、再度`npx cap sync`を実行する時です。

気付かないうちに実際に完了していますので、デバイスでアプリを確認してみましょう！

## ネイティブアプリのビルドとデプロイ

iOSアプリを開発するには**Xcode**が、Androidアプリを開発するには**Android Studio**がインストールされている必要があります。さらに、アプリをアプリストアで配布する予定がある場合は、iOSではApple Developer Program、AndroidではGoogle Play Consoleに登録する必要があります。

ネイティブモバイル開発が初めての場合は、Capacitor CLIを使用して両方のネイティブプロジェクトを簡単に開くことができます：

```shell
npx cap open ios
npx cap open android
```

ネイティブプロジェクトをセットアップしたら、接続されたデバイスにアプリをデプロイするのは簡単です。Android Studioでは、すべての準備が整うのを待つだけで、設定を変更することなく接続されたデバイスにアプリをデプロイできます。例：

![android-studio-run](/android-studio-run.webp)

Xcodeでは、シミュレータだけでなく実際のデバイスにアプリをデプロイするために、署名アカウントを設定する必要があります。これを初めて行う場合、Xcodeがプロセスを案内してくれます（ただし、Developer Programに登録している必要があります）。その後、上部で選択できる接続されたデバイスでアプリを実行するためにプレイを押すだけです。例：

![xcode-run](/xcode-run.webp)

おめでとうございます！ReactのWebアプリをモバイルデバイスに正常にデプロイしました。例：

<div class="mx-auto" style="width: 50%;">
  <img src="/next-capacitor-share.webp" alt="react-mobile-app">
</div>

しかし、開発中にはもっと速い方法もあります...

## Capacitorのライブリロード

現在では、すべての最新フレームワークでホットリロードを使用することに慣れているでしょう。そして良いニュースは、最小限の努力で**モバイルデバイス上で**同じ機能を使用できるということです！

特定のURLからコンテンツを読み込むようにCapacitorアプリを設定することで、ライブリロード機能を備えたローカルでホストされているアプリケーションに**ネットワーク上で**アクセスできるようになります。

最初のステップは、ローカルIPアドレスを確認することです。Macを使用している場合は、ターミナルで以下のコマンドを実行することで確認できます：

```shell
ipconfig getifaddr en0
```

Windowsでは、以下を実行します：

```shell
ipconfig
```

そしてIPv4アドレスを探します。

`capacitor.config.ts`ファイルにもう1つのエントリを追加することで、サーバーから直接アプリを読み込むようにCapacitorに指示できます：

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

必ず**正しいIPとポート**を使用してください。この例では、デフォルトのReactポートを使用しています。

これらの変更を適用するために、ネイティブプロジェクトにコピーできます：

```shell
npx cap copy
```

`copy`コマンドは`sync`に似ていますが、ネイティブプロジェクトを更新せずに、**Webフォルダーと設定に加えられた変更のみをコピー**します。

これで、Android StudioまたはXcodeを通じてアプリをもう一度デプロイできます。その後、Reactアプリで何か変更を加えると、**アプリは自動的にリロード**され、変更が表示されます！

**注意**として、カメラなどの新しいプラグインをインストールする場合は、依然としてネイティブプロジェクトの再ビルドが必要です。これは、ネイティブファイルが変更され、その場で行うことができないためです。

設定では正しいIPとポートを使用する必要があることに注意してください。上記のコードブロックは、デモンストレーション目的でデフォルトのReactポートを示しています。

## Capacitorプラグインの使用

以前から何度か言及してきたCapacitorプラグインの実際の使用方法を見てみましょう。これを行うために、以下のコマンドを実行して比較的シンプルなプラグインをインストールできます：

```shell
npm i @capacitor/share
```

[Shareプラグイン](https://capacitorjs.com/docs/apis/share/)には特別な機能はありませんが、ネイティブの共有ダイアログを表示します！これには、パッケージをインポートしてアプリから`share()`関数を呼び出すだけです。**src/App.js**を以下のように変更しましょう：

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

前述のように、新しいプラグインをインストールする際は、同期操作を実行してからデバイスにアプリを再デプロイする必要があります。これを行うには、以下のコマンドを実行します：

```
npx cap sync
```

ボタンを押すと、美しいネイティブ共有ダイアログが動作するのを確認できます！

<div>
  <h1>
</h1>

ボタンをよりモバイルフレンドリーに見せるために、私のお気に入りのWebアプリ用UIコンポーネントライブラリ - React（言葉遊びなし）を使用してスタイリングを追加できます。

## Konsta UIの追加

私は長年[Ionic](https://ionicframework.com/)を使用して素晴らしいクロスプラットフォームアプリケーションを構築してきました。それは長年最高の選択肢の1つでした。しかし今では推奨しません。Reactとの統合は非常にハッキー的で、すでに[tailwindcss](https://tailwindcss.com/)がある場合はそれほど価値がありません。

iOSとAndroid固有のスタイリングに適応する素晴らしい見た目のモバイルUIが必要な場合は、Konsta UIをお勧めします。

[tailwindをすでにインストール](https://tailwindcss.com/docs/guides/vite/#react)している必要があります

使用するには、reactパッケージをインストールするだけです：

```shell
npm i konsta
```

さらに、`tailwind.config.js`ファイルを修正する必要があります：

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

`konstaConfig`は、デフォルト（またはカスタム）のTailwind CSS設定を、Konsta UIに必要な追加のバリアントとヘルパーユーティリティで拡張します。

次に、いくつかのグローバルパラメータ（`theme`など）を設定できるように、メインの[App](https://konstaui.com/react/app/)コンポーネントをセットアップする必要があります。

`src/App.js`で`App`で全体をラップする必要があります：

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

### サンプルページ

すべてがセットアップされたので、ReactアプリでKonsta UI Reactコンポーネントを使用できます。

例えば、`src/App.js`を開いて以下のように変更してみましょう：

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

必要なコンポーネントをすべてインストールした後にライブリロードが同期していない場合は、すべてを再起動してみてください。それが完了すると、ReactとCapacitorで構築された、ややネイティブな外観のモバイルアプリが表示されるはずです！

結果として以下のページが表示されるはずです：

<p>
  <h2>
</h2>

## 結論

Capacitorは、既存のWebプロジェクトに基づいてネイティブアプリケーションを構築するための優れたオプションであり、コードを共有し一貫したUIを維持する簡単な方法を提供します。

[Capgo](https://capgo.app/) を追加することで、アプリにライブアップデートを追加することがさらに簡単になり、ユーザーが常に最新の機能やバグ修正にアクセスできるようになります。

Capgoを Reactアプリに追加する方法については、次の記事をご覧ください：
