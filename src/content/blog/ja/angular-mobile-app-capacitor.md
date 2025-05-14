---
slug: angular-mobile-app-capacitor
title: Angular と Capacitor を使用したモバイルアプリの構築
description: Angular、Capacitorを使用してモバイルアプリを作成し、Konsta UIでネイティブUIを強化する方法を学びましょう。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-06T00:00:00.000Z
updated_at: 2023-06-06T00:00:00.000Z
head_image: /angular_capacitor.webp
head_image_alt: AngularとCapacitorのイラスト
keywords: >-
  Angular, mobile app development, live updates, OTA updates, continuous
  integration, mobile app updates
tag: Tutorial
published: true
locale: ja
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
このチュートリアルでは、新しい [Angular](https://angular.io/) アプリから始め、Capacitorを使用してネイティブモバイルアプリの領域に移行します。必要に応じて、モバイルUIを改善するために [Konsta UI](https://konstaui.com/) を追加することもできます。

Capacitorを使用すると、Angularウェブアプリケーションを大幅な変更やReact Nativeのような新しいスキルを学ぶことなく、簡単にネイティブモバイルアプリに変換できます。

ほんの数ステップで、ほとんどのAngularアプリケーションをモバイルアプリに変換することができます。

このチュートリアルでは、新しいAngularアプリから始め、次にCapacitorを組み込んでネイティブモバイルアプリの領域に移行する手順を説明します。さらに、モバイルUIをTailwind CSSで強化するために、必要に応じて [Konsta UI](https://konstaui.com/) を使用することもできます。

## Capacitorについて

CapacitorJSはゲームチェンジャーです！ それを任意のウェブプロジェクトに effortlessly 組み込むことができ、アプリケーションをネイティブWebViewにラップし、ネイティブのXcodeおよびAndroid Studioプロジェクトを生成します。さらに、そのプラグインを使用すると、JSブリッジを介してカメラなどのネイティブデバイス機能にアクセスできます。

Capacitorを使用すると、複雑なセットアップや急な学習曲線なしで驚くべきネイティブモバイルアプリが手に入ります。そのスリムなAPIと効率的な機能により、プロジェクトに統合するのも簡単です。私を信じてください、Capacitorで完全に機能するネイティブアプリを実現するのがどれほど簡単かに驚くことでしょう！

## Angularアプリの準備

新しいAngularアプリを作成するには、次のコマンドを実行します：

```shell
ng new my-app
cd my-app
```

Angularのバージョンを尋ねられたら、「Angular」を選択します。

ネイティブモバイルアプリを作成するには、プロジェクトの**export**が必要です。そこで、Angularプロジェクトをビルドおよびコピーするために利用できる簡単なスクリプトを**package.json**に追加しましょう：

```json
{
  "scripts": {
    // ...
    "build": "ng build --prod"
  }
}
```

コマンド `build` を実行後、プロジェクトのルートに新しい `dist` フォルダが表示されるはずです。

このフォルダはCapacitorによって後で使用されますが、現在は正しく設定する必要があります。

## AngularアプリにCapacitorを追加

任意のウェブアプリをネイティブモバイルコンテナにパッケージ化するには、いくつかの初期ステップに従う必要がありますが、その後は単に `sync` コマンドを実行するだけで済みます。

まず、[Capacitor CLI](https://capacitorjs.com/docs/cli/) を開発依存関係としてインストールし、プロジェクト内でセットアップします。セットアップ中に、名前とバンドルIDのデフォルト値を受け入れるために「Enter」を押すことができます。

次に、コアパッケージとiOSおよびAndroidプラットフォームに関連するパッケージをインストールする必要があります。

最後にプラットフォームを追加すると、Capacitorがプロジェクトのルートに各プラットフォームのフォルダを作成します：

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your Angular project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

この時点で、Angularプロジェクトに新しい**ios**および**android**フォルダが表示されているはずです。

**それは本物のネイティブプロジェクトです！**

後でAndroidプロジェクトにアクセスするには、[Android Studio](https://developer.android.com/studio/)をインストールする必要があります。iOSの場合、Macが必要で、[Xcode](https://developer.apple.com/xcode/)をインストールする必要があります。

さらに、プロジェクトには、同期中に使用される基本的なCapacitor設定が含まれている**capacitor.config.ts**ファイルが見つかるはずです。注意すべき唯一のことは、**webDir**で、ビルドコマンドの結果を指す必要があります。現在、これは不正確です。

これを修正するには、**capacitor.config.json**ファイルを開いて**webDir**を更新します：

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "dist"
}
```

次のコマンドを実行して試すことができます：

```shell
npm run build
npx cap sync
```

最初のコマンド `npm run build` は、Angularプロジェクトを単にビルドして静的ビルドをコピーし、2番目のコマンド `npx cap sync` は、全てのウェブコードをネイティブプラットフォームの正しい場所に同期させて、アプリに表示できるようにします。

さらに、syncコマンドはネイティブプラットフォームを更新し、プラグインをインストールする場合があるので、新しい[Capacitorプラグイン](https://capacitorjs.com/docs/plugins/)をインストールした場合は、再度 `npx cap sync` を実行する必要があります。

いつの間にか、実際に完了しているので、デバイス上でアプリを見てみましょう！

## ネイティブアプリをビルドしてデプロイ

iOSアプリを開発するには、**Xcode**がインストールされている必要があり、Androidアプリの場合は**Android Studio**がインストールされている必要があります。さらに、アプリをアプリストアで配布する予定がある場合は、iOS用のApple Developer ProgramとAndroid用のGoogle Play Consoleに登録する必要があります。

ネイティブモバイル開発が初めての方は、Capacitor CLIを使用して両方のネイティブプロジェクトを簡単に開くことができます：

```shell
npx cap open ios
npx cap open android
```

ネイティブプロジェクトの設定が完了すると、接続されたデバイスにアプリをデプロイするのは簡単です。Android Studioでは、すべてが準備が整うのを待ち、設定を変更することなく接続されたデバイスにアプリをデプロイできます。以下が例です：

![android-studio-run](/android-studio-run.webp)

Xcodeでは、実際のデバイスにアプリをデプロイするために署名アカウントを設定する必要があります。シミュレーターではなく、実際のデバイスです。これをまだ行ったことがない場合、Xcodeはその手順をガイドします（ただし、再度、Developer Programに登録している必要があります）。その後、単に再生ボタンを押して、接続されたデバイス上でアプリを実行できます。以下が例です：

![xcode-run](/xcode-run.webp)

おめでとうございます！ Angularウェブアプリをモバイルデバイスに正常にデプロイしました。以下が例です：

<div class="mx-auto" style="width: 50%;">
  <img src="/nextjs-mobile-app.webp" alt="angular-mobile-app">
</div>

しかし、待ってください、開発中にこれを行うためのより早い方法もあります...

## Capacitorライブリロード

今や、最新のフレームワークとともにホットリロードの使用に慣れていると思いますが、良いニュースは、 **モバイルデバイスで** 最小限の努力で同様の機能を手に入れることができるということです！

Capacitorアプリに特定のURLからの内容をロードさせることで、ライブリロードのためにローカルホストのアプリケーションへのアクセスを有効にします。

最初のステップは、ローカルIPアドレスを特定することです。Macを使用している場合、次のコマンドをターミナルで実行することでこれを見つけることができます：

```shell
ipconfig getifaddr en0
```

Windowsの場合、次のコマンドを実行します：

```shell
ipconfig
```

その後、IPv4アドレスを探します。

Capacitorにサーバーからアプリを直接ロードさせるために、`capacitor.config.ts`ファイルに別のエントリを追加できます：

```javascript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.x.xx:4200',
    cleartext: true
  }
};

export default config;
```

**正しいIPとポート**を使用してください。私はこの例でデフォルトのAngularポートを使用しました。

これで、これらの変更をネイティブプロジェクトにコピーして適用できます：

```shell
npx cap copy
```

`copy`コマンドは`sync`に似ていますが、 **ウェブフォルダ**および設定に対する変更を**コピーするだけ**で、ネイティブプロジェクトを更新することはありません。

これで、もう一度Android StudioやXcodeを通じてアプリをデプロイできます。その後、Angularアプリ内で何かを変更すると、 **アプリが自動的にリロード**して変更を表示します！

**注意** しておくべき点は、カメラなどの新しいプラグインをインストールすると、それでもネイティブプロジェクトの再ビルドが必要になります。これは、ネイティブファイルが変更されているためであり、リアルタイムではできません。

構成内で正しいIPとポートを使用する必要があります。上記のコードブロックは、デモ目的でデフォルトのAngularポートを示しています。

## Capacitorプラグインの使用

これまでの何度か言及したCapacitorプラグインを実際に使用する方法を見てみましょう。これを行うには、次のコマンドを実行して比較的シンプルなプラグインをインストールできます：

```shell
npm i @capacitor/share
```

[Shareプラグイン](https://capacitorjs.com/docs/apis/share/)は特別なものではありませんが、それでもネイティブ共有ダイアログを表示します！ これには、パッケージをインポートし、アプリから対応する `share()` 関数を呼び出すだけで済みます。したがって、**src/app/app.component.ts**を次のように変更しましょう：

```typescript
import { Component } from '@angular/core';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';

  async share() {
    await Share.share({
      title: 'Open Youtube',
      text: 'Check new video on youtube',
      url: 'https://www.youtube.com',
      dialogTitle: 'Share with friends'
    });
  }
}
```

前述のように、新しいプラグインをインストールする際は、sync操作を実行し、その後でアプリをデバイスに再デプロイする必要があります。これを行うには、次のコマンドを実行します：

```
npx cap sync
```

ボタンを押すと、美しいネイティブ共有ダイアログが動作しているのを目にすることができます！

## Konsta UIを追加

Nuxt 3アプリでKonsta UIを使用するには、[tailwindをすでにインストール済みにする](https://tailwindcss.com/docs/guides/angular/)必要があり、パッケージをインストールします：

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
    './src/**/*.{html,ts}',
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

`konstaConfig`は、Konsta UIに必要な追加のバリアントとヘルパーユーティリティを用いてデフォルトの（またはカスタムの）Tailwind CSS設定を拡張します。

次に、いくつかのグローバルパラメータ（`theme`など）を設定できるように、メインの[App](https://konstaui.com/vue/app/)コンポーネントを設定する必要があります。

`src/app/app.component.html`内で、アプリ全体を`App`でラップする必要があります：

```html
<app>
  <h1>Welcome to Angular and Capacitor!</h1>
  <button (click)="share()">Share now!</button>
