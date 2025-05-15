---
slug: vue-mobile-app-capacitor
title: Construindo Aplicativos Móveis com Vue e Capacitor
description: >-
  Learn how to create a mobile app using Vue, Capacitor, and optionally enhance
  the UI with Konsta UI.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-08T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /vue_capacitor.webp
head_image_alt: Vue and Capacitor illustrazione
keywords: >-
  Vue, Capacitor, mobile app development, live updates, OTA updates, continuous
  integration, mobile app updates
tag: Tutorial
published: true
locale: it
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
In questo tutorial, ti guideremo attraverso il processo di conversione di un'applicazione web Vue in un'app mobile nativa utilizzando Capacitor. Facoltativamente, puoi anche migliorare la tua interfaccia mobile con Konsta UI, una libreria di interfaccia mobile basata su Tailwind CSS.

## Informazioni su Capacitor

Capacitor è uno strumento rivoluzionario che ti consente di integrarlo facilmente in qualsiasi progetto web e di convertire la tua applicazione in un'app mobile nativa. Genera progetti nativi per Xcode e Android Studio per te e fornisce accesso a funzionalità native del dispositivo come la fotocamera tramite un ponte JavaScript.

## Preparare la tua app Vue

Prima di tutto, crea una nuova app Vue eseguendo il seguente comando:

```shell
vue create my-app
cd my-app
npm install
```

Per preparare la tua app Vue per il deployment mobile nativo, dovrai esportare il tuo progetto. Aggiungi uno script nel tuo file **package.json** per costruire e copiare il progetto Vue:

```json
{
  "scripts": {
    // ...
    "build": "vue-cli-service build"
  }
}
```

Dopo aver eseguito il comando `build`, dovresti vedere una nuova cartella `dist` nella directory principale del tuo progetto. Questa cartella sarà utilizzata da Capacitor in seguito.

## Aggiungere Capacitor alla tua app Vue

Per convertire la tua app web Vue in un contenitore mobile nativo, segui questi passaggi:

1. Installa il Capacitor CLI come dipendenza di sviluppo e configurarlo all'interno del tuo progetto. Accetta i valori predefiniti per nome e bundle ID durante la configurazione.

2. Installa il pacchetto core e i pacchetti rilevanti per le piattaforme iOS e Android.

3. Aggiungi le piattaforme e Capacitor creerà le cartelle per ciascuna piattaforma nella radice del tuo progetto:

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

Aggiorna il file **capacitor.config.json** per puntare il **webDir** al risultato del tuo comando di build:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "dist"
}
```

Ora puoi costruire il tuo progetto Vue e sincronizzarlo con Capacitor:

```shell
npm run build
npx cap sync
```

## Costruire e distribuire app native

Per sviluppare app iOS, è necessario avere Xcode installato e per le app Android, è necessario avere Android Studio installato. Inoltre, è necessario iscriversi al Programma per sviluppatori Apple per iOS e al Google Play Console per Android per distribuire la tua app sull'app store.

Utilizza il Capacitor CLI per aprire entrambi i progetti nativi:

```shell
npx cap open ios
npx cap open android
```

Distribuisci la tua app su un dispositivo connesso utilizzando Android Studio o Xcode.

## Capacitor Live Reload

Abilita il live reload sul tuo dispositivo mobile facendo caricare all'app Capacitor i contenuti da un URL specifico sulla tua rete.

Trova il tuo indirizzo IP locale e aggiorna il file `capacitor.config.ts` con l'indirizzo IP e la porta corretti:

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

Ora, la tua app si ricaricherà automaticamente e mostrerà le modifiche quando aggiorni la tua app Vue.

## Utilizzo dei plugin Capacitor

Installa un plugin Capacitor, come il plugin Share, e utilizzalo nella tua app Vue:

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

## Aggiungere Konsta UI

Per utilizzare Konsta UI nella tua app Vue, devi avere [tailwind già installato](https://tailwindcss.com/docs/guides/vite/#vue) e installare il pacchetto:
Per utilizzare Konsta UI nella tua app Vue, installa il pacchetto e modifica il tuo file `tailwind.config.js`:

```shell
npm i konsta
```

Avvolgi la tua app con il componente `App` nel file `pages/_app.vue`, e utilizza i componenti Vue di Konsta UI nelle tue pagine Vue.

## Conclusione

Capacitor è un'ottima opzione per costruire applicazioni native basate su un progetto web esistente. Con l'aggiunta di Capgo, è ancora più facile aggiungere aggiornamenti in tempo reale alla tua app, assicurando che i tuoi utenti abbiano sempre accesso alle ultime funzionalità e correzioni di bug.

Scopri come Capgo può aiutarti a costruire migliori app più velocemente, [registrati per un account gratuito](/register/) oggi.
