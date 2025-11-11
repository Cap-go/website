---
slug: creazione-automatica-capacitor-ios-codemagic
title: CodemagicでのCapacitor iOSの自動ビルド
description: iOSアプリ開発のためのCIおよびCDを5分で設定 - CodemagicでIonicアプリを管理する方法（2024）
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2024-07-24T00:00:00.000Z
updated_at: 2025-11-11T17:12:15.000Z
head_image: /Codemagic_ios.webp
head_image_alt: Codemagic の TestFlight のイラスト
keywords: 'Codemagic, CI/CD, iOS, automatic build, automatic release, mobile app updates'
tag: CI/CD
published: true
locale: ja
next_blog: automatic-capacitor-android-build-codemagic
---
# CodemagicによるiOSの継続的デリバリー

## 前提条件

チュートリアルを続行する前に…

- iOSデベロッパープログラムのメンバーシップ
- 読む意欲 😆…

## 価格に関する重要事項

![Price Codemagic Action](/price_codemagic.webp)

[https://codemagic.io/pricing/](https://codemagic.io/pricing/)

選択するマシンによって、サービスは月500 macOS M1分まで'無料'です。
私たちは**_macOS M1_**マシンを使用する予定です。スクリーンショットでその価格と制限を確認できます（価格はチュートリアル作成時点のもので、将来変更される可能性があります）

🔴 **_要件と価格について警告しましたので、よろしければ続けましょう…_**

> **_📣_ この投稿では、iTunes connectでアプリが作成済みで、Appleエコシステムの証明書も所持していることを前提としています。すべてはCodemagicによってセットアップされます！**

## 詳しく見ていきましょう 🤿

**投稿の手順**

1. _CodemagicでApp Store Connect APIを使用する_
2. _要件_
3. _App Store Connect APIキーの作成_
4. _App Store Connect APIキーの使用_
5. _Fastlaneファイルのコピー_
6. _Codemagicの設定_

## 1. CodemagicでApp Store Connect APIを使用する

> 2021年2月より、App Store Connectへのサインインには2要素認証または2段階認証が必要になりました。Apple IDに対するこの追加のセキュリティ層により、アカウントにアクセスできるのはあなただけになります。
> [Apple Support](https://developer.apple.com/support/authentication/)より

> matchを使い始めるには、既存の証明書を取り消す必要があります。ただし心配いりません、新しい証明書がすぐに発行されます。

### 要件

App Store Connect APIを使用するために、Codemagicは**3つ**の項目が必要です。

1. 発行者ID
2. キーID
3. キーファイルまたはキーの内容

### App Store Connect APIキーの作成

キーを生成するには、App Store Connectで管理者権限が必要です。その権限がない場合は、関係者にこの記事を案内し、以下の手順に従ってください。

1. [App Store Connect](https://appstoreconnect.apple.com/)にログインします。

2. [ユーザーとアクセス](https://appstoreconnect.apple.com/access/users/)を選択します。

![App Store Connect user access](/select_user_access.webp)

3. APIキータブを選択します。

![App Store Connect API Keys](/user_access_keys.webp)

4. APIキーの生成または追加(+)ボタンをクリックします。

![App Store Connect API keys create](/user_access.webp)

5. キーの名前を入力し、アクセスレベルを選択します。`App Manager`アクセス権限を選択することをお勧めします。Apple Developer Programの役割権限について詳しくは[こちら](https://help.apple.com/app-store-connect/#/deve5f9a89d7)をご覧ください。

![App Store Connect API keys create name](/gen_key.webp)

6. 生成をクリックします。

> **APIキーのアクセスは特定のアプリに制限することはできません。**

新しいキーの名前、キーID、ダウンロードリンク、その他の情報がページに表示されます。

![App Store Connect download keys](/download_key.webp)

ここで必要な3つの情報を取得します：
<1> 発行者ID
<2> キーID
<3> 「APIキーをダウンロード」をクリックしてAPIプライベートキーをダウンロードします。ダウンロードリンクは、プライベートキーがまだダウンロードされていない場合にのみ表示されます。Appleはプライベートキーのコピーを保持しません。そのため、ダウンロードは1回のみ可能です。

> _🔴_ プライベートキーは安全な場所に保管してください。キーを共有したり、コードリポジトリに保存したり、クライアントサイドのコードに含めたりしてはいけません。

[続く...]
