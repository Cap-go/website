---
slug: ja__how-your-usage-is-counted
title: Capgoでの使用方法の計算方法
description: Capgoがどのように使用量を計算し、それを最適に利用するかを理解します。プランをより良く管理する方法を学びましょう。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-11-25T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /usage_explained.webp
head_image_alt: Capgoの使用システムが説明されています。
tag: Solution
published: true
locale: ja
next_blog: ''
---

Capgoでは、3つの値が重要であり、理解することが必要です。
- ユーザー
- ストレージ
- 帯域幅

それぞれのカウント方法にはわずかな違いがあります。

## ユーザー

ユーザーがあなたのCapacitor JSアプリをダウンロードし、開くたびに、更新が利用可能かどうかを知るためにCapgoのバックエンドにリクエストを送信します。
アプリがそれを行うと、小さな情報が送信されます。最も重要なのは`DeviceID`です。

`DeviceID`：これはデバイスのOSによって定義された一意のID（UUID）で、このIDはアプリのインストールごとにユニークです。

あなたのアカウントが新しいDevice IDを受信するたびに、それはデータベースに保存されます。
古い`DeviceID`が更新をリクエストするたび（アプリを開く）、そのレコードが更新されます（データベース内のupdated_at）。

このデータは2箇所に保存されます：
- デバイステーブルの`update_at`値
- app_statsには、今日アクティブになったデバイスの数を表す日次カウンターがあります。このカウンターは今月アクティブでなかったデバイスを示しています。

プランの制限については、最初の方法が使用されます。これは100%信頼できるためです。チャートを表示するためには2番目の方法が使用されます。
両方をあなたのアカウントのホームページで見ることができます：
- チャートには2番目の方法が含まれています。
- アプリのテーブルには最初の方法があります。

> Capgoはエミュレーターと開発ビルドを使用量にカウントしません。トライアル終了後にはそれらを3%以下に留めておく必要があります。そうしないとアカウントがロックされますので注意してください。

> Capgoはまたあなたのためにフィルタリングを行っています。CI/CDがGoogle PLAYにバージョンを送信するように設定されている場合、Googleは20以上の実際のデバイスであなたのCapacitorアプリを毎回実行します。新しいバンドルの最初の4時間の間、GoogleのデータセンターのIPをブロックして、カウントされることを防ぎます。

毎月、このデータはゼロから始まります。

- デバイスリクエストごとに私のデータベースにデバイスを作成または更新します。
- 今月アクティブでなかったデバイスの数を日次カウンターに追加します。

最初の方法は次のことを返します：900人以上のユーザー
一方、2番目の方法はあなたのアカウントで200人以上のユーザーです。
プランの制限については、100%信頼できる最初の方法を使用し、チャートを表示するためには2番目の方法を使用します。
両方をアカウントのホームページで見ることができます。

## ストレージ

バンドルをアップロードするたびに、この数はアップロードのサイズによって増加します。

このデータはあなたのアップロードサイズにのみ関連しています。アプリのサイズが小さいほど、プランに留まりやすくなります。

制限に達するか近づくと、CLIでバンドルをリストできます：
`npx @capgo/cli@latest bundle list`
何をクリーンアップできるかを見るために、バンドルを削除することでストレージを解放できますが、統計を削除することはありません。

クリーンアップの準備ができたら、多くのバンドルを削除するためにこのコマンドを使用します：
`npx @capgo/cli@latest bundle cleanup`

PS：これは地球に良いだけでなく、あなたの財布にも良いです💪

> アップロードの`--external`オプションを使用すれば、ストレージを使用し、プランにカウントされません。

## 帯域幅

この値の計算は少し複雑ですが、考え方はストレージと同じです。

ユーザーがバンドルをダウンロードするたびに、この数はダウンロードのサイズによって増加します。

このデータはあなたのダウンロードサイズのみに関連しています。Capacitor JSアプリのサイズが小さいほど、プランに留まりやすくなります。

> 注意すべき重要な点は、Capgoはダウンロードされたサイズを確認できないということです。バンドルのサイズのみを確認します。したがって、大きなバンドルがあり、ダウンロードに失敗するユーザーが多い場合は、制限に早く達してしまいます。

プランに留まる最良の方法は小さなバンドルを持つことです。もしそれができない場合は、ユーザーにダウンロードバーを表示し、残りのダウンロード量を知らせてください。

将来的に、Capgoは一度にバンドルをダウンロードできる可能性を高めるために、ダウンロードシステムを改善する予定です。