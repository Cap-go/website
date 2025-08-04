---
slug: developing-cross-platform-apps-with-capacitorjs
title: 'CapacitorJSを使ったクロスプラットフォームアプリの開発: ステップバイステップガイド'
description: >-
  CapacitorJSを使用して、Android、iOS、Web（PWA）向けに単一のJavaScriptコードベースでクロスプラットフォームアプリケーションを作成する方法を学びましょう。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-12-02T00:00:00.000Z
updated_at: 2023-12-14T00:00:00.000Z
head_image: /create_app_with_js.webp
head_image_alt: クロスプラットフォームアプリ開発
keywords: >-
  Capacitor, cross-platform, PWA, mobile app development, live updates, OTA
  updates, continuous integration, mobile app updates
tag: Tutorial
published: true
locale: ja
next_blog: ''
---
モバイルアプリケーション開発の進化する世界において、プログレッシブ・ウェブ・アプリケーション（PWA）の台頭は新しいクロスプラットフォームのランタイムの道を開きました。これらのランタイムは、ネイティブコードのみに依存することなく、ウェブベースのアプリケーションをアプリストアに展開できるようにします。このプロセスをサポートする技術の一つが[**CapacitorJS**](https://capacitorjs.com/)であり、開発者は単一のJavaScriptコードベースを使用してAndroid、iOS、およびウェブのアプリケーションとしてシンプルなウェブサイトを展開できます。このアプローチは、開発コストを大幅に削減し、コーディングの効率を高めます。

このガイドでは、追加のフレームワークを使用せずに純粋なJavaScriptでアプリケーションを作成することに焦点を当てます。2021年における純粋なJavaScriptアプリ開発のリソースを見つけることの難しさにもかかわらず、私たちはアプリケーションを構築し、CapacitorJSでネイティブプラグインを活用するための包括的なチュートリアルを提供するためにここにいます。

## ‣ 前提条件

始める前に、以下のツールがインストールされていることを確認してください：

1. [**Node.js**](https://nodejs.org/en/) **(v14.16.1)** 以上
2. **NPM (v7.6.2)** 以上
3. [**Android Studio**](https://developer.android.com/studio/) for Androidアプリ開発
4. [**Xcode**](https://apps.apple.com/de/app/xcode/id497799835/?mt=12) for iOSアプリ開発（macOSのみ）

> **注意**：iOSアプリ開発はmacOSデバイスでのみ可能です。

## ‣ Capacitorプロジェクトのセットアップ

Capacitorアプリケーションを作成するには、希望するフォルダーに移動し、ターミナルで以下のコマンドを実行します：

```
npm init @capacitor/app
```

プロンプトに従ってパッケージをインストールし、プロジェクトをセットアップします。Capacitor v3の場合、プロジェクトディレクトリは以下のようになります：

```
www/
  css/
    style.css
  js/
    capacitor-welcome.js
  index.html
  manifest.json
.gitignore
capacitor.config.json
package.json
README.md
```

初期セットアップが完了したら、次のステップに進む準備が整いました。

## ‣ プロジェクトの再構築

私たちはViteを使用してJavaScriptファイルをバンドルするので、プロジェクトを次のように再構築します：

1. **新しい**フォルダー`src`をメインディレクトリに作成します。
2. **新しい**スクリプトファイル`index.js`を`src/`に作成します。
3. **メインディレクトリに**Vite設定ファイル`vite.config.js`を作成します。
4. `www/js/`から`capacitor-welcome.js`ファイルを**削除**します。

新しいフォルダ構造は以下のようになります：

```
src/
  index.js
www/
  css/
    style.css
  js/
  index.html
  manifest.json
.gitignore
capacitor.config.json
package.json
README.md
vite.config.js
```

## ‣ 純粋なJavaScriptへの適応

純粋なJavaScriptで作業するためにいくつかのファイルを修正しましょう：

## www/index.html

1. アプリをPWAとしてリリースしない場合、[**Ionic PWA Elements**](https://capacitorjs.com/docs/web/pwa-elements/)のためのスクリプトインポートを削除します：

```
<script type="module" src="https://unpkg.com/@ionic/pwa-elements@latest/dist/ionicpwaelements/ionicpwaelements.esm.js"></script>
<script nomodule src="https://unpkg.com/@ionic/pwa-elements@latest/dist/ionicpwaelements/ionicpwaelements.js"></script>
```

2. ボディから`<script type="module" src="https://unpkg.com/@ionic/pwa-elements@latest/dist/ionicpwaelements/ionicpwaelements.esm.js">` HTML要素を削除します。

3. スクリプトインポートを`capacitor.js`から`js/main.js`に更新します。これがバンドルされたJavaScriptファイルになります。

4. `js/capacitor-welcome.js`のインポートを削除します。これで`index.html`は準備完了です。

## vite.config.js

Node.jsモジュールを[**Vite**](https://vitejs.dev/)でバンドルするために、バンドルされたスクリプトの出力先を指定する設定ファイルが必要です。以下の設定は、`src/index.js`ファイルを取り込み、`www/js/main.js`としてプロダクション用にバンドルします：

```javascript
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, 'www'),
    rollupOptions: {
      input: './src/index.js',
      output: {
        format: 'es',
        file: path.resolve(__dirname, 'www/js/main.js')
      }
    }
  }
});
```

## capacitor.config.json

`capacitor.config.json`ファイルで、 `"bundledWebRuntime": true`プロパティを見つけ、`false`に変更します。この調整は、Capacitorがファイルをバンドルせず、その目的のためにViteを使用できるようにします。

これらの変更により、あなたのCapacitorアプリケーションの基本設定は完了し、純粋なJavaScriptでアプリを開発する準備が整いました。

## ‣ アプリの開発

基盤が整ったので、`src/index.js`ファイルでアプリケーションのロジックを書き始めることができます。ここで、必要なNode.jsモジュールをインポートし、アプリの機能を定義し、Capacitorのネイティブプラグインと対話することができます。

変更を加えるたびに、JavaScriptファイルをバンドルするためにViteのビルドコマンドを実行することを忘れないでください：

```bash
vite build
```

このコマンドは、`www/js`ディレクトリ内に`main.js`ファイルを生成し、`index.html`ファイルで参照されることになります。

## ‣ テストとデバッグ

Capacitorは、さまざまなプラットフォームでアプリケーションをテストする便利な方法を提供します。以下のコマンドを使用して、各プラットフォームの開発環境でアプリを開くことができます：

Androidの場合：
```bash
npx cap add android
npx cap open android
```

iOSの場合（macOSのみ）：
```bash
npx cap add ios
npx cap open ios
```

Web/PWAの場合：
```bash
npx cap serve
```

これらのコマンドを使用すると、Android Studio、Xcode、またはウェブブラウザーでアプリケーションを実行でき、必要に応じてテストおよびデバッグを行うことができます。

## ‣ 結論

純粋なJavaScriptを使用してCapacitorJSでクロスプラットフォームのアプリケーションを開発することは、単一のコードベースで複数のプラットフォーム用のアプリを作成するためのコスト効果が高く効率的な方法です。このガイドに従って、プロジェクトを設定し、Vite用に再構築し、アプリの開発の準備を整えました。この基盤をもとに、頑丈で多用途のアプリケーションを構築する道を進んでいます。

すべてのプラットフォームでしっかりとテストし、Capacitorのネイティブプラグインを活用してアプリの機能を向上させることを忘れないでください。楽しいコーディングを！
