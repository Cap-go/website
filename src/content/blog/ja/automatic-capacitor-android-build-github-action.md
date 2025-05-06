---
slug: automatic-capacitor-android-build-github-action
title: Capacitorの自動Android GitHubアクション ビルド
description: 5分でfastlaneとGitHub Actionsを使用してCapacitorのAndroidアプリ用のCI/CDパイプラインを設定する方法
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-10-27T00:00:00.000Z
updated_at: 2024-06-01T00:00:00.000Z
head_image: /fastlane_android.webp
head_image_alt: GitHub Action による Fastlane Google Play の図解
keywords: >-
  Fastlane, CI/CD, Android, automatic build, automatic release, mobile app
  updates, Capacitor
tag: CI/CD
published: true
locale: ja
next_blog: automatic-capacitor-ios-build-github-action
original_slug: automatic-capacitor-android-build-github-action
---
# GitHub Actionsによる自動Androidビルド

CapacitorアプリのCI/CDのセットアップは複雑で時間がかかることがあります。以下が重要なポイントです：

## 前提条件

開始前に、以下の準備が必要です：

- 管理者権限を持つGitHubアカウント
- Google Play Storeに既に公開され、適切な署名がされているアプリ
- Android署名キーとkeystoreファイル
- Play Store APIが有効化されたGoogle Cloud Consoleプロジェクト
- 適切な権限を持つサービスアカウント
- GitHub Actionsワークフローの理解
- Fastlaneの設定に関する知識
- パイプラインのメンテナンスとデバッグの時間

## CapgoによるプロフェッショナルなCI/CDセットアップ

複雑さを回避しましょう。[Capgo](https://capgo.app/docs/getting-started/cicd-integration/)は、お好みのプラットフォームで直接CI/CDパイプラインを構成します：

- **プラットフォーム独立性**: GitHub Actions、GitLab CI、その他で動作
- **シームレスな統合**: プラットフォームの切り替え不要、現在のプロセスで動作
- **カスタマイズ可能な設定**: プロジェクトのニーズに合わせた設定
- **専門家のガイダンス**: 既に50以上のアプリでCI/CDを設定済み

### 料金
- 一回限りの設定料: $2,600
- ランニングコスト: 年間約$300
- 他の独自ソリューションとの比較: 年間$6,000
- **5年間で$26,100の節約**

[CI/CDを今すぐセットアップ](https://cal.com/martindonadieu/mobile-ci-cd-done-for-you/)

## 手動セットアップガイド

すべて自分でセットアップする場合は、以下の手順に従ってください：

## GitHub Actionsの料金

![Price GitHub Action](/price_github_actions.webp)

GitHub Actionsは、リポジトリの種類に応じて無料の実行時間を提供します：
- パブリックリポジトリ：月2,000分
- プライベートリポジトリ：月2,000分（Linuxランナー）

プライベートプロジェクトの場合、コストは約$0.008/分です。一般的なビルドは3-5分かかります。

## 手動セットアップの手順

1. Fastlaneのセットアップ
2. GitHubシークレットの設定
3. GitHub Actionsワークフローの作成

## 1. Fastlaneのセットアップ

プロジェクトのルートに`fastlane`フォルダを作成し、以下の内容で`Fastfile`を追加します：

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
        
        # Get previous build number and increment
        previous_build_number = google_play_track_version_codes(
            package_name: ENV['DEVELOPER_PACKAGE_NAME'],
            track: "internal",
            json_key_data: json_key_data,
        )[0]
        current_build_number = previous_build_number + 1
        sh("export NEW_BUILD_NUMBER=#{current_build_number}")
        
        # Build the app
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
        
        # Upload to Play Store
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
end
```

## 2. GitHubシークレットの設定

機密情報をGitHubに安全に保存する必要があります。リポジトリ → Settings → Secrets and variables → Actions → New repository secretに移動します。

### 必要なシークレット：

1. **Google Playサービスアカウントキー**
   - Google Cloud Consoleでサービスアカウントを作成
   - Google Play Developer APIを有効化
   - Play Consoleでサービスアカウントにアプリへのアクセスを許可
   - JSONキーファイルをダウンロード
   - base64に変換：`base64 service_account_key.json | pbcopy`
   - `PLAY_CONFIG_JSON`として追加

2. **Android署名キー**
   - keystoreをbase64に変換：`base64 your_keystore.jks | pbcopy`
   - `ANDROID_KEYSTORE_FILE`として追加
   - keystoreの詳細を追加：
     - `KEYSTORE_KEY_ALIAS`
     - `KEYSTORE_KEY_PASSWORD`
     - `KEYSTORE_STORE_PASSWORD`
     - `DEVELOPER_PACKAGE_NAME`（例：com.example.app）

## 3. GitHub Actionsワークフローの作成

`.github/workflows/build-upload-android.yml`を作成：

```yaml
name: Build and Deploy Android App

on:
  push:
    tags:
      - '*'

jobs:
  build_android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: npm
          
      - name: Install dependencies
        run: npm ci
        
      - name: Cache Gradle
        uses: actions/cache@v3
        with:
          path: |
            ~/.gradle/caches
            ~/.gradle/wrapper
          key: ${{ runner.os }}-gradle-${{ hashFiles('**/*.gradle*', '**/gradle-wrapper.properties') }}
          restore-keys: |
            ${{ runner.os }}-gradle-
            
      - name: Build app
        run: npm run build
        
      - name: Sync Capacitor
        run: npx cap sync
        
      - name: Setup Java
        uses: actions/setup-java@v4
        with:
            distribution: 'zulu'
            java-version: '17'
            
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.0'
          bundler-cache: true
          
      - name: Run Fastlane
        uses: maierj/fastlane-action@v3.1.0
        env:
          PLAY_CONFIG_JSON: ${{ secrets.PLAY_CONFIG_JSON }}
          ANDROID_KEYSTORE_FILE: ${{ secrets.ANDROID_KEYSTORE_FILE }}
          DEVELOPER_PACKAGE_NAME: ${{ secrets.DEVELOPER_PACKAGE_NAME }}
          KEYSTORE_KEY_ALIAS: ${{ secrets.KEYSTORE_KEY_ALIAS }}
          KEYSTORE_KEY_PASSWORD: ${{ secrets.KEYSTORE_KEY_PASSWORD }}
          KEYSTORE_STORE_PASSWORD: ${{ secrets.KEYSTORE_STORE_PASSWORD }}
        with:
          lane: android beta
          
      - name: Upload artifact
        uses: actions/upload-artifact@v2
        with:
          name: android-release
          path: ./android/app/build/outputs/bundle/release/app-release.aab
          retention-days: 10
```

## 動作の仕組み

1. Gitタグを作成してワークフローをトリガー
2. GitHub Actionsがアプリをビルド
3. FastlaneがGoogle Playベータチャンネルにアップロード
4. アプリが自動的に更新される

## ビルド時間とコスト

- ビルド時間：3-5分
- プライベートリポジトリのコスト：ビルドあたり約$0.04
- オープンソースプロジェクトは無料

## リソース

- [GitHub Actions Documentation](https://docs.github.com/en/actions/)
- [Fastlane Documentation](https://docs.fastlane.tools/)
