---
slug: costruire-una-app-mobile-nativa-con-nuxt-3-e-capacitor
title: Nuxt 3とCapacitorでモバイルアプリを作成する
description: Nuxt 3、Capacitor、Konsta UIのネイティブUIを実装したモバイルアプリの作り方
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-03T00:00:00.000Z
updated_at: 2023-06-03T00:00:00.000Z
head_image: /nuxt_capgo.webp
head_image_alt: Nuxt 3とCapgoのイラストレーション
keywords: >-
  Nuxt 3, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: ja
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
このチュートリアルでは、新しい[Nuxt 3](https://nuxtjs.org/)アプリから始めて、Capacitorを使用してネイティブの領域に移行し、最終的には[Konsta UI](https://konstaui.com/)を追加してTailwind CSSモバイルUIを改善します（最後のステップは完全にオプションです）。

Capacitorを使用することで、React Nativeのような新しいスキルを学ぶ必要や大きな修正を必要とせずに、Nuxt 3のWebアプリケーションを簡単にネイティブモバイルアプリに変換できます。

わずか数ステップで、ほとんどのNuxt 3アプリケーションをモバイルアプリに変換できます。

このチュートリアルでは、新しいNuxt 3アプリから始めて、Capacitorを組み込んでネイティブモバイルアプリの領域に移行するプロセスをガイドします。さらに、オプションとして[Konsta UI](https://konstaui.com/)を使用してTailwind CSSでモバイルUIを強化することもできます。

## Capacitorについて

CapacitorJSは本当に革新的です！任意のWebプロジェクトに簡単に組み込むことができ、アプリケーションをネイティブWebviewでラップし、XcodeとAndroid Studioのプロジェクトを生成します。さらに、そのプラグインはJSブリッジを介してカメラなどのネイティブデバイス機能へのアクセスを提供します。

Capacitorを使用すると、複雑なセットアップや急な学習曲線なしに素晴らしいネイティブモバイルアプリを得ることができます。スリムなAPIと合理化された機能により、プロジェクトへの統合が非常に簡単です。Capacitorで完全に機能するネイティブアプリを実現する簡単さに驚くことでしょう！

## Nuxt 3アプリの準備

新しいNuxt 3アプリを作成するには、以下のコマンドを実行します：

```shell
npx nuxi init my-app
cd my-app
npm install
```

Nuxtバージョンの選択を求められたら「Nuxt 3」を選択してください。

ネイティブモバイルアプリを作成するには、プロジェクトの**エクスポート**が必要です。そのため、Nuxtプロジェクトをビルドしてコピーするための簡単なスクリプトを**package.json**に含めましょう：

```json
{
  "scripts": {
    // ...
    "generate": "nuxt generate"
  }
}
```

`generate`コマンドを実行した後、プロジェクトのルートに新しい`dist`フォルダが表示されるはずです。

このフォルダは後でCapacitorによって使用されますが、今のところ正しく設定する必要があります。

## Nuxt 3アプリへのCapacitorの追加

任意のWebアプリをネイティブモバイルコンテナにパッケージ化するには、最初にいくつかのステップを踏む必要がありますが、その後は単一の`sync`コマンドを実行するだけで済みます。

まず、[Capacitor CLI](https://capacitorjs.com/docs/cli/)を開発依存関係としてインストールし、プロジェクト内でセットアップします。セットアップ中、名前とバンドルIDのデフォルト値を受け入れるにはEnterキーを押すだけです。

次に、コアパッケージとiOSおよびAndroidプラットフォーム用の関連パッケージをインストールする必要があります。

最後に、プラットフォームを追加すると、Capacitorがプロジェクトのルートに各プラットフォーム用のフォルダを作成します：

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your Nuxt project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

この時点で、Nuxt 3プロジェクトに新しい**ios**と**android**フォルダが表示されているはずです。

**これらは実際のネイティブプロジェクトです！**

後でAndroidプロジェクトにアクセスするには、[Android Studio](https://developer.android.com/studio/)をインストールする必要があります。iOSの場合は、Macが必要で[Xcode](https://developer.apple.com/xcode/)をインストールする必要があります。

また、プロジェクトに**capacitor.config.ts**ファイルが存在し、同期中に使用される基本的なCapacitor設定が含まれています。注意が必要なのは**webDir**だけで、これはビルドコマンドの結果を指している必要があります。現在は不正確です。

これを修正するには、**capacitor.config.json**ファイルを開いて**webDir**を更新します：

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "dist"
}
```

以下のコマンドを実行して試すことができます：

```shell
npm run generate
npx cap sync
```

最初のコマンド`npm run generate`は単にNuxt 3プロジェクトをビルドして静的ビルドをコピーし、2番目のコマンド`npx cap sync`はすべてのWebコードをネイティブプラットフォームの適切な場所に同期してアプリで表示できるようにします。

さらに、同期コマンドはネイティブプラットフォームを更新しプラグインをインストールする可能性があるので、新しい[Capacitorプラグイン](https://capacitorjs.com/docs/plugins/)をインストールした際は`npx cap sync`を再度実行する時です。

気付かないうちに、実際に完了しているので、デバイスでアプリを確認してみましょう！

## ネイティブアプリのビルドとデプロイ

iOSアプリを開発するには**Xcode**が、Androidアプリを開発するには**Android Studio**がインストールされている必要があります。さらに、アプリをアプリストアで配布する予定がある場合は、iOSではApple Developer Program、AndroidではGoogle Play Consoleに登録する必要があります。

ネイティブモバイル開発が初めての場合は、Capacitor CLIを使用して両方のネイティブプロジェクトを簡単に開くことができます：

```shell
npx cap open ios
npx cap open android
```

ネイティブプロジェクトをセットアップしたら、接続されたデバイスにアプリをデプロイするのは簡単です。Android Studioでは、すべての準備が整うのを待つだけで、設定を変更せずに接続されたデバイスにアプリをデプロイできます。例：

![android-studio-run](/android-studio-run.webp)

Xcodeでは、シミュレータだけでなく実際のデバイスにアプリをデプロイするために、署名アカウントを設定する必要があります。これを初めて行う場合、Xcodeがプロセスをガイドしてくれます（ただし、Developer Programへの登録が必要です）。その後、上部で選択できる接続されたデバイスでアプリを実行するために、単にplayを押すだけです。例：

![xcode-run](/xcode-run.webp)

おめでとうございます！Nuxt 3のWebアプリをモバイルデバイスに正常にデプロイしました。例：

<div class="mx-auto" style="width: 50%;">
  <img src="/nuxtjs-mobile-app.webp" alt="nuxtjs-mobile-app">
</div>

しかし、開発中にはもっと速い方法もあります...

## Capacitorのライブリロード

現在では、すべての最新フレームワークでホットリロードが当たり前になっていますが、良いニュースは、最小限の努力で**モバイルデバイス上**でも同じ機能を持つことができるということです！

特定のURLからコンテンツを読み込むようにCapacitorアプリを設定することで、ライブリロード機能付きで**ネットワーク上**でローカルにホストされたアプリケーションへのアクセスを有効にします。

最初のステップは、ローカルIPアドレスを確認することです。Macを使用している場合は、ターミナルで以下のコマンドを実行して確認できます：

```shell
ipconfig getifaddr en0
```

Windowsの場合は以下を実行します：

```shell
ipconfig
```

そしてIPv4アドレスを探します。

`capacitor.config.ts`ファイルに別のエントリを追加することで、サーバーから直接アプリを読み込むようにCapacitorに指示できます：

```javascript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.x.xx:3000',
    cleartext: true
  }
};

export default config;
```

この例ではNuxt 3のデフォルトポートを使用していますが、**正しいIPとポート**を使用してください。

これらの変更を適用するために、ネイティブプロジェクトにコピーできます：

```shell
npx cap copy
```

`copy`コマンドは`sync`に似ていますが、ネイティブプロジェクトを更新せずに、**Webフォルダと設定に加えられた変更のみをコピー**します。

これで、Android StudioまたはXcodeを通じてアプリを再度デプロイできます。その後、Nuxtアプリで何か変更を加えると、**アプリは自動的にリロード**され、変更が表示されます！

**注意**として、カメラなどの新しいプラグインをインストールする場合は、依然としてネイティブプロジェクトの再ビルドが必要です。これは、ネイティブファイルが変更され、その場での変更ができないためです。

設定では正しいIPとポートを使用する必要があることに注意してください。上記のコードブロックはデモンストレーション目的でNuxt 3のデフォルトポートを示しています。

## Capacitorプラグインの使用

以前から何度か言及してきたCapacitorプラグインの実際の使用方法を見てみましょう。比較的シンプルなプラグインをインストールするには、以下を実行します：

```shell
npm i @capacitor/share
```

[Shareプラグイン](https://capacitorjs.com/docs/apis/share/)には特別なものはありませんが、ネイティブの共有ダイアログを表示します！これには、パッケージをインポートしてアプリから対応する`share()`関数を呼び出すだけで済みます。**pages/index.vue**を以下のように変更しましょう：

```html
<template>
  <div>
    <h1>Welcome to Nuxt 3 and Capacitor!</h1>
    <button @click="share">Share now!</button>
  </div>
</template>

<script setup lang="ts">
import { Share } from '@capacitor/share';

async function share() {
  await Share.share({
    title: 'Open Youtube',
    text: 'Check new video on youtube',
    url: 'https://www.youtube.com',
    dialogTitle: 'Share with friends'
  });
}
</script>
```

先ほど述べたように、新しいプラグインをインストールする際は、同期操作を実行してからデバイスにアプリを再デプロイする必要があります。これを行うには、以下のコマンドを実行します：

```
npx cap sync
```

ボタンを押すと、美しいネイティブ共有ダイアログが動作するのを確認できます！

## Konsta UIの追加

Nuxt 3アプリでKonsta UIを使用するには、[tailwindがすでにインストール](https://tailwindcss.com/docs/guides/nuxtjs/)されている必要があり、パッケージをインストールする必要があります：

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
    './pages/**/*.{vue}',
    './components/**/*.{vue}',
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

次に、グローバルパラメータ（`theme`など）を設定できるように、メインの[App](https://konstaui.com/vue/app/)コンポーネントをセットアップする必要があります。

`pages/_app.vue`で、アプリ全体を`App`でラップする必要があります：

```html
<template>
  <App theme="ios">
    <Nuxt />
  </App>
</template>

<script setup>
import { App } from 'konsta/vue';
</script>
```

### サンプルページ

すべてのセットアップが完了したら、Nuxt 3ページでKonsta UI Vueコンポーネントを使用できます。

例えば、`pages/index.vue`を開いて以下のように変更しましょう：

```html
<template>
  <Page>
    <Navbar title="My App" />

    <Block strong>
      <p>
        Here is your Nuxt 3 & Konsta UI app. Let's see what we have here.
      </p>
    </Block>
    <BlockTitle>Navigation</BlockTitle>
    <List>
      <ListItem href="/about/" title="About" />
      <ListItem href="/form/" title="Form" />
    </List>

    <Block strong class="flex space-x-4">
      <Button>Button 1</Button>
      <Button>Button 2</Button>
    </Block>
  </Page>
</template>

<script setup>
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListItem,
  Link,
  BlockTitle,
} from 'konsta/vue';
</script>
```

必要なコンポーネントをすべてインストールした後にライブリロードが同期していない場合は、すべてを再起動してみてください。それが完了すると、Nuxt 3とCapacitorで構築された、ややネイティブな外観のモバイルアプリが表示されるはずです！

結果として以下のページが表示されるはずです：

<template>
  <div>
<h1>

## 結論

Capacitorは、既存のWebプロジェクトをベースにネイティブアプリケーションを構築するための優れたオプションで、コードを共有し一貫したUIを維持する簡単な方法を提供します。

そして[Capgo](https://capgo.app/)を追加することで、アプリにライブアップデートを追加することがさらに簡単になり、ユーザーが常に最新の機能とバグ修正にアクセスできるようになります。

Next.jsアプリにCapgoを追加する方法について学びたい場合は、次の記事をご覧ください：

## クレジット

Simonに大変感謝します。この記事は[この記事](https://devdactic.com/nextjs-and-capacitor/)をベースに、chat-gpt-4でnuxt3用に書き直し、適応させたものです。
