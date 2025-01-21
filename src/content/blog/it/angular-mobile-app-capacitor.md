---
slug: it__angular-mobile-app-capacitor
title: Sviluppare Applicazioni Mobile con Angular e Capacitor
description: >-
  Scopri come creare un'applicazione mobile con Angular e Capacitor e migliorare
  l'interfaccia utente nativa con Konsta UI.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-06T00:00:00.000Z
updated_at: 2023-06-06T00:00:00.000Z
head_image: /angular_capacitor.webp
head_image_alt: Illustrazione di Angular e Capacitor
tag: Tutorial
published: true
locale: it
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

In questo tutorial, inizieremo con una nuova app [Angular](https://angulario/) e passeremo al mondo delle app mobile native utilizzando Capacitor. Opzionalmente, puoi anche aggiungere [Konsta UI](https://konstauicom/) per una migliore interfaccia utente mobile con Tailwind CSS.

Capacitor ti permette di convertire facilmente la tua applicazione web Angular in un'app mobile nativa senza richiedere modifiche significative o l'apprendimento di nuove competenze come React Native.

Con pochi semplici passaggi, la maggior parte delle applicazioni Angular può essere trasformata in app mobile.

Questo tutorial ti guiderà attraverso il processo, partendo da una nuova app Angular e poi incorporando Capacitor per passare al mondo delle app mobile native. Inoltre, puoi opzionalmente utilizzare [Konsta UI](https://konstauicom/) per migliorare la tua interfaccia utente mobile con Tailwind CSS.

## Riguardo a Capacitor

Capacitor è rivoluzionario! Puoi incorporarlo facilmente in qualsiasi progetto web, e avvolgerà la tua applicazione in una webview nativa, generando per te il progetto nativo Xcode e Android Studio. Inoltre, i suoi plugin forniscono accesso alle funzionalità native del dispositivo come la fotocamera tramite un ponte JS.

Con Capacitor, ottieni un'app mobile nativa fantastica senza alcuna configurazione complicata o curva di apprendimento ripida. La sua API snella e la funzionalità semplificata lo rendono facilissimo da integrare nel tuo progetto. Fidati, sarai stupito da quanto sia semplice ottenere un'app nativa completamente funzionale con Capacitor!

## Preparazione della tua App Angular

Per creare una nuova app Angular, esegui il seguente comando:

```shell
ng new my-app
cd my-app
```

Scegli "Angular" quando richiesto per la versione di Angular.

Per creare un'app mobile nativa, abbiamo bisogno di un **export** del nostro progetto. Quindi, includiamo uno script semplice nel nostro **package.json** che può essere utilizzato per compilare e copiare il progetto Angular:

```json
{
  "scripts": {
    // ...
    "build": "ng build --prod"
  }
}
```

Dopo aver eseguito il comando `build`, dovresti essere in grado di vedere una nuova cartella `dist` nella radice del tuo progetto.

Questa cartella sarà utilizzata da Capacitor in seguito, ma per ora dobbiamo configurarla correttamente.

## Aggiunta di Capacitor alla tua App Angular

Per impacchettare qualsiasi app web in un contenitore mobile nativo, dobbiamo seguire alcuni passaggi iniziali, ma successivamente è semplice come eseguire un singolo comando `sync`.

Innanzitutto, possiamo installare il [Capacitor CLI](https://capacitorjscom/docs/cli/) come dipendenza di sviluppo, e poi configurarlo all'interno del nostro progetto. Durante la configurazione, puoi premere "invio" per accettare i valori predefiniti per nome e ID del pacchetto.

Successivamente, dobbiamo installare il pacchetto core e i pacchetti rilevanti per le piattaforme iOS e Android.

Infine, possiamo aggiungere le piattaforme, e Capacitor creerà cartelle per ogni piattaforma nella radice del nostro progetto:

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

A questo punto, dovresti essere in grado di vedere nuove cartelle **ios** e **android** nel tuo progetto Angular.

**Questi sono veri progetti nativi!**

Per accedere al progetto Android in seguito, devi installare [Android Studio](https://developerandroidcom/studio/). Per iOS, hai bisogno di un Mac e dovresti installare [Xcode](https://developerapplecom/xcode/).

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
npm run build
npx cap sync
```

Il primo comando `npm run build` semplicemente compilerà il tuo progetto Angular e copierà la build statica, mentre il secondo comando `npx cap sync` sincronizzerà tutto il codice web nei posti giusti delle piattaforme native in modo che possano essere visualizzati in un'app.

Inoltre, il comando sync potrebbe aggiornare le piattaforme native e installare plugin, quindi quando installi nuovi [plugin di Capacitor](https://capacitorjscom/docs/plugins/) è il momento di eseguire nuovamente `npx cap sync`.Senza rendertene conto, hai finito, quindi vediamo l'app su un dispositivo!

## Compilare e distribuire le app native

Per sviluppare app iOS, devi avere **Xcode** installato, mentre per le app Android, devi avere **Android Studio** installato. Inoltre, se prevedi di distribuire la tua app sull'app store, devi iscriverti all'Apple Developer Program per iOS e alla Google Play Console per Android.

Se sei nuovo nello sviluppo di app mobile native, puoi usare la CLI di Capacitor per aprire facilmente entrambi i progetti nativi:

Una volta configurati i tuoi progetti nativi, distribuire la tua app su un dispositivo connesso è facile. In Android Studio, devi solo attendere che tutto sia pronto, e puoi distribuire la tua app su un dispositivo connesso senza modificare alcuna impostazione. Ecco un esempio:

In Xcode, devi configurare il tuo account di firma per distribuire la tua app su un dispositivo reale invece che solo sul simulatore. Se non l'hai mai fatto prima, Xcode ti guida attraverso il processo (ma di nuovo, devi essere iscritto al Programma Developer). Successivamente, puoi semplicemente premere play per eseguire l'app sul tuo dispositivo connesso, che puoi selezionare in alto. Ecco un esempio:

Congratulazioni! Hai distribuito con successo la tua app web Angular su un dispositivo mobile. Ecco un esempio:

Ma aspetta, c'è anche un modo più veloce per farlo durante lo sviluppo.

## Ricarica Live di Capacitor

A questo punto, probabilmente sei abituato ad avere il ricaricamento a caldo con tutti i framework moderni, e la buona notizia è che puoi avere la stessa funzionalità **su un dispositivo mobile** con uno sforzo minimo!

Abilita l'accesso alla tua applicazione ospitata localmente con ricarica live **sulla tua rete** facendo caricare all'app Capacitor il contenuto dall'URL specifico.

Il primo passo è scoprire il tuo indirizzo IP locale. Se stai usando un Mac, puoi scoprirlo eseguendo il seguente comando nel terminale:

Su Windows, esegui:

Poi cerca l'indirizzo IPv4.

Possiamo istruire Capacitor a caricare l'app direttamente dal server aggiungendo un'altra voce al nostro file `capacitor.config.ts`:

Assicurati di usare **l'IP e la porta corretti**, ho usato la porta predefinita di Angular in questo esempio.

Ora, possiamo applicare queste modifiche copiandole nel nostro progetto nativo:

Il comando `copy` è simile a `sync`, ma **copierà solo le modifiche apportate alla cartella web** e alla configurazione, senza aggiornare il progetto nativo.

Ora puoi distribuire la tua app ancora una volta tramite Android Studio o Xcode. Dopo di che, se cambi qualcosa nella tua app Angular, **l'app si ricaricherà automaticamente** e mostrerà le modifiche!

**Tieni presente** che se installi nuovi plugin come la fotocamera, è comunque necessaria una ricompilazione del tuo progetto nativo. Questo perché i file nativi vengono modificati, e non può essere fatto al volo.

Nota che dovresti usare l'IP e la porta corretti nella tua configurazione. Il blocco di codice sopra mostra la porta predefinita di Angular a scopo dimostrativo.

## Utilizzo dei Plugin di Capacitor

Diamo un'occhiata a come usare un plugin di Capacitor in azione, che abbiamo menzionato alcune volte prima. Per farlo, possiamo installare un plugin abbastanza semplice eseguendo:

Non c'è nulla di straordinario nel [plugin Share](https://capacitorjs.com/docs/apis/share/), ma comunque fa apparire la finestra di dialogo di condivisione nativa! Per questo ora dobbiamo solo importare il pacchetto e chiamare la funzione `share()` corrispondente dalla nostra app, quindi modifichiamo il file **src/app/app.component.ts** in questo modo:

Come menzionato in precedenza, quando installiamo nuovi plugin, dobbiamo eseguire un'operazione di sincronizzazione e poi ridistribuire l'app sul nostro dispositivo.Per eseguire questa operazione, esegui il seguente comando:

```shell
npx cap open ios
npx cap open android
```

Dopo aver premuto il pulsante, potrai vedere in azione la splendida finestra di dialogo di condivisione nativa!

## Aggiungere Konsta UI

Per utilizzare Konsta UI nella tua app Nuxt 3, devi avere [tailwind già installato](https://tailwindcsscom/docs/guides/angular/) e installare il pacchetto:

```shell
ipconfig getifaddr en0
```

Inoltre, devi modificare il tuo file `tailwindconfigjs`:

```shell
ipconfig
```

`konstaConfig` estenderà la configurazione predefinita (o la tua personalizzata) di Tailwind CSS con alcune varianti extra e utilità helper richieste per Konsta UI

Ora dobbiamo configurare il componente principale [App](https://konstauicom/vue/app/) in modo da poter impostare alcuni parametri globali (come `theme`)

Dobbiamo avvolgere l'intera app con `App` nel file `src/app/appcomponenthtml`:

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

### Esempio di Pagina

Ora che tutto è configurato, possiamo utilizzare i componenti Vue di Konsta UI nelle nostre pagine Angular

Ad esempio, apriamo `src/app/appcomponenthtml` e modifichiamolo come segue:

```shell
npx cap copy
```

Se il ricaricamento automatico non è sincronizzato dopo aver installato tutti i componenti necessari, prova a riavviare tutto. Una volta fatto ciò, dovresti vedere un'app mobile con un aspetto quasi nativo, costruita con Angular e Capacitor!

Dovresti vedere la seguente pagina come risultato:

<div class="mx-auto" style="width: 50%;">
  <img src="/nextjs-mobile-app.webp" alt="angular-mobile-app">
</div>

## Conclusione

Capacitor è un'ottima opzione per costruire applicazioni native basate su un progetto web esistente, offrendo un modo semplice per condividere il codice e mantenere un'interfaccia utente coerente

E con l'aggiunta di [Capgo](https://capgoapp/), è ancora più facile aggiungere aggiornamenti in tempo reale alla tua app, assicurando che i tuoi utenti abbiano sempre accesso alle ultime funzionalità e correzioni di bug

Se desideri imparare come aggiungere Capgo alla tua app Angular, dai un'occhiata al prossimo articolo: