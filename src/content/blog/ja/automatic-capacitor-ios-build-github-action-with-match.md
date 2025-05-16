---
slug: automatic-capacitor-ios-build-github-action-with-match
title: GitHubアクションとmatchを使用した自動CapacitorのiOSビルド
description: >-
  5分で fastlane と GitHub Actions を使用して Ionic iOS アプリの CI/CD
  パイプラインをセットアップする方法（2022年）
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-10-30T00:00:00.000Z
updated_at: 2024-08-01T00:00:00.000Z
head_image: /fastlane_ios.webp
head_image_alt: FastlaneのTestFlightのGitHubアクション説明
keywords: 'Fastlane, CI/CD, iOS, automatic build, automatic release, mobile app updates'
tag: CI/CD
published: true
locale: ja
next_blog: automatic-capacitor-android-build-github-action
---

# GitHub Actionsを使用した自動iOSビルドとMatch

CapacitorアプリのCI/CDのセットアップは複雑で時間がかかる場合があります。以下が知っておくべきことです:

## 前提条件

開始前に、以下の準備が必要です:

- 管理者権限を持つGitHubアカウント
- iOS開発者プログラムのメンバーシップ 
- 適切な権限を持つApp Store Connect APIアクセス
- GitHub Actionsワークフローの理解
- FastlaneとMatchの設定に関する知識
- パイプラインのメンテナンスとデバッグの時間
- 多数の開発者チーム(そうでない場合は、より簡単なワークフロー用の[fastlane cert](/blog/automatic-capacitor-ios-build-github-action)を推奨)

## CapgoによるプロフェッショナルなCI/CDセットアップ

