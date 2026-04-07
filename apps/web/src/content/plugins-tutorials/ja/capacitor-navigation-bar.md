---
locale: ja
---

sing @capgo/capacitor-navigation-bar

## インストール

`@capgo/capacitor-navigation-bar` パッケージを使用するには、まず以下のコマンドを実行してインストールする必要があります。

```bash
npm install @capgo/capacitor-navigation-bar
npx cap sync
```

## ナビゲーションバーの色を設定する

`setNavigationBarColor` 関数を使用して、Android Lollipop 以上のナビゲーションバーの色を設定できます。以下はその使い方の例です。

```typescript
import { setNavigationBarColor } from '@capgo/capacitor-navigation-bar';

...

setNavigationBarColor({ color: '#FF0000' });
```

`color` パラメーターはナビゲーションバーの色を表す文字列です。

## ナビゲーションバーの色を取得する

`getNavigationBarColor` 関数を使用して、現在のナビゲーションバーの色を取得することもできます。以下はその使い方の例です。

```typescript
import { getNavigationBarColor } from '@capgo/capacitor-navigation-bar';

...

const color = getNavigationBarColor();
console.log(color);
```

`color` 変数には現在のナビゲーションバーの色が含まれます。

これで完了です！これで `@capgo/capacitor-navigation-bar` パッケージを使用して、Android アプリでナビゲーションバーの色を設定および取得する方法がわかりました。