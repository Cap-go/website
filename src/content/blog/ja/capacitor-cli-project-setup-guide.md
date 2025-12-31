---
slug: capacitor-cli-project-setup-guide
title: Capacitor CLIを使用したプロジェクト設定ガイド
description: Capacitor CLIを使用して、Webテクノロジーを使用してネイティブのiOSおよびAndroidアプリを作成する方法を、簡単な手順で説明します。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-18T03:02:50.225Z
updated_at: 2025-10-10T02:23:14.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/6801ba663c6b972ab5067847-1744945493935.jpg
head_image_alt: モバイル開発
keywords: >-
  Capacitor, CLI, mobile apps, iOS, Android, project setup, live updates,
  troubleshooting
tag: 'Development, Mobile, Updates'
published: true
locale: ja
next_blog: ''
---
**1つのコードベースでiOSとAndroidアプリを構築したいですか?** [Capacitor](https://capacitorjs.com/)CLIを使用すれば、Webテクノロジーを使用してネイティブアプリを作成するプロセスが簡単になります。以下のことを学びます:

- **クイックセットアップ**: Capacitor CLIをインストールし、数分でプロジェクトを初期化。
- **プラットフォーム統合**: 簡単なコマンドでiOSとAndroidのサポートを追加。
- **ライブアップデート**: [Capgo](https://capgo.app/)を使用して即座にOTAアップデートを実行。
- **一般的な修正**: 同期エラーやビルド失敗などの問題のトラブルシューティング。

**開始するための主要なステップ:**

1. [Node.js](https://nodejs.org/en)、npm、JDK、[Xcode](https://developer.apple.com/xcode/)、[Android Studio](https://developer.android.com/studio)をインストール。
2. `npm install @capacitor/core @capacitor/cli`を実行してプロジェクトを初期化。
3. `npx cap add ios`と`npx cap add android`を使用してiOSとAndroidプラットフォームを追加。
4. オプション: [アプリアップデート](https://capgo.app/plugins/capacitor-updater/)用にCapgoをセットアップ。

このガイドでは、Capacitor CLIのセットアップ、プラットフォームの構成、アプリのデプロイに必要なすべてを説明します。早速始めましょう！

## [Capacitor](https://capacitorjs.com/)の設定について

![Capacitor Framework Documentation Website](https://assets.seobotai.com/capgo.app/6801ba663c6b972ab5067847/7e137b9b90adb3934b29b03381f213c1.jpg)

<iframe src="https://www.youtube.com/embed/HufvY63esXs" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## セットアップ要件

開始するには、以下のツールがインストールされていることを確認してください:

- **Node.js** (バージョン14以降)と**npm**
- **Java JDK** (バージョン11以降)
- **Xcode** (iOSビルド用にバージョン12以降)
- **Android Studio** (Androidビルド用)
- **Capacitor CLI** (バージョン6または7)

_オプション:_ ライブアップデートを有効にしたい場合は、以下の「[Capgoセットアップガイド](https://capgo.app/docs/plugin/cloud-mode/getting-started/)」をご確認ください。

## CLIインストールの手順

開始する前に、**Node.js**、**npm**、**JDK**、**Xcode**、**Android Studio**がセットアップされていることを確認してください。準備ができたら、以下のコマンドでCapacitor CLIをインストールできます:

```bash
npm install --save @capacitor/core @capacitor/cli
npx cap init
```

このコマンドはCapacitorをインストールし、そのコアコンポーネントをセットアップします。

このステップが完了したら、**新規プロジェクトの作成**に進んでアプリケーションの構築を開始します。

## 新規プロジェクトの作成

[Capacitor CLIを使用して](https://capgo.app/docs/cli/commands/)プロジェクトを開始するには、以下の手順に従ってください:

```bash
mkdir my-app && cd my-app
npm init -y
npx cap init my-app com.company.app --web-dir dist
```

### 設定ファイルの更新

`capacitor.config.json`ファイルを編集して、以下の設定を含めます:

```json
{
  "appId": "com.company.app",
  "appName": "My App",
  "webDir": "dist",
  "bundledWebRuntime": false,
  "server": {
    "hostname": "app.example.com",
    "androidScheme": "https"
  }
}
```

更新が完了したら、この設定を使用してプロジェクトのCapacitorをセットアップします。

## プラットフォームのセットアップ

プロジェクトの構築が完了したら、iOSとAndroidのターゲットをセットアップする時です。

### iOSとAndroidの追加

Capacitor CLIを使用して、必要なプラットフォーム固有のパッケージをインストールします:

```bash
npm install @capacitor/ios @capacitor/android
npx cap add ios
npx cap add android
```

iOSの場合、Xcode 14以降、[CocoaPods](https://cocoapods.org/) 1.11以降、macOS 12以降が必要です。Androidの場合、Android Studio Giraffe (2022.3.1+)、JDK 17以降、[Gradle](https://gradle.org/) 7.5以降が必要です。

インストール後、Webアプリケーションの変更に合わせてネイティブターゲットを更新する必要があります。

### プラットフォームの更新

Webアプリを更新した後、プラットフォームを最新の変更と同期するには、以下の手順に従います:

```bash
npm run build
npx cap sync
```

`cap sync`コマンドは以下の2つのタスクを処理します:

- 更新されたWebアセットをネイティブプラットフォームにコピー
- ネイティブの設定とプラグインを最新の変更に合わせて更新

### IDEのセットアップ

適切なIDEでプラットフォーム固有のプロジェクトを開きます:

```bash
npx cap open ios     # Opens Xcode
npx cap open android # Opens Android Studio
```

**Xcodeで:**

1. 開発チームを選択。
2. 署名証明書をセットアップ。
3. バンドル識別子を更新。

**Android Studioで:**

1. `build.gradle`でアプリケーションIDを変更。
2. 署名用のキーストアを設定。
3. デバッグとリリースのビルドバリアントをセットアップ。

すべての設定が完了したら、`npx cap build ios`または`npx cap build android`でプロジェクトをビルドします。すべてのアセットが最新であることを確認するために、`npx cap sync`を再度実行することを忘れないでください。

## [Capgo](https://capgo.app/)セットアップガイド

![Capgo Live Update Dashboard Interface](https://assets.seobotai.com/capgo.app/6801ba663c6b972ab5067847/d09851ee64a6d6c4e2e08ff1d656af11.jpg)

アプリの即時OTAアップデートを有効にするためにCapgoをセットアップします。

### Capgoの主な機能

Capgoはアプリのアップデートを合理化するためのいくつかのツールを提供します:

- **エンドツーエンドの暗号化**でアップデートの安全な配信を保証。
- アップデートはアプリ起動時に**バックグラウンドで**実行。
- **分析ツール**でアップデートの成功率とユーザーエンゲージメントを追跡。
- **ワンクリックロールバック**オプションで問題のあるアップデートから素早く復旧。
- **[チャネルシステム](https://capgo.app/docs/plugin/cloud-mode/channel-system/)**で段階的なロールアウトとベータテストを実施。

### Capgoのインストール

Capgoを開始するには以下の手順に従ってください:

1. [Capgo CLIをインストール](https://capgo.app/docs/self-hosted/local-dev/cli/):

    ```bash
    npm install --save @capgo/cli
    ```

2. プロジェクトで[Capgoを初期化](https://capgo.app/docs/webapp/):

    ```bash
    npx capgo init
    ```

3. アップデートのビルドとリリース:

    ```bash
    npm run build
    npx capgo release
    ```

4. アプリを開いてバックグラウンドアップデートプロセスをトリガー。

### ベストプラクティス

- チャネルを使用してアップデートを全ユーザーにロールアウトする前にテスト。
- 分析を監視してアップデートが正常に配信され、ユーザーが関与し続けていることを確認。
- エラートラッキングを有効にして早期に問題を発見し修正。
- 問題に素早く対応できるようにロールバック機能を準備。

CapgoはCapacitor 6と7に対応し、CI/CDパイプラインとスムーズに統合され、AppleとGoogleのストア要件に準拠しています。

## 一般的な問題とヒント

プラットフォームとCapgoのセットアップが完了したら、いくつかの一般的なエラーに遭遇する可能性があります。以下に素早く対処する方法を説明します。

### 環境セットアップの問題

- **CLIが見つからない**  
    **エラー**: `npx cap`コマンドが失敗。  
    **修正**: `npm install --save @capacitor/cli @capacitor/core`を実行して再試行。

- **Nodeバージョンの不一致**  
    **エラー**: Node.jsバージョンエラーによりCLIコマンドが失敗。  
    **修正**: セットアップ要件に記載されているNode.jsバージョン14以降をインストール。

### 設定の問題

- **設定の不一致**  
    **エラー**: `capacitor.config.json`の変更が反映されない。  
    **修正**: `appId`と`webDir`の値が`package.json`とWebビルド出力フォルダと一致していることを確認。

- **プラットフォーム同期エラー**  
    **エラー**: `npx cap sync`の実行でプラグインバージョンの競合が発生。  
    **修正**: `@capacitor/android`と`@capacitor/ios`を同じメジャーバージョンに更新し、同期コマンドを再実行。

### ビルドとデプロイメント

- **ビルド署名の失敗**  
    **エラー**: 証明書やキーストアが不足しているためiOSまたはAndroidのビルドが失敗。  
    **修正**: IDEセットアップの手順に従う。iOSの場合はXcodeで開発チームを追加。Androidの場合は`build.gradle`でキーストアを設定。

- **Webディレクトリが見つからない**  
    **エラー**: `npx cap sync`がWebアセットを見つけられない。  
    **修正**: プラットフォームを同期する前にWebビルドコマンド（例：`npm run build`）を実行。

### ライブアップデートの問題

- **[Capgoアップデートの失敗](https://capgo.app/docs/plugin/cloud-mode/manual-update/)**  
    **エラー**: プロダクションアプリでアップデートが表示されない。  
    **修正**: `capacitor.config.json`の[Capgo APIキー](https://capgo.app/docs/webapp/api-keys/)を確認し、正しいチャネルをターゲットにしていることを確認。

プラットフォーム固有のセットアップの詳細については、プラットフォームセットアップセクションを参照してください。ライブアップデートを使用している場合は、追加のトラブルシューティングのヒントについてCapgoセットアップガイドを参照してください。

## まとめ

### セットアップの確認

Capacitor CLIでWebアプリを開始し、iOSとAndroidプラットフォームをセットアップし、オプションでライブアップデート用にCapgoを含めます。

開始方法は以下の通りです:

- Capacitor CLIを使用してプロジェクトを初期化。
- アプリのパッケージIDを設定し、Web出力ディレクトリを定義。
- iOSとAndroidプラットフォームのサポートを追加。
- 以下のコマンドでCapgoをインストールしセットアップ: `npm install --save @capgo/cli && npx capgo init`

詳細なセットアップ手順やトラブルシューティングについては、公式のCapacitorとCapgoのドキュメントを参照してください。
