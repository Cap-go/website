---
slug: update-your-capacitor-apps-seamlessly-using-capacitor-updater
title: Capacitor-updaterを使って、あなたのCapacitorアプリケーションを手間なく更新しましょう。
description: >-
  こんにちはIonic
  Capacitorコミュニティの皆さん、今日はアプリにCapacitor-updaterをセットアップする手助けをします。これにより、問題なくリリースを実行できます。
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-02-27T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /update_flow.webp
head_image_alt: コンデンサーの開発者は代替案を探しています。
tag: Tutorial
published: true
locale: ja
next_blog: ''
---

## Capacitor-updaterとは？

Capacitor-updaterは、アプリの更新や改善をエンドユーザーに即座に提供するための技術です。

これは、重要なバグ修正を行い、App Storeのレビューを経ずに即座に提供したい場合に特に便利です。

これは、利用可能になり次第、更新をサイドロードする「ウェブ的な」機敏さを持っていると考えることができます。

さらに、アプリがクラッシュした場合、新しい更新をロールバックする機能も提供しています。

## どのように機能しますか？

Capgoは、アプリのJavaScriptバンドルをCapgoサーバーと同期させ、ユーザーがアプリを開くたびに、新しい更新がバンドルに利用可能かどうかをCapgoサーバーに確認します。そしてもちろん、ユーザーエクスペリエンスを微調整するのに役立つ素晴らしい設定がたくさんあります。

私は、すべてのプロジェクトでCapgoを使用しています。これにより、App Storeのレビュープロセスにかける時間が減ります。

詳しくは[こちら](https://capgoapp/)でお読みください。

## 制限はありますか？

良さそうに聞こえますが、いくつかの注意点があります。
最初の注意点は、OTAアップデートは__ウェブバンドルでのみ動作する__ということです。
これが大きな制約ではないと考えるかもしれませんが、Capacitor JSではほとんどすべてのコードをJS、CSS、HTMLで記述します。
これが真実であったとしても、アプリにインストールするネイティブモジュールはまだ存在します。
モジュールがあなたのAndroidまたはiOSのディレクトリを変更した場合、OTAを使ってアプリを更新することはできません。
なぜなら、これらのディレクトリの内容はネイティブバイナリをコンパイルするために使用されるため、OTAでは更新できないからです。
ネイティブアプリでもこの部分を更新することはできません。

しかし、CI/CDを設定してこの部分を処理することができます。私は[こちらでiOS用のチュートリアル](https://capgoapp/blog/automatic-capacitor-ios-build-github-action/)を作成し、[こちらでAndroid用も](https://capgoapp/blog/automatic-capacitor-android-build-github-action/)作成しました。

## Auto Capgo Configuration

サインアップして、最初のバージョンをアップロードするためのAPIキーを取得する時です！[Capgoアカウントにサインアップする](https://capgoapp/register/)ことから始めましょう。

Capgoにログインすると、オンボーディングページが表示されます。

![オンボーディングページ](/onboarding_1_newwebp)

オンボーディングページの手順に従って最初のアプリを追加してください。

### CLIガイダンスに従う

コマンドラインから、Capacitorアプリのルートに直接移動して、以下を実行します。

`npx @capgo/cli@latest init`
これにより、CapgoをCapacitorアプリにインストールします。CLIがCapgoでアプリを設定するプロセスを案内します。

手動で行いたい場合は、以下の手順に従うことができます。

## Manual Capgo Configuration

### プラグインをインストールする

アプリに以下のコードを追加して終了する必要があります。

`npm i @capgo/capacitor-updater && npx cap sync`
これにより、Capacitorアプリにプラグインがインストールされます。

その後、アプリに以下のコードを追加して、JSバンドルが正常であることをネイティブプラグインに通知します（これを行わないと、ネイティブプラグインは前のバージョンにロールバックします）：

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

これにより、ネイティブプラグインにインストールが成功したことが通知されます。

その後、`npm run build && npx cap copy`を実行して、アプリを更新します。

### Capgo CLOUDにログイン

まず、アカウントにある`all` [apikey](https://webcapgoapp/dashboard/apikeys/)を使用して、CLIでログインします。

`npx @capgo/cli@latest login YOU_KEY`

### 最初のアプリを追加する

CLIを使用して、まずCapgo Cloudでアプリを作成しましょう。

`npx @capgo/cli@latest app add`

このコマンドは、Capacitor構成ファイルで定義されているすべての変数を使用してアプリを作成します。

### 最初のバージョンをアップロードする

コードをビルドし、Capgoに送信するためのコマンドを実行します：
`npx @capgo/cli@latest bundle upload`

デフォルトでは、バージョン名は`packagejson`ファイルにあるものになります。

[Capgo](https://webcapgoapp/)でビルドが存在するか確認してください。

私の[モバイルサンドボックスアプリ](https://capgoapp/app_mobile/)でテストすることもできます。

### チャンネルをデフォルトにする

アプリをCapgoに送信した後、アプリがCapgoからの更新を受信するためにチャンネルを`default`にする必要があります。`npx @capgo/cli@latest channel set production -s default`

## デバイスでライブアップデートを受け取る

アプリケーションがDeployからライブアップデートを受け取るためには、デバイスまたはエミュレーターでアプリを実行する必要があります。これを行う最も簡単な方法は、次のコマンドを使用して、エミュレーターまたはコンピュータに接続されたデバイスでローカルアプリを起動することです。

    npx cap run [ios | android]

アプリを開き、バックグラウンドに移動させ、再び開くと、ログにアプリがアップデートを行ったことが表示されるはずです。

おめでとうございます！ 🎉 あなたは初めてのライブアップデートを成功裏にデプロイしました。これは、ライブアップデートでできることのほんの始まりに過ぎません。詳しくは、完全な[ライブアップデートのドキュメント](/docs/plugin/cloud-mode/getting-started/)をご覧ください。

> ローカルでアップデートを受信しない必要がある場合は、このコマンドを実行してください。
`npx @capgo/cli@latest channel set`