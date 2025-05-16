---
slug: firebase-crashlytics-for-capacitor-apps
title: Capacitorアプリ向けFirebase Crashlytics
description: >-
  モバイルアプリにリアルタイムのクラッシュレポートを統合する方法を、iOSとAndroid向けのCrashlyticsのセットアップのステップバイステップガイドで学びましょう。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-21T03:55:39.168Z
updated_at: 2025-04-21T03:56:15.479Z
head_image: >-
  https://assets.seobotai.com/capgo.app/6805ba51360079f947b8a1bf-1745207775479.jpg
head_image_alt: モバイル開発
keywords: >-
  Firebase, Crashlytics, mobile apps, Capacitor, app development, crash
  reporting, error tracking
tag: 'Development, Mobile, Updates'
published: true
locale: ja
next_blog: ''
---

**[Firebase Crashlytics](https://firebasegooglecom/docs/crashlytics)** はアプリのクラッシュをリアルタイムで追跡し、問題を素早く修正するための詳細なレポートを提供します。[Capacitor](https://capacitorjscom/) を使用したiOSとAndroidアプリの両方にシームレスに統合できます。以下が重要なポイントです：

-   **Crashlyticsを使用する理由：**
    
    -   **リアルタイムのクラッシュアラート**を受信
    -   **自動的な問題のグループ化**による詳細なクラッシュレポートの分析
    -   重大なエラーを監視してアプリの安定性を維持
-   **セットアップ要件：**
    
    -   **[Nodejs](https://nodejsorg/en) (v16以上)**、**Capacitor (v4以上)**、**[Xcode](https://developerapplecom/xcode/) 14以上**と**[Android Studio](https://developerandroidcom/studio) Electric Eel**などのツールをインストール
    -   [Firebase](https://firebasegooglecom/)設定ファイル（iOS用の`GoogleService-Infoplist`、Android用の`google-servicesjson`）をダウンロード
    -   `Podfile`（iOS）や`buildgradle`（Android）などのプラットフォーム固有のファイルを更新
-   **主要なステップ：**
    
    -   Crashlyticsのインストール：
        
        [[CODE_BLOCK]]
        
    -   アプリでCrashlyticsを初期化：
        
        [[CODE_BLOCK]]
        
-   **セットアップのテスト：**
    
    -   テストクラッシュのトリガー：
        
        [[CODE_BLOCK]]
        
-   **ボーナスヒント：** **[Capgo](https://capgo.app/)** とCrashlyticsを組み合わせることで、アプリストアの遅延なしでインスタントライブアップデートが可能

このガイドで、アプリのクラッシュを防ぎ、ユーザーフレンドリーにすることができます。今すぐFirebase Crashlyticsのセットアップを始めましょう！

## 2021年 Android ガイド：[Firebase Crashlytics](https://firebasegooglecom/docs/crashlytics) - カスタムクラッシュ

![Firebase Crashlytics](https://assets.seobotai.com/capgo.app/6805ba51360079f947b8a1bf/3578d58943ebaf5b91a7f0e1afb1607f.jpg)

[[HTML_TAG]][[HTML_TAG]]

## セットアップ要件

始める前に、以下のステップを完了していることを確認してください：

### 必要なソフトウェアとアカウント

以下のインストールが必要です：

-   **Nodejs**（v16以上）と**Capacitor**（v4以上）
-   アクティブなプロジェクトを持つ**Firebaseアカウント**
-   iOS開発用の**Xcode 14以上**
-   Android開発用の**Android Studio Electric Eel**以降のバージョン
-   最新バージョンの**[CocoaPods](https://cocoapodsorg/)**（iOS用に必要）

### プラットフォーム設定ファイル

**iOS向け：**

-   Firebase ConsoleからダウンロードしたのGoogle Service-Infoplistファイル
-   Crashlytics依存関係を含むようにPodfileを更新
-   Infoplistファイルに必要なプライバシーキーを追加

**Android向け：**

-   Firebase Consoleから`google-servicesjson`ファイルを取得
-   プロジェクトレベルとアプリレベルの両方の`buildgradle`ファイルを変更
-   必要な権限を含むように`AndroidManifestxml`を更新

### [Firebase](https://firebasegooglecom/) コンソールのセットアップ

![Firebase](https://assets.seobotai.com/capgo.app/6805ba51360079f947b8a1bf/e510e8ab32244fff0b09e93222500c83.jpg)

以下のステップでFirebaseをセットアップしCrashlyticsを有効化します：

1. **Firebaseプロジェクトを作成**してCrashlyticsを有効化
    
2. Firebase Consoleで**アプリを登録**：
    
    -   iOSには**バンドルID**を、Androidには**パッケージ名**を使用
    -   設定ファイルをダウンロード：`GoogleService-Infoplist`（iOS）と`google-servicesjson`（Android）
3. 以下の依存関係を追加してアプリにFirebase SDKsを統合：
    
    **Android用（アプリレベルの`buildgradle`）：**
    
    [[CODE_BLOCK]]
    
    **iOS用（`Podfile`）：**
    
    [[CODE_BLOCK]]
    

これらのステップが完了したら、プラグインのインストールセクションに進むことができます。

## インストールステップ

### プラグインのインストール

まず、プラグインをインストールし、[Capacitorと同期](https://capgo.app/plugins/capacitor-updater/)します：

[[CODE_BLOCK]]

次に、アプリでCrashlyticsを初期化します。以下のコードを`appcomponentts`または`maints`に追加します：

[[CODE_BLOCK]]

### プラットフォーム設定

AndroidとiOSプラットフォーム用の必要な設定をセットアップします。

**Androidのセットアップ**

1.