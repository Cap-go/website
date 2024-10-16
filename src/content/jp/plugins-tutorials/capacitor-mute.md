---
locale: jp
---

@capgo/capacitor-muteパッケージ

`@capgo/capacitor-mute`パッケージは、デバイスのミュートスイッチが有効か無効かを検出するCapacitorプラグインです。デバイスのミュート状態を確認するためのシンプルなAPIを提供します。

## インストール

npmを使って`@capgo/capacitor-mute`パッケージをインストールできます。

```bash
npm install @capgo/capacitor-mute
npx cap sync
```

## 使用法

`@capgo/capacitor-mute`パッケージを使用するには、インポートし、`isMuted()`メソッドを呼び出す必要があります。

```typescript
import { isMuted } from '@capgo/capacitor-mute';

isMuted().then((result) => {
  console.log('Mute status:', result);
}).catch((error) => {
  console.error('Error checking mute status:', error);
});
```

`isMuted()`メソッドは、デバイスがミュートされているかどうかを示すブーリアン値に解決されるプロミスを返します。プロミスが拒否された場合、エラーメッセージが表示されます。

## 例

以下は、`@capgo/capacitor-mute`パッケージを使用してデバイスのミュート状態を確認し、結果に基づいてメッセージを表示する方法の例です。

```typescript
import { isMuted } from '@capgo/capacitor-mute';

isMuted().then((result) => {
  if (result) {
    console.log('The device is currently muted');
    // Display a message or perform some actions for muted device
  } else {
    console.log('The device is not muted');
    // Display a message or perform some actions for non-muted device
  }
}).catch((error) => {
  console.error('Error checking mute status:', error);
});
```

この例では、デバイスがミュートされている場合、「デバイスは現在ミュートされています」というメッセージが表示されます。デバイスがミュートされていない場合は、「デバイスはミュートされていません」というメッセージが表示されます。

## 考えられる問題

iOSデバイスでXcode 14を使用している場合、`@capgo/capacitor-mute`ライブラリがAppleの期待するように構成されていないことに注意してください。この問題は現在、ライブラリの開発者によって対処されています。この問題を解決するには、パッケージのドキュメントの[既知の問題](https://githubcom/CocoaPods/CocoaPods/issues/8891/)セクションに記載された指示に従ってください。

## 結論

`@capgo/capacitor-mute`パッケージは、デバイスのミュート状態を検出するのに役立つCapacitorプラグインです。このチュートリアルに記載されたインストール手順と使用手順に従うことで、このパッケージをCapacitorプロジェクトに簡単に統合し、ミュート状態を確認するためのAPIを活用できます。