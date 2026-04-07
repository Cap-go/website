---
slug: do-google-allow-live-updates
title: Googleはアプリストアのレビューなしにアプリのライブアップデートを送信することを許可しているのでしょうか？
description: Google のガイドラインを完全に遵守しながら、Android アプリのプロダクション段階でコードをプッシュアップデートするにはどうすればよいでしょうか？
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /playstore.webp
head_image_alt: Capacitor バイパスの説明
keywords: 'Google, live updates, OTA updates, continuous integration, mobile app updates'
tag: Tutorial
published: true
locale: ja
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

アプリのアップデートに関して、GooglePlayはAppleと比較してより制限が緩やかです

GooglePlayを通じてアプリを配布する際のアップデートは複雑な作業となる場合がありますが、コンプライアンスを維持するためにGoogleのガイドラインに従うことが重要です。GooglePlayのガイドラインによると、アプリはGooglePlay独自のアップデートメカニズム以外の方法で自身を変更、置換、またはアップデートしてはいけません。つまり、GooglePlay以外のソースからdex、JAR、soファイルなどの実行可能コードをダウンロードすることは許可されていません。

ただし、この制限は、webviewやブラウザ内のJavaScriptのように、Android APIへの間接的なアクセスを提供する仮想マシンやインタープリタで実行されるコードには適用されません。これは、JavaScript、Python、Luaなどのインタープリタ言語を使用して、GooglePlayのレビュープロセスを経ることなくアプリをアップデートできることを意味します。この処理に役立つツールの1つがCapgo Capacitorプラグインです。このプラグインを使用することで、開発者はHTML、CSS、JavaScriptコードを更新し、レビューなしでアプリにアップデートを送信することができます。

さらに、JavaScript、Python、Luaなどのインタープリタ言語を使用するアプリまたはサードパーティコードで、実行時にロードされるものは、GooglePlayのポリシーに違反する可能性を許してはいけません。このインタープリタコードはアプリにパッケージングされるべきではないことに注意することが重要です。

これらのガイドラインに従い、Capgo Capacitorプラグインなどのツールを使用することで、アプリのアップデートがGooglePlayのポリシーに準拠し、プラットフォーム上でアプリが利用可能な状態を維持できます。常に最新版のGoogleのポリシーを確認し、正しく従っていることを確認することをお勧めします。

Capgoをインストールしてレビューをバイパスする方法の詳細については、次の記事を参照してください。