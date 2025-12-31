---
slug: capgo-integration-with-github-actions-guide
title: 'Capgo と GitHub Actions の統合: ガイド'
description: GitHubアクションでCapgoを統合し、効率的で安全な低コストのアプリ更新を実現し、開発ワークフローを改善します。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-16T02:24:50.565Z
updated_at: 2025-11-24T15:08:57.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67d61b378b902ec211cf87e9-1742091902582.jpg
head_image_alt: モバイル開発
keywords: >-
  Capgo, GitHub Actions, CI/CD, Capacitor apps, deployment, automation, updates,
  security
tag: 'Development, Mobile, Updates'
published: true
locale: ja
next_blog: ''
---
[Capgo](https://capgo.app/) と [GitHub Actions](https://docs.github.com/actions) を組み合わせることで、[Capacitor](https://capacitorjs.com/) アプリのアップデート配信が簡単になります。この統合が注目に値する理由は以下の通りです：

-   **コスト削減**: [AppFlow](https://ionic.io/appflow/) と比較して、5年間でCI/CDコストを最大$26,100削減できます。
-   **迅速なアップデート**: 即時更新が可能で、24時間以内に95%のユーザーに配信されます。
-   **セキュアな配信**: エンドツーエンドの暗号化によりアップデートの安全性を確保します。
-   **効率的なワークフロー**: GitHubリポジトリで直接ビルドと配信を自動化します。

### クイックオーバービュー

1.  **要件**: GitHubアカウント、[Capgoアカウント](https://capgo.app/disclaimer/)（月額$12から）、Capacitorプロジェクト、[Node.js](https://nodejs.org/en)。
2.  **セットアップ**: `npx @capgo/cli init`で[Capgo CLI](https://capgo.app/docs/cli/commands)をインストール、YAMLワークフローでGitHub Actionsを設定。
3.  **デプロイ**: `npx @capgo/cli deploy`などのコマンドを使用して[アップデートを自動化](https://capgo.app/docs/live-updates/update-behavior/) 。
4.  **テスト**: 本番環境前にテストチャンネル（ベータ、ステージングなど）にデプロイ。

**ワークフロー例（YAML）**:

```yaml
name: Capgo Deploy  
on:  
  push:  
    branches:  
      - main  

jobs:  
  deploy:  
    runs-on: ubuntu-latest  
    steps:  
      - uses: actions/checkout@v6  
      - uses: actions/setup-node@v6  
        with:  
          node-version: '24'  
      - name: Install Dependencies  
        run: npm install  
      - name: Deploy to Capgo  
        run: npx @capgo/cli deploy  
        env:  
          CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}  
```

この統合により、高速で安全、かつコスト効率の良いアプリのアップデートが可能になり、アジャイル開発チームに最適です。

## [GitHub Actions](https://docs.github.com/actions) チュートリアル - 基本概念とCI/CDパイプライン

![GitHub Actions](https://mars-images.imgix.net/seobot/screenshots/docs.github.com-90237daad1b336de5d9b7f1a85aa7441-2025-03-16.jpg?auto=compress)

<iframe src="https://www.youtube.com/embed/R8_veQiYBjI" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## セットアップ要件

[Capgoの統合](https://capgo.app/docs/webapp/)とGitHub Actionsには、必要なツールと設定のセットアップが含まれます。

### 必要なツールとアカウント

以下のアカウントとツールを用意してください：

| 要件 | 目的 | 詳細 |
| --- | --- | --- |
| **GitHubアカウント** | バージョン管理とCI/CD | リポジトリにアクセス可能なアクティブなアカウント |
| **Capgoアカウント** | ライブアップデート管理 | SOLOプランは月額$12から |
| **Capacitorプロジェクト** | アプリ開発 | 統合準備が整ったプロジェクト |
| **Node.js** | ランタイム環境 | 最新のLTSバージョンを推奨 |

これらが用意できたら、自動化されたライブアップデートのためにプロジェクトにCapgoを追加できます。

### [Capgo](https://capgo.app/)をプロジェクトに追加

![Capgo Live Update Dashboard Interface](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-03-16.jpg?auto=compress)

Capgoを統合するには、CLIツールを使用してCapacitorプロジェクトにインストールします。Capgoの創設者Martin Donadieuによると：

> "npx @capgo/cli initを実行するだけです！" [\[1\]](https://capgo.app/)

このコマンドでプラグインと必要な依存関係がセットアップされます。

### GitHubリポジトリのセットアップ

CapgoとのCI/CD統合のために、GitHubリポジトリを準備します。彼らのドキュメントによると：

> "GitHub Actions、GitLab CIなど、お好みのプラットフォームで直接CI/CDパイプラインを設定します。CI/CDのホスティングは行わず、維持費用も請求しません。" [\[1\]](https://capgo.app/)

Capgoはこのセットアップを一時金$2,600と月額約$300で提供しており、AppFlowの年間$6,000と比べてより手頃です [\[1\]](https://capgo.app/) 。

リポジトリのセットアップ方法：

-   **リポジトリ構造**: ソースコード、アセット、設定ファイルを別々のディレクトリに整理し、すべてを整理しやすく管理しやすくします。
-   **環境設定**: 開発、ステージング、本番環境を区別し、適切なアクセス制御とセキュリティ対策を確保します。
-   **アクセス管理**: [Capgo統合](https://capgo.app/consulting/)を可能にしながらセキュリティを維持するよう、リポジトリの権限を慎重に設定します。

これらのステップにより、次のセクションで説明するGitHub Actionsワークフローの準備が整います。

## GitHub Actionsワークフローのセットアップ

[Capgoデプロイメント](https://capgo.app/docs/cli/commands/)をGitHub Actionsで自動化し、CI/CDプロセスを効率化します。

### ワークフローファイルの作成

リポジトリの`.github/workflows`ディレクトリにYAMLファイルを作成します。例：

```yaml
name: Capgo Deploy
on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v6
        with:
          node-version: '24'
      - name: Install Dependencies
        run: npm install
      - name: Build App
        run: npm run build
      - name: Deploy to Capgo
        run: npx @capgo/cli deploy
        env:
          CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}
```

この設定により、セキュアで自動化されたデプロイメントが確保されます。ファイルを設定したら、ワークフローに適切なトリガーを選択します。

### ワークフロートリガーのオプション

GitHub Actionsではワークフローの実行タイミングをカスタマイズできます。トリガーオプションの例：

| **トリガータイプ** | **ユースケース** | **設定** |
| --- | --- | --- |
| プッシュイベント | コード変更時のデプロイ | 特定のブランチへのコードプッシュ時に起動 |
| 手動ディスパッチ | オンデマンドアップデート | 手動でワークフローを開始可能 |
| スケジュール | 定時リリース | 設定した間隔でデプロイメントを実行 |
| プルリクエスト | アップデートのテスト | メインブランチにマージする前に変更をテスト |

### シークレットキーの管理

セキュアなデプロイメントを確保するため、シークレットキーを適切に管理する必要があります。GitHub Actionsは、この目的のために暗号化されたシークレット管理システムを提供しています。

**セキュアな認証のセットアップ手順：**

1.  **リポジトリ設定へのアクセス**  
    リポジトリの設定で、"Security"タブの下にある"Secrets and variables"セクションに移動します。
    
2.  **[Capgoの認証情報](https://capgo.app/trust/)を追加**  
    Capgoの認証トークンをリポジトリのシークレットとして保存します。`CAPGO_TOKEN`という名前を付けます。
    
3.  **ワークフローでのシークレットの参照**  
    保存したシークレットを`${{ secrets.CAPGO_TOKEN }}`のようにワークフローで参照します。
    

## ワークフローでのCapgoコマンド

GitHub Actions環境のセットアップが完了したら、Capgo CLIコマンドを統合してデプロイメントを自動化できます。

### Capgo CLIのインストール

ワークフローにCapgo CLIをインストールするステップを追加します：

```yaml
steps:
  - name: Install Capgo CLI
    run: npm install -g @capgo/cli
  - name: Initialize Capgo
    run: npx @capgo/cli init
```

### CLIの認証

`CAPGO_TOKEN`を使用してCLIを安全に認証します：

```yaml
- name: Authenticate Capgo CLI
  run: npx @capgo/cli login
  env:
    CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}
```

### デプロイメントコマンド

アップデートのビルド、バージョニング、デプロイを処理する主要なコマンド：

| コマンド | 目的 | 使用例 |
| --- | --- | --- |
| `build` | [本番用バンドル](https://capgo.app/docs/webapp/bundles/)を生成 | `npx @capgo/cli build` |
| `deploy` | Capgoにアップデートをプッシュ | `npx @capgo/cli deploy` |
| `version` | アップデートのバージョンを設定 | `npx @capgo/cli version 1.2.0` |

デプロイメントプロセス全体を自動化するには、以下のようにコマンドを組み合わせます：

```yaml
steps:
  - name: Build and Deploy
    run: |
      npx @capgo/cli build
      npx @capgo/cli version ${{ github.ref_name }}
      npx @capgo/cli deploy
    env:
      CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}
```

このセットアップにより、ワークフローが実行されるたびにアップデートが自動的にビルド、バージョニング、デプロイされます。GitHubのシークレット管理システムにより、プロセス全体で認証情報が安全に保たれます。

## テストと修正

### テストワークフローの実行

専用の[Capgoテストチャンネル](https://capgo.app/docs/plugin/cloud-mode/channel-system/)を使用して、GitHub Actionsワークフローをテストできます。これにより、アップデートを本番環境に配信する前に検証できます。

```yaml
- name: Test Build Deployment
  run: |
    npx @capgo/cli build
    npx @capgo/cli deploy --channel beta
  env:
    CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}
```

Capgoのチャンネルシステムは、異なるステージ用の個別のデプロイメントパスを作成するのに役立ちます：

| チャンネル | 目的 | ターゲットユーザー |
| --- | --- | --- |
| beta | プレリリーステスト | 内部チーム |
| staging | QA検証 | テストユーザー |
| production | 本番デプロイ | 全ユーザー |

### エラーの解決

一般的な統合の問題と対処方法：

1.  **認証の失敗**

GitHub Secretsの CAPGO_TOKENを確認してください。期限切れの場合は、スムーズな認証のために再生成してください。

2.  **ビルドエラー**

ビルド設定がデプロイメント環境の要件と一致していることを確認してください。

> "5000人以上のユーザーベースに対して、Capgo OTAアップデートを本番環境にロールアウトしました。OTAがCapgoにデプロイされてから数分以内にほぼすべてのユーザーが最新の状態になり、非常にスムーズな運用を実現しています。" [\[1\]](https://capgo.app/)

3.  **バージョンの競合**

デプロイメント時の競合を防ぐため、セマンティックバージョニングを守り、適切にバージョンを増やしてください。

### メンテナンスのヒント

-   [Capgoアナリティクス](https://capgo.app/dp/)を使用してアップデートの成功率を監視する。
-   問題を引き起こす可能性のあるアップデートの自動ロールバックを有効にする。
-   より良いコントロールのために、プルリクエスト（PR）をチャンネルセレクターでテストする。
-   最新のCapgo CLIコマンドでワークフローを更新する。

優先度の高いデプロイメントでは、Capgoのエラートラッキングを活用して潜在的な問題を早期に発見してください。何か問題が発生した場合、ロールバック機能を使用して迅速に安定バージョンに戻すことができ、混乱を最小限に抑えることができます。これらのプラクティスは、本番環境に向けてデプロイメントをスムーズに保つのに役立ちます。

## 結論

### 主なポイント

CapgoとGitHub Actionsの統合により、[Capacitorアプリ](https://capgo.app/blog/capacitor-comprehensive-guide/)のデプロイメントプロセスが簡素化され、開発チームに大きな利点をもたらします。アップデートの世界的な成功率82%、24時間以内にアクティブユーザーの95%がアップデートを受信 [\[1\]](https://capgo.app/) という効率性で、このソリューションは際立っています。

注目すべき機能：

-   **自動化されたワークフロー**: GitHub Actionsで直接ワークフローを設定でき、外部CI/CDホスティングが不要です。このアプローチにより、AppFlowなどの代替手段と比較して5年間で約$26,100のコスト削減が可能です [\[1\]](https://capgo.app/) 。
-   **迅速なデプロイメント**: アプリストアの遅延をバイパスして、即時にアップデートをプッシュできます。
-   **強力なセキュリティ**: エンドツーエンドの暗号化によりアップデートの安全な配信を確保し、Capgoのチャンネルシステムにより制御された段階的なロールアウトが可能です。

これらの機能により、よりカスタマイズされたソリューションとパフォーマンスの向上

-   **カスタムAPIワークフロー**: CapgoのパブリックAPIを使用して、チームの特定のニーズに合わせたデプロイメントワークフローを設計できます。これにより、ホワイトラベル体験や現在のツールとのシームレスな統合が可能になります [\[1\]](https://capgo.app/) 。
-   **[チャンネルベースのリリース](https://capgo.app/docs/webapp/channels/)**: Capgoのチャンネル機能を使用して、段階的で制御されたアップデートのためのデプロイメントプロセスを最適化します。
-   **最適化されたパフォーマンス**: Capgoの部分的なアップデートを活用して、帯域幅の使用量を削減し、アップデートを高速化します。750の本番アプリにわたって2,350万回のアップデートを提供した実績 [\[1\]](https://capgo.app/) により、大規模な需要に対応できる能力が証明されています。

さらに良い結果を得るために、CapgoのセルフホスティングオプションやカスタムAPIセットアップの使用を検討してください。これらの戦略を完全に実装するための詳細なセットアップとテスト手順については、前のセクションを確認してください。
