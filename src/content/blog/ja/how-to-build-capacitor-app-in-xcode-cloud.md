---
slug: how-to-build-capacitor-app-in-xcode-cloud
title: Xcode Cloudでのアプリ開発のためのIonic Capacitorの設定
description: CapacitorJSアプリをコンパイルするためにXcode cloudを使用し、MacOSの必要性を回避します。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-09-01T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /xcode_cloud.webp
head_image_alt: CapacitorのためのビルドをiCloud上で管理する
keywords: >-
  Xcode Cloud, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: ja
---
## 前提条件

チュートリアルを続ける前に...

-   GitHubを使用していることを確認
-   Capacitorを使用
-   アプリがすでにApple Storeにデプロイされている
-   読む意欲がある😆...

Ionicの使用はオプションです。Cordovaでも動作する可能性がありますが、試していません。

## 価格に関する重要事項

![Price Xcode Cloud](/xcode_cloud_price.webp)

[https://developer.apple.com/xcode-cloud/](https://developer.apple.com/xcode-cloud/)

このサービスは制限内まで'無料'です。
スクリーンショットで価格と制限を確認できます（価格はチュートリアル作成時点のもので、将来変更される可能性があります）

🔴 **_要件と価格について警告しましたので、よろしければ続けましょう..._**

> **_📣_ この投稿では、Apple Storeにアプリが作成済みであることを前提としています**

## はじめに

XcodeでCapacitorアプリをビルドするには、いくつかの設定が必要です。

## パッケージの準備

`package.json`スクリプトにビルドコマンドがあることを確認してください。
そして、以下のように`sync:ios`コマンドを追加します。

```json
{
  "scripts": {
    "build": "YOUR BUILD COMMAND",
    "sync:ios": "cap sync ios"
  }
}
```
この手順により、ポストスクリプトが簡単に動作するようになります

## ポストクローンスクリプト
このスクリプトは、クローン手順の後にXcode cloudによって実行されます

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
# or `pnpm install --frozen-lockfile` or `yarn add --frozen-lockfile` or bun install
npm run build 
# or npm run build
npm run sync:ios
```

このファイルをプロジェクトのルートに保存し、`ios/App/ci_scripts/ci_post_clone.sh`という名前を付けてください

次に、このコマンドでファイルを実行可能にします：`chmod +x ios/App/ci_scripts/ci_post_clone.sh`

## Xcodeワークフローの作成

Xcodeを開きます（はい、Xcodeを削除するにはXcodeが必要です）

以下のタブに移動します：
![Xcode step 1](/xcode_step_1.webp)

ワークフローの作成をクリックし、アプリを選択して、以下のように次へをクリックします。

![Xcode step 2](/xcode_step_2.webp)

左側のEdit workflowをクリックします
![Xcode step 2](/xcode_step_3.webp)

環境タブに移動し、以下のようにMac 12.4を選択し、適切なオプションをチェックします
![Xcode step 3](/xcode_step_3.webp)

開始条件を選択します。
私たちと同じビルドを使用する場合、二重ビルドを避けるためにブランチの代わりにTagを使用することをお勧めします。

環境変数を設定します
![Xcode step 4](/xcode_step_4.webp)

GitHubアカウントを接続します
![Xcode step 5](/xcode_step_5.webp)

![Xcode step 6](/xcode_step_6.webp)

その後、ワークフローを有効にして最初の変更をコミットすると、Xcodeでビルドが実行されているのが確認できるはずです。

## **ビルド処理**

Xcode Cloudでは、CI/CDワークフローの実行に使用した**分数に基づいて課金**されます。経験上、Apple Storeでビルドが処理されるまでに約10〜15分かかります。

プライベートプロジェクトの場合、ビルドあたりの推定コストは**$0.008/分 x 5分 = $0.4**、またはそれ以上になる可能性があり、これはプロジェクトの構成や依存関係によって異なります。

オープンソースプロジェクトの場合、これは全く問題にはならないはずです。[価格設定](https://github.com/pricing/)を参照してください。
