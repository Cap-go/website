---
locale: jp
---

@capgo/capacitor-fingerprint パッケージの紹介

`@capgo/capacitor-fingerprint` パッケージは、FingerPrint PRO のための Capacitor クライアントです。このパッケージは詐欺検出のために100%正確なデバイス識別を提供します。このチュートリアルでは、インストールプロセスとパッケージのAPIの使い方を説明します。

## インストール

`@capgo/capacitor-fingerprint` パッケージをインストールするには、以下のコマンドを実行してください：

```bash
npm install @capgo/capacitor-fingerprint
npx cap sync
```

## API 使用法

### ロード

`@capgo/capacitor-fingerprint` プラグインをロードするには、`load` 関数を使用します。以下はその使用例です：

```typescript
import { Plugins } from '@capacitor/core';

const { CapacitorFingerprint } = Plugins;

async function loadFingerprintPlugin() {
  try {
    await CapacitorFingerprint.load({
      // options
    });
    console.log('Fingerprint plugin loaded successfully');
  } catch (error) {
    console.error('Failed to load Fingerprint plugin:', error);
  }
}

loadFingerprintPlugin();
```

### ビジターIDを取得

ビジターIDを取得するには、`getVisitorId` 関数を使用します。以下はその使用例です：

```typescript
import { Plugins } from '@capacitor/core';

const { CapacitorFingerprint } = Plugins;

async function getVisitorId() {
  try {
    const result = await CapacitorFingerprint.getVisitorId();
    const visitorId = result.visitorId;
    console.log('Visitor ID:', visitorId);
  } catch (error) {
    console.error('Failed to get Visitor ID:', error);
  }
}

getVisitorId();
```

### ビジターデータを取得

ビジターデータを取得するには、`getVisitorData` 関数を使用します。以下はその使用例です：

```typescript
import { Plugins } from '@capacitor/core';

const { CapacitorFingerprint } = Plugins;

async function getVisitorData() {
  try {
    const result = await CapacitorFingerprint.getVisitorData();
    const visitorData = result.visitorData;
    console.log('Visitor Data:', visitorData);
  } catch (error) {
    console.error('Failed to get Visitor Data:', error);
  }
}

getVisitorData();
```

## 結論

このチュートリアルでは、`@capgo/capacitor-fingerprint` パッケージのインストールプロセスと、そのAPIの使用法について説明しました。これで FingerPrint PRO サービスを使用して、Capacitor アプリにデバイス識別と詐欺検出を統合することができます。詳細については、パッケージのドキュメントを参照し、提供される追加機能を探ってください。