---
slug: understanding-apples-privacy-manifest
title: Appleのプライバシーマニフェストについて
description: Appleの必須プライバシーマニフェストについて、iOSアプリにおける重要性、および明確なガイドラインに従って効果的に遵守する方法を学びましょう。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-18T02:23:31.365Z
updated_at: 2025-10-10T02:17:19.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/68019d453c6b972ab5063e92-1744943188853.jpg
head_image_alt: モバイル開発
keywords: >-
  Privacy Manifest, iOS, data collection, App Store, compliance, Capgo, JSON,
  updates
tag: 'Development, Mobile, Security'
published: true
locale: ja
next_blog: ''
---
**2024年5月以降、AppleのプライバシーマニフェストがすべてのiOSアプリに必須となります。**App Storeへの提出には、データ収集、APIの使用、サードパーティSDK、ネットワークドメインの詳細を記載したJSONファイルが必要です。以下が重要なポイントです：

-   **概要**：以下を開示するJSON設定ファイル：
    -   収集されるデータとその目的
    -   使用されるAPIとサードパーティSDK
    -   アクセスされる外部ドメイン
-   **重要性**：Appleのプライバシー基準への透明性とコンプライアンスを確保
-   **対応方法**：マニフェストをiOSアプリバンドルに追加し、[Capgo](https://capgo.app/)などのライブアップデートツールを使用する場合は定期的に更新

**ヒント**：Capgoのようなツールは、マニフェストの更新を自動化し、即時デプロイメントを提供し、成功を追跡するための分析機能を提供することでコンプライアンスを簡素化します。

プライバシーマニフェストの設定と検証方法、一般的な落とし穴を避ける方法、円滑な更新を確保する方法について、以下で詳しく説明します。

## WWDC23：プライバシーマニフェストを始めよう | Apple

<iframe src="https://www.youtube.com/embed/OQMF4LDqscc" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## プライバシーマニフェストの主要要素

Appleのプライバシーマニフェストには3つの主要コンポーネントがあります：

1.  **データ宣言**：アプリが収集するデータの種類、収集理由、使用するプライバシーに関連するAPI、統合されているサードパーティSDKを指定します。それぞれについて明確なビジネス上の理由を提供する必要があります。
    
2.  **外部ドメイン**：アプリが通信するすべての外部ドメインをリストアップし、通信の目的を説明し、セキュリティ対策の詳細を記載します。
    
3.  **JSONフォーマットと組み込み**：マニフェストにAppleが要求するJSON構造を使用し、アプリバンドルとライブアップデートパッケージの両方に確実に組み込みます。
    

次に、Capacitorプロジェクトでマニフェストを作成して検証する方法を説明します。

## Capacitorでのプライバシーマニフェストの設定

![Capacitor](https://assets.seobotai.com/capgo.app/68019d453c6b972ab5063e92/7e137b9b90adb3934b29b03381f213c1.jpg)

### マニフェストファイルの作成

アプリのAPI使用とデータ収集を宣言するために、`ios/App/Resources/PrivacyInfo.xcprivacy`というファイルを追加します。以下はファイルの例です：

```json
{
  "NSPrivacyAccessedAPITypes":[{"NSPrivacyAccessedAPIType":"NSUserDefaults","NSPrivacyAccessedAPITypeReasons":["FE001"]}],
  "NSPrivacyCollectedDataTypes":[{"NSPrivacyDataType":"NSPrivacyDataTypeDeviceID","NSPrivacyDataReason":"Basic app functionality"}]
}
```

このファイルを作成した後、[Xcode](https://developer.apple.com/xcode/)を開いてプロジェクトに正しく含まれていることを確認します。

### テストと検証

Xcodeで**Product > Analyze**に移動してプライバシーレポートを生成します。警告や未宣言のAPIがないかレポートを慎重に確認し、必要な調整を行って問題を回避します。すべてが問題なければ、更新のデプロイを進めます。

### [Capgo](https://capgo.app/)での更新

![Capgo](https://assets.seobotai.com/capgo.app/68019d453c6b972ab5063e92/d09851ee64a6d6c4e2e08ff1d656af11.jpg)

Xcode分析をパスした後、Capgoを使用してアプリのプライバシーマニフェストを最新の状態に保ちます。Capgoは以下を提供します：

-   **即時デプロイメント**：24時間以内に95%のユーザーに更新が届きます[\[1\]](https://capgo.app/) 。
-   **ワンクリックロールバック**で素早い修正が可能。
-   **分析ツール**で更新の成功を追跡しコンプライアンスを確保。

Capgoのチームプランは月額83ドル（年間請求）で、月間アクティブユーザー（MAU）10万人まで、帯域幅2,000GBまでをサポートします。

## プライバシーコンプライアンスガイドライン

Xcodeでマニフェストを検証した後、プライバシーコンプライアンスを維持することが重要です。以下は維持方法です。

### 推奨プラクティス

Capgoを使用してマニフェストの更新を即時にプッシュし、App Storeのレビューによる遅延を避けることを検討してください。このツールはまた、段階的なロールアウトをサポートし、リアルタイム分析を使用して変更をテストしてから全ユーザーにロールアウトすることができます[\[1\]](https://capgo.app/) 。

### 一般的な落とし穴

[手動更新](https://capgo.app/docs/plugin/cloud-mode/manual-update/)に依存すると、App Storeのレビュー時間に依存するため遅くなる可能性があり、数日から数週間かかることがあります。これにより、ドキュメントが古くなることがよくあります。一方、自動化ツールは即時更新を可能にし、デプロイメントを監視するための分析を提供し、問題が発生した場合に変更を簡単にロールバックできます[\[1\]](https://capgo.app/) 。

### 手動vs自動更新

手動更新と自動更新の方法を比較します：

-   **配信速度**：手動更新は数日から数週間かかりますが、[自動更新](https://capgo.app/docs/plugin/cloud-mode/hybrid-update/)は24時間以内に95%のユーザーに到達します[\[1\]](https://capgo.app/) 。
-   **成功の追跡**：手動方式は様々ですが、自動更新は世界で82%の成功率を達成します[\[1\]](https://capgo.app/) 。
-   **ロールバックオプション**：手動更新は回復が限定的ですが、自動更新は即時ロールバックが可能です。
-   **モニタリング**：手動チェックは時間がかかりますが、自動化ツールはリアルタイム分析を提供します[\[1\]](https://capgo.app/) 。
-   **配布**：手動システムは基本的ですが、自動化ツールは高度な配布チャネルをサポートします[\[1\]](https://capgo.app/) 。
-   **セキュリティ**：手動更新には暗号化が組み込まれていませんが、自動システムはエンドツーエンドの暗号化を使用します[\[1\]](https://capgo.app/) 。

## ライブアップデートツールの比較

人気のある2つのライブアップデートプラットフォームを比較してみましょう。

### プラットフォームの機能と価格

| 機能 | Capgo | [Appflow](https://ionic.io/appflow/) |
| --- | --- | --- |
| エンドツーエンド暗号化 | **あり** | \-  |
| 更新成功率 | **世界で82%** [\[1\]](https://capgo.app/) | \-  |
| 更新配信時間 | **24時間以内に95%** [\[1\]](https://capgo.app/) | \-  |
| バンドルダウンロード速度 | **114 ms (5 MB)** [\[1\]](https://capgo.app/) | \-  |
| 年間コスト（チームプラン） | **$996** | **$6,000** [\[1\]](https://capgo.app/) |

**クイックまとめ**：Capgoは初年度コストが大幅に低く、Appflowの$6,000に対して$996です。

次に、プライバシーマニフェストの更新におけるCapgoの特徴を見てみましょう。

### プライバシーマニフェスト：Capgoの利点

Capgoのオープンソースコードベースは、プライバシーマニフェストの更新管理に適しています。進化するプライバシー基準に迅速に対応し、コンプライアンスを管理しやすくします[\[1\]](https://capgo.app/) 。

## まとめ

2024年5月以降、すべてのiOSアプリは必須のマニフェスト要件に従う必要があります。自動化によってこれらのマニフェストの管理が大幅に簡単になります。Capacitorプロジェクトでは、マニフェストをiOSバンドルに含め、Capgoのようなツールを使用して、エンドツーエンド暗号化により更新を安全に自動化します。

マニフェストを設定し更新を自動化したら、以下がプライバシーマニフェストの更新を円滑に行うための重要なプラクティスです：

-   デプロイメントを簡素化するためにCLIツールを使用する。
-   制御された更新ロールアウトのためにチャネルシステムを実装する。
-   データ収集プロセスの詳細なドキュメントを保持する。
-   定期的にプライバシーコンプライアンスをテストして検証する。
