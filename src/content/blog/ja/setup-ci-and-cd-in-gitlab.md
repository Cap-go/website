---
slug: configurazione-ci-e-cd-gitlab
title: GitLab によるアプリの自動ビルドとリリース
description: GitLabを使用して無料でCI/CDパイプラインを作成し、mainにプッシュするたびにIonic Capacitor JSアプリをデプロイしましょう。
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-14T00:00:00.000Z
updated_at: 2023-09-14T00:00:00.000Z
head_image: /CI_CD_in_Gitlab.webp
head_image_alt: GitLabでのCI/CD
keywords: 'GitLab, CI/CD, automatic build, automatic release, mobile app updates'
tag: CI/CD
published: true
locale: ja
next_blog: ''
---
このガイドではGitLabでのCI/CDパイプラインのセットアップ方法について説明します。

## はじめに

まず、CapacitorアプリをCapgoに追加していることを確認してください。このチュートリアルはアップロード段階に焦点を当てています。Capgoにアプリを追加する必要がある場合は、この[チュートリアル](https://capgo.app/blog/update-your-capacitor-apps-seamlessly-using-capacitor-updater/)に従ってください。

## コミット規約

最初に、[conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)のコミット規約に従う必要があります。これによりツールがバージョン番号をどのように更新するかを理解するのに役立ちます。学ぶのに5分しかかかりません。

![Conventional commits](/conventional_commits.webp)

## タグ用のGitLab CI/CD

GitLabリポジトリのルートに以下の内容で.gitlab-ci.ymlファイルを作成します

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

スクリプトセクションの "gitlab@yourdomain.com" と "GitLab CI/CD" を、あなたのGitLabメールとユーザー名に置き換えてください。この設定は、mainブランチへのプッシュ時のみジョブをトリガーし、"chore(release):"で始まるコミットメッセージは除外します。

## ビルド用のGitLab CI/CD

.gitlab-ci.ymlファイルにビルド用の別のステージを追加します：

        stages:
          - deploy

       deploy:
         stage: deploy
         only:
           - tags  # このジョブはタグプッシュ時のみ実行されます
         script:
           - apt-get update -qy && apt-get install -y nodejs npm
           - npm install -g @capgo/cli
           - npm ci
           - npm run build
           - npx @capgo/cli bundle upload -a $CAPGO_TOKEN -c production
         variables:
           FIREBASE_CONFIG: $FIREBASE_CONFIG  # GitLabプロジェクト設定で定義してください
         environment:
           name: production

GitLabプロジェクトのCI/CD変数にCapgo APIキー（CAPGO_TOKEN）を追加していることを確認してください。GitLabのプロジェクトで、設定 > CI/CD > 変数に移動し、CAPGO_TOKENという名前の変数にAPIキーの値を追加します。

npm run buildコマンドを変更するなど、プロジェクト固有のビルドプロセスに合わせてビルドスクリプトをカスタマイズしてください。

## 結論

これで完了です！私たちは技術の旅でさらに一歩前進しました。現代のソフトウェア開発において、CICDは考慮すべき重要な要素です。このガイドラインが皆様の理解の助けになれば幸いです。
