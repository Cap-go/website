---
slug: how-to-bypass-app-store-review
title: App Storeでのリビジョンを必要とせずにCapacitor JSアプリケーションを更新する方法。
description: Capgo機能が、Appleのポリシーに完全に準拠して、Ionic-iOSアプリにコード更新を直接送信するのにどのように役立つか？
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2022-01-13T00:00:00.000Z
head_image: /bypass_illustration.webp
head_image_alt: コンデンサー回避表現
tag: Tutorial
published: true
locale: jp
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

_尋ねてくれて嬉しいです_

弁護士から法律相談ではないことをお知らせするように言われましたが、Appleの公式ガイドラインの文言を理解するために法学位は必要ありません。Appleのガイドラインは、以下の三つの条件の下で、アプリに直接実行可能なコードをプッシュすることを明示的に許可しています：

* コードはAppleの組み込みWebKitフレームワークによって実行されること
* コードは追加の機能や機能を提供、解除、または有効にしないこと
* ユーザーが更新が行われていることを見ないこと

Capgoのキャパシタープラグインでは、HTML、CSS、JavaScriptを更新・修正することができるので、最初の条件は満たしています。

余談ですが、アプリがApp Storeを介さずに自動更新できる能力はしばらく前から存在します。
これは、FacebookのReact NativeやExpoなどのJavaScriptフレームワークを使用して作成されたアプリのみに適用されます。

React NativeがCapacitorよりもネイティブではないという証拠です😆

Capgoは、ネイティブCapacitorアプリにコードレベルの更新をプッシュするための最初の手頃なソリューションです。
第二の条件、新しい機能や機能は、本当にあなた次第です。

Capgoは新しい機能や機能をプッシュすることを意図していません。それは、それらを調整または修正することを目的としており、バグ修正、ロギングやトラッキングの追加、メッセージの更新、ユーザーにアップグレードを強制するために必要なマイナーリリースを回避します。

新しい機能や機能を追加するには、App Storeを通じてリリースする必要があります。お知らせですが、Ionic AppFlow（大企業向けの代替案）は5000万以上のiOSデバイスにインストールされており、それを使用しているためにアプリが拒否されたことはありません。

他の何千人もの開発者がライブアップデートを使用していることを知るのは良いことですので、あなたは一人ではありません。

AppleとGoogleには、アプリを更新するための独自のルールがあります。

Appleの場合、[332段落を確認してください](https://developerapplecom/programs/information/Apple_Developer_Program_Information_8_12_15pdf/)
\[…\] 前述の唯一の例外は、Appleの組み込みWebKitフレームワークまたはJavaScriptCoreによってダウンロードされて実行されるスクリプトとコードです \[…\] __TLDR__: 重要な変更をせずに、バグを修正したり改善したりするためにのみOTA更新を使用すべきです。

__Google__ Playはそれほど制限が厳しくありません – 彼らは、JavaScriptバンドルを使ったGoogle Playからインストールされたアプリは、Googleサービスによってのみ更新が制限されないと言っています [が制限されていない](https://supportgooglecom/googleplay/android-developer/answer/9888379/?hl=en) としています。

レビューを回避するためにCapgoをインストールする方法についての詳細は、次の記事をチェックしてください。