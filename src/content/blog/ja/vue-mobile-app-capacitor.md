---
slug: vue-mobile-app-capacitor
title: VueとCapacitorを使用したモバイルアプリの構築
description: Vue、Capacitor を使用してモバイルアプリを作成する方法を学び、オプションで Konsta UI で UI を強化します。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-08T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /vue_capacitor.webp
head_image_alt: VueとCapacitorのイラスト
keywords: >-
  Vue, Capacitor, mobile app development, live updates, OTA updates, continuous
  integration, mobile app updates
tag: Tutorial
published: true
locale: ja
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
このチュートリアルでは、Capacitorを使用してVueウェブアプリケーションをネイティブモバイルアプリに変換するプロセスを案内します。オプションとして、Tailwind CSSベースのモバイルUIライブラリであるKonsta UIを使用してモバイルUIを強化することもできます。

## Capacitorについて

Capacitorは、任意のウェブプロジェクトに簡単に統合し、アプリケーションをネイティブモバイルアプリに変換することを可能にする画期的なツールです。ネイティブのXcodeおよびAndroid Studioプロジェクトを生成し、JavaScriptブリッジを通じてカメラなどのネイティブデバイス機能へのアクセスを提供します。

## Vueアプリの準備

まず、次のコマンドを実行して新しいVueアプリを作成します：

```shell
vue create my-app
cd my-app
npm install
```

ネイティブモバイル展開のためにVueアプリを準備するには、プロジェクトをエクスポートする必要があります。**package.json**ファイルにスクリプトを追加して、Vueプロジェクトをビルドし、コピーします：

```json
{
  "scripts": {
    // ...
    "build": "vue-cli-service build"
  }
}
```

`build`コマンドを実行すると、プロジェクトのルートディレクトリに新しい`dist`フォルダーが表示されるはずです。このフォルダーは後でCapacitorによって使用されます。

## VueアプリにCapacitorを追加

Vueウェブアプリをネイティブモバイルコンテナに変換するには、次の手順に従います：

1. Capacitor CLIを開発依存関係としてインストールし、プロジェクト内でセットアップします。セットアップ中に名前とバンドルIDのデフォルト値を受け入れます。

2. コアパッケージおよびiOSおよびAndroidプラットフォームに関連するパッケージをインストールします。

3. プラットフォームを追加すると、Capacitorはプロジェクトのルートに各プラットフォームのフォルダーを作成します：

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

これで、Vueプロジェクトに新しい**iOS**および**android**フォルダーが表示されるはずです。

**capacitor.config.json**ファイルを更新して、**webDir**がビルドコマンドの結果を指すようにします：

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

iOSアプリを開発するにはXcodeがインストールされている必要があり、AndroidアプリにはAndroid Studioがインストールされている必要があります。さらに、アプリをアプリストアで配布するために、iOS用のApple Developer ProgramとAndroid用のGoogle Play Consoleに登録する必要があります。

Capacitor CLIを使用して両方のネイティブプロジェクトを開きます：

```shell
npx cap open ios
npx cap open android
```

Android StudioまたはXcodeを使用して接続されたデバイスにアプリをデプロイします。

## Capacitor Live Reload

Capacitorアプリがネットワーク上の特定のURLからコンテンツを読み込むことによって、モバイルデバイスでライブリロードを有効にします。

ローカルIPアドレスを見つけて、`capacitor.config.ts`ファイルを正しいIPとポートで更新します：

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

これで、Vueアプリを更新すると、アプリが自動的にリロードされ、変更が表示されるようになります。

## Capacitorプラグインの使用

Capacitorプラグイン（たとえば、Shareプラグイン）をインストールし、Vueアプリで使用します：

```shell
npm i @capacitor/share
```

パッケージをインポートし、アプリ内で`share()`関数を呼び出します：

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

新しいプラグインをインストールした後、`sync`コマンドを実行して、アプリをデバイスに再デプロイします：

```
npx cap sync
```

## Konsta UIの追加

VueアプリでKonsta UIを使用するには、[tailwindを既にインストールしている必要があります](https://tailwindcss.com/docs/guides/vite/#vue)およびパッケージをインストールする必要があります：
VueアプリでKonsta UIを使用するには、パッケージをインストールし、`tailwind.config.js`ファイルを修正します：

```shell
npm i konsta
```

`pages/_app.vue`ファイルでアプリを`App`コンポーネントでラップし、VueページでKonsta UI Vueコンポーネントを使用します。

## 結論

Capacitorは、既存のウェブプロジェクトに基づいてネイティブアプリケーションを構築するための優れたオプションです。Capgoを追加すれば、アプリにライブ更新を追加することがさらに容易になり、ユーザーが最新の機能やバグ修正に常にアクセスできるようになります。

Capgoがどのようにしてあなたのアプリをより良く、より早く構築できるかを学ぶには、[無料アカウントにサインアップ](/register/)してください。
