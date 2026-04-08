---
locale: ja
---

`@capgo/capacitor-crisp`パッケージ

`@capgo/capacitor-crisp`パッケージを使用すると、ネイティブSDKであるCrispをCapacitorアプリに統合できます。このパッケージは、Crispの設定、チャットボックスのオープン、ユーザー詳細の設定、イベントの送信などのメソッドを提供します。

`@capgo/capacitor-crisp`パッケージを使い始めるには、次の手順に従ってください。

## インストール

1. ターミナルを開き、Capacitorアプリのルートディレクトリに移動します。
2. 次のコマンドを実行してパッケージをインストールします。

```bash
npm install @capgo/capacitor-crisp
npx cap sync
```

## Crispの初期化

`@capgo/capacitor-crisp`パッケージが提供するメソッドを使用する前に、あなたのウェブサイトIDでCrispを設定する必要があります。プロジェクトに次のコードを追加してください：

```typescript
import { CapacitorCrisp } from '@capgo/capacitor-crisp';

CapacitorCrisp.configure({ websiteID: '******-****-****-****-********' });
```

`'******-****-****-****-********'`を実際のCrispウェブサイトIDに置き換えます。

### iOS統合

iOSをターゲットにする場合は、アプリのInfoplistファイルに次の権限を追加する必要があります：

- プライバシー - カメラ使用説明 (NSCameraUsageDescription)
- プライバシー - 写真ライブラリの追加使用説明 (NSPhotoLibraryAddUsageDescription)

各権限について、アプリがなぜそれを必要とするのか説明する説明を提供してください。

### Android統合

Android統合に関しては、追加の手順は必要ありません。

## チャットボックスを開く

アプリでCrispチャットボックスを開くには、`@capgo/capacitor-crisp`パッケージが提供する`openMessenger`メソッドを使用します。プロジェクトに次のコードを追加してください：

```typescript
import { CapacitorCrisp } from '@capgo/capacitor-crisp';

CapacitorCrisp.openMessenger();
```

これにより、ユーザーはサポートチームと会話を開始できるCrispチャットボックスが開きます。

## 追加機能

`@capgo/capacitor-crisp`パッケージは、Crispのカスタマイズやインタラクションのためのいくつかの他のメソッドを提供します。以下は利用可能なメソッドの一部です：

- `setTokenID`: ユーザーのトークンIDを設定します。
- `setUser`: ニックネーム、電話番号、メール、アバターなどのユーザー詳細を設定します。
- `pushEvent`: Crispにカスタムイベントを送信します。
- `setCompany`: 名前、URL、説明、雇用、地理的位置などの会社の詳細を設定します。
- `setInt`: カスタム整数値を設定します。
- `setString`: カスタム文字列値を設定します。
- `sendMessage`: Crispにチャットメッセージを送信します。
- `setSegment`: ユーザーのセグメントを設定します。
- `reset`: Crispの設定をリセットします。

これらのメソッドとそのパラメーターについての詳細は、`@capgo/capacitor-crisp`パッケージの公式ドキュメントを参照してください。

これで完了です！`@capgo/capacitor-crisp`パッケージを使用してCrispをCapacitorアプリに統合する方法を学びました。Crispチャットボックスを通じてユーザーとのシームレスなコミュニケーションを楽しんでください。