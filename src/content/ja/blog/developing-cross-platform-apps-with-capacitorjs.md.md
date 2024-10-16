---
slug: developing-cross-platform-apps-with-capacitorjs
title: CapacitorJSを使用したマルチプラットフォームアプリケーションの開発：ステップバイステップガイド
description: >-
  Android、iOS、ウェブ（PWA）向けに単一のJavaScriptコードベースを使用して、CapacitorJSでマルチプラットフォームアプリケーションを構築する方法を見つけてください。
author: Martin Donadieu
author_url: 'https://twitter.com/martindonadieu'
created_at: 2023-12-02T00:00:00.000Z
updated_at: 2023-12-14T00:00:00.000Z
head_image: /create_app_with_js.webp
head_image_alt: マルチプラットフォームアプリケーション開発
tag: Tuto
published: true
locale: ja
next_blog: ''
---

モバイルアプリケーション開発の進化する世界では、プログレッシブウェブアプリケーション（PWA）の台頭が新しいクロスプラットフォームランタイムへの道を開きました。これらのランタイムは、ネイティブコードに依存することなく、ウェブベースのアプリケーションをアプリストアに展開できるようにします。このプロセスを容易にする技術の一つが[**CapacitorJS**](https://capacitorjscom/)、これにより開発者は単一のJavaScriptコードベースを使用して、Android、iOS、およびウェブ全体にアプリケーションとして単純なウェブサイトを展開できます。この手法は、開発コストを大幅に削減し、コーディングの効率を高めます。

このガイドでは、追加のフレームワークなしで純粋なJavaScriptを使用してアプリケーションを作成することに焦点を当てます。2021年の純粋なJavaScriptアプリ開発のリソースを見つけることの難しさにもかかわらず、CapacitorJSを使用してアプリケーションを構築し、ネイティブプラグインを利用するための包括的なチュートリアルを提供します。

## ‣ 前提条件

始める前に、次のツールがインストールされていることを確認してください：

- [**Node.js**](https://nodejsorg/en/) **(v14.16.1)** 以上
- **NPM (v7.6.2)** 以上
- [**Android Studio**](https://developerandroidcom/studio/) Androidアプリ開発用
- [**Xcode**](https://appsapplecom/de/app/xcode/id497799835/?mt=12) iOSアプリ開発用（macOSのみ）

> **注意**：iOSアプリの開発はmacOSデバイスでのみ可能です。

## ‣ Capacitorプロジェクトの設定

Capacitorアプリケーションを作成するには、希望のフォルダに移動し、ターミナルで次のコマンドを実行します：

```
npm init @capacitor/app
```

プロンプトに従ってパッケージをインストールし、プロジェクトを設定します。Capacitor v3では、プロジェクトディレクトリはこのようになります：

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

初期設定が完了したら、次のステップに進む準備ができました。

## ‣ プロジェクトの再構成

Viteを使用してJavaScriptファイルをバンドルするため、プロジェクトを次のように再構成しましょう：

- **新しいフォルダ** `src` をメインディレクトリに作成
- **新しいスクリプトファイル** `index.js` を `src/` に作成
- **Vite設定ファイル** `vite.config.js` をメインディレクトリに作成
- **`www/js/`** から `capacitor-welcome.js` ファイルを削除

新しいフォルダ構造は次のようになります：

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

いくつかのファイルを修正して、純粋なJavaScriptで動作するようにしましょう：

## www/index.html

1 アプリをPWAとして公開しない場合は、[**Ionic PWA Elements**](https://capacitorjscom/docs/web/pwa-elements/) のスクリプトインポートを削除：

```
<script type="module" src="https://unpkg.com/@ionic/pwa-elements@latest/dist/ionicpwaelements/ionicpwaelements.esm.js"></script>
<script nomodule src="https://unpkg.com/@ionic/pwa-elements@latest/dist/ionicpwaelements/ionicpwaelements.js"></script>
```

2 ボディから `<script type="module" src="https://unpkg.com/@ionic/pwa-elements@latest/dist/ionicpwaelements/ionicpwaelements.esm.js">` HTML要素を削除

3 スクリプトインポートを `capacitor.js` から `js/main.js` に更新します。これがバンドルされたJavaScriptファイルになります。

4 `js/capacitor-welcome.js` インポートを削除します。これで `index.html` の準備が整いました。

## vite.config.js

Node.jsモジュールを[**Vite**](https://vitejsdev/)でバンドルするために、バンドルされたスクリプトの出力先を指定する設定ファイルが必要です。次の設定では、ファイル `src/index.js` を取り出し、プロダクション用に `www/js/main.js` としてバンドルします：

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

`capacitor.config.json` ファイル内で、 `"bundledWebRuntime": true` プロパティを見つけ、 `false` に変更します。この調整により、Capacitorはファイルをバンドルせず、その目的のためにViteを使用できるようになります。

これらの変更により、Capacitorアプリケーションの基本設定が完了し、純粋なJavaScriptでアプリの開発を開始する準備が整いました。

## ‣ アプリの開発

基盤が整ったので、 `src/index.js` ファイルでアプリケーションロジックの記述を開始できます。ここで、必要なNode.jsモジュールをインポートしたり、アプリの機能を定義したり、Capacitorのネイティブプラグインと対話したりできます。

変更を加えるたびに、JavaScriptファイルをバンドルするためにViteのビルドコマンドを実行することを忘れないでください：

```bash
vite build
```

このコマンドにより、 `www/js` ディレクトリ内に `main.js` ファイルが生成され、 `index.html` ファイルで参照されます。

## ‣ テストとデバッグ

Capacitorは、さまざまなプラットフォームでアプリケーションをテストする便利な方法を提供します。次のコマンドを使用して、各プラットフォームの開発環境でアプリを開きます：

Android用：
```bash
npx cap add android
npx cap open android
```

iOS（macOS専用）用：
```bash
npx cap add ios
npx cap open ios
```

Web/PWA用：
```bash
npx cap serve
```

これらのコマンドを使用すると、Android Studio、Xcode、またはウェブブラウザでアプリケーションを実行でき、必要に応じてテストやデバッグが可能です。

## ‣ 結論

CapacitorJSを使用して純粋なJavaScriptでクロスプラットフォームアプリケーションを開発することは、単一のコードベースで複数のプラットフォーム用のアプリを作成するためのコスト効率が高く効率的な方法です。このガイドに従うことで、プロジェクトをセットアップし、Vite用に再構築し、アプリを開発のために準備しました。この基盤があれば、堅牢で多用途なアプリケーションを構築する道を順調に進んでいます。

すべてのプラットフォームで徹底的にテストを行い、Capacitorのネイティブプラグインを活用してアプリの機能を強化することを忘れないでください。コーディングを楽しんでください！