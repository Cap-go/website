---
title: Impostazioni
description: Parametri disponibili per Capacitor Updater
sidebar:
  order: 8
locale: it
---

Per avere un controllo più preciso sul sistema di aggiornamento, puoi configurarlo con queste impostazioni:

## `appReadyTimeout`

> Configura il numero di millisecondi che il plugin nativo deve attendere prima di considerare un aggiornamento 'fallito'

Disponibile solo per Android e iOS

Predefinito: `10000` (10 secondi)

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "appReadyTimeout": 1000
    }
  }
}
```

## `responseTimeout`

> Configura il numero di millisecondi che il plugin nativo deve attendere prima di considerare il timeout dell'API

Disponibile solo per Android e iOS

Predefinito: `20` (20 secondi)

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "responseTimeout": 1000
    }
  }
}
```

## `autoDeleteFailed`

> Configura se il plugin deve eliminare automaticamente i bundle falliti

Disponibile solo per Android e iOS

Predefinito: `true`

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "autoDeleteFailed": false
    }
  }
}
```

## `autoDeletePrevious`

> Configura se il plugin deve eliminare automaticamente i bundle precedenti dopo un aggiornamento riuscito

Disponibile solo per Android e iOS

Predefinito: `true`

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "autoDeletePrevious": false
    }
  }
}
```

## `autoUpdate`

> Configura se il plugin deve utilizzare l'aggiornamento automatico tramite un server di aggiornamento

Disponibile solo per Android e iOS

Predefinito: `true`

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": false
    }
  }
}
```

## `updateUrl`

> Configura l'URL / endpoint a cui vengono inviati i controlli degli aggiornamenti

Disponibile solo per Android e iOS

Predefinito: `https://apicapgoapp/updates`

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "updateUrl": "https://examplecom/api/updates"
    }
  }
}
```

## `statsUrl`

> Configura l'URL / endpoint a cui vengono inviate le statistiche degli aggiornamenti

Disponibile solo per Android e iOS. Impostare a "" per disabilitare il reporting delle statistiche

Predefinito: `https://apicapgoapp/stats`

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "statsUrl": "https://examplecom/api/stats"
    }
  }
}
```

## `privateKey`

> Configura la chiave privata per la crittografia end-to-end degli aggiornamenti in tempo reale

Disponibile solo per Android e iOS

Crea la chiave privata con il comando `npx @capgo/cli key create`

Predefinito: `undefined`

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "privateKey": "YOUR_KEY"
    }
  }
}
```

## `directUpdate`

> Fa in modo che il plugin installi direttamente l'aggiornamento quando l'app è stata appena aggiornata/installata. Applicabile solo per la modalità autoUpdate

Disponibile solo per Android e iOS

Predefinito: `undefined`

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true,
      "directUpdate": true
    }
  }
}
```

## `resetWhenUpdate`

:::note
Quando si verifica un aggiornamento del negozio, disabilita il reset forzato alla versione nativa
:::

Ci sono molte altre impostazioni disponibili solo sulla [web app](https://webcapgoapp/login)

Per configurare il plugin, usa queste impostazioni:

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true,
      "resetWhenUpdate": false
    }
  }
}
```

## `directUpdate`
Fa in modo che il plugin installi direttamente l'aggiornamento quando l'app è stata appena aggiornata/installata. Applicabile solo per la modalità autoUpdate

:::caution
Questa impostazione richiede di nascondere l'app all'utente mentre l'aggiornamento viene installato. Altrimenti l'app si resetterà mentre l'utente sta navigando
:::

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true,
      "directUpdate": true
    }
  }
}
```

## `defaultChannel`
Imposta il canale predefinito per l'app. Questo sovrascriverà qualsiasi altro canale impostato in Capgo se il canale permette la sovrascrittura

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "defaultChannel": "production"
    }
  }
}
```

## `appId`
Imposta l'appId per l'app. Questo sovrascriverà qualsiasi altro modo per ottenere l'appId. Questo è utile quando vuoi avere un appId diverso in Capgo e nel tuo codice nativo
:::note
Questo è il nuovo modo per impostare l'appId. Il vecchio modo è ancora e rimarrà supportato
:::
```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "AppId": "comexampleapp"
    }
  }
}
```

## `version`
Imposta la versione per l'app. Questo sovrascriverà qualsiasi altro modo per ottenere la versione. Questo è utile quando vuoi avere una versione diversa in Capgo e nel tuo codice nativo
:::note
Questo è il nuovo modo per impostare la versione. Il vecchio modo è ancora e rimarrà supportato
:::
```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "version": "123"
    }
  }
}
```