---
slug: live-update-with-quasar-and-capacitor
title: 'Creazione di App Mobile con aggiornamenti in tempo reale, Quasar e Capacitor.'
description: >-
  Come creare un'app mobile con Quasar, Capacitor e implementare aggiornamenti
  in tempo reale.
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikDhabal'
created_at: 2023-09-14T00:00:00.000Z
updated_at: 2023-09-14T00:00:00.000Z
head_image: /quasar_capgo.webp
head_image_alt: Illustrazione di Quasar e Capgo
keywords: >-
  Quasar, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: it
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
Ecco la traduzione in italiano:

In questo tutorial, inizieremo creando una nuova web app usando [Quasar](https://quasar.dev/). Successivamente, impareremo come trasformarla in un'app mobile usando Capacitor. Se vuoi far apparire la tua app migliore su dispositivi mobili.

Con Capacitor, puoi trasformare la tua web app Quasar in un'app mobile senza dover fare molte cose complicate o imparare un modo completamente nuovo di fare app come dovresti fare con qualcosa chiamato React Native.

Questo tutorial ti guiderà attraverso il processo, partendo da una nuova app Quasar e poi incorporando Capacitor per passare al mondo delle app mobile native. Inoltre, userai [Capgo](https://capgo.app/) per inviare aggiornamenti live alla tua app in pochi secondi.

## Informazioni su Capacitor

CapacitorJS è davvero rivoluzionario! Puoi incorporarlo facilmente in qualsiasi progetto web, e incapsulerà la tua applicazione in una webview nativa, generando il progetto nativo per Xcode e Android Studio. Inoltre, i suoi plugin forniscono accesso alle funzionalità native del dispositivo come la fotocamera tramite un bridge JS.

Con Capacitor, ottieni un'fantastica app mobile nativa senza configurazioni complicate o curve di apprendimento ripide. La sua API snella e le funzionalità ottimizzate lo rendono facilissimo da integrare nel tuo progetto. Fidati, rimarrai stupito da quanto sia semplice ottenere un'app nativa completamente funzionante con Capacitor!

## Preparare la tua App Quasar

Per creare una nuova app Quasar, esegui il seguente comando:

```shell
npm init quasar
```

![Quasar Project Setup](/quasar-setup.webp)

Scegli l'opzione "App with Quasar CLI" poi "Quasar v2".

Per creare un'app mobile nativa, abbiamo bisogno di un **export** del nostro progetto. Quindi, includiamo uno script semplice nel nostro **package.json** che può essere utilizzato per compilare e copiare il progetto Quasar:

```json
{
  "scripts": {
    // ...
    "build": "quasar build"
  }
}
```

Dopo aver eseguito il comando `generate`, dovresti vedere una nuova cartella `dist` nella root del tuo progetto.

Questa cartella verrà utilizzata da Capacitor più tardi, ma per ora dobbiamo configurarla correttamente.

## Aggiungere Capacitor alla tua App Quasar

Per impacchettare qualsiasi web app in un container mobile nativo, dobbiamo seguire alcuni passaggi iniziali, ma successivamente sarà semplice come eseguire un singolo comando `sync`.

Prima di tutto, possiamo installare il [Capacitor CLI](https://capacitorjs.com/docs/cli/) come dipendenza di sviluppo, e poi configurarlo nel nostro progetto. Durante la configurazione, puoi premere "invio" per accettare i valori predefiniti per nome e ID del bundle.

Successivamente, dobbiamo installare il pacchetto core e i pacchetti rilevanti per le piattaforme iOS e Android.

Infine, possiamo aggiungere le piattaforme, e Capacitor creerà cartelle per ogni piattaforma nella root del nostro progetto:

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your Quasar project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

![Initialize Capacitor](/capacitor-init.webp)

A questo punto, dovresti vedere nuove cartelle **ios** e **android** nel tuo progetto Quasar.

**Questi sono progetti nativi reali!**

Per accedere al progetto Android più tardi, devi installare [Android Studio](https://developer.android.com/studio/). Per iOS, hai bisogno di un Mac e devi installare [Xcode](https://developer.apple.com/xcode/).

Inoltre, dovresti trovare un file **capacitor.config.ts** nel tuo progetto, che contiene alcune impostazioni fondamentali di Capacitor utilizzate durante la sincronizzazione. L'unica cosa a cui devi prestare attenzione è il **webDir**, che deve puntare al risultato del tuo comando di build. Attualmente, non è corretto.

Per correggere questo, apri il file **capacitor.config.json** e aggiorna il **webDir**:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "dist"
}
```

Puoi provarlo eseguendo i seguenti comandi:

```shell
npm run generate
npx cap sync
```

Il primo comando `npm run generate` semplicemente compilerà il tuo progetto Quasar e copierà la build statica, mentre il secondo comando `npx cap sync` sincronizzerà tutto il codice web nei posti giusti delle piattaforme native in modo che possano essere visualizzati in un'app.

Inoltre, il comando sync potrebbe aggiornare le piattaforme native e installare plugin, quindi quando installi nuovi [plugin Capacitor](https://capacitorjs.com/docs/plugins/) è il momento di eseguire nuovamente `npx cap sync`.

Senza accorgertene, hai finito, quindi vediamo l'app su un dispositivo!

## Compilare e Distribuire app native

Per sviluppare app iOS, devi avere **Xcode** installato, e per le app Android, devi avere **Android Studio** installato. Inoltre, se prevedi di distribuire la tua app sull'app store, devi iscriverti all'Apple Developer Program per iOS e alla Google Play Console per Android.

Se sei nuovo allo sviluppo mobile nativo, puoi utilizzare il CLI di Capacitor per aprire facilmente entrambi i progetti nativi:

```shell
npx cap open ios
npx cap open android
```

Una volta configurati i tuoi progetti nativi, distribuire la tua app su un dispositivo connesso è facile. In Android Studio, devi solo aspettare che tutto sia pronto, e puoi distribuire la tua app su un dispositivo connesso senza cambiare alcuna impostazione. Ecco un esempio:

![android-studio-run](/android-studio-run.webp)

In Xcode, devi configurare il tuo account di firma per distribuire la tua app su un dispositivo reale invece che solo sul simulatore. Se non l'hai mai fatto prima, Xcode ti guida attraverso il processo (ma di nuovo, devi essere iscritto al Developer Program). Dopo di che, puoi semplicemente premere play per eseguire l'app sul tuo dispositivo connesso, che puoi selezionare in alto. Ecco un esempio:

![xcode-run](/xcode-run.webp)

Congratulazioni! Hai distribuito con successo la tua web app Quasar su un dispositivo mobile. Ecco un esempio:

<div class="mx-auto" style="width: 50%;">
  <img src="/Quasar-mobile.webp" alt="quasar-mobile-app">
</div>

Ma aspetta, c'è anche un modo più veloce per farlo durante lo sviluppo...

## Aggiornamento Live di Capgo

Capgo Live Update è un servizio che permette agli sviluppatori di distribuire aggiornamenti alle loro app mobili senza passare attraverso il tradizionale processo di sottomissione all'App Store. Questo può essere un modo conveniente per correggere rapidamente bug o fare piccoli aggiornamenti a un'app senza attendere il processo di revisione dell'App Store.

Integrare Capgo nella tua app Quasar è un processo semplice che ti permette di sfruttare la potenza degli aggiornamenti in tempo reale. Questa guida passo passo ti accompagnerà attraverso l'integrazione e l'implementazione di Capgo Live Update, permettendoti di fornire aggiornamenti senza problemi.

**Registrati e Accedi alla Dashboard di Capgo**:

È il momento di registrarti e ottenere la tua chiave API per caricare la tua prima versione! Inizia [registrandoti per un account Capgo](https://console.capgo.app/register/).

**Installa l'SDK di Capgo**:

Da una riga di comando, direttamente nella root della tua app Capacitor, esegui:

`npm i @capgo/capacitor-updater && npx cap sync` Per installare il plugin nella tua app Capacitor.

E poi aggiungi alla tua app questo codice come sostituzione di quello di CodePush:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Questo dirà al plugin nativo che l'installazione è riuscita.

**Accedi a Capgo CLOUD**:

Prima, usa la [chiave API](https://console.capgo.app/dashboard/apikeys/) `all` presente nel tuo account per accedere con il CLI:

    `npx @capgo/cli@latest login LA_TUA_CHIAVE`

**Aggiungi la tua prima App**:

Iniziamo creando un'app in Capgo Cloud con il CLI.

```shell
    npx @capgo/cli@latest app add
```
Questo comando userà tutte le variabili definite nel file di configurazione di Capacitor per creare l'app.

**Carica la tua prima versione**:

Esegui il comando per compilare il tuo codice e inviarlo a Capgo con:

```shell
npx @capgo/cli@latest bundle upload`
```

Per default, il nome della versione sarà quello nel tuo file package.json.

Controlla in [Capgo](https://console.capgo.app/login/) se la build è presente.

Puoi anche testarla con la mia [app mobile sandbox](https://capgo.app/app_mobile/).

**Rendi il canale predefinito**:

Dopo aver inviato la tua app a Capgo, devi rendere il tuo canale predefinito per permettere alle app di ricevere aggiornamenti da Capgo.

`npx @capgo/cli@latest channel set production -s default`

**Configura l'app per validare gli aggiornamenti**:

Aggiungi questa configurazione al tuo file JavaScript principale.

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Poi esegui `npm run build && npx cap copy` per aggiornare la tua app.

**Ricevi un Aggiornamento Live**:

Affinché la tua applicazione riceva un aggiornamento live da Deploy, dovrai eseguire l'app su un dispositivo o un emulatore. Il modo più semplice per farlo è semplicemente usare il seguente comando per lanciare la tua app locale in un emulatore o un dispositivo connesso al tuo computer.

      npx cap run [ios | android]

Apri l'app, mettila in background e aprila di nuovo, dovresti vedere nei log che l'app ha fatto l'aggiornamento.

Congratulazioni! 🎉 Hai distribuito con successo il tuo primo Aggiornamento Live. Questo è solo l'inizio di ciò che puoi fare con gli Aggiornamenti Live. Per saperne di più, consulta la [documentazione completa degli Aggiornamenti Live](https://capgo.app/docs/plugin/cloud-mode/getting-started/).

## Utilizzare i Plugin di Capacitor

Diamo un'occhiata a come utilizzare un plugin Capacitor in azione, di cui abbiamo parlato alcune volte prima. Per fare questo, possiamo installare un plugin abbastanza semplice eseguendo:

```shell
npm i @capacitor/share
```

Non c'è niente di particolare nel [plugin Share](https://capacitorjs.com/docs/apis/share/), ma comunque fa apparire la finestra di dialogo nativa per la condivisione! Per questo ora dobbiamo solo importare il pacchetto e chiamare la funzione `share()` corrispondente dalla nostra app, quindi modifichiamo il **pages/index.vue** in questo modo:

```html
<template>
  <div>
    <h1>Welcome to Quasar and Capacitor!</h1>
    <button @click="share">Share now!</button>
  </div>
</template>

<script setup lang="ts">
import { Share } from '@capacitor/share';

async function share() {
  await Share.share({
    title: 'Open Youtube',
    text: 'Check new video on youtube',
    url: 'https://www.youtube.com',
    dialogTitle: 'Share with friends'
  });
}
</script>
```

Come menzionato prima, quando installiamo nuovi plugin, dobbiamo eseguire un'operazione di sincronizzazione e poi ridistribuire l'app sul nostro dispositivo. Per fare questo, esegui il seguente comando:

```
npx cap sync
```

Dopo aver premuto il pulsante, puoi vedere in azione la bellissima finestra di dialogo nativa per la condivisione!

## Aggiungere Opzionalmente Konsta UI

Per utilizzare Konsta UI nella tua app Quasar, devi avere [tailwind già installato](https://tailwindcss.com/docs/installation/) e installare il pacchetto:

```shell
npm i konsta
```

Inoltre, devi modificare il tuo file `tailwind.config.js`:

```javascript
// import konstaConfig config
const konstaConfig = require('konsta/config')

// wrap config with konstaConfig config
module.exports = konstaConfig({
  content: [
    './pages/**/*.{vue}',
    './components/**/*.{vue}',
  ],
  darkMode: 'media', // or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
})
```

`konstaConfig` estenderà la configurazione predefinita (o la tua personalizzata) di Tailwind CSS con alcune varianti extra e utility helper richieste per Konsta UI.

Ora dobbiamo configurare il componente principale [App](https://konstaui.com/vue/app/) in modo da poter impostare alcuni parametri globali (come il `theme`).

Dobbiamo avvolgere l'intera app con `App` nel `pages/_app.vue`:

```html
<template>
  <App theme="ios">
    <Quasar />
  </App>
</template>

<script setup>
import { App } from 'konsta/vue';
</script>
```

### Pagina di Esempio

Ora che tutto è configurato, possiamo utilizzare i componenti Vue di Konsta UI nelle nostre pagine Quasar.

Per esempio, apriamo `pages/index.vue` e modifichiamolo nel seguente modo:

```html
<template>
  <Page>
    <Navbar title="My App" />

    <Block strong>
      <p>
        Here is your Quasar & Konsta UI app. Let's see what we have here.
      </p>
    </Block>
    <BlockTitle>Navigation</BlockTitle>
    <List>
      <ListItem href="/about/" title="About" />
      <ListItem href="/form/" title="Form" />
    </List>

    <Block strong class="flex space-x-4">
      <Button>Button 1</Button>
      <Button>Button 2</Button>
    </Block>
  </Page>
</template>

<script setup>
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListItem,
  Link,
  BlockTitle,
} from 'konsta/vue';
</script>
```

Se il live reload non è sincronizzato dopo aver installato tutti i componenti necessari, prova a riavviare tutto. Una volta fatto questo, dovresti vedere un'app mobile con un aspetto piuttosto nativo, costruita con Quasar e Capacitor!


## Conclusione

Capacitor è un'ottima opzione per costruire applicazioni native basate su un progetto web esistente, offrendo un modo semplice per condividere il codice e mantenere un'interfaccia utente coerente.

E con l'aggiunta di [Capgo](https://capgo.app/), è ancora più facile aggiungere aggiornamenti in tempo reale alla tua app, assicurando che i tuoi utenti abbiano sempre accesso alle ultime funzionalità e correzioni di bug.

Se vuoi imparare come aggiungere Capgo alla tua app Next.js, dai un'occhiata al prossimo articolo:
