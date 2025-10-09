---
slug: gestione-dei-segreti-nelle-pipeline-cicd
title: CI/CDパイプラインでのシークレット管理
description: CIパイプラインで機密情報を安全に扱い、セキュリティを向上させ、漏洩や法令遵守の問題を防ぐための効果的な戦略を学びましょう。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-20T00:50:40.782Z
updated_at: 2025-04-20T00:51:01.303Z
head_image: >-
  https://assets.seobotai.com/capgo.app/68043aae6000445eb1a64c9e-1745110261303.jpg
head_image_alt: テクノロジー
keywords: 'CI/CD, secret management, security, environment variables, automated scanning'
tag: 'Development, Security, Updates'
published: true
locale: ja
next_blog: ''
---
**CI/CDパイプラインでの機密情報の安全な管理は、侵害、サービス中断、コンプライアンス問題を防ぐために重要です。**以下が効果的な方法です：

-   **環境変数**と**セキュアボールト**を使用して機密情報を安全に保存する。
-   必要な権限のみを付与し、定期的に機密情報をローテーションすることで**アクセスを制限**する。
-   `git-secrets`や`truffleHog`などのツールで**機密情報のスキャンを自動化**し、早期に漏洩を検出する。
-   [GitHub Actions](https://docs.github.com/actions)、[GitLab CI](https://docs.gitlab.com/ee/ci/)、[Jenkins](https://www.jenkins.io/)などの**CI/CDツール**を活用して、組み込みの機密情報管理を行う。
-   詳細なログで機密情報の使用を**監視および監査**する。

### 一般的なCI/CDの機密情報

-   [APIキー](https://capgo.app/docs/webapp/api-keys/)
-   データベース認証情報
-   暗号化キー
-   認証トークン
-   SSL証明書

### 人気の機密情報管理プラットフォーム

| プラットフォーム | 機能 | 最適な用途 |
| --- | --- | --- |
| **[HashiCorp Vault](https://www.hashicorp.com/products/vault)** | 動的シークレット、暗号化、アクセス制御 | 大規模運用 |
| **[AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/)** | AWS統合、自動ローテーション | AWSベースの環境 |
| **[Azure Key Vault](https://learn.microsoft.com/en-us/azure/key-vault/)** | 証明書管理、キーローテーション | Microsoft環境 |

これらのプラクティスと適切なツールを使用することで、CI/CDパイプラインを保護し、セキュアなワークフローを維持できます。

## 機密情報のセキュリティガイドライン

### コードから機密情報を排除する

-   **環境変数**を使用して機密情報を管理する。
-   機密情報を目的に特化した**セキュアボールト**に保存する。
-   CI/CDパイプラインをボールトに接続し、ビルドプロセス中に認証情報を注入する。

### アクセスの制限と監視

各ユーザーやサービスに**必要最小限の権限**のみを付与し、定期的に権限を見直します。

さらに、定期的に機密情報をローテーションし、潜在的な侵害を追跡・特定するための**監査ログ**を維持します。

## [GitLab CI](https://docs.gitlab.com/ee/ci/)と[HashiCorp Vault](https://www.hashicorp.com/products/vault)を統合して取得する方法...

<iframe src="https://www.youtube.com/embed/NsPcl4rqy9A" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## 機密情報管理ツール

セキュリティガイドラインが整ったら、機密情報管理に特化したツールを導入します。

### 機密情報ストレージプラットフォーム

これらのツールを使用して、すべての機密情報を一元化および監視します：

| プラットフォーム | 機能 | 最適な用途 |
| --- | --- | --- |
| **HashiCorp Vault** | 動的シークレット、暗号化サービス、IDベースのアクセス | 大規模運用 |
| **AWS Secrets Manager** | AWSとのシームレスな統合、自動ローテーション、細かな権限設定 | AWS中心の環境 |
| **Azure Key Vault** | ハードウェアセキュリティモジュール、証明書管理、キーローテーション | Microsoftクラウド環境 |

ストレージプラットフォームで機密情報を保護した後、CI/CDツールに付属の機密情報管理機能を活用します。

### CI/CD機密情報管理

多くのCI/CDツールには組み込みの機密情報管理機能があります：

-   **GitHub Actions**：リポジトリレベルと組織レベルの両方で暗号化された機密情報を提供。ログで自動的にマスクされ、認可されたワークフローのみがアクセス可能。
-   **GitLab CI**：保護された変数とグループレベルの機密情報を提供し、分離を維持しながらプロジェクト間で安全な共有が可能。
-   **Jenkins**：認証情報プラグインと連携し、外部機密情報ストアをサポート。ログでマスクするにはプラグインが必要。

### [Capgo](https://capgo.app/)のセキュリティ機能

![Capgo](https://assets.seobotai.com/capgo.app/68043aae6000445eb1a64c9e/37a0fc028bf1f414683e8dee42eedfb0.jpg)

Capgoは、標準的なCI/CD機密情報管理を拡張することで、Capacitorアプリのライブアップデートのセキュリティを強化します。エンドツーエンドの暗号化を使用して、認可されたユーザーのみが機密データを復号化できるようにします[\[1\]](https://capgo.app/) 。

CapgoはGitHub Actions、GitLab CI、Jenkinsなどのツールとシームレスに統合します。また、チャネルベースの配信とロールベースのアクセス制御をサポートし、AppleとAndroidプラットフォームの両方のアップデート要件を満たします。

## バージョン管理での機密情報

ハードコードされた認証情報が漏れるのを防ぐためにリポジトリを保護します。セキュアなボールトストレージから始めて、コード内の機密情報をブロックするための追加の保護手段を追加します。

以下が防御を強化する方法です：

-   **[git-secrets](https://github.com/awslabs/git-secrets)やpre-commitフレームワークなどのツールを使用**して、コミット前に問題を検出する。
-   **定期的なスキャン**を[truffleHog](https://github.com/trufflesecurity/trufflehog)や[GitGuardian](https://www.gitguardian.com/)などのツールで実行し、漏れた可能性のある機密情報を検出する。
-   **CI/CDチェックを自動化**して、機密情報が見つかった場合にビルドをフラグ付けして失敗させる。

次に、露出した機密情報の効果的な対処方法について説明します。

## まとめ

このガイドでは、ボールトストレージ、自動スキャン、CI/CDツール統合、リポジトリ保護について説明しました。Capgoは、エンドツーエンドの暗号化とスムーズなCI/CD統合を通じて、セキュリティと迅速なデプロイメントを統合します[\[1\]](https://capgo.app/) 。

機密情報管理のキーポイント：

-   **ボールトストレージを使用**：保存時と転送時の両方で暗号化を提供するプラットフォームを利用する。
-   **セキュリティチェックを自動化**：機密情報の露出を早期に特定するスキャンツールを実装する。
-   **活動を追跡・監視**：機密情報へのアクセスと変更の詳細な監査ログを保持する。
-   **インシデントに備える**：露出した機密情報に対処し、必要に応じて変更を巻き戻すための明確なプロセスを設定する。

効果的な機密情報管理により、セキュリティは障害から継続的デリバリーのサポートシステムへと変わります。
