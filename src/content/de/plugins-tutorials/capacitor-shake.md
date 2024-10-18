---
locale: de
---

sing @capgo/capacitor-shake

Das `@capgo/capacitor-shake` Paket ermöglicht es Ihnen, Schüttelgesten auf einem Gerät zu erkennen. Hier ist ein Tutorial, wie Sie dieses Paket in Ihrer Capacitor-App verwenden können.

## Installation

Um das Paket zu installieren, führen Sie den folgenden Befehl aus:

```bash
npm install @capgo/capacitor-shake
npx cap sync
```

## Fügen Sie den Listener hinzu

Um Schüttelgesten zu erkennen, müssen Sie einen Listener für das `shake` Ereignis hinzufügen. Hier ist ein Beispiel, wie es geht:

```typescript
import { Plugins } from '@capacitor/core';

const { CapacitorShake } = Plugins;

CapacitorShake.addListener('shake', () => {
  console.log('Shake gesture detected!');
});
```

In diesem Beispiel importieren wir das `CapacitorShake` Plugin von `@capacitor/core` und verwenden die Methode `addListener`, um einen Listener für das `shake` Ereignis hinzuzufügen. Wenn die Schüttelgeste erkannt wird, wird die Callback-Funktion ausgeführt.

## Entfernen Sie den Listener

Wenn Sie den `shake` Ereignis-Listener entfernen möchten, können Sie die Methode `removeAllListeners` verwenden:

```typescript
import { Plugins } from '@capacitor/core';

const { CapacitorShake } = Plugins;

CapacitorShake.removeAllListeners('shake');
```

In diesem Beispiel verwenden wir die Methode `removeAllListeners`, um alle `shake` Ereignis-Listener zu entfernen.

Das war's! Sie haben das `@capgo/capacitor-shake` Paket erfolgreich in Ihre Capacitor-App integriert. Sie können jetzt Schüttelgesten auf dem Gerät erkennen.