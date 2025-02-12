---
title: Cordova
description: Is Capacitor-updater available for Cordova?
sidebar:
  order: 8
locale: ja
---

You've been wondering if this plugin will ever be available for Cordova

このプラグインがCordovaで利用可能になるのかと疑問に思っていたかもしれません

I have started a R&D repository for that, but it's a huge amount of work

そのためのR&Dリポジトリを開始しましたが、作業量が膨大です

## Problems

## 問題点

I know I can do it but for that, I have to read all the code of Cordova codebase as I did for Capacitor, to understand how to make it work

実現可能だとは分かっていますが、その為にはCapacitorの時と同様にCordovaのコードベース全体を読んで、どのように動作させるかを理解する必要があります

The Android version is easier to do since both use Java, but iOS needs a full rewrite because Swift is still not well-supported in Cordova

AndroidバージョンはどちらもJavaを使用しているため比較的簡単ですが、CordovaではSwiftのサポートがまだ十分ではないため、iOSは完全な書き直しが必要です

## Solution

## 解決策

In the mean time heres what you can do:

当面は以下のことができます：

* [Support me](https://githubcom/sponsors/riderx) on GitHub and I can prioritize that This will need at least 1 month of work
* Hire me as a Consultant, I used to help big companies migrate to capacitor, it usually takes ~10-20 days, and the [benefit](https://ionicio/resources/articles/capacitor-vs-cordova-modern-hybrid-app-development) is huge for the team

* GitHubで[サポート](https://githubcom/sponsors/riderx)していただければ、優先的に取り組むことができます。少なくとも1ヶ月の作業が必要です
* コンサルタントとして雇用してください。大企業のCapacitorへの移行を支援してきた経験があり、通常10-20日かかりますが、チームにとって[メリット](https://ionicio/resources/articles/capacitor-vs-cordova-modern-hybrid-app-development)は非常に大きいです