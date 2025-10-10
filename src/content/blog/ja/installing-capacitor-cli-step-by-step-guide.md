---
slug: installing-capacitor-cli-step-by-step-guide
title: 'Capacitor CLIのインストール: ステップバイステップガイド'
description: Webアプリを効率的にネイティブモバイルアプリに変換するために、Capacitor CLIのインストールと構成を学びましょう。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-04T02:49:29.961Z
updated_at: 2025-10-10T02:23:14.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67ef362eebbb9dc80641f34f-1743734983341.jpg
head_image_alt: モバイル開発
keywords: 'Capacitor, CLI, mobile app development, Node.js, Android, iOS, live updates'
tag: 'Development, Mobile, Updates'
published: true
locale: ja
next_blog: ''
---
**[Capacitor](https://capacitorjs.com/) CLIは、1つのコードベースでWebアプリをネイティブのiOSおよびAndroidアプリに変換するのに役立ちます。** ここでは、迅速にセットアップする方法を紹介します：

-   **前提条件**： [Node.js](https://nodejs.org/en) (v16以上)、npm、Webフレームワーク（React、Vue、Angularなど）をインストールします。
-   **[Capacitor CLIをインストール](https://capgo.app/docs/cli/commands)**： `npm install @capacitor/cli @capacitor/core` を実行し、 `npx cap init` でプロジェクトを初期化します。
-   **プラットフォームの準備**： iOS （`npx cap add ios`）とAndroid （`npx cap add android`）プラットフォームのサポートを追加します。
-   **ビルドと同期**： `npm run build` と `npx cap sync` を使用して、Webアセットをネイティブプロジェクトに転送します。
-   **オプションのライブアップデート**： [Capgo](https://capgo.app/) のようなツールを使用して、アプリストアの遅延なしに即座にアップデートをプッシュします。

Capacitor CLIは、アプリ開発と保守を簡素化します。スムーズなセットアップとトラブルシューティングのために、ガイドに従ってください。

## モバイルアプリを迅速に構築！ React + [Capacitor](https://capacitorjs.com/) + [Tailwind](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)

![Capacitor](https://assets.seobotai.com/capgo.app/67ef362eebbb9dc80641f34f/7e137b9b90adb3934b29b03381f213c1.jpg)

<iframe src="https://www.youtube.com/embed/PPXktTJXMPE" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## 始める前に

以下の手順に従って環境を整えます：

### [Node.js](https://nodejs.org/en) と npmの設定

![Node.js](https://assets.seobotai.com/capgo.app/67ef362eebbb9dc80641f34f/a74739743b1f15b8d0bf124a9c30cba9.jpg)

Node.jsのバージョン16以上が必要です。最新のLTSバージョンを推奨します。セットアップを確認するには、以下を実行します：

```bash
node --version
npm --version
```

更新が必要な場合は、公式ウェブサイトからNode.js（npmを含む）をダウンロードしてください。

Node.jsの準備ができたことを確認したら、Webプロジェクトが必要なCapacitorの要件を満たしていることを確認してください。

### Webプロジェクトの確認

Webプロジェクトには以下が必要です：

-   **有効なpackage.json**：正しく構成されていることを確認してください。
-   **ビルドディレクトリ**：Webアセットが格納される場所（一般的に `dist` または `www`）。
-   **エントリーポイント**：ビルドディレクトリに `index.html` ファイルが含まれている必要があります。

以下は主要な `package.json` フィールドの簡単な説明です：

| 必要なフィールド | 例 | 目的 |
| --- | --- | --- |
| name | "my-app" | プロジェクトを識別 |
| version | "1.0.0" | アプリバージョンを指定 |
| build directory | "dist" または "www" | Webアセットを指す |

Node.jsとWebプロジェクトの準備が整ったら、プラットフォーム特有のツールをインストールします。

### 必要なソフトウェアをインストール

**Android開発の場合：**

-   最新版の **[Android Studio](https://developer.android.com/studio)** をダウンロードしてインストールします。
-   少なくともAPIレベル22のAndroid SDKをセットアップします。
-   `ANDROID_HOME` 環境変数を設定します。

**iOS開発の場合（Macのみ）：**

-   **[Xcode](https://developer.apple.com/xcode/) 14** 以上をインストールします。
    
-   コマンドラインツールをインストールします。
    
-   [Homebrew](https://brew.sh/) を使用して [CocoaPods](https://cocoapods.org/) をインストールします：
    
    ```bash
    brew install cocoapods
    ```
    
-   Xcodeのライセンスに同意します：
    
    ```bash
    sudo xcodebuild -license accept
    ```
    

後でCapgoを統合する際は、安定したインターネット接続と有効なSSL証明書を用意してください。

これらの手順が完了したら、Capacitorの開発プロセスがスムーズに進められるようになります。次に、Capacitor CLIをインストールします。

## Capacitor CLIのインストール

環境が整ったので、Capacitor CLIをインストールして設定します。

### Capacitorパッケージの追加

npmを使用してCapacitor CLIおよびCoreパッケージをインストールします：

```bash
npm install @capacitor/cli @capacitor/core
```

インストールが完了したら、[Capacitorバージョン](https://capgo.app/plugins/ivs-player/)をチェックしてセットアップを確認します：

```bash
npx cap --version
```

### プロジェクトのセットアップ

以下のコマンドでプロジェクトにCapacitorを初期化します：

```bash
npx cap init
```

初期化中に、以下の詳細を提供するように求められます：

| 設定 | 説明 | 例 |
| --- | --- | --- |
| アプリ名 | アプリストアに表示される名前 | "My Awesome App" |
| アプリID | アプリのユニークな識別子 | "com.mycompany.myapp" |
| Webディレクトリ | Webアセットへのパス | "dist" または "www" |

次に、関連する設定を含む設定ファイル（`capacitor.config.ts`または`capacitor.config.json`）を更新します：

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mycompany.myapp',
  appName: 'My Awesome App',
  webDir: 'dist',
  bundledWebRuntime: false
};

export default config;
```

### iOSおよびAndroidのセットアップ

以下のコマンドでiOSおよびAndroidプラットフォームのサポートを追加します：

```bash
npx cap add ios
npx cap add android
```

これにより、ネイティブプロジェクトが生成されます：

-   **iOS**：Xcodeプロジェクトを含む `ios` フォルダーを作成します。
-   **Android**：Android Studioプロジェクト用の `android` フォルダーを作成します。

Webアセットに変更を加えた後、以下のコマンドを実行してビルドと同期を行います：

```bash
npm run build
npx cap sync
```

このプロセスはWebアセットをコンパイルし、ネイティブプロジェクトに転送します。インストールされた[Capacitorプラグイン](https://capgo.app/plugins/)も含めて、転送されます。

カスタマイズのためにネイティブプロジェクトを開くには：

```bash
npx cap open ios     # Opens Xcode
npx cap open android # Opens Android Studio
```

これで、セットアップをテストし、発生する可能性のある問題を解決する準備が整いました。

## 一般的な問題の修正

Capacitor CLIをセットアップする際に、いくつかの一般的な問題に遭遇することがあります。対処方法は以下の通りです：

### Android Gradleの問題

Gradle関連の問題に直面している場合は、以下の手順を試してください：

1.  Androidディレクトリに移動し、ビルドキャッシュをクリアします：
    
    ```bash
    cd android
    ./gradlew cleanBuildCache
    ```
    
2.  `android/build.gradle` のGradleバージョンを更新します：
    
    ```kotlin
    buildscript {
        ext {
            gradleVersion = '8.1.0'
        }
    }
    ```
    
3.  `android/gradle.properties` に以下の行を追加してパフォーマンスを向上させます：
    
    ```properties
    org.gradle.jvmargs=-Xmx4608m
    org.gradle.parallel=true
    ```
    

問題が解決しない場合は、セットアップを見直すか、追加のトラブルシューティングリソースを参照してください。

### アプリが空白の画面を表示する

空白の画面は通常、構成の問題を示しています。対応方法は以下の通りです：

-   **Webディレクトリパスの確認**： `webDir` がビルド出力と一致していることを確認します。
    
    ```typescript
    const config: CapacitorConfig = {
        webDir: 'dist', // Adjust if necessary
    };
    ```
    
-   **サーバー設定の確認**：サーバー設定が正しいことを確認します。
    
    ```typescript
    server: {
        url: 'http://localhost:3000',
        cleartext: true
    }
    ```
    
-   **コンテンツセキュリティポリシーの更新**：リソースの正しい読み込みのためにこのメタタグをHTMLに追加します。
    
    ```html
    <meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' 'unsafe-eval' data: *">
    ```
    

### プラグインが動作しない

プラグインが期待通りに動作しない場合、以下の手順を実行します：

1.  依存関係のクリーンインストールを実行します：
    
    ```bash
    rm -rf node_modules
    npm cache clean --force
    npm install
    ```
    
2.  `capacitor.config.ts`のプラグイン設定を確認して、正しく設定されていることを確認します：
    
    ```typescript
    plugins: {
        PluginName: {
            option: 'value'
        }
    }
    ```
    

[Capgoのネイティブプラグイン](https://capgo.app/plugins/)を使用している場合、自動的にプラグインを同期し、アップデート中の互換性を維持します。

これらの修正を適用した後、プロジェクトを再ビルドして変更を確認します：

```bash
npm run build && npx cap copy && npx cap sync
```

すべてがスムーズに動作するようになったら、Capgoを使用したライブアップデートオプションの探索を進めることができます。

## [Capgo](https://capgo.app/)によるライブアップデート

![Capgo](https://assets.seobotai.com/capgo.app/67ef362eebbb9dc80641f34f/435c1a19c50c4ff1b7d76cbc4edeb6d0.jpg)

Capgoを使用して[アプリのアップデート](https://capgo.app/plugins/capacitor-updater/)を簡素化します。これにより、アプリストアのレビューをスキップしてユーザーに直接アップデートをプッシュできます。

**始めるのは簡単です。** まず、必要なパッケージをインストールします：

```bash
npm install @capgo/cli @capgo/capacitor-updater
npx cap sync
```

次に、プロジェクトにCapgoを初期化します：

```bash
npx @capgo/cli init
```

### 価格プラン

Capgoは、さまざまなニーズに合わせた複数の価格帯を提供しています：

| プラン | 月間アクティブユーザー | 帯域幅 | ストレージ | 価格 (年額) |
| --- | --- | --- | --- | --- |
| SOLO | 1,000 | 50 GB | 2 GB | $12/月 |
| MAKER | 10,000 | 500 GB | 5 GB | $33/月 |
| TEAM | 100,000 | 2,000 GB | 10 GB | $83/月 |

エンタープライズユーザー向けには、PAYGプランが$249/月から始まり、APIアクセスやカスタムドメイン、専用サポートなどの特典が含まれます。

### ライブアップデートの設定

ライブアップデートを有効にするには、`capacitor.config.ts`ファイルに以下を追加します：

```typescript
{
  plugins: {
    CapacitorUpdater: {
      autoUpdate: true,
      updateUrl: 'https://api.capgo.app/updates'
    }
  }
}
```

### 主な機能

Capgoは、いくつかの際立った機能を提供します：

-   **[安全なアップデート](https://capgo.app/docs/plugin/cloud-mode/hybrid-update/)**　エンドツーエンドの暗号化による
-   **統合されたCI/CDを介した自動デプロイ**
-   **ユーザー割り当てによるターゲット更新**
-   **バージョン管理による即時ロールバック**
-   **更新を追跡するためのリアルタイム分析**

### デプロイコマンド

デプロイする前に、開発環境での更新をテストします。以下のコマンドを使用します：

-   ステージングにデプロイ：
    
    ```bash
    npx @capgo/cli deploy --channel staging
    ```
    
-   プロダクションにデプロイ：
    
    ```bash
    npx @capgo/cli deploy --channel production
    ```
    

CapgoはAppleとAndroidのガイドラインに準拠しているため、ライブアップデートがアプリストアの違反のリスクを冒すことはありません。インストール後のCapacitorアプリを管理する効率的な方法です。

## 結論

Capacitor CLIのセットアップは、適切な前提条件を整えることで簡単になります。このセットアップにより、アプリのアップデートがスムーズになり、効率的な開発ワークフローが実現します。

現代のツールは、アプリの保守をこれまで以上に容易にします。たとえば、Capgoは現在ライブアップデートを提供し、従来の方法を置き換えています。CLIインストールとの統合により、Capacitorアプリで作業する開発者にとって優れた選択肢となっています。

[Capacitorエコシステム](https://capgo.app/blog/capacitor-comprehensive-guide/)は、新しいツールや機能で常に改善されています。CLIのインストールは[モバイルアプリの構築](https://capgo.app/blog/angular-mobile-app-capacitor/)の出発点に過ぎず、詳細なドキュメントや活発な開発者コミュニティから利益を得られます。

Capacitor CLIとそのパッケージを最新の状態に保って、互換性の問題を避けることを忘れないでください。
