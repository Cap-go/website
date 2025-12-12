---
title: Cordova
description: Capacitor-updaterはCordovaで利用可能ですか？
sidebar:
  order: 8
locale: ja
---

このプラグインがCordovaで利用可能になるのかと疑問に思っていたかもしれません。

私たちはそのためのR&Dリポジトリを開始しましたが、膨大な作業が必要です。

## 問題点

実現可能であることは分かっていますが、そのためにはCapacitorで行ったように、Cordovaのコードベース全体を読み、どのように動作させるかを理解する必要があります。

Androidバージョンは両方ともJavaを使用しているため比較的容易ですが、iOSはSwiftがCordovaで十分にサポートされていないため、完全な書き直しが必要です。

## 解決策

その間にできることは以下の通りです：

* GitHubで[私をサポート](https://github.com/sponsors/riderx)していただければ、優先的に取り組むことができます。少なくとも1ヶ月の作業が必要になります。
* 私をコンサルタントとして雇ってください。大企業のCapacitorへの移行を支援した実績があり、通常10-20日かかりますが、チームにとっての[メリット](https://ionic.io/resources/articles/capacitor-vs-cordova-modern-hybrid-app-development)は非常に大きいです。
