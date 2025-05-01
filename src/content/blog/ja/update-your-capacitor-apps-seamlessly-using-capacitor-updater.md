---
slug: update-your-capacitor-apps-seamlessly-using-capacitor-updater
title: CapacitorアプリをCapacitor-updaterでシームレスにアップデート
description: >-
  Bonjour la communauté Capacitor Ionic. Aujourd'hui, je vais vous aider à
  configurer Capacitor-updater dans votre application pour permettre des mises à
  jour fluides.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-02-27T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /update_flow.webp
head_image_alt: Capacitor開発者向けの代替案を探る
keywords: >-
  Capacitor, mobile app development, live updates, OTA updates, continuous
  integration, mobile app updates
tag: Tutorial
published: true
locale: ja
next_blog: ''
---

## Capacitor-updaterとは？

Capacitor-updaterは、アプリのアップデートや改善をエンドユーザーに即座に配信するのに役立つテクノロジーです

App Storeのレビューを経ることなく、重要なバグ修正を即座に配信したい場合に特に有効です

利用可能になった時点でサイドローディングによるアップデートを「Webのような」俊敏性で行うことができます

さらに、新しいアップデートでアプリがクラッシュした場合のロールバックも提供します

## どのように機能するか？

CapgoはアプリのJavaScriptバンドルをCapgoサーバーと同期し、ユーザーがアプリを開くたびにCapgoサーバーに新しいアップデートが利用可能かどうかを確認します。もちろん、ユーザー体験を微調整できる素晴らしい設定が多数用意されています

私は構築するすべてのプロジェクトでCapgoを使用しています。それによってApp Storeのレビュープロセスにかける時間を減らすことができます

詳細は[こちら](https://capgoapp/)でご覧いただけます

## 制限事項はありますか？

良いことばかりに聞こえるかもしれませんが、いくつか注意すべき点があります
まず、OTAアップデートは__Webバンドルでのみ機能する__ということです
Capacitor JSではほとんどすべてのコードをJS、CSS、HTMLで書くため、大きな制限ではないと思うかもしれません
確かにその通りですが、アプリにインストールするネイティブモジュールも存在します
モジュールがandroidやiOSのディレクトリを変更する場合、OTAでアプリをアップデートすることはできません
これらのディレクトリの内容はネイティブバイナリのコンパイルに使用され、OTAではアップデートできないためです
ネイティブアプリでもこの部分はアップデートできません

ただし、CI/CDでこの部分を処理するように設定できます。その方法については[こちらのiOS向けチュートリアル](https://capgoapp/blog/automatic-capacitor-android-build-github-action/)で説明しています

## 自動Capgo設定

サインアップして最初のバージョンをアップロードするためのAPIキーを取得しましょう！まずは[Capgoアカウントに登録](/register/)してください

Capgoにログインすると、オンボーディングページが表示されます

![オンボーディングページ](/onboarding_1_newwebp)

オンボーディングページの手順に従って最初のアプリを追加してください

### CLIのガイダンスに従う

コマンドラインで、Capacitorアプリのルートディレクトリから以下を実行します：

`npx @capgo/cli@latest init`
CapgoをCapacitorアプリにインストールするために、CLIがCapgoでアプリを設定するプロセスをガイドします

手動で行いたい場合は、以下の手順に従ってください

## 手動Capgo設定

### プラグインのインストール

アプリに以下のコードが追加されるはずです：

`npm i @capgo/capacitor-updater && npx cap sync`
プラグインをCapacitorアプリにインストールします

そして、JSバンドルが正常であることをネイティブプラグインに通知するために、アプリに以下のコードを追加します（これを行わないと、ネイティブプラグインは前のバージョンにロールバックします）：

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

これによりネイティブプラグインにインストールが成功したことを通知します

その後、`npm run build && npx cap copy`を実行してアプリを更新します

### Capgo CLOUDにログイン

まず、アカウントにある`all` [apikey](https://webcapgoapp/dashboard/apikeys/)を使用してCLIでログインします：

`npx @capgo/cli@latest login YOU_KEY`

### 最初のアプリを追加

CLIでCapgo Cloudに最初のアプリを作成しましょう

`npx @capgo/cli@latest app add`

このコマンドはCapacitor設定ファイルで定義されたすべての変数を使用してアプリを作成します

### 最初のバージョンをアップロード

コードをビルドしてCapgoに送信するコマンドを実行します：
`npx @capgo/cli@latest bundle upload`

デフォルトでは、バージョン名は`packagejson`ファイルのものが使用されます

[Capgo](https://webcapgoapp/)でビルドが存在することを確認してください

[モバイルサンドボックスアプリ](https://capgoapp/app_mobile/)でテストすることもできます

### チャンネルをデフォルトに設定

アプリをCapgoに送信した後、アプリがCapgoからアップデートを受信できるようにチャンネル`default`を設定する必要があります

`npx @capgo/cli@latest channel set production -s default`

## デバイスでライブアップデートを受信

アプリケーションがDeployからライブアップデートを受信するには、デバイスまたはエミュレーターでアプリを実行する必要がありますエミュレーターまたはコンピューターに接続されたデバイスでローカルアプリを起動するには、以下のコマンドを使用するのが最も簡単な方法です

    npx cap run [ios | android]

アプリを開き、バックグラウンドに移動してから再度開くと、ログでアプリが更新されたことが確認できます

おめでとうございます！🎉 最初のLive Updateの導入に成功しました。これはLive Updatesでできることの始まりに過ぎません。詳しくは、[Live Updates のドキュメント](/docs/plugin/cloud-mode/getting-started/)をご覧ください

> ローカルでの更新の受信を停止する必要がある場合は、以下のコマンドを実行してください
`npx @capgo/cli@latest channel set`