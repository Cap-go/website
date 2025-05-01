---
slug: developing-cross-platform-apps-with-capacitorjs
title: 'Sviluppare App Multi-Piattaforma con CapacitorJS: Una Guida Passo dopo Passo'
description: >-
  Javascriptのコードベース1つで、Android、iOS、web（PWA）向けのクロスプラットフォームアプリケーションをCapacitorJSを使用して作成する方法を学びましょう。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://twitter.com/martindonadieu'
created_at: 2023-12-02T00:00:00.000Z
updated_at: 2023-12-14T00:00:00.000Z
head_image: /create_app_with_js.webp
head_image_alt: クロスプラットフォームアプリ開発
keywords: >-
  Capacitor, cross-platform, PWA, mobile app development, live updates, OTA
  updates, continuous integration, mobile app updates
tag: Tuto
published: true
locale: ja
next_blog: ''
---

モバイルアプリケーション開発の進化する世界において、プログレッシブウェブアプリケーション（PWA）の台頭により、新しいクロスプラットフォームランタイムの道が開かれました。これらのランタイムにより、ネイティブコードのみに依存することなく、Webベースのアプリケーションをアプリストアで提供することが可能になりました。[**CapacitorJS**](https://capacitorjs.com/)はそのような技術の1つで、開発者が単一のJavaScriptコードベースを使用して、シンプルなウェブサイトをAndroid、iOS、およびWebアプリケーションとしてデプロイすることを可能にします。このアプローチにより、開発コストが大幅に削減され、コーディング効率が向上します。

このガイドでは、追加のフレームワークを使用せず、純粋なJavaScriptを使用してアプリケーションを作成することに焦点を当てます。2021年において純粋なJavaScriptアプリ開発のリソースを見つけることは課題ですが、CapacitorJSを使用してアプリケーションを構築し、ネイティブプラグインを活用する包括的なチュートリアルを提供します。

## ‣ 前提条件

開始する前に、以下のツールがインストールされていることを確認してください：

- [**Node.js**](https://nodejs.org/en/) **(v14.16.1)** 以上
- **NPM (v7.6.2)** 以上
- [**Android Studio**](https://developer.android.com/studio/) Android アプリ開発用
- [**Xcode**](https://apps.apple.com/de/app/xcode/id497799835/?mt=12) iOS アプリ開発用（macOSのみ）

> **注意**: iOSアプリの開発はmacOSデバイスでのみ可能です

## ‣ Capacitorプロジェクトのセットアップ

Capacitorアプリケーションを作成するには、希望のフォルダに移動し、ターミナルで以下のコマンドを実行します：

```
npm init @capacitor/app
```

プロンプトに従ってパッケージをインストールし、プロジェクトをセットアップします。Capacitor v3では、プロジェクトディレクトリは以下のようになります：

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

初期セットアップが完了したら、次に進む準備が整いました。

## ‣ プロジェクトの再構築

JavaScriptファイルをバンドルするためにViteを使用するので、それに応じてプロジェクトを再構築しましょう：

- メインディレクトリに新しいフォルダ `src` を**作成**
- `src/` に新しいスクリプトファイル `index.js` を**作成**
- メインディレクトリにVite設定ファイル `vite.config.js` を**作成**
- `www/js/` から `capacitor-welcome.js` ファイルを**削除**

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

純粋なJavaScriptで動作するようにいくつかのファイルを修正しましょう：

## www/index.html

1. アプリをPWAとしてリリースしない場合は、[**Ionic PWA Elements**](https://capacitorjs.com/docs/web/pwa-elements/)のスクリプトインポートを削除します：

```
<script type="module" src="https://unpkg.com/@ionic/pwa-elements@latest/dist/ionicpwaelements/ionicpwaelements.esm.js"></script>
<script nomodule src="https://unpkg.com/@ionic/pwa-elements@latest/dist/ionicpwaelements/ionicpwaelements.js"></script>
```

2. bodyから`<script type="module" src="https://unpkg.com/@ionic/pwa-elements@latest/dist/ionicpwaelements/ionicpwaelements.esm.js">`HTML要素を削除します

3. スクリプトインポートを`capacitor.js`から`js/main.js`に更新します。これが私たちのバンドルされたJavaScriptファイルになります

4. `js/capacitor-welcome.js`のインポートを削除します。これで`index.html`の準備が整いました

## vite.config.js

[**Vite**](https://vitejs.dev/)でNodejsモジュールをバンドルするには、バンドルされたスクリプトの出力先を指定する設定ファイルが必要です。以下の設定により、`src/index.js`ファイルを取得し、`www/js/main.js`として本番用にバンドルします：

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

`capacitor.config.json`ファイルで、`"bundledWebRuntime": true`プロパティを探し、`false`に変更します。この調整により、Capacitorがファイルをバンドルせず、代わりにViteを使用できるようになります。

これらの変更により、Capacitorアプリケーションの基本的なセットアップが完了し、純粋なJavaScriptでアプリの開発を開始する準備が整いました。

## ‣ アプリの開発

基礎が整ったので、`src/index.js`ファイルでアプリケーションロジックの記述を開始できます。ここで、必要なNodejsモジュールをインポートし、アプリの機能を定義し、Capacitorのネイティブプラグインと対話することができます。

変更を加えるたびに、Viteのビルドコマンドを実行してJavaScriptファイルをバンドルすることを忘れないでください：

```bash
vite build
```

このコマンドにより、`index.html`ファイルが参照する`www/js`ディレクトリに`main.js`ファイルが生成されます。

## ‣ テストとデバッグ

Capacitorは、様々なプラットフォームでアプリケーションをテストする便利な方法を提供します。それぞれのプラットフォームの開発環境でアプリを開くには、以下のコマンドを使用します：

For Android:
```bash
npx cap add android
npx cap open android
```

For iOS (macOS only):
```bash
npx cap add ios
npx cap open ios
```

For Web/PWA:
```bash
npx cap serve
```

これらのコマンドを使用することで、Android Studio、Xcode、またはウェブブラウザでアプリケーションを実行し、必要に応じてテストやデバッグを行うことができます。

## ‣ まとめ

純粋なJavaScriptを使用してCapacitorJSでクロスプラットフォームアプリケーションを開発することは、単一のコードベースで複数のプラットフォーム向けのアプリを作成する、コスト効率の良い効果的な方法です。このガイドに従うことで、プロジェクトのセットアップ、Vite用の再構築、そして開発のためのアプリの準備が整いました。この基盤があれば、堅牢で汎用性の高いアプリケーションを構築する準備が整っています。

すべてのプラットフォームで徹底的にテストを行い、Capacitorのネイティブプラグインを活用してアプリの機能を強化することを忘れないでください。ハッピーコーディング！