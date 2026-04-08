---
slug: automatic-capacitor-android-build-gitlab
title: GitLabを使用した自動Capacitor Androidビルド
description: Android IonicアプリのためにfastlaneとGitLabを使用してCI/CDパイプラインを5分で設定する方法
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-27T00:00:00.000Z
updated_at: 2023-09-27T00:00:00.000Z
head_image: /andriod_app_gitlab.webp
head_image_alt: ファストレーン Google Play GitLab イラスト
keywords: >-
  Fastlane, CI/CD, Android, automatic build, automatic release, mobile app
  updates
tag: CI/CD
published: true
locale: ja
next_blog: null
---
# GitLab CIによる自動Androidビルド

Capacitorアプリに対するCI/CDの設定は複雑で時間がかかる場合があります。以下のことを知っておく必要があります。

## 前提条件

始める前に、以下の設定を行う必要があります：

- 管理者アクセスを持つGitLabアカウント
- 正しく署名されている状態でGoogle Playストアに既に公開されたアプリ
- Android署名キーとキーストアファイル
- PlayストアAPIが有効なGoogle Cloud Consoleプロジェクト
- 適切な権限を持つサービスアカウント
- GitLab CI/CDワークフローの理解
- Fastlaneの設定に関する知識
- パイプラインの維持とデバッグにかける時間

## CapgoによるプロフェッショナルCI/CD設定

複雑さをスキップしましょう。 [Capgo](https://capgo.app/docs/getting-started/cicd-integration/) は、お好みのプラットフォームで直接CI/CDパイプラインを設定します：

- **プラットフォーム非依存**：GitHub Actions、GitLab CIなどで動作
- **シームレスな統合**：プラットフォームの切り替えは不要、現在のプロセスで動作
- **カスタマイズされた設定**：プロジェクトのニーズに合わせた設定
- **専門的なガイダンス**：すでに50以上のアプリのCI/CDを設定済み

### 料金
- 一時的な設定料：$2,600
- 運用コスト：年間約$300
- 他の独自ソリューションと比較：年間$6,000
- **5年間で$26,100の節約**

[今すぐCI/CDを設定](https://cal.com/team/capgo/mobile-ci-cd-done-for-you/)

## マニュアル設定ガイド

もしすべてを自分で設定したい場合は、以下の手順に従ってください：

**投稿内の手順**

1.  _Fastlaneファイルをコピーする_
2.  _GitLabの暗号化されたシークレットに秘密情報を保存する_
3.  _Google Playサービスアカウントキーを作成し保存する_
4.  _Android署名キーを保存する_
5.  _GitLabワークフローの.ymlファイルを設定する_

## 1. Fastlaneファイルをコピーする

Fastlaneは、一般的なモバイル開発タスクを自動化するために作成されたRubyライブラリです。Fastlaneを使用すると、通常はAndroid Studioを使用して実行するタスクを実行する一連の「アクション」をバンドルするカスタム「レーン」を設定できます。Fastlaneで多くのことができますが、このチュートリアルの目的上、コアアクションのほんの一部だけを使用します。

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

### GitLab CI/CD変数にシークレットを保存する

GitLabは、GitHubのリポジトリシークレットに類似した暗号化されたCI/CD変数を保存する方法を提供します。機密情報を安全に保存するために。

1. GitLabプロジェクトの設定に移動します。
2. CI/CD > 変数を選択します。
3. 以下の変数を追加します：

-   ANDROID_KEYSTORE_FILE: Androidビルドの署名に使用されるbase64エンコードされた`.jks`または`.keystore`ファイル。このファイルは、アップロードキーに関連付けられたキーストアファイル（Playアプリの署名を使用する場合）またはアプリの署名キーになります。
-   KEYSTORE_KEY_PASSWORD: キーストアファイルに関連付けられたパスワード
-   KEYSTORE_KEY_ALIAS: キーストアエイリアス
-   KEYSTORE_STORE_PASSWORD: プライベートキーのパスワード
-   DEVELOPER_PACKAGE_NAME: com.example.appのようなAndroidアプリのID
-   PLAY_CONFIG_JSON: Base64エンコードされたサービスアカウントキーのJSON。

### Google Playサービスアカウントキーの作成

`PLAY_CONFIG_JSON`シークレットを生成するには、以下の手順に従います：

1. [Google Cloud Console](https://console.cloud.google.com/)に移動します。
2. 新しいプロジェクトを作成するか、既存のプロジェクトを選択します。
3. Google Play Android Developer APIを有効にします。
4. サービスアカウントを作成します：
   - "IAMと管理" > "サービスアカウント"に移動します。
   - "サービスアカウントを作成"をクリックします。
   - 名前と説明を付けます。
   - "作成して続行"をクリックします。
   - ロールの割り当てをスキップし、"完了"をクリックします。
5. JSONキーを生成します：
   - リスト内からサービスアカウントを見つけます。
   - 三点メニューをクリックし、"キーを管理"を選択します。
   - "キーを追加" > "新しいキーを作成"をクリックします。
   - JSONフォーマットを選択します。
   - "作成"をクリックします。
6. Play Consoleでアプリにサービスアカウントへのアクセスを付与します：
   - [Play Console](https://play.google.com/console)に移動します。
   - "ユーザーと権限"に移動します。
   - "新しいユーザーを招待"をクリックします。
   - サービスアカウントのメールアドレスを入力します（@*.iam.gserviceaccount.comで終わる）。
   - "生産へのリリース"権限を付与します。
   - "ユーザーを招待"をクリックします。
7. JSONキーをbase64に変換します：
   ```bash
   base64 -i path/to/your/service-account-key.json | pbcopy
   ```
8. base64エンコードされた文字列をGitLabの`PLAY_CONFIG_JSON`変数として追加します。

## GitLab CI/CDパイプラインを設定する

プロジェクトのルートに.gitlab-ci.ymlファイルを作成して、CI/CDパイプラインを定義します。以下はパイプラインの構造の一例です：

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

## パイプラインをトリガーする

新しいタグをGitLabリポジトリにプッシュすると、GitLab CI/CDが自動的に定義されたパイプラインをトリガーし、Fastlaneを使用してAndroidアプリをビルドおよびデプロイします。

プロジェクトの構造と要件に応じて、パスや依存関係を調整してください。この設定により、GitLab CI/CD上でのAndroidアプリのデプロイを自動化できます。

## 結論

GitLab CI/CDをmingc/android-build-box Dockerイメージで構成することで、Androidアプリのビルドプロセスを自動化し、開発ワークフローをより効率的で信頼性の高いものにできます。この自動化により、アプリ開発の核心事項に集中する時間が生まれ、結果的に高品質なAndroidアプリをより効率的に提供できるようになります。
