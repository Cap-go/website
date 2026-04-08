---
slug: create-react-mobile-apps-with-capacitor
title: Costruire App Mobile con React e Capacitor
description: >-
  Scopri come creare un'app mobile utilizzando React, Capacitor e migliorare
  l'interfaccia utente nativa con Konsta UI.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-02-21T00:00:00.000Z
updated_at: 2023-03-10T00:00:00.000Z
head_image: /react_capacitor.webp
head_image_alt: React e illustrazione di Capacitor
keywords: >-
  React, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: it
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
In questo tutorial, inizieremo con una nuova app [React](https://reactjs.org/) e passeremo allo sviluppo mobile nativo utilizzando Capacitor. Facoltativamente, puoi anche aggiungere [Konsta UI](https://konstaui.com/) per una migliore UI mobile con Tailwind CSS.

Capacitor ti permette di convertire facilmente la tua applicazione web React in un'app mobile nativa senza modifiche significative o dover imparare una nuova competenza come React Native.

Con pochi semplici passaggi, la maggior parte delle applicazioni React può essere trasformata in app mobile.

Questo tutorial ti guiderà attraverso il processo, partendo da una nuova app React e poi incorporando Capacitor per entrare nel regno delle app mobile native. Inoltre, puoi facoltativamente utilizzare [Konsta UI](https://konstaui.com/) per migliorare la tua UI mobile con Tailwind CSS.

## Informazioni su Capacitor

CapacitorJS è rivoluzionario! Puoi incorporarlo facilmente in qualsiasi progetto web, e incapsulerà la tua applicazione in una webview nativa, generando il progetto nativo per Xcode e Android Studio. Inoltre, i suoi plugin forniscono accesso alle funzionalità native del dispositivo come la fotocamera tramite un ponte JS.

Con Capacitor, ottieni un'eccellente app mobile nativa senza setup complicati o curve di apprendimento ripide. La sua API snella e le funzionalità ottimizzate lo rendono facilissimo da integrare nel tuo progetto. Fidati, rimarrai stupito da quanto sia semplice ottenere un'app nativa completamente funzionale con Capacitor!

## Preparare la tua App React

Mentre ci sono vari metodi per iniziare applicazioni React, optiamo per il più semplice in questo tutorial che fornisce un'applicazione React vuota:

```shell
npx create-react-app my-app
```

Per creare un'app mobile nativa, necessitiamo di un **export** del nostro progetto. Quindi, includiamo uno script semplice nel nostro **package.json** che può essere utilizzato per buildare ed esportare il progetto React:

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

Ora puoi eseguire `npm run build` senza preoccupazioni, e dovresti vedere una nuova cartella out nella root del tuo progetto.

Questa cartella sarà utilizzata da Capacitor successivamente, ma per ora, dobbiamo configurarla correttamente.

## Aggiungere Capacitor alla tua App React

Per impacchettare qualsiasi app web in un container mobile nativo, dobbiamo seguire alcuni passaggi iniziali, ma successivamente è semplice come eseguire un singolo comando `sync`.

Prima di tutto, possiamo installare il [Capacitor CLI](https://capacitorjs.com/docs/cli/) come dipendenza di sviluppo, e poi configurarlo nel nostro progetto. Durante la configurazione, puoi premere "invio" per accettare i valori predefiniti per nome e ID del bundle.

Successivamente, dobbiamo installare il pacchetto core e i pacchetti rilevanti per le piattaforme iOS e Android.

Infine, possiamo aggiungere le piattaforme, e Capacitor creerà cartelle per ogni piattaforma nella root del nostro progetto:

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

A questo punto, dovresti vedere nuove cartelle **ios** e **android** nel tuo progetto React.

**Questi sono progetti nativi reali!**

Per accedere al progetto Android successivamente, devi installare [Android Studio](https://developer.android.com/studio/). Per iOS, hai bisogno di un Mac e devi installare [Xcode](https://developer.apple.com/xcode/).

Inoltre, dovresti trovare un file **capacitor.config.ts** nel tuo progetto, che contiene alcune impostazioni fondamentali di Capacitor utilizzate durante la sincronizzazione. L'unica cosa a cui devi prestare attenzione è il **webDir**, che deve puntare al risultato del tuo comando di build. Attualmente, è impreciso.

Per correggere questo, apri il file **capacitor.config.json** e aggiorna il **webDir**:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "out",
  "bundledWebRuntime": false
}
```

Puoi provarlo eseguendo i seguenti comandi:

```shell
npm run build
npx cap sync
```

Il primo comando `npm run build` semplicemente builderà il tuo progetto React ed esporterà la build statica.

Mentre il secondo comando `npx cap sync` sincronizzerà tutto il codice web nei posti giusti delle piattaforme native in modo che possano essere visualizzati in un'app.

Inoltre, il comando sync potrebbe aggiornare le piattaforme native e installare plugin, quindi quando installi nuovi [plugin Capacitor](https://capacitorjs.com/docs/plugins/) è il momento di eseguire nuovamente `npx cap sync`.

Senza accorgertene, hai finito, quindi vediamo l'app su un dispositivo!

## Buildare e Distribuire app native

Per sviluppare app iOS, devi avere **Xcode** installato, e per app Android, devi avere **Android Studio** installato. Inoltre, se pianifichi di distribuire la tua app sull'app store, devi iscriverti all'Apple Developer Program per iOS e alla Google Play Console per Android.

Se sei nuovo nello sviluppo mobile nativo, puoi utilizzare il CLI di Capacitor per aprire facilmente entrambi i progetti nativi:

```shell
npx cap open ios
npx cap open android
```

Una volta configurati i tuoi progetti nativi, distribuire la tua app su un dispositivo connesso è facile. In Android Studio, devi solo attendere che tutto sia pronto, e puoi distribuire la tua app su un dispositivo connesso senza modificare alcuna impostazione. Ecco un esempio:

![android-studio-run](/android-studio-run.webp)

In Xcode, devi configurare il tuo account di firma per distribuire la tua app su un dispositivo reale invece che solo sul simulatore. Se non l'hai mai fatto prima, Xcode ti guida attraverso il processo (ma di nuovo, devi essere iscritto al Developer Program). Dopo di che, puoi semplicemente premere play per eseguire l'app sul tuo dispositivo connesso, che puoi selezionare in alto. Ecco un esempio:

![xcode-run](/xcode-run.webp)

Congratulazioni! Hai distribuito con successo la tua app web React su un dispositivo mobile. Ecco un esempio:

<div class="mx-auto" style="width: 50%;">
  <img src="/next-capacitor-share.webp" alt="react-mobile-app">
</div>

Ma aspetta, c'è anche un modo più veloce per farlo durante lo sviluppo...

## Live Reload di Capacitor

A questo punto, probabilmente sei abituato ad avere l'hot reload con tutti i framework moderni, e la buona notizia è che puoi avere la stessa funzionalità **su un dispositivo mobile** con uno sforzo minimo!

Abilita l'accesso alla tua applicazione ospitata localmente con live reload **sulla tua rete** facendo caricare all'app Capacitor il contenuto dall'URL specifico.

Il primo passo è determinare il tuo indirizzo IP locale. Se stai usando un Mac, puoi scoprirlo eseguendo il seguente comando nel terminale:

```shell
ipconfig getifaddr en0
```

Su Windows, esegui:

```shell
ipconfig
```

Poi cerca l'indirizzo IPv4.

Possiamo istruire Capacitor a caricare l'app direttamente dal server aggiungendo un'altra voce al nostro file `capacitor.config.ts`:

```javascript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.x.xx:3000',
    cleartext: true
  }
};

export default config;
```

Assicurati di usare **l'IP e la porta corretti**, ho usato la porta React predefinita in questo esempio.

Ora, possiamo applicare queste modifiche copiandole nel nostro progetto nativo:

```shell
npx cap copy
```

Il comando `copy` è simile a `sync`, ma copierà solo **le modifiche apportate alla cartella web** e alla configurazione, senza aggiornare il progetto nativo.

Ora puoi distribuire la tua app ancora una volta attraverso Android Studio o Xcode. Dopo di che, se cambi qualcosa nella tua app React, **l'app si ricaricherà automaticamente** e mostrerà le modifiche!

**Tieni presente** che se installi nuovi plugin come la fotocamera, è ancora necessaria una ricostruzione del tuo progetto nativo. Questo perché i file nativi vengono modificati, e non può essere fatto al volo.

Nota che dovresti usare l'IP e la porta corretti nella tua configurazione. Il blocco di codice sopra mostra la porta React predefinita a scopo dimostrativo.

## Utilizzare i Plugin Capacitor

Diamo un'occhiata a come utilizzare un plugin Capacitor in azione, che abbiamo menzionato alcune volte prima. Per fare questo, possiamo installare un plugin abbastanza semplice eseguendo:

```shell
npm i @capacitor/share
```

Non c'è niente di speciale nel [plugin Share](https://capacitorjs.com/docs/apis/share/), ma comunque fa apparire il dialogo di condivisione nativo! Per questo, ora dobbiamo solo importare il pacchetto e chiamare la funzione `share()` dalla nostra app. Modifichiamo il **src/App.js** in questo modo:

```javascript
import React from 'react';
import { Share } from '@capacitor/share';

function App() {
  const share = async () => {
    await Share.share({
      title: 'Open Youtube',
      text: 'Check new video on youtube',
      url: 'https://www.youtube.com',
      dialogTitle: 'Share with friends'
    });
  };

  return (
    <div>
      <h1>Welcome to React and Capacitor!</h1>
      <p>
        <h2>Cool channel</h2>
        <button onClick={() => share()}>Share now!</button>
      </p>
    </div>
  );
}

export default App;
```

Come menzionato prima, quando installiamo nuovi plugin, dobbiamo eseguire un'operazione di sincronizzazione e poi ridistribuire l'app sul nostro dispositivo. Per fare questo, esegui il seguente comando:

```
npx cap sync
```

Dopo aver premuto il pulsante, puoi vedere in azione il bellissimo dialogo di condivisione nativo!

<div>
  <h1>
</h1>

Per rendere il pulsante più adatto al mobile, possiamo aggiungere dello stile usando la mia libreria di componenti UI preferita per app web - React (senza giochi di parole).

## Aggiungere Konsta UI

Ho lavorato per anni con [Ionic](https://ionicframework.com/) per costruire fantastiche applicazioni cross-platform, ed è stata una delle migliori scelte per anni. Ma ora non lo raccomando più; è molto complicato integrarlo con React, e non ne vale davvero la pena quando hai già [tailwindcss](https://tailwindcss.com/).

Se vuoi una UI mobile dall'aspetto eccellente che si adatta allo stile specifico di iOS e Android, raccomando Konsta UI.

Devi avere [tailwind già installato](https://tailwindcss.com/docs/guides/vite/#react)

Per usarlo, dobbiamo solo installare il pacchetto react:

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

`konstaConfig` estenderà la configurazione Tailwind CSS predefinita (o la tua personalizzata) con alcune varianti extra e utility helper richieste per Konsta UI.

Ora dobbiamo configurare il componente principale [App](https://konstaui.com/react/app/) così possiamo impostare alcuni parametri globali (come `theme`).

Dobbiamo avvolgere l'intera app con `App` in `src/App.js`:

```javascript
import { App } from 'konsta/react';
import './App.css';

function MyApp({ Component, pageProps }) {
  return (
    // Wrap our app with App component
    <App theme="ios">
      <Component {...pageProps} />
    </App>
  );
}

export default MyApp;
```

### Pagina di Esempio

Ora che tutto è configurato, possiamo utilizzare i componenti React di Konsta UI nella nostra app React.

Per esempio, apriamo `src/App.js` e modifichiamolo nel seguente modo:

```javascript
// Konsta UI components
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListItem,
  Link,
  BlockTitle,
} from 'konsta/react';

