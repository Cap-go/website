---
slug: gestire-build-dev-e-prod-con-github-actions
title: GitHubアクションで開発とプロダクションビルドを管理する
description: >-
  Capgo を使用して devbuild を特定のチャンネルにリリースし、Apple と Google のレビューを待たずに、チームが Capacitor
  Ionic アプリをテストできるようにします
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-16T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo_ci-cd-illustration.webp
head_image_alt: チャネルビルドの説明
keywords: >-
  GitHub Actions, CI/CD, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: CI/CD
published: true
locale: ja
next_blog: how-to-send-specific-version-to-users
---
このチュートリアルはGitHubホスティングに焦点を当てていますが、他のCI/CDプラットフォームでも少しの調整で対応できます。

## はじめに

まず、CapacitorアプリをCapgoに追加していることを確認してください。このチュートリアルはアップロード段階のみに焦点を当てています。

## コミット規約

最初に[conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)のコミット規約に従う必要があります。これによりツールがバージョン番号をどのようにアップグレードするかを理解するのに役立ちます。学ぶのに5分しかかかりません。

![Conventional commits](/conventional_commits.webp)

## タグ用のGitHubアクション

次に、自動的にビルドしてタグを作成する最初のGitHubアクションを作成する必要があります。

以下のパスにファイルを作成してください：`.github/workflows/bump_version.yml`

以下の内容で：

```toml
name: Bump version

on:
  push:
    branches:
      - main
      - development

jobs:
  bump-version:
    if: "!startsWith(github.event.head_commit.message, 'chore(release):')"
    runs-on: ubuntu-latest
    name: "Bump version and create changelog with standard version"
    steps:
      - name: Check out
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
          token: '${{ secrets.PERSONAL_ACCESS_TOKEN }}'
      - name: Git config
        run: |
          git config --local user.name "github-actions[bot]"
          git config --local user.email "github-actions[bot]@users.noreply.github.com"
      - name: Create bump and changelog
        if: github.ref == 'refs/heads/main'
        run: npx capacitor-standard-version
      - name: Create bump and changelog
        if: github.ref != 'refs/heads/main'
        run: npx capacitor-standard-version --prerelease alpha
      - name: Push to origin
        run: |
          CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
          remote_repo="https://${GITHUB_ACTOR}:${{ secrets.PERSONAL_ACCESS_TOKEN }}@github.com/${GITHUB_REPOSITORY}.git"
          git pull $remote_repo $CURRENT_BRANCH
          git push $remote_repo HEAD:$CURRENT_BRANCH --follow-tags --tags

```

これにより、メインブランチの各コミットに対してタグがリリースされ、`development`に対して`alpha`リリース、そして各コミットに対して`CHANGELOG.md`にチェンジログエントリが作成されます。

このファイルがなくても心配いりません。自動的に作成されます。

これを機能させるには、[PERSONAL ACCESS](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token/)トークンを作成し、GitHub[secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets "GitHub secrets")に`PERSONAL_ACCESS_TOKEN`として保存する必要があります。

これはCIがチェンジログとバージョンバンプをコミットできるようにするために必要です。

トークンを作成する際は、有効期限を`never`に、スコープを`repo`に設定してください。

`package.json`ファイルの`version`キーを設定してください。ストアでリリースされた最新バージョンを使用してください。

これは最初の1回だけ必要で、その後はツールが自動的に更新します。

これらのファイルをコミットすると、GitHubに最初のタグが表示されます！

`capacitor-standard-version`がこの魔法を実行するパッケージで、デフォルトでAndroidとiOSのバージョン番号も更新します。

## ビルド用のGitHubアクション

以下のパスにファイルを作成してください：`.github/workflows/build.yml`

以下の内容で：

```toml
name: Build source code and send to Capgo

on:
  push:
    tags:
      - '*'
      
jobs:
  deploy:
    runs-on: ubuntu-latest
    name: "Build code and release"
    steps:
      - name: Check out
        uses: actions/checkout@v4
      - name: Install dependencies
        id: install_code
        run: npm i
      - name: Build
        id: build_code
        run: npm build
        env:
          MY_ENV_VAR: ${{ secrets.MY_ENV_VAR }}
      - name: Create Release Alpha
        if: "contains(github.ref, '-alpha.')"
        id: create_release_prepro
        run: npx @capgo/cli@latest bundle upload -a ${{ secrets.CAPGO_TOKEN }} -c development
      - name: Create Release Production
        if: "!contains(github.ref, '-alpha.')"
        id: create_release_prod
        run: npx @capgo/cli@latest bundle upload -a ${{ secrets.CAPGO_TOKEN }} -c production
```

これにより、依存関係をインストールしてビルドしてからCapgoに送信します。

ビルドコマンドが異なる場合は、`build_code`ステップで変更できます。

環境変数が必要な場合は、`MY_ENV_VAR`を使用し、GitHubプロジェクト設定のsecretsでGitHub Actionに設定してください。

Capgoのアップロードを機能させるには、CapgoのAPIキーを取得し、[GitHubリポジトリのsecret](https://docs.github.com/en/actions/security-guides/encrypted-secrets/)に`CAPGO_TOKEN`として追加する必要があります。

これらのファイルをコミットすると、Capgoに最初のバージョンが表示されます！

コミットを追加すると、本番環境と開発チャンネル用の新しいCapacitorビルドが生成されます。

コードが正常に動作することを確認するため、Ionicビルドステップにテストを追加する必要があります。

Capgoダッシュボードに移動して、表示されたばかりのビルドを確認してください。これでCI/CDシステムが整いました。
