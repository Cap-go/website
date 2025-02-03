---
title: V2 から V3 へ
description: V2からV3へのアップグレード方法
sidebar:
  order: 4
locale: ja
---

この文書では、auto-updateのバージョン3へのアップグレード方法について説明します

## まず最新のツールに移行します：

```bash
npm remove -g capgo
npm remove capacitor-updater

npm i @capgo/cli
npm i @capgo/capacitor-updater@3
npx cap sync
```

## 以前のすべての設定を削除します：

```json
{
  CapacitorUpdater: {
      autoUpdateURL: "https",
      
  },
}
```

これだけを残します：

```json
{
  "CapacitorUpdater": {
    "autoUpdate": true
  }
}
```

> ⚠️ `autoUpdateURL`で独自のサーバーを使用していた場合、このガイドはまもなく更新されます。それまでの間、新しいアップロードオプション`external`をご確認ください。これにより、Capgoクラウドにコードを送信せず、ZIPファイルのリンクのみを送信できます。これは厳格なプライバシーポリシーを持つ企業向けに作られました。externalモードでは、コードはCapgoサーバーに保存されず、URLのみを保存してデバイスに送信し、デバイスが直接ダウンロードします。標準的な方法では、コードは圧縮されて当社のサーバーに保存されますが、開封や使用することはありません

## 変更点

auto-updateのすべての設定がサーバーサイドになり、ユーザーへの更新の送信方法をより細かく制御できるようになりました

これにより、チャンネルを使用して1人のユーザーに対してのみ展開したり、元に戻したりすることができます！これらの設定はウェブインターフェースに追加されています：

* ネイティブ以下の復元を無効化
* メジャーバージョン以上の更新を無効化

> ⚠️ これらはすべてのチャンネルでデフォルトでtrueになります

これにより、プラグインを頻繁に更新する必要がなくなり、ほとんどの更新はサーバーサイドで行われ、お客様側での変更なしに更新を受け取ることができます

> ⚠️ 更新がデフォルトになった時点でリセットされます。ストアからの更新時にすべてのダウンロードバージョンを削除したくない場合は、以下のようにしてください：

```json
{
  "CapacitorUpdater": {
    "autoUpdate": true,
    "resetWhenUpdate": false
  }
}
```

## コードの更新

最後に、JSのすべてのインポートを以下から：

```
import { CapacitorUpdater } from 'capacitor-updater'
```

以下に更新します：

```
import { CapacitorUpdater } from '@capgo/capacitor-updater'
```

その後、コードを再ビルドし`npm run build`、アセットを再度コピーします`npx cap copy`

これで最新のauto-updateシステムをテストできるはずです

バージョンの送信は以下のように行います：

```
npx @capgo/cli@latest upload
```

以下の代わりに：

```
npx capgo upload
```

## 今後の展開

現在は最初のパブリックチャンネルのみが使用されていますが、将来的には複数のパブリックチャンネルが設定されている場合、パブリックは複数のパブリックチャンネルに変更されます

## よくある問題：

* アップグレード後のビルドの問題：プラグインのソースコードをすでにAndroid StudioやXcodeで開いている場合、同期で削除されないことがあります。これが問題の原因です。ネイティブIDEを開いて手動で`capacitor-updater`を削除し、`npx cap sync`を実行すると解決するはずです