---
slug: building-a-native-mobile-app-with-nextjs-and-capacitor
title: >-
  Creare un'App Mobile Nativa nel 2024 con Next.js 14 e Capacitor: Una Guida
  Passo dopo Passo
description: >-
  Scopri in questa guida completa come creare un'applicazione mobile nativa con
  Next.js 14 e Capacitor. Esplora le migliori pratiche e le tecniche più recenti
  per sviluppare applicazioni mobili potenti e ricche di funzionalità.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-02-21T00:00:00.000Z
updated_at: 2024-09-19T00:00:00.000Z
head_image: /next_capgo.webp
head_image_alt: Next.js 14 e illustrazione di Capacitor
tag: Tutorial
published: true
locale: it
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

## Introduzione

In questo tutorial, esploreremo come creare app mobili native utilizzando la potente combinazione di Nextjs 14 e Capacitor nel 2024. Sfruttando le ultime versioni di queste tecnologie, puoi costruire applicazioni mobili ad alte prestazioni e ricche di funzionalità con facilità. Dimostreremo anche come migliorare l'interfaccia utente mobile utilizzando Konsta UI e Tailwind CSS, anche se questo passaggio è opzionale.

Nextjs, un popolare framework React, fornisce una solida base per la creazione di applicazioni web, mentre Capacitor ti permette di trasformare la tua app Nextjs in un'app mobile nativa senza modifiche significative o la necessità di imparare nuove competenze come React Native. Questo tutorial ti guiderà attraverso il processo, partendo dalla configurazione di una nuova app Nextjs e integrando Capacitor per creare un'esperienza mobile nativa.

### Vantaggi dell'utilizzo di Nextjs e Capacitor

- **Riutilizzo del codice**: Nextjs ti permette di scrivere componenti riutilizzabili e condividere il codice tra le tue app web e mobile, risparmiando tempo e sforzi di sviluppo.
- **Prestazioni**: Nextjs offre ottimizzazioni delle prestazioni integrate, come il rendering lato server e lo split del codice, garantendo tempi di caricamento rapidi e un'esperienza utente fluida.
- **Funzionalità native**: Capacitor fornisce accesso alle funzionalità native del dispositivo come la fotocamera, la geolocalizzazione e altro, permettendoti di costruire app mobili ricche di funzionalità.
- **Sviluppo semplificato**: Con Capacitor, puoi sviluppare e testare la tua app mobile utilizzando tecnologie web familiari, riducendo la curva di apprendimento e semplificando il processo di sviluppo.

## Preparazione della tua app Nextjs

Per iniziare, creiamo una nuova applicazione Nextjs utilizzando il comando `create-next-app`:

```shell
npx create-next-app@latest my-app
```

Questo comando configurerà un progetto Nextjs vuoto con la configurazione raccomandata per l'ultima versione.

Successivamente, naviga nella directory del progetto:

```shell
cd my-app
```

Per creare un'app mobile nativa, dobbiamo generare un'esportazione statica del nostro progetto Nextjs. Aggiorna il file `package.json` per includere uno script per la compilazione e l'esportazione del progetto:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "static": "NEXT_PUBLIC_IS_MOBILE=true next build"
  }
}
```

L'esecuzione del comando `npm run static` potrebbe risultare in errori a causa dell'incompatibilità dell'ottimizzazione delle immagini. Per risolvere questo, apri il file `next.config.js` e modificalo come segue:

```javascript
/** @type {import('next').NextConfig} */
const isMobile = process.env.NEXT_PUBLIC_IS_MOBILE === 'true';
const nextConfig = {
    ...(isMobile ? {output: 'export'} : {}),
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
```

Ora, l'esecuzione di `npm run static` dovrebbe funzionare senza problemi, e troverai una nuova cartella `out` alla radice del tuo progetto. Questa cartella sarà utilizzata da Capacitor nei passaggi successivi.

## Aggiunta di Capacitor alla tua app Nextjs 14

Per pacchettizzare la tua app Nextjs in un contenitore mobile nativo, segui questi passaggi:

1. Installa il Capacitor CLI come dipendenza di sviluppo:

```shell
npm install -D @capacitor/cli
```

2. Inizializza Capacitor nel tuo progetto Nextjs:

```shell
npx cap init
```

Durante il processo di inizializzazione, puoi premere "Invio" per accettare i valori predefiniti per il nome dell'app e l'ID del bundle.

3. Installa i pacchetti Capacitor richiesti:

```shell
npm install @capacitor/core @capacitor/ios @capacitor/android
```

4. Aggiungi le piattaforme native:

```shell
npx cap add ios
npx cap add android
```

Capacitor creerà cartelle per ciascuna piattaforma (`ios` e `android`) alla radice del tuo progetto. Queste cartelle contengono i progetti nativi per iOS e Android, rispettivamente.

Per accedere e compilare il progetto Android, devi avere Android Studio installato. Per lo sviluppo iOS, hai bisogno di un Mac con Xcode installato.

5. Configura Capacitor:

Apri il file `capacitor.config.ts` e aggiorna la proprietà `webDir` per puntare alla directory di output della tua build Nextjs:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "out",
  "bundledWebRuntime": false
}
```

6. Compila e sincronizza il tuo progetto:

```shell
npm run static
npx cap sync
```

Il comando `npm run static` compila il tuo progetto Nextjs ed esporta i file statici, mentre `npx cap sync` sincronizza il codice web con le piattaforme native.## Creazione e distribuzione di app native

Per creare e distribuire la tua app mobile nativa, segui questi passaggi:
Per sviluppare app iOS, devi avere **Xcode** installato, e per le app Android, devi avere **Android Studio** installato. Inoltre, se prevedi di distribuire la tua app sullo store, devi iscriverti all'Apple Developer Program per iOS e alla Google Play Console per Android.

1. Apri i progetti nativi:

Per iOS:
```shell
npx cap open ios
```

Per Android:
```shell
npx cap open android
```

2. Compila ed esegui l'app:

![android-studio-run](/android-studio-run.webp)

- In Android Studio, attendi che il progetto sia pronto, quindi fai clic sul pulsante "Esegui" per distribuire l'app su un dispositivo connesso o un emulatore.
![xcode-run](/xcode-run.webp)

- In Xcode, configura il tuo account di firma per distribuire l'app su un dispositivo reale. Se non l'hai mai fatto prima, Xcode ti guiderà attraverso il processo (nota che devi essere iscritto all'Apple Developer Program). Una volta configurato, fai clic sul pulsante "Play" per eseguire l'app sul tuo dispositivo connesso.

Congratulazioni! Hai distribuito con successo la tua app web Nextjs su un dispositivo mobile.

<div class="mx-auto" style="width: 50%;">
  <img src="/nextjs-mobile-app.webp" alt="nextjs-mobile-app">
</div>
Ma aspetta, c'è anche un modo più veloce per farlo durante lo sviluppo.

## Ricaricamento live di Capacitor

Durante lo sviluppo, puoi sfruttare il ricaricamento live per vedere i cambiamenti istantaneamente sul tuo dispositivo mobile. Per abilitare questa funzionalità, segui questi passaggi:

1. Trova il tuo indirizzo IP locale:

- Su macOS, esegui il seguente comando nel terminale:
  ```shell
  ipconfig getifaddr en0
  ```

- Su Windows, esegui:
  ```shell
  ipconfig
  ```
  Cerca l'indirizzo IPv4 nell'output.

2. Aggiorna il file `capacitor.config.ts` per includere la configurazione del server:

```javascript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
    url: 'http://YOUR_IP_ADDRESS:3000',
    cleartext: true,
  },
};

export default config;
```

Sostituisci `YOUR_IP_ADDRESS` con il tuo indirizzo IP locale.

3. Applica le modifiche al tuo progetto nativo:

```shell
npx cap copy
```

Il comando `copy` copia la cartella web e le modifiche di configurazione nel progetto nativo senza aggiornare l'intero progetto.

4. Ricompila ed esegui l'app sul tuo dispositivo usando Android Studio o Xcode.

Ora, ogni volta che apporti modifiche alla tua app Nextjs, l'app mobile si ricaricherà automaticamente per riflettere tali modifiche.

Nota: Se installi nuovi plugin o apporti modifiche ai file nativi, dovrai ricompilare il progetto nativo poiché il ricaricamento live si applica solo alle modifiche del codice web.

## Utilizzo dei plugin Capacitor

I plugin Capacitor ti permettono di accedere alle funzionalità native del dispositivo dalla tua app Nextjs. Esploriamo come utilizzare il plugin Share come esempio:

1. Installa il plugin Share:

```shell
npm i @capacitor/share
```

2. Aggiorna il file `pages/index.js` per utilizzare il plugin Share:

```javascript
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Share } from '@capacitor/share';

export default function Home() {
  const share = async () => {
    await Share.share({
      title: 'Open Youtube',
      text: 'Check new video on youtube',
      url: 'https://www.youtube.com',
      dialogTitle: 'Share with friends',
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Capgo!</a>
        </h1>

        <p className={styles.description}>
          <h2>Cool channel</h2>
          <button onClick={() => share()}>Share now!</button>
        </p>
      </main>
    </div>
  );
}
```

3. Sincronizza le modifiche con il progetto nativo:

Come menzionato in precedenza, quando installiamo nuovi plugin, dobbiamo eseguire un'operazione di sincronizzazione e poi ridistribuire l'app sul nostro dispositivo. Per farlo, esegui il seguente comando:

```shell
npx cap sync
```

4. Ricompila ed esegui l'app sul tuo dispositivo.

Ora, quando fai clic sul pulsante "Condividi ora!", apparirà la finestra di dialogo nativa di condivisione, permettendoti di condividere il contenuto con altre app.

<div className={styles.container}>
  <Head>
<title>

Per rendere il pulsante più adatto ai dispositivi mobili, possiamo aggiungere dello stile utilizzando la mia libreria di componenti UI preferita per le app web - Nextjs (senza giochi di parole).

## Aggiunta di Konsta UI

Ho lavorato per anni con [Ionic](https://ionicframework.com/) per costruire fantastiche applicazioni multipiattaforma ed è stata una delle migliori scelte per anni.
Ma ora non lo raccomando più, è molto complicato integrarlo con Nextjs e non vale davvero la pena quando hai già [tailwindcss](https://tailwindcss.com/).

Se vuoi un'interfaccia utente mobile davvero bella che si adatti allo stile specifico di iOS e Android, ti consiglio Konsta UI.

Devi avere [tailwind già installato](https://tailwindcss.com/docs/guides/nextjs/) 
Per migliorare l'interfaccia utente mobile della tua app Nextjs, puoi utilizzare [Konsta UI](https://konsta.ui.com/), una libreria di componenti UI mobile-friendly che si adatta allo stile di iOS e Android. Segui questi passaggi per integrare Konsta UI:

1.Installare i pacchetti richiesti:

```shell
npm i konsta
```

2. Aggiorna il file `tailwind.config.js`:

```javascript
const konstaConfig = require('konsta/config');

module.exports = konstaConfig({
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});
```

3. Avvolgi la tua app con il componente Konsta UI `App` in `pages/_app.js`:

```javascript
import { App } from 'konsta/react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <App theme="ios">
      <Component {...pageProps} />
    </App>
  );
}

export default MyApp;
```

### Pagina di esempio

Ora che tutto è configurato, possiamo utilizzare i componenti React di Konsta UI nelle nostre pagine Next.js

4. Aggiorna il file `pages/index.js` per utilizzare i componenti di Konsta UI:

```javascript
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListItem,
  BlockTitle,
} from 'konsta/react';

export default function Home() {
  return (
    <Page>
      <Navbar title="My App" />

      <Block strong>
        <p>
          Here is your Next.js & Konsta UI app. Let's see what we have here.
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
```

5. Riavvia il server di sviluppo e ricompila l'app

La tua app Next.js dovrebbe ora avere un'interfaccia utente mobile dall'aspetto nativo alimentata da Konsta UI

## Ottimizzazione delle prestazioni

Per garantire prestazioni ottimali della tua app Next.js e Capacitor, considera le seguenti best practice:

- Minimizza le dimensioni dell'app rimuovendo dipendenze e risorse inutilizzate
- Ottimizza immagini e altri file multimediali per ridurre i tempi di caricamento
- Implementa il caricamento lazy per componenti e pagine per migliorare le prestazioni di caricamento iniziale
- Utilizza il rendering lato server (SSR) con Next.js per migliorare la velocità di caricamento dell'app e l'ottimizzazione per i motori di ricerca (SEO)
- Sfrutta le ottimizzazioni integrate di Capacitor, come la cache della web view e il bundling dell'app

## Conclusione

In questo tutorial, abbiamo esplorato come costruire app mobile native usando Next.js e Capacitor. Sfruttando la potenza di queste tecnologie, puoi creare applicazioni mobili ad alte prestazioni e ricche di funzionalità con facilità.

Abbiamo coperto i passaggi per configurare un'app Next.js, integrare Capacitor e compilare e distribuire l'app su dispositivi mobili. Inoltre, abbiamo discusso l'uso dei plugin di Capacitor, l'aggiunta di Konsta UI per un'interfaccia utente mobile migliorata e le tecniche di ottimizzazione delle prestazioni.

Per portare la tua app Next.js e Capacitor al livello successivo, considera di esplorare [Capgo](https://capgo.app/) per aggiornamenti live senza soluzione di continuità, assicurando che i tuoi utenti abbiano sempre accesso alle ultime funzionalità e correzioni di bug.

Seguendo le migliori pratiche e le tecniche delineate in questa guida, sarai ben equipaggiato per costruire stupende app mobile native usando Next.js e Capacitor.

## Risorse

- [Documentazione Next.js](https://nextjs.org/docs)
- [Documentazione Capacitor](https://capacitorjs.com/docs)
- [Documentazione Konsta UI](https://konsta-ui.com/docs)
- [Capgo - Aggiornamenti Live per App Capacitor](https://capgo.app/)

Buona creazione di app!

Scopri come Capgo può aiutarti a costruire app migliori più velocemente, [registra un account gratuito](/register/) oggi stesso.