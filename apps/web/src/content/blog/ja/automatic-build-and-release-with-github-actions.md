---
slug: automatic-build-and-release-with-github-actions
title: Githubアクションによるアプリの自動ビルドとリリース
description: >-
  Github actionsを使用して無料でCI/CDパイプラインを作成し、mainにプッシュするたびにIonic Capacitor
  JSアプリをデプロイしましょう。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-03-23T00:00:00.000Z
updated_at: 2026-04-08T14:34:13.000Z
head_image: /github_actions.webp
head_image_alt: Github アクション図
keywords: 'Github actions, CI/CD, automatic build, automatic release, mobile app updates'
tag: CI/CD
published: true
locale: ja
next_blog: automatic-capacitor-ios-build-github-action
---
このチュートリアルはGitHubホスティングに焦点を当てていますが、少しの調整で他のCI/CDプラットフォームにも適用できます。

## はじめに

まず、CapacitorアプリをCapgoに追加していることを確認してください。このチュートリアルはアップロード段階のみに焦点を当てています。
Capgoにアプリを追加する必要がある場合は、この[チュートリアル](/blog/update-your-capacitor-apps-seamlessly-using-capacitor-updater/)に従ってください。

## コミット規約

最初に[conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)のコミット規約に従う必要があります。これによりツールがバージョン番号をどのように更新するかを理解するのに役立ちます。学ぶのに5分もかかりません。

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

jobs:
  bump-version:
    if: "!startsWith(github.event.head_commit.message, 'chore(release):')"
    runs-on: ubuntu-latest
    name: "Bump version and create changelog with standard version"
    steps:
      - name: Check out
        uses: actions/checkout@v6
        with:
          fetch-depth: 0
          filter: blob:none
          token: '${{ secrets.PERSONAL_ACCESS_TOKEN }}'
      - name: Git config
        run: |
          git config --local user.name "github-actions[bot]"
          git config --local user.email "github-actions[bot]@users.noreply.github.com"
      - name: Create bump and changelog
        run: npx capacitor-standard-version
      - name: Push to origin
        run: |
          CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
          remote_repo="https://${GITHUB_ACTOR}:${{ secrets.PERSONAL_ACCESS_TOKEN }}@github.com/${GITHUB_REPOSITORY}.git"
          git pull $remote_repo $CURRENT_BRANCH
          git push $remote_repo HEAD:$CURRENT_BRANCH --follow-tags --tags
```

これにより、メインブランチの各コミットに対してタグがリリースされ、`CHANGELOG.md`にメインブランチの各コミットのチェンジログエントリが追加されます。

このファイルがなくても心配ありません。自動的に作成されます。

これを機能させるために、[PERSONAL_ACCESS](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token/)トークンを作成し、GitHub[シークレット](https://docs.github.com/en/actions/security-guides/encrypted-secrets "GitHub secrets")に`PERSONAL_ACCESS_TOKEN`として設定してください。

これはCIがチェンジログをコミットできるようにするために必要です。

トークンを作成する際は、有効期限を`never`に、スコープを`repo`に設定してください。

最後に、`package.json`ファイルのバージョンを設定し、次のステップを容易にするためにネイティブバージョン番号と同期させてください。

これは最初の1回だけ必要で、その後はツールが自動的に更新を維持します。

これら2つのファイルをコミットすると、GitHubに最初のタグが表示されます！

ネイティブとウェブの両プラットフォームは、各コミット後にバージョン番号が更新されます。

## ビルド用のGitHubアクション

以下のパスにファイルを作成してください：`.github/workflows/build.yml`

以下の内容で：

```yml
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
        uses: actions/checkout@v6
      - name: Install dependencies
        id: install_code
        run: npm i
      - name: Build
        id: build_code
        run: npm run build
        env: # Remove both lines  if you don't need it
          FIREBASE_CONFIG: ${{ secrets.FIREBASE_CONFIG }} # Exemple of env var coming from a secret
      - name: Create Release
        id: create_release
        run: npx @capgo/cli@latest bundle upload -a ${{ secrets.CAPGO_TOKEN }} -c production
```

これにより、依存関係がインストールされビルドされてからCapgoに送信されます。

ビルドコマンドが異なる場合は、`build_code`ステップで変更できます。

これを機能させるために、CapgoのAPIキーを取得し、[GitHubリポジトリのシークレット](https://docs.github.com/en/actions/security-guides/encrypted-secrets/)に`CAPGO_TOKEN`として追加する必要があります。

これら2つのファイルをコミットすると、GitHubに最初のタグが表示されます！

コミットを追加すると、プロダクションチャンネル用の新しいビルドが生成されます。

コードが正しく動作することを確認するために、ビルドステップにテストを追加する必要があります。

Capgoダッシュボードに移動して、表示されたばかりのビルドを確認してください。これでCI/CDシステムが整いました。

すべてのユーザーが更新可能になったときに更新を取得できるようにしたい場合は、チャンネルに移動して`public`に設定してください。

また、以下のチュートリアルに従って、Ionic Capacitor JavaScriptアプリのネイティブビルドを追加することもできます 👇
