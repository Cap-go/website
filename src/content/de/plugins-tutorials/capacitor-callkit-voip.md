---
locale: de
---

sing @capgo/capacitor-callkit-voip Paket

Das `@capgo/capacitor-callkit-voip` Paket bietet PushKit-Funktionalität für Ionic Capacitor. Es ist dafür konzipiert, mit der BetterCall-App verwendet zu werden, kann jedoch auch in anderen Projekten eingesetzt werden.

## Installation

Um das Paket zu installieren, können Sie den folgenden Befehl ausführen:

```bash
npm install @capgo/capacitor-callkit-voip
ionic cap sync
```

Bitte stellen Sie sicher, dass Sie Xcode auf Ihrem Computer installiert haben, bevor Sie mit der Installation fortfahren.

## Konfigurieren des iOS-Projekts

Um Ihr iOS-Projekt so zu konfigurieren, dass es das Paket verwendet, folgen Sie diesen Schritten:

1. Öffnen Sie Ihr Xcode-Projekt und gehen Sie zum Bereich "Capabilities".
2. Aktivieren Sie die Fähigkeit "Voice over IP", indem Sie das Kontrollkästchen auswählen.
3. Registrieren Sie Ihr Zertifikat auf der Apple Developer-Website. Detaillierte Anleitungen finden Sie im bereitgestellten Link.
4. Laden Sie das Zertifikat herunter und öffnen Sie es, um es in die Keychain Access-App zu importieren.
5. Exportieren Sie die Zertifikate wie im bereitgestellten Bild gezeigt.
6. Navigieren Sie zu dem Ordner, in den Sie die Datei exportiert haben, und führen Sie den folgenden Befehl im Terminal aus:

```bash
openssl pkcs12 -in YOUR_CERTIFICATES.p12 -out app.pem -nodes -clcerts
```

Dies wird eine `apppem` Zertifikatsdatei erstellen, die verwendet werden kann, um VOIP-Benachrichtigungen zu senden.

## Verwendung

Sobald das Paket installiert und das iOS-Projekt konfiguriert ist, können Sie es in Ihrem Code verwenden.

Zuerst importieren Sie das `CallKitVoip` Modul:

```typescript
import { CallKitVoip } from "@capgo/capacitor-callkit-voip";
```

Als nächstes müssen Sie die Methode `register()` aufrufen, um die Registrierung von VOIP-Benachrichtigungen zu starten:

```typescript
async function registerVoipNotification() {
  // Register token
  CallKitVoip.addListener("registration", ({ token }) => {
    console.log(`VOIP token has been received ${token}`);
  });

  // Handle incoming call
  CallKitVoip.addListener("callAnswered", ({ username, connectionId }) => {
    console.log(`Call has been received from ${username} (connectionId: ${connectionId})`);
  });

  // Init plugin, start registration of VOIP notifications
  await CallKitVoip.register();
  console.log("Push notification has been registered");
}
```

Um eine VOIP-Benachrichtigung zu senden, können Sie das bereitgestellte `sendVoipsh` Skript verwenden:

```shell
#!/bin/bash

function main {
    connectionId=${1:?"connectionId should be specified"}
    token=${2:?"Enter device token that you received on register listener"}
    username=${3:-Anonymus"}

    curl -v \
    -d "{\"aps\":{\"alert\":\"Incoming call\", \"content-available\":\"1\"}, \"Username\": \"${username}\", \"ConnectionId\": \"${connectionId}\"}" \
    -H "apns-topic: .voip" \
    -H "apns-push-type: voip" \
    -H "apns-priority: 10" \
    --http2 \
    --cert app.pem \
    "https://api.development.push.apple.com/3/device/${token}"
}

main $@
```

## Fazit

Das `@capgo/capacitor-callkit-voip` Paket ermöglicht es Ihnen, PushKit-Funktionalität zu Ihrem Ionic Capacitor-Projekt hinzuzufügen. Wenn Sie die Installations- und Verwendungshinweise befolgen, werden Sie in der Lage sein, VOIP-Benachrichtigungen in Ihrer App zu senden und zu empfangen.