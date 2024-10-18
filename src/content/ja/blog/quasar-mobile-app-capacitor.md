---
slug: live-update-with-quasar-and-capacitor
title: ライブアップデート、Quasar、Capacitorを使用してモバイルアプリケーションを作成する。
description: QuasarとCapacitorを使用してモバイルアプリケーションを作成し、ライブアップデートを実装する方法。
author: Anik Dhabal Babu
author_url: 'https://x.com/anikDhabal'
created_at: 2023-09-14T00:00:00.000Z
updated_at: 2023-09-14T00:00:00.000Z
head_image: /quasar_capgo.webp
head_image_alt: クエーサーとキャプゴのイラスト
tag: Tutorial
published: true
locale: ja
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

このチュートリアルでは、[Quasar](https://quasardev/) を使用して新しいウェブアプリを作成することから始めます。後に、Capacitorを使用してそれをモバイルアプリに変換する方法を学びます。アプリをモバイルでより良く見せたい場合は、Capacitorを使うことで、Quasarのウェブアプリを多くの難しいことや、React Nativeなどの全く新しい方法を学ぶことなく、モバイルアプリに変換できます。

このチュートリアルでは、新しいQuasarアプリから始め、次にCapacitorを組み込んでネイティブモバイルアプリの領域に移行するプロセスを案内します。さらに、[Capgo](https://capgoapp/)を使用して、数秒でアプリにライブアップデートを送信します。

## Capacitorについて

CapacitorJSは本当にゲームチェンジャーです！どんなウェブプロジェクトにも簡単に組み込むことができ、アプリケーションをネイティブウェブビューにラップし、ネイティブのXcodeおよびAndroid Studioプロジェクトを生成します。さらに、プラグインを使用して、カメラなどのネイティブデバイス機能へのアクセスがJSブリッジを介して提供されます。

Capacitorを使うことで、複雑なセットアップや急な学習曲線なしに素晴らしいネイティブモバイルアプリが手に入ります。そのスリムなAPIと効率的な機能により、プロジェクトへの統合が非常に簡単です。完全に機能するネイティブアプリをCapacitorで実現するのがどれほど簡単であるかに驚くでしょう！

## Quasarアプリの準備

新しいQuasarアプリを作成するには、次のコマンドを実行します：

```shell
npm init quasar
```

![Quasarプロジェクトセットアップ](/quasar-setupwebp)

「Quasar CLIを使ったアプリ」オプションを選択し、その後「Quasar v2」を選びます。

ネイティブモバイルアプリを作成するために、プロジェクトの**エクスポート**が必要です。そこで、Quasarプロジェクトをビルドしてコピーするために使用できるシンプルなスクリプトを**package.json**に含めましょう：

```json
{
  "scripts": {
    // ...
    "build": "quasar build"
  }
}
```

`generate`コマンドを実行した後、プロジェクトのルートに新しい`dist`フォルダーが表示されるはずです。

このフォルダーは後でCapacitorによって使用されますが、今のところ、正しく設定する必要があります。

## QuasarアプリにCapacitorを追加

ウェブアプリをネイティブモバイルコンテナにパッケージするには、最初にいくつかのステップを踏む必要がありますが、その後は単一の`sync`コマンドを実行するだけで簡単になります。

まず、[Capacitor CLI](https://capacitorjscom/docs/cli/)を開発依存関係としてインストールし、その後プロジェクト内で設定します。セットアップ中に、名前とバンドルIDのデフォルト値を受け入れるために「Enter」を押してください。

次に、コアパッケージとiOSおよびAndroidプラットフォームの関連パッケージをインストールする必要があります。

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

![Capacitorの初期化](/capacitor-initwebp)

この時点で、Quasarプロジェクトに新しい**ios**および**android**フォルダが表示されるはずです。

**それらは本物のネイティブプロジェクトです！**

後でAndroidプロジェクトにアクセスするには、[Android Studio](https://developerandroidcom/studio/)をインストールする必要があります。iOS用にはMacが必要で、[Xcode](https://developerapplecom/xcode/)をインストールする必要があります。

さらに、プロジェクトには**capacitorconfig.ts**ファイルが含まれており、これは同期中に使用される基本的なCapacitor設定が含まれています。注意を払う必要があるのは**webDir**であり、これはビルドコマンドの結果を指す必要があります。現在は不正確です。

これを修正するために、**capacitorconfig.json**ファイルを開き、**webDir**を更新してください：

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "dist"
}
```

次のコマンドを実行して試してみることができます：

```shell
npm run generate
npx cap sync
```

最初のコマンド`npm run generate`は、単にQuasarプロジェクトをビルドして静的ビルドをコピーし、2番目のコマンド`npx cap sync`は、すべてのウェブコードをネイティブプラットフォームの適切な場所に同期させ、アプリに表示できるようにします。

さらに、syncコマンドはネイティブプラットフォームを更新し、プラグインをインストールすることがありますので、新しい[Capacitorプラグイン](https://capacitorjscom/docs/plugins/)をインストールした際には再度`npx cap sync`を実行する時が来たということです。気づかないうちに、実際に終わったので、デバイスでアプリを見てみましょう！

## ネイティブアプリの構築とデプロイ

iOSアプリを開発するには、**Xcode**がインストールされている必要があり、Androidアプリには**Android Studio**が必要です。また、アプリをアプリストアで配布する予定がある場合は、iOSのためのApple Developer ProgramとAndroidのためのGoogle Play Consoleに登録する必要があります。

ネイティブモバイル開発が初めての場合は、Capacitor CLIを使用して両方のネイティブプロジェクトを簡単に開くことができます。

```shell
npx cap open ios
npx cap open android
```

ネイティブプロジェクトのセットアップが完了すると、接続されたデバイスへのアプリのデプロイは簡単です。Android Studioでは、すべてが準備できるのを待つだけで、設定を変更せずに接続されたデバイスにアプリをデプロイできます。以下はその例です：

![android-studio-run](/android-studio-runwebp)

Xcodeでは、シミュレーターではなく実際のデバイスにアプリをデプロイするために、署名アカウントを設定する必要があります。これを初めて行う場合、Xcodeはプロセスを案内してくれます（ただし、再度、Developer Programに登録している必要があります）。その後、接続されたデバイスでアプリを実行するために再生ボタンを押すだけです。デバイスは上部で選択できます。以下はその例です：

![xcode-run](/xcode-runwebp)

おめでとうございます！あなたはQuasarウェブアプリをモバイルデバイスに成功裏にデプロイしました。以下はその例です：

<div class="mx-auto" style="width: 50%;">
  <img src="/Quasar-mobile.webp" alt="quasar-mobile-app">
</div>

しかし、開発中にこれを行うためのより早い方法もあります。

## Capgo Live Update

Capgo Live Updateは、開発者が従来のApp Storeの提出プロセスを経ることなくモバイルアプリに更新をデプロイできるサービスです。これにより、アプリのバグを迅速に修正したり、App Storeの審査プロセスを待たずに小さな更新を行ったりするのに便利です。

CapgoをQuasarアプリに統合するのは簡単なプロセスで、リアルタイムのライブ更新を活用する力をあなたに与えます。このステップバイステップガイドでは、Capgo Live Updateの統合と実装を案内し、シームレスな更新を提供できるようにします。

**サインアップしてCapgoダッシュボードにアクセス**:

サインアップして、最初のバージョンをアップロードするためのAPIキーを取得する時です！まず、[Capgoアカウントにサインアップ](https://webcapgoapp/register/)してください。

**Capgo SDKのインストール**:

コマンドラインから、Capacitorアプリのルートに直接移動し、次のコマンドを実行します：

`npm i @capgo/capacitor-updater && npx cap sync` これにより、Capacitorアプリにプラグインがインストールされます。

次に、CodePushのコードを置き換える形でアプリにこのコードを追加します：

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

これにより、ネイティブプラグインにインストールが成功したことを伝えます。

**Capgo CLOUDにログイン**:

まず、`all` [APIキー](https://webcapgoapp/dashboard/apikeys/)を使用してCLIでログインします：

    `npx @capgo/cli@latest login YOUR_KEY`

**最初のアプリを追加**:

まず、CLIを使ってCapgo Cloudにアプリを作成して始めましょう。

```shell
    npx @capgo/cli@latest app add
```
このコマンドは、Capacitor設定ファイルで定義されたすべての変数を使用してアプリを作成します。

**最初のバージョンをアップロード**:

次のコマンドを実行して、コードをビルドし、Capgoに送信します：

```shell
npx @capgo/cli@latest bundle upload`
```

デフォルトでは、バージョン名はpackagejsonファイルのものになります。

[Capgo](https://webcapgoapp/login/)でビルドが存在するか確認してください。

私の[モバイルサンドボックスアプリ](https://capgoapp/app_mobile/)でテストすることもできます。

**チャンネルをデフォルトに設定**:

アプリをCapgoに送信した後、アプリがCapgoから更新を受信できるようにチャンネルをデフォルトに設定する必要があります。

`npx @capgo/cli@latest channel set production -s default`

**更新を検証するためのアプリの設定**:

メインのJavaScriptファイルにこの設定を追加してください。

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

その後、`npm run build && npx cap copy`を実行してアプリを更新します。

**ライブアップデートを受信**:

アプリケーションがDeployからライブアップデートを受信するには、デバイスまたはエミュレーターでアプリを実行する必要があります。これを行う最も簡単な方法は、次のコマンドを使用してコンピュータに接続されたデバイスまたはエミュレーターでローカルアプリを起動することです。```
npx cap run [ios | android]

アプリを開いて、バックグラウンドに入れ、再度開くと、ログにアプリが更新を行ったことが表示されるはずです。

おめでとうございます！ 🎉 あなたは初めてのライブアップデートを成功裏にデプロイしました。これはライブアップデートでできることの始まりにすぎません。詳細を学ぶには、完全な[ライブアップデートのドキュメント](https://capgoapp/docs/plugin/cloud-mode/getting-started/)をご覧ください。

## Capacitorプラグインの使用

これまで何度か触れたCapacitorプラグインの実行例を見てみましょう。これを行うために、次のコマンドを実行して、かなりシンプルなプラグインをインストールできます。

```shell
npm i @capacitor/share
```

[シェアプラグイン](https://capacitorjscom/docs/apis/share/)は特別なものではありませんが、ネイティブシェアダイアログを表示します！これを行うために、パッケージをインポートし、アプリから適切な`share()`関数を呼び出す必要があります。したがって、**pages/indexvue**を次のように変更します。

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

前述のように、新しいプラグインをインストールする際には、同期操作を行ってからアプリをデバイスに再デプロイする必要があります。そのためには、次のコマンドを実行します。

```
npx cap sync
```

ボタンを押すと、美しいネイティブシェアダイアログが動作するのを目の当たりにできます！

## オプションでKonsta UIの追加

QuasarアプリでKonsta UIを使用するには、[tailwindがすでにインストールされている](https://tailwindcsscom/docs/installation/)必要があり、パッケージをインストールする必要があります。

```shell
npm i konsta
```

さらに、`tailwindconfigjs`ファイルを修正する必要があります。

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

`konstaConfig`は、Konsta UIに必要な追加のバリアントとヘルパーユーティリティを使用して、デフォルトの（またはカスタム）Tailwind CSS設定を拡張します。

次に、いくつかのグローバルパラメータ（`theme`など）を設定できるように、主要な[App](https://konstauicom/vue/app/)コンポーネントをセットアップする必要があります。

アプリ全体を`pages/_appvue`の中で`App`でラップする必要があります。

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

すべてが設定されたので、QuasarページでKonsta UI Vueコンポーネントを使用できます。

たとえば、`pages/indexvue`を開いて次のように変更しましょう。

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

必要なコンポーネントをすべてインストールした後、ライブリロードが同期していない場合は、すべてを再起動してみてください。それを実行すると、QuasarとCapacitorで構築された、多少ネイティブな外観のモバイルアプリが表示されるはずです！

## 結論

Capacitorは既存のウェブプロジェクトに基づいてネイティブアプリケーションを構築するための優れたオプションであり、コードを共有し、一貫したUIを維持するためのシンプルな方法を提供します。

さらに[Capgo](https://capgoapp/)を追加することで、アプリにライブアップデートを追加することがさらに簡単になり、ユーザーが常に最新の機能やバグ修正にアクセスできるようになります。

CapgoをNextjsアプリに追加する方法を学びたい場合は、次の記事をご覧ください：
```