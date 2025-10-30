---
slug: aggiornamento-automatico-con-quasar-e-capacitor
title: モバイルアプリのリアルタイム更新、QuasarとCapacitorでの開発
description: Quasar、Capacitor を使用したモバイルアプリの作成方法とリアルタイム更新の実装方法
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikDhabal'
created_at: 2023-09-14T00:00:00.000Z
updated_at: 2023-09-14T00:00:00.000Z
head_image: /quasar_capgo.webp
head_image_alt: Quasarと Capgoのイラストレーション
keywords: >-
  Quasar, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: ja
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
このチュートリアルでは、まず[Quasar](https://quasar.dev/)を使用して新しいWebアプリを作成します。その後、Capacitorを使用してモバイルアプリに変換する方法を学びます。モバイルでアプリをより良く見せたい場合に最適です。

Capacitorを使用すると、React Nativeのような全く新しいアプリ開発方法を学ぶ必要がなく、複雑な作業をせずにQuasarのWebアプリをモバイルアプリに変換できます。

このチュートリアルでは、新しいQuasarアプリから始めて、Capacitorを組み込んでネイティブモバイルアプリの領域に移行するプロセスを説明します。さらに、[Capgo](https://capgo.app/)を使用して、数秒でアプリにライブアップデートを送信することができます。

## Capacitorについて

CapacitorJSは真のゲームチェンジャーです！任意のWebプロジェクトに簡単に組み込むことができ、アプリケーションをネイティブWebViewにラップし、XcodeとAndroid Studioのプロジェクトを自動生成します。さらに、そのプラグインはJSブリッジを介してカメラなどのネイティブデバイス機能へのアクセスを提供します。

Capacitorを使用すると、複雑なセットアップや急な学習曲線なしで、素晴らしいネイティブモバイルアプリを手に入れることができます。スリムなAPIと合理化された機能により、プロジェクトへの統合が非常に簡単です。Capacitorで完全に機能するネイティブアプリを作成することがいかに簡単かに驚くことでしょう！

## Quasarアプリの準備

新しいQuasarアプリを作成するには、次のコマンドを実行します：

```shell
npm init quasar
```

![Quasar Project Setup](/quasar-setup.webp)

「App with Quasar CLI」オプションを選択し、次に「Quasar v2」を選択します。

ネイティブモバイルアプリを作成するには、プロジェクトの**エクスポート**が必要です。そのため、Quasarプロジェクトをビルドしてコピーするために使用できる簡単なスクリプトを**package.json**に追加しましょう：

```json
{
  "scripts": {
    // ...
    "build": "quasar build"
  }
}
```

`generate`コマンドを実行した後、プロジェクトのルートに新しい`dist`フォルダが表示されるはずです。

このフォルダは後でCapacitorによって使用されますが、現時点では正しく設定する必要があります。

## QuasarアプリにCapacitorを追加する

任意のWebアプリをネイティブモバイルコンテナにパッケージ化するには、最初にいくつかのステップを実行する必要がありますが、その後は単一の`sync`コマンドを実行するだけで済みます。

まず、[Capacitor CLI](https://capacitorjs.com/docs/cli/)を開発依存関係としてインストールし、プロジェクト内でセットアップします。セットアップ中は、名前とバンドルIDのデフォルト値を受け入れるために「Enter」を押すことができます。

次に、コアパッケージとiOSおよびAndroidプラットフォーム用の関連パッケージをインストールする必要があります。

最後に、プラットフォームを追加すると、Capacitorがプロジェクトのルートに各プラットフォーム用のフォルダを作成します：

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your Quasar project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

![Initialize Capacitor](/capacitor-init.webp)

この時点で、Quasarプロジェクトに新しい**ios**と**android**フォルダが表示されているはずです。

**これらは実際のネイティブプロジェクトです！**

後でAndroidプロジェクトにアクセスするには、[Android Studio](https://developer.android.com/studio/)をインストールする必要があります。iOSの場合は、Macが必要で[Xcode](https://developer.apple.com/xcode/)をインストールする必要があります。

さらに、プロジェクトに**capacitor.config.ts**ファイルが存在するはずです。このファイルには、同期中に使用される基本的なCapacitor設定が含まれています。注意が必要なのは**webDir**のみで、これはビルドコマンドの結果を指し示す必要があります。現在は不正確です。

これを修正するには、**capacitor.config.json**ファイルを開き、**webDir**を更新します：

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "dist"
}
```

以下のコマンドを実行して試してみることができます：

```shell
npm run generate
npx cap sync
```

最初のコマンド`npm run generate`はQuasarプロジェクトを単純にビルドして静的ビルドをコピーし、2番目のコマンド`npx cap sync`はすべてのWebコードをネイティブプラットフォームの適切な場所に同期してアプリで表示できるようにします。

さらに、同期コマンドはネイティブプラットフォームを更新してプラグインをインストールする可能性があるため、新しい[Capacitorプラグイン](https://capacitorjs.com/docs/plugins/)をインストールする際は、再度`npx cap sync`を実行する必要があります。

気付かないうちに実際に完了しているので、デバイスでアプリを確認してみましょう！

## ネイティブアプリのビルドとデプロイ

iOSアプリを開発するには**Xcode**が、Androidアプリを開発するには**Android Studio**がインストールされている必要があります。さらに、アプリストアでアプリを配布する予定がある場合は、iOSの場合はApple Developer Program、Androidの場合はGoogle Play Consoleに登録する必要があります。

ネイティブモバイル開発が初めての場合は、Capacitor CLIを使用して両方のネイティブプロジェクトを簡単に開くことができます：

```shell
npx cap open ios
npx cap open android
```

ネイティブプロジェクトをセットアップしたら、接続されたデバイスにアプリをデプロイするのは簡単です。Android Studioでは、すべての準備が整うのを待つだけで、設定を変更することなく接続されたデバイスにアプリをデプロイできます。例：

![android-studio-run](/android-studio-run.webp)

Xcodeでは、シミュレータだけでなく実際のデバイスにアプリをデプロイするために、署名アカウントを設定する必要があります。これを初めて行う場合、Xcodeがプロセスをガイドしてくれます（ただし、Developer Programに登録する必要があります）。その後、上部で選択できる接続されたデバイスでアプリを実行するために、単にプレイを押すだけです。例：

![xcode-run](/xcode-run.webp)

おめでとうございます！QuasarのWebアプリをモバイルデバイスに正常にデプロイしました。例：

<div class="mx-auto" style="width: 50%;">
  <img src="/Quasar-mobile.webp" alt="quasar-mobile-app">
</div>

しかし、開発中にはもっと速い方法もあります...

## Capgo Live Update

Capgo Live Updateは、開発者が従来のApp Store提出プロセスを経ることなく、モバイルアプリにアップデートをデプロイできるサービスです。これは、App Storeのレビュープロセスを待つことなく、バグを素早く修正したりアプリに小さな更新を加えたりするのに便利な方法です。

QuasarアプリへのCapgoの統合は、リアルタイムのライブアップデートの力を活用できる簡単なプロセスです。このステップバイステップガイドでは、Capgo Live Updateの統合と実装について説明し、シームレスなアップデートを提供できるようにします。

**サインアップしCapgoダッシュボードにアクセス**：

サインアップして、最初のバージョンをアップロードするためのAPIキーを取得する時です！まず、[Capgoアカウントにサインアップ](https://console.capgo.app/register/)してください。

**Capgo SDKのインストール**：

コマンドラインから、Capacitorアプリのルートに直接次のコマンドを実行します：

`npm i @capgo/capacitor-updater && npx cap sync` プラグインをCapacitorアプリにインストールします。

そして、CodePushの代わりに次のコードをアプリに追加します：

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

これにより、ネイティブプラグインにインストールが成功したことを伝えます。

**Capgo CLOUDにログイン**：

まず、アカウントに存在する`all` [apikey](https://console.capgo.app/dashboard/apikeys/)を使用してCLIでログインします：

    `npx @capgo/cli@latest login YOU_KEY`

**最初のアプリを追加**：

CLIでCapgo Cloudに最初のアプリを作成することから始めましょう。

```shell
    npx @capgo/cli@latest app add
```
このコマンドは、Capacitor設定ファイルで定義されたすべての変数を使用してアプリを作成します。

**最初のバージョンをアップロード**：

コードをビルドしてCapgoに送信するコマンドを実行します：

```shell
npx @capgo/cli@latest bundle upload`
```

デフォルトでは、バージョン名はpackage.jsonファイルのものが使用されます。

[Capgo](https://console.capgo.app/login/)でビルドが存在するか確認してください。

私の[モバイルサンドボックスアプリ](https://capgo.app/app_mobile/)でテストすることもできます。

**チャンネルをデフォルトに設定**：

アプリをCapgoに送信した後、アプリがCapgoからアップデートを受信できるようにチャンネルをデフォルトに設定する必要があります。

`npx @capgo/cli@latest channel set production -s default`

**アップデートを検証するようにアプリを設定**：

メインのJavaScriptファイルに次の設定を追加します。

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

その後、`npm run build && npx cap copy`を実行してアプリを更新します。

**ライブアップデートを受信**：

アプリがDeployからライブアップデートを受信するためには、デバイスまたはエミュレータでアプリを実行する必要があります。最も簡単な方法は、次のコマンドを使用してローカルアプリをエミュレータまたはコンピュータに接続されたデバイスで起動することです。

      npx cap run [ios | android]

アプリを開き、バックグラウンドに移動してから再度開くと、ログでアプリがアップデートを実行したことが確認できるはずです。

おめでとうございます！🎉 最初のライブアップデートの配信に成功しました。これはライブアップデートでできることの始まりに過ぎません。詳細については、完全な[ライブアップデートドキュメント](https://capgo.app/docs/plugin/cloud-mode/getting-started/)をご覧ください。

## Capacitorプラグインの使用

これまで何度か言及してきたCapacitorプラグインの実際の使用方法を見てみましょう。比較的シンプルなプラグインをインストールするには：

```shell
npm i @capacitor/share
```

[Shareプラグイン](https://capacitorjs.com/docs/apis/share/)には特別なものはありませんが、ネイティブの共有ダイアログを表示します！これには、パッケージをインポートしてアプリから対応する`share()`関数を呼び出すだけで済みます。**pages/index.vue**を次のように変更しましょう：

```html
<template>
  <div>
    <h1>Welcome to Quasar and Capacitor!</h1>
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

前述したように、新しいプラグインをインストールする際は、同期操作を実行してからアプリをデバイスに再デプロイする必要があります。これを行うには、次のコマンドを実行します：

```
npx cap sync
```

ボタンを押すと、美しいネイティブ共有ダイアログが動作するのを確認できます！

## オプションでKonsta UIを追加

QuasarアプリでKonsta UIを使用するには、[tailwindがすでにインストール](https://tailwindcss.com/docs/installation/)されている必要があり、パッケージをインストールする必要があります：

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

`pages/_app.vue`でアプリ全体を`App`でラップする必要があります：

```html
<template>
  <App theme="ios">
    <Quasar />
  </App>
</template>

<script setup>
import { App } from 'konsta/vue';
</script>
```

### 例ページ

すべてのセットアップが完了したら、QuasarページでKonsta UI Vueコンポーネントを使用できます。

例えば、`pages/index.vue`を開いて次の

```html
<template>
  <Page>
    <Navbar title="My App" />

    <Block strong>
      <p>
        Here is your Quasar & Konsta UI app. Let's see what we have here.
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

必要なコンポーネントをすべてインストールした後にライブリロードが同期していない場合は、すべてを再起動してみてください。それが完了すると、QuasarとCapacitorで構築された、ネイティブな外観のモバイルアプリが表示されるはずです！


## 結論

Capacitorは、既存のWebプロジェクトをベースにネイティブアプリケーションを構築するための優れたオプションで、コードの共有と一貫したUIの維持を簡単に実現できます。

そして、[Capgo](https://capgo.app/)を追加することで、アプリにライブアップデートを追加することがさらに容易になり、ユーザーが常に最新の機能とバグ修正にアクセスできるようになります。

Next.jsアプリにCapgoを追加する方法について学びたい場合は、次の記事をご覧ください：
