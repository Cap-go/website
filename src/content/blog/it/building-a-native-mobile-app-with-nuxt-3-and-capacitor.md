---
slug: costruire-una-app-mobile-nativa-con-nuxt-3-e-capacitor
title: Nuxt 3とCapacitorでモバイルアプリを作成する
description: Nuxt 3、Capacitor、Konsta UIのネイティブUIを実装したモバイルアプリの作り方
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-03T00:00:00.000Z
updated_at: 2023-06-03T00:00:00.000Z
head_image: /nuxt_capgo.webp
head_image_alt: Nuxt 3とCapgoのイラストレーション
keywords: >-
  Nuxt 3, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: it
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
In questo tutorial, inizieremo con una nuova app [Nuxt 3](https://nuxtjs.org/) e ci sposteremo nel territorio nativo utilizzando Capacitor e infine aggiungeremo anche [Konsta UI](https://konstaui.com/) per una migliore UI mobile con Tailwind CSS, anche se quest'ultimo passaggio è completamente opzionale.

Utilizzando Capacitor, puoi facilmente convertire la tua applicazione web Nuxt 3 in un'app mobile nativa senza richiedere modifiche significative o imparare una nuova competenza come React Native.

Con pochi semplici passaggi, la maggior parte delle applicazioni Nuxt 3 può essere trasformata in app mobile.

Questo tutorial ti guiderà attraverso il processo, partendo da una nuova app Nuxt 3 e poi incorporando Capacitor per spostarti nel mondo delle app mobile native. Inoltre, puoi opzionalmente utilizzare [Konsta UI](https://konstaui.com/) per migliorare la tua UI mobile con Tailwind CSS.

## Riguardo Capacitor

Capacitor è davvero rivoluzionario! Puoi incorporarlo facilmente in qualsiasi progetto web, e avvolgerà la tua applicazione in una webview nativa, generando il progetto nativo Xcode e Android Studio per te. Inoltre, i suoi plugin forniscono accesso alle funzionalità native del dispositivo come la fotocamera tramite un bridge JS.

Con Capacitor, ottieni un'app mobile nativa fantastica senza alcuna configurazione complicata o curva di apprendimento ripida. La sua API snella e la funzionalità ottimizzata lo rendono facilissimo da integrare nel tuo progetto. Fidati, rimarrai stupito da quanto sia semplice ottenere un'app nativa completamente funzionale con Capacitor!

## Preparare la tua App Nuxt 3

Per creare una nuova app Nuxt 3, esegui il seguente comando:

```shell
npx nuxi init my-app
cd my-app
npm install
```

Scegli "Nuxt 3" quando ti viene chiesta la versione di Nuxt.

Per creare un'app mobile nativa, abbiamo bisogno di un **export** del nostro progetto. Quindi, includiamo uno script semplice nel nostro **package.json** che può essere utilizzato per compilare e copiare il progetto Nuxt:

```json
{
  "scripts": {
    // ...
    "generate": "nuxt generate"
  }
}
```

Dopo aver eseguito il comando `generate`, dovresti essere in grado di vedere una nuova cartella `dist` nella root del tuo progetto.

Questa cartella sarà utilizzata da Capacitor più tardi, ma per ora, dobbiamo configurarla correttamente.

## Aggiungere Capacitor alla tua App Nuxt 3

Per impacchettare qualsiasi app web in un container mobile nativo, dobbiamo seguire alcuni passaggi iniziali, ma successivamente è semplice come eseguire un singolo comando `sync`.

Prima di tutto, possiamo installare il [Capacitor CLI](https://capacitorjs.com/docs/cli/) come dipendenza di sviluppo, e poi configurarlo nel nostro progetto. Durante la configurazione, puoi premere "enter" per accettare i valori predefiniti per nome e ID del bundle.

Successivamente, dobbiamo installare il pacchetto core e i pacchetti rilevanti per le piattaforme iOS e Android.

Infine, possiamo aggiungere le piattaforme, e Capacitor creerà cartelle per ciascuna piattaforma nella root del nostro progetto:

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your Nuxt project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

A questo punto, dovresti essere in grado di vedere nuove cartelle **ios** e **android** nel tuo progetto Nuxt 3.

**Questi sono progetti nativi reali!**

Per accedere al progetto Android più tardi, devi installare [Android Studio](https://developer.android.com/studio/). Per iOS, hai bisogno di un Mac e dovresti installare [Xcode](https://developer.apple.com/xcode/).

Inoltre, dovresti trovare un file **capacitor.config.ts** nel tuo progetto, che contiene alcune impostazioni fondamentali di Capacitor utilizzate durante la sincronizzazione. L'unica cosa a cui devi prestare attenzione è il **webDir**, che deve puntare al risultato del tuo comando di build. Attualmente, è impreciso.

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

Il primo comando `npm run generate` semplicemente compilerà il tuo progetto Nuxt 3 e copierà la build statica, mentre il secondo comando `npx cap sync` sincronizzerà tutto il codice web nei posti giusti delle piattaforme native in modo che possano essere visualizzati in un'app.

Inoltre, il comando sync potrebbe aggiornare le piattaforme native e installare plugin, quindi quando installi nuovi [plugin Capacitor](https://capacitorjs.com/docs/plugins/) è il momento di eseguire nuovamente `npx cap sync`.

Senza accorgertene, hai ora effettivamente finito, quindi vediamo l'app su un dispositivo!

## Compilare e Distribuire app native

Per sviluppare app iOS, devi avere **Xcode** installato, e per le app Android, devi avere **Android Studio** installato. Inoltre, se prevedi di distribuire la tua app sull'app store, devi iscriverti all'Apple Developer Program per iOS e alla Google Play Console per Android.

Se sei nuovo nello sviluppo mobile nativo, puoi utilizzare il CLI di Capacitor per aprire facilmente entrambi i progetti nativi:

```shell
npx cap open ios
npx cap open android
```

Una volta configurati i tuoi progetti nativi, distribuire la tua app su un dispositivo connesso è facile. In Android Studio, devi solo attendere che tutto sia pronto, e puoi distribuire la tua app su un dispositivo connesso senza modificare alcuna impostazione. Ecco un esempio:

![android-studio-run](/android-studio-run.webp)

In Xcode, devi configurare il tuo account di firma per distribuire la tua app su un dispositivo reale invece che solo sul simulatore. Se non l'hai mai fatto prima, Xcode ti guida attraverso il processo (ma ancora una volta, devi essere iscritto al Developer Program). Dopo di che, puoi semplicemente premere play per eseguire l'app sul tuo dispositivo connesso, che puoi selezionare in alto. Ecco un esempio:

![xcode-run](/xcode-run.webp)

Congratulazioni! Hai distribuito con successo la tua app web Nuxt 3 su un dispositivo mobile. Ecco un esempio:

<div class="mx-auto" style="width: 50%;">
  <img src="/nuxtjs-mobile-app.webp" alt="nuxtjs-mobile-app">
</div>

Ma aspetta, c'è anche un modo più veloce per farlo durante lo sviluppo...

## Live Reload di Capacitor

A questo punto, probabilmente sei abituato ad avere il hot reload con tutti i framework moderni, e la buona notizia è che puoi avere la stessa funzionalità **su un dispositivo mobile** con uno sforzo minimo!

Abilita l'accesso alla tua applicazione ospitata localmente con live reload **sulla tua rete** facendo caricare all'app Capacitor il contenuto dall'URL specifico.

Il primo passo è scoprire il tuo indirizzo IP locale. Se stai usando un Mac, puoi scoprirlo eseguendo il seguente comando nel terminale:

```shell
ipconfig getifaddr en0
```

Su Windows, esegui:

```shell
ipconfig
```

Poi cerca l'indirizzo IPv4.

Possiamo istruire Capacitor per caricare l'app direttamente dal server aggiungendo un'altra voce al nostro file `capacitor.config.ts`:

```javascript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.x.xx:3000',
    cleartext: true
  }
};

export default config;
```

Assicurati di usare **l'IP e la porta corretti**, ho usato la porta predefinita di Nuxt 3 in questo esempio.

Ora, possiamo applicare queste modifiche copiandole nel nostro progetto nativo:

```shell
npx cap copy
```

Il comando `copy` è simile a `sync`, ma copierà solo **le modifiche apportate alla cartella web** e alla configurazione, senza aggiornare il progetto nativo.

Ora puoi distribuire la tua app ancora una volta attraverso Android Studio o Xcode. Dopo di che, se cambi qualcosa nella tua app Nuxt, **l'app si ricaricherà automaticamente** e mostrerà le modifiche!

**Tieni presente** che se installi nuovi plugin come la fotocamera, è ancora necessaria una ricompilazione del tuo progetto nativo. Questo perché i file nativi vengono modificati, e non può essere fatto al volo.

Nota che dovresti usare l'IP e la porta corretti nella tua configurazione. Il blocco di codice sopra mostra la porta predefinita di Nuxt 3 a scopo dimostrativo.

## Utilizzare i Plugin Capacitor

Diamo un'occhiata a come utilizzare un plugin Capacitor in azione, che abbiamo menzionato alcune volte prima. Per fare questo, possiamo installare un plugin abbastanza semplice eseguendo:

```shell
npm i @capacitor/share
```

Non c'è niente di particolare nel [plugin Share](https://capacitorjs.com/docs/apis/share/), ma comunque fa apparire la finestra di dialogo di condivisione nativa! Per questo ora dobbiamo solo importare il pacchetto e chiamare la relativa funzione `share()` dalla nostra app, quindi modifichiamo il **pages/index.vue** in questo:

```html
<template>
  <div>
    <h1>Welcome to Nuxt 3 and Capacitor!</h1>
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

Come menzionato in precedenza, quando installiamo nuovi plugin, dobbiamo eseguire un'operazione di sincronizzazione e poi ridistribuire l'app al nostro dispositivo. Per fare questo, esegui il seguente comando:

```
npx cap sync
```

Dopo aver premuto il pulsante, puoi vedere in azione la bellissima finestra di dialogo di condivisione nativa!

## Aggiungere Konsta UI

Per utilizzare Konsta UI nella tua app Nuxt 3, devi avere [tailwind già installato](https://tailwindcss.com/docs/guides/nuxtjs/) e installare il pacchetto:

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

Ora dobbiamo configurare il componente principale [App](https://konstaui.com/vue/app/) in modo da poter impostare alcuni parametri globali (come `theme`).

Dobbiamo avvolgere l'intera app con `App` in `pages/_app.vue`:

```html
<template>
  <App theme="ios">
    <Nuxt />
  </App>
</template>

<script setup>
import { App } from 'konsta/vue';
</script>
```

### Pagina di Esempio

Ora che tutto è configurato, possiamo utilizzare i componenti Vue di Konsta UI nelle nostre pagine Nuxt 3.

Per esempio, apriamo `pages/index.vue` e modifichiamolo nel seguente modo:

```html
<template>
  <Page>
    <Navbar title="My App" />

    <Block strong>
      <p>
        Here is your Nuxt 3 & Konsta UI app. Let's see what we have here.
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

Se il live reload è fuori sync dopo aver installato tutti i componenti necessari, prova a riavviare tutto. Una volta fatto questo, dovresti vedere un'app mobile con un aspetto un po' nativo, costruita con Nuxt 3 e Capacitor!

Dovresti vedere la seguente pagina come risultato:

<template>
  <div>
<h1>

## Conclusione

Capacitor è un'eccellente opzione per costruire applicazioni native basate su un progetto web esistente, offrendo un modo semplice per condividere codice e mantenere una UI coerente.

E con l'aggiunta di [Capgo](https://capgo.app/), è ancora più facile aggiungere aggiornamenti live alla tua app, assicurando che i tuoi utenti abbiano sempre accesso alle ultime funzionalità e correzioni di bug.

Se vuoi imparare come aggiungere Capgo alla tua app Next.js, dai un'occhiata al prossimo articolo:

## Crediti

Grazie mille a Simon, questo articolo è basato su [questo articolo](https://devdactic.com/nextjs-and-capacitor/) riscritto per nuxt3 con chat-gpt-4 e adattato.
