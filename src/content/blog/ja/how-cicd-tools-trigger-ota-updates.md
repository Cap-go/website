---
slug: how-cicd-tools-trigger-ota-updates
title: CI/CDツールによるOTAアップデートのトリガー方法
description: >-
  CI/CDツールがOTAアップデートを強化し、自動化されたプロセスによってより速く、より安全で、より信頼性の高いアプリのデプロイメントを実現する方法について学びましょう。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-02-12T08:43:18.401Z
updated_at: 2025-10-22T12:30:10.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67abf1dcdd71129bfb8de766-1739349815106.jpg
head_image_alt: モバイル開発
keywords: 'CI/CD, OTA updates, automation, app deployment, security, Capgo, Capacitor'
tag: 'Development, Mobile, Updates'
published: true
locale: ja
next_blog: ''
---

CI/CDツールは、over-the-air (OTA)アップデートのプロセスを自動化することで、より速く、安全で、信頼性の高いものにします。その方法は以下の通りです：

-   **OTAアップデートとは？** HTMLやCSS、JavaScriptなどのアプリアセットをCDN経由で即座に更新でき、アプリストアの承認遅延をスキップできます
-   **CI/CDの利点:** [GitHub Actions](https://docsgithubcom/actions)などの自動化ツールは、ビルドチェック、セキュリティ検証、デプロイメントなどの重要なステップを効率化し、エラーを72%削減し、同日パッチを可能にします
-   **主な機能:**
    -   **セキュリティ:** HTTPS、コード署名、暗号化を使用してアップデートを保護
    -   **段階的なロールアウト:** 小規模グループに先行してアップデートを展開し、早期に問題を発見
    -   **ロールバックオプション:** エラー率が上昇した場合、自動的にアップデートを元に戻す
-   **ハイライトされるツール:** [Capgo](https://capgo.app/)は、CLIコマンド、Webhook統合、詳細なメトリクス追跡でOTAアップデートを簡素化します

OTAアップデートを自動化することで、より速い配信、少ないエラー、そしてより良いアプリの安定性が確保されます。以下では、[Capacitor](https://capacitorjs.com/)アプリをCI/CDパイプラインで設定するための段階的な手順を説明します。

## [Appflow](https://ionicio/appflow/live-updates) ライブアップデート：即時アップデートをユーザーに直接デプロイ

![Appflow](https://mars-images.imgix.net/seobot/screenshots/ionicio-f18932d1af08bf70cb14b84540039486-2025-02-12.jpg?auto=compress)

<Steps>

1. appflowにサインアップする
2. アプリをアップロード
3. ライブアップデートを有効化
4. デプロイを構成

</Steps>

## [Capacitor](https://capacitorjs.com/)のOTAアップデート準備

![Capacitor](https://mars-images.imgix.net/seobot/screenshots/capacitorjs.com-4c1a6a7e452082d30f5bff9840b00b7d-2025-02-12.jpg?auto=compress)

Capacitorの[自動over-the-air](https://capgo.app/blog/open-source-licecing/) (OTA)アップデートの設定には、セットアップの構成、セキュリティ対策の実装、[アップデートシステムの統合](https://capgo.app/docs/plugin/cloud-mode/hybrid-update)という3つの重要なステップが含まれます。このプロセスにより、CI/CD自動化との互換性を確保しながら、アプリのセキュリティを維持します。

### capacitorconfigjsonでのOTA設定の構成

まず、`capacitorconfigjson`ファイルに必要なパラメータを更新します：

```json
{
  "plugins": {
    "OtaUpdate": {
      "checkFrequency": 15,
      "allowDowngrade": false
    }
  }
}
```

適切なチェック頻度を設定することで、アップデートの遅延を最小限に抑え、最大47%削減できます。[\[2\]](https://githubcom/becem-gharbi/esp-ota-cicd)

### OTAアップデートセキュリティの実装

OTAアップデートプロセスのセキュリティ確保は、不正なアップデートを防ぎ、アプリの整合性を保護するために不可欠です。これには3層の保護が含まれます：

| セキュリティ層 | 実装 | 目的 |
| --- | --- | --- |
| HTTPSセキュリティ | 証明書ピニング | 中間者攻撃をブロック |
| コード署名 | ed25519署名 | アップデートの有効性を確認 |
| パッケージセキュリティ | AES-256-GCM暗号化 | アップデート内容を保護 |

これらのセキュリティ機能を適用するには、以下を設定に含めます：

```typescript
{
  "security": {
    "certificatePinning": true,
    "signatureVerification": "ed25519",
    "encryption": "aes-256-gcm"
  }
}
```

### [Capgo](https://capgo.app/)のOTAアップデート設定

![Capgo](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-02-12.jpg?auto=compress)

Capgoは、OTAアップデートプロセスを簡素化します。まず、必要なプラグインをインストールします：

```bash
npm install @capgo/capacitor-updater
```

次に、`capacitorconfigjson`ファイルにCapgo固有の設定を追加します：

```json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true,
      "statsUrl": "https://api.capgo.app/stats"
    }
  }
}
```

Capgoは、`20250212-a1b2c3d`のようなビルド識別子を使用したセマンティックバージョニングを採用し、正確なアップデート追跡を可能にします。これにより、アプリのアップデートライフサイクルの管理と監視が容易になります。

## OTAアップデートパイプラインの作成

CapgoをCapacitor環境にセットアップした後、次のステップはCI/CDツールと連携してアップデート配信を自動化することです。これにより、アプリの安定性を保ちながら、セキュアで効率的なアップデート管理が可能になります。

### 自動アップデート用のWebhookセットアップ

CI/CDセットアップのWebhookは、コード変更が発生した時に自動的にアップデートをトリガーできます。例えば、GitHub Actionsでは、以下のようなワークフローファイルを作成できます：

```yaml
name: OTA Update
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy OTA Update
        env:
          CAPGO_API_KEY: ${{ secrets.CAPGO_API_KEY }}
```

CI/CDプラットフォームの[暗号化ストレージ](https://capgo)でAPIキーとシークレットを安全に保管してください。app/docs/cli/migrations/encryption/) を使用して機密データを保護する

### Capgo CLI アップデートコマンド

Capgo CLIは、パイプライン内のアップデート管理を効率化するための重要なコマンドを提供します。以下は一般的なデプロイメントワークフローの例です:

| ステージ | コマンド | 目的 |
| --- | --- | --- |
| ビルド | `capgo deploy --channel production` | 新しいビルドアーティファクトをアップロード |
| テスト | `capgo promote build-123 --group beta` | [テストグループへのアップデートのリリース](https://capgo.app/blog/how-to-send-specific-version-to-users/) |
| 検証 | `capgo metrics get --last-24h` | アップデート成功メトリクスの確認 |
| リリース | `capgo promote build-123 --channel stable` | 全ユーザーへのアップデートのデプロイ |

### アップデートのロールバック方法

アプリの安定性を保つために、信頼性の高いロールバックメカニズムが不可欠です。システムは問題を検出し、自動的にアップデートを元に戻せる必要があります。例えば、ヘルスチェックエンドポイントを使用してエラー率を監視し、必要に応じてロールバックをトリガーできます:

[[CODE_BLOCK]]

このアプローチにより、[Gunnebo Safe Storage](https://wwwgunnebosafestoragecom/) はダウンタイムを数時間から数分に削減できました [\[6\]](https://menderio/blog/mender-ota-updates-and-an-automated-ci-cd-pipeline-at-gunnebo-safe-storage)

リスクの高いアップデートの場合は、Capgoのステージドロールアウト機能の使用を検討してください。完全なリリース前に、まず小規模なユーザーグループにアップデートをデプロイすることで、広範な問題が発生するリスクを軽減できます。

###### sbb-itb-f9944d2

## OTAアップデート方法

### ステージドアップデートとユーザーグループ

ステージドアップデートにより、アップデートのロールアウトを制御し、ユーザーにスムーズな体験を提供できます。例えば、Capgoの_promote_コマンド（前述）はベータグループの管理に役立ちます。エンタープライズのデータによると、アプリの約半数（49%）が月次アップデートを必要としており[\[4\]](https://capacitorjs.com/docs/guides/ci-cd)、段階的なデプロイメントは変更を徐々にロールアウトしながらアプリの安定性を維持するための重要な戦略となっています。

### メトリクスベースのアップデートトリガー

パフォーマンスメトリクスに基づいて[アップデートを自動化する](https://capgo.app/docs/live-updates/update-behavior/)ことで、時間を節約し問題を防ぐことができます。監視webhookを設定することで、重要なメトリクスを追跡し、アップデートを継続するか一時停止するかを判断できます:

| メトリクスタイプ | しきい値 | アクション |
| --- | --- | --- |
| クラッシュ率 | >2% | ロールアウトの一時停止 |
| エラー率 | >0.5% | チームに警告 |

これらのチェックをCI/CDパイプラインに統合することで、シームレスな監視が可能です。例:

[[CODE_BLOCK]]

これらのメトリクスは、次のセクションで説明するパフォーマンス追跡システムに直接結びついています。

### クイックレスポンスアップデート

重大なセキュリティ問題や主要なバグに直面した場合、迅速にアップデートをデプロイする方法が必要です。緊急用に特別に設計されたファストトラックデプロイメントチャネルを使用してください。これらのチャネルには、リスクを最小限に抑えるためのデバイス認証チェックと自動ロールバックオプションを含める必要があります。

緊急アップデートの場合、専用チャネルを使用してデプロイできます:

[[CODE_BLOCK]]

配信速度をさらに向上させ、コンプライアンス基準を満たすために、CDNルールを持つ地理ベースのチャネルの使用を検討してください。これにより、場所に関係なく、アップデートが効率的にユーザーに届きます。

## アップデートパフォーマンスの追跡

アップデート配信方法を導入したら、その効果を測定する時です。以下の主要業績評価指標を使用して状況を把握してください:

### アップデート成功メトリクス

**デプロイメント完了**、**検証時間**、**ユーザー採用率**の3つの主要分野に注目してください。モバイルアプリの場合、デプロイメント成功率は通常95%から99%の範囲です[\[1\]](https://embeddedartistrycom/blog/2024/01/15/exploring-serverless-ci-cd-for-embedded-devices/) 。CI/CDパイプラインを通じたリアルタイム監視で目標達成を支援できます:

| メトリクス | 目標 | クリティカルしきい値 |
| --- | --- | --- |
| デプロイメント完了 | >98% | [[HTML_TAG]]120s |
| ユーザー採用率（24時間） | >75% | <50% |

### アップデートエラー管理

自動化システムでアップデートステータスを追跡し、エラーに対応できます。
