---
slug: Capgoの誕生
title: Capgoが誕生した経緯
description: Capgoを構築し、この旅を始めたきっかけ
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-03-01T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo_birth.webp
head_image_alt: Capgo誕生のイラストレーション
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Story
published: true
locale: ja
next_blog: ''
original_slug: how-capgo-is-born
---
こんにちは、Martin Donadieuです。

2019年に共同設立した[Naas](https://naas.ai/)を2021年7月に退社し、個人プロジェクトを立ち上げることにしました。

個人での活動最初の6ヶ月間は、4年前に作成したモバイルアプリCaptime（コロナ禍でサイドビジネスとなっていた）の再構築に注力しました。

2021年12月、アプリをゼロから再構築している途中で、現行のプロダクションバージョンに問題が発生し、

状況が複雑になりました。修正は必要でしたが、新バージョンのリリースは避けたかったため、アプリにコードアップデートを配信する方法を探しました。

当時、Captimeは月400ドルの収益でしたので、手頃な解決策を探していました。Ionic Appflowは予算外でした。

他の選択肢はMicrosoft App Centerだけでしたが、Cordova / Capacitorで動作するアプリのサポートは終了していました。

私のような個人開発者にとって、Ionic AppFlowは最適な価格ではありません。

あなたと同じように、私も不満を持っていました。Ionicに連絡しましたが、彼らは不満を理解しつつも、価格変更には応じませんでした。私はターゲット層ではなかったのです。

そこで、私のCapacitor JS開発ワークフローにおける最大の課題であるライブアップデートの解決に挑戦することにしました。

1ヶ月の試行錯誤の末、URLからZIPをダウンロードしてアプリのソースを置き換える方法を見つけました。

GitHubでこれを共有したところ、大きな関心を集めました。

ほとんどのチームにとって手動での作業は煩雑すぎたため、有料サービスの要望があり、そこでAppFlowの代替としてCapgoの開発を始めました。

目標は、Capacitor JavaScriptアプリにコードアップデートを配信する、シンプルで使いやすいソリューションを提供することでした。

ネイティブビルドやIonicのような大きなツールボックスではなく、彼らが対応していない市場、つまり私たち向けのライブアップデートだけに焦点を当てました。

私の取り組みについて彼らに連絡したところ、ビジネスフレンドシップの合意に至りました。

私はメーカー向けに、彼らはCI/CDと専用サポートを必要とするビジネス向けに構築することになりました :)

コミュニティに参加して一緒に構築することを歓迎します。私も自分のプロジェクトでこれを使用しており、将来的にはこれが私のメインプロジェクトになることを期待しています。
