---
slug: アプセンターの移行
title: App Center から Capgo への移行
description: このガイドでは、Microsoft CodePushの代替となるCapgo Live Updatesへの完全な移行を行います。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-03-22T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /migrate_appcenter.webp
head_image_alt: Capacitor JSデベロッパーの代替案を探す
keywords: >-
  App Center, migration, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Migration
published: true
locale: ja
next_blog: automatic-build-and-release-with-github-actions
original_slug: migrazione-appcenter
---
## Riepilogo della Migrazione

* [Capgo](/register/) è un servizio che aiuta i team di sviluppo a inviare app live alle app distribuite.
* Le app Capacitor JS scritte in jQuery Mobile, Framework 7, Sencha, KendoUI, Ionic o anche la tua soluzione personalizzata possono essere migrate. **Non è necessaria un'app Ionic esistente**.
* [Colt](https://volt.build/) offre servizi equivalenti per App Center Build (build di app Android/iOS). Per servizi di Test, Diagnostica e Analytics.

##### Nota

Se la tua app usa ancora Cordova, è necessario [migrare a Capacitor](https://capacitorjs.com/docs/cordova/migrating-from-cordova-to-capacitor/) prima di migrare a Capgo.

Creato dal team Ionic come successore spirituale di Cordova, Capacitor permette allo sviluppo di avvicinarsi agli strumenti e alle funzionalità native con l'obiettivo di fornire un'esperienza utente e prestazioni ancora migliori.

Fortunatamente, il processo di migrazione è facile e la maggior parte dei plugin Cordova sono retrocompatibili con Capacitor. [Inizia la migrazione qui](https://capacitorjs.com/docs/cordova/migrating-from-cordova-to-capacitor/).

## Informazioni su Capgo

Capgo gestisce l'aggiornamento delle app nel tempo. I team di sviluppo possono concentrarsi completamente sulle caratteristiche uniche della loro app e affidare il complicato processo di distribuzione delle app a Capgo.

Capgo colma il divario tra la distribuzione web e mobile.

## Prerequisiti di Capgo

Come App Center, [Capgo](/register/) supporta app ospitate in repository Git su Azure DevOps, Bitbucket, GitHub e GitLab.

### Installare Capgo CLI

##### nota

È necessario avere Node e NPM installati sul computer prima di procedere. Usa sempre la [versione LTS corrente](https://nodejs.org/). Capgo non supporta versioni precedenti.

### Creare i file `package.json` e di configurazione Capacitor

##### nota

Prima di iniziare, consiglio di apportare modifiche su un nuovo branch Git.

Poiché [Capgo](/register/) è stato creato per automatizzare le app Capacitor, richiede un file che la tua app potrebbe non avere. Prima, crea un file `capacitor.config.json`. Il modo più semplice per crearlo è eseguire nella root della tua app:

```shell
npm install @capacitor/core
```

Quindi, inizializza Capacitor usando il questionario CLI:

```shell
npx cap init
```

La CLI ti farà alcune domande, iniziando con il nome della tua app e l'ID del pacchetto che vorresti usare.

Infine, committa i nuovi file al tuo progetto:

    git add .git commit -m "aggiunti package json e config capacitor" && git push

### Migrare il Codice

Ora che hai i nuovi file richiesti da [Capgo](/register/), puoi concentrarti sull'app stessa. [Capgo](/register/) si aspetta che l'intera app compilata sia all'interno di una directory chiamata `dist`.

Se il tuo codice compilato non si trova in una directory `dist`, modifica questo valore nel file di configurazione Capacitor.

Ecco come dovrebbe apparire la struttura della directory dell'app:

![Struttura App](/directory_looklike.webp)

## Configurazione Capgo

Con la tua app pronta per l'integrazione con [Capgo](https://web.capgo.app/), è il momento di registrarsi e ottenere la tua chiave API per caricare la tua prima versione! Inizia [registrandoti per un account Capgo](/register/).

Una volta effettuato l'accesso a Capgo, vai alla pagina Account, quindi fai clic su API key, poi clicca sulla chiave 'write' per copiarla negli appunti.

### Installare l'SDK Capgo

Da riga di comando, direttamente nella root della cartella della tua app Capacitor, esegui il seguente comando:

`npm i @capgo/capacitor-updater && npx cap sync`
Per installare il plugin nella tua app Capacitor.

E poi aggiungi alla tua app questo codice come sostituzione di quello CodePush:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Questo informerà il plugin nativo che l'installazione è riuscita.

## Distribuire Aggiornamenti Live (Alternativa a CodePush)

La funzionalità Live Update funziona utilizzando l'[SDK Capgo](https://github.com/Cap-go/capacitor-updater/) installato nella tua applicazione nativa per ascoltare una particolare Destinazione del Canale di Distribuzione. Quando una build Web viene assegnata a una Destinazione del Canale, quell'aggiornamento verrà distribuito ai dispositivi utente che eseguono binari configurati per ascoltare la Destinazione del Canale specificata.

### Accedere a Capgo CLOUD

Prima, usa la [apikey](https://web.capgo.app/dashboard/apikeys/) 'all' presente nel tuo account per accedere con la CLI:

```shell
npx @capgo/cli@latest login YOURKEY
```

## Aggiungere la tua prima app

Iniziamo creando l'app in Capgo Cloud con la CLI.

`npx @capgo/cli@latest app add`

Questo comando utilizzerà tutte le variabili definite nel file di configurazione Capacitor per creare l'app.

## Caricare il tuo primo bundle

Esegui il comando per compilare il tuo codice e inviarlo a Capgo con:
```shell
npx @capgo/cli@latest bundle upload --channel production
```

Per impostazione predefinita, il nome della versione sarà quello nel tuo file `package.json`.

Controlla in [Capgo](https://web.capgo.app/) se la build è presente.

Puoi anche testarla con la mia [app sandbox mobile](https://capgo.app/app_mobile/).

### Rendere il canale predefinito

Dopo aver inviato la tua app a Capgo, devi rendere il tuo canale `default` per permettere alle app di ricevere aggiornamenti da Capgo.

```shell
npx @capgo/cli@latest channel set production -s default
```

## Configurare l'app per validare gli aggiornamenti

Aggiungi questa configurazione al tuo file JavaScript principale.

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Quindi esegui `npm run build && npx cap copy` per aggiornare la tua app.

### Ricevere un Aggiornamento Live su un Dispositivo

Per far sì che la tua applicazione riceva un aggiornamento live da Deploy, dovrai eseguire l'app su un dispositivo o un emulatore. Il modo più semplice per farlo è semplicemente usare il seguente comando per avviare la tua app locale in un emulatore o un dispositivo collegato al tuo computer.

    npx cap run [ios | android]

Apri l'app, mettila in background e riaprila, dovresti vedere nei log che l'app ha eseguito l'aggiornamento.

Congratulazioni! 🎉 Hai distribuito con successo il tuo primo Aggiornamento Live. Questo è solo l'inizio di ciò che puoi fare con gli Aggiornamenti Live. Per saperne di più, consulta la [documentazione completa sugli Aggiornamenti Live](/docs/plugin/cloud-mode/getting-started/).

## Rimuovere le Dipendenze di App Center

Ora che abbiamo integrato i servizi di Capgo, dovresti rimuovere qualsiasi riferimento ad App Center. Oltre ad essere una best practice rimuovere codice/servizi inutilizzati, rimuovere l'SDK dovrebbe ridurre la dimensione delle tue app.

Prima, apri un terminale quindi disinstalla i plugin di App Center:
```shell
    cordova plugin remove cordova-plugin-appcenter-analytics cordova-plugin-appcenter-crashes cordova-plugin-code-push
```

Successivamente, apri `config.xml` e rimuovi i seguenti valori `preference`. Appariranno simili a:
```xml
    <preference name="APP_SECRET" value="0000-0000-0000-0000-000000000000" /><preference name="CodePushDeploymentKey" value="YOUR-ANDROID-DEPLOYMENT-KEY" /><preference name="CodePushPublicKey" value="YOUR-PUBLIC-KEY" />
```

Se stavi usando App Center Analytics nella tua app, rimuovi i seguenti elementi `preferences`: `APPCENTER_ANALYTICS_ENABLE_IN_JS` e `APPCENTER_CRASHES_ALWAYS_SEND`.

Rimuovi i seguenti elementi `<preference name="APP_SECRET" value="0000-0000-0000-0000-000000000000" />`:

```xml
    <access origin="https://codepush.appcenter.ms" /><access origin="https://codepush.blob.core.windows.net" /><access origin="https://codepushupdates.azureedge.net" />
```

Rimuovi il riferimento a CodePush nel tag `meta` CSP nel file `index.html` (`https://codepush.appcenter.ms`):
```xml
    <meta http-equiv="Content-Security-Policy" content="default-src https://codepush.appcenter.ms 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *" />
```

Infine, all'interno della tua app, rimuovi qualsiasi riferimento nel codice ai servizi App Center, come `codePush.sync();`.

## Prossimi Passi

Hai migrato da App Center a Capgo, utilizzando gli Aggiornamenti Live. Questo è solo l'inizio di ciò che puoi fare con Capgo. Esplora il resto del servizio che include Channel (ambienti multipli) e override. Integrazione Cloud CLI, usa Capgo all'interno della tua piattaforma CI/CD preferita (come GitHub Action, GitLab, Jenkins e altro).

## Invio automatico degli aggiornamenti dell'app

Se il tuo codice è ospitato su GitHub, puoi configurare la build e il rilascio automatici in pochi passaggi aggiuntivi, grazie alle GitHub actions.

Ho fatto un secondo articolo per permetterti di farlo.

## Crediti

Grazie mille a [Ionic](https://ionic.com/), questo articolo è basato su [questo articolo](https://ionic.io/blog/moving-from-microsoft-app-center-to-ionic-appflow/) riscritto con chat-gpt-3 e adattato.
