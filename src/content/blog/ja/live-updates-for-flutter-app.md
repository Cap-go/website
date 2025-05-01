---
slug: live-updates-for-flutter-app
title: Flutter ライブアップデート
description: App Store のレビューなしで Flutter アプリにリアルタイムアップデートを送信することは可能ですか？
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-16T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /bypass_illustration.webp
head_image_alt: Capacitorのバイパスの図解
keywords: >-
  Flutter, mobile app development, live updates, OTA updates, continuous
  integration, mobile app updates
tag: Tutorial
published: true
locale: ja
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Capgo Live UpdateはデベロッパーがApp Storeの審査プロセスを経ることなく、モバイルアプリのアップデートをデプロイできるサービスです。これは、App Storeの審査プロセスを待つことなく、バグの修正や小規模なアップデートを素早く行うための便利な方法です。しかし、Capgo Live UpdateはFlutterアプリのアップデートをサポートしていません。これは、Flutterアプリがネイティブコードにコンパイルされるためです。

Flutterはモバイルアプリ開発フレームワークで、Dartプログラミング言語を使用します。Flutterの主要な特徴の1つは、単一のコードベースでiOSとAndroid両方で動作するアプリを作成できることです。これを実現するために、Flutterはアプリのコードを各プラットフォーム向けのネイティブコードにコンパイルします。つまり、アプリはWebベースやハイブリッドアプリではなく、本質的にネイティブアプリとなります。

Flutterアプリはネイティブコードにコンパイルされるため、Capgo Live Updateを使用してFlutterアプリのアップデートをデプロイすることはできません。代わりに、開発者は他のネイティブアプリと同様に、アプリストアにアップデートを提出する必要があります。

さらに、ネイティブコードの変更は一般的にアプリストアのルールに違反します。Apple App StoreとGoogle Play Store両方とも、審査後にアプリのネイティブコードを変更することを禁止するポリシーを設けています。これは、ネイティブコードの変更がセキュリティの脆弱性やアプリのパフォーマンスを損なう可能性のある問題を引き起こす可能性があるためです。

まとめると、Capgo Live Updateは特定のタイプのモバイルアプリのアップデートを素早くデプロイするための有用なツールですが、Flutterアプリのアップデートには使用できません。

これは、Flutterのコンパイルプロセスの性質とアプリストアのルールによるものです。