---
slug: come-utilizzare-il-semantic-versioning-con-gli-aggiornamenti-capgo-ota
title: OTAアップデートでセマンティックバージョニングを使用する方法
description: >-
  Semantic Versioning と Capgo の OTA アップデートを使用して、Capacitor
  アプリのアプリアップデートとバージョン管理を簡素化する方法をご紹介します。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-03T04:48:38.491Z
updated_at: 2025-10-31T10:28:43.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67c4f6356c9ebce91891f4e6-1740977344964.jpg
head_image_alt: モバイル開発
keywords: >-
  Semantic Versioning, Capgo, OTA updates, Capacitor apps, version control, app
  updates, deployment, CI/CD
tag: 'Development, Mobile, Updates'
published: true
locale: ja
next_blog: ''
---
**[アプリの更新](https://capgo.app/plugins/capacitor-updater/)とバージョン管理を簡素化したいですか?** セマンティックバージョニング(SemVer)と[Capgo](https://capgo.app/)のOver-The-Air(OTA)アップデートを組み合わせることで、[Capacitor](https://capacitorjs.com/)アプリの管理がより簡単かつ迅速になります。以下がその方法です:

- **セマンティックバージョニングの基本:** バージョンは`MAJOR.MINOR.PATCH`の形式を使用します:
    
    - **MAJOR:** 互換性を破壊する変更
    - **MINOR:** 後方互換性のある新機能
    - **PATCH:** バグ修正
- **CapgoでSemVerを使用する理由**
    
    - アップデートに関する明確なコミュニケーション
    - スマートなバージョン管理
    - 依存関係の競合を回避
    - 体系的なリリース計画
- **[Capgoセットアップ](https://capgo.app/docs/cli/commands/)手順:**
    
    1. Capgoのアップデータープラグインをインストール
    2. `capacitor.config.json`と他のファイルでアプリのバージョンを設定
    3. APIキーで初期化
    4. [Capgo CLI](https://capgo.app/docs/cli/commands)を使用してアップデートのバンドルとアップロード
- **[バージョンとチャンネルの管理](https://capgo.app/docs/webapp/channels/)**
    
    - 別々のチャンネルを使用（例：テスト用の"beta"、安定版リリース用の"production"）
    - アップデートポリシーの制御（パッチの自動更新、メジャー変更の手動承認）
    - 失敗したアップデートのロールバックオプション
- **デプロイメントプロセス:**
    
    - SemVerルールに従ってバージョン番号を更新
    - デプロイ前に徹底的にテスト
    - CLIコマンドを使用してアップデートをアップロードおよび配布

Capgoは、中断を処理し安定性を維持するためのツールとともに、アップデートがユーザーに迅速かつ確実に届くことを保証します。CI/CDワークフローを使用してアップデートを自動化するチームに最適です。

**クイックヒント:** 常にアップデートをテストし、段階的なロールアウトを効果的に管理するためにチャンネルを使用してください。

## セマンティックバージョニング | レベルアップ

<Steps>

</Steps>

## [Capgo](https://capgo.app/)セットアップガイド

![Capgo](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-03-03.jpg?auto=compress)

OTAアップデートとバージョン管理を簡単に管理するためのCapgoのセットアップ方法を説明します。

### 初期セットアップ手順

[Capgoアップデータープラグイン](https://capgo.app/docs/plugin/self-hosted/manual-update/) をインストールから始めます:

```bash
npm install @capgo/capacitor-updater
npx cap sync
```

`capacitor.config.json`ファイルがセマンティックバージョン形式を使用していることを確認します:

```json
{
  "appId": "com.example.app",
  "appName": "Example App",
  "version": "1.0.0"
}
```

古いプロジェクトの場合、これらの場所でバージョン詳細を更新します:

- `package.json`（`version`フィールドを探す）
- `android/app/build.gradle`（`versionName`を更新）
- `ios/App/App.xcodeproj/project.pbxproj`（`CURRENT_PROJECT_VERSION`を更新）

設定が完了したら、APIキーでCapgoを初期化します:

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.initialize({
  apiKey: 'YOUR_API_KEY'
})
```

**クイックリファレンステーブル:**

| セットアップフェーズ | 主要なアクション | 検証ステップ |
| --- | --- | --- |
| インストール | プラグインのインストールと同期 | `package.json`の確認 |
| 設定 | バージョン番号の設定 | すべてのファイルで確認 |
| 初期化 | APIキーで接続 | 接続状態のテスト |
| ビルド | 初期バンドルの作成 | アップロード成功の確認 |

### バージョン管理の統合

Capgoは、CI/CDプラットフォームとうまく連携し、[自動更新](https://capgo.app/docs/live-updates/update-behavior/) を簡単にします。サポートされているプラットフォームには以下があります:

- [GitHub Actions](https://docs.github.com/actions)
- [GitLab CI](https://docs.gitlab.com/ee/ci/)
- [Azure DevOps](https://azure.microsoft.com/en-us/products/devops)
- [Jenkins](https://www.jenkins.io/)
- [CircleCI](https://circleci.com/)

ローカル開発で作業している場合、設定に以下を追加して自動更新を無効にできます:

```json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": false
    }
  }
}
```

これにより、Capgoがローカルの変更を上書きしないようになります。セットアップの準備が整ったら、最初のバージョンをアップロードします:

```bash
npx @capgo/cli bundle
npx @capgo/cli upload
```

最後に、アプリのメインファイルでバンドルの状態をネイティブプラグインに通知します:

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater'

await CapacitorUpdater.notifyAppReady()
```

このセットアップにより、アプリはスムーズなOTAデプロイメントとバージョン管理の準備が整います。

## Capgoでセマンティックバージョニングを使用する

### バージョン番号の管理

Capgoはセマンティックバージョニング(SemVer)を使用してアプリのバージョンを管理し、**MAJOR.MINOR.PATCH**の形式で表します。以下がその仕組みです:

- **メジャーバージョン(X.0.0)**: 互換性を破壊する変更の場合にMAJOR番号を増やします
- **マイナーバージョン(1.X.0)**: 互換性を保ったまま新機能を追加する場合にMINOR番号を増やします
- **パッチバージョン(1.0.X)**: 互換性に影響しないバグ修正の場合にPATCH番号を増やします

| バージョンタイプ | 増やすタイミング | [自動更新の動作](https://capgo.app/docs/plugin/cloud-mode/auto-update/) |
| --- | --- | --- |
| メジャー(X.0.0) | APIの破壊的変更の場合 | 手動承認が必要 |
| マイナー(1.X.0) | 新機能追加の場合 | Capgoで設定可能 |
| パッチ(1.0.X) | バグ修正の場合 | 通常は自動 |

SemVerのルールに従うことで、バージョン管理を簡素化し、デプロイメントチャンネル全体でよりスムーズな更新を確保できます。

### バージョン管理のガイドライン

Capgoを使用すると、ワークフローの異なるステージ用に個別のチャンネルを設定することで、デプロイメントを効果的に管理できます。

- **[チャンネルベースのバージョン管理](https://capgo.app/docs/webapp/channels/)**: テストと本番用に別々のチャンネルを作成してデプロイメントプロセスを整理します。例えば:
    
    - 新機能のテスト用に"beta"チャンネル（例：1.2.0-beta）を使用
    - 安定版リリース用に"production"チャンネル（例：1.2.0）を維持
    - プラットフォーム固有の問題に対処する場合はプラットフォーム固有のチャンネル（例：バージョン1.2.1の"ios-hotfix"）を追加
- **更新ポリシーの設定**: Capgoの設定オプションを使用して更新の適用方法を制御します。例えば:
    
    ```json
    {
      "plugins": {
        "CapacitorUpdater": {
          "autoUpdate": true,
          "updateTimeout": 300
        }
      }
    }
    ```
    
    この設定により、ユーザーは自動的にパッチ更新を受け取りますが、マイナーおよびメジャーな更新には手動承認が必要になります。
    
- **バージョンロールバック戦略**: プレリリース識別子を使用して、明確なロールバックオプションを維持します。このアプローチにより、問題が発生した場合に以前のバージョンに戻すことができ、すべてのチャンネルでバージョニングの一貫性を保つことができます。
    

これらのベストプラクティスにより、更新の管理、新機能のテスト、アプリのデプロイメントプロセスでの安定性の維持が容易になります。

## OTAアップデートのデプロイメント

バージョン管理のセットアップが完了したら、以下の手順に従ってOTAアップデートを効果的にデプロイします。

### アップデートの準備

まず、**package.json**と**capacitor.config.json**のバージョンを更新します。バージョンがSemVer形式(MAJOR.MINOR.PATCH)に従っていることを確認してください:

- **バグ修正**: PATCH番号を増やす（例：1.0.1 → 1.0.2）
- **新機能**: MINOR番号を増やす（例：1.0.0 → 1.1.0）
- **破壊的変更**: MAJOR番号を増やす（例：1.0.0 → 2.0.0）

ビルドを徹底的にテストし、アプリが`notifyAppReady`を使用してサーバーと通信することを確認します。

次に、[更新戦略](https://capgo.app/docs/plugin/cloud-mode/hybrid-update)を決定します。以下から選択できます:

- **自動更新**: 最小バージョン要件を自動的に強制
- **手動制御**: 更新の正確なバージョン要件を指定
- **チャンネルベース**: テストと段階的なロールアウト用にチャンネルを使用

### Capgo CLIアップデートコマンド

Capgoのを使用して簡単にアップデートをデプロイします。方法は以下の通りです:

```bash
# バンドルを作成
npx @capgo/cli bundle

# バンドルをアップロード
npx @capgo/cli upload --channel production
```

Capgoはエンドツーエンドの暗号化と安全なキー管理により、セキュアなデプロイメントを保証します。

> "@Capgoは、ホットコードプッシュを賢く行う方法です（@AppFlowのように全額支払う必要はありません）🙂"

デプロイ後、Capgoのダッシュボードで更新を監視できます。更新は通常、ユーザーがアプリを開いてから数分以内に届きます。プロセスは以下のように機能します:

- アプリが更新をチェック
- バックグラウンドで更新をダウンロード
- ユーザーがアプリを終了したときに新バージョンをアクティブとしてマーク
- 次回起動時に更新を適用

エンタープライズレベルのデプロイメントでは、CI/CD自動化を統合することをお勧めします。

> "私たちはアジャイル開発を実践しており、@Capgoはユーザーに継続的に提供する上で重要な役割を果たしています！"

## 問題解決とヒント

### バージョン管理の問題

Capgoでセマンティックバージョニングを管理すると、更新のデプロイメントが複雑になることがあります。開発作業の上書きを避けるために、`capacitor.config.json`ファイルで以下を設定します:

```json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": false,
      "disableAutoUpdateBreaking": true
    }
  }
}
```

更新が失敗した場合は、以下の対処が可能です:

- 開発中は`autoUpdate`を`false`に設定
- アプリをアンインストール
- 修正されたバージョンで再インストール
- すべてが安定したら自動更新を再度有効化

メジャーバージョンの更新には、`disableAutoUpdateBreaking`フラグを使用し、`majorAvailable`イベントを監視して更新を適

1. 以前の安定したバンドルにロールバックする。
2. 新しい修正のバージョン番号を増やす（注：削除後のバージョン番号は再利用できません）[\[2\]](https://github.com/Cap-go/CLI)。
3. アプリ起動時にアップデートが期待通りに動作することを確認する。

Capgoのアップデーターは障害に対応できるように設計されています。例えば、サーバーに到達できない場合やアップデートが削除された場合でも、アプリは正常に機能し続けます[\[3\]](https://capgo.app/docs/faq/) 。また、失敗したネットワークリクエストは次回のアプリ起動時に自動的に再試行されます[\[3\]](https://capgo.app/docs/faq/) 。この組み込みの回復力により、ダウンタイムを最小限に抑え、よりスムーズな運用を確保します。

## まとめ

セマンティックバージョニングとCapgoの組み合わせにより、CapacitorアプリのOTAアップデートがより効率的になりました。9億4760万回のアップデートが配信され、1,400のプロダクションアプリがこのシステムを使用しており[\[1\]](https://capgo.app/)、デプロイメントプロセスは81%効率化されています[\[1\]](https://capgo.app/) 。この設定により、開発者はアプリストアの遅延をバイパスして、迅速かつ制御された方法でアップデートをプッシュできます。

開発者からの声：

> "5000人以上のユーザーベースに対して、[Capgo OTAアップデート](https://console.capgo.app/resend_email)を本番環境で展開しました。非常にスムーズな運用が確認され、OTAが@Capgoにデプロイされてから数分以内にほぼすべてのユーザーが最新の状態になっています。" - colenso [\[1\]](https://capgo.app/)

MAJOR.MINOR.PATCHバージョニングシステムにより、破壊的変更、新機能、バグ修正を簡単に伝えることができます[\[5\]](https://aws.amazon.com/blogs/devops/using-semantic-versioning-to-simplify-release-management/) 。これは、Capgoのプラットフォームを通じて週に数回のリリースを管理するチームにとって特に役立ちます。

CI/CDツールと統合されたCapgoの[暗号化ソリューション](https://capgo.app/docs/cli/migrations/encryption/)は、コスト面でも優れており、5年間で最大26,100ドルのコスト削減を実現します[\[1\]](https://capgo.app/) 。カスタマイズ可能なチャンネルにより、適切なタイミングで適切なユーザーにアップデートを届けることができます。

> "私たちはアジャイル開発を実践しており、@Capgoはユーザーに継続的にデリバリーする上で重要な役割を果たしています！" - Rodrigo Mantica [\[1\]](https://capgo.app/)
