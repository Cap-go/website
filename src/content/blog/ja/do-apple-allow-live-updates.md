---
slug: ja__do-apple-allow-live-updates
title: AppleはApp Storeのレビューなしでアプリに直接アップデートを送信することを許可していますか？
description: 本番用iOSアプリケーションのコード更新を、Appleのガイドラインに完全に準拠して提供するにはどうすればよいですか？
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2022-01-13T00:00:00.000Z
head_image: /apple_appstore.webp
head_image_alt: キャパシタ回避装置のイラスト
tag: Tutorial
published: true
locale: ja
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Capacitor JS アプリを App Store の審査プロセスを経ずに更新することは、Apple の公式ガイドラインに示された特定の条件下で可能です。ただし、これは法的助言ではないことに注意することが重要です。アプリにコード更新を直接プッシュし、Apple のガイドラインに準拠するためには、以下の条件を満たす必要があります。

- コードは Apple の組み込み WebKit フレームワークによって実行されなければならない
- コードは追加の機能や機能性を提供、解除、または有効にしてはならない
- ユーザーは更新が行われていることを認識してはいけない

Capgo Capacitor プラグインは、HTML、CSS、JavaScript の更新と修正を可能にし、最初の条件を満たします。アプリが App Store の審査プロセスを経ずに自動的に更新できる機能は、Facebook の React Native や Expo などの JavaScript フレームワークを使用して作成されたアプリにとって、しばらくの間利用可能でした。

追加の機能や機能性を提供しないという第二の条件は、開発者によって決定されます。Capgo は新しい機能や機能性を導入するのではなく、小さな調整や修正を行うことを目的としています。重要な変更には、App Store 経由での更新のリリースが必要です。他の多くの開発者が Apple からの拒否や問題なくライブ更新を使用していることも注目に値します。

Google Play は、アプリの更新に関して Apple よりも制限が少ないです。Google Play では、JavaScript バンドルを含むストアからインストールされたアプリが非 Google サービスによって更新されることを許可しています。

審査を回避するための Capgo のインストール方法については、次の記事を参照してください。