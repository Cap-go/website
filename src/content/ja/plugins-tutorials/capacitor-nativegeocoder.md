---
locale: ja
---

@capgo/nativegeocoderを使用したジオコーディング

`@capgo/nativegeocoder`パッケージは、ネイティブの順方向および逆方向のジオコーディング機能を提供するCapacitorプラグインです。ジオコーディングは、住所を地理座標（緯度と経度）に変換するプロセスであり、その逆も同様です。

`@capgo/nativegeocoder`パッケージを使用するには、以下の手順に従ってください。

### ステップ1：パッケージをインストールする

npmを使用してパッケージをインストールします：

```bash
npm install @capgo/nativegeocoder
```

### ステップ2：プロジェクトを同期する

次のコマンドを実行してプロジェクトを同期します：

```bash
npx cap sync
```

### ステップ3：プラグインをインポートする

コード内で、`@capgo/nativegeocoder`から`NativeGeocoder`をインポートします：

```javascript
import { NativeGeocoder } from '@capgo/nativegeocoder';
```

### ステップ4：ジオコーディング機能を実装する

`@capgo/nativegeocoder`プラグインは、ジオコーディングのための2つの主要なメソッドを提供します。

#### 逆ジオコーディング

逆ジオコーディングは、地理座標（緯度と経度）を住所に変換するプロセスです。

```typescript
const reverseOptions = {
  latitude: 37.7749,
  longitude: -122.4194,
};

const address = NativeGeocoder.reverseGeocode(reverseOptions);
console.log(address);
```

`reverseGeocode`メソッドは、緯度と経度のプロパティを持つオブジェクトを受け取ります。結果として住所を返します。

#### 順ジオコーディング

順ジオコーディングは、住所を地理座標（緯度と経度）に変換するプロセスです。

```typescript
const forwardOptions = {
  address: '1600 Amphitheatre Parkway, Mountain View, CA',
};

const coordinates = NativeGeocoder.forwardGeocode(forwardOptions);
console.log(coordinates);
```

`forwardGeocode`メソッドは、住所プロパティを持つオブジェクトを受け取ります。結果として座標を返します。

### 結論

`@capgo/nativegeocoder`パッケージは、あなたのCapacitorプロジェクトでジオコーディングを行うためのシンプルで効率的な方法を提供します。このチュートリアルで説明した手順に従うことで、ジオコーディング機能を簡単にアプリケーションに統合できます。