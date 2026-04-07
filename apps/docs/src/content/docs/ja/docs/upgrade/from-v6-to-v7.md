---
title: "V6からV7へ"
locale: ja
description: "Capgoアップデーターのバージョン6からバージョン7への移行に関する詳細なガイド。成功したアップグレードプロセスに必要な手順と考慮事項を概説し、最新のCapacitor機能と改善との互換性を確保します。"
sidebar:
  order: 2
---

## このアップグレードの理由

このメジャーバージョンは、Capacitorのメジャーバージョンに従うためのものです。

まず、Capacitorの移行ガイドに従ってください：

[https://capacitorjs.com/docs/updating/7-0](https://capacitorjs.com/docs/updating/7-0/)

## インストール

`npm i @capgo/capacitor-updater@7`

`次に、ネイティブコードの更新を同期します：`

`npx cap sync`

以上です！とても簡単です！

## 暗号化の移行

`key-v1`暗号化方式を使用している場合は、新しい暗号化システムに移行する必要があります。V7では`key-v1`がサポートされなくなりました。[[memory:96112]]

暗号化移行ガイドはこちらをご覧ください：[暗号化移行ガイド](/docs/cli/migrations/encryption/)

## 設定の変更

`capacitor.config`ファイルに以下のプロパティを追加することをお勧めします：
- `capacitorUpdater`
- `appId`
- `version`
- `autoUpdate`

これらの設定は、プラグインとその動作をより適切に管理するのに役立ちます。


