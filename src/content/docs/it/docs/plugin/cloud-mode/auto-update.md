---
title: Pembaruan Otomatis
description: How To Use Auto Updates With Capacitor-updater
sidebar:
  order: 2
locale: it
---

Questa modalità consente agli sviluppatori di utilizzare capacitor-updater in modalità di aggiornamento automatico e inviare aggiornamenti tramite canali Capgo o equivalenti

### Prerequisiti

Assicurati che la versione della tua app utilizzi [https://semverorg/](https://semverorg/) prima di utilizzare l'aggiornamento automatico di Capgo

Questa è la convenzione utilizzata per gestire le versioni in Capgo

Ci sono due modi per impostare la versione nella tua app:

Nuovo modo: Usa il campo `version` nel file `capacitorconfigjson`

```json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true, // Abilita l'aggiornamento automatico, true di default
      "appId": "comexampleapp", // Utilizzato per identificare l'app nel server
      "version": "100" // Utilizzato per verificare gli aggiornamenti
    }
  }
}
```
Queste opzioni verranno utilizzate dal plugin per verificare gli aggiornamenti e dalla CLI per caricare la versione

Vecchio modo:
In 3 file nel tuo progetto:

* `packagejson` in **version**
* `android/app/buildgradle` in **versionName**
* `ios/App/Appxcodeproj/projectpbxproj` in **CURRENT\_PROJECT\_VERSION**

### Tutorial

Configura la tua app in 5 minuti

[Aggiorna le tue app Capacitor senza problemi utilizzando capacitor updater](https://capgoapp/blog/update-your-capacitor-apps-seamlessly-using-capacitor-updater)

Configura il tuo CI in 5 minuti

[Build e rilascio automatico con GitHub actions](https://capgoapp/blog/automatic-build-and-release-with-github-actions)

### Installazione

```bash
npm install @capgo/capacitor-updater
npx cap sync
```

### Introduzione

Clicca su [registrati](https://capgoapp) per creare il tuo account

Il server ti permette di gestire canali, versioni e molto altro

`autoUpdate` utilizzerà i dati da `capacitorconfig` per identificare il server Capgo

:::note
Puoi ancora utilizzare Capgo Cloud senza inviare il tuo codice ai nostri server se ciò non è consentito dalla tua azienda
:::

#### Convalida versione

Quando l'aggiornamento automatico è configurato, devi notificare da JS che la tua app è attiva e pronta

Questo può essere fatto chiamando `notifyAppReady` all'interno della tua app

Fallo il prima possibile

```ts
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdaternotifyAppReady()
```

#### Flusso utente
* L'utente apre l'app, l'app chiama il server per verificare gli aggiornamenti, se ne vengono trovati verranno scaricati in background
* L'utente esce dall'app, la nuova versione viene impostata come attiva
* L'utente riapre l'app, carichiamo la nuova versione attiva e la impostiamo come predefinita
* Se viene chiamato `notifyAppReady()`, quando l'utente esce dall'app, la versione precedente viene eliminata
* L'utente continua il normale flusso dell'app fino al prossimo ciclo di aggiornamento

:::danger
⚠️ Non chiamare `notifyAppReady()` nella tua app farà sì che la versione corrente venga contrassegnata come non valida e tornerà al bundle precedente valido o stock
:::

#### Flusso sviluppatore

Quando sviluppi nuove funzionalità, assicurati di bloccare `autoUpdate`, poiché capgo sovrascriverà costantemente il tuo lavoro con l'ultimo bundle di aggiornamento
Imposta `autoUpdate` su false nella tua configurazione 
Se per qualche motivo sei bloccato su un aggiornamento, puoi eliminare l'app e reinstallarla
Assicurati di impostare `autoUpdate` su false nella tua configurazione prima di farlo
E poi ricompilala di nuovo con Xcode o Android studio

Per caricare la versione ad ogni commit configura CI/CD con questa guida

[Build e rilascio automatico con GitHub actions](https://capgoapp/blog/automatic-build-and-release-with-github-actions)

#### Evento Major Available

Quando `disableAutoUpdateBreaking` è impostato su true, puoi ascoltare l'evento per sapere quando l'app rifiuta di fare un aggiornamento major breaking

```jsx
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdateraddListener('majorAvailable', (info: any) => {
  consolelog('majorAvailable è stato attivato', infoversion)
})
```