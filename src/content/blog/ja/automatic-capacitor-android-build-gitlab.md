---
slug: automatic-capacitor-android-build-gitlab
title: Build automatico di Capacitor Android con GitLab
description: >-
  Cara Menyiapkan Pipeline CI/CD untuk Aplikasi Ionic Android Menggunakan
  fastlane dan GitLab dalam 5 Menit
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-27T00:00:00.000Z
updated_at: 2023-09-27T00:00:00.000Z
head_image: /andriod_app_gitlab.webp
head_image_alt: Fastlane Google Play GitLab イラストレーション
keywords: >-
  Fastlane, CI/CD, Android, automatic build, automatic release, mobile app
  updates
tag: CI/CD
published: true
locale: ja
next_blog: null
---

# GitLab CIによる自動Androidビルド

Capacitorアプリ用のCI/CDのセットアップは複雑で時間がかかります。以下が知っておくべきことです：

## 前提条件

開始前に、以下のセットアップが必要です：

- 管理者アクセス権を持つGitLabアカウント
- 適切な署名でGoogle Play Storeに既に公開されているアプリ
- Android署名キーとキーストアファイル
- Play Store APIが有効なGoogle Cloud Consoleプロジェクト
- 適切な権限を持つサービスアカウント
- GitLab CI/CDワークフローの理解
- Fastlaneの設定に関する知識
- パイプラインの保守とデバッグの時間

## CapgoによるプロフェッショナルなCI/CDセットアップ

