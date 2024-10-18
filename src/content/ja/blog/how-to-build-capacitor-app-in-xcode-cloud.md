---
slug: how-to-build-capacitor-app-in-xcode-cloud
title: Xcode CloudでIonic Capacitorアプリケーションを作成する方法
description: Xcode Cloudを使用して、macOSを必要とせずにCapacitor JSアプリケーションをコンパイルします。
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-09-01T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /xcode_cloud.webp
head_image_alt: コンデンサー Xcode Cloud-Build
tag: Tutorial
published: true
locale: ja
---

## 前提条件

チュートリアルを続ける前に…

- GitHubを使用していることを確認してください
- Capacitorを使用してください
- アプリはすでにApple Storeにデプロイされています
- 読むことに対する願望 😆…

Ionicの使用は任意です。Cordovaでも動作する可能性がありますが、私は試していません。

## 価格に関する重要事項

![価格 Xcode Cloud](/xcode_cloud_pricewebp)

[https://developerapplecom/xcode-cloud/](https://developerapplecom/xcode-cloud/)

サービスは制限まで「_無料_」です  
スクリーンショットで価格と制限を見ることができます（チュートリアル作成時の価格、将来的に変更される可能性があります）

🔴 **_要件と価格について警告された後に、興味があれば続行します_**

> **_📣_ この投稿では、Apple Storeに作成したアプリがあると仮定しています**

## イントロ

XcodeにCapacitorアプリをビルドさせるには、いくつかの設定をする必要があります。

## パッケージの準備

`packagejson`スクリプトにビルドコマンドがあることを確認してください  
次に、以下のように`sync:ios`コマンドを追加します。

```json
{
  "scripts": {
    "build": "YOUR BUILD COMMAND",
    "sync:ios": "cap sync ios"
  }
}
```
このステップで投稿スクリプトが単純に機能します。

## クローンスクリプト
このスクリプトは、クローンステップの後にXcode Cloudによって実行されます。

```bash
#!/usr/bin/env bash

set -x

export HOMEBREW_NO_INSTALL_CLEANUP=TRUE
# Install CocoaPods
echo "📦 Install CocoaPods"
brew install cocoapods
brew install node@18
brew link node@18

# Install dependencies
# XCode Cloud is literally broken for 2 months now - https://developer.apple.com/forums/thread/738136?answerId=774510022#774510022
npm config set maxsockets 3
npm ci
# or `pnpm install --frozen-lockfile` or `yarn install --frozen-lockfile` or bun install
npm run build 
# or npm run build
npm run sync:ios
```

このファイルをプロジェクトのルートに保存し、`ios/App/ci_scripts/ci_post_clonesh`という名前を付けます。

次に、このファイルを以下のコマンドで実行可能にします。`chmod +x ios/App/ci_scripts/ci_post_clonesh`

## Xcodeワークフローの作成

Xcodeを開きます（はい、Xcodeを削除するにはXcodeが必要です）

このタブに移動します：
![Xcode ステップ 1](/xcode_step_1webp)

ワークフローの作成をクリックし、アプリを選択し、次へ進みます。

![Xcode ステップ 2](/xcode_step_2webp)

左側でワークフローの編集をクリックします。
![Xcode ステップ 2](/xcode_step_3webp)

環境タブに移動し、以下のようにMac 124を選択し、適切なオプションにチェックを入れます。
![Xcode ステップ 3](/xcode_step_3webp)

開始条件を選択します。  
私たちと同じビルドを使用する場合は、ブランチの代わりにタグを使用することをお勧めします。二重ビルドを避けるためです。

環境変数を設定します。
![Xcode ステップ 4](/xcode_step_4webp)

GitHubアカウントを接続します。
![Xcode ステップ 5](/xcode_step_5webp)

![Xcode ステップ 6](/xcode_step_6webp)

その後、ワークフローを有効にし、最初の変更をコミットすると、Xcodeでビルドが実行されているのを見ることができるはずです。

## **ビルド処理**

Xcode Cloudでは、**CI/CDワークフローの実行に使用した分の分数に基づいて請求されます**。  
経験からすると、Apple Storeでビルドを処理できるまでに約10～15分かかります。

プライベートプロジェクトの場合、ビルドあたりの推定コストは**$0008/分 x 5分 = $04**、またはプロジェクトの構成または依存関係によってはもっと高くなる可能性があります。

オープンソースプロジェクトの場合、これは全く問題にならないはずです。[価格について](https://githubcom/pricing/)をご覧ください。