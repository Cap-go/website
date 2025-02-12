---
title: V2から V3へ
description: V2 から V3 へのアップグレード方法
sidebar:
  order: 4
locale: ja
---

auto-updateのバージョン3へのアップグレード方法について説明します。

## まず最新のツールに移行します:

```bash
npm remove -g capgo
npm remove capacitor-updater

npm i @capgo/cli
npm i @capgo/capacitor-updater@3
npx cap sync
```

## 以前の設定をすべて削除します:

```json
{
  CapacitorUpdater: {
      autoUpdateURL: "https",
      
  },
}
```

これだけを残します:

```json
{
  "CapacitorUpdater": {
    "autoUpdate": true
  }
}
```

> ⚠️ `autoUpdateURL`で独自のサーバーを使用していた場合、このガイドは近日中に更新される予定です。それまでの間、新しいアップロードオプション`external`をご確認ください。これにより、Capgoクラウドにコードを送信せず、zipファイルのリンクのみを送信できます。これは厳格なプライバシーポリシーを持つ企業向けに作られました。externalモードでは、コードはCapgoサーバーに保存されず、URLのみを保存してデバイスに送信し、デバイスが直接ダウンロードします。標準的な方法では、コードは圧縮されて当社のサーバーに保存されますが、開封したり使用したりすることはありません。

## 変更点

auto-updateのすべての設定がサーバーサイドになり、ユーザーへの更新の送信方法をより細かく制御できるようになりました。

これにより、チャンネルを使用して元に戻したり、1人のユーザーにだけデプロイしたりすることが可能になります。これらの設定はWeb インターフェイスに追加されます:

* ネイティブ以下のリバートを無効化
* メジャーバージョン以上の更新を無効化

> ⚠️ これらはすべてのチャンネルでデフォルトでtrueになります

これにより、プラグインを頻繁に更新する必要がなくなり、ほとんどの更新はサーバーサイドで行われ、ユーザー側での変更なしに更新を受け取ることができます

> ⚠️ 更新がデフォルトになった時にリセットされます。ストアからの更新時にダウンロードしたバージョンをすべて削除したくない場合は、以下のようにしてください:

```json
{
  "CapacitorUpdater": {
    "autoUpdate": true,
    "resetWhenUpdate": false
  }
}
```

## コードの更新

最後に、JSのすべてのインポートを以下から:

```
import { CapacitorUpdater } from 'capacitor-updater'
```

以下に更新します:

```
import { CapacitorUpdater } from '@capgo/capacitor-updater'
```

その後、コードを再ビルドし`npm run build`、アセットを再度コピーします`npx cap copy`

これで最新のauto-updateシステムをテストできるはずです

バージョンの送信は以下のようになります:

```
npx @capgo/cli@latest upload
```

以下の代わりに:

```
npx capgo upload
```

## 今後の展開

現在は最初のパブリックチャンネルのみが使用されていますが、将来的には複数のパブリックチャンネルが設定されている場合、パブリックは複数のパブリックチャンネルに変更される予定です

## よくある問題:

* アップグレード後のビルドの問題: プラグインのソースコードをAndroid StudioやXcodeですでに開いている場合、同期で削除されないことがあります。これが問題の原因です。ネイティブIDEを開いて手動で`capacitor-updater`を削除し、`npx cap sync`を実行してください。これで解決するはずです