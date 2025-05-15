---
slug: capacitor-plugin-contribution-guide
title: Capacitor プラグイン貢献ガイド
description: >-
  Capacitor
  プラグインに効果的に貢献するための、セットアップ、コーディングスタンダード、テスト、ドキュメンテーションに関する包括的なガイドを学んでください。
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
[Capacitor](https://capacitorjs.com/) プラグインは、ウェブテクノロジーをネイティブデバイス機能と接続し、[クロスプラットフォームアプリ開発](https://capgo.app/blog/cross-platform-mobile-app-development-guide-2024/)を可能にします。このガイドは、あなたを助けます：

-   **環境を設定する**: [Node.js](https://nodejs.org/en)、[Xcode](https://developer.apple.com/xcode/)、および [Android Studio](https://developer.android.com/studio) のようなツールは必須です。
-   **コードスタンダードに従う**: 一貫した命名規則とエラーハンドリングを使用して、[TypeScript](https://www.typescriptlang.org/)、[Swift](https://developer.apple.com/swift/)、および [Kotlin](https://kotlinlang.org/)を使用してください。
-   **徹底的にテストする**: JavaScript、iOS、およびAndroidのユニットテストを書いて、信頼性を確保してください。
-   **明確に文書化する**: 簡単に採用できるようにJSDocとREADMEファイルを使用してください。
-   **プルリクエストを提出する**: 貢献する前に、高品質のコード、テスト、ドキュメンテーションを確保してください。

## オープンソースの完全ガイド - どのように貢献するか

<iframe src="https://www.youtube.com/embed/yzeVMecydCE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## 開発環境の設定

適切な開発環境を作成することは、効率的なプラグイン開発の鍵です。整ったセットアップにより、プラグインのコーディング、テスト、デプロイがスムーズに行えます。

### 必要なツールとスキル

始める前に、以下のツールがインストールされていることを確認してください：

| カテゴリ | 要件 |
| --- | --- |
| **コアツール** | Node.js (LTS)、npm 6+、Git |
| **IDE/エディタ** | [Visual Studio Code](https://code.visualstudio.com/) またはお気に入りのエディタ |
| **iOS開発** | Xcode、[SwiftLint](https://github.com/realm/SwiftLint)、[CocoaPods](https://cocoapods.org/) |
| **Android開発** | Android Studio、Android SDK、JDK |

ウェブ開発にはTypeScriptに慣れ、ネイティブ開発タスクにはSwift（iOS用）またはJava/Kotlin（Android用）にも慣れておく必要があります [\[1\]](https://github.com/capawesome-team/capacitor-plugins/blob/main/CONTRIBUTING.md)[\[2\]](https://github.com/ionic-team/capacitor-plugins/blob/main/CONTRIBUTING.md)。

### モノレポの設定

[Capacitorプラグイン](https://capgo.app/plugins/)エコシステムはモノレポ構造に依存しています。このアプローチにより、作業がコミュニティスタンダードに初めから整合することが保証されます。

1.  **リポジトリをフォークしてクローンする**  
    GitHubでCapacitorプラグインリポジトリをフォークから始めます。次に、フォークしたリポジトリをクローンします：

    ```bash
    git clone https://github.com/your-username/capacitor-plugins.git
    cd capacitor-plugins
    npm install
    ```
    
2.  **依存関係をインストールしてビルドする**  
    次のコマンドを実行して、必要なものをすべてインストールし、プラグインをビルドします：
    
    ```bash
    npm run build
    ```
    
3.  **バージョン管理を設定する**  
    変更にはフィーチャーブランチを使用し、フォークをアップストリームリポジトリと同期させておいてください。

### ネイティブプラットフォームの準備

クロスプラットフォーム開発には、iOS環境とAndroid環境の両方を構成する必要があります。

**iOSの場合：**

-   Mac App StoreからXcodeをダウンロードします。
    
-   次のコマンドを使用してコマンドラインツールをインストールします：
    
    ```bash
    xcode-select --install
    ```
    
-   次のコマンドでCocoaPodsをインストールします：
    
    ```bash
    sudo gem install cocoapods
    ```
    
-   Apple Developerアカウントと必要な証明書を設定します。
    
-   コード品質を維持するためにSwiftLintを使用します（オプション）。

**Androidの場合：**

-   Android Studioを最新のSDKおよび仮想デバイスと共にインストールします。
-   JDKがインストールされていることを確認します。
-   Android Studio内でAndroid SDKを適切に構成します。

これらのプラットフォームが設定されたら、確立されたコーディングプラクティスに従ってプラグイン開発に取り組むことができます。

## コードスタンダードガイド

開発環境が設定されたら、メンテナンスしやすく使用しやすいプラグインを作成するために、これらのガイドラインに従ってください。

### スタイルガイドの遵守

[Capacitorプラグインエコシステム](https://capgo.app/blog/capacitor-comprehensive-guide/)は、[ESLint](https://eslint.org/)、[Prettier](https://prettier.io/)、およびSwiftLintのようなツールを使用して厳格なコーディングスタンダードを遵守しています。必要なフォーマットの簡単な概要は以下の通りです：

| コンポーネント | フォーマット |
| --- | --- |
| 変数 | `deviceInfo` (キャメルケース) |
| クラス | `BatteryManager` (パスカルケース) |
| メソッド | `getLanguageCode()` (キャメルケース) |
| 定数 | `MAX_RETRY_COUNT` (スネークケース) |

プラグインは、TypeScriptを使用してより良い型安全性とES6+の機能（`async/await`など）を利用する必要があります。さらに、Swift（iOS用）およびKotlin（Android用）のプラットフォーム固有のコーディング慣行に従ってください。

### エラーおよび型管理

一貫したエラーハンドリングは、クロスプラットフォームの互換性にとって重要です。以下はその例です：

```typescript
async checkPermissions(): Promise<PermissionStatus> {
  try {
    const result = await this.implementation.checkPermissions();
    return result;
  } catch (error) {
    throw new Error(`Permission check failed: ${error.message}`);
  }
}
```

型の安全性を確保するために：

-   特定のユースケースに合わせたフォーカスされたインターフェースを使用します。
-   プラットフォーム固有の変種にはユニオン型を適用します。
-   実行時に型を検証するために型ガードを実装します [\[1\]](https://github.com/capawesome-team/capacitor-plugins/blob/main/CONTRIBUTING.md)。

### コード文書化

良いドキュメントは、プラグインをアクセスしやすくし、使いやすくするための鍵です。これらの実践に従ってください：

1.  **APIドキュメンテーション**: `@capacitor/docgen`で動作するJSDocコメントを書きます。例：

```typescript
/**
 * @description Get the device's current battery level
 * @returns Promise with the battery level percentage
 */
async getBatteryLevel(): Promise<{ level: number }>;
```

2.  **README構造**: インストール手順、構成指示、プラットフォーム固有の要件、使用例、詳細なAPIリファレンスなど、必要な情報を含めてください。

よく書かれたドキュメントは、プラグインが簡単に採用され、より広範なCapacitorコミュニティに貢献することを保証します。

###### sbb-itb-f9944d2

## プラグインテストガイド

Capacitorプラグインのテストは、スムーズな機能性と信頼性を確保するために、いくつかの重要な領域に焦点を当てることを含みます。

### ネイティブブリッジテスト

ネイティブブリッジテストは、JavaScriptとネイティブコード間の適切な通信を保証します。始めるには、各プラットフォームに特化したフレームワークでテスト環境を設定します。

以下はJavaScript側の[Jest](https://jestjs.io/)ユニットテストの例です：

```typescript
// Example of a Jest unit test for the JavaScript bridge
describe('DeviceInfo Plugin', () => {
  test('getBatteryLevel returns valid percentage', async () => {
    const result = await DeviceInfo.getBatteryLevel();
    expect(result.level).toBeGreaterThanOrEqual(0);
    expect(result.level).toBeLessThanOrEqual(100);
  });
});
```

ネイティブ側のテストには、iOSの場合はXCTest、Androidの場合はJUnitを使用します。以下はAndroidの例です：

```kotlin
@Test
fun testBatteryLevel() {
    val plugin = DeviceInfo()
    val result = plugin.getBatteryLevel()
    assertTrue(result.level in 0..100)
}
```

コアブリッジ機能が期待どおりに機能することを確認したら、完全なユーザーワークフローのテストに進んでください。

### 完全なプラグインチェック

プラグインがさまざまなシナリオでよく動作することを確認するために、いくつかのカテゴリをテストします：

| テストカテゴリ | 主要焦点分野 |
| --- | --- |
| 統合テスト | クロスプラットフォーム機能 |
| パフォーマンステスト | リソース使用量と応答時間 |
| セキュリティテスト | データ処理と権限のチェック |

複雑な機能を持つプラグインの場合、実際のユーザーシナリオをシミュレートします。たとえば、DeviceInfoプラグインをテストしている場合、次の内容を確認してください：

-   異なるネットワーク条件でのアップロード成功
-   正確な進行状況の報告
-   大きなファイル転送中のメモリ使用量

### [Capgo](https://capgo.app/)を使用したOTAテスト

![Capgo](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-02-17.jpg?auto=compress)

Capgoのオープンソースツールを使用することで、迅速に更新をデプロイおよびテストできます。使用方法は以下の通りです：

1.  dev、staging、およびproductionのような[更新チャンネル](https://capgo.app/docs/webapp/channels/)を設定します。
2.  CI/CDツールを使用してデプロイを自動化します。
3.  更新を即座にプッシュします。
4.  [Capgoダッシュボード](https://capgo.app/docs/webapp/)を介して性能と問題を監視します。

段階的なロールアウトの場合、Capgoでは更新を少数のユーザーに制限できます。たとえば、24時間ごとに25％のユーザーに新しいバージョンを展開できます：

```typescript
// Example configuration for staged rollout
{
  "plugin": "camera-plugin",
  "version": "1.2.0",
  "rollout": {
    "percentage": 25,
    "interval": "24h"
  }
}
```

この段階的アプローチは、完全なリリースの前にコミュニティのフィードバックを活用して早期に問題を特定するのに役立ちます。

## プルリクエストプロセス

変更を徹底的にテストしたら、プルリクエストを提出するためにこれらのステップに従ってください：

### PR提出チェックリスト

提出前に、以下の主要な領域がカバーされていることを確認してください：

| **カテゴリ** | **チェック内容** |
| --- | --- |
| **コード品質** | \- Swift/Kotlinの実装がウェブAPIと一致していることを確認します。 |
| **テスト** | \- 新しい機能に対してユニットテストを追加します。 <PermissionStatus>\- CI/CDパイプラインチェックが成功していることを確認します。 |
| **ドキュメンテーション** | \- README、インラインドキュメント、およびCHANGELOGを必要に応じて更新します。 |

### コミュニティガイドライン

コラボレーションの際には、以下のベストプラクティスに従ってください：

-   レビュアーのフィードバックに迅速に対応します。
-   討論を技術的な詳細に集中させます。
-   GitHubの提案機能を使用してコードの変更を提案します。
-   一度に1つの機能または問題に対処する小規模で集中したプルリクエストを提出します。

大きな変更の場合、最初にイシューを作成し、アプローチについて話し合うのが良いアイデアです。Capacitorチームは自動チェックのためにGitHub Actionsを利用し、すべてのチェックが通過する必要があります。

### Capgo統合ガイド

プラグインにライブ更新が含まれる場合、提出前にCapgoとシームレスに連携していることを確認してください：

1.  **バージョン管理**  
    プラグインに対して明確なセマンティックバージョニングを使用し、変更をすべてCHANGELOGに文書化します。Capgoのシステムは、ユーザーのデバイス間でのバージョンの採用を追跡するのに役立ちます。
    
2.  **CI/CD統合**  
    CI/CDパイプラインにCapgoを統合して、更新のデプロイを自動化します。
    
3.  **更新モニタリング**  
    デプロイの成功率を監視し、アプリストアのガイドラインに準拠することを確認します。

## まとめ

プラグインで意義のある貢献をするためには、確立されたプロセスに従い、コミュニティスタンダードを満たすことが重要です。これには、Capacitorのコーディングガイドラインに従い、作業を徹底的にテストすることが含まれます。

PRチェックリストは、高品質の提出が必要であることを強調しています。プラグインがライブ更新をサポートしている場合、先に述べたようにCapgoと統合することで、アプリストアの承認を待たずに迅速に更新をリリースできます。

PRがマージされたら、問題を追跡し、バージョンの更新をリリースすることで関与し続けてください。コミュニティとの定期的な交流、一貫したメンテナンス、および[Capacitorの更新を追跡する](https://capgo.app/plugins/capacitor-updater/)ことは、プラグインが役立ち続け、関連性を保つことを保証します。

ユーザーフィードバックに注意を払い、必要に応じて更新を行ってください。この継続的な努力はエコシステムの全体的な質を維持し、開発者にとってあなたのプラグインを価値あるものに保つのに役立ちます。
