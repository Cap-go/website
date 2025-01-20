---
locale: ja
---

@capgo/capacitor-shakeを使う

`@capgo/capacitor-shake`パッケージを使用すると、デバイス上のシェイクジェスチャーを検出できます。このパッケージをCapacitorアプリで使用する方法についてのチュートリアルです。

## インストール

パッケージをインストールするには、以下のコマンドを実行します：

```bash
npm install @capgo/capacitor-shake
npx cap sync
```

## リスナーを追加

シェイクジェスチャーを検出するには、`shake`イベントのリスナーを追加する必要があります。以下はその方法の例です：

```typescript
import { Plugins } from '@capacitor/core';

const { CapacitorShake } = Plugins;

CapacitorShake.addListener('shake', () => {
  console.log('Shake gesture detected!');
});
```

この例では、`@capacitor/core`から`CapacitorShake`プラグインをインポートし、`addListener`メソッドを使用して`shake`イベントのリスナーを追加します。シェイクジェスチャーが検出されると、コールバック関数が実行されます。

## リスナーを削除

`shake`イベントリスナーを削除したい場合は、`removeAllListeners`メソッドを使用できます：

```typescript
import { Plugins } from '@capacitor/core';

const { CapacitorShake } = Plugins;

CapacitorShake.removeAllListeners('shake');
```

この例では、`removeAllListeners`メソッドを使用してすべての`shake`イベントリスナーを削除します。

以上です！`@capgo/capacitor-shake`パッケージをCapacitorアプリに正常に統合しました。これでデバイス上のシェイクジェスチャーを検出できるようになりました。