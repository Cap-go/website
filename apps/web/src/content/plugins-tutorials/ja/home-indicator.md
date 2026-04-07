---
locale: ja
---

capgo/home-indicator

`@capgo/home-indicator` パッケージは、あなたの Capacitor アプリでホームボタンインジケーターを隠したり表示したりすることができます。

## インストール

パッケージをインストールするには、ターミナルで以下のコマンドを実行してください：

```bash
npm install @capgo/home-indicator
npx cap sync
```

## API

このパッケージは以下のメソッドを提供します：

### `hide()`

```typescript
hide() => Promise
```

ホームインジケーターを隠す

**対応バージョン:** 001

### `show()`

```typescript
show() => Promise
```

ホームインジケーターを表示する

**対応バージョン:** 001

### `isHidden()`

```typescript
isHidden() => Promise<{ hidden: boolean; }>
```

ホームインジケーターの状態を取得する

**戻り値:** Promise<{ hidden: boolean; }>

**対応バージョン:** 001

## CSS 変数

`--safe-area-inset-bottom` を使用して、コンテンツがホームインジケーターに隠れないようにすることができます。この変数は、Android 向けにプラグインによって注入されます。Android で実際のフルスクリーンモードを設定する場合に便利です。

使用例：

```java
getWindow().setDecorFitsSystemWindows(false);
```

## クレジット

このプラグインは、[Kickcom](https://kickcom/) のために [Capgo](https://capgo.app/) によって最初に作成されました。

詳細な情報やアップデートについては、[Capgo](https://capgo.app/) をご覧ください。