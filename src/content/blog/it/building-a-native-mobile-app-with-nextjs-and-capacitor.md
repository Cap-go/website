---
slug: ネイティブモバイルアプリをNextjsとCapacitorで構築する
title: 2024 Next.js 14とCapacitorでネイティブモバイルアプリを作成する：ステップバイステップガイド
description: >-
  Next.js
  14とCapacitorを使用してネイティブモバイルアプリを作成する方法を、この包括的なガイドで学びましょう。機能豊富で高性能なモバイルアプリケーションを構築するための最新のベストプラクティスとテクニックを探求します。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-02-21T00:00:00.000Z
updated_at: 2024-09-19T00:00:00.000Z
head_image: /next_capgo.webp
head_image_alt: Next.js 14とCapacitorのイラストレーション
keywords: >-
  Next.js 14, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: ja
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
original_slug: costruire-una-app-mobile-nativa-con-nextjs-e-capacitor
---
## Introduzione

In questo tutorial, esploreremo come creare app mobile native utilizzando la potente combinazione di [Next.js](https://nextjs.org/) 14 e [Capacitor](https://capacitorjs.com/) nel 2024. Sfruttando le ultime versioni di queste tecnologie, potrai costruire applicazioni mobili ad alte prestazioni e ricche di funzionalità con facilità. Dimostreremo anche come migliorare l'interfaccia mobile utilizzando [Konsta UI](https://konstaui.com/) e Tailwind CSS, sebbene questo passaggio sia opzionale.

Next.js, un popolare framework React, fornisce una solida base per la costruzione di applicazioni web, mentre Capacitor ti permette di trasformare la tua app Next.js in un'app mobile nativa senza modifiche significative o la necessità di imparare nuove competenze come React Native. Questo tutorial ti guiderà attraverso il processo, partendo dalla configurazione di una nuova app Next.js e integrando Capacitor per creare un'esperienza mobile nativa.

### Vantaggi dell'Utilizzo di Next.js e Capacitor

- **Riutilizzo del Codice**: Next.js ti permette di scrivere componenti riutilizzabili e condividere codice tra le tue app web e mobile, risparmiando tempo ed effort di sviluppo.
- **Prestazioni**: Next.js offre ottimizzazioni delle prestazioni integrate, come il rendering lato server e lo splitting del codice, garantendo tempi di caricamento rapidi e un'esperienza utente fluida.
- **Funzionalità Native**: Capacitor fornisce accesso a funzionalità native del dispositivo come la fotocamera, la geolocalizzazione e altro, permettendoti di costruire app mobile ricche di funzionalità.
- **Sviluppo Semplificato**: Con Capacitor, puoi sviluppare e testare la tua app mobile utilizzando tecnologie web familiari, riducendo la curva di apprendimento e semplificando il processo di sviluppo.

## Preparazione della Tua App Next.js

Per iniziare, creiamo una nuova applicazione Next.js utilizzando il comando `create-next-app`:

```shell
npx create-next-app@latest my-app
```

Questo comando configurerà un progetto Next.js vuoto con la configurazione raccomandata per l'ultima versione.

Successivamente, naviga nella directory del progetto:

```shell
cd my-app
```

Per creare un'app mobile nativa, dobbiamo generare un'esportazione statica del nostro progetto Next.js. Aggiorna il file `package.json` per includere uno script per la build e l'esportazione del progetto:

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

L'esecuzione del comando `npm run static` potrebbe risultare in errori dovuti all'incompatibilità dell'ottimizzazione delle immagini. Per risolvere questo, apri il file `next.config.js` e modificalo come segue:

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

Ora, eseguendo `npm run static` dovrebbe funzionare senza problemi, e troverai una nuova cartella `out` nella root del tuo progetto. Questa cartella sarà utilizzata da Capacitor nei passaggi successivi.

## Aggiunta di Capacitor alla Tua App Next.js 14

Per pacchettizzare la tua app Next.js in un container mobile nativo, segui questi passaggi:

1. Installa la [CLI di Capacitor](https://capacitorjs.com/docs/cli/) come dipendenza di sviluppo:

```shell
npm install -D @capacitor/cli
```

2. Inizializza Capacitor nel tuo progetto Next.js:

```shell
npx cap init
```

Durante il processo di inizializzazione, puoi premere "Enter" per accettare i valori predefiniti per il nome dell'app e l'ID del bundle.

3. Installa i pacchetti Capacitor richiesti:

```shell
npm install @capacitor/core @capacitor/ios @capacitor/android
```

4. Aggiungi le piattaforme native:

```shell
npx cap add ios
npx cap add android
```

Capacitor creerà cartelle per ogni piattaforma (`ios` e `android`) nella root del tuo progetto. Queste cartelle contengono i progetti nativi per iOS e Android, rispettivamente.

Per accedere e buildare il progetto Android, devi avere [Android Studio](https://developer.android.com/studio) installato. Per lo sviluppo iOS, hai bisogno di un Mac con [Xcode](https://developer.apple.com/xcode/) installato.

5. Configura Capacitor:

Apri il file `capacitor.config.ts` e aggiorna la proprietà `webDir` per puntare alla directory di output della tua build Next.js:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "out",
  "bundledWebRuntime": false
}
```

6. Builda e sincronizza il tuo progetto:

```shell
npm run static
npx cap sync
```

Il comando `npm run static` builda il tuo progetto Next.js ed esporta i file statici, mentre `npx cap sync` sincronizza il codice web con le piattaforme native.

## Building e Deployment delle App Native

Per buildare e deployare la tua app mobile nativa, segui questi passaggi:
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

2. Builda ed esegui l'app:

![android-studio-run](/android-studio-run.webp)

- In Android Studio, attendi che il progetto sia pronto, quindi clicca sul pulsante "Run" per deployare l'app su un dispositivo connesso o emulatore.
![xcode-run](/xcode-run.webp)

- In Xcode, configura il tuo account di firma per deployare l'app su un dispositivo reale. Se non l'hai mai fatto prima, Xcode ti guiderà attraverso il processo (nota che devi essere iscritto all'Apple Developer Program). Una volta configurato, clicca sul pulsante "Play" per eseguire l'app sul tuo dispositivo connesso.

Congratulazioni! Hai deployato con successo la tua app web Next.js su un dispositivo mobile.

<Note>
  <p>Un modo molto più veloce</p>
</Note>
Ma aspetta, c'è anche un modo più veloce per farlo durante lo sviluppo...

## Live Reload di Capacitor

Durante lo sviluppo, puoi sfruttare il live reloading per vedere i cambiamenti istantaneamente sul tuo dispositivo mobile. Per abilitare questa funzionalità, segui questi passaggi:

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

3. Applica i cambiamenti al tuo progetto nativo:

```shell
npx cap copy
```

Il comando `copy` copia la cartella web e i cambiamenti di configurazione al progetto nativo senza aggiornare l'intero progetto.

4. Ribuilda ed esegui l'app sul tuo dispositivo usando Android Studio o Xcode.

Ora, ogni volta che fai modifiche alla tua app Next.js, l'app mobile si ricaricherà automaticamente per riflettere quei cambiamenti.

Nota: Se installi nuovi plugin o fai modifiche ai file nativi, dovrai ricostruire il progetto nativo poiché il live reloading si applica solo ai cambiamenti del codice web.

## Utilizzo dei Plugin Capacitor

I plugin Capacitor ti permettono di accedere alle funzionalità native del dispositivo dalla tua app Next.js. Esploriamo come utilizzare il [plugin Share](https://capacitorjs.com/docs/apis/share/) come esempio:

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

3. Sincronizza i cambiamenti con il progetto nativo:

Come menzionato in precedenza, quando installiamo nuovi plugin, dobbiamo eseguire un'operazione di sync e poi redeployare l'app sul nostro dispositivo. Per fare questo, esegui il seguente comando:

```shell
npx cap sync
```

4. Ribuilda ed esegui l'app sul tuo dispositivo.

Ora, quando clicchi sul pulsante "Share now!", apparirà il dialog di condivisione nativo, permettendoti di condividere il contenuto con altre app.

<Note>
  <p>UI Mobile Nativa</p>
</Note>

Per rendere il pulsante più mobile-friendly, possiamo aggiungere dello stile usando la mia libreria di componenti UI preferita per app web - Next.js (senza giochi di parole).

## Aggiunta di Konsta UI

Ho lavorato per anni con [Ionic](https://ionicframework.com/) per costruire fantastiche applicazioni multipiattaforma ed è stata una delle migliori scelte per anni.
Ma ora non lo raccomando più perché è molto complicato integrarlo con Next.js e non ne vale davvero la pena quando hai già [tailwindcss](https://tailwindcss.com/).

Se vuoi una UI mobile davvero bella che si adatta allo stile specifico di iOS e Android, raccomando Konsta UI.

Devi avere già [tailwind installato](https://tailwindcss.com/docs/guides/nextjs/)
Per migliorare l'UI mobile della tua app Next.js, puoi utilizzare [Konsta UI](https://konstaui.com/), una libreria di componenti UI mobile-friendly che si adatta allo stile di iOS e Android. Segui questi passaggi per integrare Konsta UI:

1. Installa i pacchetti richiesti:

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

3. Avvolgi la tua app con il componente `App` di Konsta UI in `pages/_app.js`:

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

### Pagina di Esempio

Ora che tutto è configurato, possiamo utilizzare i componenti React di Konsta UI nelle nostre pagine Next.js.

4. Aggiorna il file `pages/index.js` per utilizzare i componenti Konsta UI:

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

5. Riavvia il server di sviluppo e ribuilda l'app.

La tua app Next.js dovrebbe ora avere un'interfaccia mobile dall'aspetto nativo powered by Konsta UI.

## Ottimizzazione delle Prestazioni

Per garantire prestazioni ottimali della tua app Next.js e Capacitor, considera le seguenti best practices:

- Minimizza la dimensione dell'app rimuovendo dipendenze e asset inutilizzati.
- Ottimizza immagini e altri file multimediali per ridurre i tempi di caricamento.
- Implementa il lazy loading per componenti e pagine per migliorare le prestazioni di caricamento iniziale.
- Utilizza il rendering lato server (SSR) con Next.js per migliorare la velocità di caricamento dell'app e l'ottimizzazione per i motori di ricerca (SEO).
- Sfrutta le ottimizzazioni integrate di Capacitor, come il caching della web view e il bundling dell'app.

## Conclusione

In questo tutorial, abbiamo esplorato come costruire app mobile native utilizzando Next.js e Capacitor. Sfruttando la potenza di queste tecnologie, puoi creare applicazioni mobili ad alte prestazioni e ricche di funzionalità con facilità.

Abbiamo coperto i passaggi per configurare un'app Next.js, integrare Capacitor, e buildare e deployare l'app su dispositivi mobili. Inoltre, abbiamo discusso l'utilizzo dei plugin Capacitor, l'aggiunta di Konsta UI per un'interfaccia mobile migliorata e le tecniche di ottimizzazione delle prestazioni.

Per portare la tua app Next.js e Capacitor al livello successivo, considera di esplorare [Capgo](https://capgo.app/) per aggiornamenti live senza problemi, assicurando che i tuoi utenti abbiano sempre accesso alle ultime funzionalità e correzioni di bug.

Seguendo le best practices e le tecniche delineate in questa guida, sarai ben equipaggiato per costruire stupende app mobile native utilizzando Next.js e Capacitor.

## Risorse

- [Documentazione Next.js](https://nextjs.org/docs)
- [Documentazione Capacitor](https://capacitorjs.com/docs)
- [Documentazione Konsta UI](https://konstaui.com/docs)
- [Capgo - Aggiornamenti in tempo reale per app Capacitor](https://capgo.app/)

Buon sviluppo di app!

Scopri come Capgo può aiutarti a creare app migliori più velocemente, [registra un account gratuito](/register/) oggi.
