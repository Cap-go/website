---
slug: creating-mobile-apps-with-sveltekit-and-capacitor
title: SvelteKitとCapacitorを使ったモバイルアプリケーションの開発
description: >-
  SvelteKitとCapacitorを使ってモバイルアプリケーションを作成する方法を学び、Konsta
  UIでネイティブユーザーインターフェースを強化しましょう。
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-04T00:00:00.000Z
updated_at: 2023-06-04T00:00:00.000Z
head_image: /sveltekit_capacitor.webp
head_image_alt: SvelteKitとCapgoのイラスト
tag: Tutorial
published: true
locale: ja
next_blog: updating-your-capacitor-apps-seamlessly-with-capacitor-updater
---

このチュートリアルでは、新しい[ SvelteKit ]アプリから始め、Capacitorを使用してネイティブモバイル開発に移行します。オプションとして、[ Konsta UI ]を統合して、強化されたTailwind CSSモバイルUIを実現することもできます。

Capacitorを使用すると、SvelteKitのWebアプリケーションを大きな変更や、React Nativeのような新しいスキルを学ぶことなく、簡単にネイティブモバイルアプリに変換できます。

このステップバイステップガイドに従って、SvelteKitアプリをCapacitorを使用してモバイルアプリに変換し、希望に応じてKonsta UIでモバイルUIを強化してください。

## Capacitorについて

CapacitorJSは革命的な存在です！どんなWebプロジェクトにも簡単に統合でき、アプリケーションをネイティブWebviewでラッピングし、ネイティブのXcodeおよびAndroid Studioプロジェクトを生成します。そのプラグインは、JavaScriptブリッジを介してカメラなどのネイティブデバイス機能にアクセスできます。

Capacitorを使用すれば、複雑なセットアップや急な学習曲線なしに素晴らしいネイティブモバイルアプリを作成できます。シンプルなAPIと合理化された機能により、プロジェクトに簡単に統合できます。Capacitorを使用して完全に機能するネイティブアプリを実現するのがどれほど簡単かに驚くことでしょう！

## SvelteKitアプリの準備

新しいSvelteKitアプリを作成するには、次のコマンドを実行します：

```shell
npm create svelte@latest my-app
cd my-app
npm install
npm run build
```

`build`コマンドを実行した後、プロジェクトのルートに新しい`dist`フォルダーが表示されるはずです。

このフォルダーは後でCapacitorによって使用されますが、今は正しく設定する必要があります。

## SvelteKitアプリにCapacitorを追加

任意のWebアプリをネイティブモバイルコンテナにパッケージ化するために、いくつかの初期ステップを踏む必要があります。その後は、単一の`sync`コマンドを実行するだけです。

まず、[ Capacitor CLI ]を開発依存関係としてインストールし、プロジェクト内で設定します。セットアップ中に、名前とバンドルIDのデフォルト値を受け入れるために「Enter」を押すことができます。

次に、iOSとAndroidプラットフォーム用のコアパッケージと関連パッケージをインストールします。

最後にプラットフォームを追加すると、Capacitorはプロジェクトのルートに各プラットフォーム用のフォルダーを作成します：

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your SvelteKit project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

この時点で、SvelteKitプロジェクトに新しい**ios**および**android**フォルダーが表示されるはずです。

**これは本物のネイティブプロジェクトです！**

後でAndroidプロジェクトにアクセスするには、[ Android Studio ]をインストールする必要があります。iOSの場合はMacが必要で、[ Xcode ]をインストールする必要があります。

さらに、プロジェクトに**capacitorconfigts**ファイルを見つける必要があります。このファイルには、同期中に使用される基本的なCapacitor設定が含まれています。注意すべき唯一の点は、**webDir**で、これはビルドコマンドの結果を指していなければなりません。現在は不正確です。

これを修正するには、**capacitorconfigts**ファイルを開いて**webDir**を更新します：

```ts
import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'build',
}

export default config
```

Capacitorの設定を更新したので、適切なスタティックアダプターパッケージをダウンロードしてSvelteKitプロジェクトをスタティックアプリケーションに変更しましょう：

