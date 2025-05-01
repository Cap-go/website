---
slug: capacitor-plugin-contribution-guide
title: Capacitor Plugin Beitragsanleitung
description: Capacitor プラグインへの効果的な貢献方法について、設定、コード規約、テスト、ドキュメントに関する包括的なガイドを学びましょう。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-02-17T05:00:51.296Z
updated_at: 2025-03-18T13:13:57.261Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67b290a70d4a761ccc9919b5-1739768465938.jpg
head_image_alt: モバイル開発
keywords: >-
  Capacitor, plugins, development, mobile, coding standards, testing,
  documentation, contribution, open source
tag: 'Development, Mobile, Updates'
published: true
locale: ja
next_blog: ''
---

[Capacitor](https://capacitorjscom/) プラグインは、Webテクノロジーとネイティブデバイス機能を接続し、[クロスプラットフォームアプリ開発](https://capgoapp/blog/cross-platform-mobile-app-development-guide-2024/)を可能にします。このガイドは以下を支援します：

-   **環境のセットアップ**: [Nodejs](https://nodejsorg/en)、[Xcode](https://developerapplecom/xcode/)、[Android Studio](https://developerandroidcom/studio)などのツールが必要不可欠です
-   **コード規約の遵守**: 一貫した命名規則とエラー処理を含む[TypeScript](https://wwwtypescriptlangorg/)、[Swift](https://developerapplecom/swift/)、[Kotlin](https://kotlinlangorg/)の使用
-   **徹底的なテスト**: 信頼性を確保するためのJavaScript、iOS、Androidのユニットテストの作成
-   **明確なドキュメント作成**: 簡単に採用できるようにJSDocとREADMEファイルを使用
-   **プルリクエストの提出**: 高品質なコード、テスト、ドキュメントを確保してから貢献

## オープンソースの完全ガイド - 貢献方法

[[HTML_TAG]][[HTML_TAG]]

## 開発環境のセットアップ

適切な開発環境の構築は、効率的なプラグイン開発の鍵となります。よく準備された環境により、スムーズなコーディング、テスト、プラグインのデプロイが可能になります。

### 必要なツールとスキル

開始する前に、以下のツールがインストールされていることを確認してください：

| カテゴリー | 要件 |
| --- | --- |
| **コアツール** | Nodejs (LTS)、npm 6+、Git |
| **IDE/エディタ** | [Visual Studio Code](https://codevisualstudiocom/) または好みのエディタ |
| **iOS開発** | Xcode、[SwiftLint](https://githubcom/realm/SwiftLint)、[CocoaPods](https://cocoapodsorg/) |
| **Android開発** | Android Studio、Android SDK、JDK |

また、Web開発のためのTypeScriptと、ネイティブ開発タスクのためのSwift（iOS用）またはJava/Kotlin（Android用）に精通している必要があります [\[1\]](https://githubcom/capawesome-team/capacitor-plugins/blob/main/CONTRIBUTINGmd)[\[2\]](https://githubcom/ionic-team/capacitor-plugins/blob/main/CONTRIBUTINGmd)

### モノレポのセットアップ

[Capacitor プラグイン](https://capgoapp/plugins/)エコシステムは、モノレポ構造に依存しています。このアプローチにより、最初からコミュニティ標準に沿った作業が保証されます。

1.  **リポジトリのフォークとクローン**  
    GitHubでCapacitorプラグインリポジトリをフォークすることから始めます。その後、フォークしたリポジトリをクローンします：
    
    [[CODE_BLOCK]]
    
2.  **依存関係のインストールとビルド**  
    必要なものすべてをインストールしてプラグインをビルドするために、以下のコマンドを実行します：
    
    [[CODE_BLOCK]]
    
3.  **バージョン管理のセットアップ**  
    変更にはフィーチャーブランチを使用し、フォークをアップストリームリポジトリと同期させておきます

### ネイティブプラットフォームの準備

クロスプラットフォーム開発のために、iOSとAndroid両方の環境を設定する必要があります。

**iOS向け：**

-   Mac App StoreからXcodeをダウンロード
    
-   以下を使用してコマンドラインツールをインストール：
    
    [[CODE_BLOCK]]
    
-   以下でCocoaPodsをインストール：
    
    [[CODE_BLOCK]]
    
-   Apple Developer アカウントと必要な証明書を設定
    
-   コード品質維持のためにSwiftLintを使用（任意）
    

**Android向け：**

-   最新のSDKと仮想デバイスを含むAndroid Studioをインストール
-   JDKがインストールされていることを確認
-   Android Studio内でAndroid SDKを適切に設定

これらのプラットフォームのセットアップが完了したら、確立されたコーディング規約に従ってプラグイン開発に着手できます。

## コード規約ガイド

開発環境のセットアップが完了したら、メンテナンスと使用が容易なプラグインを構築するために、これらのガイドラインに従ってください。

### スタイルガイドの遵守

[Capacitorプラグインエコシステム](https://capgoapp/blog/capacitor-comprehensive-guide/)は、[ESLint](https://eslintorg/)、[Prettier](https://prettierio/)、SwiftLintなどのツールを使用して厳格なコーディング規約を適用しています。必要なフォーマットの概要は以下の通りです:

| コンポーネント | フォーマット |
| --- | --- |
| 変数 | `deviceInfo` (キャメルケース) |
| クラス | `BatteryManager` (パスカルケース) |
| メソッド | `getLanguageCode()` (キャメルケース) |
| 定数 | `MAX_RETRY_COUNT` (スネークケース) |

プラグインは、より良い型安全性とES6+の機能(例:`async/await`)のためにTypeScriptを使用する必要があります。また、iOS(Swift)とAndroid(Kotlin)のプラットフォーム固有のコーディング規約に従ってください。

### エラーと型の管理

クロスプラットフォームの互換性のために、一貫したエラー処理が重要です。例:

[[CODE_BLOCK]]

型安全性のために:

-   特定のユースケースに合わせた集中的なインターフェースを使用する
-   プラットフォーム固有のバリエーションにユニオン型を適用する
-   実行時に型を検証するための型ガードを実装する [\[1\]](https://githubcom/capawesome-team/capacitor-plugins/blob/main/CONTRIBUTINGmd)

### コードドキュメント

良いドキュメントは、プラグインをアクセスしやすく使いやすくするための鍵です。以下のプラクティスに従ってください:

1. **APIドキュメント**: `@capacitor/docgen`で動作するJSDocコメントを書く。例:

[[CODE_BLOCK]]

2. **README構造**: インストール手順、設定手順、プラットフォーム固有の要件、使用例、詳細なAPIリファレンスなどの重要な情報を含める

適切に書かれたドキュメントにより、プラグインの採用が容易になり、Capacitorコミュニティに貢献することができます。

###### sbb-itb-f9944d2

## プラグインテストガイド

Capacitorプラグインのテストには、機能性と信頼性を確保するために重要な領域に焦点を当てる必要があります。

### ネイティブブリッジテスト

ネイティブブリッジテストは、JavaScriptとネイティブコード間の適切な通信を確保します。各プラットフォームに合わせたテストフレームワークでテスト環境をセットアップしてください。

JavaScriptサイドの[Jest](https://jestjsio/)単体テストの例:

[[CODE_BLOCK]]

ネイティブサイドのテストには、iOSではXCTest、AndroidではJUnitを使用します。Androidの例:

[[CODE_BLOCK]]

コアブリッジ機能が期待通りに動作することを確認したら、完全なユーザーワークフローのテストに移ります。

### 完全なプラグインテスト

プラグインが異なるシナリオで正しく動作することを確認するため、様々なカテゴリーをテストします:

| テストカテゴリー | 重要な焦点領域 |
| --- | --- |
| 統合テスト | クロスプラットフォーム機能 |
| パフォーマンステスト | リソース使用量とレスポンスタイム |
| セキュリティテスト | データ処理とパーミッションチェック |

複雑な機能を持つプラグインの場合、実際のユーザーシナリオをシミュレートします。例えば、DeviceInfoプラグインをテストする場合は以下を確認します:

-   異なるネットワーク状態でのアップロードの成功
-   正確な進行状況のレポート
-   大きなファイル転送時のメモリ使用量

### [Capgo](https://capgoapp/)でのOTAテスト

![Capgo](https://mars-imagesimgixnet/seobot/screenshots/capgoapp-26aea05b7e2e737b790a9becb40f7bc5-2025-02-17jpg?auto=compress)

Capgoのオープンソースツールを使用すると、更新を素早くデプロイしてテストできます。使用方法:

1. dev、staging、productionなどの[更新チャンネル](https://capgoapp/docs/webapp/channels/)をセットアップする
2. CI/CDツールでデプロイを自動化する
3. 更新を即時にプッシュする
4. [Capgoダッシュボード](https://capgoapp/docs/webapp/)でパフォーマンスと問題を監視する

段階的なロールアウトでは、Capgoを使用して更新を少数のユーザーに制限できます。例えば、24時間ごとにユーザーの25%に新バージョンをロールアウトできます:

[[CODE_BLOCK]]

この段階的なアプローチにより、完全リリース前にコミュニティのフィードバックを活用して早期に問題を特定できます。

## プルリクエストのプロセス

変更を十分にテストしたら、以下の手順に従ってプルリクエストを提出してください:

### PRの提出チェックリスト

提出前に、以下の主要な領域をカバーしていることを確認してください:

| **カテゴリー** | **確認事項** |
| --- | --- |
| **コード品質** | \- Swift/Kotlin実装がWeb APIと整合していることを確認 |
| **テスト** | \- 新機能に対するユニットテストを追加 |