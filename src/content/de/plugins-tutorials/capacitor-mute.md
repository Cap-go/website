---
locale: de
---

sing @capgo/capacitor-mute Paket

Das `@capgo/capacitor-mute` Paket ist ein Capacitor-Plugin, das es Ihnen ermöglicht zu erkennen, ob der Stummschalter auf einem Gerät aktiviert oder deaktiviert ist. Es bietet eine einfache API zur Überprüfung des Stummschaltungsstatus des Geräts.

## Installation

Sie können das `@capgo/capacitor-mute` Paket mit npm installieren:

```bash
npm install @capgo/capacitor-mute
npx cap sync
```

## Verwendung

Um das `@capgo/capacitor-mute` Paket zu verwenden, müssen Sie es importieren und die Methode `isMuted()` aufrufen.

```typescript
import { isMuted } from '@capgo/capacitor-mute';

isMuted().then((result) => {
  console.log('Mute status:', result);
}).catch((error) => {
  console.error('Error checking mute status:', error);
});
```

Die Methode `isMuted()` gibt ein Versprechen zurück, das zu einem booleschen Wert aufgelöst wird, der angibt, ob das Gerät stummgeschaltet ist oder nicht. Wenn das Versprechen abgelehnt wird, wird eine Fehlermeldung angezeigt.

## Beispiel

Hier ist ein Beispiel, wie Sie das `@capgo/capacitor-mute` Paket verwenden können, um den Stummschaltungsstatus des Geräts zu überprüfen und eine Nachricht basierend auf dem Ergebnis anzuzeigen.

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

In diesem Beispiel wird, wenn das Gerät stummgeschaltet ist, die Nachricht "Das Gerät ist derzeit stummgeschaltet" angezeigt. Wenn das Gerät nicht stummgeschaltet ist, wird die Nachricht "Das Gerät ist nicht stummgeschaltet" angezeigt.

## Mögliche Probleme

Bitte beachten Sie, dass das `@capgo/capacitor-mute` Paket auf iOS-Geräten mit Xcode 14 möglicherweise nicht wie von Apple erwartet konfiguriert ist. Dieses Problem wird derzeit von den Entwicklern des Pakets bearbeitet. Um dieses Problem zu lösen, können Sie die in der [bekannten Problematik](https://githubcom/CocoaPods/CocoaPods/issues/8891/) des Handbuchs des Pakets bereitgestellten Anweisungen folgen.

## Fazit

Das `@capgo/capacitor-mute` Paket ist ein nützliches Capacitor-Plugin, das es Ihnen ermöglicht, den Stummschaltungsstatus eines Geräts zu erkennen. Indem Sie die im Tutorial beschriebenen Installations- und Nutzungsschritte befolgen, können Sie dieses Paket einfach in Ihr Capacitor-Projekt integrieren und dessen API zur Überprüfung des Stummschaltungsstatus nutzen.