</app>
```

### サンプルページ

すべてが設定されたら、AngularページでKonsta UI Vueコンポーネントを使用できます。

たとえば、`src/app/app.component.html`を開き、次のように変更します：

```html
<app>
  <page>
    <navbar title="My App" />

    <block strong>
      <p>
        Here is your Angular & Konsta UI app. Let's see what we have here.
      </p>
    </block>
    <block-title>Navigation</block-title>
    <list>
      <list-item href="/about/" title="About" />
      <list-item href="/form/" title="Form" />
    </list>

    <block strong class="flex space-x-4">
      <button>Button 1</button>
      <button>Button 2</button>
    </block>
  </page>
</app>
```

すべての必要なコンポーネントをインストールした後、ライブリロードが同期しなくなった場合は、すべてを再起動してみてください。それを行った後、AngularとCapacitorで構築されたややネイティブな外観のモバイルアプリを見ることができるはずです！

結果として次のページが表示されるはずです：

<app>
  <h1>
</h1>

## 結論

Capacitorは、既存のウェブプロジェクトに基づいてネイティブアプリケーションを構築するための優れたオプションであり、コードを共有し、一貫したUIを維持するための簡単な方法を提供します。

さらに、[Capgo](https://capgo.app/)の追加により、アプリにライブ更新を追加することがさらに簡単になり、ユーザーは常に最新の機能とバグ修正にアクセスできるようになります。

AngularアプリにCapgoを追加する方法を学びたい場合は、次の記事を参照してください：
