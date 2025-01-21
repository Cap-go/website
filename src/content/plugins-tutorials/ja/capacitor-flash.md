---
locale: ja
---

`@capgo/capacitor-flash` パッケージの紹介

`@capgo/capacitor-flash` パッケージを使用すると、デバイスのフラッシュライト/トーチをオンおよびオフに切り替えることができます。このチュートリアルでは、Ionic Capacitor アプリにこのパッケージをインストールし、使用するプロセスを案内します。

## インストール

`@capgo/capacitor-flash` パッケージをインストールするには、プロジェクトのルートディレクトリで以下のコマンドを実行します：

```bash
npm install @capgo/capacitor-flash
npx cap sync
```

## iOS セットアップ

`@capgo/capacitor-flash` パッケージは、iOS では特別な設定を必要とせず、すぐに使用できます。

## Android セットアップ

Android では、アプリの `AndroidManifest.xml` ファイルに必要な権限を宣言する必要があります。`<manifest>` タグ内に次の行を追加してください：

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-feature android:name="android.hardware.camera" />
```

## API

`@capgo/capacitor-flash` パッケージは、以下の API メソッドを提供します：

### isAvailable()

このメソッドは、デバイスでフラッシュライトが利用可能かどうかをチェックします。

```javascript
import { CapacitorFlash } from '@capgo/capacitor-flash';

async function checkFlashlightAvailability() {
  const isAvailable = await CapacitorFlash.isAvailable();
  console.log('Flashlight availability:', isAvailable);
}
```

### switchOn(options)

このメソッドは、デバイスのフラッシュライトをオンにします。フラッシュライトの強度を調整するためのオプションを渡すことができます。

```javascript
import { CapacitorFlash } from '@capgo/capacitor-flash';

async function switchOnFlashlight() {
  const options = {
    intensity: 100, // Set the intensity to 100%
  };
  await CapacitorFlash.switchOn(options);
  console.log('Flashlight switched on');
}
```

### switchOff()

このメソッドは、デバイスのフラッシュライトをオフにします。

```javascript
import { CapacitorFlash } from '@capgo/capacitor-flash';

async function switchOffFlashlight() {
  await CapacitorFlash.switchOff();
  console.log('Flashlight switched off');
}
```

### isSwitchedOn()

このメソッドは、フラッシュライトが現在オンかオフかをチェックします。

```javascript
import { CapacitorFlash } from '@capgo/capacitor-flash';

async function checkFlashlightStatus() {
  const isSwitchedOn = await CapacitorFlash.isSwitchedOn();
  console.log('Flashlight status:', isSwitchedOn ? 'ON' : 'OFF');
}
```

### toggle()

このメソッドは、フラッシュライトを切り替えます。つまり、オンの場合はオフにし、オフの場合はオンにします。

```javascript
import { CapacitorFlash } from '@capgo/capacitor-flash';

async function toggleFlashlight() {
  await CapacitorFlash.toggle();
  console.log('Flashlight toggled');
}
```

それだけです！`@capgo/capacitor-flash` パッケージを使用して、デバイスのフラッシュライト/トーチを制御する方法を成功裏に学びました。