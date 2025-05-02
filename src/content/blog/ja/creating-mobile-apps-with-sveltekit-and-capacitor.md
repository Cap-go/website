---
slug: モバイルアプリをSvelteKitとCapacitorで作成する
title: モバイルアプリケーションの作成：SvelteKitとCapacitor
description: SvelteKitとCapacitorを使用してモバイルアプリを作成し、Konsta UIでネイティブUIを強化する方法を学びましょう。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-04T00:00:00.000Z
updated_at: 2023-06-04T00:00:00.000Z
head_image: /sveltekit_capacitor.webp
head_image_alt: SvelteKitとCapgoの図解
keywords: >-
  SvelteKit, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: ja
next_blog: updating-your-capacitor-apps-seamlessly-with-capacitor-updater
original_slug: creazione-di-app-mobile-con-sveltekit-e-capacitor
---
このチュートリアルでは、新しい[SvelteKit](https://kit.svelte.dev/)アプリから始めて、Capacitorを使用してネイティブモバイル開発に移行します。オプションとして、[Konsta UI](https://konstaui.com/)を統合して、Tailwind CSSモバイルUIを強化することもできます。

Capacitorを使用すると、大きな変更やReact Nativeのような新しいスキルを学ぶ必要なく、SvelteKitウェブアプリケーションを簡単にネイティブモバイルアプリに変換できます。

このステップバイステップガイドに従って、SvelteKitアプリをCapacitorを使用してモバイルアプリに変換し、必要に応じてKonsta UIでモバイルUIを強化しましょう。

## Capacitorについて

CapacitorJSは画期的です！任意のウェブプロジェクトに簡単に統合でき、アプリケーションをネイティブウェブビューでラップし、XcodeとAndroid Studioのプロジェクトを生成します。そのプラグインは、JavaScriptブリッジを介してカメラなどのネイティブデバイス機能へのアクセスを提供します。

Capacitorを使用すると、複雑なセットアップや急な学習曲線なしに、素晴らしいネイティブモバイルアプリを作成できます。スリムなAPIと合理化された機能により、プロジェクトへの統合が容易です。Capacitorで完全に機能するネイティブアプリを実現する簡単さに驚くことでしょう！

## SvelteKitアプリの準備

新しいSvelteKitアプリを作成するには、次のコマンドを実行します：

```shell
npm create svelte@latest my-app
cd my-app
npm install
npm run build
```

`build`コマンドを実行すると、プロジェクトのルートに新しい`dist`フォルダが表示されるはずです。

このフォルダは後でCapacitorによって使用されますが、今は正しくセットアップする必要があります。

## SvelteKitアプリにCapacitorを追加する

任意のウェブアプリをネイティブモバイルコンテナにパッケージ化するには、いくつかの初期ステップを実行する必要があります。その後は、単一の`sync`コマンドを実行するだけで簡単です。

まず、[Capacitor CLI](https://capacitorjs.com/docs/cli/)を開発依存関係としてインストールし、プロジェクト内でセットアップします。セットアップ中は、名前とバンドルIDのデフォルト値を受け入れるためにEnterキーを押すことができます。

次に、コアパッケージとiOSおよびAndroidプラットフォーム用の関連パッケージをインストールします。

最後に、プラットフォームを追加すると、Capacitorがプロジェクトのルートに各プラットフォーム用のフォルダを作成します：

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

この時点で、SvelteKitプロジェクトに新しい**ios**と**android**フォルダが表示されているはずです。

**これらは実際のネイティブプロジェクトです！**

後でAndroidプロジェクトにアクセスするには、[Android Studio](https://developer.android.com/studio/)をインストールする必要があります。iOSの場合は、Macが必要で、[Xcode](https://developer.apple.com/xcode/)をインストールする必要があります。

さらに、同期中に使用される基本的なCapacitor設定を含む**capacitor.config.ts**ファイルがプロジェクトに表示されるはずです。注意が必要なのは**webDir**だけで、これはビルドコマンドの結果を指している必要があります。現在は正しくありません。

これを修正するには、**capacitor.config.ts**ファイルを開き、**webDir**を更新します：

```ts
import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'build',
}

export default config
```

Capacitor設定を更新したので、適切な静的アダプターパッケージをダウンロードしてSvelteKitプロジェクトを静的アプリケーションに変更しましょう：

```shell
npm i -D @sveltejs/adapter-static
```

パッケージがインストールされたら、_svelte.config.js_ファイルを自動アダプターから静的に変更する必要があります：

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

_svelte.config.js_を更新したら、_src/routes_に_+layout.js_ページを作成し、_+layout.js_に次のエクスポートを追加して、_prerender_オプションを追加する必要があります：

```ts
export const prerender = true
```

_+layout.js_ページを追加して更新したら、モバイルプラットフォームを追加し、_build_フォルダを作成するためにプロジェクトを再ビルドする必要があります。

以下のコマンドを実行して実行できます：

```shell
npm run build
npx cap sync
```

最初のコマンド`npm run build`はSvelteKitプロジェクトをビルドして静的ビルドをコピーし、2番目のコマンド`npx cap sync`はすべてのウェブコードをネイティブプラットフォームの適切な場所に同期してアプリに表示できるようにします。

さらに、同期コマンドはネイティブプラットフォームを更新してプラグインをインストールする場合があるので、新しい[Capacitorプラグイン](https://capacitorjs.com/docs/plugins/)をインストールする際は、再度`npx cap sync`を実行する時です。

気付かないうちにプロセスが完了したので、デバイスでアプリを確認してみましょう！

## ネイティブアプリのビルドとデプロイ

iOSアプリを開発するには**Xcode**が、Androidアプリを開発するには**Android Studio**がインストールされている必要があります。また、アプリをアプリストアで配布する予定がある場合は、iOSではApple Developer Program、AndroidではGoogle Play Consoleに登録する必要があります。

ネイティブモバイル開発が初めての場合は、Capacitor CLIを使用して両方のネイティブプロジェクトを簡単に開くことができます：

```shell
npx cap open ios
npx cap open android
```

ネイティブプロジェクトをセットアップしたら、接続されたデバイスへのアプリのデプロイは簡単です。Android Studioでは、すべての準備が整うのを待つだけで、設定を変更することなく接続されたデバイスにアプリをデプロイできます。例：

![android-studio-run](/android-studio-run.webp)

Xcodeでは、シミュレータだけでなく実際のデバイスにアプリをデプロイするために、署名アカウントを設定する必要があります。これを初めて行う場合、Xcodeがプロセスをガイドします（ただし、Developer Programに登録する必要があります）。その後、上部で選択できる接続されたデバイスでアプリを実行するために、単にプレイを押すだけです。例：

![xcode-run](/xcode-run.webp)

おめでとうございます！SvelteKitウェブアプリをモバイルデバイスに正常にデプロイしました。例：

<div class="mx-auto" style="width: 50%;">
  <img src="/sveltekit-mobile-app.webp" alt="sveltekit-mobile-app">
</div>

しかし、開発中にはもっと速い方法もあります...

## Capacitorのライブリロード

現在では、すべての最新フレームワークでホットリロードに慣れているでしょうが、良いニュースは、最小限の努力で**モバイルデバイス上で**同じ機能を持つことができることです！

Capacitorアプリが特定のURLからコンテンツを読み込むことで、ライブリロードを使用して**ネットワーク上で**ローカルでホストされているアプリケーションへのアクセスを有効にします。

最初のステップは、ローカルIPアドレスを見つけることです。Macを使用している場合は、ターミナルで次のコマンドを実行して確認できます：

```shell
ipconfig getifaddr en0
```

Windowsでは、次のコマンドを実行します：

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

上の例のように、**正しいIPとポート**を使用するようにしてください。

これらの変更をネイティブプロジェクトにコピーすることで適用できます：

```shell
npx cap copy
```

`copy`コマンドは`sync`に似ていますが、ネイティブプロジェクトを更新せずに**ウェブフォルダとコンフィグレーションに加えられた変更のみをコピー**します。

これで、Android StudioまたはXcodeを通じてもう一度アプリをデプロイできます。その後、Svelteアプリで何か変更を加えると、**アプリは自動的にリロード**され、変更が表示されます！

**注意してください**が、カメラなどの新しいプラグインをインストールする場合は、依然としてネイティブプロジェクトの再ビルドが必要です。これは、ネイティブファイルが変更され、その場で行うことができないためです。

設定で正しいIPとポートを使用するようにしてください。上のコードブロックはデモンストレーション目的でデフォルトのSvelteKitポートを示しています。

## Capacitorプラグインの使用

以前から何度か言及してきたCapacitorプラグインの実際の使用方法を見てみましょう。簡単なプラグインをインストールするには、次のコマンドを実行します：

```shell
npm i @capacitor/share
```

[Shareプラグイン](https://capacitorjs.com/docs/apis/share/)に特別なものはありませんが、ネイティブの共有ダイアログを表示します！これには、パッケージをインポートしてアプリから`share()`関数を呼び出すだけで済みます。**src/routes/index.svelte**を次のように変更しましょう：

```html
<script>
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

<h1>Welcome to SvelteKit and Capacitor!</h1>
<button on:click={share}>Share now!</button>
```

前述のように、新しいプラグインをインストールする場合は、同期操作を実行してからアプリをデバイスに再デプロイする必要があります。これを行うには、次のコマンドを実行します：

```
npx cap sync
```

ボタンを押すと、美しいネイティブ共有ダイアログが動作するのを確認できます！

## Konsta UIの追加

Nuxt 3アプリでKonsta UIを使用するには、[tailwindがすでにインストール](https://tailwindcss.com/docs/guides/sveltekit/)されている必要があり、パッケージをインストールする必要があります：

```shell
npm i konsta
```

さらに、`tailwind.config.js`ファイルを変更する必要があります：

```javascript
// import konstaConfig config
const konstaConfig = require('konsta/config')

// wrap config with konstaConfig config
module.exports = konstaConfig({
  content: [
    './src/routes/**/*.{svelte}',
    './src/components/**/*.{svelte}',
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

次に、いくつかのグローバルパラメータ（`theme`など）を設定できるように、メインの[App](https://konstaui.com/vue/app/)コンポーネントをセットアップする必要があります。

`src/routes/+layout.svelte`で`App`でアプリ全体をラップする必要があります：

```html
<script>
  import { App } from 'konsta/svelte';
</script>

<App theme="ios">
  <slot />
</App>
```

### 例ページ

すべてのセットアップが完了したら、SvelteKitページでKonsta UI Svelteコンポーネントを使用できます。

例えば、`src/routes/index.svelte`を開いて、次のように変更してみましょう：

```html
<script>
  import {
    Page,
    Navbar,
    Block,
    Button,
    List,
    ListItem,
    Link,
    BlockTitle,
  } from 'konsta/svelte';
</script>

<Page>
  <Navbar title="My App" />

  <Block strong>
    <p>
      Here is your SvelteKit & Konsta UI app. Let's see what we have here.
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
```

必要なコンポーネントをすべてインストールした後にライブリロードが同期していない場合は、すべてを再起動してみてください。完了すると、SvelteKitとCapacitorで構築された、ややネイティブな外観のモバイルアプリが表示されるはずです！

結果として次のページが表示されるはずです：

<script>
  </script>
<h1>

## 結論

Capacitorは、既存のウェブプロジェクトに基づいてネイティブアプリケーションを構築するための優れたオプションであり、コードを共有し一貫したUIを維持する簡単な方法を提供します。

そして[Capgo](https://capgo.app/)の追加により、アプリにライブアップデートを追加することがさらに簡単になり、ユーザーが常に最新の機能とバグ修正にアクセスできることを確保します。

SvelteKitアプリにCapgoを追加する方法を学びたい場合は、次の記事をご覧ください：

Capgoがより良いアプリをより速く構築するのにどのように役立つかを学び、今日[無料アカウントにサインアップ](/register/)してください。
