---
slug: update-your-capacitor-apps-seamlessly-using-capacitor-updater
title: Aggiorna le tue app Capacitor senza interruzioni utilizzando Capacitor-updater
description: >-
  Saluti alla Community Ionic Capacitor, oggi vi aiuterò a configurare
  Capacitor-updater nella vostra app. In modo da poter effettuare rilasci senza
  interruzioni.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-02-27T00:00:00.000Z
updated_at: 2025-10-31T17:55:22.000Z
head_image: /update_flow.webp
head_image_alt: Capacitor Dev alla ricerca di alternative
keywords: >-
  Capacitor, mobile app development, live updates, OTA updates, continuous
  integration, mobile app updates
tag: Tutorial
published: true
locale: it
next_blog: ''
---
## Cos'è Capacitor-updater?

Capacitor-updater, una tecnologia che aiuta nella distribuzione di aggiornamenti e miglioramenti delle app agli utenti finali istantaneamente.

Questo è particolarmente utile se vuoi fare correzioni di bug critici e distribuirle istantaneamente senza passare attraverso le revisioni dell'App Store.

Puoi pensarlo come un'agilità "simile al web" nel caricare lateralmente gli aggiornamenti non appena sono disponibili.

Inoltre, fornisce rollback se il nuovo aggiornamento causa il crash dell'app

## Come funziona?

Capgo mantiene il bundle JavaScript della tua app sincronizzato con il server Capgo, e ogni volta che l'utente apre l'app, verifica con il server Capgo se è disponibile un nuovo aggiornamento per il bundle. E naturalmente, viene fornito con tonnellate di configurazioni fantastiche che possono aiutarti a perfezionare l'esperienza dei tuoi utenti.

Uso Capgo in tutti i progetti che costruisco. Questo mi permette di dedicare meno tempo al processo di revisione dell'App Store.

Puoi leggerne di più [qui](https://capgo.app/).

## Ci sono limitazioni?

Per quanto possa sembrare buono, ci sono alcune cose che dobbiamo tenere a mente.
La prima cosa è che gli aggiornamenti OTA __funzionano solo con i bundle web__.
Potresti pensare che questa non sia davvero una grande limitazione perché, in Capacitor JS, scriviamo quasi tutto il codice in JS CSS e HTML.
Mentre questo può essere vero, ci sono ancora moduli nativi che installiamo nella nostra app.
Se un modulo modifica le tue directory android o iOS, non puoi usare OTA per aggiornare la tua app.
Questo perché i contenuti di queste directory vengono utilizzati per compilare i binari nativi, che OTA non può aggiornare.
Nemmeno l'app nativa può aggiornare questa parte.

Ma puoi configurare il tuo CI/CD per gestire questa parte, ho fatto un tutorial su come farlo [qui per IOS](https://capgo.app/blog/automatic-capacitor-android-build-github-action/).

## Configurazione automatica di Capgo

È il momento di registrarsi e ottenere la tua chiave API per caricare la tua prima versione! Inizia [registrandoti per un account Capgo](/register/).

Una volta effettuato l'accesso a Capgo, avrai una pagina di onboarding

![Pagina di onboarding](/onboarding_1_new.webp)

Segui i passaggi nella pagina di onboarding per aggiungere la tua prima app.

### Segui la guida CLI

Da una riga di comando, direttamente nella root della tua app Capacitor, esegui:

`npx @capgo/cli@latest init`
Per installare Capgo nella tua app Capacitor, la CLI ti guiderà attraverso il processo di configurazione della tua app con Capgo.

Se vuoi farlo manualmente, puoi seguire i passaggi seguenti.

## Configurazione manuale di Capgo

### Installa il plugin

Dovresti ritrovarti con questo codice aggiunto alla tua app:

`npm i @capgo/capacitor-updater && npx cap sync`
Per installare il plugin nella tua app Capacitor.

E poi aggiungi alla tua app questo codice per notificare al plugin nativo che il bundle JS è sano (se non lo fai, il plugin nativo tornerà alla versione precedente):

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Questo dirà al plugin nativo che l'installazione è riuscita.

Poi esegui `npm run build && npx cap copy` per aggiornare la tua app.

### Accedi a Capgo CLOUD

Prima, usa la [apikey](https://console.capgo.app/dashboard/apikeys/) `all` presente nel tuo account per accedere con la CLI:

`npx @capgo/cli@latest login YOU_KEY`

### Aggiungi la tua prima app

Iniziamo creando prima un'app in Capgo Cloud con la CLI.

`npx @capgo/cli@latest app add`

Questo comando utilizzerà tutte le variabili definite nel file di configurazione Capacitor per creare l'app.

### Carica la tua prima versione

Esegui il comando per buildare il tuo codice e inviarlo a Capgo con:
`npx @capgo/cli@latest bundle upload`

Per impostazione predefinita, il nome della versione sarà quello nel tuo file `package.json`.

Controlla in [Capgo](https://console.capgo.app/) se la build è presente.

Puoi anche testarla con la mia [app sandbox mobile](https://capgo.app/app_mobile/).

### Rendi il canale predefinito

Dopo aver inviato la tua app a Capgo, devi rendere il tuo canale `default` per permettere alle app di ricevere aggiornamenti da Capgo.

`npx @capgo/cli@latest channel set production -s default`

## Ricevi un aggiornamento Live su un dispositivo

Affinché la tua applicazione riceva un aggiornamento live da Deploy, dovrai eseguire l'app su un dispositivo o un emulatore. Il modo più semplice per farlo è semplicemente usare il seguente comando per lanciare la tua app locale in un emulatore o un dispositivo collegato al tuo computer.

    npx cap run [ios | android]

Apri l'app, mettila in background e aprila di nuovo, dovresti vedere nei log che l'app ha fatto l'aggiornamento.

Congratulazioni! 🎉 Hai distribuito con successo il tuo primo aggiornamento Live. Questo è solo l'inizio di ciò che puoi fare con gli aggiornamenti Live. Per saperne di più, visualizza la [documentazione completa degli aggiornamenti Live](/docs/plugin/cloud-mode/getting-started/).

> Se hai bisogno di interrompere la ricezione degli aggiornamenti in locale esegui questo comando
`npx @capgo/cli@latest channel set`
