---
title: "Cordova"
description: "capacitor-updater プラグインのCordova対応の可能性と開発における課題について解説します。"
sidebar:
  order: 8
locale: ja
---

このプラグインがCordovaで利用可能になるのかと疑問に思っていたかもしれません。

私たちはそのためのR&Dリポジトリを開始しましたが、膨大な作業が必要です。

## 問題点

実現可能であることは分かっていますが、そのためにはCapacitorで行ったように、Cordovaのコードベース全体を読み、Capgoの機能と連携させる方法を理解する必要があります。

Androidバージョンは両方ともJavaを使用しているため比較的容易ですが、iOSはSwiftがCordovaで十分にサポートされていないため、完全な書き直しが必要です。

## 解決策

その間にできることは以下の通りです：

* GitHubで[私たちをサポート](https://github.com/sponsors/cap-go)していただければ、優先的に取り組むことができます。少なくとも1ヶ月の作業が必要になります。
* 私たちを[コンサルタント](https://capgo.app/consulting/)として雇ってください。大企業のCapacitorへの移行を支援した実績があり、通常1ヶ月かかりますが、チームにとっての[メリット](https://ionic.io/resources/articles/capacitor-vs-cordova-modern-hybrid-app-development)は非常に大きいです。
