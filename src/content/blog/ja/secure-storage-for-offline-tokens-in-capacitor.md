---
slug: memorizzazione-sicura-per-token-offline-in-capacitor
title: Capacitor でのオフライントークンのセキュアな保存
description: モバイルアプリケーションで暗号化と生体認証を使用して、認証トークンをオフラインで安全に保存する方法を学びます。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-19T02:09:43.027Z
updated_at: 2025-10-10T01:50:18.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/6802fa419291ae98c5002559-1745028797889.jpg
head_image_alt: モバイル開発
keywords: >-
  offline tokens, secure storage, AES-256 encryption, biometric authentication,
  token management
tag: 'Development, Mobile, Security'
published: true
locale: ja
next_blog: ''
---
**アプリの認証トークンをオフラインで安全に保持したいですか？**以下が知っておくべきことです：

-   **トークンの暗号化**：iOS KeychainまたはAndroid Keystoreを使用してAES-256暗号化を実装。
-   **アクセス制御**：追加のセキュリティとして[生体認証](https://capgo.app/plugins/capacitor-native-biometric/)を追加。
-   **トークン管理**：短期間のトークンを使用し、安全に更新し、定期的にキーをローテーション。
-   **最適なツール**：クロスプラットフォームの暗号化ストレージには**@[capacitor](https://capacitorjs.com/)\-community/secure-storage**または**[Ionic Identity Vault](https://ionic.io/docs/identity-vault/)**を使用。

これらのステップにより、ユーザーデータを保護し、トークンの盗難を防ぎ、安全なオフラインアクセスを確保します。詳細な比較とセットアップ手順については、続きをお読みください。

## [Ionic Identity Vault](https://ionic.io/docs/identity-vault/)：セキュアなモバイル生体認証

![Ionic Identity Vault](https://assets.seobotai.com/capgo.app/6802fa419291ae98c5002559/e2484017084695edeec1f98ae40b009b.jpg)

<iframe src="https://www.youtube.com/embed/DsXx7oEcOS0" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## オフライントークンのセキュリティ基準

安全な保存を確保するため、iOS KeychainまたはAndroid Keystoreを通じて**AES-256暗号化**を使用します。初期OAuth2コード交換時に**PKCE**を実装し、短期間の更新トークンを使用後に必ずローテーションしてください。さらに、トークンアクセスを保護し、全体的なセキュリティを強化するために**生体認証**を追加します。

## セキュアストレージの実装

前述のAES-256暗号化、PKCE、生体認証制御を使用するには、まずSecure Storageプラグインをインストールします：

```bash
npm install @capacitor-community/secure-storage
```

暗号化キーの設定、[生体認証の有効化](https://capgo.app/plugins/capacitor-native-biometric/)、オフラインでのトークンの保存、取得、更新プロセスの管理については、プラグインのドキュメントを確認してください。

セットアップが完了したら、次のセクションで説明するトークンの保存とそのライフサイクルをオフラインで管理するメソッドの定義に進みます。

## ストレージソリューションの分析

Capacitorアプリケーションでオフライントークンのセキュアストレージオプションを選択する際、開発者は[暗号化方式](https://capgo.app/docs/cli/migrations/encryption/)、プラットフォーム間の互換性、統合の容易さなどの要因を考慮する必要があります。以下はオフライントークンを管理するための主要なセキュアストレージプラグインの内訳です。

### プラグイン機能の比較

-   **@capacitor-community/secure-storage**：iOS KeychainとAndroid Keystoreを使用したAES-256暗号化を提供し、[生体認証アンロック](https://capgo.app/plugins/capacitor-native-biometric/)をサポートし、自動キーローテーションを含みます。
-   **@ionic/storage**：組み込みの暗号化は含まれず、セキュリティには手動のラッパーが必要で、生体認証機能がありません。
-   **Native SecureStorage**：iOS Keychain専用で動作しますが、Androidをサポートしていません。
-   **@capawesome/secure-storage**：AES-256暗号化を提供し、プラットフォーム間で動作し、オプションの生体認証を提供します。
-   **@ionic-enterprise/identity-vault**：ハードウェアレベルの暗号化を提供し、生体認証をサポートし、セキュアなトークンライフサイクルを効果的に管理します。

## まとめ

オフライントークンストレージの主要な実践とツールの概要です：

-   ハードウェアバックアップされたキーストアを使用して**トークンを暗号化**し、[生体認証で保護](https://capgo.app/plugins/capacitor-native-biometric/) 。
-   トークンの発行、有効期限、ローテーション、更新に関する厳格なポリシーを実装。

クロスプラットフォームの暗号化には、**@capacitor-community/secure-storage**と**Ionic Identity Vault**が優れたオプションです。さらに、**[Capgo](https://capgo.app/)**はエンドツーエンドの暗号化、CI/CD統合、ユーザーターゲットのロールアウトを提供し、AppleとAndroidストアの要件を満たします。

### ツールとリソース

-   **@capacitor-community/secure-storage**：iOSとAndroid用の暗号化されたキーバリューストレージ。
-   **Ionic Identity Vault**：生体認証セキュリティを備えたエンタープライズレベルのストレージ。
-   **Capgo**：暗号化されたCI/CDデリバリーによるライブアップデートを提供。
