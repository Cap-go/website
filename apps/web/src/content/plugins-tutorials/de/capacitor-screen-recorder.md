---
locale: de
---

capgo/capacitor-screen-recorder  
Ein Capacitor-Plugin zum Aufzeichnen des Bildschirms des Geräts

## Installation  
Um das Paket zu installieren, führen Sie den folgenden Befehl aus:  
```
npm install @capgo/capacitor-screen-recorder
npx cap sync
```  
Stellen Sie sicher, dass Sie die erforderlichen Berechtigungen und Konfigurationen hinzufügen, damit das Plugin ordnungsgemäß funktioniert.

## Verwendung  
Um mit der Aufnahme des Bildschirms zu beginnen, verwenden Sie die Methode `start()`:  
```typescript
import { Plugins } from '@capacitor/core';
const { CapacitorScreenRecorder } = Plugins;

CapacitorScreenRecorder.start();
```

Um die Aufnahme zu stoppen, verwenden Sie die Methode `stop()`:  
```typescript
import { Plugins } from '@capacitor/core';
const { CapacitorScreenRecorder } = Plugins;

CapacitorScreenRecorder.stop();
```

Das war's! Sie können jetzt den Bildschirm Ihres Geräts mit dem Capacitor Screen Recorder-Plugin aufzeichnen.  
## Android  

Fügen Sie diese Berechtigungen hinzu  
```xml
  <uses-permission android:name="android.permission.CAPTURE_VIDEO_OUTPUT" />
  <uses-permission android:name="android.permission.FOREGROUND_SERVICE_MEDIA_PROJECTION" />
```

## Kompatibilität  
Dieses Plugin ist mit Capacitor 4 und höher kompatibel.

## Mitwirken  
Beiträge zu diesem Plugin werden sehr geschätzt. Wenn Sie auf Probleme stoßen oder Vorschläge haben, können Sie gerne einen Pull-Request einreichen oder ein Problem im GitHub-Repository erstellen.

## Lizenz  
Dieses Paket ist unter der MIT-Lizenz lizenziert.