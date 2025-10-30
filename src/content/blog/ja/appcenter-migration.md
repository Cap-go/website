---
slug: migrazione-appcenter
title: App Center から Capgo への移行
description: このガイドでは、Microsoft CodePushの代替となるCapgo Live Updatesへの完全な移行を行います。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-03-22T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /migrate_appcenter.webp
head_image_alt: Capacitor JSデベロッパーの代替案を探す
keywords: >-
  App Center, migration, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Migration
published: true
locale: ja
next_blog: automatic-build-and-release-with-github-actions
---
## 移行の概要

* [Capgo](/register/) は、開発チームがデプロイ済みアプリにライブアプリを送信するのを支援するサービスです。
* jQuery Mobile、Framework 7、Sencha、KendoUI、Ionicまたは独自のカスタムソリューションで書かれたCapacitor JSアプリを移行できます。**既存のIonicアプリは必要ありません**。
* [Colt](https://volt.build/) はApp Center Build(Android/iOSアプリのビルド)に相当するサービスを提供しています。テスト、診断、分析サービス用です。

##### 注意

アプリがまだCordovaを使用している場合は、Capgoに移行する前に[まずCapacitorへの移行](https://capacitorjs.com/docs/cordova/migrating-from-cordova-to-capacitor/)が必要です。

IonicチームによってCordovaの精神的後継者として構築されたCapacitorは、より良いユーザー体験とパフォーマンスを提供することを目標に、ネイティブツールと機能に近い開発を可能にします。

幸いなことに、移行プロセスは簡単で、大半のCordovaプラグインはCapacitorと下位互換性があります。[ここから移行を開始](https://capacitorjs.com/docs/cordova/migrating-from-cordova-to-capacitor/)してください。

## Capgoについて

Capgoは、時間の経過とともにアプリを更新することを処理します。開発チームはアプリの独自機能に完全に集中でき、複雑なアプリ配信プロセスをCapgoにアウトソースできます。

Capgoは、Web配信とモバイルの間のギャップを埋めます。

## Capgoの前提条件

App Centerと同様に、[Capgo](/register/)はAzure DevOps、Bitbucket、GitHub、GitLabのGitリポジトリでホストされているアプリをサポートしています。

### Capgo CLIのインストール

##### 注意

続行する前に、NodeとNPMがコンピュータにインストールされている必要があります。常に[現在のLTSバージョン](https://nodejs.org/)を使用してください。Capgoは古いバージョンをサポートしていません。

### `package.json`とCapacitor設定ファイルの作成

##### 注意

始める前に、新しいGitブランチで変更を行うことをお勧めします。

[Capgo](/register/)はCapacitorアプリを自動化するために作られたため、アプリに存在しない可能性のあるファイルが必要です。まず、`capacitor.config.json`ファイルを作成します。作成する最も簡単な方法は、アプリのルートで以下を実行することです：

```shell
npm install @capacitor/core
```

その後、CLIのアンケートを使用してCapacitorを初期化します：

```shell
npx cap init
```

CLIはアプリ名から始まり、アプリに使用したいパッケージIDなど、いくつかの質問をします。

最後に、新しいファイルをプロジェクトにコミットします：

    git add .git commit -m "added package json and capacitor config" && git push

### コードの移行

[Capgo](/register/)に必要な新しいファイルが配置されたので、アプリ自体に注目できます。[Capgo](/register/)は、ビルドされたアプリ全体が`dist`という名前のディレクトリ内にあることを期待します。

ビルドされたコードが`dist`ディレクトリにない場合は、Capacitor設定ファイルでこの値を変更してください。

アプリのディレクトリ構造は以下のようになるはずです：

![アプリ構造](/directory_looklike.webp)

## Capgoの設定

アプリが[Capgo](https://console.capgo.app/)統合の準備ができたら、サインアップしてAPIキーを取得し、最初のバージョンをアップロードする時です！まず、[Capgoアカウントにサインアップ](/register/)してください。

Capgoにログインしたら、アカウントページに移動してAPIキーをクリックし、'write'キーをクリックしてクリップボードにコピーしてください。

### Capgo SDKのインストール

コマンドラインから、Capacitorアプリフォルダのルートで直接以下のコマンドを実行します：

`npm i @capgo/capacitor-updater && npx cap sync`
プラグインをCapacitorアプリにインストールします。

そして、CodePushの代わりに以下のコードをアプリに追加します：

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

これにより、ネイティブプラグインにインストールが成功したことを伝えます。

## ライブアップデートのデプロイ（CodePushの代替）

ライブアップデート機能は、ネイティブアプリケーションにインストールされた[Capgo SDK](https://github.com/Cap-go/capacitor-updater/)を使用して、特定のデプロイチャンネルデスティネーションをリッスンすることで動作します。Webビルドがチャンネルデスティネーションに割り当てられると、指定されたチャンネルデスティネーションをリッスンするように設定されたバイナリを実行しているユーザーデバイスにそのアップデートがデプロイされます。

### Capgo CLOUDへのログイン

まず、アカウントに存在する`all` [apikey](https://console.capgo.app/dashboard/apikeys/)を使用してCLIでログインします：

```shell
npx @capgo/cli@latest login YOURKEY
```

## 最初のアプリを追加

CLIでCapgo Cloudにアプリを作成することから始めましょう。

`npx @capgo/cli@latest app add`

このコマンドは、Capacitor設定ファイルで定義されたすべての変数を使用してアプリを作成します。

## 最初のバンドルをアップロード

以下のコマンドを実行してコードをビルドし、Capgoに送信します：
```shell
npx @capgo/cli@latest bundle upload --channel production
```

デフォルトでは、バージョン名は`package.json`ファイルのものが使用されます。

[Capgo](https://console.capgo.app/)でビルドが存在するか確認してください。

[モバイルサンドボックスアプリ](https://capgo.app/app_mobile/)でテストすることもできます。

### チャンネルをデフォルトにする

アプリをCapgoに送信した後、アプリがCapgoからアップデートを受信できるようにチャンネルを`default`にする必要があります。

```shell
npx @capgo/cli@latest channel set production -s default
```

## アップデートを検証するようアプリを設定

メインのJavaScriptファイルに以下の設定を追加します。

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

その後、`npm run build && npx cap copy`を実行してアプリを更新します。

### デバイスでライブアップデートを受信

デプロイからライブアップデートを受信するには、デバイスまたはエミュレータでアプリを実行する必要があります。これを行う最も簡単な方法は、以下のコマンドを使用してローカルアプリをエミュレータまたはコンピュータに接続されたデバイスで起動することです。

    npx cap run [ios | android]

アプリを開き、バックグラウンドに移動してから再度開くと、ログでアプリがアップデートを行ったことが確認できるはずです。

おめでとうございます！🎉 最初のライブアップデートの展開に成功しました。これはライブアップデートでできることの始まりに過ぎません。詳細については、完全な[ライブアップデートドキュメント](/docs/plugin/cloud-mode/getting-started/)をご覧ください。

## App Center依存関係の削除

Capgoのサービスを統合したので、App Centerへの参照をすべて削除する必要があります。未使用のコード/サービスを削除することはベストプラクティスであり、SDKを削除することでアプリのサイズを削減できます。

まず、ターミナルを開いてApp Centerプラグインをアンインストールします：
```shell
    cordova plugin remove cordova-plugin-appcenter-analytics cordova-plugin-appcenter-crashes cordova-plugin-code-push
```

次に、`config.xml`を開いて以下の`preference`値を削除します。以下のような形式です：
```xml
    <preference name="APP_SECRET" value="0000-0000-0000-0000-000000000000" /><preference name="CodePushDeploymentKey" value="YOUR-ANDROID-DEPLOYMENT-KEY" /><preference name="CodePushPublicKey" value="YOUR-PUBLIC-KEY" />
```

アプリでApp Center Analyticsを使用していた場合は、以下の`preferences`要素を削除します：`APPCENTER_ANALYTICS_ENABLE_IN_JS`と`APPCENTER_CRASHES_ALWAYS_SEND`。

以下の`<preference name="APP_SECRET" value="0000-0000-0000-0000-000000000000" />`要素を削除します：

```xml
    <access origin="https://codepush.appcenter.ms" /><access origin="https://codepush.blob.core.windows.net" /><access origin="https://codepushupdates.azureedge.net" />
```

`index.html`ファイルのCSP `meta`タグからCodePushへの参照を削除します（`https://codepush.appcenter.ms`）：
```xml
    <meta http-equiv="Content-Security-Policy" content="default-src https://codepush.appcenter.ms 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *" />
```

最後に、アプリ内でApp Centerサービスへのコード参照（例：`codePush.sync();`）を削除します。

## 次のステップ

App CenterからCapgoに移行し、ライブアップデートを利用しました。これはCapgoで使用できる機能の始まりに過ぎません。チャンネル（複数環境）とオーバーライドを含むサービスの残りの部分を探索してください。Cloud CLI統合により、選択したCI/CDプラットフォーム（GitHub Action、GitLab、Jenkinsなど）内でCapgoを使用できます。

## アプリ更新の自動送信

コードがGitHubでホストされている場合、GitHub actionsのおかげで数ステップで自動ビルドとリリースを設定できます。

これを可能にする2番目の記事を作成しました。

## クレジット

[Ionic](https://ionic.com/)に大変感謝します。この記事は[この記事](https://ionic.io/blog/moving-from-microsoft-app-center-to-ionic-appflow/)をベースにchat-gpt-3で書き直し、適応させたものです。
