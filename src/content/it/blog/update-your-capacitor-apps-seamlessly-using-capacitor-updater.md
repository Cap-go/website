---
slug: update-your-capacitor-apps-seamlessly-using-capacitor-updater
title: Aggiorna facilmente la tua app Capacitor utilizzando Capacitor-updater
description: >-
  Salve alla comunità di Capacitor Ionic, oggi vi aiuterò a configurare
  Capacitor-updater nella vostra applicazione. In questo modo, potrete
  effettuare il deployment in modo fluido.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-02-27T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /update_flow.webp
head_image_alt: Sviluppatori Capacitor alla ricerca di alternative
tag: Tutorial
published: true
locale: it
next_blog: ''
---

## Cos'è Capacitor-updater?

Capacitor-updater, una tecnologia che aiuta nella distribuzione di aggiornamenti e miglioramenti delle app agli utenti finali istantaneamente

Questo è particolarmente utile se si vogliono effettuare correzioni di bug critici e distribuirle immediatamente senza passare attraverso le revisioni dell'App Store

Puoi pensarlo come l'agilità "simile al web" di caricare aggiornamenti non appena sono disponibili

Inoltre, fornisce rollback se il nuovo aggiornamento causa il crash dell'app

## Come funziona?

Capgo mantiene il bundle JavaScript della tua app sincronizzato con il server Capgo, e ogni volta che l'utente apre l'app, verifica con il server Capgo se è disponibile un nuovo aggiornamento per il bundle E naturalmente, viene fornito con tonnellate di fantastiche configurazioni che possono aiutarti a perfezionare l'esperienza dei tuoi utenti

Uso Capgo in tutti i progetti che realizzo Questo mi permette di dedicare meno tempo al processo di revisione dell'App Store

Puoi leggere di più al riguardo [qui](https://capgoapp/)

## Ci sono limitazioni?

Per quanto possa sembrare positivo, ci sono alcune cose che dobbiamo tenere a mente
La prima cosa è che gli aggiornamenti OTA __funzionano solo con i bundle web__ 
Potresti pensare che questa non sia davvero una grande limitazione perché, in Capacitor JS, scriviamo quasi tutto il codice in JS CSS e HTML
Sebbene questo possa essere vero, ci sono ancora moduli nativi che installiamo nella nostra app
Se un modulo modifica le tue directory android o iOS, non puoi usare OTA per aggiornare la tua app
Questo perché i contenuti di queste directory vengono utilizzati per compilare i binari nativi, che OTA non può aggiornare
Nemmeno un'app nativa può aggiornare questa parte

Ma puoi configurare il tuo CI/CD per gestire questa parte, ho fatto un tutorial su come farlo [qui per IOS](https://capgoapp/blog/automatic-capacitor-ios-build-github-action/), e [qui per Android](https://capgoapp/blog/automatic-capacitor-android-build-github-action/)

## Configurazione automatica di Capgo

È il momento di registrarsi e ottenere la tua chiave API per caricare la tua prima versione! Inizia [registrando un account Capgo](/register/)

Una volta effettuato l'accesso a Capgo, avrai una pagina di onboarding 

![Pagina di onboarding](/onboarding_1_newwebp)

Segui i passaggi nella pagina di onboarding per aggiungere la tua prima app

### Segui le istruzioni della CLI

Da una riga di comando, direttamente nella radice della tua app Capacitor, esegui:

`npx @capgo/cli@latest init`
Per installare Capgo nella tua app Capacitor, la CLI ti guiderà attraverso il processo di configurazione della tua app con Capgo

Se vuoi farlo manualmente, puoi seguire i passaggi seguenti

## Configurazione manuale di Capgo

### Installa il plugin

Dovresti finire con questo codice aggiunto alla tua app:

`npm i @capgo/capacitor-updater && npx cap sync`
Per installare il plugin nella tua app Capacitor

E poi aggiungi alla tua app questo codice per notificare al plugin nativo che il bundle JS è sano (se non lo fai, il plugin nativo tornerà alla versione precedente):

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Questo dirà al plugin nativo che l'installazione è riuscita

Poi esegui `npm run build && npx cap copy` per aggiornare la tua app

### Accedi a Capgo CLOUD

Prima, usa la [chiave API](https://webcapgoapp/dashboard/apikeys/) `all` presente nel tuo account per accedere con la CLI:

`npx @capgo/cli@latest login TUA_CHIAVE`

### Aggiungi la tua prima app

Iniziamo creando un'app in Capgo Cloud con la CLI

`npx @capgo/cli@latest app add`

Questo comando utilizzerà tutte le variabili definite nel file di configurazione di Capacitor per creare l'app

### Carica la tua prima versione

Esegui il comando per compilare il tuo codice e inviarlo a Capgo con:
`npx @capgo/cli@latest bundle upload`

Per impostazione predefinita, il nome della versione sarà quello nel tuo file `packagejson`

Controlla in [Capgo](https://webcapgoapp/) se la build è presente

Puoi anche testarla con la mia [app sandbox mobile](https://capgoapp/app_mobile/)

### Rendi il canale predefinito

Dopo aver inviato la tua app a Capgo, devi rendere il tuo canale `default` per permettere alle app di ricevere aggiornamenti da Capgo`npx @capgo/cli@latest channel set production -s default`

## Ricevere un Aggiornamento in Tempo Reale su un Dispositivo

Affinché la tua applicazione riceva un aggiornamento in tempo reale da Deploy, dovrai eseguire l'app su un dispositivo o un emulatore. Il modo più semplice per farlo è semplicemente utilizzare il seguente comando per avviare la tua app locale in un emulatore o un dispositivo collegato al tuo computer:

    npx cap run [ios | android]

Apri l'app, mettila in background e aprila di nuovo, dovresti vedere nei log che l'app ha effettuato l'aggiornamento.

Congratulazioni! 🎉 Hai distribuito con successo il tuo primo Aggiornamento in Tempo Reale. Questo è solo l'inizio di ciò che puoi fare con gli Aggiornamenti in Tempo Reale. Per saperne di più, consulta la documentazione completa sugli [Aggiornamenti in Tempo Reale](/docs/plugin/cloud-mode/getting-started/)

> Se hai bisogno di interrompere la ricezione locale dell'aggiornamento, esegui questo comando:
`npx @capgo/cli@latest channel set`