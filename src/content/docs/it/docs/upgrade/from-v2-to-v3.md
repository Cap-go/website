---
title: Da V2 a V3
description: Come aggiornare da V2 a V3
sidebar:
  order: 4
locale: it
---

Questa documentazione spiegherà come aggiornare alla versione 3 di auto-update

## Prima migra all'ultimo tooling:

```bash
npm remove -g capgo
npm remove capacitor-updater

npm i @capgo/cli
npm i @capgo/capacitor-updater@3
npx cap sync
```

## Rimuovi tutte le tue configurazioni precedenti:

```json
{
  CapacitorUpdater: {
      autoUpdateURL: "https",
      
  },
}
```

per lasciare solo questo:

```json
{
  "CapacitorUpdater": {
    "autoUpdate": true
  }
}
```

> ⚠️ Se stavi utilizzando il tuo server con `autoUpdateURL`, aggiornerò presto questa guida per te. Nel frattempo, dai un'occhiata alla nuova opzione di upload `external` che ti permette di inviare solo il link del tuo zip, non il codice nel cloud Capgo. Questo è stato fatto per aziende con politiche sulla privacy rigorose. In modalità external, il codice non arriverà mai sul server Capgo, memorizziamo solo l'URL e lo inviamo al dispositivo, che lo scaricherà direttamente. Nel modo standard, il codice viene compresso e memorizzato nel nostro server, ma non lo apriremo né lo utilizzeremo mai

## Cosa cambia

Tutte le configurazioni diventano lato server per l'auto-update, per darti più controllo su come invii un aggiornamento agli utenti

Questo ci permette di ripristinare e persino distribuire solo a un utente con i canali! Queste impostazioni sono state aggiunte all'interfaccia web:

* disabilita il ripristino sotto il nativo
* disabilita l'aggiornamento sopra la versione major

> ⚠️ Diventeranno true di default per tutti i canali

Questo rimuoverà anche la necessità di aggiornare spesso il plugin, la maggior parte degli aggiornamenti sarà effettuata lato server e li riceverai senza alcuna modifica da parte tua

> ⚠️ Reset quando un aggiornamento diventa predefinito, quindi se preferisci non rimuovere tutte le versioni scaricate durante l'aggiornamento dallo store, fai questo:

```json
{
  "CapacitorUpdater": {
    "autoUpdate": true,
    "resetWhenUpdate": false
  }
}
```

## Aggiorna il tuo codice

Infine, aggiorna tutti i tuoi import in JS da:

```
import { CapacitorUpdater } from 'capacitor-updater'
```

a

```
import { CapacitorUpdater } from '@capgo/capacitor-updater'
```

Quindi ricompila il tuo codice `npm run build` e copia nuovamente gli asset `npx cap copy`

Ora dovresti essere in grado di testare l'ultimo sistema di auto-update

Invia la tua versione con:

```
npx @capgo/cli@latest upload
```

invece di

```
npx capgo upload
```

## Evoluzioni future

Per ora viene utilizzato solo il primo canale pubblico, in futuro, public cambierà per canali multi pubblici, se ne viene impostato più di uno

## Problemi comuni:

* Problemi di build dopo l'aggiornamento: se hai già aperto il codice sorgente del plugin in Android Studio o Xcode, a volte la sincronizzazione non li rimuove, questa è la causa del problema. Apri l'IDE nativo e rimuovi `capacitor-updater` manualmente e fai `npx cap sync` questo dovrebbe risolvere