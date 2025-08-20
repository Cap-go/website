---
slug: angular-mobile-app-capacitor
title: Creare App Mobile con Angular e Capacitor
description: >-
  Scopri come creare un'app mobile con Angular, Capacitor e migliorare
  l'interfaccia utente nativa con Konsta UI.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-06T00:00:00.000Z
updated_at: 2023-06-06T00:00:00.000Z
head_image: /angular_capacitor.webp
head_image_alt: Illustrazione di Angular e Capacitor
keywords: >-
  Angular, mobile app development, live updates, OTA updates, continuous
  integration, mobile app updates
tag: Tutorial
published: true
locale: it
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
In questo tutorial, inizieremo con una nuova app [Angular](https://angular.io/) e la trasformeremo in un'app mobile nativa utilizzando Capacitor. Opzionalmente, potrai anche aggiungere [Konsta UI](https://konstaui.com/) per migliorare l'interfaccia mobile con Tailwind CSS.

Capacitor ti permette di convertire facilmente la tua applicazione web Angular in un'app mobile nativa senza richiedere modifiche significative o imparare una nuova competenza come React Native.

Con pochi semplici passaggi, la maggior parte delle applicazioni Angular può essere trasformata in app mobile.

Questo tutorial ti guiderà attraverso il processo, partendo da una nuova app Angular e poi incorporando Capacitor per entrare nel mondo delle app mobile native. Inoltre, puoi opzionalmente utilizzare [Konsta UI](https://konstaui.com/) per migliorare la tua UI mobile con Tailwind CSS.

## Informazioni su Capacitor

Capacitor è rivoluzionario! Puoi incorporarlo facilmente in qualsiasi progetto web, e avvolgerà la tua applicazione in una webview nativa, generando il progetto nativo per Xcode e Android Studio. Inoltre, i suoi plugin forniscono accesso alle funzionalità native del dispositivo come la fotocamera tramite un bridge JS.

Con Capacitor, ottieni un'ottima app mobile nativa senza configurazioni complicate o curve di apprendimento ripide. La sua API snella e le funzionalità ottimizzate lo rendono facilissimo da integrare nel tuo progetto. Fidati, rimarrai stupito da quanto sia semplice ottenere un'app nativa completamente funzionante con Capacitor!

## Preparare la tua App Angular

Per creare una nuova app Angular, esegui il seguente comando:

```shell
ng new my-app
cd my-app
```

Scegli "Angular" quando ti viene chiesta la versione di Angular.

Per creare un'app mobile nativa, abbiamo bisogno di un **export** del nostro progetto. Quindi, aggiungiamo uno script semplice nel nostro **package.json** che può essere utilizzato per buildare e copiare il progetto Angular:

```json
{
  "scripts": {
    // ...
    "build": "ng build --prod"
  }
}
```

Dopo aver eseguito il comando `build`, dovresti vedere una nuova cartella `dist` nella root del tuo progetto.

Questa cartella sarà utilizzata da Capacitor più tardi, ma per ora dobbiamo configurarla correttamente.

## Aggiungere Capacitor alla tua App Angular

Per impacchettare qualsiasi app web in un container mobile nativo, dobbiamo seguire alcuni passaggi iniziali, ma successivamente sarà semplice come eseguire un singolo comando `sync`.

Per prima cosa, possiamo installare il [Capacitor CLI](https://capacitorjs.com/docs/cli/) come dipendenza di sviluppo, e poi configurarlo nel nostro progetto. Durante la configurazione, puoi premere "invio" per accettare i valori predefiniti per nome e bundle ID.

Successivamente, dobbiamo installare il pacchetto core e i pacchetti relativi per le piattaforme iOS e Android.

Infine, possiamo aggiungere le piattaforme, e Capacitor creerà cartelle per ogni piattaforma nella root del nostro progetto:

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your Angular project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

A questo punto, dovresti vedere nuove cartelle **ios** e **android** nel tuo progetto Angular.

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
npm run build
npx cap sync
```

Il primo comando `npm run build` semplicemente builderà il tuo progetto Angular e copierà la build statica, mentre il secondo comando `npx cap sync` sincronizzerà tutto il codice web nei posti giusti delle piattaforme native in modo che possano essere visualizzati in un'app.

Inoltre, il comando sync potrebbe aggiornare le piattaforme native e installare plugin, quindi quando installi nuovi [plugin Capacitor](https://capacitorjs.com/docs/plugins/) è il momento di eseguire nuovamente `npx cap sync`.

Senza accorgertene, hai finito, quindi vediamo l'app su un dispositivo!

## Build e Deploy di app native

Per sviluppare app iOS, devi avere **Xcode** installato, e per le app Android, devi avere **Android Studio** installato. Inoltre, se prevedi di distribuire la tua app sull'app store, devi iscriverti all'Apple Developer Program per iOS e alla Google Play Console per Android.

Se sei nuovo allo sviluppo mobile nativo, puoi utilizzare il CLI di Capacitor per aprire facilmente entrambi i progetti nativi:

```shell
npx cap open ios
npx cap open android
```

Una volta configurati i tuoi progetti nativi, distribuire la tua app su un dispositivo connesso è facile. In Android Studio, devi solo attendere che tutto sia pronto, e puoi distribuire la tua app su un dispositivo connesso senza modificare alcuna impostazione. Ecco un esempio:

![android-studio-run](/android-studio-run.webp)

In Xcode, devi configurare il tuo account di firma per distribuire la tua app su un dispositivo reale invece che solo sul simulatore. Se non l'hai mai fatto prima, Xcode ti guida attraverso il processo (ma di nuovo, devi essere iscritto al Developer Program). Successivamente, puoi semplicemente premere play per eseguire l'app sul tuo dispositivo connesso, che puoi selezionare in alto. Ecco un esempio:

![xcode-run](/xcode-run.webp)

Congratulazioni! Hai distribuito con successo la tua app web Angular su un dispositivo mobile. Ecco un esempio:

<div class="mx-auto" style="width: 50%;">
  <img src="/nextjs-mobile-app.webp" alt="angular-mobile-app">
</div>

Ma aspetta, c'è anche un modo più veloce per farlo durante lo sviluppo...

## Live Reload di Capacitor

A questo punto, probabilmente sei abituato ad avere l'hot reload con tutti i framework moderni, e la buona notizia è che puoi avere la stessa funzionalità **su un dispositivo mobile** con uno sforzo minimo!

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
    url: 'http://192.168.x.xx:4200',
    cleartext: true
  }
};

export default config;
```

Assicurati di usare **l'IP e la porta corretti**, ho usato la porta predefinita di Angular in questo esempio.

Ora, possiamo applicare queste modifiche copiandole nel nostro progetto nativo:

```shell
npx cap copy
```

Il comando `copy` è simile a `sync`, ma copierà solo **le modifiche apportate alla cartella web** e alla configurazione, senza aggiornare il progetto nativo.

Ora puoi distribuire la tua app ancora una volta attraverso Android Studio o Xcode. Dopo di che, se cambi qualcosa nella tua app Angular, **l'app si ricaricherà automaticamente** e mostrerà le modifiche!

**Tieni presente** che se installi nuovi plugin come la fotocamera, è ancora necessaria una ricompilazione del tuo progetto nativo. Questo perché i file nativi vengono modificati, e non può essere fatto al volo.

Nota che dovresti usare l'IP e la porta corretti nella tua configurazione. Il blocco di codice sopra mostra la porta predefinita di Angular a scopo dimostrativo.

## Utilizzare i Plugin di Capacitor

Diamo un'occhiata a come utilizzare un plugin Capacitor in azione, di cui abbiamo parlato alcune volte prima. Per farlo, possiamo installare un plugin abbastanza semplice eseguendo:

```shell
npm i @capacitor/share
```

Non c'è niente di particolare nel [plugin Share](https://capacitorjs.com/docs/apis/share/), ma comunque fa apparire il dialogo di condivisione nativo! Per questo ora dobbiamo solo importare il pacchetto e chiamare la funzione `share()` dalla nostra app, quindi modifichiamo il file **src/app/app.component.ts** in questo modo:

```typescript
import { Component } from '@angular/core';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';

  async share() {
    await Share.share({
      title: 'Open Youtube',
      text: 'Check new video on youtube',
      url: 'https://www.youtube.com',
      dialogTitle: 'Share with friends'
    });
  }
}
```

Come menzionato prima, quando installiamo nuovi plugin, dobbiamo eseguire un'operazione di sync e poi ridistribuire l'app sul nostro dispositivo. Per farlo, esegui il seguente comando:

```
npx cap sync
```

Dopo aver premuto il pulsante, puoi vedere in azione il bellissimo dialogo di condivisione nativo!

## Aggiungere Konsta UI

Per utilizzare Konsta UI nella tua app Nuxt 3, devi avere [tailwind già installato](https://tailwindcss.com/docs/guides/angular/) e installare il pacchetto:

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
    './src/**/*.{html,ts}',
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

Ora dobbiamo configurare il componente principale [App](https://konstaui.com/vue/app/) così possiamo impostare alcuni parametri globali (come `theme`).

Dobbiamo avvolgere l'intera app con `App` nel `src/app/app.component.html`:

```html
<app>
  <h1>Welcome to Angular and Capacitor!</h1>
  <button (click)="share()">Share now!</button>
</app>
```

### Pagina di Esempio

Ora che tutto è configurato, possiamo utilizzare i componenti Vue di Konsta UI nelle nostre pagine Angular.

Per esempio, apriamo `src/app/app.component.html` e modifichiamolo nel seguente modo:

```html
<app>
  <page>
    <navbar title="My App" />

    <block strong>
      <p>
        Here is your Angular & Konsta UI app. Let's see what we have here.
      </p>
    </block>
    <block-title>Navigation</block-title>
    <list>
      <list-item href="/about/" title="About" />
      <list-item href="/form/" title="Form" />
    </list>

    <block strong class="flex space-x-4">
      <button>Button 1</button>
      <button>Button 2</button>
    </block>
  </page>
</app>
```

Se il live reload è fuori sync dopo aver installato tutti i componenti necessari, prova a riavviare tutto. Una volta fatto questo, dovresti vedere un'app mobile con un aspetto un po' nativo, costruita con Angular e Capacitor!

Dovresti vedere la seguente pagina come risultato:

<app>
  <h1>
</h1>

## Conclusione

Capacitor è un'ottima opzione per costruire applicazioni native basate su un progetto web esistente, offrendo un modo semplice per condividere il codice e mantenere un'UI coerente.

E con l'aggiunta di [Capgo](https://capgo.app/), è ancora più facile aggiungere aggiornamenti live alla tua app, assicurando che i tuoi utenti abbiano sempre accesso alle ultime funzionalità e correzioni di bug.

Se vuoi imparare come aggiungere Capgo alla tua app Angular, dai un'occhiata al prossimo articolo:
