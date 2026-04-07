---
locale: ja
---

capgo/capacitor-screen-recorder  
デバイスの画面を録画するためのCapacitorプラグイン

## インストール  
パッケージをインストールするには、次のコマンドを実行してください：  
```
npm install @capgo/capacitor-screen-recorder
npx cap sync
```  
プラグインが正常に動作するために、必要な権限と設定を追加してください

## 使い方  
画面の録画を開始するには、`start()`メソッドを使用してください：  
```typescript
import { Plugins } from '@capacitor/core';
const { CapacitorScreenRecorder } = Plugins;

CapacitorScreenRecorder.start();
```

録画を停止するには、`stop()`メソッドを使用してください：  
```typescript
import { Plugins } from '@capacitor/core';
const { CapacitorScreenRecorder } = Plugins;

CapacitorScreenRecorder.stop();
```

これで完了です！Capacitor Screen Recorderプラグインを使用してデバイスの画面を録画できます  
## Android  

この権限を追加してください  
```xml
  <uses-permission android:name="android.permission.CAPTURE_VIDEO_OUTPUT" />
  <uses-permission android:name="android.permission.FOREGROUND_SERVICE_MEDIA_PROJECTION" />
```

## 互換性  
このプラグインはCapacitor 4以上と互換性があります

## 貢献  
このプラグインへの貢献は非常に感謝されます。問題が発生した場合や提案がある場合は、プルリクエストを送信するか、GitHubリポジトリで問題を作成してください

## ライセンス  
このパッケージはMITライセンスの下でライセンスされています