function App() {
  return (
    <Page>
      <Navbar title="My App" />

      <Block strong>
        <p>
          Here is your React & Konsta UI app. Let's see what we have here.
        </p>
      </Block>
      <BlockTitle>Navigation</BlockTitle>
      <List>
        <ListItem href="/about/" title="About" />
        <ListItem href="/form/" title="Form" />
      </List>

      <Block strong className="flex space-x-4">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </Block>
    </Page>
  );
}

export default App;
```

Se il live reload è fuori sync dopo aver installato tutti i componenti necessari, prova a riavviare tutto. Una volta fatto, dovresti vedere un'app mobile con un aspetto abbastanza nativo, costruita con React e Capacitor!

Dovresti vedere la seguente pagina come risultato:

<p>
  <h2>
</h2>

## Conclusione

Capacitor è un'eccellente opzione per costruire applicazioni native basate su un progetto web esistente, offrendo un modo semplice per condividere codice e mantenere una UI consistente.

E con l'aggiunta di [Capgo](https://capgo.app/), è ancora più facile aggiungere aggiornamenti in tempo reale alla tua app, assicurando che i tuoi utenti abbiano sempre accesso alle ultime funzionalità e correzioni di bug.

Se vuoi imparare come aggiungere Capgo alla tua app React, dai un'occhiata al prossimo articolo:
