---
slug: do-google-allow-live-updates
title: Googleはアプリストアでレビューされることなく、アプリに直接アップデートを送信することを許可していますか？
description: AndroidアプリケーションでGoogleのポリシーを完全に遵守しながら、コードの更新を実装する方法は？
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /playstore.webp
head_image_alt: コンデンサーの導関数の表現
tag: Tutorial
published: true
locale: ja
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Google Playは、アプリの更新に関してAppleよりも制限が少ないです。

Google Play経由で配布されるアプリを更新することは厄介な作業かもしれませんが、遵守するためにはGoogleのガイドラインに従うことが重要です。Google Playのガイドラインによれば、アプリはGoogle Playの独自の更新メカニズム以外の方法を使用して自分自身を修正、置き換え、または更新してはいけません。つまり、Google Play以外のソースからdex、JAR、またはsoファイルなどの実行可能なコードをダウンロードすることは許可されていません。

ただし、この制限は、仮想マシンまたはインタープリタで実行されるコードには適用されません。これは、ウェブビューやブラウザ内のJavaScriptのように、Android APIへの間接的なアクセスを提供します。つまり、JavaScript、Python、Luaなどのインタープリタ型言語を使用して、Google Playのレビュー過程を経ずにアプリを更新することができます。このプロセスを手助けするツールの一つが、Capgo Capacitorプラグインです。このプラグインを使用すると、開発者はHTML、CSS、JavaScriptコードを更新し、レビューなしでアプリにアップデートを送信することができます。

さらに、実行時に読み込まれるJavaScript、Python、Luaなどのインタープリタ型言語を利用するアプリやサードパーティのコードは、Google Playのポリシーに対する潜在的な違反を許可してはいけません。このインタープリタ型コードはアプリにパッケージ化されるべきではないことに留意してください。

これらのガイドラインに従い、Capgo Capacitorプラグインのようなツールを使用することで、アプリの更新がGoogle Playのポリシーに準拠していることを確認でき、アプリがプラットフォーム上のユーザーに対して利用可能であり続けることができます。Googleのポリシーの最新バージョンを再確認することは、常に良い考えであることを忘れないでください。

Capgoをインストールしてレビューを回避する方法についての詳細は、次の記事を参照してください。