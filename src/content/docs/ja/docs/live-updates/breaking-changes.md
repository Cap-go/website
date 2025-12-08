---
title: "破壊的変更"
description: "バージョン管理されたチャンネルを使用して破壊的変更を処理する方法"
sidebar:
  order: 6
locale: ja
---

このドキュメントでは、バージョン管理されたチャンネルを使用してアプリの破壊的変更を処理する方法について説明します。このアプローチにより、異なるバージョンのアプリを維持しながら、ユーザーが互換性のある更新を受け取ることができます。

## シナリオの例

以下があるとします:
- アプリバージョン1.2.3（古いバージョン） - productionチャンネルを使用
- アプリバージョン2.0.0（破壊的変更のある新しいバージョン） - v2チャンネルを使用
- ライブアップデート1.2.4（1.2.3と互換性あり）
- ライブアップデート2.0.1（2.0.0と互換性あり）

## 戦略: メジャーバージョンには常にdefaultChannelを使用

**推奨アプローチ:** すべてのメジャーバージョンに`defaultChannel`を設定します。これにより、動的なチャンネル割り当てに依存することなく、特定のユーザーグループに更新をプッシュできます。

```ts
// バージョン1.xリリース
defaultChannel: 'v1'

// バージョン2.xリリース
defaultChannel: 'v2'

// バージョン3.xリリース（将来）
defaultChannel: 'v3'
```

:::tip
**このアプローチの利点:**
- どのユーザーが更新を受け取るかを**常に制御**できる
- アプリコード内で**動的なチャンネル切り替えは不要**
- 異なるアプリバージョン間の**明確な分離**
- 特定のバージョングループに更新をプッシュする**柔軟性**
:::

## 1. 新バージョン用のチャンネルを作成

```bash
# バージョン2.x用のチャンネルを作成
npx @capgo/cli channel create v2
```

## 2. バージョン2.0.0のCapacitor設定を更新

App Storeでバージョン2.0.0をビルドする前にCapacitor設定を更新します:

```ts
// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Example App',
  plugins: {
    CapacitorUpdater: {
      // ... その他のオプション
      defaultChannel: 'v2' // すべての2.0.0ユーザーはv2チャンネルを使用
    }
  }
};

export default config;
```

:::note
**バージョン1.x用:** 最初に`defaultChannel`を設定しなかった場合、バージョン1.xユーザーは`production`チャンネルにいます。将来のメジャーバージョンでは、常に`v3`、`v4`などの特定のチャンネルを設定してください。
:::

## 3. 個別のコードブランチを管理

アプリバージョン間の互換性を維持するために、個別のgitブランチを作成します:

```bash
# バージョン1.x更新用のブランチを作成して維持
git checkout -b v1-maintenance
git push origin v1-maintenance

# メインブランチはバージョン2.x開発を続行
git checkout main
```

:::warning
**重要:** 古いアプリに期待されるネイティブコード/APIを持たないJavaScriptバンドルを決してプッシュしないでください。常に適切なブランチから更新をビルドしてください:
- **v1-maintenanceブランチ**: 1.xアプリへの更新用（productionチャンネル）
- **mainブランチ**: 2.xアプリへの更新用（v2チャンネル）
:::

## 4. それぞれのチャンネルにバンドルをアップロード

```bash
# 1.x更新用: v1-maintenanceブランチからビルド
git checkout v1-maintenance
# ここで1.x互換の変更を行う
npx @capgo/cli bundle upload --channel production

# 2.x更新用: mainブランチからビルド
git checkout main
# ここで2.xの変更を行う
npx @capgo/cli bundle upload --channel v2
```

## 5. 自己割り当てを有効化

```bash
# アプリがv2チャンネルに自己割り当てできるようにする
npx @capgo/cli channel set v2 --self-assign
```

## 6. App Storeにデプロイ

バージョン2.0.0をビルドしてApp Storeにデプロイします。このバージョンをダウンロードするすべてのユーザー（新規ユーザーまたは既存ユーザーのアップグレード）は、アプリバンドルに設定されているため、自動的にv2チャンネルを使用します。

:::note
**コード変更は不要！** アプリストアバージョンに`defaultChannel: 'v2'`がバンドルされているため、バージョン2.0.0をダウンロードするすべてのユーザーは自動的に正しいチャンネルを使用します。
:::

## 将来のバージョンへのスケーリング

さらに破壊的変更を伴うバージョン3.0.0をリリースする場合:

```bash
# バージョン3.x用のチャンネルを作成
npx @capgo/cli channel create v3
```

```ts
// バージョン3.0.0用のcapacitor.config.ts
const config: CapacitorConfig = {
  // ...
  plugins: {
    CapacitorUpdater: {
      defaultChannel: 'v3' // バージョン3.xユーザー
    }
  }
};
```

これで、任意のバージョンに更新をプッシュできます:
- `production`チャンネル → バージョン1.xユーザー
- `v2`チャンネル → バージョン2.xユーザー
- `v3`チャンネル → バージョン3.xユーザー

## 7. クリーンアップ（移行後）

すべてのユーザーがバージョン2.xに移行したら（3〜4か月を数える）:

1. Capacitor設定から`defaultChannel`を削除
2. v2チャンネルを削除:

```bash
npx @capgo/cli channel delete v2
```

3. v1-maintenanceブランチを削除:

```bash
git branch -d v1-maintenance
git push origin --delete v1-maintenance
```

:::tip
このアプローチにより、ユーザーはアプリバージョンと互換性のある更新のみを受け取ることができます
:::

:::warning
デプロイ前に各チャンネルで更新を徹底的にテストしてください
:::

:::note
一部のユーザーがまだチャンネルオーバーライドを持っている場合でも、Capgoでv2チャンネルを安全に削除できます。代わりにproductionチャンネルから自動的に更新を受け取ります。
:::

## バージョン1.x更新の維持

バージョン1.xと互換性のある更新を送信するには:

1. v1-maintenanceブランチに切り替える:
```bash
git checkout v1-maintenance
```

2. 変更を行ってコミット:
```bash
# 1.x互換の変更を行う
git add .
git commit -m "Fix for v1.x"
git push origin v1-maintenance
```

3. productionチャンネルにビルドしてアップロード:
```bash
npx @capgo/cli bundle upload --channel production
```

:::tip
v1-maintenanceブランチをバージョン1.xと互換性のあるバグ修正で最新に保ちますが、mainからの破壊的変更はマージしないでください
:::
