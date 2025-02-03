---
title: Da V4 a V5
description: V4からV5への移行方法
sidebar:
  order: 2
locale: ja
---

## アップグレードの理由

このメジャーバージョンは、Capacitorのメジャーバージョンに追従するためのものです

まずCapacitorの移行ガイドに従ってください：

[https://capacitorjscom/docs/updating/5-0](https://capacitorjscom/docs/updating/5-0/)

## インストール

`npm i @capgo/capacitor-updater@5`

`その後、ネイティブコードを更新して同期します：`

`npx cap sync`

これで完了です！とても簡単です！

## マニュアルモード

getLatestで自身でアップデートを取得していた場合、小さな変更があります
既に最新の状態の場合はcatchに入ります
アップデートが利用可能である以外の応答はすべてこの動作になります