```shell
npm i -D @sveltejs/adapter-static
```

パッケージがインストールされたら、_svelteconfigjs_ファイルをオートアダプターからスタティックに変更する必要があります：

```ts
import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/kit/vite'

/** @type {import('@sveltejs/kit').Config} */
const config = {
// Consult https://kit.svelte.dev/docs/integrations#preprocessors
// for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter({
      // default options are shown. On some platforms
      // these options are set automatically — see below
      pages: 'build',
      assets: 'build',
      fallback: null,
      precompress: false,
      strict: true
    })
  }
}

export default config
```

_svelteconfigjs_が更新されたら、_prerender_オプションを追加する必要があります。_src/routes_に_+layoutjs_ページを作成し、以下のエクスポートを_+layoutjs_に追加します：

```ts
export const prerender = true
```

_+layoutjs_ページを追加して更新したら、モバイルプラットフォームを追加し、_build_フォルダーを作成するためにプロジェクトを再ビルドする必要があります。

次のコマンドを実行して行うことができます：

```shell
npm run build
npx cap sync
```

最初のコマンド`npm run build`はSvelteKitプロジェクトをビルドし、スタティックビルドをコピーします。一方、2番目のコマンド`npx cap sync`は、すべてのWebコードをネイティブプラットフォームの正しい場所に同期させるので、アプリ内で表示されることができます。

さらに、syncコマンドはネイティブプラットフォームを更新し、プラグインをインストールする場合があるため、新しい[ Capacitorプラグイン ]をインストールするときは、再度`npx cap sync`を実行する時です。気づかないうちに、プロセスは完了しましたので、デバイス上のアプリを見てみましょう！

## ネイティブアプリのビルドとデプロイ

iOSアプリを開発するには、**Xcode**がインストールされている必要があります。Androidアプリの場合は、**Android Studio**がインストールされている必要があります。さらに、アプリをアプリストアで配布する予定がある場合は、iOS用のApple Developer ProgramとAndroid用のGoogle Play Consoleに登録する必要があります。

ネイティブモバイル開発が初めての場合は、Capacitor CLIを使用して両方のネイティブプロジェクトを簡単に開くことができます：

[[コードブロック]]

ネイティブプロジェクトのセットアップが完了すると、接続されたデバイスにアプリをデプロイするのは簡単です。Android Studioでは、すべてが準備されるのを待つだけで、設定を変更することなく接続されたデバイスにアプリをデプロイできます。以下はその例です：

![android-studio-run](/android-studio-runwebp)

Xcodeでは、実際のデバイスにアプリをデプロイするために署名アカウントをセットアップする必要があります。シミュレーターではなく。これを以前に行ったことがない場合、Xcodeはプロセスを案内してくれます（ただし、再度、Developer Programに登録している必要があります）。その後は、接続されたデバイスを選択してアプリを実行するために再生ボタンを押すだけです。以下はその例です：

![xcode-run](/xcode-runwebp)

おめでとうございます！SvelteKitウェブアプリをモバイルデバイスに正常にデプロイしました。以下はその例です：

[[HTMLタグ]]
  [[HTMLタグ]]
[[HTMLタグ]]

しかし、開発中にこれを行うためのより迅速な方法もあります。

## Capacitorライブリロード

今や、すべての最新フレームワークでホットリロードに慣れているでしょう、そして良いニュースは、最小限の努力で**モバイルデバイス**で同様の機能を持つことができるということです！

ネットワーク上の特定のURLからコンテンツをロードするために、Capacitorアプリを使用してローカルホストされたアプリケーションへのアクセスをライブリロードで有効にします。

最初のステップは、ローカルIPアドレスを調べることです。Macを使用している場合、ターミナルで次のコマンドを実行することで確認できます：

[[コードブロック]]

Windowsでは、次のように実行します：

[[コードブロック]]

次に、IPv4アドレスを探します。

