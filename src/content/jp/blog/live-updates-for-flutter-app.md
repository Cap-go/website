---
slug: live-updates-for-flutter-app
title: Flutterからのライブアップデート
description: Flutterアプリに直接更新を送信することは、アプリストアでのレビューを要求せずに可能ですか？
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-16T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /bypass_illustration.webp
head_image_alt: キャパシタ回避のイラスト
tag: Tutorial
published: true
locale: jp
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Capgo Live Updateは、開発者が従来のApp Storeの提出プロセスを経ることなく、モバイルアプリにアップデートを展開できるサービスです。これは、App Storeのレビュープロセスを待つことなく、バグを迅速に修正したり、小さな更新をアプリに加えたりする便利な方法です。しかし、Capgo Live UpdateはFlutterアプリの更新をサポートしていません。なぜならFlutterアプリはネイティブコードにコンパイルされるからです。

FlutterはDartプログラミング言語を使用したモバイルアプリ開発フレームワークです。Flutterの主要な機能の一つは、開発者が単一のコードベースを使用してiOSとAndroidの両方で実行できるアプリを作成できることです。これを実現するために、Flutterはアプリのコードを各プラットフォーム用のネイティブコードにコンパイルします。つまり、アプリは基本的にネイティブアプリであり、ウェブベースのアプリやハイブリッドアプリではありません。

Flutterアプリがネイティブコードにコンパイルされているため、Capgo Live Updateを使用してFlutterアプリのアップデートを展開することはできません。その代わりに、開発者はネイティブアプリと同様にアプリストアにアップデートを提出する必要があります。

さらに、ネイティブコードに対する更新は、一般的にアプリストアのルールに反しています。Apple App StoreとGoogle Play Storeの両方には、レビューのために提出された後にアプリのネイティブコードに変更を加えることを禁止するポリシーがあります。これは、ネイティブコードに変更を加えることで、潜在的にセキュリティの脆弱性やアプリのパフォーマンスを損なう他の問題を引き起こす可能性があるためです。

要約すると、Capgo Live Updateは特定の種類のモバイルアプリに迅速にアップデートを展開するための便利なツールですが、Flutterアプリの更新には使用できません。

これはFlutterのコンパイルプロセスの性質とアプリストアのルールによるものです。