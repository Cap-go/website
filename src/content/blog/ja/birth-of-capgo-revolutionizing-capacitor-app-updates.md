---
slug: birth-of-capgo-my-challenging-journey-as-a-solo-maker
title: GitHubのIssueがビジネスへと進化した方法
description: >-
  CapacitorアプリのためのイノベーティブなライブアップデートシステムCapgoの開発背景にある試練と成功、そして必要性から生まれ、コミュニティのフィードバックによって形作られた軌跡をご紹介します。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2024-07-13T00:00:00.000Z
updated_at: 2024-07-13T00:00:00.000Z
head_image: /capgo-birth-story.webp
head_image_alt: Capgoのアイデアから製品までの進化を視覚的に表現
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: development
published: true
locale: ja
next_blog: ''
---
## 創世記：コミュニティからのリクエスト

Capgoの種は、私がソロメーカーとしての旅を始める遥か前に蒔かれていました。2020年7月8日、alexcrooxという名のコミュニティメンバーが、後にCapgoの青写真となるプラグインリクエストを提出しました。

![Initial plugin request](/capgo-initial-request.webp)

このリクエストは、「Capacitor Hot Code Push」プラグインの必要性を以下の重要点で概説しました：

1. **プラットフォーム**: AndroidとiOS両方のサポート。
2. **既存のソリューション**: MS Code Push（Capacitorのサポートがない）やApp Flow（高価で柔軟性に欠ける）など、現在のオプションの限界を指摘。
3. **説明**: アプリストアのレビュープロセスを経ることなく、アプリのjs/css/htmlをリアルタイムで更新する機能。
4. **主要機能**: 
   - 開発者が選択したサーバー/エンドポイントからの無線更新を可能にする。
   - 更新されたdistフォルダのzipファイルをダウンロードし、展開して、Capacitorに新しいディレクトリから起動するよう指示する。
   - 更新の検証、インストールのタイミング、選択的な更新のダウンロードなどの追加機能。

この包括的なリクエストは、65のいいねと25のハートリアクションを集め、大きなコミュニティのサポートを得ました。これは、Capacitorエコシステムにおけるこのようなソリューションへの強い需要を明確に示していました。

1年以上後に私がこのリクエストを見つけた時、自分のプロジェクトで直面していた課題と深く共鳴しました。それは、このようなツールの必要性の確認となり、後にCapgoとなるものの道筋を示すものとなりました。

このプラグイン提案に対するコミュニティの熱意は、私個人の経験と相まって、Capgoの開発の原動力となりました。これは、アイデアから実装までの期間が1年以上にわたる場合でも、オープンソースコミュニティがニーズを特定し、ソリューションを生み出すことができる完璧な例です。

## 新しい章の始まり

Capgoの物語に入る前に、舞台設定をすることが重要です。2021年、私はCashstoryのCTOの役職を辞め、株式を売却するという人生を変える決断をしました。これは不確実性に満ちていながらも、無限の可能性を秘めたソロメーカーとしての旅の始まりでした。

![Lisbon digital nomad life](/capgo-lisbon-nomad.webp)

貯金を安全網として、私は新しい冒険に乗り出しました。ポルトガルのリスボンでデジタルノマドとして生活し、街のテックシーンと文化を楽しみながら、情熱的なプロジェクトに焦点を当てていました。私の主な焦点は、モバイルアプリのクロスフィットタイマーであるCaptimeでした。このプロジェクトが、もっと大きな何かを生み出すことになるとは、当時は知る由もありませんでした。

リスボンのスタートアップエコシステムのエネルギーとデジタルノマドライフスタイルの自由は、イノベーションにとって完璧な背景を提供しました。世界中の起業家や開発者に囲まれたこの環境で、Capgoの種が蒔かれたのです。

[以下略...]
