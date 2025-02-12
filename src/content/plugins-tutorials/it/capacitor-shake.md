---
locale: it
---

cantare @capgo/capacitor-shake

Il pacchetto `@capgo/capacitor-shake` ti consente di rilevare gesture di scuotimento su un dispositivo. Ecco un tutorial su come usare questo pacchetto nella tua app Capacitor.

## Installazione

Per installare il pacchetto, esegui il seguente comando:

```bash
npm install @capgo/capacitor-shake
npx cap sync
```

## Aggiungi il Listener

Per rilevare le gesture di scuotimento, devi aggiungere un listener per l'evento `shake`. Ecco un esempio di come farlo:

```typescript
import { Plugins } from '@capacitor/core';

const { CapacitorShake } = Plugins;

CapacitorShake.addListener('shake', () => {
  console.log('Shake gesture detected!');
});
```

In questo esempio, importiamo il plugin `CapacitorShake` da `@capacitor/core` e utilizziamo il metodo `addListener` per aggiungere un listener per l'evento `shake`. Quando viene rilevata la gesture di scuotimento, verrà eseguita la funzione di callback.

## Rimuovi il Listener

Se vuoi rimuovere il listener dell'evento `shake`, puoi utilizzare il metodo `removeAllListeners`:

```typescript
import { Plugins } from '@capacitor/core';

const { CapacitorShake } = Plugins;

CapacitorShake.removeAllListeners('shake');
```

In questo esempio, utilizziamo il metodo `removeAllListeners` per rimuovere tutti i listener per l'evento `shake`.

Questo è tutto! Hai integrato con successo il pacchetto `@capgo/capacitor-shake` nella tua app Capacitor. Ora puoi rilevare le gesture di scuotimento sul dispositivo.