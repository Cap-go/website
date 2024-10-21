---
slug: setup-ci-and-cd-gitlab
title: GitLabを使用した自動化開発およびデプロイメントアプリケーション
description: >-
  GitLabを使って無料で自分のCI/CDパイプラインを作成し、メインブランチにプッシュするたびにIonic Capacitor
  JSアプリケーションをデプロイしましょう。
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-14T00:00:00.000Z
updated_at: 2023-09-14T00:00:00.000Z
head_image: /CI_CD_in_Gitlab.webp
head_image_alt: GitLabのCI/CD
tag: CI/CD
published: true
locale: ja
next_blog: ''
---

この記事では、GitLabを使用したCI/CDパイプラインのセットアップ方法を説明します。

## 前書き

最初にCapgoにあなたのCapacitorアプリを追加していることを確認してください。このチュートリアルはアップロードフェーズに焦点を当てています。Capgoにアプリを追加する必要がある場合は、この[Tutorial](https://capgoapp/blog/update-your-capacitor-apps-seamlessly-using-capacitor-updater/)を参照してください。

## コミット規約

最初に、コミット規約[conventional commits](https://wwwconventionalcommitsorg/en/v100/)に従い始める必要があります。これにより、ツールがバージョン番号をどのようにアップグレードするかを理解するのに役立ちます。学ぶのに5分かかります。

![Conventional commits](/conventional_commitswebp)

## タグ用のGitLab CI/CD

GitLabリポジトリのルートにgitlab-ci.ymlファイルを作成し、以下の内容を記述します。

```
stages:
  - tag

bump_version:
  stage: tag
  only:
    - main
  except:
    variables:
      - $CI_COMMIT_MESSAGE =~ /^chore\(release\):/
  script:
    - git config --global user.email "gitlab@yourdomain.com"
    - git config --global user.name "GitLab CI/CD"
    - git checkout $CI_COMMIT_REF_NAME
    - git pull origin $CI_COMMIT_REF_NAME
    - npx capacitor-standard-version
    - git push origin $CI_COMMIT_REF_NAME --tags
```

スクリプトセクションの「gitlab@yourdomain.com」と「GitLab CI/CD」をあなたのGitLabのメールアドレスとユーザー名に置き換えます。この設定により、ジョブはメインブランチへのプッシュ時のみトリガーされ、「chore(release):」で始まるメッセージのコミットは除外されます。

## ビルド用のGitLab CI/CD

ビルド用にgitlab-ci.ymlファイルに別のステージを追加します。

```
stages:
  - deploy

deploy:
  stage: deploy
  only:
    - tags  # このジョブはタグプッシュのみに対して実行されます
  script:
    - apt-get update -qy && apt-get install -y nodejs npm
    - npm install -g @capgo/cli
    - npm ci
    - npm run build
    - npx @capgo/cli bundle upload -a $CAPGO_TOKEN -c production
  variables:
    FIREBASE_CONFIG: $FIREBASE_CONFIG  # これをGitLabプロジェクトの設定で定義します
  environment:
    name: production
```

Capgo APIキー（CAPGO_TOKEN）がGitLabプロジェクトのCI/CD変数として追加されていることを確認してください。GitLabのプロジェクトに移動し、設定 > CI/CD > 変数に進み、CAPGO_TOKENという名前の変数をAPIキーの値で追加します。

ビルドスクリプトを特定のプロジェクトのビルドプロセスに合わせてカスタマイズします。たとえば、npm run buildコマンドを変更するなどです。

## 結論

ここまできました！私たちは技術の旅の中で一歩進んだのです。現代のソフトウェア開発において、CI/CDは考慮すべき重要な要素です。このガイドラインが皆に理解されることを願っています。