複雑さを回避するため、[Capgo](https://capgo.app/docs/getting-started/cicd-integration/)が希望のプラットフォームで直接CI/CDパイプラインを設定します:

- **プラットフォーム独立**: GitHub Actions、GitLab CIなどで動作
- **シームレスな統合**: プラットフォームの切り替え不要、現在のプロセスで動作
- **カスタマイズ設定**: プロジェクトのニーズに合わせた設定
- **専門家のガイダンス**: すでに50以上のアプリでCI/CDを設定済み

### 料金
- 初期設定料: $2,600
- ランニングコスト: 年間約$300
- 他の独自ソリューションとの比較: 年間$6,000
- **5年間で$26,100の節約**

[CI/CDを今すぐ設定](https://calcom/martindonadieu/mobile-ci-cd-done-for-you/)

## 手動セットアップガイド

すべて自分でセットアップしたい場合は、以下の手順に従ってください:

## FastlaneとGitHub Actionsを使用したiOSの継続的デリバリー

## 前提条件

チュートリアルを続ける前に...

- 開発マシンにFastlaneが[インストール](https://docsfastlanetools/)されていることを確認
- iOS開発者プログラムのメンバーシップ
- 読む意欲😆...
- 多数の開発者チーム(そうでない場合は、より簡単なワークフロー用の[fastlane cert](/blog/automatic-capacitor-ios-build-github-action)を推奨)

## 料金に関する重要な情報

![Price GitHub Action](/price_github_actions.webp)

[https://githubcom/features/actions](https://githubcom/features/actions/)

選択したマシンに応じて、制限まではサービスは「無料」です。
**_macOS_**マシンを使用する予定で、スクリーンショットにその価格と制限が表示されています(チュートリアル作成時の価格で、将来変更される可能性があります)

🔴 **_要件と価格について警告しましたが、続けたい場合は進めましょう..._**

> **_📣_ この投稿では、iTunes Connectでアプリが作成済みで、Apple ecosystemの証明書を持っていることを前提としています。すべてFastlaneによってコピーされます!**

## 詳しく見ていきましょう 🤿

**投稿の手順**

1. _FastlaneMatchでApp Store Connect APIを使用する_
2. _要件_
3. _App Store Connect APIキーの作成_
4. _App Store Connect APIキーの使用_
5. _Fastlaneファイルのコピー_
6. _Fastlane matchsの設定_

## 1. FastlaneMatchでApp Store Connect APIを使用する

> 2021年2月より、App Store Connectへのサインインには二要素認証または二段階認証が必要になりました。この追加のセキュリティ層により、アカウントにアクセスできるのはあなただけになります。
> [Apple Support](https://developerapplecom/support/authentication/)より

> matchを始めるには既存の証明書を取り消す必要がありますが、心配いりません。新しい証明書が直接取得できます

## 要件

App Store Connect APIを使用するために、Fastlaneには**3つ**の要素が必要です

1. Issuer ID
2. Key ID
3. キーファイルまたはキーの内容

## App Store Connect APIキーの作成

キーを生成するには、App Store Connectで管理者権限が必要です。権限がない場合は、関係者にこの記事を共有し、以下の手順に従ってください

1. [App Store Connect](https://appstoreconnectapplecom/)にログイン

2. [ユーザーとアクセス](https://appstoreconnectapplecom/access/users/)を選択

![App Store Connect user access](/select_user_access.webp)

3. 統合タブを選択![App Store Connect API Integration](/user_access_keys.webp)

4. — API キーを生成、または追加（+）ボタンをクリックします

![App Store Connect API keys create](/user_access.webp)

5. — キーの名前を入力します。この名前は参照用であり、キー自体の一部ではありません

![App Store Connect API keys create name](/gen_key.webp)

6. — アクセス権で、キーの役割を選択します。キーに適用される役割は、チームのユーザーに適用される役割と同じです。[役割の権限](https://helpapplecom/app-store-connect/#/deve5f9a89d7/)を参照してください。**App manager**を選択することをお勧めします

7. — 生成をクリックします

> **APIキーのアクセス権は、特定のアプリに制限することはできません**

新しいキーの名前、キーID、ダウンロードリンク、その他の情報がページに表示されます

![App Store Connect download keys](/download_key.webp)

ここで必要な3つの情報を取得できます  
[[HTML_TAG]] Issue ID  
[[HTML_TAG]] Key ID  
[[HTML_TAG]] 「APIキーをダウンロード」をクリックしてAPIプライベートキーをダウンロードします。ダウンロードリンクは、プライベートキーがまだダウンロードされていない場合にのみ表示されます。Appleはプライベートキーのコピーを保持しないため、一度しかダウンロードできません

> _🔴_ プライベートキーは安全な場所に保管してください。キーを共有したり、コードリポジトリに保存したり、クライアントサイドのコードに含めたりしてはいけません

## App Store Connect APIキーの使用

APIキーファイル（ダウンロードしたp8ファイル）、キーID、発行者IDは、認証用のJWTトークンを作成するために必要です。これらの情報をFastlaneに入力する方法は複数あり、Fastlaneの新しいアクション`app_store_connect_api_key`を使用できます。他の方法は[Fastlaneのドキュメント](https://docsfastlanetools/actions/app_store_connect_api_key/)で確認できます。この方法を紹介するのは、ほとんどのCIで環境変数を設定できるため、最も簡単な方法だと考えるからです

_これでApp Store Connect APIキーを使用してFastlaneを管理できるようになりました！_

## 2. Fastlaneファイルをコピー

Fastlaneは、モバイル開発の一般的なタスクを自動化するために作られたRubyライブラリです。Fastlaneを使用すると、通常Android Studioで実行するタスクを実行するアクションのバンドルである「レーン」をカスタム設定できます。Fastlaneでは多くのことができますが、このチュートリアルでは、コアアクションの一部のみを使用します

プロジェクトのルートにFastlaneフォルダを作成し、以下のファイルをコピーします：
Fastfile
[[CODE_BLOCK]]

Appfile
[[CODE_BLOCK]]

## **Fastlane matchの設定**

Fastlane [match](https://docsfastlanetools/actions/match/)は、iOSのコード署名に対する新しいアプローチです。Fastlane matchを使用すると、チームがiOSアプリに必要な証明書とプロビジョニングプロファイルを簡単に管理できます

例えば、GitHubの個人アカウントまたは組織に`certificates`という名前の新しいプライベートリポジトリを作成します

iOSアプリ用にFastlane matchを初期化します

[[CODE_BLOCK]]

オプション#1（Git Storage）を選択します

[[CODE_BLOCK]]

新しく作成したリポジトリのURLを割り当てます

[[CODE_BLOCK]]

> これでFastlaneフォルダ内に**_Matchfile_**というファイルが作成され、`_git_url_`は証明書リポジトリのHTTPS URLに設定されているはずです。オプションでSSHも使用できますが、実行に異なるステップが必要です

[[CODE_BLOCK]]

次に、Fastlane Matchで証明書を生成し、求められた時に認証情報を入力します

パスフレーズの入力を求められます。後でGitHub Actionsが証明書リポジトリを復号化する際に使用するため、正しく覚えておいてください

[[CODE_BLOCK]]

すべてが順調に進んだ場合、以下のような表示が表示されるはずです：

[[CODE_BLOCK]]

> GitHubと必要な権限で問題が発生した場合は、この[投稿](https://mediumcom/@litoarias/token-authentication-requirements-for-git-operations-5fdd8a6f6e7c/)がgit認証トークンの生成に役立つかもしれません

生成された証明書とプロビジョニングプロファイルは、証明書リポジトリリソースにアップロードされます

![App Store Connect certificates](/certificates