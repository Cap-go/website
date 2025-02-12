---
locale: de
---

Sing @capgo/native-audio Paket

Dieses Tutorial führt Sie durch die Nutzung des `@capgo/native-audio` Pakets zum Abspielen von Tönen in Ihrer Capacitor-Anwendung.

## Schritt 1: Installation

Um das Paket zu installieren, öffnen Sie Ihr Terminal und führen Sie den folgenden Befehl aus:

```bash
npm install @capgo/native-audio
```

oder wenn Sie lieber Yarn verwenden:

```bash
yarn add @capgo/native-audio
```

## Schritt 2: Native Dateien synchronisieren

Nach der Installation des Pakets synchronisieren Sie die nativen Dateien mit dem folgenden Befehl:

```bash
npx cap sync
```

## Schritt 3: Konfiguration

Für dieses Plug-in sind keine zusätzlichen Konfigurationen erforderlich.

## Schritt 4: Verwendung

Um das `@capgo/native-audio` Paket zu verwenden, müssen Sie das `NativeAudio` Objekt aus dem Paket importieren und dessen Methoden verwenden.

Hier ist ein Beispiel, wie Sie eine Audiodatei vorladen und abspielen können:

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

Die Methode `preload` wird verwendet, um eine Audiodatei in den Arbeitsspeicher zu laden, und die Methode `play` wird verwendet, um die geladene Audiodatei abzuspielen.

Weitere unterstützte Methoden sind `pause`, `resume`, `loop`, `stop`, `unload`, `setVolume`, `getDuration` und `getCurrentTime`. Sie können sich auf die [offizielle Dokumentation](https://githubcom/Cap-go/native-audio/blob/main/READMEmd/) für weitere Details zu diesen Methoden beziehen.

Das war's! Sie haben nun gelernt, wie Sie das `@capgo/native-audio` Paket verwenden, um Töne in Ihrer Capacitor-Anwendung abzuspielen.