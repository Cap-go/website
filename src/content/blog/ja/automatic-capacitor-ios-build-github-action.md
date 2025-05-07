---
slug: automatic-capacitor-ios-build-github-action
title: GitHubアクションとプロビジョニングプロファイルを使用したCapacitor iOSの自動ビルド
description: 5分でIonicのiOSアプリ用のCI/CDパイプラインをfastlaneとGitHub Actionsで設定する方法（2024年）
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2024-08-04T00:00:00.000Z
updated_at: 2025-01-21T00:00:00.000Z
head_image: /fastlane_ios.webp
head_image_alt: GitHubのFastlane testflightアクション図解
keywords: 'Fastlane, CI/CD, iOS, automatic build, automatic release, mobile app updates'
tag: CI/CD
published: true
locale: ja
next_blog: automatic-capacitor-android-build-github-action
---
# GitHub Actionsを使用した自動iOSビルド（証明書使用）

Capacitorアプリのために CI/CDを設定するのは複雑で時間がかかります。以下が知っておくべきことです:

## 前提条件

開始前に、以下の準備が必要です:

- 管理者権限を持つGitHubアカウント
- iOSデベロッパープログラムのメンバーシップ 
- 適切な権限を持つApp Store Connect APIアクセス
- GitHub Actionsワークフローの理解
- Fastlaneの設定に関する知識
- パイプラインのメンテナンスとデバッグの時間
- 適切な証明書とプロビジョニングプロファイル

## CapgoによるプロフェッショナルなCI/CD設定

