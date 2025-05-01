---
slug: creating-mobile-apps-with-react-and-capacitor
title: モバイルアプリをピュアReact.jsとCapacitorで構築する
description: >-
  Panduan untuk mengubah aplikasi web React.js menjadi aplikasi mobile native
  dengan Capacitor dan meningkatkan tampilan native menggunakan Konsta UI.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-29T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /react_capacitor.webp
head_image_alt: Illustrazione di React.js e Capacitor
keywords: >-
  React, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: it
next_blog: implementing-live-updates-in-your-react-capacitor-app
---

Ecco la traduzione in italiano:

Questo tutorial ti guiderà nella creazione di un'applicazione mobile utilizzando React, Capacitor e Konsta UI. Alla fine, saprai come trasformare un'app web Reactjs in un'applicazione mobile nativa con Capacitor e implementare un'interfaccia utente nativa utilizzando Konsta UI.

Capacitor permette di trasformare facilmente la tua app web Reactjs in un'applicazione mobile nativa, senza richiedere modifiche sostanziali o l'apprendimento di nuove strategie come React Native.

Il processo coinvolge alcuni semplici passaggi e, prima che tu te ne accorga, la tua app Reactjs sarà un'applicazione mobile completamente funzionante. Quindi, resta con noi mentre ti guidiamo in questo percorso.

## Panoramica di Capacitor

CapacitorJS è rivoluzionario. Può integrarsi perfettamente con qualsiasi progetto web e racchiudere la tua app in una webview nativa generando il progetto nativo per Xcode e Android Studio. Inoltre, attraverso i suoi plugin, puoi accedere alle funzionalità native del dispositivo come la fotocamera tramite un bridge JS.

Capacitor offre un modo semplice per creare un'applicazione mobile nativa senza problemi o curve di apprendimento ripide. La sua API semplice e la funzionalità ottimizzata lo rendono facile da incorporare nel tuo progetto.

## Configurazione della tua App Reactjs

Usiamo il metodo più semplice per iniziare un'applicazione React. Utilizzeremo il gestore di pacchetti npm per creare una nuova app React:

```shell
npx create-react-app my-app
```

Per trasformare il nostro progetto in un'app mobile nativa, è necessario un **export** della nostra app.

Torneremo su questo tra un momento. Prima, capiamo come integrare Capacitor nella nostra app React.

## Integrazione di Capacitor nella tua App Reactjs

I passaggi iniziali di configurazione potrebbero essere un po' dettagliati, ma dopo, aggiornare il wrapper dell'app nativa diventa semplice come eseguire un comando `sync`.

Prima, installeremo la CLI di Capacitor come dipendenza di sviluppo e la configureremo nel nostro progetto. Durante la configurazione, accetta i valori predefiniti per nome e ID bundle premendo "invio".

Successivamente, installeremo il pacchetto core e i pacchetti relativi per le piattaforme iOS e Android.

Infine, aggiungeremo le piattaforme, e Capacitor creerà cartelle per ciascuna piattaforma nella root del nostro progetto:

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your React project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

Le directory **ios** e **android** sono ora presenti nel tuo progetto Reactjs.

Per accedere al progetto Android successivamente, installa [Android Studio](https://developer.android.com/studio/). Per iOS, hai bisogno di un Mac e dovresti installare [Xcode](https://developer.apple.com/xcode/).

Successivamente, aggiorna il **webDir** nel tuo file **capacitor.config.json** come mostrato di seguito:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "build",
  "bundledWebRuntime": false
}
```

Esegui il comando build e sincronizza il tuo progetto con Capacitor:

```shell
npm run build
npx cap sync
```

Il comando `npm run build` compilerà il tuo progetto Reactjs, mentre `npx cap sync` allineerà il codice web nei punti corretti delle piattaforme native in modo che possano essere eseguiti in un'app.

Ora, con un po' di fortuna e senza errori, la tua app Reactjs dovrebbe essere pronta per il lancio su un dispositivo!

## Compilazione e Distribuzione delle tue App Native

Lo sviluppo di app iOS richiede **Xcode**, e le app Android necessitano di **Android Studio**. Se prevedi di distribuire la tua app sullo store, devi iscriverti all'Apple Developer Program per iOS e alla Google Play Console per Android.

La CLI di Capacitor semplifica il processo di apertura di entrambi i progetti nativi:

```shell
npx cap open ios
npx cap open android
```

Una volta configurati i tuoi progetti nativi, distribuire la tua app su un dispositivo connesso è un processo semplice.

Per Android Studio, attendi che tutto si carichi e poi distribuisci la tua app su un dispositivo connesso.

Per Xcode, configura il tuo account di firma per distribuire la tua app su un dispositivo reale invece che solo sul simulatore. Dopo averlo fatto, premi semplicemente play per eseguire l'app sul tuo dispositivo connesso, che puoi scegliere in alto.

Se tutto è andato bene, avrai convertito il tuo React.app web js in un'applicazione mobile nativa!

## Live Reload di Capacitor

I framework di sviluppo moderni di solito includono l'hot reload e, fortunatamente, puoi averlo anche con Capacitor ma **sul tuo dispositivo mobile**!

Puoi rendere la tua applicazione ospitata localmente accessibile con il live reload sulla tua rete facendo caricare all'app Capacitor il contenuto da un URL specifico

Prima, determina il tuo indirizzo IP locale. Su Mac, puoi farlo eseguendo `ipconfig getifaddr en0` nel terminale. Su Windows, esegui `ipconfig` e cerca l'indirizzo IPv4

Dopo questo, indica a Capacitor di caricare l'app direttamente dal server aggiungendo un altro parametro al tuo file `capacitor.config.ts`:

```javascript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.x.xx:3000',
    cleartext: true
  }
};

