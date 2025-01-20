---
slug: it__vue-mobile-app-capacitor
title: Sviluppare Applicazioni Mobili con Vue e Capacitor
description: >-
  Impara come creare un'applicazione mobile con Vue e Capacitor e,
  facoltativamente, migliorare l'interfaccia utente con Konsta UI.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-08T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /vue_capacitor.webp
head_image_alt: Illustrazione di Vue e Capacitor
tag: Tutorial
published: true
locale: it
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

In questo tutorial, ti guideremo attraverso il processo di conversione di un'applicazione web Vue in un'app mobile nativa utilizzando Capacitor. Facoltativamente, puoi anche migliorare la tua interfaccia utente mobile con Konsta UI, una libreria di interfaccia utente mobile basata su Tailwind CSS.

## Informazioni su Capacitor

Capacitor è uno strumento rivoluzionario che ti permette di integrarlo facilmente in qualsiasi progetto web e convertire la tua applicazione in un'app mobile nativa. Genera progetti nativi Xcode e Android Studio per te e fornisce accesso a funzionalità native del dispositivo come la fotocamera attraverso un ponte JavaScript.

## Preparazione della tua App Vue

Innanzitutto, crea una nuova app Vue eseguendo il seguente comando:

```shell
vue create my-app
cd my-app
npm install
```

Per preparare la tua app Vue per il deployment mobile nativo, dovrai esportare il tuo progetto. Aggiungi uno script nel tuo file **package.json** per compilare e copiare il progetto Vue:

```json
{
  "scripts": {
    // ...
    "build": "vue-cli-service build"
  }
}
```

Dopo aver eseguito il comando `build`, dovresti vedere una nuova cartella `dist` nella directory principale del tuo progetto. Questa cartella sarà utilizzata da Capacitor in seguito.

## Aggiunta di Capacitor alla tua App Vue

Per convertire la tua app web Vue in un contenitore mobile nativo, segui questi passaggi:

1. Installa la CLI di Capacitor come dipendenza di sviluppo e configurala all'interno del tuo progetto. Accetta i valori predefiniti per nome e ID del bundle durante la configurazione.

2. Installa il pacchetto core e i pacchetti pertinenti per le piattaforme iOS e Android.

3. Aggiungi le piattaforme, e Capacitor creerà cartelle per ciascuna piattaforma nella radice del tuo progetto:

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your Vue project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

Ora dovresti vedere nuove cartelle **iOS** e **android** nel tuo progetto Vue.

Aggiorna il file **capacitor.config.json** per indirizzare il **webDir** al risultato del tuo comando di build:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "dist"
}
```

Ora puoi compilare il tuo progetto Vue e sincronizzarlo con Capacitor:

```shell
npm run build
npx cap sync
```

## Compilazione e Distribuzione di App Native

Per sviluppare app iOS, hai bisogno di Xcode installato, e per le app Android, hai bisogno di Android Studio installato. Inoltre, devi iscriverti all'Apple Developer Program per iOS e alla Google Play Console per Android per distribuire la tua app sullo store delle app.

Usa la CLI di Capacitor per aprire entrambi i progetti nativi:

```shell
npx cap open ios
npx cap open android
```

Distribuisci la tua app su un dispositivo connesso utilizzando Android Studio o Xcode.

## Live Reload di Capacitor

Abilita il live reload sul tuo dispositivo mobile facendo in modo che l'app Capacitor carichi il contenuto da un URL specifico sulla tua rete.

Trova il tuo indirizzo IP locale e aggiorna il file `capacitor.config.ts` con l'IP e la porta corretti:

```javascript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.x.xx:8080',
    cleartext: true
  }
};

export default config;
```

Applica queste modifiche copiandole nel tuo progetto nativo:

```shell
npx cap copy
```

Ora la tua app si ricaricherà automaticamente e mostrerà le modifiche quando aggiorni la tua app Vue.

## Utilizzo dei Plugin di Capacitor

Installa un plugin di Capacitor, come il plugin Share, e utilizzalo nella tua app Vue:

```shell
npm i @capacitor/share
```

Importa il pacchetto e chiama la funzione `share()` nella tua app:

```html
<template>
  <div>
    <h1>Welcome to Vue and Capacitor!</h1>
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

Dopo aver installato nuovi plugin, esegui il comando `sync` e ridistribuisci l'app sul tuo dispositivo:

```
npx cap sync
```

## Aggiunta di Konsta UI

Per utilizzare Konsta UI nella tua app Vue, devi avere [tailwind già installato](https://tailwindcss.com/docs/guides/vite/#vue) e installare il pacchetto:
Per utilizzare Konsta UI nella tua app Vue, installa il pacchetto e modifica il tuo file `tailwind.config.js`:

```shell
npm i konsta
```

Avvolgi la tua app con il componente `App` nel file `pages/_app.vue`, e utilizza i componenti Vue di Konsta UI nelle tue pagine Vue.

## Conclusione

Capacitor è un'ottima opzione per costruire applicazioni native basate su un progetto web esistente. Con l'aggiunta di Capgo, è ancora più facile aggiungere aggiornamenti in tempo reale alla tua app, assicurando che i tuoi utenti abbiano sempre accesso alle ultime funzionalità e correzioni di bug.

Scopri come Capgo può aiutarti a costruire app migliori più velocemente, [registrati per un account gratuito](/register/) oggi stesso.