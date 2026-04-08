---
slug: moving-from-microsoft-app-center-to-capgo
title: Microsoft App Center から Capgo へのライブアプリ更新の移行
description: >-
  MicrosoftはCordova上で動作するアプリのサポートを終了します。Microsoft App
  CenterからCapgoに移行してモバイルライブアプリ更新を行ってください。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-03-21T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /app_center.webp
head_image_alt: Microsoft App Center のイラスト
keywords: >-
  Microsoft, App Center, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Alternatives
published: true
locale: ja
next_blog: ''
---
Microsoftは最近、クラウド製品であるApp Centerにおいて[Apache Cordovaで動作するアプリのサポートを終了する](https://devblogs.microsoft.com/appcenter/announcing-apache-cordova-retirement/)と発表しました。これにより、App Centerを使用している企業やチームは代替手段を探すことになり、私は[Capgo](https://capgo.app/)プラットフォームがCapacitorアプリに対する完全なサポートを求めている方々にとって素晴らしい選択肢であると嬉しく思います。

## Microsoft App CenterからCapgo Cloudへ

CapacitorはIonicを使ってネイティブモバイルアプリを構築する新しい方法であり、ほとんどのCordovaプラグインはCapacitorでサポートされています。CapgoはCodePushに似たライブアップデート機能を提供しますが、プラットフォーム依存はなく、即時のアプリ公開が可能です。Capgoを使用することで、開発チームは複雑なアプリ配信プロセスをアウトソースし、Ionicアプリのユニークな機能に完全に集中できます。さらに、App Centerとは異なり、CapgoはCapacitorのようなハイブリッドアーキテクチャに100%焦点を当てています。

Capacitorのお客様は、私の[migration guide](https://capgo.app/blog/appcenter-migration/)を使用して、Microsoft App CenterからCapgoへの移行をわずか数ステップで簡単に行うことができます。このガイドでは、プロセス全体を説明しています。Capgoには、Capacitorユーザーが活用できる機能の完全なリストが含まれています。

Microsoft App CenterからCapgoへの移行について詳しく知りたい方は、今日[無料のCapgoアカウント](/register/)を作成してください。

## クレジット

[Ionic](https://ionic.com/)に多大な感謝を申し上げます。このア articleは、[このア article](https://ionic.io/blog/moving-from-microsoft-app-center-to-ionic-appflow/)を基にchat-gpt-3で書き直し、適応しました。
