---
locale: ja
---

capgo/capacitor-data-storage-sqlite チュートリアル

このチュートリアルでは、`@capgo/capacitor-data-storage-sqlite` パッケージを使用して、Ionic Capacitor アプリでシンプルな文字列データのためのキー・バリューの永続的ストレージを実装する方法を説明します。

## 前提条件

始める前に、以下がインストールされていることを確認してください：

- Nodejs
- npm
- Ionic Capacitor プロジェクト

## インストール

1 ターミナルまたはコマンドプロンプトを開き、プロジェクトディレクトリに移動します。

2 以下のコマンドを実行してパッケージをインストールします：

```bash
npm install --save @capgo/capacitor-data-storage-sqlite
```

3 インストール後、Capacitor プロジェクトを同期します：

```bash
npx cap sync
```

4 Web プラットフォームのために、localforage をインストールします：

```bash
npm install --save localforage
```

5 Electron プラットフォームのために、以下の追加手順を実行します：

```bash
npm install --save @capacitor-community/electron
npx cap add @capacitor-community/electron
cd electron
npm install --save sqlite3
npm install --save-dev @types/sqlite3
npm run build
cd ..
npx cap sync @capacitor-community/electron
```

## 使用法

パッケージをインストールしましたので、アプリでの使用方法を見てみましょう。

### プラグインのインポート

まず、TypeScript ファイルにプラグインをインポートします：

```typescript
import { Capacitor } from '@capacitor/core';
import { CapacitorDataStorageSqlite, capDataStorageSqlite } from '@capgo/capacitor-data-storage-sqlite';
```

### ストアのオープン

ストレージを使用するには、ストアを開く必要があります：

```typescript
async function openStore() {
  const store = new CapacitorDataStorageSqlite(Capacitor.getPlatform());
  await store.openStore({ database: "my_db", table: "my_table" });
  return store;
}
```

### 値の設定

ストアに値を設定するには：

```typescript
async function setValue(store, key: string, value: string) {
  await store.set(key, value);
}
```

### 値の取得

ストアから値を取得するには：

```typescript
async function getValue(store, key: string) {
  const result = await store.get(key);
  return result.value;
}
```

### キーの存在確認

ストアにキーが存在するか確認するには：

```typescript
async function isKeyExists(store, key: string) {
  const result = await store.iskey(key);
  return result.result;
}
```

### キーの削除

ストアからキーを削除するには：

```typescript
async function removeKey(store, key: string) {
  await store.remove(key);
}
```

### ストアのクリア

ストアからすべてのデータを消去するには：

```typescript
async function clearStore(store) {
  await store.clear();
}
```

### ストアのクローズ

ストアの使用が終わったら、クローズすることが良い習慣です：

```typescript
async function closeStore(store) {
  await store.closeStore();
}
```

## 使用例

以下は、プラグインの使用方法の完全な例です：

```typescript
import { Capacitor } from '@capacitor/core';
import { CapacitorDataStorageSqlite, capDataStorageSqlite } from '@capgo/capacitor-data-storage-sqlite';

async function dataStorageExample() {
  const store = new CapacitorDataStorageSqlite(Capacitor.getPlatform());
  
  try {
    // Open the store
    await store.openStore({ database: "my_db", table: "my_table" });

    // Set a value
    await store.set("myKey", "Hello, Capacitor!");

    // Get the value
    const result = await store.get("myKey");
    console.log("Value:", result.value);

    // Check if key exists
    const keyExists = await store.iskey("myKey");
    console.log("Key exists:", keyExists.result);

    // Remove the key
    await store.remove("myKey");

    // Clear the store
    await store.clear();

  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the store
    await store.closeStore();
  }
}

dataStorageExample();
```

## 結論

これで、Ionic Capacitor アプリにおけるキー・バリューのストレージシステムを実装するために `@capgo/capacitor-data-storage-sqlite` パッケージの使い方を学びました。このプラグインは、iOS、Android、Electron、Web などのさまざまなプラットフォームで文字列データを保存・取得するためのシンプルな方法を提供します。

エラーを適切に処理し、使用が終わったらストアを閉じることを忘れないでください。暗号化されたデータベース、複数のテーブル、JSONのインポート/エクスポートなどの高度な使用法については、プラグインの完全なAPIドキュメントを参照してください。

APIおよび利用可能なオプションに関する詳細な情報については、パッケージのREADMEまたはドキュメントを参照してください。