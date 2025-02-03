---
title: V4 から V5 へ
description: V4 から V5 へのアップデート方法
sidebar:
  order: 2
locale: ja
---

## このアップグレードの理由

このメジャーバージョンは、Capacitorのメジャーバージョンに追従するためのものです

まず、Capacitorの移行ガイドに従ってください：

[https://capacitorjscom/docs/updating/5-0](https://capacitorjscom/docs/updating/5-0/)

## インストール

`npm i @capgo/capacitor-updater@5`

`その後、ネイティブコードの更新を同期します：`

`npx cap sync`

これだけです！とても簡単です！

## マニュアルモード

getLatestで自身でアップデートを取得していた場合、小さな変更があります。
現在既に最新の場合は、catchに入ります。
利用可能なアップデートとは異なる応答はすべてそのような動作をします。