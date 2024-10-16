---
locale: jp
---

## @capgo/standard-version パッケージチュートリアル

このチュートリアルでは、プロジェクトのバージョン番号を管理するために、`@capgo/standard-version` パッケージの使い方を学びます。`@capgo/standard-version` パッケージは、[従来のコミット仕様](https://wwwconventionalcommitsorg/) に基づいてプロジェクトのバージョン管理を自動化するツールです。

始めましょう！

## ステップ 1: インストール

`@capgo/standard-version` パッケージをインストールするには、ターミナルで次のコマンドを実行します。

```bash
npm install @capgo/standard-version --save-dev
```

これにより、パッケージがプロジェクトの開発依存関係として追加されます。

## ステップ 2: 設定

`@capgo/standard-version` パッケージを設定するには、プロジェクトのルートディレクトリに `releaseconfigjs` ファイルを作成し、以下の内容を記述します。

```javascript
module.exports = {
  preset: 'capgo',
};
```

この設定では、バージョン管理に使用するプレセットを指定します。この場合、`@capgo/standard-version` パッケージ用にカスタマイズされたプレセットである `capgo` プレセットを使用します。

## ステップ 3: バージョン管理

プロジェクトの新しいバージョンを作成するには、次のコマンドを実行します。

```bash
npx standard-version
```

これにより、コミット履歴が分析され、従来のコミットに基づいてプロジェクトの新しいバージョン番号が自動的に生成されます。また、最新の変更を反映した `CHANGELOGmd` ファイルも更新されます。

## ステップ 4: リリース

リリースを作成するには、次のコマンドを実行します。

```bash
npx standard-version --release-as 1.0.0
```

`100` をリリースの希望のバージョン番号に置き換えます。このコマンドは、`packagejson` ファイルのバージョン番号を更新し、リリースのための git タグを作成し、`CHANGELOGmd` ファイルを更新します。

## 結論

おめでとうございます！`@capgo/standard-version` パッケージを使用してプロジェクトのバージョン番号を管理する方法を成功裏に学びました。このパッケージはバージョン管理プロセスを自動化し、プロジェクト内の変更を追跡しやすくします。

さらに詳しい情報は、`@capgo/standard-version` パッケージのドキュメントを参照してください。

バージョン管理を楽しんでください！