複雑さを避けましょう。[Capgo](https://capgo.app/docs/getting-started/cicd-integration/)はお好みのプラットフォームで直接CI/CDパイプラインを設定します:

- **プラットフォーム独立**: GitHub Actions、GitLab CIなどで動作
- **シームレスな統合**: プラットフォームの切り替え不要、現在のプロセスで動作
- **カスタマイズ可能な設定**: プロジェクトのニーズに合わせた設定
- **専門家のガイダンス**: すでに50以上のアプリでCI/CDを設定済み

### 料金
- 初期設定料: $2,600
- 運用コスト: 年間約$300
- 他の独自ソリューションとの比較: 年間$6,000
- **5年間で$26,100の節約**

[CI/CDを今すぐ設定](https://cal.com/martindonadieu/mobile-ci-cd-done-for-you/)

## 手動設定ガイド

すべてを自分で設定したい場合は、以下の手順に従ってください:

## FastlaneとGitHub Actionsを使用したiOSの継続的デリバリーと証明書


## 前提条件

チュートリアルを続ける前に:

- 開発マシンにFastlaneが[インストール](https://docs.fastlane.tools/)されていることを確認してください。
- iOSデベロッパープログラムのメンバーであることを確認してください。

## 料金に関する重要な情報

![GitHub Actionの料金](/price_github_actions.webp)

[https://github.com/features/actions](https://github.com/features/actions/)

選択したマシンに応じて制限までは'無料'です。  
私たちは**_macOS_**マシンを使用します。スクリーンショットでその料金と制限を確認できます（料金はチュートリアル作成時点のもので、将来変更される可能性があります）

**要件と料金について警告したところで、続けましょう。**

> **注: この投稿では、App Store Connectにアプリが作成済みであることを前提としています。重要な情報はFastlaneによってコピーされます！**

## このチュートリアルで学ぶこと

**投稿の手順**

1. _FastlaneでのApp Store Connect APIの使用_
    - _要件:_
      - _App Store Connect APIキーの作成_
      - _App Store Connect APIキーの使用_
2. _Fastlaneファイルのコピー_
3. _GitHub Actionsの設定_


## 1. FastlaneでのApp Store Connect APIの使用

> 2021年2月より、App Store Connectへのサインインには二要素認証または二段階認証が必要になりました。この追加のセキュリティ層はあなたのApple IDを保護し、アカウントにアクセスできるのはあなただけであることを確認します。  
> [Apple Support](https://developer.apple.com/support/authentication/)より

### 要件

FastlaneがApp Store Connect APIを使用してアプリをアップロードできるようにするには、以下の**3つ**が必要です:

1. 発行者ID
2. キーID
3. キーファイルまたはキーの内容

### App Store Connect APIキーの取得

キーを生成するには、App Store Connectで管理者権限が必要です。その権限がない場合は、関係者にこの記事を案内してください。

1. [App Store Connect](https://appstoreconnect.apple.com/)にログインします。

2. [ユーザーとアクセス](https://appstoreconnect.apple.com/access/users/)を選択します。

![App Store Connectユーザーアクセス](/select_user_access.webp)

3. 統合タブを選択します。

![App Store Connect API統合](/user_access_keys.webp)

4. APIキーを生成するか、追加(+)ボタンをクリックします。

![App Store Connect APIキー作成](/user_access.webp)

5. キーの名前を入力します。この名前は参照用のみで、キー自体の一部ではありません。

![App Store Connect APIキー名作成](/gen_key.webp)

6. アクセスで、キーの役割を選択します。キーに適用される役割は、チームのユーザーに適用される役割と同じです。[役割の権限](https://help.apple.com/app-store-connect/#/deve5f9a89d7/)を参照してください。**アプリマネージャー**を選択することをお勧めします。

7. 生成をクリックします。

> **APIキーのアクセスを特定のアプリに制限することはできません。**

新しいキーの名前、キーID、ダウンロードリンク、その他の情報がページに表示されます。

![App Store Connectキーのダウンロード](/download_key.webp)

必要な3つの情報をここで取得できます。  
<Text>発行者ID。(`APPLE_ISSUER_ID`シークレット)</Text>  
<Text>キーID。(`APPLE_KEY_ID`シークレット)</Text>  
<Text>「APIキーをダウンロード」をクリックしてAPIプライベートキーをダウンロードします。ダウンロードリンクは、プライベートキーがまだダウンロードされていない場合にのみ表示されます。Appleはプライベートキーのコピーを保持しません。そのため、ダウンロードは1回だけ可能です。</Text>

> _🔴_ プライベートキーは安全な場所に保管してください。キーを共有したり、コードリポジトリに保存したり、クライアントサイドのコードに含めたりしてはいけません。

### App Store Connect APIキーの使用

JWT認証トークンを作成するには、APIキーファイル（ダウンロードしたp8ファイル）、キーID、発行者IDが必要です。この情報をFastlaneに渡す方法は複数あります。私はFastlaneの新しいアクション`app_store_connect_api_key`を使用することを選びました。他の方法は[Fastlaneのドキュメント](https://docs.fastlane.tools/actions/app_store_connect_api_key/)で確認できます。環境変数を設定できるほとんどのCIで動作する最も簡単な方法だと考えるため、この方法を紹介します。

ダウンロードしたp8ファイルをBase64に変換し、シークレット(`APPLE_KEY_CONTENT`)として保存してください。

```shell
base64 -i AuthKey_XXX.p8 | pbcopy
```


_これでAPIキーを使用してFastlaneでApp Store Connectを管理できるようになりました。素晴らしい！_

## 2. 証明書

XCodeを開き、**設定** > **アカウント** > **Apple ID** > **チーム**に移動してチームを選択します。

![コード署名アイデンティティ](/code_signing_identities.webp)

**証明書を管理**をクリックします。

まだ証明書を作成していない場合は、新しい証明書を作成できます。

**+**をクリックし、**Apple Distribution**を選択します。

![Apple Distribution](/apple_distribution.webp)

次に、キーチェーンに移動して証明書を`.p12`ファイルとしてダウンロードする必要があります。

そのためには、キーチェーンの**ログイン**キーチェーンに切り替え、**証明書**タブに移動する必要があります。

![マイ証明書](/my_certificates.webp)

ダウンロードしたい証明書を選択できます。（証明書の日付で確認してください）

証明書の秘密鍵を右クリックし、**書き出す**を選択します。

ファイル形式として**パーソナル情報交換(.p12)**を選択します。

これで証明書が`.p12`ファイルとしてダウンロードされます。

ターミナルでファイルを開き、以下のコマンドを使用してBase64に変換してください：

```shell
base64 -i Certificates.p12 | pbcopy
```

これがあなたの`BUILD_CERTIFICATE_BASE64`シークレットになります。また、要求されたら証明書のパスワードを入力してください。このパスワードが`P12_PASSWORD`シークレットになります。

## 3. プロビジョニングプロファイル

[Apple Developer](https://developer.apple.com/account/resources/profiles/list)を開き、正しいチームを選択します。

**+**をクリックして新しいプロファイルを作成します。

![新しいプロファイルの作成](/create_new_profile.webp)

**App Store Connect**を選択します。

![App Store Connectを選択](/select_app_store_connect.webp)

正しいアプリを選択する必要があります。署名が失敗するためワイルドカードは使用できないので注意してください。

![正しいアプリを選択](/select_app.webp)

前に作成した正しい証明書を選択し（有効期限の日付と月が今日と同じであることを確認）、**続ける**をクリックします。

![正しい証明書を選択](/select_certificate.webp)

最後にプロファイルの名前を入力し、**生成**をクリックします。

> この名前は、Fastlaneで`APPLE_PROFILE_NAME`の値としてプロファイルを識別するために使用されます。

![プロファイルを生成](/generate_profile.webp)

プロファイルを`.mobileprovision`ファイルとしてダウンロードできます。

![プロファイルをダウンロード](/download_profile.webp)

プロファイルをBase64に変換し、シークレット(`BUILD_PROVISION_PROFILE_BASE64`)として保存してください。

```shell
base64 -i profile.mobileprovision | pbcopy
```

## 4. Fastlaneファイルのコピー

Fastlaneは、一般的なモバイル開発タスクを自動化するために作成されたRubyライブラリです。Fastlaneを使用すると、通常はAndroid studioで実行するタスクを実行する一連の「アクション」をバンドルするカスタム「レーン」を設定できます。Fastlaneでは多くのことができますが、このチュートリアルでは、コアアクションの一部のみを使用します。

プロジェクトのルートにFastlaneフォルダを作成し、以下のファイルをコピーしてください：
`Fastfile`
```ruby
default_platform(:ios)
platform :ios do
  lane :release do
    app_store_connect_api_key(
      key_id: ENV['APPLE_KEY_ID'],
      issuer_id: ENV['APPLE_ISSUER_ID'],
      key_content: ENV['APPLE_KEY_CONTENT'],
      is_key_content_base64: true,
      duration: 1200,
      in_house: false
    )

    cert
    sigh

    increment_build_number({
      build_number: ENV['VERSION']
    })

    update_code_signing_settings(
      use_automatic_signing: false,
      profile_name: ENV['APPLE_PROFILE_NAME'],
      bundle_identifier: ENV['BUNDLE_IDENTIFIER']
    )


    build_ios_app(
      scheme: "App",
      configuration: "Release",
      output_name: "App.ipa",
      output_directory: "dist/ios/",
      silent: true,
      clean: true,
      export_method: "app-store"
    )

    upload_to_app_store(
      submit_for_review: false,
      precheck_include_in_app_purchases: false,
      force: true,
      skip_binary_upload: false,
      skip_metadata: true,
      skip_screenshots: true
    )
  end
end
```

## 5. シークレットの設定
ローカルでは、Fastlaneは`.env`ファイルでシークレットを使用します。
以下は`.env`ファイルの例です：

```shell
APPLE_KEY_ID=XXXXXXXXXX
APPLE_ISSUER_ID=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
APPLE_KEY_CONTENT=XXXXXXXXXXX
APPLE_TEAM_ID=XXXXXXXXXX
BUNDLE_IDENTIFIER=XXX.XXX.XXX
APPLE_PROFILE_NAME=Your provisioning profile name
VERSION=1.0.0
```

### APP_STORE_CONNECT_TEAM_IDの取得
[Developer Center](https://developer.apple.com/account)に移動し、`Membership details`セクションまでスクロールします。
`Team ID`が`APP_STORE_CONNECT_TEAM_ID`シークレットに設定する値です。

<Image
  src="/membership_details.webp"
  width="800"
  height="600"
  alt="メンバーシップの

ただし、トレードオフがあります - ビルドをユーザーに配布する前に、App Store Connectでアプリのコンプライアンス情報を手動で更新する必要があります。

この最適化は主に、ビルド時間がコストとなるプライベートプロジェクトで有用です。パブリック/無料プロジェクトの場合、ビルド時間は無料なのでこの設定を有効にする必要はありません。詳細については、GitHubの[価格ページ](https://github.com/pricing/)をご覧ください。

## 7. GitHub Actionsのセットアップ

**GitHub シークレットの設定**

`.env`ファイルからシークレットをコピーし、GitHubリポジトリのシークレットに貼り付けてください。

**Settings** > **Secrets and variables** > **Actions** > **New repository secret**に移動します

<1>
  <2>
<3>

2. `BUILD_CERTIFICATE_BASE64` - Base64エンコードされた証明書。

3. `BUILD_PROVISION_PROFILE_BASE64` - Base64エンコードされたプロビジョニングプロファイル。

4. `BUNDLE_IDENTIFIER` - アプリのバンドル識別子。

5. `APPLE_KEY_ID` — App Store Connect API Key 🔺Key ID。

6. `APPLE_ISSUER_ID` — App Store Connect API Key 🔺Issuer ID。

7. `APPLE_KEY_CONTENT` — App Store Connect API Key 🔺 _.p8_のキーコンテンツ、[確認する](https://github.com/fastlane/fastlane/issues/18655/#issuecomment-881764901)

## 8. GitHubワークフローファイルの設定

GitHubワークフローディレクトリを作成します。

```shell
base64 -i APPLE_KEY_CONTENT.p8 | pbcopy
```

`workflow`フォルダ内に、`build-upload-ios.yml`という名前のファイルを作成し、以下を追加します。

```shell
base64 -i BUILD_CERTIFICATE.p12 | pbcopy
```

このワークフローはGitHubの_tag_の後にトリガーされるはずです。タグを自動化する必要がある場合は、まず[GitHub actionsによる自動ビルドとリリース](/blog/automatic-build-and-release-with-github-actions/)を参照してください。

その後、このワークフローはNodeJS依存関係を取得し、インストールしてJavaScriptアプリをビルドします。

> 新しいコミットを送信するたびに、TestFlightにリリースがビルドされます。

アプリはIonicを使用する必要はなく、Capacitorベースのみが必須です。古いCordovaモジュールを使用することもできますが、Capacitor JSプラグインが推奨されます。

## 8. ワークフローのトリガー

**コミットの作成**

_コミット_を作成すると、リポジトリでアクティブなワークフローが表示されるはずです。

**ワークフローのトリガー**

ワークフローをトリガーするには、新しいコミットを`main`または`developement`ブランチにプッシュします。

![Started with commit](/cd_started.webp)

数分後、App Store Connectダッシュボードでビルドが利用可能になるはずです。

![Testflight Dashboard](/testflight_app.webp)

## 9. ローカルマシンからデプロイできますか？

はい、できます。そして、とても簡単です。

いつものように、Xcodeを使用してアプリをビルドして署名することができます。

### 謝辞

このブログは以下の記事に基づいています：
- [FastlaneとGitHub actionsを使用したIOSの継続的デリバリー](https://litoarias.medium.com/continuous-delivery-for-ios-using-fastlane-and-github-actions-edf62ee68ecc/)
- [Fastlaneドキュメント](https://docs.fastlane.tools/app-store-connect-api/)
- [@mrogunlanaからのこのGitHubメッセージ](https://github.com/fastlane-community/fastlane-plugin-ionic/issues/63/#issuecomment-1074328057)
- [このGitHubドキュメント](https://docs.github.com/en/actions/deployment/deploying-xcode-applications/installing-an-apple-certificate-on-macos-runners-for-xcode-development)
