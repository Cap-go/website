---
slug: how-to-segment-users-by-plan-and-channels
title: Cómo usar canales para las banderas de funciones y pruebas A/B
description: >-
  Aprenda a utilizar os canais do CapGo para flags de recursos e testes A/B,
  auto-atribuindo usuários ou utilizando seu backend.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2025-04-15T00:00:00.000Z
updated_at: 2025-04-15T00:00:00.000Z
head_image: /capgo-feature-image.webp
head_image_alt: Capgo kanalları özellik bayrakları illüstrasyonu
keywords: 'channels, feature flags, a/b testing, capacitor, capgo'
tag: Tutorial
published: true
locale: it
next_blog: ''
---
# Come Utilizzare i Canali per Flag delle Funzionalità e A/B Testing

Il sistema di canali di CapGo fornisce un modo flessibile per segmentare gli utenti e controllare l'accesso alle funzionalità. Anche se CapGo non ha una gestione dei piani integrata o A/B testing, puoi implementare queste funzionalità gestendo tu stesso le assegnazioni dei canali.

## Comprendere i Canali

I canali in CapGo ti permettono di:
- Mirare a specifici gruppi di utenti con funzionalità diverse
- Eseguire A/B test assegnando utenti a diversi canali
- Rilasciare gradualmente nuove funzionalità
- Creare programmi di beta testing

## Metodi di Assegnazione dei Canali

### 1. Assegnazione Backend (Raccomandato)

Questo è il metodo più sicuro. Comporta:
1. Ottenere l'ID del dispositivo dall'updater
2. Inviarlo al tuo backend
3. Il tuo backend chiama l'API di CapGo per assegnare il dispositivo

Ecco come implementarlo:

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater'

// Get device ID
const getDeviceId = async () => {
  const { deviceId } = await CapacitorUpdater.getDeviceId()
  return deviceId
}

// Send device ID to your backend
const assignToChannel = async (channel: string) => {
  const deviceId = await getDeviceId()
  // Your backend will call CapGo API to assign the device
  await yourBackend.assignDeviceToChannel(deviceId, channel)
}
```

### Implementazione Backend

Il tuo backend deve:
1. Ottenere una chiave API dal dashboard di CapGo
2. Chiamare l'API di CapGo per assegnare il dispositivo a un canale

Per ottenere la tua chiave API:
1. Accedi al tuo dashboard di CapGo
2. Vai a Impostazioni > Chiavi API
3. Clicca "Genera Nuova Chiave"
4. Seleziona la modalità `all` per gestire i dispositivi e i canali
5. Copia la chiave generata e conservala in modo sicuro nelle variabili d'ambiente del tuo backend
   - La chiave sarà una stringa esadecimale di 32 caratteri
   - È una chiave segreta che non dovrebbe mai essere esposta nel codice lato client

Ecco un esempio in Node.js:

```typescript
import axios from 'axios'

const CAPGO_API_KEY = 'your_api_key'
const CAPGO_API_URL = 'https://api.capgo.app'

async function assignDeviceToChannel(deviceId: string, channel: string) {
  try {
    const response = await axios.post(
      `${CAPGO_API_URL}/device`,
      {
        app_id: 'YOUR_APP_ID',
        device_id: deviceId,
        channel: channel
      },
      {
        headers: {
          'authorization': CAPGO_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('Failed to assign device to channel:', error)
    throw error
  }
}
```

Il backend dovrebbe anche:
- Validare i permessi dell'utente
- Registrare tutte le assegnazioni dei canali
- Gestire il rate limiting
- Implementare la logica di ripetizione per le assegnazioni non riuscite

### 2. Auto-Assegnazione (Meno Sicura)

Questo metodo consente ai dispositivi di assegnarsi direttamente a un canale. È utile per i test ma meno sicuro per la produzione:

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater'

// Assign device to channel
const assignToChannel = async (channel: string) => {
  await CapacitorUpdater.setChannel(channel)
}

// Get current channel
const getCurrentChannel = async () => {
  const { channel } = await CapacitorUpdater.getChannel()
  return channel
}
```

Prima che gli utenti possano auto-assegnarsi a un canale, è necessario abilitare questa funzione nel dashboard di CapGo:

1. Vai alla sezione Canali nel tuo dashboard di CapGo
2. Clicca sul nome del canale che vuoi gestire
3. Nelle impostazioni del canale, abilita "Consenti ai dispositivi di auto-associarsi"
4. Salva le modifiche

Se questa impostazione è falsa, qualsiasi tentativo di chiamare `setChannel` con questo canale fallirà.

## Implementazione dei Flag delle Funzionalità

Utilizza i canali per controllare l'accesso alle funzionalità:

```typescript
const isFeatureEnabled = async (feature: string) => {
  // Example: Check if user is in beta channel
  const channel = await getCurrentChannel()
  return channel === 'beta'
}
```

## Implementazione dell'A/B Testing

Esegui A/B test assegnando utenti a diversi canali:

```typescript
const assignToABTest = async (userId: string) => {
  // Use consistent hashing to assign users
  const hash = await hashUserId(userId)
  const variant = hash % 2 === 0 ? 'variant-a' : 'variant-b'
  
  await assignToChannel(variant)
  return variant
}
```

## Migliori Pratiche

1. **Utilizza l'Assegnazione Backend**: Per la produzione, utilizza sempre il metodo di assegnazione backend
2. **Assegnazione Coerente**: Utilizza ID utente o altri identificatori stabili per un'assegnazione coerente dei canali
3. **Monitoraggio**: Tieni traccia dell'uso delle funzionalità e delle metriche di performance per ogni canale
4. **Rilasci Graduali**: Inizia con piccoli segmenti di utenti e espandi gradualmente
5. **Documentazione Chiara**: Documenta la tua strategia e i tuoi scopi dei canali

## Conclusione

Sfruttando il sistema di canali di CapGo, puoi creare esperienze app più personalizzate e eseguire A/B test. Per l'uso in produzione, preferisci sempre il metodo di assegnazione backend per una maggiore sicurezza e controllo.

Per ulteriori dettagli sulla gestione dei canali, dai un'occhiata alla nostra [documentazione sui canali](/docs/live-updates/channels/).
