---
locale: ja
---

## @capgo/native-audioパッケージの使用

このチュートリアルでは、Capacitorアプリケーションで音を再生するための`@capgo/native-audio`パッケージの使用方法を説明します。

## ステップ1: インストール

パッケージをインストールするには、ターミナルを開いて次のコマンドを実行します。

```bash
npm install @capgo/native-audio
```

または、yarnを使用することを好む場合は：

```bash
yarn add @capgo/native-audio
```

## ステップ2: ネイティブファイルの同期

パッケージをインストールした後、次のコマンドでネイティブファイルを同期します。

```bash
npx cap sync
```

## ステップ3: 設定

このプラグインには追加の設定は必要ありません。

## ステップ4: 使用

`@capgo/native-audio`パッケージを使用するには、パッケージから`NativeAudio`オブジェクトをインポートし、そのメソッドを使用する必要があります。

オーディオファイルをプリロードして再生する方法の例は以下の通りです。

```typescript
import { NativeAudio } from '@capgo/native-audio';

// Preload the audio file
NativeAudio.preload({
  assetId: 'fire',
  assetPath: 'assets/sounds/fire.mp3',
  audioChannelNum: 1,
  isUrl: false,
});

// Play the loaded audio file
NativeAudio.play({
  assetId: 'fire',
});
```

`preload`メソッドはオーディオファイルをメモリに読み込むために使用され、`play`メソッドは読み込まれたオーディオファイルを再生するために使用されます。

他にサポートされているメソッドには、`pause`、`resume`、`loop`、`stop`、`unload`、`setVolume`、`getDuration`、`getCurrentTime`があります。これらのメソッドの詳細については、[公式ドキュメント](https://githubcom/Cap-go/native-audio/blob/main/READMEmd/)を参照してください。

以上です！これで、Capacitorアプリケーションで音を再生するための`@capgo/native-audio`パッケージの使用方法を学びました。