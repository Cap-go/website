---
published: true
locale: jp
---

# @capgo/native-market パッケージチュートリアル

`@capgo/native-market` パッケージは、ネイティブマーケット用のCapacitorコミュニティプラグインで、PlayストアやAppストアとやり取りすることを可能にします。このチュートリアルでは、Capacitorプロジェクトにおけるこのパッケージのインストールと使用方法をガイドします。

## インストール

`@capgo/native-market` パッケージをインストールするには、ターミナルを開き、使用しているパッケージマネージャに応じて以下のコマンドのいずれかを実行してください：

npmを使用する場合：

```bash
npm install @capgo/native-market
```

yarnを使用する場合：

```bash
yarn add @capgo/native-market
```

インストール後、以下のコマンドを実行してネイティブファイルを同期します：

```bash
npx cap sync
```

iOSでは、これ以上のアクションは必要ありません。

Androidでは、これ以上のアクションは必要ありません。

## 使用法

`@capgo/native-market` パッケージは、ネイティブマーケットとやり取りするために使用できるいくつかのサポートされたメソッドを提供します。各メソッドの使用例は以下の通りです：

```typescript
import { NativeMarket } from '@capgo/native-market';

// Open store listing
NativeMarket.openStoreListing({
  appId: 'com.example.app',
  country: 'IT',
});

// Open developer page
NativeMarket.openDevPage({
  devId: '5700313618786177705',
});

// Open collection
NativeMarket.openCollection({
  name: 'featured',
});

// Open editor's choice page
NativeMarket.openEditorChoicePage({
  editorChoice: 'editorial_fitness_apps_us',
});

// Perform search
NativeMarket.search({
  terms: 'capacitor',
});
```

各メソッドは、実行したいアクションに応じて異なる入力パラメータを必要とします。必要なパラメータの詳細については、メソッドのドキュメントを参照してください。

以上です！これで、Capacitorプロジェクトに`@capgo/native-market` パッケージを正常にインストールおよび使用しました。ぜひ、さらにその機能を探求し、ニーズに応じてカスタマイズしてください。

***

チュートリアルの完了おめでとうございます！他に質問がある場合やサポートが必要な場合は、お気軽にお尋ねください。