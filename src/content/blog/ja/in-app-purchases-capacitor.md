---
slug: in-app-purchases-capacitor
title: Acquisti in-app per Capacitor
description: Capacitorアプリでの課金機能をCapacitor PurchasesプラグインとRevenueCatを使用して実装する方法
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-01-19T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /revenuecat_iap.webp
head_image_alt: Revenue Cat アプリ内課金
keywords: >-
  Capacitor, in-app purchases, RevenueCat, mobile app development, live updates,
  OTA updates, continuous integration, mobile app updates
tag: Tutorial
published: true
locale: ja
next_blog: ''
---

>> このプラグインは現在RevenueCatの公式リポジトリに移管されています。詳細については[公式ドキュメント](https://wwwrevenuecatcom/docs/getting-started/installation/capacitor)をご確認ください。

Capacitor Purchasesは、iOSとAndroidでアプリ内課金を可能にするCapacitorフレームワーク用のプラグインです。複数のプラットフォームで一貫したシンプルなAPIを提供し、開発者がモバイルアプリでアプリ内サブスクリプションと課金を簡単に実装できるようにします。

Capacitor Purchasesプラグインの主な特徴の1つは、アプリ内サブスクリプションとアプリ内課金のためのプラットフォームであるRevenueCatと統合されていることです。RevenueCatは、複数のプラットフォームで一貫したシンプルなAPIを提供し、レシート検証やユーザー管理などのタスクを自動化することで、アプリ内サブスクリプションと課金の実装プロセスを簡素化します。

RevenueCatを使用することで、開発者は簡単にサブスクリプションを管理し、収益を追跡し、その他の関連タスクを実行できます。RevenueCatが提供する機能には以下のようなものがあります：

- 自動レシート検証
- ユーザー管理
- カスタム価格モデルのサポート
- 詳細な分析
- スケーラビリティ

Capacitor PurchasesプラグインをRevenueCatと共に使用することで、開発者はモバイルアプリでのアプリ内サブスクリプションと課金の実装にかかる時間と労力を節約でき、ユーザーエクスペリエンスを向上させ、収益を増加させるのに役立つ追加機能を提供できます。

Capacitor PurchasesプラグインとRevenueCatを使用することで、開発者は複数のプラットフォームでアプリ内サブスクリプションと課金を簡単に管理・追跡し、レシートを検証し、ユーザーを管理できます。また、カスタム価格モデルを作成し、詳細な分析を取得してパフォーマンスと収益を向上させることができます。

## インストール

最新バージョンのCapacitorとCapacitor Purchasesプラグインを使用していることを確認してください。CapacitorとCapacitor Purchasesプラグインの最新バージョンはCapacitorのウェブサイトで確認できます。

Capacitor Purchasesプラグインをインストールするには、以下のコマンドを実行します：
`npm i @capgo/capacitor-purchases`
アプリのネイティブコードにプラグインを追加します
`npx cap sync`

Xcodeでアプリ内課金機能を追加します：

![Xcode step 1](/iap_step1webp)
次に
![xcode step 2](/iap_step2webp)

## 1. RevenueCatアカウントの作成
このガイドでは、わずか数行のコードでサブスクリプションとRevenueCat SDKを使い始める方法を説明します。

[こちら](https://apprevenuecatcom/)から新しいRevenueCatアカウントにサインアップしてください。

> ### 📘
> 
> 💡 ヒント！
> 
> RevenueCatは、特にアプリの売却を考えている場合、各アプリ/プロジェクトごとに別々のRevenueCatアカウントを作成することを推奨しています。これにより、個々のプロジェクトの移転にRevenueCatサポートを待つ必要がなく、アカウント全体を移転できるため、移転プロセスが迅速化されます。

### 組織/エンタープライズ

RevenueCatに登録してアプリをプロジェクト内でセットアップする際は、企業アカウントを使用することをお勧めします。チームの他のメンバーをプロジェクトの[コラボレーター](https://wwwrevenuecatcom/docs/collaborators/)として招待できますが、**請求の管理はプロジェクトオーナーのみが行えます**。プロジェクトコラボレーターは請求の詳細を管理できません。

## 2. プロジェクトとアプリの設定

### ▶️ プロジェクトの作成

RevenueCatダッシュボードに移動し、上部ナビゲーションメニューの_Projects_というドロップダウンから[新しいプロジェクトを追加](https://apprevenuecatcom/overview/)します。

![RevenueCat step 1](/revenuecat_step1webp)

新しいプロジェクトを作成するポップアップモーダル

### ▶️ アプリ/プラットフォームの追加

プロジェクトダッシュボードの左メニューにある**Project Settings > Apps**から、追加するアプリのプラットフォームを選択します。

![RevenueCat step 2](/revenuecat_step2webp)

アプリプラットフォームを選択するプロジェクトダッシュボード

**アプリ名**フィールドは、RevenueCatにアプリを追加するために必須です。その他の設定フィールドは後で追加できます。テストと本番の購入を行うには、Bundle ID（iOS）/ Package Name（Android）とShared Secret（iOS）/ Service Credentials（Android）を設定する必要があります。