複雑さを回避して[Capgo](https://capgo.app/docs/getting-started/cicd-integration/)があなたの好みのプラットフォームで直接CI/CDパイプラインを設定します：

- **プラットフォーム独立性**: GitHub Actions、GitLab CI、その他で動作
- **シームレスな統合**: プラットフォームの切り替え不要、現在のプロセスで動作
- **カスタマイズ可能な設定**: プロジェクトのニーズに合わせた設定
- **専門家のガイダンス**: 既に50以上のアプリでCI/CDを設定済み

### 価格
- 一回限りの設定料: $2,600
- 運用コスト: 年間約$300
- 他の独自ソリューションとの比較: 年間$6,000
- **5年間で$26,100の節約**

[CI/CDを今すぐセットアップ](https://calcom/martindonadieu/mobile-ci-cd-done-for-you/)

## 手動セットアップガイド

すべて自分でセットアップする場合は、以下の手順が必要です：

**投稿内の手順**

1. _Fastlaneファイルのコピー_
2. _GitLab暗号化シークレットへの秘密情報の保存_
3. _Google Playサービスアカウントキーの作成と保存_
4. _Android署名キーの保存_
5. _GitLabワークフローymlファイルの設定_

## 1. Fastlaneファイルのコピー

Fastlaneは、一般的なモバイル開発タスクを自動化するために作成されたRubyライブラリです。Fastlaneを使用すると、通常Android Studioで実行するタスクを実行する「アクション」をバンドルするカスタム「レーン」を設定できます。Fastlaneでは多くのことができますが、このチュートリアルでは、主要なアクションの一部のみを使用します。

プロジェクトのルートにFastlaneフォルダを作成し、以下のファイルをコピーします：
Fastlane
```ruby
default_platform(:android)

KEYSTORE_KEY_ALIAS = ENV["KEYSTORE_KEY_ALIAS"]
KEYSTORE_KEY_PASSWORD = ENV["KEYSTORE_KEY_PASSWORD"]
KEYSTORE_STORE_PASSWORD = ENV["KEYSTORE_STORE_PASSWORD"]

platform :android do
    desc "Deploy a beta version to the Google Play"
    private_lane :verify_changelog_exists do |version_code: |
      changelog_path = "android/metadata/en-US/changelogs/#{version_code}.txt"
      UI.user_error!("Missing changelog file at #{changelog_path}") unless File.exist?(changelog_path)
      UI.message("Changelog exists for version code #{version_code}")
    end

    private_lane :verify_upload_to_staging do |version_name: |
      UI.message "Skipping staging verification step"
    end
    lane :beta do
				keystore_path = "#{Dir.tmpdir}/build_keystore.keystore"
				File.write(keystore_path, Base64.decode64(ENV['ANDROID_KEYSTORE_FILE']))
				json_key_data = Base64.decode64(ENV['PLAY_CONFIG_JSON'])
				previous_build_number = google_play_track_version_codes(
					package_name: ENV['DEVELOPER_PACKAGE_NAME'],
					track: "internal",
					json_key_data: json_key_data,
				)[0]

				current_build_number = previous_build_number + 1
				sh("export NEW_BUILD_NUMBER=#{current_build_number}")
        gradle(
          task: "clean bundleRelease",
          project_dir: 'android/',
          print_command: false,
          properties: {
            "android.injected.signing.store.file" => "#{keystore_path}",
            "android.injected.signing.store.password" => "#{KEYSTORE_STORE_PASSWORD}",
            "android.injected.signing.key.alias" => "#{KEYSTORE_KEY_ALIAS}",
            "android.injected.signing.key.password" => "#{KEYSTORE_KEY_PASSWORD}",
						'versionCode' => current_build_number
          })
        upload_to_play_store(
					package_name: ENV['DEVELOPER_PACKAGE_NAME'],
					json_key_data: json_key_data,
          track: 'internal',
          release_status: 'completed',
          skip_upload_metadata: true,
          skip_upload_changelogs: true,
          skip_upload_images: true,
          skip_upload_screenshots: true,
        )
    end
    lane :build do
      gradle(
        task: "clean bundleRelease",
        project_dir: 'android/',
        print_command: false,
        properties: {
          "android.injected.signing.store.file" => "#{keystore_path}",
          "android.injected.signing.store.password" => "#{KEYSTORE_STORE_PASSWORD}",
          "android.injected.signing.key.alias" => "#{KEYSTORE_KEY_ALIAS}",
          "android.injected.signing.key.password" => "#{KEYSTORE_KEY_PASSWORD}",
        })
    end
    lane :prod_release do
      build_gradle = File.read("../android/app/build.gradle")

      verify_changelog_exists(version_code: build_gradle.match(/versionCode (\d+)/)[1])
      verify_upload_to_staging(version_name: build_gradle.match(/versionName '([\d\.]+)'/)[1])

      supply(
        track_promote_to: 'beta',
        skip_upload_apk: true,
        skip_upload_aab: true,
        skip_upload_metadata: false,
        skip_upload_changelogs: false,
        skip_upload_images: false,
        skip_upload_screenshots: false
      )
    end
end
```

### GitLab CI/CD変数への秘密情報の保存

GitLabは、GitHubのリポジトリシークレットと同様に、暗号化されたCI/CD変数を保存する方法を提供します。機密情報を安全に保存するには：

1. GitLabプロジェクトの設定に移動
2. CI/CD > 変数に移動
3. 以下の変数を追加：

- ANDROID_KEYSTORE_FILE: Androidビルドの署名に使用するbase64エンコードされた`jks`または`keystore`ファイル。これはアップロードキー（Play App Signing使用時）またはアプリ署名キーに関連付けられたキーストアファイルです
- KEYSTORE_KEY_PASSWORD: キーストアファイルに関連付けられたパスワード
- KEYSTORE_KEY_ALIAS: キーストアエイリアス
- KEYSTORE_STORE_PASSWORD: プライベートキーのパスワード
- DEVELOPER_PACKAGE_NAME: comexampleappのようなandroidアプリID
- PLAY_CONFIG_JSON: base64エンコードされたサービスアカウントキーJSON

### Google Playサービスアカウントキーの作成

`PLAY_CONFIG_JSON`シークレットを生成するには、以下の手順に従います：

1. [Google Cloud Console](https://consolecloudgooglecom/)に移動
2. 新しいプロジェクトを作成するか、既存のプロジェクトを選択
3. Google Play Android Developer APIを有効化
4. サービスアカウントを作成：
   - "IAM & Admin" > "Service Accounts"に移動
   - "Create Service Account"をクリック
   - 名前と説明を入力
   - "Create and Continue"をクリック
   - ロール割り当てをスキップして"Done"をクリック
5. JSONキーを生成：
   - リストからサービスアカウントを見つける
   - 3点メニュー > "Manage keys"をクリック
   - "Add Key" > "Create new key"をクリック
   - JSONフォーマットを選択
   - "Create"をクリック
6. Play Consoleでサービスアカウントにアプリへのアクセスを許可：
   - [Play Console](https://playgooglecom/console)に移動
   - "Users and permissions"に移動
   - "Invite new users"をクリック
   - サービスアカウントのメール（@*iamgserviceaccountcom で終わる）を入力
   - "Release to production"権限を付与
   - "Invite user"をクリック
7.JSONキーをbase64に変換します:
```bash
   base64 -i path/to/your/service-account-key.json | pbcopy
   ```
8. `PLAY_CONFIG_JSON`変数として、base64でエンコードされた文字列をGitLabに追加します

## GitLab CI/CDパイプラインのセットアップ

プロジェクトのルートにgitlab-ci.ymlファイルを作成して、CI/CDパイプラインを定義します。以下はパイプラインの構造化の例です:

```yaml

image: mingc/android-build-box:latest

stages:
  - build
  - upload_to_capgo
  - build_and_upload_android

build:
  stage: build
  tags:
    - saas-linux-xlarge-amd64
  cache:
    - key:
        files:
          - bun.lockb
      paths:
        - .node_modules/
  script:
    - npm install
    - npm run build
  artifacts:
    paths:
      - node_modules/
      - dist/
  only:
    - master

upload_to_capgo:
  stage: upload_to_capgo
  tags:
    - saas-linux-xlarge-amd64
  script:
    - npx @capgo/cli@latest bundle upload -a $CAPGO_TOKEN -c dev
  dependencies:
    - build
  when: manual
  only:
    - master

build_and_upload_android:
  tags:
    - saas-linux-xlarge-amd64
  stage:    build_and_upload_android
  cache:
    - key:
        files:
          - android/gradle/wrapper/gradle-wrapper.properties
      paths:
        - ~/.gradle/caches/
  script:
    - npx cap sync android
    - npx cap copy android
    - bundle exec fastlane android beta # We do create a tag for the build to trigger XCode cloud builds
  dependencies:
    - build
  when: manual
  only:
    - master

```

## パイプラインのトリガー

GitLabリポジトリに新しいタグをプッシュするたびに、GitLab CI/CDは定義されたパイプラインを自動的にトリガーし、Fastlaneを使用してAndroidアプリをビルドおよびデプロイします。

プロジェクトの構造と要件に応じてパスと依存関係を調整してください。このセットアップにより、GitLab CI/CDでのAndroidアプリのデプロイを自動化することができます。

## 結論

mingc/android-build-box DockerイメージでGitLab CI/CDを設定することで、Androidアプリのビルドプロセスを自動化し、開発ワークフローをより効率的で信頼性の高いものにすることができます。この自動化により、アプリ開発の核心的な側面に集中する時間が確保され、最終的により高品質なAndroidアプリをより効率的に提供することができます。