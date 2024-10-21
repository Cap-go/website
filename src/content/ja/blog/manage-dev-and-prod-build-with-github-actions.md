---
slug: manage-dev-and-prod-build-with-github-actions
title: GitHub Actionsを使用して開発と本番のコンパイルを管理します。
description: >-
  Capgoを使用して特定のチャネルで開発ビルドをリリースし、チームがAppleやGoogleの承認を待つことなくIonic
  Capacitorアプリをテストできるようにします。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-16T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo_ci-cd-illustration.webp
head_image_alt: 建設イラストのチャンネル
tag: CI/CD
published: true
locale: ja
next_blog: how-to-send-specific-version-to-users
---

このチュートリアルはGitHubホスティングに焦点を当てていますが、少しの調整を加えることで他のCI/CDプラットフォームにも適応できます。

## 前書き

最初にCapgoにあなたのCapacitorアプリを追加していることを確認してください。このチュートリアルはアップロードフェーズに焦点を当てています。

## コミット規約

まず、[従来のコミット](https://wwwconventionalcommitsorg/en/v100/)のコミット規約に従い始める必要があります。これはツールがバージョン番号を更新する方法を理解するのに役立ちます。学ぶのに5分もかかりません。

![従来のコミット](/conventional_commitswebp)

## タグ用のGitHubアクション

次に、タグを自動的にビルドし作成するための最初のGitHubアクションを作成する必要があります。

このパスにファイルを作成します: `github/workflows/bump_versionyml`

次の内容で:

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

これにより、あなたのメインブランチの各コミットに対してタグがリリースされ、`development`に対して`alpha`リリースが生成され、最後に`CHANGELOGmd`の各コミットの変更ログエントリが作成されます。

このファイルがない場合でも心配しないでください。自動的に作成されます。

これを機能させるためには、GitHubの[秘密](https://docsgithubcom/en/actions/security-guides/encrypted-secrets "GitHub secrets")に`PERSONAL_ACCESS_TOKEN`として[個人アクセストークン](https://docsgithubcom/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token/)を作成する必要があります。

これはCIが変更ログとバージョンアップをコミットできるようにするために必要です。

トークンを作成するときは、有効期限を`never`に、スコープを`repo`に設定してください。

`packagejson`ファイルの`version`キーを設定します。そのためには、ストアでリリースされた最新のバージョンを使用してください。

これは最初の一度だけ必要であり、その後はツールが自動的に最新の状態を保ちます。

これで、この両方のファイルをコミットし、GitHubに最初のタグが表示されるのを見ることができます！

`capacitor-standard-version`はその魔法を行うパッケージです。デフォルトで、AndroidとiOSのバージョン番号も更新します。

## ビルド用のGitHubアクション

このパスにファイルを作成します: `github/workflows/buildyml`

次の内容で:

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

これにより、依存関係がインストールされ、Capgoに送信される前にビルドされます。

ビルドコマンドが異なる場合は、`build_code`ステップで変更できます。

環境変数が必要な場合は、`MY_ENV_VAR`を使用し、GitHubプロジェクト設定で`secret`を設定し、その後秘密としてGitHubアクションに設定します。

Capgoのアップロードを機能させるためには、CapgoのAPIキーを取得し、[GitHubリポジトリの秘密](https://docsgithubcom/en/actions/security-guides/encrypted-secrets/)に`CAPGO_TOKEN`として追加する必要があります。

これで、この両方のファイルをコミットし、Capgoに最初のバージョンが表示されるのを見ることができます！

コミットを追加すると、プロダクションおよび開発チャンネル用に新しいCapacitorビルドが生成されます。

コードが正常に動作していることを確認するために、Ionicビルドステップにテストを追加するべきです。

Capgoダッシュボードに行き、ちょうど表示されたビルドを確認してください。これでCI/CDシステムが整いました。