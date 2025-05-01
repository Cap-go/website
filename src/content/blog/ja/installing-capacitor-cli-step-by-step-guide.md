---
slug: installing-capacitor-cli-step-by-step-guide
title: 'Installation der Capacitor CLI: Schritt-für-Schritt-Anleitung'
description: >-
  Lernen Sie, wie Sie das Capacitor CLI installieren und konfigurieren, um Ihre
  Webanwendung effizient in eine native mobile Anwendung umzuwandeln.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-04T02:49:29.961Z
updated_at: 2025-04-04T02:49:43.341Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67ef362eebbb9dc80641f34f-1743734983341.jpg
head_image_alt: モバイル開発
keywords: 'Capacitor, CLI, mobile app development, Node.js, Android, iOS, live updates'
tag: 'Development, Mobile, Updates'
published: true
locale: ja
next_blog: ''
---

**[Capacitor](https://capacitorjscom/) CLIを使用すると、1つのコードベースでWebアプリをネイティブのiOSおよびAndroidアプリに変換できます。** セットアップの手順は以下の通りです：

-   **前提条件**: [Nodejs](https://nodejsorg/en) (v16+)、npm、Webフレームワーク（React、Vue、Angularなど）をインストール
-   **[Capacitor CLIのインストール](https://capgoapp/docs/cli/commands)**: `npm install @capacitor/cli @capacitor/core`を実行し、`npx cap init`でプロジェクトを初期化
-   **プラットフォームの準備**: iOS (`npx cap add ios`) とAndroid (`npx cap add android`) のプラットフォームサポートを追加
-   **ビルドと同期**: `npm run build`と`npx cap sync`を使用してWebアセットをネイティブプロジェクトに転送
-   **オプションのライブアップデート**: [Capgo](https://capgoapp/)などのツールを使用して、アプリストアの遅延なしで即時にアップデートをプッシュ

Capacitor CLIはアプリの開発とメンテナンスを簡素化します。スムーズなセットアップとトラブルシューティングについてはガイドに従ってください。

## モバイルアプリを素早く構築！React + [Capacitor](https://capacitorjscom/) + [Tailwind](https://tailwindcsscom/) + [DaisyUI](https://daisyuicom/)

![Capacitor](https://assetsseobotaicom/capgoapp/67ef362eebbb9dc80641f34f/7e137b9b90adb3934b29b03381f213c1jpg)

[[HTML_TAG]][[HTML_TAG]]

## 始める前に

以下の手順に従って環境を整えましょう：

### [Nodejs](https://nodejsorg/en)とnpmのセットアップ

![Nodejs](https://assetsseobotaicom/capgoapp/67ef362eebbb9dc80641f34f/a74739743b1f15b8d0bf124a9c30cba9jpg)

Nodejsバージョン16以上が必要です。最新のLTSバージョンを推奨します。セットアップを確認するには、以下を実行します：

[[CODE_BLOCK]]

アップデートが必要な場合は、公式サイトからNodejs（npmを含む）をダウンロードしてください。

Nodejsの準備が整ったら、WebプロジェクトがCapacitorの要件を満たしていることを確認します。

### Webプロジェクトの確認

Webプロジェクトには以下が必要です：

-   **有効なpackagejson**: 適切に設定されていることを確認
-   **ビルドディレクトリ**: Webアセットが配置される場所（通常は`dist`または`www`）
-   **エントリーポイント**: ビルドディレクトリには`indexhtml`ファイルが必要

主要な`packagejson`フィールドの概要：

| 必須フィールド | 例の値 | 目的 |
| --- | --- | --- |
| name | "my-app" | プロジェクトの識別 |
| version | "100" | アプリのバージョン |
| build directory | "dist"または"www" | Webアセットの場所 |

Nodejsとウェブプロジェクトの準備が整ったら、プラットフォーム固有のツールのインストールに進みます。

### 必要なソフトウェアのインストール

**Android開発用：**

-   最新バージョンの**[Android Studio](https://developerandroidcom/studio)**をダウンロードしてインストール
-   少なくともAPIレベル22のAndroid SDKをセットアップ
-   `ANDROID_HOME`環境変数を設定

**iOS開発用（Macのみ）：**

-   **[Xcode](https://developerapplecom/xcode/) 14**以降をインストール
    
-   Command Line Toolsをインストール
    
-   [Homebrew](https://brewsh/)を使用して[CocoaPods](https://cocoapodsorg/)をインストール：
    
    [[CODE_BLOCK]]
    
-   Xcodeライセンスに同意：
    
    [[CODE_BLOCK]]
    

後でCapgoを統合する際は、安定したインターネット接続と有効なSSL証明書があることを確認してください。

これらの手順が完了したら、Capacitorの開発プロセスの準備が整います。次に、Capacitor CLIをインストールします。

## Capacitor CLIのインストール

環境が整ったら、Capacitor CLIをインストールして設定します。

### Capacitorパッケージの追加

npmを使用してCapacitor CLIとCoreパッケージをインストールします：

[[CODE_BLOCK]]

インストール後、[Capacitorのバージョン](https://capgoapp/plugins/ivs-player/)を確認します：

[[CODE_BLOCK]]

### プロジェクトのセットアップ

以下のコマンドでプロジェクトにCapacitorを初期化します：

[[CODE_BLOCK]]

初期化中に、以下の詳細の入力を求められます：

| 設定 | 説明 | 例 |
| --- | --- | --- |
| App Name | アプリストアに表示される名前 | "My Awesome App" |
| App ID | アプリの一意の識別子 | "commycompany |