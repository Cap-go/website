---
slug: do-apple-allow-live-updates
title: アプリストアのレビューなしでアプリにライブアップデートを送信することをAppleは許可していますか。
description: App Store のガイドラインに完全に準拠しながら、iOS アプリのコードをプロダクションにアップデートするにはどうすればよいでしょうか？
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2022-01-13T00:00:00.000Z
head_image: /apple_appstore.webp
head_image_alt: Capacitorのバイパスの説明
keywords: 'Apple, live updates, OTA updates, continuous integration, mobile app updates'
tag: Tutorial
published: true
locale: ja
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Appleの公式ガイドラインに記載されている特定の条件下では、App Storeのレビュープロセスを経ることなくCapacitor JSアプリを更新することが可能です。ただし、これは法的なアドバイスではありません。アプリに直接コード更新をプッシュし、Appleのガイドラインに準拠するためには、以下の条件を満たす必要があります：

- コードはAppleの組み込みWebKitフレームワークによって実行される必要があります
- コードは追加の機能や機能性を提供、アンロック、または有効化してはいけません
- ユーザーは更新が行われていることを認識してはいけません

Capgo Capacitorプラグインは、HTML、CSS、JavaScriptの更新と修正を可能にし、最初の条件を満たしています。
FacebookのReact NativeやExpoなどのJavaScriptフレームワークを使用して作成されたアプリでは、App Storeのレビュープロセスを経ることなく自己更新する機能が長らく利用可能でした。

2番目の条件である追加機能や機能性を提供しないことは、開発者によって判断されます。Capgoは新しい機能や機能性を導入するのではなく、小さな調整や修正を行うことを目的としています。大きな変更については、App Storeを通じて更新をリリースする必要があります。多くの他の開発者がAppleからの問題や拒否なしにライブ更新を使用していることは注目に値します。

Google Playはアプリの更新に関してAppleよりも制限が緩やかです。Google Playは、JavaScriptバンドルを含むストアからインストールされたアプリがGoogle以外のサービスによって更新されることを許可しています。

レビューをバイパスするためのCapgoのインストール方法の詳細については、次の記事を参照してください。