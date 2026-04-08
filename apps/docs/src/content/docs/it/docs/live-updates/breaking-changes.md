---
title: "Modifiche Incompatibili"
description: "Come gestire modifiche incompatibili con canali versionati"
locale: it
sidebar:
  order: 6
---

Questa documentazione spiega come gestire modifiche incompatibili nella tua app utilizzando canali versionati. Questo approccio ti consente di mantenere diverse versioni della tua app assicurando che gli utenti ricevano aggiornamenti compatibili.

## Scenario di Esempio

Diciamo che hai:
- App versione 1.2.3 (vecchia versione) - usa canale production
- App versione 2.0.0 (nuova versione con modifiche incompatibili) - usa canale v2
- Aggiornamento live 1.2.4 (compatibile con 1.2.3)
- Aggiornamento live 2.0.1 (compatibile con 2.0.0)

## Strategia: Usa Sempre defaultChannel per Versioni Maggiori

**Approccio consigliato:** Imposta un `defaultChannel` per ogni versione maggiore. Questo assicura che tu possa sempre inviare aggiornamenti a gruppi specifici di utenti senza fare affidamento sull'assegnazione dinamica dei canali.

```ts
// Release versione 1.x
defaultChannel: 'v1'

// Release versione 2.x
defaultChannel: 'v2'

// Release versione 3.x (futuro)
defaultChannel: 'v3'
```

:::tip
**Vantaggi di questo approccio:**
- **Hai sempre il controllo** su quali utenti ricevono aggiornamenti
- **Nessun cambio dinamico di canale** necessario nel codice della tua app
- **Separazione chiara** tra diverse versioni dell'app
- **Flessibilità** di inviare aggiornamenti a qualsiasi gruppo di versioni specifico
:::

## 1. Crea Canale per Nuova Versione

```bash
# Crea canale per versione 2.x
npx @capgo/cli channel create v2
```

## 2. Aggiorna Configurazione Capacitor per Versione 2.0.0

Aggiorna la tua configurazione Capacitor prima di compilare la versione 2.0.0 per l'app store:

```ts
// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Example App',
  plugins: {
    CapacitorUpdater: {
      // ... altre opzioni
      defaultChannel: 'v2' // Tutti gli utenti 2.0.0 useranno il canale v2
    }
  }
};

export default config;
```

:::note
**Per versione 1.x:** Se non hai impostato inizialmente un `defaultChannel`, gli utenti versione 1.x sono sul canale `production`. Per future versioni maggiori, imposta sempre un canale specifico come `v3`, `v4`, ecc.
:::

## 3. Gestisci Branch di Codice Separati

Crea branch git separati per mantenere la compatibilità tra versioni app:

```bash
# Crea e mantieni un branch per aggiornamenti versione 1.x
git checkout -b v1-maintenance
git push origin v1-maintenance

# Il tuo branch main continua con sviluppo versione 2.x
git checkout main
```

:::warning
**Critico:** Non inviare mai bundle JavaScript ad app vecchie che si aspettano codice/API native che non hanno. Compila sempre aggiornamenti dal branch appropriato:
- **branch v1-maintenance**: Per aggiornamenti ad app 1.x (canale production)
- **branch main**: Per aggiornamenti ad app 2.x (canale v2)
:::

## 4. Carica Bundle ai Rispettivi Canali

```bash
# Per aggiornamenti 1.x: Compila dal branch v1-maintenance
git checkout v1-maintenance
# Fai le tue modifiche compatibili 1.x qui
npx @capgo/cli bundle upload --channel production

# Per aggiornamenti 2.x: Compila dal branch main
git checkout main
# Fai le tue modifiche 2.x qui
npx @capgo/cli bundle upload --channel v2
```

## 5. Abilita Auto-Assegnazione

```bash
# Permetti alle app di auto-assegnarsi al canale v2
npx @capgo/cli channel set v2 --self-assign
```

## 6. Distribuisci su App Store

Compila e distribuisci versione 2.0.0 sull'app store. Tutti gli utenti che scaricano questa versione (sia nuovi utenti che utenti esistenti che aggiornano) useranno automaticamente il canale v2 perché è configurato nel bundle dell'app.

:::note
**Nessuna modifica codice necessaria!** Poiché `defaultChannel: 'v2'` è incluso nella versione app store, tutti gli utenti che scaricano versione 2.0.0 useranno automaticamente il canale corretto.
:::

## Scalare a Versioni Future

Quando rilasci versione 3.0.0 con più modifiche incompatibili:

```bash
# Crea canale per versione 3.x
npx @capgo/cli channel create v3
```

```ts
// capacitor.config.ts per versione 3.0.0
const config: CapacitorConfig = {
  // ...
  plugins: {
    CapacitorUpdater: {
      defaultChannel: 'v3' // Utenti versione 3.x
    }
  }
};
```

Ora puoi inviare aggiornamenti a qualsiasi versione:
- Canale `production` → Utenti versione 1.x
- Canale `v2` → Utenti versione 2.x
- Canale `v3` → Utenti versione 3.x

## 7. Pulizia (Dopo Migrazione)

Una volta che tutti gli utenti sono migrati alla versione 2.x (conta 3-4 mesi):

1. Rimuovi `defaultChannel` dalla tua configurazione Capacitor
2. Elimina il canale v2:

```bash
npx @capgo/cli channel delete v2
```

3. Elimina il branch v1-maintenance:

```bash
git branch -d v1-maintenance
git push origin --delete v1-maintenance
```

:::tip
Questo approccio assicura che gli utenti ricevano solo aggiornamenti compatibili con la loro versione app
:::

:::warning
Testa sempre gli aggiornamenti accuratamente in ogni canale prima del deployment
:::

:::note
Puoi eliminare in sicurezza il canale v2 in Capgo anche se alcuni utenti hanno ancora la sovrascrittura del canale. Riceveranno automaticamente aggiornamenti dal canale production invece.
:::

## Mantenere Aggiornamenti Versione 1.x

Per inviare aggiornamenti compatibili con versione 1.x:

1. Passa al branch v1-maintenance:
```bash
git checkout v1-maintenance
```

2. Fai le tue modifiche e committa:
```bash
# Fai modifiche compatibili 1.x
git add .
git commit -m "Fix per v1.x"
git push origin v1-maintenance
```

3. Compila e carica al canale production:
```bash
npx @capgo/cli bundle upload --channel production
```

:::tip
Mantieni il tuo branch v1-maintenance aggiornato con correzioni di bug compatibili con versione 1.x, ma non fare mai merge di modifiche incompatibili da main
:::