export default config;
```

Assicurati di usare l'IP e la porta corretti. Esegui `npx cap copy` per applicare queste modifiche al nostro progetto nativo

Dopo aver distribuito la tua app ancora una volta tramite Android Studio o Xcode, qualsiasi modifica nella tua app React verrà automaticamente ricaricata e visualizzata sulla tua app!

Tieni presente che se vengono installati nuovi plugin, come la fotocamera, è necessaria una ricostruzione del tuo progetto nativo. Questo perché i file nativi saranno cambiati e non possono essere aggiornati al volo

## Utilizzare i Plugin di Capacitor

Diamo un'occhiata rapida a come utilizzare un plugin Capacitor. Installiamo uno semplice, il [plugin Share](https://capacitorjs.com/docs/apis/share/), che mostra la finestra di dialogo di condivisione nativa:

```shell
npm i @capacitor/share
```

Per utilizzarlo, importa il pacchetto e chiama la rispettiva funzione `share()` dalla nostra app. Considera l'**App.js**:

```javascript
import { Share } from '@capacitor/share';

function ShareButton() {
  const share = async () => {
    await Share.share({
      title: 'React App',
      text: 'Visit this React App',
      url: 'http://localhost:3000',
      dialogTitle: 'Share with...'
    });
  };

  return (
    <button onClick={share}>
      Share
    </button>
  );
}

export default ShareButton;
```

Dopo aver installato un nuovo plugin, ricordati di sincronizzare nuovamente il tuo progetto React usando `npx cap sync`

## Implementare Konsta UI: UI Mobile dall'Aspetto Migliore

Per un'esperienza UI mobile dall'aspetto migliore, useremo Konsta UI. Fornisce stili specifici per iOS e Android ed è facile da utilizzare

Per utilizzare Konsta UI, installa il pacchetto React:

```shell
npm i konsta
```

Modifica il tuo file `tailwind.config.js` così:

```javascript
// import konstaConfig config
const konstaConfig = require('konsta/config')

// wrap config with konstaConfig config
module.exports = konstaConfig({
  content: [
    './src/**/*.{js,ts,javascript,tsx}',
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

`konstaConfig` integrerà la tua configurazione Tailwind CSS attuale con varianti e utilità aggiuntive necessarie per Konsta UI

Ora, configura il componente App principale per impostare parametri globali come `theme`. Avvolgi l'app principale con App nel `src/index.js`:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import {App} from 'konsta/react';
import './index.css';
import MyApp from './App';

ReactDOM.render(
  <React.StrictMode>
    <App theme="ios">
      <MyApp />
    </App>
  </React.StrictMode>,
  document.getElementById('root')
);
```

Utilizziamo i componenti React di Konsta UI nelle nostre pagine React.js. Apri `src/App.js` e modificalo in:

```javascript
// Konsta UI components
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListItem,
} from 'konsta/react';

export default function MyApp() {
  return (
    <Page>
      <Navbar title="My App" />

      <Block strong>
        <p>
          Welcome to your React & Konsta UI app.
        </p>
      </Block>
      
      <List>
        <ListItem href="/about" title="About" />
      </List>

      <Block strong>
        <Button>Click Me</Button>
      </Block>
    </Page>
  );
}
```

Se tutto è stato fatto correttamente, dovresti vedere un'integrazione perfetta tra React e Konsta UI per dare alla tua app mobile un aspetto nativo

## Conclusione

Capacitor offre un modo semplice di costruire app native basate su un progetto web esistente, fornendo un modo semplice per condividere il codice e avere UI coerente

Grazie a tecnologie come Capacitor, costruire applicazioni mobili da app web React.js non è mai stato così facile. Porta le tue competenze di sviluppo web al livello successivo creando impressionanti app mobile native. Buon coding!

Per saperne di più su come puoi accelerare il tuo processo di sviluppo app, [registra un account gratuito](/register/) oggi stesso!