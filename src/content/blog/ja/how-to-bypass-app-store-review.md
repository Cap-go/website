---
slug: come-aggirare-controllo-app-store
title: App Store のレビュープロセスなしで Capacitor JS アプリをアップデートする方法
description: >-
  Capgoの機能を使用して、iOSのIonicアプリにリアルタイムでコードアップデートを配信し、かつAppleのガイドラインに完全に準拠するにはどうすればよいですか？
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2022-01-13T00:00:00.000Z
head_image: /bypass_illustration.webp
head_image_alt: Capacitorのバイパスの説明
keywords: >-
  Apple, App Store, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: ja
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
_お聞きいただき、ありがとうございます。_

弁護士からの要請で申し上げますが、これは法的なアドバイスではありませんが、Appleの公式ガイドラインの文言を理解するのに法学の学位は必要ありません。Appleのガイドラインでは、以下の3つの条件下で、App Storeを介さずに実行可能なコードを直接アプリにプッシュすることが明示的に許可されています：

* コードはAppleの組み込みWebKitフレームワークによって実行される
* コードは追加の機能や機能性を提供、アンロック、または有効化しない
* ユーザーはアップデートが行われていることを認識しない

Capgo capacitorプラグインでは、HTML、CSS、JavaScriptの更新と修正のみが可能なので、最初の条件は満たしています。

補足として、App Storeを介さずにアプリを自己更新する機能は、かなり前から存在していました。
FacebookのReact NativeやExpoなどのJavaScriptフレームワークを使用して作成されたアプリに限られます。

React NativeがCapacitorよりもネイティブではないという証拠ですね😆

Capgoは、ネイティブCapacitorアプリにコードレベルの更新をプッシュする機能を提供する、初めての手頃な解決策です。
2番目の条件、新機能や機能性の追加なしという点については、実際のところ開発者次第です。

Capgoは新機能や機能性をプッシュすることを意図していません。バグ修正、ログやトラッキングの追加、メッセージの更新、ユーザーの強制アップグレードなど、マイナーリリースを避けるための調整や修正を目的としています。

新機能や機能性については、App Storeを通じてリリースする必要があります。参考までに、大企業向けの代替手段であるIonic AppFlowは5,000万以上のiOSデバイスにインストールされており、それを使用しているという理由でアプリが拒否されたことは一度もありません。

これを申し上げるのは、他の何千人もの開発者がライブアップデートを使用していることを知っておくことが重要だからです。

AppleとGoogleには、それぞれアプリを更新する際の独自のルールがあります。

Appleについては、[パラグラフ3.3.2を参照してください](https://developer.apple.com/programs/information/Apple_Developer_Program_Information_8_12_15.pdf/) 。
\[…\] 上記の例外は、Appleの組み込みWebKitフレームワークまたはJavaScriptCoreによってダウンロードおよび実行されるスクリプトとコードのみです \[…\] __結論__：OTAアップデートは、重要な変更を加えることなく、バグ修正や改善のためにのみ使用すべきです。

__Google__ Playはより制限が緩やかで、Google Playからインストールされ、JavaScriptバンドルを含むアプリは、[Googleサービスに限定されない](https://support.google.com/googleplay/android-developer/answer/9888379/?hl=en)更新が可能だとしています。

審査をバイパスするためのCapgoのインストール方法については、次の記事をご確認ください。