Capacitorにサーバーからアプリを直接ロードするよう指示するために、`capacitorconfigts`ファイルに別のエントリーを追加します：

[[コードブロック]]

例に示したように、**正しいIPおよびポート**を使用してください。

これで、ネイティブプロジェクトに変更を適用するために、これらの変更をコピーできます：

[[コードブロック]]

`copy`コマンドは`sync`と似ていますが、**ウェブフォルダー**と設定に加えた変更をのみコピーし、ネイティブプロジェクトは更新しません。

これで、Android StudioまたはXcodeを使用してアプリをもう一度デプロイできます。その後、Svelteアプリ内で何かを変更すると、**アプリが自動的にリロード**されて変更が表示されます！

**念のために注意してください**、カメラなどの新しいプラグインをインストールすると、ネイティブプロジェクトの再ビルドが必要です。これは、ネイティブファイルが変更されて、それが即座に行えないためです。

設定内で正しいIPおよびポートを使用するべきです。上記のコードブロックはデモンストレーション目的でデフォルトのSvelteKitポートを示しています。

## Capacitorプラグインの使用

以前に何度か言及したCapacitorプラグインの使用方法を見てみましょう。そのためには、次のコマンドを実行してシンプルなプラグインをインストールできます：

[[コードブロック]]

[Shareプラグイン](https://capacitorjscom/docs/apis/share/)は特別なものではありませんが、ネイティブ共有ダイアログを表示します！これにより、今はただパッケージをインポートし、アプリから`share()`関数を呼び出すだけで済みます。ですので、**src/routes/indexsvelte**を次のように変更しましょう：

[[コードブロック]]

前述のように、新しいプラグインをインストールすると、同期操作を行ってからアプリをデバイスに再デプロイする必要があります。これを行うには、次のコマンドを実行します：

[[コードブロック]]

ボタンを押した後、ネイティブ共有ダイアログが美しく表示されるのを目の当たりにできます！

## Konsta UIの追加

Nuxt 3アプリでKonsta UIを使用するには、[tailwindをすでにインストールしておく必要があります](https://tailwindcss)com/docs/guides/sveltekit/) とパッケージをインストールするには：

```shell
npx cap open ios
npx cap open android
```

さらに、`tailwindconfigjs`ファイルを修正する必要があります：

```shell
ipconfig getifaddr en0
```

`konstaConfig`は、Konsta UIに必要な追加のバリアントとヘルパーユーティリティで、デフォルト（またはカスタム）のTailwind CSS設定を拡張します。

次に、グローバルパラメーター（例えば、`theme`）を設定できるように、メインの [App](https://konstauicom/vue/app/) コンポーネントを設定する必要があります。

`src/routes/+layoutsvelte` でアプリ全体を `App` でラップする必要があります：

```shell
ipconfig
```

### 例ページ

すべてが設定されたら、SvelteKitのページでKonsta UI Svelteコンポーネントを使用できます。

例えば、`src/routes/indexsvelte`を開いて、次のように変更します：

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

必要なコンポーネントをすべてインストールした後にライブリロードが同期していない場合は、すべてを再起動してみてください。そうすれば、SvelteKitとCapacitorで構築されたかなりネイティブな外観のモバイルアプリが表示されるはずです。

結果として、次のページが表示されるはずです：

<div class="mx-auto" style="width: 50%;">
  <img src="/sveltekit-mobile-app.webp" alt="sveltekit-mobile-app">
</div>

## 結論

Capacitorは、既存のWebプロジェクトに基づいてネイティブアプリケーションを構築するための優れたオプションであり、コードを共有し、一貫したUIを維持するための簡単な方法を提供します。

そして、[Capgo](https://capgoapp/)の追加により、アプリにライブ更新を追加することがさらに簡単になり、ユーザーは常に最新の機能やバグ修正にアクセスできます。

SvelteKitアプリにCapgoを追加する方法を学びたい場合は、次の記事を見てください：

Capgoがどのようにしてより良いアプリをより早く構築するのに役立つかを学び、[無料アカウントにサインアップ](/register/)してください。