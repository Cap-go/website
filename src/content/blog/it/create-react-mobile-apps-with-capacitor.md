---
slug: it__create-react-mobile-apps-with-capacitor
title: Sviluppare Applicazioni Mobili con React e Capacitor
description: >-
  Scopri come creare un'applicazione mobile con React e Capacitor e migliorare
  l'interfaccia utente nativa con Konsta UI.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-02-21T00:00:00.000Z
updated_at: 2023-03-10T00:00:00.000Z
head_image: /react_capacitor.webp
head_image_alt: Illustrazione di React e Capacitor
tag: Tutorial
published: true
locale: it
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

In questo tutorial, inizieremo con una nuova app [React](https://reactjsorg/) e passeremo allo sviluppo mobile nativo utilizzando Capacitor. Facoltativamente, puoi anche aggiungere [Konsta UI](https://konstauicom/) per un'interfaccia utente mobile migliorata con Tailwind CSS.

Capacitor ti permette di convertire facilmente la tua applicazione web React in un'app mobile nativa senza modifiche significative o l'apprendimento di una nuova competenza come React Native.

Con solo pochi semplici passaggi, la maggior parte delle applicazioni React possono essere trasformate in app mobili.

Questo tutorial ti guiderà attraverso il processo, partendo da una nuova app React e poi incorporando Capacitor per passare al regno delle app mobili native. Inoltre, puoi facoltativamente utilizzare [Konsta UI](https://konstauicom/) per migliorare la tua interfaccia utente mobile con Tailwind CSS.

## Riguardo Capacitor

Capacitor è rivoluzionario! Puoi incorporarlo senza sforzo in qualsiasi progetto web, e avvolgerà la tua applicazione in una webview nativa, generando il progetto nativo Xcode e Android Studio per te. Inoltre, i suoi plugin forniscono accesso alle funzionalità native del dispositivo come la fotocamera tramite un ponte JS.

Con Capacitor, ottieni una fantastica app mobile nativa senza alcuna configurazione complicata o curva di apprendimento ripida. La sua API snella e funzionalità semplificata lo rendono un gioco da ragazzi da integrare nel tuo progetto. Fidati, rimarrai stupito da quanto sia semplice ottenere un'app nativa completamente funzionale con Capacitor!

## Preparazione della tua app React

Mentre ci sono vari metodi per avviare applicazioni React, optiamo per il più semplice in questo tutorial che fornisce un'applicazione React vuota:

```shell
npx create-react-app my-app
```

Per creare un'app mobile nativa, abbiamo bisogno di un **export** del nostro progetto. Quindi, includiamo uno script semplice nel nostro **packagejson** che può essere utilizzato per costruire ed esportare il progetto React:

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

Ora puoi eseguire `npm run build` senza preoccupazioni, e dovresti essere in grado di individuare una nuova cartella out nella radice del tuo progetto.

Questa cartella sarà utilizzata da Capacitor in seguito, ma per ora, dobbiamo configurarla correttamente.

## Aggiunta di Capacitor alla tua app React

Per impacchettare qualsiasi app web in un contenitore mobile nativo, dobbiamo seguire alcuni passaggi iniziali, ma successivamente è semplice come eseguire un singolo comando `sync`.

Innanzitutto, possiamo installare il [Capacitor CLI](https://capacitorjscom/docs/cli/) come dipendenza di sviluppo, e poi configurarlo all'interno del nostro progetto. Durante la configurazione, puoi premere "invio" per accettare i valori predefiniti per nome e ID del pacchetto.

Successivamente, dobbiamo installare il pacchetto core e i pacchetti pertinenti per le piattaforme iOS e Android.

Infine, possiamo aggiungere le piattaforme, e Capacitor creerà cartelle per ogni piattaforma alla radice del nostro progetto:

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

A questo punto, dovresti essere in grado di osservare nuove cartelle **ios** e **android** nel tuo progetto React.

**Questi sono progetti nativi reali!**

Per accedere al progetto Android in seguito, devi installare [Android Studio](https://developerandroidcom/studio/). Per iOS, hai bisogno di un Mac e dovresti installare [Xcode](https://developerapplecom/xcode/).

Inoltre, dovresti trovare un file **capacitorconfigts** nel tuo progetto, che contiene alcune impostazioni fondamentali di Capacitor utilizzate durante la sincronizzazione. L'unica cosa a cui devi prestare attenzione è il **webDir**, che deve puntare al risultato del tuo comando di build. Attualmente, è impreciso.

Per correggere questo, apri il file **capacitorconfigjson** e aggiorna il **webDir**:

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

Il primo comando `npm run build` semplicemente costruirà il tuo progetto React ed esporterà la build statica.

Mentre il secondo comando `npx cap sync` sincronizzerà tutto il codice web nei posti giusti delle piattaforme native in modo che possano essere visualizzati in un'app.

Inoltre, il comando sync potrebbe aggiornare le piattaforme native e installare plugin, quindi quando installi nuovi [plugin Capacitor](https://capacitorjscom/docs/plugins/) è il momento di eseguire nuovamente `npx cap sync`.Senza accorgertene, hai effettivamente finito, quindi vediamo l'app su un dispositivo!

## Compilare e distribuire app native

Per sviluppare app iOS, devi avere installato **Xcode**, e per le app Android, devi avere installato **Android Studio**. Inoltre, se prevedi di distribuire la tua app sugli app store, devi iscriverti all'Apple Developer Program per iOS e alla Google Play Console per Android.

Se sei nuovo allo sviluppo mobile nativo, puoi usare la CLI di Capacitor per aprire facilmente entrambi i progetti nativi:

Una volta impostati i tuoi progetti nativi, distribuire la tua app su un dispositivo connesso è facile. In Android Studio, devi solo attendere che tutto sia pronto, e puoi distribuire la tua app su un dispositivo connesso senza modificare alcuna impostazione. Ecco un esempio:

In Xcode, devi impostare il tuo account di firma per distribuire la tua app su un dispositivo reale invece che solo sul simulatore. Se non l'hai mai fatto prima, Xcode ti guida attraverso il processo (ma di nuovo, devi essere iscritto al Developer Program). Dopo di che, puoi semplicemente premere play per eseguire l'app sul tuo dispositivo connesso, che puoi selezionare in alto. Ecco un esempio:

Congratulazioni! Hai distribuito con successo la tua app web React su un dispositivo mobile. Ecco un esempio:

Ma aspetta, c'è anche un modo più veloce per farlo durante lo sviluppo.

## Ricaricamento live di Capacitor

A questo punto, probabilmente sei abituato ad avere il ricaricamento a caldo con tutti i framework moderni, e la buona notizia è che puoi avere la stessa funzionalità **su un dispositivo mobile** con uno sforzo minimo!

Abilita l'accesso alla tua applicazione ospitata localmente con ricaricamento live **sulla tua rete** facendo caricare all'app Capacitor il contenuto dall'URL specifico.

Il primo passo è scoprire il tuo indirizzo IP locale. Se stai usando un Mac, puoi scoprirlo eseguendo il seguente comando nel terminale:

Su Windows, esegui:

Poi cerca l'indirizzo IPv4.

Possiamo istruire Capacitor a caricare l'app direttamente dal server aggiungendo un'altra voce al nostro file `capacitor.config.ts`:

Assicurati di usare **l'IP e la porta corretti**, ho usato la porta predefinita di React in questo esempio.

Ora, possiamo applicare queste modifiche copiandole sul nostro progetto nativo:

Il comando `copy` è simile a `sync`, ma **copierà solo le modifiche apportate alla cartella web** e alla configurazione, senza aggiornare il progetto nativo.

Ora puoi distribuire la tua app ancora una volta tramite Android Studio o Xcode. Dopo di che, se cambi qualcosa nella tua app React, **l'app si ricaricherà automaticamente** e mostrerà le modifiche!

**Tieni presente** che se installi nuovi plugin come la fotocamera, è comunque necessaria una ricostruzione del tuo progetto nativo. Questo perché vengono modificati file nativi, e non può essere fatto al volo.

Nota che dovresti usare l'IP e la porta corretti nella tua configurazione. Il blocco di codice sopra mostra la porta predefinita di React a scopo dimostrativo.

## Utilizzo dei plugin di Capacitor

Diamo un'occhiata a come usare un plugin di Capacitor in azione, che abbiamo menzionato alcune volte prima. Per farlo, possiamo installare un plugin abbastanza semplice eseguendo:

Non c'è nulla di speciale nel [plugin Share](https://capacitorjs.com/docs/apis/share/), ma comunque fa apparire la finestra di dialogo di condivisione nativa! Per questo, ora dobbiamo solo importare il pacchetto e chiamare la funzione `share()` dalla nostra app. Modifichiamo il file **src/App.js** in questo modo:

Come menzionato in precedenza, quando installiamo nuovi plugin, dobbiamo eseguire un'operazione di sincronizzazione e poi ridistribuire l'app sul nostro dispositivo.Per eseguire questa operazione, esegui il seguente comando:

```shell
npx cap open ios
npx cap open android
```

Dopo aver premuto il pulsante, potrai vedere in azione la bellissima finestra di dialogo di condivisione nativa!

<div class="mx-auto" style="width: 50%;">
  <img src="/next-capacitor-share.webp" alt="react-mobile-app">
</div>

Per rendere il pulsante più adatto ai dispositivi mobili, possiamo aggiungere alcuni stili utilizzando la mia libreria di componenti UI preferita per le applicazioni web - React (senza giochi di parole)

## Aggiungere Konsta UI

Ho lavorato per anni con [Ionic](https://ionicframework.com/) per creare fantastiche applicazioni multi-piattaforma, ed è stata una delle migliori scelte per anni. Ma ora non lo consiglio più; è molto laborioso integrarlo con React, e non ne vale davvero la pena quando hai già [tailwindcss](https://tailwindcss.com/)

Se desideri un'interfaccia utente mobile dall'aspetto eccellente che si adatta allo stile specifico di iOS e Android, consiglio Konsta UI

Devi avere [tailwind già installato](https://tailwindcss.com/docs/guides/vite/#react)

Per utilizzarlo, dobbiamo solo installare il pacchetto react:

```shell
ipconfig getifaddr en0
```

Inoltre, devi modificare il tuo file `tailwind.config.js`:

```shell
ipconfig
```

`konstaConfig` estenderà la configurazione predefinita (o la tua personalizzata) di Tailwind CSS con alcune varianti extra e utilità helper richieste per Konsta UI

Ora dobbiamo configurare il componente principale [App](https://konsta-ui.com/react/app/) in modo da poter impostare alcuni parametri globali (come `theme`)

Dobbiamo avvolgere l'intera app con `App` nel `src/App.js`:

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

### Pagina di esempio

Ora che tutto è configurato, possiamo utilizzare i componenti React di Konsta UI nella nostra app React

Ad esempio, apriamo `src/App.js` e modifichiamolo come segue:

```shell
npx cap copy
```

Se il ricaricamento automatico è fuori sincrono dopo aver installato tutti i componenti necessari, prova a riavviare tutto. Una volta fatto ciò, dovresti vedere un'app mobile con un aspetto quasi nativo, costruita con React e Capacitor!

Dovresti vedere la seguente pagina come risultato:

<div>
  <h1>
</h1>

## Conclusione

Capacitor è un'ottima opzione per creare applicazioni native basate su un progetto web esistente, offrendo un modo semplice per condividere il codice e mantenere un'interfaccia utente coerente

E con l'aggiunta di [Capgo](https://capgo.app/), è ancora più facile aggiungere aggiornamenti in tempo reale alla tua app, assicurando che i tuoi utenti abbiano sempre accesso alle ultime funzionalità e correzioni di bug

Se vuoi imparare come aggiungere Capgo alla tua app React, dai un'occhiata al prossimo articolo: