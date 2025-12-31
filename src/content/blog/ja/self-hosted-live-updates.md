---
slug: self-hosted-live-updates
title: ライブ自己ホスト型アップデート
description: CapgoのLive Updatesの次のイテレーションとなるセルフホストLive Updatesの発表をお知らせできることを嬉しく思います！
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-03T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /self_hosted.webp
head_image_alt: 自己ホスト型のアップデート
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Solution
published: true
locale: ja
next_blog: ''
---
Capgoのライブアップデートの最新の進化である、セルフホステッドライブアップデートのリリースを発表できることを嬉しく思います。

多くの企業が現在、アプリケーションの最新のJavaScript、HTML、およびCSSアップデートにアクセスするためにライブアップデートSDKを利用していますが、企業ポリシー、業界規制、または地理的制限により障害に遭遇する場合があります。セルフホステッドライブアップデートを使用することで、独自のインフラストラクチャを通じてWebビルドアーティファクトを配布できるようになりました。

これにより、App Storeのレビューによる遅延を回避し、バグに対処してコンテンツをより迅速に変更し、ユーザーが常にアプリの最新バージョンを使用していることを確認できます。さらに、厳格なコンプライアンス基準により、ライブアップデートの活用に課題を抱える多くの大企業からの声を聞いてきました。セルフホステッドライブアップデートにより、この問題は過去のものとなりました。

## セルフホステッドライブアップデートの仕組みは？

[Capgo SDK](https://github.com/Cap-go/capacitor-updater/)を使用してCapgoホステッドライブアップデートをデプロイするのは簡単です。セルフホステッドライブアップデートについては、独自のインフラストラクチャで設定を可能にするために必要な機能をCapgo CLIに追加しました。

最新のWebビルドアーティファクトをエンドユーザーに安全かつ調整された方法で配信するために、CapgoはCapacitorライブアップデートプラグインが公開/秘密鍵のペアリングを使用することを可能にしました。セルフホステッドライブアップデートを使用する場合、プラグインを通じて企業のインフラストラクチャからダウンロードされたアーティファクトが変更されていないことを確認するために、追加のハンドシェイクが実行されます。

![Capgo暗号化スキーマ](/encryption_flow.webp)

以下は、鍵のペアリングを確立し、エンドユーザーに更新されたエクスペリエンスを提供するための後続のプロセスの手順です。

### 一回限りの鍵ペアのセットアップ

公開/秘密鍵のペアを生成するために、企業は以下のCapgo Cloud CLIコマンドを使用できます：

```shell
npx @capgo/cli@latest key create
```

このコマンドは、設定ファイルに`CapacitorUpdater.privateKey`プロパティを設定します。
そして、プロジェクトのルートディレクトリに`capgo_key.pub`と`capgo_key`の2つのキーファイルを生成します。

この鍵ペアは、アップデートの署名とアプリ側でのアップデートの検証に使用されます。

### セルフホステッドライブアップデートのワークフロー

セルフホステッドライブアップデートの実装を開始するには、企業はまずバグ修正、コンテンツの更新、またはその他のWebベースのコード変更のWebビルドを実行する必要があります。次に、一回限りのセットアップ過程で取得した秘密鍵を使用してビルドアーティファクトに署名し、最後にバンドルを任意のストレージの場所にアップロードする必要があります。

まずコードをビルドします：
```shell
npm run build
```

次にビルドをZip化します：
```shell
npx @capgo/cli@latest bundle zip
```

そしてzipを暗号化します：

```shell
npx @capgo/cli@latest bundle encrypt abc123.zip”
```

このコマンドはivSessionKeyを出力します。次のステップのために保存しておく必要があります。

次に、暗号化されたzipを企業のストレージにアップロードし、zipファイルのURLを取得します。

新しいライブアップデートが利用可能であることをCapgoに通知する必要があります。これは別のCLIコマンドで行います：

```shell
npx @capgo/cli@latest bundle upload --external=https://abc.com/app/updates/abc123.zip --iv-session-key=YourKey
```

コマンドが実行されると、Capgoはアプリのユーザーに配布する準備ができた新しいアップデートを認識します。アプリが起動されると、ライブアップデートプラグインはCapgoに変更をダウンロードする必要があるかどうかを確認します。

Capgoはプラグインに「はい、アップデートが利用可能です」と応答し、ライブアップデートプラグインは`register`CLIコマンドで提供されたURL位置を使用して新しいライブアップデートをダウンロードします：

```shell
https://abc.com/app/updates/abc123.zip
```

組織のAPIは指定された場所からライブアップデートバンドルを返し、アプリはzipを復号化してライブアップデートを適用します。完了です！

## はじめましょう

これまで以上に多くの企業にライブアップデートの利用範囲を拡大できることを嬉しく思います。組織とIonicアプリのユーザーの両方が、Capgoの安全なOver-the-airアプリアップデートの配信の利点をすぐに認識するでしょう。

Capgoのセルフホステッドライブアップデートの詳細については、[ドキュメントをご確認ください](/docs/cli/commands/#upload-version)。即座にアプリのアップデートをユーザーに直接デプロイする準備はできていますか？[今すぐ登録してください！](/register/)
