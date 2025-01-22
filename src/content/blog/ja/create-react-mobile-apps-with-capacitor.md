---
slug: ja__create-react-mobile-apps-with-capacitor
title: ReactとCapacitorを使用してモバイルアプリケーションを作成する
description: >-
  ReactとCapacitorを使用してモバイルアプリケーションを構築し、Konsta
  UIでネイティブユーザーインターフェースを強化する方法を学びましょう。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-02-21T00:00:00.000Z
updated_at: 2023-03-10T00:00:00.000Z
head_image: /react_capacitor.webp
head_image_alt: ReactとCapacitorのイラスト
tag: Tutorial
published: true
locale: ja
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

このチュートリアルでは、新しい [React](https://reactjsorg/) アプリケーションから始め、Capacitorを使用してネイティブモバイル開発に移行します。オプションとして、Tailwind CSSを使用した改善されたモバイルUIのために [Konsta UI](https://konstauicom/) を追加することもできます。

Capacitorを使用すると、Reactのウェブアプリケーションを大幅な修正や新しいスキル（React Nativeのような）を学ぶことなく、容易にネイティブモバイルアプリに変換できます。

わずか数ステップで、ほとんどのReactアプリケーションをモバイルアプリに変換できます。

このチュートリアルでは、最初に新しいReactアプリを作成し、その後Capacitorを組み込んでネイティブモバイルアプリの領域に移行するプロセスをガイドします。また、オプションとして [Konsta UI](https://konstauicom/) を使用して、Tailwind CSSでモバイルUIを強化することもできます。

## Capacitorについて

CapacitorJSはゲームチェンジャーです！どのウェブプロジェクトにも簡単に取り入れることができ、アプリケーションをネイティブウェブビューにラップし、ネイティブのXcodeとAndroid Studioプロジェクトを生成します。また、そのプラグインを使用すれば、JSブリッジを介してカメラなどのネイティブデバイス機能にアクセスできます。

Capacitorを使えば、複雑なセットアップや急な学習曲線なしに、素晴らしいネイティブモバイルアプリが手に入ります。そのシンプルなAPIと合理化された機能性により、プロジェクトに統合するのが容易になります。信じてください、Capacitorで完全に機能するネイティブアプリを達成するのがどれほど容易かに驚かされることでしょう！

## Reactアプリの準備

Reactアプリケーションを始める方法はいくつかありますが、このチュートリアルではブランクのReactアプリケーションを提供する最も簡単な方法を選びます。

```shell
npx create-react-app my-app
```

ネイティブモバイルアプリを作成するためには、プロジェクトの**エクスポート**が必要です。したがって、Reactプロジェクトをビルドしてエクスポートするために使用できる簡単なスクリプトを**packagejson**に追加しましょう：

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

これで、何も心配せずに `npm run build` を実行できるようになり、プロジェクトのルートで新しい出力フォルダーを見つけることができるはずです。

このフォルダーは後でCapacitorによって使用されますが、今のところ正しくセットアップする必要があります。

## ReactアプリにCapacitorを追加する

ウェブアプリをネイティブモバイルコンテナにパッケージするためには、いくつかの初期ステップを踏む必要がありますが、その後は単純な `sync` コマンドを実行するだけです。

まず、[Capacitor CLI](https://capacitorjscom/docs/cli/) を開発依存関係としてインストールし、その後プロジェクトにセットアップします。セットアップ中に、名前やバンドルIDのデフォルト値を受け入れるには「エンター」を押してください。

次に、iOSおよびAndroidプラットフォーム用のコアパッケージと関連パッケージをインストールする必要があります。

最後にプラットフォームを追加すると、Capacitorがプロジェクトのルートに各プラットフォーム用のフォルダーを作成します。

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

この時点で、Reactプロジェクト内に新しい **ios** および **android** フォルダーがあることを確認できるはずです。

**それらは本物のネイティブプロジェクトです！**

後でAndroidプロジェクトにアクセスするには、[Android Studio](https://developerandroidcom/studio/)をインストールする必要があります。iOSの場合はMacが必要で、[Xcode](https://developerapplecom/xcode/)をインストールする必要があります。

さらに、プロジェクト内には、同期時に使用される基本的なCapacitor設定が含まれた **capacitorconfigts** ファイルが見つかるはずです。注意すべき点は、**webDir**がビルドコマンドの結果を指している必要があることです。現在は不正確です。

これを修正するために、**capacitorconfigjson** ファイルを開き、**webDir** を更新します。

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "out",
  "bundledWebRuntime": false
}
```

次のコマンドを実行して試してみてください：

```shell
npm run build
npx cap sync
```

最初のコマンド `npm run build` は、単にReactプロジェクトをビルドし、静的ビルドをエクスポートします。

一方、2番目のコマンド `npx cap sync` は、すべてのウェブコードをネイティブプラットフォームの適切な場所に同期させ、アプリで表示できるようにします。

さらに、syncコマンドはネイティブプラットフォームを更新し、プラグインをインストールすることがあるため、新しい [Capacitorプラグイン](https://capacitorjscom/docs/plugins/) をインストールした場合は、再び `npx cap sync` を実行する時です。気づかないうちに、実際に完了しましたので、デバイス上でアプリを見てみましょう！

## ネイティブアプリのビルドとデプロイ

iOSアプリを開発するには、**Xcode**がインストールされている必要があります。また、Androidアプリの場合は**Android Studio**が必要です。さらに、アプリをアプリストアで配布する予定がある場合は、iOS用のApple Developer ProgramおよびAndroid用のGoogle Play Consoleに登録する必要があります。

ネイティブモバイル開発が初めての方は、Capacitor CLIを使用して、両方のネイティブプロジェクトを簡単に開くことができます：

```shell
npx cap open ios
npx cap open android
```

ネイティブプロジェクトのセットアップが完了したら、接続されたデバイスにアプリをデプロイするのは簡単です。Android Studioでは、すべてが準備が整うのを待つだけで、設定を変更せずに接続されたデバイスにアプリをデプロイできます。以下がその例です：

![android-studio-run](/android-studio-runwebp)

Xcodeでは、実際のデバイスにアプリをデプロイするためにサインインアカウントを設定する必要があります。まだこれを行っていない場合、Xcodeがプロセスをガイドします（繰り返しになりますが、Developer Programに登録している必要があります）。その後、接続されたデバイスでアプリを実行するためにプレイボタンを押すだけで、上部でデバイスを選択できます。以下がその例です：

![xcode-run](/xcode-runwebp)

おめでとうございます！あなたは成功裏にReactウェブアプリをモバイルデバイスにデプロイできました。以下がその例です：

<div class="mx-auto" style="width: 50%;">
  <img src="/next-capacitor-share.webp" alt="react-mobile-app">
</div>

しかし、開発中にはこれを行うためのより迅速な方法もあります。

## Capacitorライブリロード

今や、すべての現代的なフレームワークでホットリロードに慣れているでしょうが、良いニュースは、最小限の労力で**モバイルデバイス上でも同じ機能を持つことができる**ということです！

Capacitorアプリが特定のURLからコンテンツを読み込むことによって、**あなたのネットワーク上で**ライブリロードが可能なローカルホストされたアプリケーションへのアクセスを有効にします。

最初のステップは、ローカルIPアドレスを見つけることです。Macを使用している場合、ターミナルで次のコマンドを実行することでこれを見つけることができます：

```shell
ipconfig getifaddr en0
```

Windowsの場合は、次を実行します：

```shell
ipconfig
```

その後、IPv4アドレスを探します。

Capacitorにサーバーからアプリを直接読み込むよう指示するために、`capacitorconfigts`ファイルに別のエントリを追加します：

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

**正しいIPとポート**を使用してください。この例ではデフォルトのReactポートを使用しました。

これで、これらの変更をネイティブプロジェクトにコピーして適用できます：

```shell
npx cap copy
```

`copy`コマンドは`sync`と似ていますが、ネイティブプロジェクトを更新せずに**webフォルダーに加えた変更のみをコピー**します。

その後、Android StudioまたはXcodeを使ってアプリを再デプロイできます。その後、Reactアプリ内で何かを変更すると、**アプリが自動的にリロード**され、変更が表示されます！

**念のため**、カメラなどの新しいプラグインをインストールする場合は、ネイティブプロジェクトの再ビルドが必要です。これはネイティブファイルが変更されるためであり、即座には行えません。

構成で正しいIPとポートを使用することを忘れないでください。上記のコードブロックはデモ用にデフォルトのReactポートを示しています。

## Capacitorプラグインの使用

前にも何度か言及したCapacitorプラグインを使ってみましょう。これを行うために、次のコマンドを実行してかなりシンプルなプラグインをインストールできます：

```shell
npm i @capacitor/share
```

[Shareプラグイン](https://capacitorjscom/docs/apis/share/)に特別なものはありませんが、ネイティブの共有ダイアログを表示することができます！これを行うために、パッケージをインポートし、アプリから`share()`関数を呼び出すだけで済みます。**src/Appjs**を以下のように変更しましょう：

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

前述のように、新しいプラグインをインストールするときは、同期操作を行い、その後アプリをデバイスに再デプロイする必要があります。これを行うには、以下のコマンドを実行します：

```
npx cap sync
```

ボタンをクリックすると、美しいネイティブ共有ダイアログがアクションで見ることができます！

<div>
  <h1>
</h1>

ボタンをよりモバイルフレンドリーに見せるために、私のお気に入りのWebアプリ向けUIコンポーネントライブラリであるReactを使用してスタイリングを追加できます。

## Konsta UIの追加

私は数年間[Ionic](https://ionicframeworkcom/)を使用して、素晴らしいクロスプラットフォームアプリケーションを構築してきましたが、長年の中で最良の選択の一つでした。しかし、今ではもうお勧めしません。Reactとの統合は非常に面倒で、すでに[tailwindcss](https://tailwindcsscom/)がある場合、実際にはそれほど価値がありません。

iOSおよびAndroid特有のスタイリングに適応した美しいモバイルUIが必要な場合は、Konsta UIをお勧めします。

[tailwindがすでにインストールされている必要があります](https://tailwindcsscom/docs/guides/vite/#react) 

これを使用するためには、reactパッケージをインストールする必要があります：

```shell
npm i konsta
```

さらに、`tailwindconfigjs`ファイルを修正する必要があります：

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

`konstaConfig`は、Konsta UIに必要な追加のバリアントとヘルパーユーティリティで、デフォルト（またはカスタム）のTailwind CSS設定を拡張します。

今、グローバルパラメータ（例えば`theme`）を設定できるように、主な[App](https://konstauicom/react/app/)コンポーネントをセットアップする必要があります。

`src/Appjs`でアプリ全体を`App`でラップする必要があります：

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

### 例のページ

すべてが設定されたら、Reactアプリ内でKonsta UI Reactコンポーネントを使用できます。

例えば、`src/Appjs`を開いて、以下のように変更しましょう：

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

必要なすべてのコンポーネントをインストールした後にライブリロードが不調の場合は、すべてを再起動してみてください。それを行ったら、ReactとCapacitorで構築されたややネイティブな外観のモバイルアプリを見ることができるはずです！

結果として次のページが表示されるはずです：

<p>
  <h2>
</h2>

## 結論

Capacitorは、既存のWebプロジェクトに基づいてネイティブアプリケーションを構築するための優れたオプションで、コードを共有し、一貫したUIを維持する簡単な方法を提供します。

さらに、[Capgo](https://capgoapp/)の追加により、アプリにライブ更新を追加することがさらに簡単になり、ユーザーは常に最新の機能やバグ修正にアクセスできます。

ReactアプリにCapgoを追加する方法を学びたい場合は、次の記事を見てください：