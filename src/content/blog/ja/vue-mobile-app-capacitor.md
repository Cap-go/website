---
slug: vue-mobile-app-capacitor
title: Créer des Applications Mobiles avec Vue et Capacitor
description: Vue、Capacitor、そしてオプションでKonsta UIを使用してUIを強化する方法で、モバイルアプリを作成する方法を学びましょう。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-08T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /vue_capacitor.webp
head_image_alt: Vue と Capacitor の図解
keywords: >-
  Vue, Capacitor, mobile app development, live updates, OTA updates, continuous
  integration, mobile app updates
tag: Tutorial
published: true
locale: ja
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

このチュートリアルでは、Capacitorを使用してVueウェブアプリケーションをネイティブモバイルアプリに変換するプロセスをご案内します。オプションとして、Tailwind CSSベースのモバイルUIライブラリであるKonsta UIを使用してモバイルUIを強化することもできます。

## Capacitorについて

Capacitorは、任意のウェブプロジェクトに簡単に統合でき、アプリケーションをネイティブモバイルアプリに変換できる画期的なツールです。XcodeとAndroid Studioのプロジェクトを自動生成し、JavaScriptブリッジを通じてカメラなどのネイティブデバイス機能へのアクセスを提供します。

## Vueアプリの準備

まず、以下のコマンドを実行して新しいVueアプリを作成します：

```shell
vue create my-app
cd my-app
npm install
```

Vueアプリをネイティブモバイルデプロイメント用に準備するために、プロジェクトをエクスポートする必要があります。**package.json**ファイルにVueプロジェクトをビルドしてコピーするスクリプトを追加します：

```json
{
  "scripts": {
    // ...
    "build": "vue-cli-service build"
  }
}
```

`build`コマンドを実行すると、プロジェクトのルートディレクトリに新しい`dist`フォルダが作成されます。このフォルダは後でCapacitorによって使用されます。

## VueアプリにCapacitorを追加する

Vueウェブアプリをネイティブモバイルコンテナに変換するには、以下の手順に従ってください：

1. Capacitor CLIを開発依存関係としてインストールし、プロジェクト内でセットアップします。セットアップ中は、名前とバンドルIDのデフォルト値を受け入れてください。

2. コアパッケージと、iOSおよびAndroidプラットフォーム用の関連パッケージをインストールします。

3. プラットフォームを追加すると、Capacitorはプロジェクトのルートに各プラットフォーム用のフォルダを作成します：

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your Vue project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

これで、Vueプロジェクトに新しい**iOS**および**android**フォルダが表示されるはずです。

**capacitor.config.json**ファイルを更新して、**webDir**をビルドコマンドの結果を指すように設定します：

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "dist"
}
```

これで、Vueプロジェクトをビルドし、Capacitorと同期できます：

```shell
npm run build
npx cap sync
```

## ネイティブアプリのビルドとデプロイ

iOSアプリを開発するにはXcodeが、Androidアプリを開発するにはAndroid Studioが必要です。また、アプリストアでアプリを配布するには、Apple Developer ProgramとGoogle Play Consoleへの登録が必要です。

Capacitor CLIを使用して両方のネイティブプロジェクトを開きます：

```shell
npx cap open ios
npx cap open android
```

Android StudioまたはXcodeを使用して、接続されたデバイスにアプリをデプロイします。

## Capacitorライブリロード

モバイルデバイスでライブリロードを有効にするには、Capacitorアプリがネットワーク上の特定のURLからコンテンツを読み込むようにします。

ローカルIPアドレスを確認し、`capacitor.config.ts`ファイルを正しいIPとポートで更新します：

```javascript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.x.xx:8080',
    cleartext: true
  }
};

export default config;
```

これらの変更をネイティブプロジェクトにコピーして適用します：

```shell
npx cap copy
```

これで、Vueアプリを更新すると、アプリが自動的にリロードされて変更が表示されます。

## Capacitorプラグインの使用

共有プラグインなどのCapacitorプラグインをインストールし、Vueアプリで使用します：

```shell
npm i @capacitor/share
```

パッケージをインポートし、アプリで`share()`関数を呼び出します：

```html
<template>
  <div>
    <h1>Welcome to Vue and Capacitor!</h1>
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

新しいプラグインをインストールした後、`sync`コマンドを実行してアプリをデバイスに再デプロイします：

```
npx cap sync
```

## Konsta UIの追加

VueアプリでKonsta UIを使用するには、[tailwindがすでにインストール](https://tailwindcss.com/docs/guides/vite/#vue)されている必要があり、パッケージをインストールする必要があります：
VueアプリでKonsta UIを使用するには、パッケージをインストールし、`tailwind.config.js`ファイルを変更します：

```shell
npm i konsta
```

`pages/_app.vue`ファイルで`App`コンポーネントでアプリをラップし、VueページでKonsta UI Vueコンポーネントを使用します。

## 結論

Capacitorは、既存のウェブプロジェクトをベースにネイティブアプリケーションを構築するための優れたオプションです。Capgoを追加することで、アプリへのライブ更新がさらに簡単になり、ユーザーが常に最新の機能とバグ修正にアクセスできるようになります。

Capgoがより良いアプリをより速く構築するのにどのように役立つかを学ぶために、[無料アカウントに登録](/register/)してください。