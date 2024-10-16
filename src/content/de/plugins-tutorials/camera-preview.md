---
locale: de
---

capgo/camera-preview Paket Tutorial

In diesem Tutorial werden wir die Schritte durchgehen, um das `@capgo/camera-preview` Paket in Ihrem Capacitor-Projekt zu verwenden. Dieses Paket ermöglicht es Ihnen, von Ihrem JavaScript- und HTML-Code aus mit der Kamera zu interagieren.

## Installation

Um das `@capgo/camera-preview` Paket zu installieren, öffnen Sie Ihr Terminal und führen Sie einen der folgenden Befehle aus:

```bash
yarn add @capgo/camera-preview
```

oder

```bash
npm install @capgo/camera-preview
```

Nach Abschluss der Installation führen Sie den folgenden Befehl aus, um Ihr Capacitor-Projekt zu synchronisieren:

```bash
npx cap sync
```

### Zusätzliche Schritte zur Installation für Android

Wenn Sie Android verwenden, müssen Sie einige zusätzliche Änderungen an Ihrem Projekt vornehmen. Öffnen Sie die Datei `android/app/src/main/AndroidManifest.xml` und fügen Sie die folgende Zeile über dem schließenden `</application>`-Tag hinzu, um die CAMERA-Berechtigung anzufordern:

```xml
<uses-permission android:name="android.permission.CAMERA" />
```

Für weitere Hilfe verweisen Sie auf die [Capacitor-Dokumentation](https://capacitorjscom/docs/android/configuration/#configuring-androidmanifestxml/)

### Zusätzliche Schritte zur Installation für iOS

Wenn Sie iOS verwenden, müssen Sie zwei Berechtigungen zu Ihrer `Info.plist`-Datei hinzufügen. Folgen Sie der [Capacitor-Dokumentation](https://capacitorjscom/docs/ios/configuration/#configuring-infoplist) und fügen Sie die Berechtigungen `NSCameraUsageDescription` und `NSMicrophoneUsageDescription` hinzu. Die Berechtigung `NSMicrophoneUsageDescription` ist nur erforderlich, wenn Sie Audio verwenden möchten. Wenn Sie kein Audio benötigen, können Sie die Option `disableAudio` auf `true` setzen, um die Anforderung der Mikrofonberechtigung zu deaktivieren.

### Zusätzliche Schritte zur Installation für Web

Wenn Sie die Webplattform mit Ionic verwenden, fügen Sie die folgende Zeile zu Ihrem Einstiegsskript in `app.module.ts` hinzu:

```typescript
import '@capgo/camera-preview';
```

Dies ermöglicht es Capacitor, die Webplattform über das Plugin zu registrieren.

## API

Das `@capgo/camera-preview` Paket bietet die folgenden API-Methoden:

### start(options: CameraPreviewOptions)

Startet die Instanz der Kameraansicht

### stop()

Stoppt die Instanz der Kameraansicht

### capture(options: CameraPreviewPictureOptions)

Macht ein Bild von der Kamera

### captureSample(options: CameraSampleOptions)

Erfasst ein Beispielbild

### getSupportedFlashModes()

Erhält die unterstützten Blitzmodi

### getHorizontalFov()

Erhält das horizontale Sichtfeld

### setFlashMode(options: { flashMode: CameraPreviewFlashMode | string; })

Setzt den Blitzmodus

### flip()

Dreht die Kamera

### setOpacity(options: CameraOpacityOptions)

Setzt die Kameratransparenz

### stopRecordVideo()

Stoppt die Videoaufnahme

### startRecordVideo(options: CameraPreviewOptions)

Beginnt mit der Videoaufnahme

Für weitere Details zu den Parametern und Rückgabewerten dieser Methoden verweisen Sie auf die Dokumentation des `@capgo/camera-preview` Pakets.

## Fazit

In diesem Tutorial haben wir gelernt, wie man das `@capgo/camera-preview` Paket in einem Capacitor-Projekt installiert und verwendet. Wir haben die verfügbaren API-Methoden und deren Nutzung erkundet. Jetzt können Sie die Kamerafunktionalität in Ihre Anwendung integrieren, indem Sie dieses Paket verwenden.