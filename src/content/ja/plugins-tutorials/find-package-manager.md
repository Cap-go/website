---
locale: ja
---

```
@capgo/find-package-managerを使う

`@capgo/find-package-manager`パッケージは、特定のパスで使用されているパッケージマネージャーを特定するための便利なツールです。異なるパッケージマネージャーを使用しているプロジェクトに取り組む際に役立ちます。

このパッケージの使用方法についてのステップバイステップのチュートリアルは次のとおりです。

## インストール

まず、Nodejsとnpmがあなたのマシンにインストールされていることを確認してください。その後、ターミナルを開き、次のコマンドを実行して`@capgo/find-package-manager`パッケージをインストールします：

```
npm install @capgo/find-package-manager
```

## パッケージのインポート

パッケージがインストールされたら、次の行を使用してコードにインポートできます：

```typescript
import { findPackageManagerType } from '@capgo/find-package-manager'
```

## パッケージマネージャーの種類を見つける

特定のパスでパッケージマネージャーの種類を見つけるには、`findPackageManagerType`関数を使用できます。以下はその例です：

```typescript
console.log(findPackageManagerType())
```

`findPackageManagerType`関数は、使用されているパッケージマネージャーの種類を示す文字列値を返します。次のいずれかの値を返すことができます：

- `npm`: npmが使用されている場合
- `yarn`: yarnが使用されている場合
- `pnpm`: pnpmが使用されている場合
- `unknown`: パッケージマネージャーの種類が特定できない場合

## 全体をまとめる

以下は、`@capgo/find-package-manager`パッケージの使用方法の完全な例です：

```typescript
import { findPackageManagerType } from '@capgo/find-package-manager'

console.log(findPackageManagerType()) // npm | yarn | pnpm | unknown
```

以上です！これで、特定のパスでパッケージマネージャーの種類を判定するために`@capgo/find-package-manager`パッケージを使用できるようになりました。
```